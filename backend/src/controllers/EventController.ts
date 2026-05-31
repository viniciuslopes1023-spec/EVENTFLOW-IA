import type { Request, Response } from 'express';
import { EventService } from '../services/EventService.js';

export const EventController = {
  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { title, description, date, location, budget } = req.body;

      if (!title || !date) {
        return res.status(400).json({ error: 'Título e data são obrigatórios' });
      }

      const event = await EventService.create(userId, { title, description, date, location, budget });
      return res.status(201).json(event);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const events = await EventService.findAll(userId);
      return res.status(200).json(events);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params as { id: string };
      const event = await EventService.findById(id, userId);
      if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
      return res.status(200).json(event);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params as { id: string };
      const event = await EventService.update(id, userId, req.body);
      return res.status(200).json(event);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params as { id: string };
      await EventService.delete(id, userId);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};