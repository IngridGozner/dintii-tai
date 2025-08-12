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
