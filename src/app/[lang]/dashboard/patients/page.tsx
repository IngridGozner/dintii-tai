import EditableTable from '@/components/components/EditableTable';
import { createClient } from '@/supabase/server';

export default async function Patients() {
  const supabase = await createClient();

  const { data: patients } = await supabase
    .from('patient')
    .select('first_name, last_name, phone_number');

  console.log('patients', patients);

  return <EditableTable data={patients} />;
}
