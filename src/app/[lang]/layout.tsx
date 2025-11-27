import '@/app/globals.css';

import CustomHead from '@/components/components/Head';
import { Providers } from '@/components/providers/providers';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ARTICLE_SLUG_QUERY,
  DICTIONARY_EDIT_QUERY,
  DICTIONARY_FEEDBACK_QUERY,
  DICTIONARY_FORM_QUERY,
  DICTIONARY_GENERAL_QUERY,
  DICTIONARY_NAVIGATION_QUERY,
  DICTIONARY_PATIENT_QUERY,
  DICTIONARY_TREATMENT_QUERY,
  SITEINFO_QUERY,
} from '@/sanity/lib/queries';
import { DICTIONARY_QUERYResult } from '@/types/GeneralTypes';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const [{ data: siteInfo }, { data: aboutUsData }, dictionaryEntries] =
    await Promise.all([
      sanityFetch({
        query: SITEINFO_QUERY,
        params: { language: lang },
      }),
      sanityFetch({
        query: ARTICLE_SLUG_QUERY,
        params: { language: lang, slug: 'about-us' },
      }),
      getDictionaryEntries(lang),
    ]);

  return (
    <html lang={lang}>
      <CustomHead
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

export async function getDictionaryEntries(
  lang: string
): Promise<DICTIONARY_QUERYResult> {
  const [
    { data: dictionaryNavigation },
    { data: dictionaryGeneral },
    { data: dictionaryEdit },
    { data: dictionaryPatient },
    { data: dictionaryTreatment },
    { data: dictionaryFeedback },
    { data: dictionaryForm },
  ] = await Promise.all([
    sanityFetch({
      query: DICTIONARY_NAVIGATION_QUERY,
      params: { language: lang },
    }),
    sanityFetch({
      query: DICTIONARY_GENERAL_QUERY,
      params: { language: lang },
    }),
    sanityFetch({ query: DICTIONARY_EDIT_QUERY, params: { language: lang } }),
    sanityFetch({
      query: DICTIONARY_PATIENT_QUERY,
      params: { language: lang },
    }),
    sanityFetch({
      query: DICTIONARY_TREATMENT_QUERY,
      params: { language: lang },
    }),
    sanityFetch({
      query: DICTIONARY_FEEDBACK_QUERY,
      params: { language: lang },
    }),
    sanityFetch({
      query: DICTIONARY_FORM_QUERY,
      params: { language: lang },
    }),
  ]);

  const mergedEntries = {
    ...dictionaryGeneral,
    ...dictionaryNavigation,
    ...dictionaryEdit,
    ...dictionaryPatient,
    ...dictionaryTreatment,
    ...dictionaryFeedback,
    ...dictionaryForm,
  };

  const dictionaryEntries: DICTIONARY_QUERYResult = Object.fromEntries(
    Object.entries(mergedEntries).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  ) as DICTIONARY_QUERYResult;

  return dictionaryEntries;
}
