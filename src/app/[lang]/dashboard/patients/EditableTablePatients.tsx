'use client';
import EditableTable from '@/components/components/EditableTable';
import { redirect } from 'next/navigation';

export default function EditableTablePatient({
  data,
}: {
  data: { [key: string]: string }[] | null;
}) {
  return (
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
  );
}
