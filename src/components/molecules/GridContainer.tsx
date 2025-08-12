import { PropsWithChildren } from 'react';

type GricContainerProps = PropsWithChildren & {
  className?: string;
};

export function GridContainer(props: GricContainerProps) {
  const { className, children } = props;

  return (
    <div
      className={`grid grid-cols-6 gap-x-2 md:grid-cols-12 md:gap-x-4 gap-y-4${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}
