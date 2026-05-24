import '../styles/dashboard.css';

const dashboardMetrics = [
  {
    label: 'Eventos ativos',
    value: '12',
    description: '2 finalizando esta semana',
  },
  {
    label: 'Orçamento total',
    value: 'R$ 1.24M',
    description: '+18.2% vs. mês anterior',
  },
  {
    label: 'Lucro estimado',
    value: 'R$ 312K',
    description: 'Margem média 25.1%',
  },
  {
    label: 'Pendências',
    value: '7',
    description: '4 tarefas · 3 pagamentos',
  },
];

const upcomingEvents = [
  {
    name: 'Campeonato Valorant LATAM',
    date: '12 Jun',
    status: 'Em produção',
    budget: 'R$ 184.000',
  },
  {
    name: 'Tech Summit São Paulo',
    date: '28 Jun',
    status: 'Planejamento',
    budget: 'R$ 92.000',
  },
  {
    name: 'Festival Indie Music',
    date: '14 Jul',
    status: 'Confirmado',
    budget: 'R$ 320.000',
  },
];

export function DashboardPage() {
  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <strong>EventFlow IA</strong>

        <nav>
          <a className="active" href="#">Dashboard</a>
          <a href="#">Eventos</a>
          <a href="#">Financeiro</a>
          <a href="#">Tarefas</a>
          <a href="#">Fornecedores</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Bem-vindo de volta. Aqui está o resumo dos seus eventos.</p>
          </div>

          <button>Criar com IA</button>
        </header>

        <section className="dashboard-metrics">
          {dashboardMetrics.map((metric) => (
            <article className="dashboard-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.description}</small>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel">
            <div className="panel-header">
              <h2>Próximos eventos</h2>
              <a href="#">Ver todos</a>
            </div>

            <div className="event-list">
              {upcomingEvents.map((event) => (
                <div className="event-row" key={event.name}>
                  <div>
                    <strong>{event.name}</strong>
                    <span>{event.date} · {event.status}</span>
                  </div>

                  <small>{event.budget}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel ai-panel">
            <span>Insight da IA</span>
            <h2>Você pode aumentar a margem do Festival Indie em 8.4%</h2>
            <p>
              Detectamos fornecedores com cotações acima da média. Renegociar pode liberar R$ 26.800 no orçamento.
            </p>
            <button>Ver sugestões</button>
          </article>
        </section>
      </section>
    </main>
  );
}