import { Ref } from 'react';
import { GoogleIcon } from '../atoms/GoogleIcon';

type LoadingProps = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
};
export function Loading({ ref, className }: LoadingProps) {
  return (
    <div
      ref={ref}
      className={`flex h-20 items-center justify-center ${className ? className : ''}`}
    >
      <GoogleIcon iconClassName='animate-spin !text-3xl' iconName='sync' />
    </div>
  );
}
