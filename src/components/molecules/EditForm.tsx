'use client';

import { Button, ButtonProps } from '../atoms/Button';
import { Input, InputProps } from '../atoms/Input';
import { useDialog } from '../providers/DialogProvider';
import { useDictionary } from '../providers/DictionaryProvider';

type BaseEditFormProps = ButtonProps & {
  formFunctionality: 'add' | 'edit';
  formFields: InputProps[];
  onSave?: () => void;
};

type EditFormProps = BaseEditFormProps & {
  addMessage: string;
  editMessage: string;
  buttonAddIconName: string;
};

export default function EditForm({
  formFunctionality,
  formFields,
  formAction,
  addMessage,
  editMessage,
  buttonAddIconName,
  onSave,
  ...rest
}: EditFormProps) {
  const { save, cancel, errorMessage, successMessage } = useDictionary();

  const { handleClick, closeDialog, showFeedback } = useDialog();

  const isAddDialog = formFunctionality == 'add';
  const dialogHeadine = isAddDialog ? addMessage : editMessage;

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
                  onClick={() => onSave && onSave()}
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

export function EditPatientForm(props: BaseEditFormProps) {
  const { addPatient, editPatient } = useDictionary();

  return (
    <EditForm
      addMessage={addPatient ?? ''}
      editMessage={editPatient ?? ''}
      buttonAddIconName='person_add'
      {...props}
    />
  );
}

export function EditTreatmentForm(props: BaseEditFormProps) {
  const { addTreatment, editTreatment } = useDictionary();

  return (
    <EditForm
      addMessage={addTreatment ?? ''}
      editMessage={editTreatment ?? ''}
      buttonAddIconName='post_add'
      {...props}
    />
  );
}
