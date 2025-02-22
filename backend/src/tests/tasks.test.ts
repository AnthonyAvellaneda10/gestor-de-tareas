import { Task } from "../models/task.model";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksService } from "../services/tasks.service";

describe("TasksService", () => {
    let tasksRepository: TasksRepository;
    let tasksService: TasksService;

    beforeEach(() => {
        tasksRepository = new TasksRepository();
        tasksService = new TasksService(tasksRepository);
    });

    it("debe actualizar el estado de una tarea vencida a 'atrasada'", async () => {
        // Mock de una tarea vencida
        const task: Task = {
            id: 1,
            title: "Tarea vencida",
            due_datetime: new Date("2023-01-01T00:00:00Z"), // Fecha pasada
            status_id: 1, // Pendiente
        };

        // Mock de la función getTasks del repositorio
        jest.spyOn(tasksRepository, "getTasks").mockResolvedValue([task]);

        // Mock de la función updateTaskStatus del repositorio
        const updateSpy = jest.spyOn(tasksRepository, "updateTaskStatus").mockResolvedValue({
            ...task,
            status_id: 4, // Atrasada
        });

        // Ejecutar la función a probar (getTasks llama a updateTaskStatusForOverdueTasks)
        await tasksService.getTasks();

        // Verificar que se llamó a updateTaskStatus con los parámetros correctos
        expect(updateSpy).toHaveBeenCalledWith(task.id, 4);
    });

    it("no debe actualizar el estado de una tarea completada", async () => {
        // Mock de una tarea completada
        const task: Task = {
            id: 2,
            title: "Tarea completada",
            due_datetime: new Date("2023-01-01T00:00:00Z"), // Fecha pasada
            status_id: 3, // Completada
        };

        // Mock de la función getTasks del repositorio
        jest.spyOn(tasksRepository, "getTasks").mockResolvedValue([task]);

        // Mock de la función updateTaskStatus del repositorio
        const updateSpy = jest.spyOn(tasksRepository, "updateTaskStatus");

        // Ejecutar la función a probar (getTasks llama a updateTaskStatusForOverdueTasks)
        await tasksService.getTasks();

        // Verificar que no se llamó a updateTaskStatus
        expect(updateSpy).not.toHaveBeenCalled();
    });
});