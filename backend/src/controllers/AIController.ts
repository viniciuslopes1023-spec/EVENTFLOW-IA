import type { Request, Response } from 'express';
import { AIService } from '../services/AIService.js';

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
  }
};