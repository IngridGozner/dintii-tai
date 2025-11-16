import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';

export default function Dashboard() {
  return (
    <Container>
      <GridContainer>
        <div className='col-span-6 md:col-span-12'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          <p className='text-font mt-2'>Select a section from the sidebar.</p>
        </div>
      </GridContainer>
    </Container>
  );
}

export const revalidate = 300;
