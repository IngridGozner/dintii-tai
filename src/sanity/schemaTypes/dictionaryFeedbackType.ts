import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryFeedbackType = defineType({
  name: 'dictionaryFeedback',
  title: 'Dictionary Feedback',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'successMessage',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'errorMessage',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
