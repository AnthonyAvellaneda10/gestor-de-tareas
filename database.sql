-- Eliminar tablas si existen para evitar errores al volver a ejecutar el script
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS status;

-- Crear tabla de estados
CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Insertar valores iniciales en la tabla status
INSERT INTO status (name) VALUES 
    ('pendiente'),
    ('en progreso'),
    ('completada'),
    ('atrasada');

-- Crear tabla de tareas
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    due_datetime TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status_id INTEGER NOT NULL DEFAULT 1 REFERENCES status(id)
);

-- Crear índices para optimizar consultas
CREATE INDEX idx_tasks_status ON tasks(status_id);
CREATE INDEX idx_tasks_due_datetime ON tasks(due_datetime);

-- Insertar 5 tareas de prueba sin especificar status_id (por defecto será "pendiente")
INSERT INTO tasks (title, due_datetime) VALUES 
    ('Completar informe financiero', '2025-03-10 15:00:00'),  -- Pendiente (fecha futura)
    ('Revisar código de API', '2025-02-25 18:30:00'),        -- Pendiente (fecha futura)
    ('Enviar propuesta a cliente', '2025-02-15 10:00:00'),   -- Pendiente (pero vencida)
    ('Preparar presentación mensual', '2025-02-18 09:00:00'); -- Pendiente (pero vencida)
    
-- Ver la información de la tabla 'tasks'
SELECT * 
FROM tasks 
ORDER BY created_at DESC;

-- Ver la información de la tabla 'status'
select * from status;