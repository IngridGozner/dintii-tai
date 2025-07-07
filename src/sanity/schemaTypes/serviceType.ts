import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    icon: DocumentTextIcon,
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
            name: 'treatmentGroup',
            type: 'reference',
            to: { type: 'treatmentGroup' },
        }),
    ],
})
