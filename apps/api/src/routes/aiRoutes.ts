import { Router } from 'express';
import { AIController } from '../controllers/AIController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.post('/generate-plan', AIController.generateEventPlan);
router.post('/events/:eventId/save-plan', AIController.saveEventPlan);

export default router;