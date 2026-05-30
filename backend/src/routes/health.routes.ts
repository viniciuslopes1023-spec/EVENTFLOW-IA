import { Router } from 'express';
import { HealthController } from '../controllers/HealthController.js';

export const healthRoutes = Router();

const healthController = new HealthController();

healthRoutes.get('/health', healthController.check.bind(healthController));