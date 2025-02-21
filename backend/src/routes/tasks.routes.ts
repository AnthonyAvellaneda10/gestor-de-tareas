import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const router = Router();
const tasksController = new TasksController();

router.post("/tasks", tasksController.createTask);
router.get("/tasks", tasksController.getTasks);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put("/tasks/:id/status", tasksController.updateStatus);

export default router;