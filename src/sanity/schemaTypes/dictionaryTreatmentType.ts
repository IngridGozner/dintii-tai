import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryTreatmentType = defineType({
  name: 'dictionaryTreatment',
  title: 'Dictionary Treatment',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'treatment',
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
      name: 'consentFile',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
