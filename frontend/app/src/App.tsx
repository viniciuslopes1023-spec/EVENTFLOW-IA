
import { useState } from 'react';
import { LandingPage } from './pages/landingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

type Page = 'landing' | 'login' | 'register';

function App() {
  const [page, setPage] = useState<Page>('landing')

  if (page === 'login') {
    return <LoginPage onGoToRegister={() => setPage('register')} />;
  }

  if (page === 'register') {
    return <RegisterPage onGoToLogin={() => setPage('login')} />;
  }
 return <LandingPage onGoToLogin={() => setPage('login')} />;
}
export default App;