'use client';

import { login } from '@/supabase/actions/userActions';
import Dialog from '@/components/components/Dialog';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useActionState } from 'react';
import { GoogleIcon } from '@/components/atoms/GoogleIcon';

export default function LoginForm() {
  const { login: loginEntry, email, password } = useDictionary();

  const loginReducer = async (
    state: { success: boolean; message: string },
    formData: FormData
  ) => {
    return await login(formData);
  };

  const [state, formAction] = useActionState(loginReducer, {
    success: true,
    message: '',
  });

  return (
    <Dialog headline={loginEntry ?? 'Login'} closeButton={false}>
      <form action={formAction} className='flex flex-col gap-y-7'>
        {state?.success === false && (
          <p className='-mt-5 -mb-2 flex items-center gap-x-2 text-left font-bold text-yellow-300'>
            <GoogleIcon iconName='error' />

            {state.message}
          </p>
        )}
        <Input
          label={email ?? 'Email'}
          element='email'
          type='email'
          required
          autoComplete='email'
        />
        <Input
          label={password ?? 'Password'}
          element='password'
          type='password'
          autoComplete='current-password'
          required
        />
        <Button label={loginEntry ?? 'Login'} />
      </form>
    </Dialog>
  );
}
