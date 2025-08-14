import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryType = defineType({
  name: 'dictionary',
  title: 'Dictionary',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'prices',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'aboutUs',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'pricesTableTitle',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'treatmentTableTitle',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'contact',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'schedule',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'login',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'email',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'password',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'dashboard',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'patients',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'menu',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'general',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'logout',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'firstName',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'lastName',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'phone',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'cnp',
      type: 'string',
    }),
    defineField({
      name: 'city',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'country',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'patientFile',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'birthdate',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'date',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'price',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'gdpr',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'consent',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'editPatient',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'addPatient',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'deletePatient',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'profile',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'save',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'cancel',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
