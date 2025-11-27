'use client';

import Dialog from '@/components/components/Dialog';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { login } from '@/supabase/actions/userActions';
import { lazy } from 'react';

const UserForm = lazy(() => import('@/components/molecules/UserForm'));

export default function LoginPage() {
  const { login: loginEntry } = useDictionary();

  return (
    <Dialog headline={loginEntry ?? 'Login'} closeButton={false}>
      <UserForm formAction={login} />
    </Dialog>
  );
}
