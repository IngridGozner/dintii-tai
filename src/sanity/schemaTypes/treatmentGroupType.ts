import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const treatmentGroupType = defineType({
    name: 'treatmentGroup',
    title: 'TreatmentGroup',
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
    ],
})
