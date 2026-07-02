import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import type { Transaction, CreateTransactionData } from '../services/transactionService';
import '../styles/dashboard.css';
import '../styles/financeiro.css';

export default function FinanceiroPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateTransactionData>({
    title: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: '',
  });

  useEffect(() => {
    loadTransactions();
  }, [eventId]);

  async function loadTransactions() {
    setLoading(true);
    try {
      const data = await transactionService.getByEvent(eventId!);
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await transactionService.create(eventId!, form);
      setForm({ title: '', amount: 0, type: 'expense', category: '', date: '' });
      setShowForm(false);
      loadTransactions();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(transactionId: string) {
    try {
      await transactionService.delete(eventId!, transactionId);
      loadTransactions();
    } catch (err) {
      console.error(err);
    }
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <strong>EventFlow IA</strong>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/events">Eventos</Link>
          <Link className="active" to="#">Financeiro</Link>
          <Link to="/tasks">Tarefas</Link>
          <Link to="#">Fornecedores</Link>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Financeiro</h1>
            <p>Gerencie receitas e despesas do evento.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nova Transação'}
          </button>
        </header>

        <div className="fin-summary">
          <div className="fin-summary-card fin-income">
            <span>Receitas</span>
            <strong>R$ {totalIncome.toFixed(2)}</strong>
          </div>
          <div className="fin-summary-card fin-expense">
            <span>Despesas</span>
            <strong>R$ {totalExpense.toFixed(2)}</strong>
          </div>
          <div className={`fin-summary-card ${balance >= 0 ? 'fin-balance-pos' : 'fin-balance-neg'}`}>
            <span>Saldo</span>
            <strong>R$ {balance.toFixed(2)}</strong>
          </div>
        </div>

        {showForm && (
          <article className="dashboard-panel fin-form-panel">
            <h2 className="event-form-title">Nova Transação</h2>
            <form onSubmit={handleSubmit} className="event-form-grid">
              <div className="event-form-row">
                <label className="event-label">
                  Título
                  <input
                    type="text"
                    className="event-input"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </label>
                <label className="event-label">
                  Valor (R$)
                  <input
                    type="number"
                    className="event-input"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                    required
                  />
                </label>
              </div>
              <div className="event-form-row">
                <label className="event-label">
                  Tipo
                  <select
                    className="event-input"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
                  >
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </label>
                <label className="event-label">
                  Categoria
                  <input
                    type="text"
                    className="event-input"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    placeholder="ex: local, alimentação..."
                  />
                </label>
              </div>
              <label className="event-label">
                Data
                <input
                  type="date"
                  className="event-input"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className="event-submit-btn">Salvar</button>
            </form>
          </article>
        )}

        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Transações</h2>
            <span className="events-count">{transactions.length} transação(ões)</span>
          </div>
          <div className="event-list">
            {loading && <p className="event-empty">Carregando...</p>}
            {!loading && transactions.length === 0 && (
              <p className="event-empty">Nenhuma transação ainda.</p>
            )}
            {transactions.map(t => (
              <div className="event-row" key={t.id}>
                <div>
                  <span className="fin-transaction-title">{t.title}</span>
                  <small>{t.category} · {new Date(t.date).toLocaleDateString('pt-BR')}</small>
                </div>
                <div className="event-row-actions">
                  <span className={`fin-amount ${t.type === 'income' ? 'fin-amount-income' : 'fin-amount-expense'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </span>
                  <button className="event-delete-btn" onClick={() => handleDelete(t.id)}>×</button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}