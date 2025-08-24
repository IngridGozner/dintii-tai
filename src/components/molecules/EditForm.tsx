'use client';

import { Button, ButtonProps } from '../atoms/Button';
import { Input, InputProps } from '../atoms/Input';
import { useDialog } from '../providers/DialogProvider';
import { useDictionary } from '../providers/DictionaryProvider';
import { useEffect, useRef } from 'react';

type EditFormProps = ButtonProps & {
  formFunctionality: 'add' | 'edit';
  formFields: InputProps[];
  blob?: Blob | null;
  fileName?: string | null;
  formType?: 'patient' | 'treatment';
};

export default function EditForm({
  formFunctionality,
  formFields,
  formAction,
  blob,
  fileName,
  formType = 'patient',
  ...rest
}: EditFormProps) {
  const {
    addPatient,
    save,
    cancel,
    patientFile,
    editPatient,
    addTreatment,
    editTreatment,
    errorMessage,
    successMessage,
  } = useDictionary();

  const { isOpen, handleClick, closeDialog, showFeedback } = useDialog();
  let addMessage, editMessage, buttonAddIconName;

  switch (formType) {
    case 'patient':
      addMessage = addPatient;
      editMessage = editPatient;
      buttonAddIconName = 'person_add';
      break;
    case 'treatment':
      addMessage = addTreatment;
      editMessage = editTreatment;
      buttonAddIconName = 'post_add';
      break;
  }

  const isAddDialog = formFunctionality == 'add';
  const dialogHeadine = isAddDialog ? addMessage : editMessage;

  const fileInputRef = useRef<HTMLInputElement>(null);

  formFields.find((field) => {
    if (field.element === 'patientFile') field.ref = fileInputRef;
  });

  useEffect(() => {
    if (blob && fileName && fileInputRef.current) {
      const file = new File([blob], fileName || patientFile || '');

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [blob, patientFile, fileName, isOpen]);

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
      iconName={isAddDialog ? buttonAddIconName : 'edit'}
      {...rest}
      onClick={() =>
        handleClick(
          <form className='flex flex-col gap-y-7'>
            {formFields.map(
              ({
                label,
                element,
                type,
                required,
                value,
                containerClassName,
                autoComplete,
                ref,
              }) => (
                <Input
                  key={element}
                  label={label ?? ''}
                  element={element}
                  type={type}
                  required={required}
                  value={value}
                  containerClassName={containerClassName}
                  autoComplete={autoComplete}
                  ref={ref}
                />
              )
            )}

            {isAddDialog ? (
              <Button
                label={isAddDialog ? (addMessage ?? '') : (save ?? '')}
                className='rounded-full text-center'
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
                  className='w-full rounded-full text-center'
                  iconName='save'
                />
                <Button
                  label={cancel ?? ''}
                  className='w-full rounded-full text-center'
                  onClick={closeDialog}
                  iconName='cancel'
                  type='button'
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
