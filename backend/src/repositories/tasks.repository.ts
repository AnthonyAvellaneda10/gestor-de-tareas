import { pool } from "../db/connectPostgreSQL";
import { Task } from "../models/task.model";
import { ITasksRepository } from "../interfaces/ITasksRepository"; // Importar la interfaz

export class TasksRepository implements ITasksRepository {
    async createTask(task: Task): Promise<Task> {
        const query = `
            INSERT INTO tasks (title, due_datetime, status_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [task.title, task.due_datetime, task.status_id || 1]; // 1 = pendiente
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getTasks(): Promise<Task[]> {
        const query = `
            SELECT t.*, s.name as status_name
            FROM tasks t
            JOIN status s ON t.status_id = s.id
            ORDER BY t.created_at DESC;
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async getTaskById(taskId: number): Promise<Task | null> {
        const query = 'SELECT * FROM tasks WHERE id = $1';
        const result = await pool.query(query, [taskId]);
        return result.rows.length ? result.rows[0] : null;
    }

    async updateTaskStatus(taskId: number, statusId: number): Promise<Task> {
        const query = `
            UPDATE tasks
            SET status_id = $1
            WHERE id = $2
            RETURNING *;
        `;
        const result = await pool.query(query, [statusId, taskId]);
        return result.rows[0];
    }

    async deleteTask(taskId: number): Promise<boolean> {
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *;';
        const result = await pool.query(query, [taskId]);
        return result.rowCount > 0; // Retorna true si eliminó algo, false si no encontró la tarea
    }
}