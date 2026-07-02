import { prisma } from '../config/prisma.js';

export const SupplierService = {
  async create(userId: string, eventId: string, data: {
    name: string;
    category?: string;
    contact?: string;
    value?: number;
    status?: string;
  }) {
    return prisma.supplier.create({
      data: {
        name: data.name,
        category: data.category ?? null,
        contact: data.contact ?? null,
        value: data.value ?? null,
        status: data.status || 'negotiating',
        userId,
        eventId,
      },
    });
  },

  async findByEvent(eventId: string, userId: string) {
    return prisma.supplier.findMany({
      where: { eventId, userId },
      orderBy: { createdAt: 'asc' },
    });
  },

  async update(id: string, userId: string, data: {
    name?: string;
    category?: string;
    contact?: string;
    value?: number;
    status?: string;
  }) {
    const supplier = await prisma.supplier.findFirst({ where: { id, userId } });
    if (!supplier) throw new Error('Fornecedor não encontrado');

    return prisma.supplier.update({
      where: { id },
      data,
    });
  },

  async delete(id: string, userId: string) {
    const supplier = await prisma.supplier.findFirst({ where: { id, userId } });
    if (!supplier) throw new Error('Fornecedor não encontrado');

    return prisma.supplier.delete({ where: { id } });
  },
};