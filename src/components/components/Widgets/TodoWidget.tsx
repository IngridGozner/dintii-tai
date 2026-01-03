import { SupabaseArray } from '@/types/GeneralTypes';
import { EditableTODOListTable } from '../Tables/EditableTable';
import { Button } from '@/components/atoms/Button';
import { TODOS_PATH } from '@/types/GlobalTypes';
import BaseWidget from './BaseWidget';

export function TodoWidget({ data }: { data: SupabaseArray }) {
  return (
    <BaseWidget>
      <EditableTODOListTable data={data} />

      <Button
        className='mt-4'
        label={'Check out all todos'}
        href={TODOS_PATH}
      />
    </BaseWidget>
  );
}
