import {
  deletePatient,
  editPatient,
  getPatientWithID,
} from '@/supabase/actions/patientActions';
import {
  addTreatment,
  getPatientTreatments,
} from '@/supabase/actions/treatmentActions';
import { PatientCategory } from '@/types/GeneralTypes';
import { ROWS_TO_LOAD } from '@/types/GlobalTypes';
import { lazy } from 'react';

const PatientClientWrapper = lazy(
  () => import('@/components/components/PatientClientWrapper')
);

export default async function PatientDetail({
  params,
}: Readonly<{
  params: Promise<{ category: PatientCategory; id: string; lang: string }>;
}>) {
  const { category, id } = await params;

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
      patientCategory={category}
      loadRows={async (params) => {
        'use server';

        return await getPatientTreatments(
          params.from,
          params.to,
          params.ascending,
          params.element,
          Number(id)
        );
      }}
    />
  );
}

export const revalidate = 300;
