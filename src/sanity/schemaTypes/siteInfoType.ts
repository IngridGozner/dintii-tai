import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
            type: 'string',
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
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'phone',
            type: 'string',
        }),
        defineField({
            name: 'enail',
            type: 'string',
        }),
        defineField({
            name: 'address',
            type: 'string',
        }),
        defineField({
            name: 'timetable',
            type: 'blockContent',
        }),
    ],
})
