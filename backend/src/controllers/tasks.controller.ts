import { Request, Response, NextFunction } from "express";
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task.model";
import { toLocalISOString } from "../utils/localDate";

export class TasksController {
    constructor(private tasksService: TasksService) { } // Inyectar TasksService

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task: Task = req.body;
            const newTask = await this.tasksService.createTask(task);
            res.status(201).json(newTask);
        } catch (error) {
            next(error); // Pasar el error al middleware
        }
    }

    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await this.tasksService.getTasks();

            // Formateamos las fechas a formato ISO pero con la hora local (por ejemplo, para America/Lima)
            const tasksFormatted = tasks.map(task => ({
                ...task,
                due_datetime: toLocalISOString(new Date(task.due_datetime)),
                created_at: toLocalISOString(new Date(task.created_at))
            }));

            res.status(200).json(tasksFormatted);
        } catch (error) {
            next(error);
        }
    }

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
            next(error); // Pasar el error al middleware
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
            next(error); // Pasar el error al middleware
        }
    }
}