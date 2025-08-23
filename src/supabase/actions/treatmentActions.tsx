'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';
import { PATIENTS_PATH, TREATMENT_DATABASE } from '@/types/GlobalTypes';
import { TreatmentType } from '@/types/TreatmentType';

export async function addTreatment(formData: FormData) {
  const supabase = await createClient();

  const treatmentData: TreatmentType = {
    date: formData.get('date')?.toString() || null,
    price: Number(formData.get('price')) || null,
    treatment: formData.get('treatment')?.toString() || null,
    gdpr: Boolean(formData.get('gdpr')),
    consent: Boolean(formData.get('consent')),
    patientID: Number(formData.get('patientID')),
  };

  const { error } = await supabase
    .from(TREATMENT_DATABASE)
    .insert(treatmentData);

  if (error) {
    console.error('Error adding treatment:', error);
    throw error;
  }

  revalidatePath(`${PATIENTS_PATH}/${treatmentData.patientID}`);
}

export async function getPatientTreatments(id: number) {
  const supabase = await createClient();

  const { data } = await supabase
    .from(TREATMENT_DATABASE)
    .select('id, date, price, treatment, gdpr, consent')
    .eq('patientID', id);

  return data;
}

export async function editTreatment(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id');

  if (!id) return;

  const treatmentData: TreatmentType = {
    date: formData.get('date')?.toString() || null,
    price: Number(formData.get('price')) || null,
    treatment: formData.get('treatment')?.toString() || null,
    gdpr: Boolean(formData.get('gdpr')),
    consent: Boolean(formData.get('consent')),
    patientID: Number(formData.get('patientID')),
  };

  const { error } = await supabase
    .from(TREATMENT_DATABASE)
    .update(treatmentData)
    .eq('id', id);

  if (error) throw error;

  revalidatePath(`${PATIENTS_PATH}/${treatmentData.patientID}`);
}

export async function deleteTreatment(id: number) {
  const supabase = await createClient();

  const deletedTreatment = await supabase
    .from(TREATMENT_DATABASE)
    .delete()
    .eq('id', id)
    .select();

  revalidatePath(`${PATIENTS_PATH}/${deletedTreatment?.data?.[0]?.patientID}`);
}
