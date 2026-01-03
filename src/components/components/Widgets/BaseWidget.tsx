import { PropsWithChildren } from 'react';

export default function BaseWidget(props: PropsWithChildren) {
  return (
    <div className='border-base-dark mt-4 rounded-2xl border-2 p-6 shadow-md'>
      {props.children}
    </div>
  );
}
