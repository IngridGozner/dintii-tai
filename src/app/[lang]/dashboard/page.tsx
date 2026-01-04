import { TodoWidget } from '@/components/components/Widgets/TodoWidget';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { getTODOList } from '@/supabase/actions/todoListActions';
import { ROWS_TO_LOAD } from '@/types/GlobalTypes';

export default async function Dashboard() {
  const todos = await getTODOList(ROWS_TO_LOAD);

  return (
    <Container>
      <GridContainer>
        <div className='col-span-6 md:col-span-12'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
        </div>
        <div className='col-span-6 md:col-span-6'>
          <TodoWidget data={todos} />
        </div>
      </GridContainer>
    </Container>
  );
}

export const revalidate = 300;
