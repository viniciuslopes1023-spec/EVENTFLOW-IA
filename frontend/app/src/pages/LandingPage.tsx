import { Button } from '../components/Button/Button';
import { FeatureCard } from '../components/FeatureCard/FeatureCard';
import { Header } from '../components/Header/Header';
import { InsightCard } from '../components/InsightCard/InsightCard';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { PricingCard } from '../components/PricingCard/PricingCard';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { aiInsight, features, heroMetrics, pricingPlans } from '../data/landingData';
import '../styles/landing.css';

type LandingPageProps = {
  onGoToLogin: () => void;
};

export function LandingPage({ onGoToLogin }: LandingPageProps) {
  return (
    <main className="landing-page">
      <Header onLoginClick={onGoToLogin} />

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-tag">Gestao inteligente de eventos</p>

          <h1>Planeje eventos com mais controle, lucro e inteligencia.</h1>

          <p className="hero-description">
            O EventFlow IA centraliza tarefas, fornecedores, cronogramas e financas para ajudar organizadores a tomar decisoes melhores.
          </p>

          <div className="hero-actions">
            <Button text="Comecar agora" onClick={onGoToLogin} />
            <Button text="Ver demonstracao" variant="secondary" />
          </div>
        </div>

        <aside className="hero-dashboard">
          {heroMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
            />
          ))}
        </aside>
      </section>

      <section className="features-section" id="features">
        <SectionHeader
          tag="Recursos principais"
          title="Uma plataforma para organizar toda a operacao do evento."
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

      <section className="ai-section" id="ai">
        <div>
          <SectionHeader
            tag="Inteligencia artificial"
            title="Use IA para transformar uma ideia de evento em plano de acao."
          />

          <p className="ai-description">
            Descreva o evento que deseja organizar e receba uma primeira versao de checklist, cronograma, orcamento e alertas operacionais.
          </p>
        </div>

        <InsightCard
          title={aiInsight.title}
          description={aiInsight.description}
          action={aiInsight.action}
        />
      </section>

      <section className="pricing-section" id="pricing">
        <SectionHeader
          tag="Planos"
          title="Comece simples e evolua conforme sua operacao cresce."
        />

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
