import {
  deletePatient,
  editPatient,
  getPatientWithID,
} from '@/supabase/actions/patientActions';
import {
  addTreatment,
  getPatientTreatments,
} from '@/supabase/actions/treatmentActions';
import PatientClientWrapper from '@/components/components/PatientClientWrapper';
import { ROWS_TO_LOAD } from '@/types/GlobalTypes';

export default async function PatientDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string; lang: string }>;
}>) {
  const { id } = await params;

  const [patient, treatments] = await Promise.all([
    getPatientWithID(Number(id)),
    getPatientTreatments(0, ROWS_TO_LOAD - 1, false, 'date', Number(id)),
  ]);

  return (
    <PatientClientWrapper
      patient={patient}
      patientID={Number(id)}
      data={treatments}
      addAction={addTreatment}
      editAction={editPatient}
      deleteAction={deletePatient}
      loadRows={getPatientTreatments}
    />
  );
}
