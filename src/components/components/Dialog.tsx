import { PropsWithChildren } from 'react';

type DialogProps = PropsWithChildren & {
  headline?: string;
};

export default function Dialog(props: DialogProps) {
  const { headline, children } = props;

  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-black/25' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-6 text-center'>
          <div className='relative overflow-hidden rounded-lg shadow-xl'>
            <div className='bg-base-dark/75 px-28 py-14'>
              <div className='flex items-center justify-center'>
                <div className='mt-0 text-center'>
                  <div className='text-5xl font-semibold text-white'>
                    {headline}
                  </div>
                  <div className='mt-10'>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
