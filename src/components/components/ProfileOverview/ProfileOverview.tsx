'use client';

import { PatientType } from '@/types/PatientType';
import { useDictionary } from '../../providers/DictionaryProvider';
import ProfileField from './ProfileField';
import { getPatientFileNameFromFile, getWhatsAppLink } from '@/helpers';
import { useEffect, useState } from 'react';
import { downloadPatientFile } from '@/supabase/actions/bucketActions';
import EditForm from '@/components/molecules/EditForm';
import { DeletePatientButton } from '@/components/molecules/DeleteButton';

type ProfileOverviewProps = {
  patient: NonNullable<PatientType>;
  editAction?: (formData: FormData) => Promise<void>;
  deleteAction?: (id: number) => Promise<void>;
};

export default function ProfileOverview({
  patient,
  deleteAction,
  editAction,
}: ProfileOverviewProps) {
  const {
    firstName,
    lastName,
    phone,
    email,
    birthdate,
    cnp,
    city,
    country,
    patientFile,
  } = useDictionary();

  const [documentURL, setDocumentURL] = useState<string | null>(null);
  const phoneNumber = getWhatsAppLink(patient?.phone ?? '');
  const fileName = getPatientFileNameFromFile(patient.patient_file_name ?? '');

  useEffect(() => {
    const fileNameWithPath = patient.patient_file_name;
    let url: string;

    async function fetchFile() {
      if (!fileNameWithPath) return;

      const file = await downloadPatientFile(fileNameWithPath);
      patient.patient_document = file;

      url = URL.createObjectURL(patient.patient_document);
      setDocumentURL(url);
    }

    fetchFile();
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [patient]);

  const fieldValues = [
    { label: firstName, value: patient?.first_name },
    { label: lastName, value: patient?.last_name },
    {
      label: phone,
      value: patient?.phone,
      link: patient.phone ? phoneNumber : '',
    },
    { label: email, value: patient?.email },
    { label: birthdate, value: patient?.birthdate },
    { label: cnp, value: patient?.cnp },
    { label: city, value: patient?.city },
    { label: country, value: patient?.country },
    {
      label: patientFile,
      value: patient.patient_file_name ? fileName : patientFile,
      link: documentURL ?? '-',
    },
  ];

  return (
    <div className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
      <div className='bg-background flex flex-2/3 flex-col gap-y-2 rounded-lg p-5 md:p-10'>
        {fieldValues.map(({ label, value, link }, index) => (
          <ProfileField
            key={`${label}-${index}`}
            label={label ?? ''}
            value={value}
            link={link}
          />
        ))}
      </div>
      <div className='bg-background flex flex-1/3 flex-col gap-y-3 rounded-lg p-5 md:p-10'>
        {editAction && (
          <EditForm
            formFunctionality='edit'
            formAction={editAction}
            formFields={[
              {
                element: 'firstName',
                label: firstName,
                required: true,
                value: patient?.first_name ?? undefined,
                autoComplete: 'given-name',
              },
              {
                element: 'lastName',
                label: lastName,
                required: true,
                value: patient?.last_name ?? undefined,
                autoComplete: 'family-name',
              },
              {
                element: 'phone',
                label: phone,
                type: 'tel',
                value: patient.phone || undefined,
                autoComplete: 'tel',
              },
              {
                element: 'email',
                label: email,
                type: 'email',
                value: patient?.email || undefined,
                autoComplete: 'email',
              },
              { element: 'cnp', label: cnp, value: patient?.cnp || undefined },
              {
                element: 'birthdate',
                label: birthdate,
                type: 'date',
                value: patient?.birthdate || undefined,
              },
              {
                element: 'city',
                label: city,
                value: patient?.city || undefined,
              },
              {
                element: 'country',
                label: country,
                value: patient?.country || undefined,
                autoComplete: 'country-name',
              },
              {
                element: 'patientFile',
                label: patientFile,
                type: 'file',
              },
              {
                element: 'id',
                label: 'id',
                value: patient?.id,
                type: 'hidden',
                containerClassName: '!-mt-7',
              },
            ]}
            blob={patient.patient_document}
            fileName={fileName}
          />
        )}
        {deleteAction && (
          <DeletePatientButton
            deleteAction={() => deleteAction(Number(patient.id))}
            textForEntryToDelete={`${patient.first_name} ${patient.last_name}`}
          />
        )}
      </div>
    </div>
  );
}
