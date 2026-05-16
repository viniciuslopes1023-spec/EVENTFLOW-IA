import { Button } from '../components/Button/Button';
import '../styles/landing.css';


export function LandingPage() {
    return (
        <main className="landing-page">
            <section className="hero-section">
                <p className="hero-tag">Gestão inteligente de eventos</p>

                <h1>EventFlow IA</h1>

                <p className="hero-description">
                    Controle eventos, tarefas, fornecedores e finanças com apoio de inteligência artificial.
                </p>

                <Button text="Começar agora" />
            </section>
        </main>
    );
}

