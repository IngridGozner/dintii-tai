import { createClient } from '@/supabase/server';
import EditableTablePatient from './EditableTablePatients';
import { addPatient } from '@/supabase/actions/patientActions';

export default async function Patients() {
  const supabase = await createClient();

  const { data: patients } = await supabase
    .from('patient')
    .select('id, first_name, last_name, phone_number');

  return (
    <>
      <EditableTablePatient data={patients} formAction={addPatient} />
    </>
  );
}
