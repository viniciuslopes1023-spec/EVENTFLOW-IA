import { Button } from '../components/Button/Button';
import '../styles/auth.css';

export function LoginPage() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <span>EventFlow IA</span>
                    <h1>Entrar na plataforma</h1>
                    <p>Acesse sua conta para gerenciar eventos, tarefas e finanças.</p>
                </div>

                <form className="auth-form">
                    <label>
                        Email
                        <input type="email" placeholder="seuemail@empresa.com" />
                    </label>

                    <label>
                        Senha
                        <input type="password" placeholder="Digite sua senha" />
                    </label>

                    <Button text="Entrar" />
                </form>

                <p className="auth-footer">
                    Ainda não tem conta? <a href="#">Criar conta</a>
                </p>
            </section>
        </main>
    );
}