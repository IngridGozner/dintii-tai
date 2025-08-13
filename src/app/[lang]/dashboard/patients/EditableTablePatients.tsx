'use client';

import { Button } from '@/components/atoms/Button';
import { Headline } from '@/components/atoms/Headline';
import { Input } from '@/components/atoms/Input';
import EditableTable from '@/components/components/EditableTable';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { useDialog } from '@/components/providers/DialogProvider';
import { redirect } from 'next/navigation';

export default function EditableTablePatient({
  data,
  formAction,
}: {
  data: { [key: string]: string }[] | null;
  formAction?: (formData: FormData) => Promise<void>;
}) {
  const { handleClick } = useDialog();

  return (
    <>
      <Container>
        <GridContainer>
          <div className='col-span-6'>
            <Headline headline='Patients' />
            <p className='text-font/70 text-sm'>
              Manage your patients and their information.
            </p>
          </div>
          <div className='col-span-6 flex h-fit justify-end'>
            <Button
              label='Add Patient'
              iconName='person_add'
              onClick={() =>
                handleClick(
                  <form className='flex flex-col gap-y-7'>
                    <Input label='First Name' element='firstName' required />
                    <Input label='Last Name' element='lastName' required />
                    <Input
                      label='Phone Number'
                      element='phoneNumber'
                      type='tel'
                    />
                    {/* <Input label='Email' element='email' type='email' /> */}
                    <Input label='CNP' element='cnp' />
                    <Input label='Birthdate' element='birthdate' type='date' />
                    {/* <Input label='Country' element='country' /> */}
                    {/* <Input label='City' element='city' /> */}
                    <Input label='File' element='file' type='file' />
                    <Button
                      formAction={formAction}
                      label={'Add Patient'}
                      className='justify-center rounded-full text-center'
                    />
                  </form>,
                  'Add Patient',
                  '!py-7'
                )
              }
            />
          </div>
        </GridContainer>
      </Container>

      <EditableTable
        data={data}
        excludedHeaders={['id']}
        onClickRow={(rowData) => redirect(`/dashboard/patients/${rowData.id}`)}
        clickableCell={{
          clickableCellHeader: 'phone_number',
          clickableCellFunction: (rowData) =>
            redirect(`https://wa.me/${rowData.phone_number}`),
        }}
      />
    </>
  );
}
