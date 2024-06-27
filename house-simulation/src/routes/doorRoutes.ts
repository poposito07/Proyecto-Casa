import { Router } from 'express';
import { getDoorState, updateDoorState } from '../interfaces/controllers/doorController';

const router = Router();

router.get('/state', getDoorState);
router.post('/state', updateDoorState);

export default router;
