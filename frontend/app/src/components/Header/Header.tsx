import { Button } from '../Button/Button';
import './header.css';

export function Header(){
    return(
        <header className="header">
            <strong className="header-logo">EventFlow IA </strong>
            

            <nav className="header-nav">
                <a href="#features">Recursos</a>
                <a href="#finances">Financeiro</a>
                <a href="#ai">IA</a>
            </nav>

            <Button text="Entrar" variant='secondary'></Button>
        </header>
    )
}
