import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const dictionaryTodoType = defineType({
  name: 'dictionaryTodo',
  title: 'Dictionary TODO',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'todoHeadline',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'todo',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'comment',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'done',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'redirectToTodoPage',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'editTODOItem',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'addTODOItem',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'deleteTODOItem',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'emptyTODOList',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'TODO Dictionary Entries' };
    },
  },
});
