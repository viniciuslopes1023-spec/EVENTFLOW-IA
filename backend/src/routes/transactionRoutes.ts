import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:eventId/transactions', TransactionController.create);
router.get('/:eventId/transactions', TransactionController.findByEvent);
router.delete('/transactions/:id', TransactionController.delete);

export default router;