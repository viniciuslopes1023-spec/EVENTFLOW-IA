import './section-header.css'

type SectionHeaderProps = {
    tag: string;
    title: string;

}

export function SectionHeader({ tag, title }: SectionHeaderProps) {
    return (
        <div className="section-header">
            <p className="section-tag">{tag}</p>
            <h2>{title}</h2>
        </div>
    )

};