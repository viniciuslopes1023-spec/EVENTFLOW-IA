import { Button } from '../Button/Button';
import './pricing-card.css';

type PricingCardProps = {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
};

export function PricingCard ({
    name,
    price,
    description,
    features,
    highlighted= false,
}: PricingCardProps) {
    return (
        <article className={`pricing-card ${highlighted ? 'pricing-card-highlighted' : ''}`}>
            <span className="pricing-name">{name}</span>
            <strong>{price}</strong>
           <p>{description}</p>

           <ul>
           {features.map((feature) =>(
             <li key={feature}>{feature}</li>
           ))}
           </ul>

           <Button text="Escolher plano" variant={highlighted ? 'primary' : 'secondary'} />
        

        </article>
    )
}
