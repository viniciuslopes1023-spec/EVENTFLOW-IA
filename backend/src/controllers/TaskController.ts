import type { Request, Response } from 'express';
import { TaskService } from '../services/TaskService.js';

export const TaskController = {
    async create(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { eventId } = req.params as { eventId: string };
            const { title } = req.body;

            if (!title) return res.status(400).json({ error: 'Título obrigatório' });

            const task = await TaskService.create(userId, eventId, title);
            return res.status(201).json(task);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async findByEvent(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { eventId } = req.params as { eventId: string };
            const tasks = await TaskService.findByEvent(eventId, userId);
            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async toggleDone(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { id } = req.params as { id: string };
            const task = await TaskService.toggleDone(id, userId);
            return res.status(200).json(task);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { id } = req.params as { id: string };
            await TaskService.delete(id, userId);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },
};