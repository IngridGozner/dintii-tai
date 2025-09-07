'use server';

import { createClient } from '@/supabase/server';
import {
  PATIENT_BUCKET_FOLDER,
  PATIENT_FILE_BUCKET,
  PATIENT_FILE_VIEW,
} from '@/types/GlobalTypes';

export async function addPatientFile(patientFullName: string, file: File) {
  const supabase = await createClient();

  if (!patientFullName || !file) return null;

  const { data, error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .upload(`${PATIENT_BUCKET_FOLDER}/${patientFullName}-${Date.now()}`, file);

  if (error) {
    console.error(`Error uploading file: ${file}`, error);
    throw error;
  }

  return data.id;
}

export async function updatePatientFile(patientFileName: string, file: File) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .update(patientFileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error updating file:', error);
    throw error;
  }

  return data.id;
}

export async function deletePatientFile(fileName: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .remove([fileName]);

  if (error) {
    console.error(`Error deleting patient file with name:${fileName}`, error);
    throw error;
  }
}

export async function getPatientFileName(patientID: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(PATIENT_FILE_VIEW)
    .select('name')
    .eq('id', patientID)
    .maybeSingle();

  if (error) {
    console.error('Error getting patient file name:', error);
    throw error;
  }

  return data?.name || null;
}

export async function downloadPatientFile(fileName: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .download(fileName);

  if (error) {
    console.error('Error downloading patient file:', error);
    throw error;
  }

  return data;
}
