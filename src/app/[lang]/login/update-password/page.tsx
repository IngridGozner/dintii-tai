'use client';

import Dialog from '@/components/components/Dialog';
import UserForm from '@/components/molecules/UserForm';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { updatePassword } from '@/supabase/actions/userActions';

export default function UpdateForm() {
  const { updatePassword: updatePasswordText } = useDictionary();
  return (
    <Dialog
      headline={updatePasswordText ?? 'Update Password'}
      closeButton={false}
    >
      <UserForm formAction={updatePassword} formType='updatePassword' />
    </Dialog>
  );
}
