'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/supabase/server';

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

  const { error } = await supabase.from('patient').insert(obtainedData);

  if (error) {
    console.error('Error adding patient:', error);
    throw error;
  }

  revalidatePath('/dashboard/patients');
}
