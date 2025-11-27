import { Button } from '@/components/atoms/Button';
import Dialog from '@/components/components/Dialog';
import { LOGIN_PATH } from '@/types/GlobalTypes';

export default function AuthCodeError() {
  return (
    <Dialog
      headline='Authentication Code Error'
      closeButton={false}
      className='text-white'
    >
      There was an error with your authentication code. Please try again.
      <Button href={LOGIN_PATH} label='Go to login' className='mt-4' />
    </Dialog>
  );
}
