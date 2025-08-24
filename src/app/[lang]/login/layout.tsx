import { sanityFetch } from '@/sanity/lib/live';
import { SITEINFO_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export default async function LoginLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const { data: siteInfo } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });

  const backgroundImage = siteInfo?.loginImage?.image;

  return (
    <>
      {children}

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
