import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType, SanityDocument, SlugSourceContext } from 'sanity'

export const articleType = defineType({
    name: 'article',
    title: 'Article',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: ((document) => {
                    const titleArray = document?.title;

                    if (Array.isArray(titleArray)) {
                        const enTitle = titleArray.find((item: any) => item._key === 'en')?.value;
                        return enTitle;
                    }

                    return 'Untitled Article';
                }),
                maxLength: 96,
            },
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    validation: rule => rule.custom((value, context) => {
                        const parent = context?.parent as { asset?: { _ref?: string } }

                        return !value && parent?.asset?._ref ? 'Alt text is required when an image is present' : true
                    }),
                })
            ]
        }),
        defineField({
            name: 'body',
            type: 'internationalizedArrayBlockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection;
            // Find English title (or fallback)
            const enTitle = Array.isArray(title)
                ? title.find(item => item._key === 'en')?.value || 'No title'
                : 'No title';

            return {
                title: enTitle,
                media,
            };
        },
    },
})

