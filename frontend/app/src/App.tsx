import { useState } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

type Page = 'landing' | 'login' | 'register' | 'dashboard';

function App() {
  const [page, setPage] = useState<Page>('landing');

  function goToLogin() {
    setPage('login');
  }

  function goToRegister() {
    setPage('register');
  }

  function goToDashboard() {
    setPage('dashboard');
  }

  if (page === 'dashboard') {
    return <DashboardPage />;
  }

  if (page === 'login') {
    return (
      <LoginPage
        onGoToRegister={goToRegister}
        onLoginSuccess={goToDashboard}
      />
    );
  }

  if (page === 'register') {
    return <RegisterPage onGoToLogin={goToLogin} />;
  }

  return <LandingPage onGoToLogin={goToLogin} />;
}

export default App;
