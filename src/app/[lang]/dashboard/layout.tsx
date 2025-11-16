import { createClient } from '@/supabase/server';
import { LOGIN_PATH } from '@/types/GlobalTypes';
import { redirect } from 'next/navigation';
import { lazy } from 'react';

const DashboardClientWrapper = lazy(
  () => import('@/components/components/Dashboard/DashboardClientWrapper')
);

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const supabase = await createClient();

  //if no user redirect to login
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect(LOGIN_PATH);
  }

  return (
    <div className='min-h-screen'>
      <DashboardClientWrapper>{children}</DashboardClientWrapper>
    </div>
  );
}
