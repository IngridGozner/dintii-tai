'use client';

import { DICTIONARY_QUERYResult } from '@/sanity/types';
import { createContext } from 'react';

export const defaultDictionaryEntries = {
  prices: 'Prices',
  aboutUs: 'About Us',
  pricesTableTitle: 'Prices',
  treatmentTableTitle: 'Treatment',
  contact: 'Contact',
  schedule: 'Schedule',
  login: 'Login',
  email: 'Email',
  logout: 'Logout',
  patients: 'Patients',
  password: 'Password',
  dashboard: 'Dashboard',
  menu: 'Menu',
  general: 'General',
};

export const DictionaryContext =
  createContext<NonNullable<DICTIONARY_QUERYResult> | null>(
    defaultDictionaryEntries
  );

export default function DictionaryProvider({
  children,
  dictionaryEntries,
}: {
  children: React.ReactNode;
  dictionaryEntries: NonNullable<DICTIONARY_QUERYResult> | null;
}) {
  return (
    <DictionaryContext.Provider
      value={dictionaryEntries || defaultDictionaryEntries}
    >
      {children}
    </DictionaryContext.Provider>
  );
}
