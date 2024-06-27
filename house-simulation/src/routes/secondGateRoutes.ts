import { Router } from 'express';
import { getSecondGateState, updateSecondGateState } from '../interfaces/controllers/secondGateController';

const router = Router();

router.get('/second-gate/state', getSecondGateState);
router.post('/second-gate/state', updateSecondGateState);

export default router;
