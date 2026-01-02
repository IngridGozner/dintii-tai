import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryFormType = defineType({
  name: 'dictionaryForm',
  title: 'Dictionary Forms',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'backToLogin',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'resetPassword',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'updatePassword',
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
      name: 'confirmPassword',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'forgotPassword',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'passwordDoNotMatch',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'patientAdultNotification',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dictionary Entries' };
    },
  },
});
