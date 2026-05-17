import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import '../styles/landing.css';

export function LandingPage() {
  return (
    <main className="landing-page">
      <Header />

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-tag">Gestão inteligente de eventos</p>

          <h1>Planeje eventos com mais controle, lucro e inteligência.</h1>

          <p className="hero-description">
            O EventFlow IA centraliza tarefas, fornecedores, cronogramas e finanças para ajudar organizadores a tomar decisões melhores.
          </p>

          <div className="hero-actions">
            <Button text="Começar agora" />
            <Button text="Ver demonstração" variant="secondary" />
          </div>
        </div>

        <aside className="hero-dashboard">
          <div className="dashboard-card">
            <span>Eventos ativos</span>
            <strong>12</strong>
            <small>2 finalizando esta semana</small>
          </div>

          <div className="dashboard-card">
            <span>Orçamento total</span>
            <strong>R$ 1.24M</strong>
            <small>+18.2% vs. mês anterior</small>
          </div>

          <div className="dashboard-card">
            <span>Lucro estimado</span>
            <strong>R$ 312K</strong>
            <small>Margem média 25.1%</small>
          </div>
        </aside>
      </section>

      <section className="features-section" id="features">
        <div className="section-header">
          <p className="hero-tag">Recursos principais</p>
          <h2>Uma plataforma para organizar toda a operação do evento.</h2>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <h3>Controle financeiro</h3>
            <p>Acompanhe orçamento, despesas, pagamentos pendentes e lucro estimado.</p>
          </article>

          <article className="feature-card">
            <h3>Tarefas e cronogramas</h3>
            <p>Organize etapas, prazos e checklists para cada evento.</p>
          </article>

          <article className="feature-card">
            <h3>Fornecedores</h3>
            <p>Centralize contatos, serviços, valores e status de contratação.</p>
          </article>

          <article className="feature-card">
            <h3>Insights com IA</h3>
            <p>Gere checklists, alertas e sugestões para melhorar a operação.</p>
          </article>
        </div>
      </section>
    </main>
  );
}