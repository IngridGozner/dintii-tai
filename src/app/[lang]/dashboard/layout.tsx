import DashboardHeader from '@/components/components/DashboardHeader';
import Sidebar from '@/components/components/Sidebar';
import { Providers } from '@/components/providers/providers';
import { sanityFetch } from '@/sanity/lib/live';
import { DICTIONARY_QUERY } from '@/sanity/lib/queries';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const supabase = await createClient();
  const { lang } = await params;
  const { data: dictionaryEntries } = await sanityFetch({
    query: DICTIONARY_QUERY,
    params: { language: lang },
  });

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
