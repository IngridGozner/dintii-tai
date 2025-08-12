'use client';

import { createContext } from 'react';

export const LanguageContext = createContext('');

export default function LanguageProvider({
  children,
  language,
}: {
  children: React.ReactNode;
  language: string;
}) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}
