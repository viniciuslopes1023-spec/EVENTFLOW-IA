import api from './api';
import type { AIEventSuggestion } from '../types/ai';

export type Event = {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  budget?: number;
  status: string;
  aiPlan?: AIEventSuggestion;
  createdAt: string;
};

export type CreateEventData = {
  title: string;
  description?: string;
  date: string;
  location?: string;
  budget?: number;
};

export const eventService = {
  async getAll(): Promise<Event[]> {
    const { data } = await api.get('/api/events');
    return data;
  },

  async create(eventData: CreateEventData): Promise<Event> {
    const { data } = await api.post('/api/events', eventData);
    return data;
  },

  async update(id: string, eventData: Partial<CreateEventData>): Promise<Event> {
    const { data } = await api.put(`/api/events/${id}`, eventData);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/events/${id}`);
  },
};