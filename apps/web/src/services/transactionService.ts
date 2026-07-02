import api from './api';

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    eventId: string;
    createAdt: string;
};

export type CreateTransactionData = {
    title: string,
    amount: number,
    type: 'income' | 'expense',
    category: string,
    date: string
};

export const transactionService = {
    async getByEvent(eventId: string): Promise<Transaction[]> {
        const { data } = await api.get(`/api/events/${eventId}/transactions`)
        return data;
    },
    async create(eventId: string, transactionData: CreateTransactionData): Promise<Transaction> {
        const { data } = await api.post(`/api/events/${eventId}/transactions`, transactionData);
        return data;
    },
    async delete(eventId: string, transactionId: string): Promise<void> {
        await api.delete(`/api/events/${eventId}/transactions/${transactionId}`);
    }
};