'use client';

import { PropsWithChildren } from 'react';
import LanguageProvider from './LanguageProvider';
import DictionaryProvider from './DictionaryProvider';
import { DICTIONARY_QUERYResult } from '@/sanity/types';

type ProviderProps = PropsWithChildren & {
  language: string;
  dictionaryEntries: NonNullable<DICTIONARY_QUERYResult> | null;
};

export function Providers(props: ProviderProps) {
  const { children, language, dictionaryEntries } = props;
  return (
    <LanguageProvider language={language}>
      <DictionaryProvider dictionaryEntries={dictionaryEntries}>
        {children}
      </DictionaryProvider>
    </LanguageProvider>
  );
}
