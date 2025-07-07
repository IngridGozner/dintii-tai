import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteInfoType = defineType({
    name: 'siteInfo',
    title: 'SiteInfo',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
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
