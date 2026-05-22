import './button.css';

type ButtonProps = {
  text: string;
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  onClick?: () => void;
};

export function Button({
  text,
  type = 'button',
  variant = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button className={`button button-${variant}`} type={type} onClick={onClick}>
      {text}
    </button>
  )
}  
