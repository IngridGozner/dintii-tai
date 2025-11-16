import Skeleton from '@/components/atoms/Skeleton';

export default function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Skeleton className='h-7 w-48 md:h-10' />
    </div>
  );
}
