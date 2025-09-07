'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import Dialog from '@/components/components/Dialog';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { updatePassword } from '@/supabase/actions/userActions';

export default function UpdateForm() {
  const { password } = useDictionary();

  return (
    <Dialog headline={'Update Password'} closeButton={false}>
      <form action={updatePassword} className='flex flex-col gap-y-7'>
        <Input
          label={password ?? 'Password'}
          element='newPassword'
          type='password'
          autoComplete='current-password'
          required
        />
        <Input
          label={'Confirm Password'}
          element='password'
          type='password'
          autoComplete='new-password'
          required
        />
        <Button label={'Update'} />
      </form>
    </Dialog>
  );
}
