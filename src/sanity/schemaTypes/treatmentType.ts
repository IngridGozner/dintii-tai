import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const treatmentType = defineType({
    name: 'treatment',
    title: 'Treatment',
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
        defineField({
            name: 'price',
            type: 'number',
        }),
    ],
})
