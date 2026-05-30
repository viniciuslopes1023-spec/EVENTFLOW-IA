import type { FormEvent } from 'react';
import { Button } from '../components/Button/Button';
import '../styles/auth.css';

type RegisterPageProps = {
  onGoToLogin: () => void;
};

export function RegisterPage({ onGoToLogin }: RegisterPageProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGoToLogin();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <span>EventFlow IA</span>
          <h1>Criar conta</h1>
          <p>Comece a organizar eventos com controle financeiro e apoio de IA.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <Button text="Criar conta" type="submit" />
        </form>

        <p className="auth-footer">
          Ja tem uma conta?{' '}
          <button type="button" onClick={onGoToLogin}>
            Entrar
          </button>
        </p>
      </section>
    </main>
  );
}
