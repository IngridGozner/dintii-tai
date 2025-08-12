import DashboardHeader from '@/components/components/DashboardHeader';
import Sidebar from '@/components/components/Sidebar';
import { createClient } from '@/supabase/server';
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
    redirect('/login');
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <DashboardHeader />
        <div className='mt-16 p-4 sm:ml-64'>{children}</div>
      </div>
    </div>
  );
}
