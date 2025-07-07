import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'title',
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
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})
