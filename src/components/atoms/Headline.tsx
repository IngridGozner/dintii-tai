type HeadlineProps = {
    headline: string;
    className?: string;
}

export function Headline(props: HeadlineProps) {
    const { headline, className } = props;

    return (
        <h2 className={`text-2xl md:text-4xl${className ? ` ${className}` : ''}`}>{headline}</h2>
    )
}