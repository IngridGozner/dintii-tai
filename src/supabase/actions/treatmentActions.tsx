'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { PATIENTS_PATH, TREATMENT_DATABASE } from '@/types/GlobalTypes';

export async function addTreatment(formData: FormData) {
  const supabase = await createClient();

  const treatmentData = {
    date: formData.get('date')?.toString() || null,
    price: formData.get('price')?.toString() || null,
    treatment: formData.get('treatment')?.toString() || null,
    gdpr: formData.get('gdpr')?.toString() || null,
    consent: formData.get('consent')?.toString() || null,
    patientID: formData.get('patientID')?.toString() || null,
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
    .select('date, price, treatment, gdpr, consent')
    .eq('patientID', id);

  return data;
}

export async function editTreatment(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id');

  if (!id) return;

  const treatmentData = {
    date: formData.get('date')?.toString() || null,
    price: formData.get('price')?.toString() || null,
    treatment: formData.get('treatment')?.toString() || null,
    gdpr: formData.get('gdpr')?.toString() || null,
    consent: formData.get('consent')?.toString() || null,
    patientID: formData.get('patientID')?.toString() || null,
  };

  const { error } = await supabase
    .from(TREATMENT_DATABASE)
    .update(treatmentData)
    .eq('id', id);

  if (error) throw error;

  revalidatePath(`${PATIENTS_PATH}/${id}`);
}

export async function deleteTreatment(id: number) {
  const supabase = await createClient();

  await supabase.from(TREATMENT_DATABASE).delete().eq('id', id);

  redirect(PATIENTS_PATH);
}
