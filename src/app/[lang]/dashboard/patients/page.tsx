import { createClient } from '@/supabase/server';

export default async function Patients() {
    const supabase = await createClient();

    const { data: patients } = await supabase.from("patient").select();

    return <pre>{JSON.stringify(patients, null, 2)}</pre>
}