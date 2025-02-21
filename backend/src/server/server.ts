import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/tasks.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

app.use('/', router);

export default app;