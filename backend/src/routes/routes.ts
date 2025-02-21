import { Router } from "express";

const router = Router();

router.get('/tasks', (req, res) => {
    res.send('Obtener tasks!');
});

router.post('/tasks', (req, res) => {
    res.send('Añadir task!');
});

export default router;