import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './sidebar.css';

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="dashboard-sidebar">
      <strong>EventFlow IA</strong>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
          Eventos
        </NavLink>
        <NavLink to="/financeiro" className={({ isActive }) => isActive ? 'active' : ''}>
          Financeiro
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
          Tarefas
        </NavLink>
        <NavLink to="/fornecedores" className={({ isActive }) => isActive ? 'active' : ''}>
          Fornecedores
        </NavLink>
      </nav>
      <button
        onClick={logout}
        style={{
          marginTop: 'auto',
          background: 'transparent',
          color: 'var(--danger)',
          border: '1px solid var(--danger)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.15s'
        }}
      >
        Sair
      </button>
    </aside>
  );
}