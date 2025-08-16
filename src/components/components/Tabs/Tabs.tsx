'use client';

import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import {
  Children,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

export function Tabs({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState(0);

  if (!Children.count(children)) return null;

  return (
    <Container contentClass='!mt-2 md:!mt-5'>
      <GridContainer>
        <div className='border-font/20 col-span-6 border-b md:col-span-12'>
          <div className='flex items-center gap-x-6'>
            {Children.map(children, (child, index) => (
              <a
                href='#'
                className={`hover:bg-link-hover text-link mb-1 rounded-b-none border-b-2 border-b-transparent px-4 py-2 hover:text-white ${index === activeTab ? '!border-b-link' : ''}`}
                key={`tab-${index}`}
                onClick={() => setActiveTab(index)}
              >
                {child && typeof child === 'object' && 'props' in child
                  ? (child as ReactElement<{ title?: ReactNode }>)?.props.title
                  : null}
              </a>
            ))}
          </div>
        </div>
        <div className='col-span-6 md:col-span-12'>
          {Children.toArray(children).at(activeTab)}
        </div>
      </GridContainer>
    </Container>
  );
}
