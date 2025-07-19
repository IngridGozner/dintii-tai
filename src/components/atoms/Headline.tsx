export type HeadlineProps = {
    headline: string;
    className?: string;
    anchor?: string;
}

export function Headline(props: HeadlineProps) {
    const { headline, className, anchor } = props;

    return (
        <h2 id={anchor || undefined} className={`text-3xl md:text-4xl mb-3 scroll-mt-[200px] ${className ? className : ''}`}>{headline}</h2>
    )
}