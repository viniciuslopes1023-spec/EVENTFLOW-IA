import { prisma } from '../config/prisma.js';

export const EventService = {
  async create(userId: string, data: {
    title: string;
    description?: string;
    date: string;
    location?: string;
    budget?: number;
  }) {
    return prisma.event.create({
      data: {
        ...data,
        date: new Date(data.date),
        userId,
      },
    });
  },

  async findAll(userId: string) {
    return prisma.event.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.event.findFirst({
      where: { id, userId },
    });
  },

  async update(id: string, userId: string, data: {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    budget?: number;
    status?: string;
  }) {
    const { date, ...rest } = data;
    return prisma.event.update({
      where: { id },
      data: {
        ...rest,
        ...(date ? { date: new Date(date) } : {}),
      },
    });
  },

  async delete(id: string, userId: string) {
    return prisma.event.delete({
      where: { id },
    });
  },
};