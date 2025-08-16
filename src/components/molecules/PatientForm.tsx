'use client';

import { PatientType } from '@/types/PatientType';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { useDialog } from '../providers/DialogProvider';
import { useDictionary } from '../providers/DictionaryProvider';

type PatientFormProps = {
  formFunctionality: 'add' | 'edit';
  formElements: string[];
  patient?: PatientType;
  formAction?: (formData: FormData) => Promise<void>;
};

export default function PatientForm({
  formFunctionality,
  formElements,
  patient,
  formAction,
}: PatientFormProps) {
  const {
    addPatient,
    save,
    cancel,
    firstName,
    lastName,
    phone,
    email,
    cnp,
    birthdate,
    city,
    country,
    patientFile,
    editPatient,
  } = useDictionary();

  const { handleClick, closeDialog } = useDialog();

  const isAddDialog = formFunctionality == 'add';

  const dialogHeadine = isAddDialog ? addPatient : editPatient;

  const hasFormElement = (element: string) => {
    return formElements.includes(element);
  };

  const formFields = [
    {
      key: 'firstName',
      label: firstName,
      required: true,
      value: patient?.first_name,
    },
    {
      key: 'lastName',
      label: lastName,
      required: true,
      value: patient?.last_name,
    },
    { key: 'phone', label: phone, type: 'tel', value: patient?.phone },
    { key: 'email', label: email, type: 'email', value: patient?.email },
    { key: 'cnp', label: cnp, value: patient?.cnp },
    {
      key: 'birthdate',
      label: birthdate,
      type: 'date',
      value: patient?.birthdate,
    },
    { key: 'city', label: city, value: patient?.city },
    { key: 'country', label: country, value: patient?.country },
    {
      key: 'patientFile',
      label: patientFile,
      type: 'file',
      value: patient?.patient_file,
    },
  ];

  return (
    <Button
      label={addPatient ?? ''}
      iconName={isAddDialog ? 'person_add' : 'edit'}
      onClick={() =>
        handleClick(
          <form className='flex flex-col gap-y-7'>
            {formFields.map(
              ({ key, label, type, required, value }) =>
                hasFormElement(key) && (
                  <Input
                    key={key}
                    label={label}
                    element={key}
                    type={type}
                    required={required}
                    value={value ?? undefined}
                  />
                )
            )}

            {isAddDialog ? (
              <Button
                formAction={formAction}
                label={addPatient ?? ''}
                className='justify-center rounded-full text-center'
              />
            ) : (
              <div className='flex flex-col justify-center gap-y-2 md:flex-row md:gap-x-2'>
                <Button
                  formAction={formAction}
                  label={save ?? ''}
                  className='rounded-full text-center'
                />
                <Button
                  label={cancel ?? ''}
                  className='rounded-full text-center'
                  onClick={closeDialog}
                />
              </div>
            )}
          </form>,
          dialogHeadine ?? '',
          '!py-7'
        )
      }
    />
  );
}
