import { PropsWithChildren } from 'react';

export type TabProps = PropsWithChildren & {
  title?: string;
};

export default function Tab({ children, title }: TabProps) {
  return <div title={title}>{children}</div>;
}
