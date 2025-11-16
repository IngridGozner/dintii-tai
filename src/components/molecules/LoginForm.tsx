'use client';

import { login, registerUser } from '@/supabase/actions/userActions';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useActionState } from 'react';
import { GoogleIcon } from '@/components/atoms/GoogleIcon';

type LoginFormProps = {
  register?: boolean;
};

export default function LoginForm({ register = false }: LoginFormProps) {
  const { login: loginEntry, email, password, addNewUser } = useDictionary();

  const loginReducer = async (
    state: { success: boolean; message: string } | undefined,
    formData: FormData
  ) => {
    return (await login(formData)) || { success: true, message: '' };
  };

  const registerReducer = async (
    state: { success: boolean; message: string } | undefined,
    formData: FormData
  ) => {
    return (await registerUser(formData)) || { success: true, message: '' };
  };

  const [state, formAction] = useActionState(
    register ? registerReducer : loginReducer,
    {
      success: true,
      message: '',
    }
  );

  return (
    <form action={formAction} className='flex flex-col gap-y-7'>
      {state?.message && (
        <p
          className={`-mt-5 -mb-2 flex items-center gap-x-2 text-left font-bold ${state.success ? 'text-green-700' : register ? 'text-red-500' : 'text-yellow-300'}`}
        >
          <GoogleIcon iconName={state.success ? 'check_circle' : 'error'} />

          {state.message}
        </p>
      )}
      <Input
        label={email ?? 'Email'}
        element='email'
        type='email'
        required
        autoComplete='email'
        labelClassName={register ? '!text-gray-500' : ''}
      />
      <Input
        label={password ?? 'Password'}
        element='password'
        type='password'
        autoComplete={register ? 'new-password' : 'current-password'}
        required
        labelClassName={register ? '!text-gray-500' : ''}
      />
      <Button
        label={
          register ? (addNewUser ?? 'Add new user') : (loginEntry ?? 'Login')
        }
      />
    </form>
  );
}
