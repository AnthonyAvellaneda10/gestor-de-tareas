import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void { // Asegúrate de que la función devuelva `void`
    console.error(err.stack); // Log del error en la consola

    // Manejar errores específicos
    if (err.message === "La fecha de vencimiento debe ser al menos 1 hora en el futuro") {
        res.status(400).json({ message: err.message });
        return; // Terminar la ejecución de la función
    }

    if (err.message === "Tarea no encontrada") {
        res.status(404).json({ message: err.message });
        return; // Terminar la ejecución de la función
    }

    if (err.message === "No se puede actualizar la tarea") {
        res.status(400).json({ message: err.message });
        return; // Terminar la ejecución de la función
    }

    // Respuesta genérica para otros errores
    res.status(500).json({ message: "Algo salió mal" });
}