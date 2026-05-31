import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1] as string;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string };
        (req as any).userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({ error: 'Token inválido' });
    }
}