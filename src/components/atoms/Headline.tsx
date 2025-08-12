export type HeadlineProps = {
  headline: string;
  className?: string;
  anchor?: string;
};

export function Headline(props: HeadlineProps) {
  const { headline, className, anchor } = props;

  return (
    <h2
      id={anchor || undefined}
      className={`mb-3 scroll-mt-[130px] text-3xl md:scroll-mt-[180px] md:text-4xl ${className ? className : ''}`}
    >
      {headline}
    </h2>
  );
}
