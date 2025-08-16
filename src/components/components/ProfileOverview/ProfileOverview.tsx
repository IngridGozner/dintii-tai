'use client';

import { PatientType } from '@/types/PatientType';
import { useDictionary } from '../../providers/DictionaryProvider';
import ProfileField from './ProfileField';
import { getWhatsAppLink } from '@/helpers';
import { Button } from '@/components/atoms/Button';

type ProfileOverviewProps = {
  patient: NonNullable<PatientType>;
  editAction?: (formData: FormData) => Promise<void>;
  deleteAction?: (id: number) => Promise<void>;
};

export default function ProfileOverview({
  patient,
  deleteAction,
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
    deletePatient,
  } = useDictionary();

  const fieldValues = [
    { label: firstName, value: patient?.first_name },
    { label: lastName, value: patient?.last_name },
    {
      label: phone,
      value: patient?.phone,
      link: phone ? getWhatsAppLink(phone) : '',
    },
    { label: email, value: patient?.email },
    { label: birthdate, value: patient?.birthdate },
    { label: cnp, value: patient?.cnp },
    { label: city, value: patient?.city },
    { label: country, value: patient?.country },
    { label: patientFile, value: patient?.patient_file },
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
      <div className='bg-background flex flex-1/3 flex-col rounded-lg p-5 md:p-10'>
        {deleteAction && (
          <Button
            label={deletePatient ?? ''}
            onClick={() => deleteAction(patient.id)}
            className='items-center justify-center bg-red-700 hover:bg-red-500'
            iconName='delete'
          />
        )}
      </div>
    </div>
  );
}
