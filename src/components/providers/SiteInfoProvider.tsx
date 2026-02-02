'use client';

import { SITEINFO_QUERYResult } from '@/sanity/types';
import { createContext, useContext } from 'react';

export const defaultSiteInfo = {
  _id: '',
  title: null,
  subtitle: null,
  name: null,
  description: null,
  profession: null,
  logo: null,
  phone: null,
  address: null,
  postalCode: null,
  city: null,
  email: null,
  timetable: null,
  loginImage: null,
};

export const SiteInfoContext =
  createContext<NonNullable<SITEINFO_QUERYResult> | null>(defaultSiteInfo);

export default function SiteInfoProvider({
  children,
  siteInfo,
}: {
  children: React.ReactNode;
  siteInfo: NonNullable<SITEINFO_QUERYResult> | null;
}) {
  return (
    <SiteInfoContext.Provider value={siteInfo || defaultSiteInfo}>
      {children}
    </SiteInfoContext.Provider>
  );
}

export function useSiteInfo() {
  const context = useContext(SiteInfoContext);

  if (!context) {
    throw new Error('useSiteInfo must be used within a SiteInfoProvider');
  }

  return context;
}
