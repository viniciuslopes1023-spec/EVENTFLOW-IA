
import './insight-card.css';

type InsightCardProps = {
    title: string;
    description: string;
    action: string;
};

export function InsightCard({ title, description, action }: InsightCardProps) {
    return (
        <article className="insight-card">
            <span className="insight-badge">Insight da IA</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <button>{action}</button>
        </article>
    );
}