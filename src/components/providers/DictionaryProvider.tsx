'use client';

import { DICTIONARY_QUERYResult } from '@/sanity/types';
import { createContext, useContext } from 'react';

export const defaultDictionaryEntries: DICTIONARY_QUERYResult = {
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
  firstName: null,
  lastName: null,
  phone: null,
  city: null,
  country: null,
  patientFile: null,
  birthdate: null,
  date: null,
  price: null,
  gdpr: null,
  consent: null,
  editPatient: null,
  addPatient: null,
  deletePatient: null,
  profile: null,
  save: null,
  cancel: null,
  cnp: null,
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

export function useDictionary() {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }

  return context;
}
