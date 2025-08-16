import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from '@/sanity/types';

export type FieldString = { value: string | null };

export type SanityImage = {
  image: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: 'image';
  } | null;
};

export type NavigationLink = {
  name: string;
  href?: string;
  icon: string;
  onClick?: () => void;
};

export type DICTIONARY_QUERYResult = {
  prices: string | null;
  aboutUs: string | null;
  pricesTableTitle: string | null;
  treatmentTableTitle: string | null;
  contact: string | null;
  schedule: string | null;
  login: string | null;
  email: string | null;
  logout: string | null;
  patients: string | null;
  password: string | null;
  dashboard: string | null;
  menu: string | null;
  general: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  patientFile: string | null;
  birthdate: string | null;
  date: string | null;
  price: string | null;
  gdpr: string | null;
  consent: string | null;
  editPatient: string | null;
  addPatient: string | null;
  deletePatient: string | null;
  profile: string | null;
  save: string | null;
  cancel: string | null;
  cnp: string | null;
  backToPatients: string | null;
};
