import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/tasks.routes';
import { errorHandler } from '../middlewares/errorHandler'; // Importar el middleware de errores
import { setupSwagger } from '../swagger/swagger'; // Importar la configuración de Swagger

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

setupSwagger(app);

app.use(errorHandler);

export default app;