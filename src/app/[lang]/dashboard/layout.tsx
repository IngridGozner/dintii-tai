import DashboardHeader from '@/components/components/DashboardHeader';
import Sidebar from '@/components/components/Sidebar';
import { createClient } from '@/supabase/server';
import { LOGIN_PATH } from '@/types/GlobalTypes';
import { redirect } from 'next/navigation';

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
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <DashboardHeader />
        <div className='sm:ml-64'>{children}</div>
      </div>
    </div>
  );
}
