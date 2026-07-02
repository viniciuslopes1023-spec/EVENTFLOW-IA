import api from './api';
import type { AIEventSuggestion } from '../types/ai';

export const aiService = {
  async generateEventPlan(description: string): Promise<AIEventSuggestion> {
    const { data } = await api.post('/api/ai/generate-plan', { description });
    return data;
  }
};