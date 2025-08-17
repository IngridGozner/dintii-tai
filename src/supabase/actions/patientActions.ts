'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { PATIENT_DATABASE, PATIENTS_PATH } from '@/types/GlobalTypes';
import {
  addPatientFile,
  deletePatientFile,
  getPatientFileName,
  updatePatientFile,
} from './bucketActions';

export async function addPatient(formData: FormData) {
  const supabase = await createClient();

  const patientFile = formData.get('patientFile') as File;

  const data = {
    first_name: formData.get('firstName')?.toString() || null,
    last_name: formData.get('lastName')?.toString() || null,
    phone: formData.get('phoneNumber')?.toString() || null,
    patient_file_id: null as string | null,
  };

  const patientFullName = `${data.first_name}-${data.last_name}`;

  if (patientFile) {
    const fileID = await addPatientFile(patientFullName, patientFile);

    data.patient_file_id = fileID;
  }

  const { error } = await supabase.from(PATIENT_DATABASE).insert(data);

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

  if (!id) return;

  const patientFile = formData.get('patientFile') as File;
  const patientFileName = await getPatientFileName(id?.toString());
  const patientFullName = `${formData.get('firstName')}-${formData.get('lastName')}`;

  const patientFileID =
    patientFile && patientFileName !== null
      ? await updatePatientFile(patientFileName, patientFile)
      : await addPatientFile(patientFullName, patientFile);

  const data = {
    first_name: formData.get('firstName'),
    last_name: formData.get('lastName'),
    phone: formData.get('phone'),
    cnp: formData.get('cnp'),
    email: formData.get('email'),
    city: formData.get('city'),
    country: formData.get('country'),
    birthdate: formData.get('birthdate')?.toString() || null,
    patient_file_id: patientFileID,
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

  const patientFileName = await getPatientFileName(id.toString());

  if (patientFileName) {
    deletePatientFile(patientFileName);
  }

  await supabase.from(PATIENT_DATABASE).delete().eq('id', id).select();

  redirect(PATIENTS_PATH);
}
