import type { Request, Response } from 'express';
import { AIService } from '../services/AIService.js';
import { prisma } from '../config/prisma.js';

export const AIController = {
  async generateEventPlan(req: Request, res: Response) {
    try {
      const { description } = req.body;

      if (!description || description.trim().length < 10) {
        return res.status(400).json({ error: 'Descrição muito curta. Descreva melhor o seu evento.' });
      }

      const plan = await AIService.generateEventPlan(description);
      return res.status(200).json(plan);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Erro ao gerar plano com IA' });
    }
  },

  async saveEventPlan(req: Request, res: Response) {
    try {
      const eventId = req.params.eventId as string;
      const { plan } = req.body;
      const userId = (req as any).userId;

      if (!eventId) {
        return res.status(400).json({ error: 'ID do evento é obrigatório' });
      }

      const event = await prisma.event.findFirst({ where: { id: eventId, userId } });
      if (!event) return res.status(404).json({ error: 'Evento não encontrado' });

      const updated = await prisma.event.update({
        where: { id: eventId },
        data: { aiPlan: plan as any }
      });

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};