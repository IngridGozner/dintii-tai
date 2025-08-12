import { urlFor } from '@/sanity/lib/image';
import { STAGE_QUERYResult } from '@/sanity/types';
import Image from 'next/image';
import { GridContainer } from '../molecules/GridContainer';

export default function Stage(props: NonNullable<STAGE_QUERYResult>) {
  const { motto, stageImage, name, profession } = props;

  if (!stageImage || !stageImage.image) return null;

  return (
    <GridContainer>
      <div className='relative col-span-6 h-[250px] w-full md:col-span-12 md:h-[300px] lg:h-[500px]'>
        {motto && (
          <div className='absolute inset-0 z-10 grid grid-cols-1 items-end md:grid-cols-2 md:items-center'>
            <div className='bg-link/50 p-3 lg:p-12'>
              <h1 className='font-[Architects_Daughter] text-3xl text-white text-shadow-lg lg:text-7xl'>
                {motto.value}
              </h1>
              <div className='mt-0 text-base text-white lg:mt-4 lg:ml-5 lg:text-2xl'>
                {name} | {profession?.value}
              </div>
            </div>
          </div>
        )}
        <Image
          src={urlFor(stageImage?.image).width(3000).height(1000).url()}
          alt={stageImage?.image?.alt || ''}
          fill
          className='h-full w-full object-cover'
        />
      </div>
    </GridContainer>
  );
}
