import Skeleton from '@/components/atoms/Skeleton';

export default function BlockSkeleton({
  className,
  skeletonClassName,
}: {
  className?: string;
  skeletonClassName?: string;
}) {
  return (
    <div className={className}>
      <Skeleton className={skeletonClassName} />
    </div>
  );
}
