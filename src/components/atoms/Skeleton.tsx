export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-live='polite'
      aria-busy='true'
      className={`h-5 w-48 ${className ? className : ''}`}
    >
      <span className='inline-flex h-full w-full animate-pulse rounded-md bg-gray-300 leading-none select-none' />
    </div>
  );
}
