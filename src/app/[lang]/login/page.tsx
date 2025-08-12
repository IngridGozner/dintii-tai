import Dialog from '@/components/components/Dialog';
import { login } from './actions';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { sanityFetch } from '@/sanity/lib/live';
import { DICTIONARY_QUERY, SITEINFO_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { defaultDictionaryEntries } from '@/components/providers/DictionaryProvider';

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

  const { data: dictionaryEntries } = await sanityFetch({
    query: DICTIONARY_QUERY,
    params: { language: lang },
  });

  const {
    login: loginEntry,
    email,
    password,
  } = dictionaryEntries || defaultDictionaryEntries;
  const backgroundImage = siteInfo?.loginImage?.image;

  return (
    <>
      <Dialog headline={loginEntry ?? 'Login'}>
        <form className='flex flex-col gap-y-7'>
          <Input label={email ?? 'Email'} element='email' type='email' />
          <Input
            label={password ?? 'Password'}
            element='password'
            type='password'
          />
          <Button
            formAction={login}
            label={loginEntry ?? 'Login'}
            className='justify-center rounded-full text-center'
          />
        </form>
      </Dialog>

      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).width(3000).height(1000).url()}
          alt={backgroundImage?.alt || ''}
          fill
          className='relative h-full w-full object-cover'
        />
      )}
    </>
  );
}
