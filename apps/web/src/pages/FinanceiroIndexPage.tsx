import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Event, eventService } from '../services/eventService';
import '../styles/dashboard.css';
import '../styles/events.css';
import { Sidebar } from '../components/Sidebar/Sidebar';

export default function FinanceiroIndexPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="dashboard-page">
      <Sidebar />
      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Financeiro</h1>
            <p>Selecione um evento para gerenciar suas finanças.</p>
          </div>
        </header>

        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Seus eventos</h2>
            <span className="events-count">{events.length} eventos</span>
          </div>
          <div className="event-list">
            {loading && <p className="event-empty">Carregando...</p>}
            {!loading && events.length === 0 && (
              <p className="event-empty">Nenhum evento criado ainda.</p>
            )}
            {events.map(event => (
              <div className="event-row" key={event.id}>
                <div>
                  <strong>{event.title}</strong>
                  <span>
                    {new Date(event.date).toLocaleDateString('pt-BR')} · {event.status}
                  </span>
                </div>
                <div className="event-row-actions">
                  <small>
                    {event.budget ? `R$ ${event.budget.toLocaleString('pt-BR')}` : 'Sem orçamento'}
                  </small>
                  <Link to={`/events/${event.id}/financeiro`} className="event-fin-btn">
                    Ver financeiro
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}