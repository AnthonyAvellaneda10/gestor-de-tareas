import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gestor de Tareas API",
            version: "1.0.0",
            description: "API para gestionar tareas con Node.js, Express y TypeScript.",
        },
        servers: [
            {
                url: "http://localhost:5000", // URL base de tu API
                description: "Servidor local",
            },
        ],
        contact: {
            name: 'Anthony Avellaneda Paitán'
        },
        components: {
            schemas: {
                Task: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID único de la tarea.",
                        },
                        title: {
                            type: "string",
                            description: "Título de la tarea.",
                        },
                        due_datetime: {
                            type: "string",
                            format: "date-time",
                            description: "Fecha de vencimiento de la tarea.",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            description: "Fecha de creación de la tarea.",
                        },
                        status_id: {
                            type: "integer",
                            description: "ID del estado de la tarea.",
                        },
                    },
                },
                Status: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID único del estado.",
                        },
                        name: {
                            type: "string",
                            description: "Nombre del estado.",
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: "Tasks",
                description: "Operaciones relacionadas con las tareas.",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Ruta a los archivos que contienen los comentarios JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};