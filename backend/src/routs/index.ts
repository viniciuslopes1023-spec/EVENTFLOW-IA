import { Router } from 'express';
import { healthRoutes } from './health.routes.js';

export const router = Router();

router.use(healthRoutes);