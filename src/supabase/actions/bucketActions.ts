'use server';

import { getPatientFileName } from '@/helpers';
import { createClient } from '@/supabase/server';
import { PATIENT_FILE_BUCKET } from '@/types/GlobalTypes';

export async function addPatientFile(patientID: string, file: File) {
  const supabase = await createClient();

  if (!patientID || !file) return null;

  const { data, error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .upload(getPatientFileName(patientID), file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error(`Error uploading file for ${patientID}: ${file}`, error);
    throw error;
  }

  return data.id;
}

export async function deletePatientFile(fileName: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .remove(['patient_files/44']);

  if (error) {
    console.error(
      `Error deleting patient file with name:"${fileName.toString()}"`,
      error
    );

    return false;
  }

  return true;
}

export async function downloadPatientFile(fileName: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .download(fileName);

  if (error) {
    return null;
  }

  if (data.type === 'application/octet-stream') return null;

  return data;
}

export async function getPatientFileURL(fileName: string) {
  const supabase = await createClient();

  if (!fileName) return null;

  const { data, error } = await supabase.storage
    .from(PATIENT_FILE_BUCKET)
    .createSignedUrl(fileName, 3600);

  if (error) {
    console.error(`Error getting signed URL for file: ${fileName}`, error);
    return null;
  }

  return data?.signedUrl;
}
