import { Task } from "../models/task.model";
import { TasksRepository } from "../repositories/tasks.repository";

export async function updateTaskStatus(tasks: Task[], tasksRepository: TasksRepository): Promise<void> {
    const now = new Date();
    for (const task of tasks) {
        if (task.due_datetime && task.due_datetime < now && task.status_id !== 4) { // 4 = completada
            await tasksRepository.updateTaskStatus(task.id!, 4); // 4 = atrasada
        }
    }
}