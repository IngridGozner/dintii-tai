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
    defineField({
      name: 'deleteMessage',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'yes',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'no',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
