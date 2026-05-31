import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

type LoginPageProps = {
  onGoToRegister: () => void;
  onLoginSuccess: () => void;
};

export function LoginPage({ onGoToRegister, onLoginSuccess }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
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
            <input
              type="email"
              placeholder="seuemail@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <Button text={loading ? 'Entrando...' : 'Entrar'} type="submit" />
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
