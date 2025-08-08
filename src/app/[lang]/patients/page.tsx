import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation'

export default async function Patients() {
    const supabase = await createClient();

    //if no user redirect to login
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const { data: patients } = await supabase.from("patient").select();

    return <pre>{JSON.stringify(patients, null, 2)}</pre>
}