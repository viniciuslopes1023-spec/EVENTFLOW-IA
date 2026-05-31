import { Router } from 'express';
import { EventController } from '../controllers/EventController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', EventController.create);
router.get('/', EventController.findAll);
router.get('/:id', EventController.findById);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);

export default router;