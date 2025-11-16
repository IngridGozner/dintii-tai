import { getUser } from '@/supabase/actions/userActions';
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
  await getUser();

  return (
    <div className='min-h-screen'>
      <DashboardClientWrapper>{children}</DashboardClientWrapper>
    </div>
  );
}
