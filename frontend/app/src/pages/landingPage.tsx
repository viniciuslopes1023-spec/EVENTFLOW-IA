import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import '../styles/landing.css';

export function LandingPage() {
  return (
    <main className="landing-page">
      <Header/>

      <section className="hero-section">
        <p className="hero-tag">Gestão inteligente de eventos</p>

        <h1>Planeje eventos com mais controle, lucro e inteligência.</h1>

        <p className="hero-description">
          O EventFlow IA centraliza tarefas, fornecedores, cronogramas e finanças para ajudar organizadores a tomar decisões melhores.
        </p>

        <div className="hero-actions">
          <Button text="Começar agora" />
          <Button text="Ver demonstração" variant="secondary" />
        </div>

        <div className="hero-stats">
          <div>
            <strong>12+</strong>
            <span>eventos ativos</span>
          </div>

          <div>
            <strong>R$ 312K</strong>
            <span>lucro estimado</span>
          </div>

          <div>
            <strong>IA</strong>
            <span>checklists automáticos</span>
          </div>
        </div>
      </section>
    </main>
  );
}