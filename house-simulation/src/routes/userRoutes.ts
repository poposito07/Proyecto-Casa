import { Router } from 'express';
import { getPinAttempts, registerUser, validatePin } from '../interfaces/controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/validate-pin', validatePin);
router.get('/pin-attempts/:userId', getPinAttempts);


export default router;
