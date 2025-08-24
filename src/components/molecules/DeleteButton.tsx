'use client';

import { PATIENTS_PATH } from '@/types/GlobalTypes';
import { Button, ButtonProps } from '../atoms/Button';
import { useDialog } from '../providers/DialogProvider';
import { useDictionary } from '../providers/DictionaryProvider';
import { redirect } from 'next/navigation';
import { replaceEntry } from '@/helpers';

type BaseDeleteButtonProps = {
  deleteAction: () => Promise<void>;
  textForEntryToDelete: string;
};

type DeleteButtonProps = Pick<BaseDeleteButtonProps, 'deleteAction'> &
  ButtonProps & {
    dialogHeadline: string;
    message: string;
    redirectPath?: string;
  };

export default function DeleteButton({
  deleteAction,
  redirectPath,
  dialogHeadline,
  message,
  ...rest
}: DeleteButtonProps) {
  const { yes, no, successMessage, errorMessage } = useDictionary();
  const { handleClick, closeDialog, showFeedback } = useDialog();

  async function handleFormSubmission() {
    try {
      await deleteAction();
      closeDialog();
      showFeedback('success', successMessage || '');
    } catch (error) {
      showFeedback('error', `${errorMessage} Error: ${error}`);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }

  return (
    <Button
      iconName='delete'
      {...rest}
      onClick={() =>
        handleClick(
          <div className='flex flex-col gap-y-7'>
            <div className='text-xl text-white'>{message}</div>
            <div className='flex flex-col gap-y-2 md:flex-row md:gap-x-3'>
              <Button
                label={yes ?? ''}
                onClick={handleFormSubmission}
                className='w-full rounded-full'
                iconName='check_circle'
                type='button'
              />
              <Button
                label={no ?? ''}
                onClick={closeDialog}
                className='w-full rounded-full'
                type='button'
                iconName='cancel'
              />
            </div>
          </div>,
          dialogHeadline ?? ''
        )
      }
    />
  );
}

export function DeletePatientButton({
  deleteAction,
  textForEntryToDelete,
}: BaseDeleteButtonProps) {
  const { deletePatient, deletePatientMessage } = useDictionary();

  return (
    <DeleteButton
      deleteAction={deleteAction}
      redirectPath={PATIENTS_PATH}
      dialogHeadline={deletePatient ?? ''}
      message={replaceEntry(deletePatientMessage || '', textForEntryToDelete)}
      className='!bg-red-700 hover:!bg-red-500'
      label={deletePatient ?? ''}
    />
  );
}

export function DeleteTreatmentButton({
  deleteAction,
  textForEntryToDelete,
}: BaseDeleteButtonProps) {
  const { deleteTreatment, deleteTreatmentMessage } = useDictionary();

  return (
    <DeleteButton
      deleteAction={deleteAction}
      dialogHeadline={deleteTreatment ?? ''}
      message={replaceEntry(deleteTreatmentMessage || '', textForEntryToDelete)}
      className='!text-red-700 hover:!text-red-500'
      asLink
    />
  );
}
