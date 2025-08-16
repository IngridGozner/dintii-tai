import EditableTablePatient from './EditableTablePatients';
import {
  addPatient,
  getPatientFields,
} from '@/supabase/actions/patientActions';

export default async function Patients() {
  const patients = await getPatientFields();

  return <EditableTablePatient data={patients} formAction={addPatient} />;
}
