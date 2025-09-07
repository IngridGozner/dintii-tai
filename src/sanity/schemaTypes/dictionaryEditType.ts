import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryEditType = defineType({
  name: 'dictionaryEdit',
  title: 'Dictionary Edit',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'addPatient',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'editPatient',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'deletePatient',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'addTreatment',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'editTreatment',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'deleteTreatment',
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
  ],
  preview: {
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
