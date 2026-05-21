import { Button } from '../components/Button/Button';
import { FeatureCard } from '../components/FeatureCard/FeatureCard';
import { Header } from '../components/Header/Header';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { SectionHeader} from '../components/SectionHeader/SectionHeader';
import '../styles/landing.css';

const features = [
  {
    title: 'Controle financeiro',
    description: 'Acompanhe orçamento, despesas, pagamentos pendentes e lucro estimado,'
  },
  {
    title: 'Tarefas e cronogramas',
    description: 'Organize etapas, prazos e checklists para cada eventos'
  },
  {
    title: 'Fornecedores',
    description: 'Centralize contatos, serviços, valores e status de contratação.'
  },
  {
    title: 'Insights Com IA',
    description: 'Gere checklists, alertas e sugestões para melhorar a operação.'
  },
];

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
          <MetricCard
            label="Eventos ativos"
            value="12"
            description="2 finalizando esta semana"
          />

          <MetricCard
            label="Orçamento total"
            value="R$ 1.24M"
            description="+18.2% vs. mês anterior"
          />

          <MetricCard
            label="Lucro estimado"
            value="R$ 312K"
            description="Margem média 25.1%"
          />
        </aside>
      </section>

      <section className="features-section" id="features">
        <SectionHeader
        tag="Recursos principais"
        title="Uma plataflorma para organizar toda a operação do evento"
        />
         
        <div className="features-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}