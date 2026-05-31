import { useEffect, useState } from 'react';
import { type CreateEventData, type Event, eventService } from '../services/eventService';
import '../styles/dashboard.css';

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateEventData>({
    title: '',
    date: '',
    description: '',
    location: '',
    budget: undefined,
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await eventService.getAll();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!form.title || !form.date) return;
    try {
      await eventService.create(form);
      setForm({ title: '', date: '', description: '', location: '', budget: undefined });
      setShowForm(false);
      await loadEvents();
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await eventService.delete(id);
      await loadEvents();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  }

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <strong>EventFlow IA</strong>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a className="active" href="/events">Eventos</a>
          <a href="#">Financeiro</a>
          <a href="#">Tarefas</a>
          <a href="#">Fornecedores</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Eventos</h1>
            <p>Gerencie todos os seus eventos em um só lugar.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Novo evento'}
          </button>
        </header>

        {showForm && (
          <article className="dashboard-panel" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginTop: 0 }}>Novo evento</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                placeholder="Título do evento *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-soft)', color: 'var(--text)' }}
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-soft)', color: 'var(--text)' }}
              />
              <input
                placeholder="Local"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-soft)', color: 'var(--text)' }}
              />
              <input
                type="number"
                placeholder="Orçamento (R$)"
                value={form.budget || ''}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-soft)', color: 'var(--text)' }}
              />
              <textarea
                placeholder="Descrição"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-soft)', color: 'var(--text)', minHeight: '80px' }}
              />
              <button onClick={handleCreate} style={{ padding: '12px', borderRadius: '8px', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Criar evento
              </button>
            </div>
          </article>
        )}

        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Todos os eventos</h2>
            <span style={{ color: 'var(--muted)' }}>{events.length} eventos</span>
          </div>

          <div className="event-list">
            {loading && <p>Carregando...</p>}
            {!loading && events.length === 0 && (
              <p style={{ color: 'var(--muted)' }}>Nenhum evento criado ainda.</p>
            )}
            {events.map((event) => (
              <div className="event-row" key={event.id}>
                <div>
                  <strong>{event.title}</strong>
                  <span>
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                    {event.location && ` · ${event.location}`}
                    {` · ${event.status}`}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <small>
                    {event.budget ? `R$ ${event.budget.toLocaleString('pt-BR')}` : 'Sem orçamento'}
                  </small>
                  <button
                    onClick={() => handleDelete(event.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}