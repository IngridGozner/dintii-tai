import HeadlineSkeleton from '@/components/molecules/LoadingSkeleton/HeadlineSkeleton';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import ButtonSkeleton from '@/components/molecules/LoadingSkeleton/ButtonSkeleton';
import BlockSkeleton from '@/components/molecules/LoadingSkeleton/BlockSkeleton';
import TableSkeleton from '@/components/molecules/LoadingSkeleton/TableSkeleton';

export default function Loading() {
  return (
    <Container>
      <GridContainer>
        <HeadlineSkeleton className='col-span-6 mt-3 md:mt-0' />
        <ButtonSkeleton className='col-span-6 flex h-fit md:justify-end' />
        <BlockSkeleton
          className='col-span-12 mt-3 md:col-span-6 md:col-start-7'
          skeletonClassName='w-96 h-11'
        />
        <div className='col-span-6 md:col-span-12'>
          <TableSkeleton cols={3} />
        </div>
      </GridContainer>
    </Container>
  );
}
