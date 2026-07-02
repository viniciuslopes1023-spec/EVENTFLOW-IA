import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type CreateEventData, type Event, eventService } from '../services/eventService';
import '../styles/dashboard.css';
import '../styles/events.css';
import { Sidebar } from '../components/Sidebar/Sidebar';


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
      <Sidebar />

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
          <article className="dashboard-panel event-form-panel">
            <h2 className="event-form-title">Novo evento</h2>
            <div className="event-form-grid">
              <input
                className="event-input"
                placeholder="Título do evento *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <div className="event-form-row">
                <label className="event-label">
                  Data
                  <input
                    className="event-input"
                    type="date"
                    value={form.date ? form.date.split('T')[0] : ''}
                    onChange={(e) => setForm({ ...form, date: e.target.value + 'T' + (form.date?.split('T')[1] || '00:00') })}
                  />
                </label>
                <label className="event-label">
                  Horário
                  <input
                    className="event-input"
                    type="time"
                    value={form.date ? form.date.split('T')[1] || '00:00' : '00:00'}
                    onChange={(e) => setForm({ ...form, date: (form.date?.split('T')[0] || '') + 'T' + e.target.value })}
                  />
                </label>
              </div>
              <input
                className="event-input"
                placeholder="Local"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input
                className="event-input"
                type="number"
                min="0"
                placeholder="Orçamento (R$)"
                value={form.budget || ''}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
              />
              <textarea
                className="event-input event-textarea"
                placeholder="Descrição do evento"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <button className="event-submit-btn" onClick={handleCreate}>
                Criar evento
              </button>
            </div>
          </article>
        )}

        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Todos os eventos</h2>
            <span className="events-count">{events.length} eventos</span>
          </div>

          <div className="event-list">
            {loading && <p className="event-empty">Carregando...</p>}
            {!loading && events.length === 0 && (
              <p className="event-empty">Nenhum evento criado ainda.</p>
            )}
            {events.map((event) => (
              <div className="event-row" key={event.id}>
                <div>
                  <strong>{event.title}</strong>
                  <span>
                    {new Date(event.date).toLocaleDateString('pt-BR')} às {new Date(event.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    {event.location && ` · ${event.location}`}
                    {` · ${event.status}`}
                  </span>
                </div>
                <div className="event-row-actions">
                  <small>
                    {event.budget ? `R$ ${event.budget.toLocaleString('pt-BR')}` : 'Sem orçamento'}
                  </small>
                  <Link to={`/events/${event.id}/financeiro`} className="event-fin-btn">
                    Financeiro
                  </Link>
                  <button className="event-delete-btn" onClick={() => handleDelete(event.id)}>
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