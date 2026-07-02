import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface AIEventSuggestion {
  checklist: string[];
  suppliers: string[];
  estimatedBudget: {
    min: number;
    max: number;
    breakdown: { item: string; estimated: number }[];
  };
  tips: string[];
}

export const AIService = {
  async generateEventPlan(description: string): Promise<AIEventSuggestion> {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Você é um assistente especialista em planejamento de eventos no Brasil.
          Quando o usuário descrever um evento, responda APENAS com um JSON válido no seguinte formato, sem texto adicional:
          {
            "checklist": ["tarefa 1", "tarefa 2", ...],
            "suppliers": ["tipo de fornecedor 1", "tipo de fornecedor 2", ...],
            "estimatedBudget": {
              "min": 0000,
              "max": 0000,
              "breakdown": [
                { "item": "nome do item", "estimated": 000 }
              ]
            },
            "tips": ["dica 1", "dica 2", ...]
          }

          Gere:
          - checklist: 8 a 12 tarefas práticas para organizar o evento
          - suppliers: 5 a 8 tipos de fornecedores necessários
          - estimatedBudget: orçamento estimado em reais com breakdown detalhado
          - tips: 3 a 5 dicas importantes para esse tipo de evento

          Responda SOMENTE o JSON, sem markdown, sem explicações.`
        },
        {
          role: 'user',
          content: description
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '{}';

    try {
      return JSON.parse(content) as AIEventSuggestion;
    } catch {
      throw new Error('Erro ao processar resposta da IA');
    }
  }
};