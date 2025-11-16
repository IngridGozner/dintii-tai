import Skeleton from '@/components/atoms/Skeleton';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import BlockSkeleton from '@/components/molecules/LoadingSkeleton/BlockSkeleton';
import ButtonSkeleton from '@/components/molecules/LoadingSkeleton/ButtonSkeleton';
import HeadlineSkeleton from '@/components/molecules/LoadingSkeleton/HeadlineSkeleton';

export default function Loading() {
  return (
    <Container>
      <GridContainer>
        <BlockSkeleton
          className='col-span-6 mb-3 md:col-span-12'
          skeletonClassName='w-72'
        />
        <HeadlineSkeleton className='col-span-6 md:col-span-12' />
        <div className='border-font/20 col-span-6 border-b md:col-span-12'>
          <div className='flex items-center gap-x-6'>
            <Skeleton className='mb-2' />
            <Skeleton className='mb-2' />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
          <div className='bg-background flex flex-2/3 flex-col gap-y-3 rounded-lg md:p-10'>
            {Array.from({ length: 10 }).map((_x, index) => (
              <div className='flex gap-x-3' key={index}>
                <Skeleton />
                <Skeleton />
              </div>
            ))}
          </div>
          <div className='bg-background flex flex-1/3 flex-col gap-y-3 rounded-lg p-5 md:p-10'>
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </div>
      </GridContainer>
    </Container>
  );
}
