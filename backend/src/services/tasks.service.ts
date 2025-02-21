import { TasksRepository } from "../repositories/tasks.repository";
import { Task } from "../models/task.model";
import { updateTaskStatus } from "../utils/updateTaskStatus";

export class TasksService {
    private tasksRepository = new TasksRepository();

    async createTask(task: Task): Promise<Task> {
        const now = new Date();
        const dueDate = new Date(task.due_datetime);

        // Si la fecha de vencimiento ya pasó, asignar estado "atrasada" (4)
        if (dueDate < now) {
            task.status_id = 4;
        } else {
            task.status_id = task.status_id || 1; // Por defecto "pendiente"
        }

        return this.tasksRepository.createTask(task);
    }

    async getTasks(): Promise<Task[]> {
        const tasks = await this.tasksRepository.getTasks();
        await updateTaskStatus(tasks, this.tasksRepository);
        return tasks;
    }

    async updateTaskStatus(taskId: number): Promise<Task> {
        const task = await this.tasksRepository.getTaskById(taskId);
        if (!task) {
            throw new Error("Tarea no encontrada");
        }

        // Determinar el nuevo estado según el estado actual
        let newStatusId: number;
        if (task.status_id === 1) {
            newStatusId = 2; // De pendiente a en progreso
        } else if (task.status_id === 2) {
            newStatusId = 3; // De en progreso a completado
        } else if (task.status_id === 3 || task.status_id === 4) {
            throw new Error("No se puede actualizar la tarea");
        } else {
            throw new Error("Estado desconocido");
        }

        // Actualizar la tarea y retornar el resultado
        const updatedTask = await this.tasksRepository.updateTaskStatus(taskId, newStatusId);
        return updatedTask;
    }

    async deleteTask(taskId: number): Promise<boolean> {
        return this.tasksRepository.deleteTask(taskId);
    }
}