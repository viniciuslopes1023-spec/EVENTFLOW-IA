import { Router } from 'express';
import { AIController } from '../controllers/AIController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.post('/generate-plan', AIController.generateEventPlan);

export default router;