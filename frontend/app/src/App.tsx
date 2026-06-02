import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { DashboardPage } from './pages/DashboardPage';
import { EventsPage } from './pages/EventsPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TasksPage } from './pages/TasksPage';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<LandingPage onGoToLogin={() => navigate('/login')} />} />
      <Route path="/login" element={<LoginPage onGoToRegister={() => navigate('/register')} onLoginSuccess={() => navigate('/dashboard')} />} />
      <Route path="/register" element={<RegisterPage onGoToLogin={() => navigate('/login')} />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <EventsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;