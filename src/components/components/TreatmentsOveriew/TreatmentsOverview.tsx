'use client';

import { useDictionary } from '@/components/providers/DictionaryProvider';
import EditableTable from '../Tables/EditableTable';
import { Headline } from '@/components/atoms/Headline';
import EditForm from '@/components/molecules/EditForm';

type TreatmentsOverviewProps = {
  data: { [key: string]: string }[] | null | [];
  addAction?: (formData: FormData) => Promise<void>;
  // deleteAction?: (id: number) => Promise<void>;
  patientID: number;
};

export default function TreatmentsOverview({
  data,
  addAction,
  patientID,
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
      element: 'price',
      label: price,
      value: undefined,
      type: 'number',
    },
    {
      element: 'treatment',
      label: treatment,
      value: undefined,
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
      label: consent,
      value: patientID,
      containerClassName: '-mt-7',
      type: 'hidden',
    },
  ];

  return (
    <>
      <EditableTable
        data={data}
        excludedHeaders={['id']}
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
                <EditForm
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
