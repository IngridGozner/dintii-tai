'use client';

import { DICTIONARY_QUERYResult } from '@/sanity/types';
import { createContext, useContext } from 'react';

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
  firstName: 'First Name',
  lastName: 'Last Name',
  phone: 'Phone',
  city: 'City',
  country: 'Country',
  patientFile: 'Patient File',
  birthdate: 'Birthdate',
  date: 'Date',
  price: 'Price',
  gdpr: 'GDPR',
  consent: 'Consent',
  editPatient: 'Edit Patient',
  addPatient: 'Add Patient',
  deletePatient: 'Delete Patient',
  profile: 'Profile',
  save: 'Save',
  cancel: 'Cancel',
  cnp: 'CNP',
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
