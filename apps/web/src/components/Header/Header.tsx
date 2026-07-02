import { Button } from '../Button/Button';
import './header.css';

type HeaderProps = {
    onLoginClick: () => void;
};

export function Header({ onLoginClick }: HeaderProps){
    return(
        <header className="header">
            <a className="header-brand" href="#" aria-label="EventFlow IA">
                <span className="header-logo-mark">✦</span>
                <strong className="header-logo">EventFlow IA</strong>
            </a>

            <nav className="header-nav">
                <a href="#features">Recursos</a>
                <a href="#ai">IA Copilot</a>
                <a href="#pricing">Planos</a>
            </nav>

            <Button text="Entrar" variant='secondary' onClick={onLoginClick}></Button>
        </header>
    )
}
