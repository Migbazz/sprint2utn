import { Router } from 'express';
import {
    turnosHome,
    serviciosHome,
    addTurno,
} from '../controllers/turnoController.js';



export const router = Router();

router.get('/', turnosHome);
router.get('/listadoturno', listadoHome);
router.post('/turno', addTurno);