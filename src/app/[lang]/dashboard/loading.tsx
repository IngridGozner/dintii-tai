import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import BlockSkeleton from '@/components/molecules/LoadingSkeleton/BlockSkeleton';

export default function Loading() {
  return (
    <Container>
      <GridContainer>
        <BlockSkeleton
          className='col-span-12 md:col-span-6'
          skeletonClassName='w-48 h-7'
        />
      </GridContainer>
    </Container>
  );
}
