import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import type { Transaction, CreateTransactionData } from '../services/transactionService';

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

  if (loading) return <div className="p-8 text-white">Carregando...</div>;

  return (
    <div className="p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Financeiro</h1>

        {/* Resumo */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-900/40 border border-green-700 rounded-lg p-4">
            <p className="text-sm text-green-400">Receitas</p>
            <p className="text-2xl font-bold text-green-400">R$ {totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-red-900/40 border border-red-700 rounded-lg p-4">
            <p className="text-sm text-red-400">Despesas</p>
            <p className="text-2xl font-bold text-red-400">R$ {totalExpense.toFixed(2)}</p>
          </div>
          <div className={`${balance >= 0 ? 'bg-blue-900/40 border-blue-700' : 'bg-red-900/40 border-red-700'} border rounded-lg p-4`}>
            <p className="text-sm text-gray-400">Saldo</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              R$ {balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Botão adicionar */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? 'Cancelar' : '+ Nova Transação'}
        </button>

        {/* Formulário */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 mb-6 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-gray-400">Título</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Valor (R$)</label>
              <input
                type="number"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Tipo</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Categoria</label>
              <input
                type="text"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Data</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                Salvar
              </button>
            </div>
          </form>
        )}

        {/* Lista */}
        <div className="space-y-3">
          {transactions.length === 0 && (
            <p className="text-gray-500">Nenhuma transação ainda.</p>
          )}
          {transactions.map(t => (
            <div key={t.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-gray-400">{t.category} · {new Date(t.date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-gray-500 hover:text-red-400 text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}