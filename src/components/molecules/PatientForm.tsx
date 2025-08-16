'use client';

import { PatientType } from '@/types/PatientType';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { useDialog } from '../providers/DialogProvider';
import { useDictionary } from '../providers/DictionaryProvider';
import { useState } from 'react';
import { GoogleIcon } from '../atoms/GoogleIcon';

type PatientFormProps = {
  formFunctionality: 'add' | 'edit';
  formElements?: string[];
  patient?: PatientType;
  formAction?: (formData: FormData) => Promise<void>;
};

export default function PatientForm({
  formFunctionality,
  formElements,
  patient,
  formAction,
}: PatientFormProps) {
  const [error, setError] = useState('');

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
    if (!formElements) return true;

    return formElements.includes(element);
  };

  const formFields = [
    {
      key: 'firstName',
      label: firstName,
      required: true,
      defaultValue: patient?.first_name,
    },
    {
      key: 'lastName',
      label: lastName,
      required: true,
      defaultValue: patient?.last_name,
    },
    { key: 'phone', label: phone, type: 'tel', defaultValue: patient?.phone },
    { key: 'email', label: email, type: 'email', defaultValue: patient?.email },
    { key: 'cnp', label: cnp, defaultValue: patient?.cnp },
    {
      key: 'birthdate',
      label: birthdate,
      type: 'date',
      defaultValue: patient?.birthdate,
    },
    { key: 'city', label: city, defaultValue: patient?.city },
    { key: 'country', label: country, defaultValue: patient?.country },
    {
      key: 'patientFile',
      label: patientFile,
      type: 'file',
      defaultValue: patient?.patient_file,
    },
    {
      key: 'id',
      defaultValue: patient?.id,
      type: 'hidden',
      containerClassName: '!-mt-7',
    },
  ];

  async function handleFormSubmission(formData: FormData) {
    if (formAction) {
      try {
        await formAction(formData);
        closeDialog();
      } catch (error) {
        setError(String(error));
      }
    }
  }

  return (
    <Button
      label={dialogHeadine || ''}
      iconName={isAddDialog ? 'person_add' : 'edit'}
      className='justify-center'
      onClick={() =>
        handleClick(
          <form className='flex flex-col gap-y-7'>
            {error && (
              <p className='-mt-5 -mb-2 flex items-center gap-x-2 text-left font-bold text-yellow-300'>
                <GoogleIcon iconName='error' />

                {error}
              </p>
            )}
            {formFields.map(
              ({
                key,
                label,
                type,
                required,
                defaultValue,
                containerClassName,
              }) =>
                hasFormElement(key) && (
                  <Input
                    key={key}
                    label={label ?? ''}
                    element={key}
                    type={type}
                    required={required}
                    defaultValue={defaultValue ?? undefined}
                    containerClassName={containerClassName}
                  />
                )
            )}

            {isAddDialog ? (
              <Button
                label={isAddDialog ? (addPatient ?? '') : (save ?? '')}
                className='justify-center rounded-full text-center'
                iconName={isAddDialog ? undefined : 'save'}
                formAction={async (formData) => handleFormSubmission(formData)}
              />
            ) : (
              <div className='flex flex-col gap-y-2 md:flex-row md:gap-x-3'>
                <Button
                  formAction={async (formData) =>
                    handleFormSubmission(formData)
                  }
                  label={save ?? ''}
                  className='w-full justify-center rounded-full text-center'
                  iconName='save'
                />
                <Button
                  label={cancel ?? ''}
                  className='w-full justify-center rounded-full text-center'
                  onClick={closeDialog}
                  iconName='cancel'
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
