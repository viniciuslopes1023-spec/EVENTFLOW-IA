import { useState } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

type Page = 'landing' | 'login' | 'register' | 'dashboard';

function App() {
  const [page, setPage] = useState<Page>('landing');

  if (page === 'dashboard') {
    return <DashboardPage />;
  }

  if (page === 'login') {
    return (
      <LoginPage
        onGoToRegister={() => setPage('register')}
        onLoginSuccess={() => setPage('dashboard')}
      />
    );
  }

  if (page === 'register') {
    return <RegisterPage onGoToLogin={() => setPage('login')} />;
  }

  return <LandingPage onGoToLogin={() => setPage('login')} />;
}

export default App;
