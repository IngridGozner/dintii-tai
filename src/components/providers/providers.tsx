'use client';

import { PropsWithChildren } from 'react';
import LanguageProvider from './LanguageProvider';
import DictionaryProvider from './DictionaryProvider';
import { DICTIONARY_QUERYResult, SITEINFO_QUERYResult } from '@/sanity/types';
import SiteInfoProvider from './SiteInfoProvider';

type ProviderProps = PropsWithChildren & {
  language: string;
  dictionaryEntries: NonNullable<DICTIONARY_QUERYResult> | null;
  siteInfo: NonNullable<SITEINFO_QUERYResult> | null;
};

export function Providers(props: ProviderProps) {
  const { children, language, dictionaryEntries, siteInfo } = props;
  return (
    <LanguageProvider language={language}>
      <DictionaryProvider dictionaryEntries={dictionaryEntries}>
        <SiteInfoProvider siteInfo={siteInfo}>{children}</SiteInfoProvider>
      </DictionaryProvider>
    </LanguageProvider>
  );
}
