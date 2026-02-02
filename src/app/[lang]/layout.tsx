import '@/app/globals.css';

import { Metadata } from 'next';
import { Providers } from '@/components/providers/providers';
import { sanityFetch } from '@/sanity/lib/live';
import {
  DICTIONARY_EDIT_QUERY,
  DICTIONARY_FEEDBACK_QUERY,
  DICTIONARY_FORM_QUERY,
  DICTIONARY_GENERAL_QUERY,
  DICTIONARY_NAVIGATION_QUERY,
  DICTIONARY_PATIENT_QUERY,
  DICTIONARY_TODO_QUERY,
  DICTIONARY_TREATMENT_QUERY,
  SITEINFO_QUERY,
} from '@/sanity/lib/queries';
import { DICTIONARY_QUERYResult } from '@/types/GeneralTypes';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang = 'ro' } = await params;

  const { data: siteInfo } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });

  const { title: siteTitle, name, description: plainContent } = siteInfo || {};

  const title =
    `${siteTitle} - Dentist Cluj | ${name}` ||
    'DintiiTai - Dentist Cluj | Dr. Natalia Rednic';
  const description =
    plainContent !== undefined && plainContent !== null
      ? typeof plainContent === 'string'
        ? plainContent
        : plainContent.value || ''
      : 'Cabinet stomatologic modern în Cluj-Napoca. Dr. Natalia Rednic oferă tratamente dentare, implanturi, albire și protetică. Programează-te la DintiiTai.';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const [{ data: siteInfo }, dictionaryEntries] = await Promise.all([
    sanityFetch({
      query: SITEINFO_QUERY,
      params: { language: lang },
    }),
    getDictionaryEntries(lang),
  ]);

  return (
    <html lang={lang}>
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
    { data: dictionaryTodo },
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
    sanityFetch({
      query: DICTIONARY_TODO_QUERY,
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
    ...dictionaryTodo,
  };

  const dictionaryEntries: DICTIONARY_QUERYResult = Object.fromEntries(
    Object.entries(mergedEntries).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  ) as DICTIONARY_QUERYResult;

  return dictionaryEntries;
}
