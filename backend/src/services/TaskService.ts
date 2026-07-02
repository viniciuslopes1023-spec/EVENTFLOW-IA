import { prisma } from '../config/prisma.js';

export const TaskService = {
  async create(userId: string, eventId: string, title: string) {
    return prisma.task.create({
      data: { title, userId, eventId },
    });
  },

  async findByEvent(eventId: string, userId: string) {
    return prisma.task.findMany({
      where: { eventId, userId },
      orderBy: { createdAt: 'asc' },
    });
  },

  async toggleDone(id: string, userId: string) {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new Error('Tarefa não encontrada');
    return prisma.task.update({
      where: { id },
      data: { done: !task.done },
    });
  },

 async delete(id: string, userId: string) {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new Error('Tarefa não encontrada');
  return prisma.task.delete({ where: { id } });
},
};