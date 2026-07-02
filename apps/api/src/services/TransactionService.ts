import { prisma } from '../config/prisma.js';

export const TransactionService = {
    async create(userId: string, eventId: string, data:{
        title: string,
        amount: number,
        type: string,
        category?: string,
        date: string,
        eventId: string;

    }) {
        return prisma.transaction.create({
            data: {
                ...data,
                date: new Date(data.date),
                userId,
            },
        });
    },

    async finByEvent(eventId:string, userId: string) {
        return prisma.transaction.findMany({
            where: {eventId, userId},
            orderBy: {date: 'desc'}
        });
    },

    async delete(id: string, userId: string) {
        return prisma.transaction.delete({
            where: {id},
        });
    },

};