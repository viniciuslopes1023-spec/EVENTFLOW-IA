import { Router } from 'express';
import { TaskController } from '../controllers/TaskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:eventId/tasks', TaskController.create);
router.get('/:eventId/tasks', TaskController.findByEvent);
router.patch('/tasks/:id/toggle', TaskController.toggleDone);
router.delete('/tasks/:id', TaskController.delete);

export default router;