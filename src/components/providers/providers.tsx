'use client';

import { PropsWithChildren } from 'react';
import LanguageProvider from './LanguageProvider';
import DictionaryProvider from './DictionaryProvider';
import { SITEINFO_QUERYResult } from '@/sanity/types';
import SiteInfoProvider from './SiteInfoProvider';
import DialogProvider from './DialogProvider';
import { DICTIONARY_QUERYResult } from '@/types/GeneralTypes';

type ProviderProps = PropsWithChildren & {
  language: string;
  dictionaryEntries: DICTIONARY_QUERYResult | null;
  siteInfo: NonNullable<SITEINFO_QUERYResult> | null;
};

export function Providers(props: ProviderProps) {
  const { children, language, dictionaryEntries, siteInfo } = props;

  return (
    <LanguageProvider language={language}>
      <DictionaryProvider dictionaryEntries={dictionaryEntries}>
        <SiteInfoProvider siteInfo={siteInfo}>
          <DialogProvider>{children}</DialogProvider>
        </SiteInfoProvider>
      </DictionaryProvider>
    </LanguageProvider>
  );
}
