import { Button } from '../components/Button/Button';
import '../styles/auth.css';

export function RegisterPage() {
    return (
        <main className="auth-page ">
            <section className="auth-card">
                <div className="auth-header">
                    <span>EventFlow IAw</span>
                    <h1>Criar conta</h1>
                    <p>Comece a organizar eventos com controle financeiro e apoio de IA</p>
                </div>

                <form className="auth-form">
                    <label>
                        Nome
                        <input type="text" placeholder="Seu nome" />
                    </label>

                    <label>
                        Email
                        <input type="email" placeholder="seuemail@empresa.com" />
                    </label>

                    <label>
                        Senha
                        <input type="password" placeholder="Crie uma senha" />
                    </label>

                    <Button text="Criar conta" />
                </form>

                <p className="auth-footer">
                    Já tem uma conta? <a href="#">Entrar</a>
                </p>
            </section>
        </main>
    )
}