import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";
import { TasksService } from "../services/tasks.service";
import { TasksRepository } from "../repositories/tasks.repository";

const router = Router();

const tasksRepository = new TasksRepository();
const tasksService = new TasksService(tasksRepository);
const tasksController = new TasksController(tasksService); // Inyectar TasksService

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Operaciones relacionadas con las tareas.
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea con un título y una fecha de vencimiento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en la solicitud.
 */
router.post("/tasks", tasksController.createTask.bind(tasksController));

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Obtener todas las tareas
 *     description: Retorna una lista de todas las tareas.
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/tasks", tasksController.getTasks.bind(tasksController));

/**
 * @swagger
 * /tasks/{id}/status:
 *   put:
 *     tags: [Tasks]
 *     summary: Actualizar el estado de una tarea
 *     description: Actualiza el estado de una tarea específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea.
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en la solicitud.
 *       404:
 *         description: Tarea no encontrada.
 */
router.put("/tasks/:id/status", tasksController.updateStatus.bind(tasksController));

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea.
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 */
router.delete("/tasks/:id", tasksController.deleteTask.bind(tasksController));

export default router;