import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { type Event, eventService } from '../services/eventService';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/dashboard.css';

export function DashboardPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const totalBudget = events.reduce((acc, e) => acc + (e.budget || 0), 0);
  const activeEvents = events.filter(e => e.status !== 'finished').length;

  return (
    <main className="dashboard-page">
      <Sidebar />

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Bem-vindo, {user?.name}. Aqui está o resumo dos seus eventos.</p>
          </div>
          <button>Criar com IA</button>
        </header>

        <section className="dashboard-metrics">
          <article className="dashboard-metric">
            <span>Eventos ativos</span>
            <strong>{activeEvents}</strong>
            <small>{events.length} no total</small>
          </article>
          <article className="dashboard-metric">
            <span>Orçamento total</span>
            <strong>R$ {totalBudget.toLocaleString('pt-BR')}</strong>
            <small>Soma de todos os eventos</small>
          </article>
          <article className="dashboard-metric">
            <span>Pendências</span>
            <strong>0</strong>
            <small>Nenhuma tarefa pendente</small>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel">
            <div className="panel-header">
              <h2>Próximos eventos</h2>
              <Link to="/events">Ver todos</Link>
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
                      {new Date(event.date).toLocaleDateString('pt-BR')} · {event.status}
                    </span>
                  </div>
                  <div className="event-row-actions">
                    <small>
                      {event.budget
                        ? `R$ ${event.budget.toLocaleString('pt-BR')}`
                        : 'Sem orçamento'}
                    </small>
                    <Link to={`/events/${event.id}/financeiro`} className="event-fin-btn">
                      Financeiro
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel ai-panel">
            <span>Insight da IA</span>
            <h2>Crie seu primeiro evento com IA</h2>
            <p>
              Descreva o evento que deseja organizar e receba checklist, cronograma e orçamento automaticamente.
            </p>
            <button>Criar com IA</button>
          </article>
        </section>
      </section>
    </main>
  );
}