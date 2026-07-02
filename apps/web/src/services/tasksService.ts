import api from './api';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  eventId: string;
  createdAt: string;
};

export const taskService = {
  async getByEvent(eventId: string): Promise<Task[]> {
    const { data } = await api.get(`/api/events/${eventId}/tasks`);
    return data;
  },

  async create(eventId: string, title: string): Promise<Task> {
    const { data } = await api.post(`/api/events/${eventId}/tasks`, { title });
    return data;
  },

  async toggleDone(id: string): Promise<Task> {
    const { data } = await api.patch(`/api/tasks/${id}/toggle`);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/tasks/${id}`);
  },
};