import type { Request, Response } from 'express';
import { SupplierService } from '../services/SupplierService.js';

export const SupplierController = {
  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { eventId } = req.params as { eventId: string };
      const { name, category, contact, value, status } = req.body;

      if (!name) return res.status(400).json({ error: 'Nome obrigatório' });

      const supplier = await SupplierService.create(userId, eventId, {
        name,
        category,
        contact,
        value,
        status,
      });
      return res.status(201).json(supplier);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findByEvent(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { eventId } = req.params as { eventId: string };
      const suppliers = await SupplierService.findByEvent(eventId, userId);
      return res.status(200).json(suppliers);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params as { id: string };
      const { name, category, contact, value, status } = req.body;

      const supplier = await SupplierService.update(id, userId, {
        name,
        category,
        contact,
        value,
        status,
      });
      return res.status(200).json(supplier);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params as { id: string };
      await SupplierService.delete(id, userId);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};