import DashboardHeader from '@/components/components/DashboardHeader';
import Sidebar from '@/components/components/Sidebar';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    //if no user redirect to login
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <main className="p-6 bg-gray-100 flex-1">{children}</main>
            </div>
        </div>
    );
}
