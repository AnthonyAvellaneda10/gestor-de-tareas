<h1 align="center">Gestor de Tareas 🚀</h1>

Este proyecto es una aplicación full-stack que permite gestionar tareas, incluyendo la creación, listado y actualización de su estado. El backend está desarrollado en **Node.js con TypeScript y PostgreSQL**, mientras que el frontend está construido con **Angular y TailwindCSS**.

## ![Screenshot](https://i.ibb.co/sD7BGYB/task-manager.png)

## Estructura del proyecto
El proyecto está dividido en dos carpetas principales:

1. **Backend:** Contiene la API RESTful para gestionar tareas.

2. **Frontend**: Contiene la interfaz de usuario desarrollada en Angular.

## Requerimientos

- Node.js (v22.13.1 o superior)
- PostgreSQL (v16 o superior)
- npm (v10.9.2 o superior)
- Angular (v18)

---

## Instalación y configuración
### Backend

1. Clona el repositorio:

```bash
git clone https://github.com/AnthonyAvellaneda10/gestor-de-tareas.git
cd gestor-de-tareas/backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar la base de datos:

    - Crea una base de datos en PostgreSQL llamada `task_manager`.

    - Copia el script SQL proporcionado en `database.sql` para crear las tablas e insertar datos iniciales.

    - Configura las variables de entorno:

      - Crea un archivo .env en la carpeta del proyecto `backend` y agrega las siguientes variables:

          ```bash
          DB_HOST=localhost
          DB_PORT=5432
          DB_USER=tu-usuario
          DB_PASSWORD=tu-contraseña
          DB_DATABASE=task_manager
          PORT=5000
          ```

4. Ejecutar el servidor

- En modo desarrollo:

```bash
npm run dev
```
- En producción:

```bash
npm run build
npm start
```

5. Documentación de la API

La documentación de la API está disponible en `http://localhost:5000/api-docs`. Añadí Swagger para proporcionar una interfaz gráfica que describe los endpoints, parámetros y respuestas.

## ![Swagger](https://i.ibb.co/qYYVMqWF/swagger.png)

## Frontend
1. Navegar a la carpeta `frontend`

```bash
cd ../frontend
```
2. Instalar dependencias:

```bash
npm install
```

3. Configurar el entorno

    - Asegúrate de que el backend esté en ejecución.

    - Configura la URL del backend en el archivo src/environments/environment.ts:

```javascript 
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000', // URL del backend
};
```

4. Ejecutar la aplicación

```bash
ng s -o
```

La aplicación estará disponible en `http://localhost:4200`.

---

# Arquitectura Empleada

## Backend

- **MVC:** El backend sigue el patrón Modelo-Vista-Controlador.
- **Modelos:** Representan las entidades de la base de datos (`Task`, `Status`).
- **Controladores:** Manejan las solicitudes HTTP (`TasksController`).
- **Servicios:** Contienen la lógica de negocio (`TasksService`).
- **Repositorios:** Gestionan las consultas a la base de datos (`TasksRepository`).

### Principios SOLID

- **Single Responsibility:** Cada clase tiene una única responsabilidad.
- **Dependency Injection:** Los servicios y repositorios se inyectan donde se necesitan.

## Frontend

- **Componentes:** La interfaz está dividida en componentes reutilizables (`TaskCard`, `KanbanColumn`, etc.).
- **Servicios:** Se utiliza un servicio (`TasksService`) para interactuar con la API del backend.
- **Rutas:** La navegación está configurada en `app.routes.ts`.
- **Estilos:** Se utiliza Tailwind CSS para los estilos, aprovechando flexbox y grid.

# Funcionalidades

## Backend

### Endpoints

- **POST /tasks:** Crear una nueva tarea.
- **GET /tasks:** Obtener el listado de tareas.
- **PUT /tasks/:id/status:** Actualizar el estado de una tarea.
- **DELETE /tasks/:id:** Eliminar una tarea.

### Regla de Negocio

- Si una tarea tiene una fecha de vencimiento pasada y no está completada, su estado se actualiza automáticamente a "atrasada".

## Frontend

### Listado de Tareas

- Muestra el ID, título, fecha de vencimiento y estado de cada tarea.
- Permite actualizar el estado de una tarea (pendiente → en progreso → completada).

### Formulario de Tareas

- Permite agregar una nueva tarea con título y fecha de vencimiento.

### Estilos

- Diseño responsivo utilizando Tailwind CSS.

# Pruebas Unitarias

El backend incluye pruebas unitarias para verificar la actualización del estado de una tarea vencida. Para ejecutar las pruebas:

```bash
cd ..\backend
npm run test:watch
```

# Entregables

- **Backend:** API RESTful en Node.js con TypeScript y PostgreSQL.
- **Frontend:** Interfaz de usuario en Angular con Tailwind CSS.
- **README:** Documentación breve con instrucciones para instalar, configurar y ejecutar el proyecto.

# Consideraciones

- **Backend:** Asegúrate de que PostgreSQL esté en ejecución y configurado correctamente.
- **Frontend:** Asegúrate de que el backend esté en ejecución antes de iniciar el frontend.
- **Pruebas:** Las pruebas unitarias están enfocadas en la lógica de negocio del backend.