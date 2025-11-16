import Skeleton from '@/components/atoms/Skeleton';
import { ROWS_TO_LOAD } from '@/types/GlobalTypes';
import { JSX } from 'react';

type TableSkeletonProps = {
  className?: string;
  cols: number;
};

export default function TableSkeleton({ className, cols }: TableSkeletonProps) {
  const items = Array<JSX.Element>();
  for (let i = 0; i < cols; i++) {
    items.push(<Skeleton className='w-40' />);
  }

  return (
    <table
      className={`mb-6 w-full text-left md:mb-12 ${className ? className : ''}`}
    >
      <colgroup>
        {items?.map((_item, index) => (
          <col key={index} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {items.map((item, index) => (
            <th
              key={index}
              className='bg-background border-font/20 border-b p-3'
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: ROWS_TO_LOAD - 5 }).map((_x, index) => (
          <tr key={index}>
            {items.map((item, subIndex) => (
              <td key={subIndex} className='border-font/20 border-b p-3'>
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
