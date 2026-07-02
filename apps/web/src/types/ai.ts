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