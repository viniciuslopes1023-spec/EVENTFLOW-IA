import type { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';

export const AuthController = {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Preencha todos os campos' });
            }

            const user = await AuthService.register(name, email, password);
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Preencha todos os campos' });
            }

            const result = await AuthService.login(email, password);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    },
};