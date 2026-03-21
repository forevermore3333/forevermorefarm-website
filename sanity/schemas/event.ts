import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'Display text, e.g. "June 19–20, 2026"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      description: 'Display text, e.g. "Free & Open to the Public"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'ctaExternal',
      title: 'Open in new tab?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge (optional)',
      description: 'Short label shown as a pill badge, e.g. "Free Event"',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})
