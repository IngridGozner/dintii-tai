'use client';

import { useDictionary } from '@/components/providers/DictionaryProvider';
import { EditableTreatmentTable } from '../Tables/EditableTable';
import { Headline } from '@/components/atoms/Headline';
import { EditTreatmentForm } from '@/components/molecules/EditForm';
import {
  deleteTreatment,
  editTreatment,
} from '@/supabase/actions/treatmentActions';
import { LoadRowsFunction, SupabaseArray } from '@/types/GeneralTypes';

export type TreatmentsOverviewProps = {
  data: SupabaseArray;
  addAction?: (formData: FormData) => Promise<void>;
  patientID: number;
  loadRows: LoadRowsFunction;
};

export default function TreatmentsOverview({
  data,
  addAction,
  patientID,
  loadRows,
}: TreatmentsOverviewProps) {
  const { treatment, date, price, gdpr, consent } = useDictionary();

  const today = new Date().toISOString().slice(0, 10);

  const formFields = [
    {
      element: 'date',
      label: date,
      value: today,
      type: 'date',
    },
    {
      element: 'treatment',
      label: treatment,
      value: undefined,
    },
    {
      element: 'price',
      label: price,
      value: undefined,
      type: 'number',
    },
    {
      element: 'gdpr',
      label: gdpr,
      value: undefined,
      type: 'checkbox',
    },
    {
      element: 'consent',
      label: consent,
      value: undefined,
      type: 'checkbox',
    },
    {
      element: 'patientID',
      label: 'patientID',
      value: patientID,
      containerClassName: '-mt-7',
      type: 'hidden',
    },
  ];

  return (
    <>
      <EditableTreatmentTable
        data={data}
        excludedHeaders={['id']}
        editAction={editTreatment}
        deleteAction={deleteTreatment}
        formFields={formFields}
        formType='treatment'
        loadRows={(from, to) => loadRows(from, to, patientID)}
        tableHeader={
          <>
            <div className='border-font/20 mb-2 flex flex-row border-b-2 border-dashed pb-2'>
              <div className='flex flex-1 items-center'>
                <Headline
                  headline={treatment ?? ''}
                  className='!mb-0 !text-2xl'
                />
              </div>
              <div className='flex h-fit flex-1 justify-end'>
                <EditTreatmentForm
                  formFunctionality='add'
                  formAction={addAction}
                  formFields={formFields}
                />
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
