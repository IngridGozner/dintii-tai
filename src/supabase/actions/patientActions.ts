'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { PATIENTS_PATH } from '@/types/GlobalTypes';

const PATIENT_DATABASE = 'patient';

export async function addPatient(formData: FormData) {
  const supabase = await createClient();

  const patientFile = formData.get('file');

  const obtainedData = {
    first_name: formData.get('firstName'),
    last_name: formData.get('lastName'),
    phone: formData.get('phoneNumber'),
    cnp: formData.get('cnp'),
    birthdate: formData.get('birthdate'),
    patient_file: null as string | null,
  };

  if (patientFile) {
    const { data, error } = await supabase.storage
      .from('patient_file')
      .upload(
        `${obtainedData.first_name}-${obtainedData.last_name}-${Date.now()}`,
        patientFile
      );

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    obtainedData.patient_file = data.id;
  }

  const { error } = await supabase.from(PATIENT_DATABASE).insert(obtainedData);

  if (error) {
    console.error('Error adding patient:', error);
    throw error;
  }

  revalidatePath(PATIENTS_PATH);
}

export async function getPatientWithID(id: number) {
  const supabase = await createClient();

  const { data: patient, error } = await supabase
    .from(PATIENT_DATABASE)
    .select()
    .eq('id', id)
    .maybeSingle();

  if (!patient || error) return notFound();

  return patient;
}

export async function getPatientFields() {
  const supabase = await createClient();

  const { data } = await supabase
    .from(PATIENT_DATABASE)
    .select('id, first_name, last_name, phone');

  return data;
}

export async function editPatient(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id');

  const data = {
    first_name: formData.get('firstName'),
    last_name: formData.get('lastName'),
    phone: formData.get('phoneNumber'),
    cnp: formData.get('cnp'),
    birthdate: formData.get('birthdate'),
    // patient_file: null as string | null,
  };

  const { error } = await supabase
    .from(PATIENT_DATABASE)
    .update(data)
    .eq('id', id);

  if (error) throw error;

  revalidatePath(`${PATIENTS_PATH}/${id}`);
}

export async function deletePatient(id: number) {
  const supabase = await createClient();

  await supabase.from(PATIENT_DATABASE).delete().eq('id', id);

  redirect(PATIENTS_PATH);
}
