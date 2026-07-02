import type { Request, Response } from 'express';

export class HealthController {
    check(_request: Request, response: Response) {
        return response.status(200).json({
            status: 'ok',
            service: 'EventFlow IA API'
        })
    }
}