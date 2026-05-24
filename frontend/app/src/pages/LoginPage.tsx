import type { FormEvent } from 'react';
import { Button } from '../components/Button/Button';
import '../styles/auth.css';

type LoginPageProps = {
  onGoToRegister: () => void;
  onLoginSuccess: () => void;
};

export function LoginPage({ onGoToRegister, onLoginSuccess }: LoginPageProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLoginSuccess();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <span>EventFlow IA</span>
          <h1>Entrar na plataforma</h1>
          <p>Acesse sua conta para gerenciar eventos, tarefas e finanças.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="seuemail@empresa.com" />
          </label>

          <label>
            Senha
            <input type="password" placeholder="Digite sua senha" />
          </label>

          <Button text="Entrar" type="submit" />
        </form>

        <p className="auth-footer">
          Ainda não tem conta?{' '}
          <button type="button" onClick={onGoToRegister}>
            Criar conta
          </button>
        </p>
      </section>
    </main>
  );
}