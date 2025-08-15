'use client';

import { Button } from '@/components/atoms/Button';
import { Headline } from '@/components/atoms/Headline';
import { Input } from '@/components/atoms/Input';
import EditableTable from '@/components/components/EditableTable';
import { useDialog } from '@/components/providers/DialogProvider';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { redirect } from 'next/navigation';

export default function EditableTablePatient({
  data,
  formAction,
}: {
  data: { [key: string]: string }[] | null;
  formAction?: (formData: FormData) => Promise<void>;
}) {
  const { handleClick } = useDialog();
  const { addPatient, firstName, lastName, phone, patientFile, patients } =
    useDictionary();

  return (
    <EditableTable
      data={data}
      excludedHeaders={['id']}
      onClickRow={(rowData) => redirect(`/dashboard/patients/${rowData.id}`)}
      clickableCell={{
        clickableCellHeader: 'phone',
        clickableCellFunction: (rowData) =>
          redirect(`https://wa.me/${rowData.phone}`),
      }}
      tableHeader={
        <>
          <div className='col-span-6'>
            <Headline headline={patients ?? ''} />
          </div>
          <div className='col-span-6 flex h-fit justify-end'>
            <Button
              label={addPatient ?? ''}
              iconName='person_add'
              onClick={() =>
                handleClick(
                  <form className='flex flex-col gap-y-7'>
                    <Input label={firstName} element='firstName' required />
                    <Input label={lastName} element='lastName' required />
                    <Input label={phone} element='phoneNumber' type='tel' />
                    {/* <Input label='Email' element='email' type='email' /> */}
                    {/* <Input label={cnp} element='cnp' /> */}
                    {/* <Input label={birthdate} element='birthdate' type='date' /> */}
                    {/* <Input label='Country' element='country' /> */}
                    {/* <Input label='City' element='city' /> */}
                    <Input label={patientFile} element='file' type='file' />
                    <Button
                      formAction={formAction}
                      label={addPatient ?? ''}
                      className='justify-center rounded-full text-center'
                    />
                  </form>,
                  addPatient ?? '',
                  '!py-7'
                )
              }
            />
          </div>
        </>
      }
    />
  );
}
