import { Request, Response, NextFunction } from "express";
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task.model";

export class TasksController {
    private tasksService = new TasksService();

    constructor() {
        this.createTask = this.createTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    async createTask(req: Request, res: Response) {
        const task: Task = req.body;
        const newTask = await this.tasksService.createTask(task);
        res.status(201).json(newTask);
    }

    async getTasks(req: Request, res: Response) {
        const tasks = await this.tasksService.getTasks();
        res.status(200).json(tasks);
    }

    // Nuevo método para actualizar el estado de la tarea
    async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const taskId = parseInt(req.params.id, 10);
            if (isNaN(taskId)) {
                res.status(400).json({ message: "ID inválido" });
                return;
            }
            const updatedTask = await this.tasksService.updateTaskStatus(taskId);
            res.status(200).json(updatedTask);
        } catch (error) {
            // Puedes distinguir errores para asignar códigos de estado adecuados
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const taskId = parseInt(req.params.id, 10);
            if (isNaN(taskId)) {
                res.status(400).json({ message: "ID inválido" });
                return;
            }
            const deleted = await this.tasksService.deleteTask(taskId);
            if (deleted) {
                res.status(200).json({ message: "Tarea eliminada correctamente" });
            } else {
                res.status(404).json({ message: "Tarea no encontrada" });
            }
        } catch (error) {
            next(error);
        }
    }
}