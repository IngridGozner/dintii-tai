'use client';

import Dialog from '@/components/components/Dialog';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { lazy } from 'react';

const LoginForm = lazy(() => import('@/components/molecules/LoginForm'));

export default function LoginPage() {
  const { login: loginEntry } = useDictionary();

  return (
    <Dialog headline={loginEntry ?? 'Login'} closeButton={false}>
      <LoginForm />
    </Dialog>
  );
}
