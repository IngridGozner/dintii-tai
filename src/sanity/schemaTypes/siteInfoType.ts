import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const siteInfoType = defineType({
  name: 'siteInfo',
  title: 'SiteInfo',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'logo',
      type: 'image',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'profession',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'motto',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'stageImage',
      type: 'reference',
      to: { type: 'gallery' },
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      type: 'string',
    }),
    defineField({
      name: 'timetable',
      type: 'internationalizedArrayBlockContent',
    }),
    defineField({
      name: 'loginImage',
      type: 'reference',
      to: { type: 'gallery' },
    }),
  ],
});
