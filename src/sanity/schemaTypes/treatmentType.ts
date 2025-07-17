import { getEnglishNameFromInternationalizedField, getInternationalizedPreviewTitle } from '@/helpers';
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
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: ((document) => {
                    return getEnglishNameFromInternationalizedField(document, 'name');
                }),
            },
        }),
        defineField({
            name: 'treatmentGroup',
            type: 'reference',
            to: { type: 'treatmentGroup' },
        }),
        defineField({
            name: 'price',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
        prepare(selection) {
            return getInternationalizedPreviewTitle(selection);
        },
    },
})
