import { Router } from 'express';
import taskController from './taskController';
import authController from './authController';

const router = Router();

router.use('/task', taskController);
router.use('/auth', authController);

export default router;
