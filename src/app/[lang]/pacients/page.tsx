import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation'

export default async function Pacients() {
    const supabase = await createClient();

    //if no user redirect to login
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const { data: pacients } = await supabase.from("pacient").select();

    return <pre>{JSON.stringify(pacients, null, 2)}</pre>
}