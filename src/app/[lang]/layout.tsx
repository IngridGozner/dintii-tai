import '@/app/globals.css';
import Head from '@/components/components/Head';
import { Providers } from '@/components/providers/providers';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ARTICLE_SLUG_QUERY,
  DICTIONARY_QUERY,
  SITEINFO_QUERY,
} from '@/sanity/lib/queries';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const { data: siteInfo } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });

  const { data: aboutUsData } = await sanityFetch({
    query: ARTICLE_SLUG_QUERY,
    params: { language: lang, slug: 'about-us' },
  });

  const { data: dictionaryEntries } = await sanityFetch({
    query: DICTIONARY_QUERY,
    params: { language: lang },
  });

  return (
    <html lang={lang}>
      <Head
        siteInfo={siteInfo || undefined}
        article={aboutUsData || undefined}
      />
      <body>
        <Providers
          language={lang}
          dictionaryEntries={dictionaryEntries}
          siteInfo={siteInfo}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
