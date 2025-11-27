'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  UPDATE_PASSWORD,
} from '@/types/GlobalTypes';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect(DASHBOARD_PATH);
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  return error;
}

export async function getUser() {
  const supabase = await createClient();

  //if no user redirect to login
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect(LOGIN_PATH);
  }

  return data.user;
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email')?.toString();

  if (!email) return;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: UPDATE_PASSWORD,
  });

  if (error) {
    return { success: false, message: error.message };
  } else {
    return {
      success: true,
      message: 'Password reset email sent successfully.',
    };
  }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  const newPassword = formData.get('password')?.toString();
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  //TODO: handle error status 422/check why it occurs
  if (error && error.status != 422) {
    return { success: false, message: error.message };
  } else {
    return { success: true, message: 'Password updated successfully' };
  }
}

export async function registerUser(formData: FormData) {
  const supabase = await createClient();

  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: DASHBOARD_PATH,
    },
  };

  const { error } = await supabase.auth.signUp(userData);

  if (error) {
    return { success: false, message: error.message };
  } else {
    return {
      success: true,
      message: 'New user added successfully. Email has to be validated!',
    };
  }
}
