import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryPatientType = defineType({
  name: 'dictionaryPatient',
  title: 'Dictionary Patient',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
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
      name: 'patientFile',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'birthdate',
      type: 'internationalizedArrayString',
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
      name: 'cnp',
      type: 'string',
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
