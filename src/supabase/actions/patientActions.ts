'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import {
  PATIENT_DATABASE,
  PATIENTS_PATH,
  ROWS_TO_LOAD,
} from '@/types/GlobalTypes';
import { addPatientFile, deletePatientFile } from './bucketActions';
import { getPatientFileName } from '@/helpers';

export async function addPatient(formData: FormData) {
  const supabase = await createClient();

  const patientFile = formData.get('patientFile') as File;

  const data = {
    first_name: formData.get('firstName')?.toString() || null,
    last_name: formData.get('lastName')?.toString() || null,
    phone: formData.get('phone')?.toString() || null,
    patient_file_id: null,
  };

  const { data: newPatient, error } = await supabase
    .from(PATIENT_DATABASE)
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error('Error adding patient:', newPatient, error);
    throw error;
  }

  if (newPatient && patientFile.size) {
    const patientFileId = await addPatientFile(
      `${newPatient.id.toString()}`,
      patientFile
    );

    const { error } = await supabase
      .from(PATIENT_DATABASE)
      .update({ patient_file_id: patientFileId })
      .eq('id', newPatient.id);

    if (error) {
      console.error(
        `Error adding file for ${newPatient.id}: ${patientFileId}`,
        error
      );
      throw error;
    }
  }

  revalidatePath(PATIENTS_PATH);
}

export async function getPatientWithID(id: number) {
  const supabase = await createClient();

  const { data: patient, error } = await supabase
    .from(PATIENT_DATABASE)
    .select()
    .eq('id', id)
    .limit(1)
    .maybeSingle();

  if (!patient || error) return notFound();

  return patient;
}

export async function getPatientFields(
  from = 0,
  to = ROWS_TO_LOAD - 1,
  ascending = true,
  element = 'first_name'
) {
  const supabase = await createClient();

  const { data } = await supabase
    .from(PATIENT_DATABASE)
    .select('id, first_name, last_name, phone')
    .order(element, { ascending: ascending })
    .range(from, to);

  return data;
}

export async function editPatient(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id')?.toString().trim();
  let patientFileID = null;

  if (!id) return;

  const patientFile = formData.get('patientFile') as File;

  const data = {
    first_name: formData.get('firstName'),
    last_name: formData.get('lastName'),
    phone: formData.get('phone'),
    cnp: formData.get('cnp'),
    email: formData.get('email'),
    city: formData.get('city'),
    country: formData.get('country'),
    birthdate: formData.get('birthdate')?.toString() || null,
  };

  const { error } = await supabase
    .from(PATIENT_DATABASE)
    .update(data)
    .eq('id', id);

  if (patientFile.size) {
    patientFileID = await addPatientFile(id, patientFile);

    const { error: fileError } = await supabase
      .from(PATIENT_DATABASE)
      .update({ patient_file_id: patientFileID })
      .eq('id', id);

    if (fileError) {
      console.error(`Error adding file for ${id}: ${patientFileID}`, fileError);
      throw fileError;
    }
  }

  if (error) throw error;

  revalidatePath(`${PATIENTS_PATH}/${id}`);
}

export async function deletePatient(id: number) {
  const supabase = await createClient();

  if (!id) return;

  const { data: deletedPatient, error } = await supabase
    .from(PATIENT_DATABASE)
    .delete()
    .eq('id', id)
    .select();

  if (deletedPatient && deletedPatient[0].patient_file_id) {
    deletePatientFile(getPatientFileName(id.toString()));
  }

  if (error) {
    console.error(`Error deleting patient: ${id}`, deletedPatient, error);
    throw error;
  }
}
