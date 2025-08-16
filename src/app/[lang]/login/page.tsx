import { sanityFetch } from '@/sanity/lib/live';
import { SITEINFO_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { getDictionaryEntries } from '../layout';
import LoginForm from './LoginForm';

export default async function LoginPage({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const { data: siteInfo } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });

  const dictionaryEntries = await getDictionaryEntries(lang);

  const backgroundImage = siteInfo?.loginImage?.image;

  return (
    <>
      <LoginForm dictionaryEntries={dictionaryEntries} />

      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).width(800).height(800).url()}
          alt={backgroundImage?.alt || ''}
          fill
          className='relative h-full w-full object-cover'
        />
      )}
    </>
  );
}
