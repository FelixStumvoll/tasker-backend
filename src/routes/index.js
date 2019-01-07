import { Router } from 'express';
import taskController from './taskController';

const router = Router();

router.use('/task', taskController);

export default router;
