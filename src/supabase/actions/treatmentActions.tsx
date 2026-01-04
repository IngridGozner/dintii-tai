'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';
import {
  PATIENTS_PATH,
  ROWS_TO_LOAD,
  TREATMENT_DATABASE,
} from '@/types/GlobalTypes';
import { TreatmentType } from '@/types/TreatmentType';
import {
  addPatientFile,
  deletePatientFile,
  updatePatientFile,
} from './bucketActions';
import { getPatientFileName, getTreatmentConsentFileName } from '@/helpers';

export async function addTreatment(formData: FormData) {
  const supabase = await createClient();

  const consentFile = formData.get('consentFile') as File;

  const treatmentData: TreatmentType = {
    date: formData.get('date')?.toString() || null,
    price: formData.get('price')?.toString() || null,
    treatment: formData.get('treatment')?.toString() || null,
    patientID: Number(formData.get('patientID')),
    consent_file: null,
  };

  const { data: newTreatment, error } = await supabase
    .from(TREATMENT_DATABASE)
    .insert(treatmentData)
    .select()
    .single();

  if (error) {
    console.error('Error adding treatment:', error);
    throw error;
  }

  if (consentFile && consentFile.size) {
    const consentFileId = await addPatientFile(
      `${treatmentData.patientID.toString()}`,
      getTreatmentConsentFileName(newTreatment.id),
      consentFile
    );

    const { error: fileError } = await supabase
      .from(TREATMENT_DATABASE)
      .update({ consent_file: consentFileId })
      .eq('id', newTreatment.id);

    if (fileError) {
      console.error('Error adding consent file for treatment:', fileError);
      throw fileError;
    }
  }

  revalidatePath(`${PATIENTS_PATH}/${treatmentData.patientID}`);
}

export async function getPatientTreatments(
  from = 0,
  to = ROWS_TO_LOAD - 1,
  ascending = false,
  element = 'date',
  id?: number
) {
  if (!id) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TREATMENT_DATABASE)
    .select('id, date, treatment, price, consent_file')
    .eq('patientID', id)
    .order(element, { ascending: ascending })
    .range(from, to);

  if (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }

  return data;
}

export async function editTreatment(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id')?.toString().trim();
  const patientID = Number(formData.get('patientID'));

  if (!id || !patientID) return;

  const consentFile = formData.get('consentFile') as File;

  const treatmentData: TreatmentType = {
    date: formData.get('date')?.toString() || null,
    price: formData.get('price')?.toString() || null,
    treatment: formData.get('treatment')?.toString() || null,
    patientID: patientID,
  };

  const { error } = await supabase
    .from(TREATMENT_DATABASE)
    .update(treatmentData)
    .eq('id', id);

  await updatePatientFile(
    patientID.toString(),
    getTreatmentConsentFileName(id),
    consentFile,
    TREATMENT_DATABASE,
    'consent_file',
    id
  );

  if (error) throw error;

  revalidatePath(`${PATIENTS_PATH}/${treatmentData.patientID}`);
}

export async function deleteTreatment(id: number) {
  const supabase = await createClient();

  const { data: deletedTreatment, error } = await supabase
    .from(TREATMENT_DATABASE)
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error deleting treatment: ${deletedTreatment}`, error);
    throw error;
  }

  const patientID = deletedTreatment.patientID;

  if (deletedTreatment?.consent_file) {
    const fileName = getPatientFileName(
      patientID,
      getTreatmentConsentFileName(id)
    );

    deletePatientFile(fileName);
  }

  revalidatePath(`${PATIENTS_PATH}/${patientID}`);
}
