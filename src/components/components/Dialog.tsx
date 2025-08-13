import { PropsWithChildren } from 'react';
import { Button } from '../atoms/Button';

type DialogProps = PropsWithChildren & {
  headline?: string;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  closeButton?: boolean;
};

export default function Dialog(props: DialogProps) {
  const {
    headline,
    isOpen,
    closeButton = true,
    onClose,
    children,
    className,
  } = props;

  return (
    <div
      className={`relative z-[100] ${!closeButton || isOpen ? 'block' : 'hidden'}`}
    >
      <div className='fixed inset-0 bg-black/25' />
      <div className='fixed inset-0 z-[100] w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-6 text-center'>
          <div className='relative overflow-hidden rounded-lg shadow-xl'>
            <div className={`bg-base-dark/75 px-28 py-14 ${className || ''}`}>
              <div className={`flex items-center justify-center`}>
                {closeButton && (
                  <Button
                    onClick={onClose}
                    className='absolute top-4 right-4 !text-white'
                    iconName='close'
                    iconClassName='!text-3xl'
                    asLink
                  />
                )}
                <div className='mt-0 text-center'>
                  <div className='text-4xl font-semibold text-white'>
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
