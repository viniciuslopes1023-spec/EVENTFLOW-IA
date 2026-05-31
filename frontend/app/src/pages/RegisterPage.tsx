import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

type RegisterPageProps = {
  onGoToLogin: () => void;
};

export function RegisterPage({ onGoToLogin }: RegisterPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
    } catch {
      setError('Erro ao criar conta. Tente outro email.');
    } finally {
      setLoading(false);
    }
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
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

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
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <Button text={loading ? 'Criando...' : 'Criar conta'} type="submit" />
        </form>

        <p className="auth-footer">
          Já tem uma conta?{' '}
          <button type="button" onClick={onGoToLogin}>
            Entrar
          </button>
        </p>
      </section>
    </main>
  );
}