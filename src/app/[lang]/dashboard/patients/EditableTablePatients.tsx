'use client';

import { Headline } from '@/components/atoms/Headline';
import EditableTable from '@/components/components/Tables/EditableTable';
import PatientForm from '@/components/molecules/PatientForm';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { getWhatsAppLink } from '@/helpers';
import { redirect } from 'next/navigation';

export default function EditableTablePatient({
  data,
  formAction,
}: {
  data: { [key: string]: string }[] | null;
  formAction?: (formData: FormData) => Promise<void>;
}) {
  const { patients } = useDictionary();

  return (
    <EditableTable
      data={data}
      excludedHeaders={['id']}
      onClickRow={(rowData) => redirect(`/dashboard/patients/${rowData.id}`)}
      clickableCell={{
        clickableCellHeader: 'phone',
        clickableCellFunction: (rowData) =>
          redirect(getWhatsAppLink(rowData.phone)),
      }}
      tableHeader={
        <>
          <div className='col-span-6'>
            <Headline headline={patients ?? ''} />
          </div>
          <div className='col-span-6 flex h-fit justify-end'>
            <PatientForm
              formFunctionality='add'
              formElements={['firstName', 'lastName', 'phone', 'patientFile']}
              formAction={formAction}
            />
          </div>
        </>
      }
    />
  );
}
