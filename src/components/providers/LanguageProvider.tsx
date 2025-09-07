'use client';

import { createContext, useContext } from 'react';

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

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
