import { Router } from 'express';
import {
    homeTurnos, 
    formTurno,
    getTurno,
    mostrarTurno,
    borrarTurno,
    getTurnoByID,
    updateTurnos,
    servicioHome
} from '../controllers/turnoController.js';



export const router = Router();

router.get('/', homeTurnos);
router.get('/servicios', servicioHome);
router.get('/turno', getTurno);
router.get('/listadoturno', mostrarTurno);
router.get('/editarturno/:id', getTurnoByID);
router.post('/addTurno', formTurno);
router.put('/editarturno/:id', updateTurnos);
router.get('/delete/:id', borrarTurno);
