import { getEnglishNameFromInternationalizedField, getInternationalizedPreviewTitle } from '@/helpers';
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
