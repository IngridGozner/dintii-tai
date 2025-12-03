'use client';

import { Headline } from '@/components/atoms/Headline';
import { EditablePatientTable } from '@/components/components/Tables/EditableTable';
import { EditPatientForm } from '@/components/molecules/EditForm';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { getWhatsAppLink } from '@/helpers';
import {
  LoadRowsFunction,
  PatientCategory,
  SupabaseArray,
} from '@/types/GeneralTypes';
import { PATIENTS_PATH } from '@/types/GlobalTypes';
import { redirect } from 'next/navigation';

export default function EditableTablePatientAdd({
  data,
  formAction,
  loadRows,
  patientCategory,
}: {
  data: SupabaseArray;
  formAction?: (formData: FormData) => Promise<void>;
  loadRows?: LoadRowsFunction;
  patientCategory?: PatientCategory;
}) {
  const { adults, minors, firstName, lastName, phone, patientFile } =
    useDictionary();

  return (
    <EditablePatientTable
      data={data}
      excludedHeaders={['id']}
      onClickRow={(rowData) =>
        redirect(`${PATIENTS_PATH}/${patientCategory}/${rowData.id}`)
      }
      clickableCell={{
        clickableCellHeader: 'phone',
        clickableCellFunction: (rowData) =>
          redirect(getWhatsAppLink(rowData.phone)),
      }}
      loadRows={loadRows}
      patientCategory={patientCategory}
      tableHeader={
        <>
          <div className='col-span-6 mt-3 md:mt-0'>
            <Headline
              headline={
                patientCategory === 'adult'
                  ? adults || 'Adults'
                  : minors || 'Minors'
              }
              className='!mb-0'
            />
          </div>
          <div className='col-span-6 flex h-fit md:justify-end'>
            <EditPatientForm
              formFunctionality='add'
              formAction={formAction}
              formFields={[
                {
                  element: 'firstName',
                  label: firstName,
                  required: true,
                  value: undefined,
                  autoComplete: 'given-name',
                },
                {
                  element: 'lastName',
                  label: lastName,
                  required: true,
                  value: undefined,
                  autoComplete: 'family-name',
                },
                {
                  element: 'phone',
                  label: phone,
                  type: 'tel',
                  value: undefined,
                  autoComplete: 'tel',
                },
                {
                  element: 'patientFile',
                  label: patientFile,
                  type: 'file',
                },
              ]}
            />
          </div>
        </>
      }
    />
  );
}
