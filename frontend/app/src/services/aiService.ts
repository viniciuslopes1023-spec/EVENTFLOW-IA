import api from './api';
import type { AIEventSuggestion } from '../types/ai';

export const aiService = {
  async generateEventPlan(description: string): Promise<AIEventSuggestion> {
    const { data } = await api.post('/api/ai/generate-plan', { description });
    return data;
  },

  async saveEventPlan(eventId: string, plan: AIEventSuggestion): Promise<void> {
    await api.post(`/api/ai/events/${eventId}/save-plan`, { plan });
  }
};