import { PropsWithChildren } from 'react';

export type ContainerProps = PropsWithChildren & {
  containerClass?: string;
  contentClass?: string;
  darkBackground?: boolean;
};

export function Container({
  children,
  containerClass,
  contentClass,
  darkBackground = false,
}: ContainerProps) {
  return (
    <div
      className={`mt-14 md:mt-20 ${contentClass ? contentClass : ''} ${darkBackground ? 'bg-background py-14 md:py-20' : ''}`}
    >
      <div
        className={`container mx-auto px-5 md:px-10 ${containerClass ? containerClass : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
