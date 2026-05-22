import { Router } from 'express';

export const healthRoutes = Router();

healthRoutes.get('/health', (_request, response) => {
    return response.status(200).json({
        status: 'ok',
        service: 'EventFlow IA API',
    });
});