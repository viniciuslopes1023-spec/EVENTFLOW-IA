import './button.css';

type ButtonProps = {
  text: string;
  variant?: 'primary' | 'secondary'
  onClick?: () => void;
};

export function Button({ text, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}