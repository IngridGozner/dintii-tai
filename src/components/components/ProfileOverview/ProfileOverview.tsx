'use client';

import { PatientType } from '@/types/PatientType';
import { useDictionary } from '../../providers/DictionaryProvider';
import ProfileField from './ProfileField';
import { getWhatsAppLink } from '@/helpers';

type ProfileOverviewProps = {
  patient: PatientType;
};

export default function ProfileOverview({ patient }: ProfileOverviewProps) {
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
    <div className='bg-background flex flex-col gap-y-2 rounded-lg p-5 md:p-10'>
      {fieldValues.map(({ label, value, link }, index) => (
        <ProfileField
          key={`${label}-${index}`}
          label={label ?? ''}
          value={value}
          link={link}
        />
      ))}
    </div>
  );
}
