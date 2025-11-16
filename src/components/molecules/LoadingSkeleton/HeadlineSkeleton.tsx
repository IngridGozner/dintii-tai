import Skeleton from '@/components/atoms/Skeleton';

export default function HeadlineSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <h2 className={`mb-3 ${className ? className : ''}`}>
      <Skeleton className='h-7 w-48 md:h-10' />
    </h2>
  );
}
