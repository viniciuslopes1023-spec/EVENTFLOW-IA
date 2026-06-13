import type { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService.js';

export const TransactionController = {
    async create(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { eventId } = req.params as { eventId: string };
            const { title, amount, type, category, date } = req.body;

            if (!title || !amount || !date) {
                return res.status(400).json({ error: 'Campos obrigatórios faltando' });
            }

            const transaction = await TransactionService.create(userId, eventId, {
                title, amount: Number(amount), type, category, date, eventId,
            });
            return res.status(201).json(transaction);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },
    async findByEvent(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { eventId } = req.params as { eventId: string };
            const transactions = await TransactionService.finByEvent(eventId, userId);
            return res.status(200).json(transactions);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { id } = req.params as { id: string };
            await TransactionService.delete(id, userId);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}