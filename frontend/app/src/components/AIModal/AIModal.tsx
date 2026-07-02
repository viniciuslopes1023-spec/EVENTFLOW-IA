import { useState } from 'react';
import { aiService } from '../../services/aiService';
import type { AIEventSuggestion } from '../../types/ai';
import './AIModal.css';

interface AIModalProps {
  onClose: () => void;
  eventId?: string;
  initialPlan?: AIEventSuggestion;
}

export function AIModal({ onClose, eventId, initialPlan }: AIModalProps) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AIEventSuggestion | null>(initialPlan || null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(initialPlan ? new Array(initialPlan.checklist.length).fill(false) : []);
  const [saved, setSaved] = useState(!!initialPlan);

  const handleSubmit = async () => {
    if (description.trim().length < 10) {
      setError('Descreva melhor seu evento (mínimo 10 caracteres)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const plan = await aiService.generateEventPlan(description);
      setResult(plan);
      setCheckedItems(new Array(plan.checklist.length).fill(false));

      if (eventId) {
        try {
          await aiService.saveEventPlan(eventId, plan);
          setSaved(true);
        } catch {
          console.error('Erro ao salvar plano');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao gerar plano. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const toggleChecklistItem = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const totalCount = result?.checklist.length || 0;

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ai-modal-close" onClick={onClose}>
          ✕
        </button>

        {!result ? (
          <div className="ai-modal-form">
            <h2>Criar evento com IA</h2>
            <p>Descreva seu evento e receba um plano completo com checklist, fornecedores e orçamento.</p>

            <textarea
              placeholder="Ex: Festa de casamento para 150 pessoas em São Paulo, estilo rústico, com jantar completo e banda ao vivo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />

            {error && <p className="ai-modal-error">{error}</p>}

            <button
              className="ai-modal-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Gerando seu plano...' : 'Gerar plano com IA'}
            </button>
          </div>
        ) : (
          <div className="ai-modal-result">
            <h2>Plano Gerado {saved && <span className="ai-saved-badge">✓ Salvo no evento</span>}</h2>

            <section className="ai-result-section">
              <h3>Checklist <span className="ai-checklist-counter">({completedCount} de {totalCount} concluídas)</span></h3>
              <ul className="ai-checklist">
                {result.checklist.map((item, index) => (
                  <li
                    key={index}
                    className={checkedItems[index] ? 'ai-checklist-checked' : ''}
                    onClick={() => toggleChecklistItem(index)}
                  >
                    <span className={`ai-checkbox ${checkedItems[index] ? 'checked' : ''}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="ai-result-section">
              <h3>Fornecedores Sugeridos</h3>
              <div className="ai-suppliers">
                {result.suppliers.map((supplier, index) => (
                  <span key={index} className="ai-supplier-badge">
                    {supplier}
                  </span>
                ))}
              </div>
            </section>

            <section className="ai-result-section">
              <h3>Orçamento Estimado</h3>
              <div className="ai-budget-card">
                <div className="ai-budget-range">
                  <span>Min</span>
                  <strong>{formatCurrency(result.estimatedBudget.min)}</strong>
                </div>
                <span className="ai-budget-separator">—</span>
                <div className="ai-budget-range">
                  <span>Max</span>
                  <strong>{formatCurrency(result.estimatedBudget.max)}</strong>
                </div>
              </div>
              <table className="ai-budget-table">
                <tbody>
                  {result.estimatedBudget.breakdown.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item}</td>
                      <td>{formatCurrency(item.estimated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="ai-result-section">
              <h3>Dicas</h3>
              <ul className="ai-tips">
                {result.tips.map((tip, index) => (
                  <li key={index}>
                    <span className="ai-tip-icon">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            <button className="ai-modal-submit" onClick={onClose}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}