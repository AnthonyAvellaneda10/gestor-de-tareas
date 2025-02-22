import { Task } from "../models/task.model";

export interface ITasksRepository {
    createTask(task: Task): Promise<Task>;
    getTasks(): Promise<Task[]>;
    getTaskById(taskId: number): Promise<Task | null>;
    updateTaskStatus(taskId: number, statusId: number): Promise<Task>;
    deleteTask(taskId: number): Promise<boolean>;
}