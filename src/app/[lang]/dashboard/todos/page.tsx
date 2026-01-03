import TodoListWrapper from '@/components/components/Wrappers/TodoListWrapper';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { getTODOList } from '@/supabase/actions/todoListActions';

export default async function TodosPage() {
  const todos = await getTODOList();

  return (
    <Container>
      <GridContainer>
        <div className='col-span-6 md:col-span-12'>
          <TodoListWrapper data={todos} />
        </div>
      </GridContainer>
    </Container>
  );
}
