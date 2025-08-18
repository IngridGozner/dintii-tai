'use client';

import { PatientType } from '@/types/PatientType';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { useDialog } from '../providers/DialogProvider';
import { useDictionary } from '../providers/DictionaryProvider';
import { useEffect, useMemo, useRef } from 'react';
import { getPatientFileNameFromFile } from '@/helpers';

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
    errorMessage,
    successMessage,
  } = useDictionary();

  const { isOpen, handleClick, closeDialog, showFeedback } = useDialog();

  const isAddDialog = formFunctionality == 'add';
  const dialogHeadine = isAddDialog ? addPatient : editPatient;

  const hasFormElement = (element: string) => {
    if (!formElements) return true;

    return formElements.includes(element);
  };

  const {
    patient_document: patientDocument,
    patient_file_name: patientFileNamePath,
  } = patient || {};

  const patientFileName =
    patientFileNamePath && getPatientFileNameFromFile(patientFileNamePath);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (patientDocument && fileInputRef.current) {
      const file = new File(
        [patientDocument],
        patientFileName || patientFile || ''
      );

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [patientDocument, patientFile, patientFileName, isOpen]);

  const formFields = [
    {
      key: 'firstName',
      label: firstName,
      required: true,
      value: patient?.first_name,
      autoComplete: 'given-name',
    },
    {
      key: 'lastName',
      label: lastName,
      required: true,
      value: patient?.last_name,
      autoComplete: 'family-name',
    },
    {
      key: 'phone',
      label: phone,
      type: 'tel',
      value: patient?.phone,
      autoComplete: 'tel',
    },
    {
      key: 'email',
      label: email,
      type: 'email',
      value: patient?.email,
      autoComplete: 'email',
    },
    { key: 'cnp', label: cnp, value: patient?.cnp },
    {
      key: 'birthdate',
      label: birthdate,
      type: 'date',
      value: patient?.birthdate,
    },
    { key: 'city', label: city, value: patient?.city },
    {
      key: 'country',
      label: country,
      value: patient?.country,
      autoComplete: 'country-name',
    },
    {
      key: 'patientFile',
      label: patientFile,
      type: 'file',
      ref: fileInputRef,
    },
    {
      key: 'id',
      value: patient?.id,
      type: 'hidden',
      containerClassName: '!-mt-7',
    },
  ];

  const formContent = useMemo(() => {
    return (
      <form className='flex flex-col gap-y-7'>
        {formFields.map(
          ({
            key,
            label,
            type,
            required,
            value,
            containerClassName,
            autoComplete,
            ref,
          }) =>
            hasFormElement(key) && (
              <Input
                key={key}
                label={label ?? ''}
                element={key}
                type={type}
                required={required}
                value={value ?? undefined}
                containerClassName={containerClassName}
                autoComplete={autoComplete}
                ref={ref}
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
              formAction={async (formData) => handleFormSubmission(formData)}
              label={save ?? ''}
              className='w-full justify-center rounded-full text-center'
              iconName='save'
            />
            <Button
              label={cancel ?? ''}
              className='w-full justify-center rounded-full text-center'
              onClick={closeDialog}
              iconName='cancel'
              type='button'
            />
          </div>
        )}
      </form>
    );
  }, [formFields]);

  async function handleFormSubmission(formData: FormData) {
    if (formAction) {
      try {
        await formAction(formData);
        closeDialog();
        showFeedback('success', successMessage || '');
      } catch (error) {
        showFeedback('error', `${errorMessage} Error: ${error}`);
      }
    }
  }

  return (
    <Button
      label={dialogHeadine || ''}
      iconName={isAddDialog ? 'person_add' : 'edit'}
      className='justify-center'
      onClick={() => handleClick(formContent, dialogHeadine ?? '', '!py-7')}
    />
  );
}
