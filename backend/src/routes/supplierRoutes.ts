import { Router } from 'express';
import { SupplierController } from '../controllers/SupplierController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:eventId/suppliers', SupplierController.create);
router.get('/:eventId/suppliers', SupplierController.findByEvent);
router.patch('/:eventId/suppliers/:id', SupplierController.update);
router.delete('/:eventId/suppliers/:id', SupplierController.delete);

export default router;