import { BlockContent } from '@/sanity/types';
import { GoogleIcon } from '../atoms/GoogleIcon';
import { Headline } from '../atoms/Headline';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';

type LineCardProps = {
  iconName: string;
  title: string;
  text: BlockContent;
  className?: string;
};

export default function LineCard(props: LineCardProps) {
  const { iconName, title, text, className } = props;

  return (
    <div className={className}>
      <div className='flex flex-row items-center p-5 lg:p-10'>
        <div className='flex h-32 w-32 items-center justify-center rounded-full bg-white lg:h-38 lg:w-38'>
          <GoogleIcon
            iconName={iconName}
            iconClassName='!text-[7rem] lg:!text-[8rem] text-link'
          />
        </div>
        <div className='ml-8 flex flex-col text-white lg:ml-18'>
          <Headline headline={title} />
          <div className='text-base md:text-2xl lg:leading-8'>
            <PortableText value={text} components={components} />
          </div>
        </div>
      </div>
    </div>
  );
}
