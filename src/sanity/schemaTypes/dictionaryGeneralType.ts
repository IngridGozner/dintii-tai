import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryGeneralType = defineType({
  name: 'dictionaryGeneral',
  title: 'Dictionary General',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'aboutUs',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'contact',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'prices',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'pricesTableTitle',
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
      name: 'schedule',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'studio',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
