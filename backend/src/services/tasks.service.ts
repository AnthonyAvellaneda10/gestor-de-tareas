import { ITasksRepository } from "../interfaces/ITasksRepository";
import { Task } from "../models/task.model";

export class TasksService {
    constructor(private tasksRepository: ITasksRepository) { }

    async createTask(task: Task): Promise<Task> {
        const nowPeru = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Lima" }));

        let dueDate: Date;
        if (task.due_datetime.toString().endsWith("Z")) {
            const parsedUTC = new Date(task.due_datetime);
            dueDate = new Date(parsedUTC.getTime() + (5 * 60 * 60 * 1000));
        } else {
            dueDate = new Date(task.due_datetime);
        }

        if (dueDate.getTime() < nowPeru.getTime() + 3600000) {
            throw new Error("La fecha de vencimiento debe ser al menos 1 hora en el futuro");
        }

        task.status_id = task.status_id || 1;
        return this.tasksRepository.createTask(task);
    }

    async getTasks(): Promise<Task[]> {
        // Primero obtenemos las tareas y actualizamos las vencidas
        const tasks = await this.tasksRepository.getTasks();
        await this.updateTaskStatusForOverdueTasks(tasks);

        // Luego volvemos a consultar para obtener la lista con los estados actualizados
        return await this.tasksRepository.getTasks();
    }

    async updateTaskStatus(taskId: number): Promise<Task> {
        const task = await this.tasksRepository.getTaskById(taskId);
        if (!task) {
            throw new Error("Tarea no encontrada");
        }

        let newStatusId: number;
        if (task.status_id === 1) {
            newStatusId = 2;
        } else if (task.status_id === 2) {
            newStatusId = 3;
        } else if (task.status_id === 3 || task.status_id === 4) {
            throw new Error("No se puede actualizar la tarea");
        } else {
            throw new Error("Estado desconocido");
        }

        const updatedTask = await this.tasksRepository.updateTaskStatus(taskId, newStatusId);
        return updatedTask;
    }

    async deleteTask(taskId: number): Promise<boolean> {
        return this.tasksRepository.deleteTask(taskId);
    }

    private async updateTaskStatusForOverdueTasks(tasks: Task[]): Promise<void> {
        const now = new Date();
        for (const task of tasks) {
            if (task.due_datetime && (new Date(task.due_datetime).getTime() + 60000) < now.getTime() && (task.status_id === 1 || task.status_id === 2)) {
                await this.tasksRepository.updateTaskStatus(task.id!, 4);
            }
        }
    }
}