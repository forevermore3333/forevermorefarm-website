import { defineField, defineType } from 'sanity'

export const strawBaleGardenPage = defineType({
  name: 'strawBaleGardenPage',
  title: 'Straw Bale Garden Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'instructor', title: 'Instructor' },
    { name: 'benefits', title: 'Benefits' },
    { name: 'steps', title: 'Steps' },
    { name: 'gallery', title: 'Gallery' },
    { name: 'workshop', title: 'Workshop CTA' },
    { name: 'email', title: 'Email Capture' },
  ],
  fields: [
    // ── Hero ─────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      initialValue: 'The Straw Bale Method',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
      initialValue: 'Grow anywhere. No soil required. Concetta has been doing this for over a decade.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video URL',
      description: 'Optional video URL (e.g. /videos/garden-drone-reveal.mp4)',
      type: 'url',
      group: 'hero',
      validation: (rule) => rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Learn from Concetta',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Link',
      type: 'string',
      group: 'hero',
      initialValue: '#workshops',
    }),

    // ── Instructor ────────────────────────────────────────
    defineField({
      name: 'instructorName',
      title: 'Instructor Name',
      type: 'string',
      group: 'instructor',
      initialValue: 'Concetta West',
    }),
    defineField({
      name: 'instructorQuote',
      title: 'Instructor Quote',
      type: 'text',
      rows: 4,
      group: 'instructor',
      initialValue:
        '10+ years ago I had the honor of attending a straw bale gardening class taught by Joel Karsten. His methods inspired and equipped me to grow a market garden and 30-member CSA with the produce from my very first Straw Bale Garden in Washington State.',
    }),
    defineField({
      name: 'instructorQuoteAttribution',
      title: 'Quote Attribution',
      type: 'string',
      group: 'instructor',
      initialValue: 'Concetta West, Certified Straw Bale Gardening Instructor',
    }),
    defineField({
      name: 'instructorBio',
      title: 'Instructor Bio',
      type: 'text',
      rows: 4,
      group: 'instructor',
      initialValue:
        "Concetta is one of a small number of certified instructors trained directly under Joel Karsten — the creator of the straw bale gardening method. She's been practicing and teaching this technique for over a decade, across two states and two different growing zones.",
    }),
    defineField({
      name: 'instructorImage',
      title: 'Instructor Image',
      type: 'image',
      group: 'instructor',
      options: { hotspot: true },
    }),

    // ── Benefits ──────────────────────────────────────────
    defineField({
      name: 'benefitsTitle',
      title: 'Benefits Section Title',
      type: 'string',
      group: 'benefits',
      initialValue: 'Why Straw Bale?',
    }),
    defineField({
      name: 'benefitsSubtitle',
      title: 'Benefits Section Subtitle',
      type: 'string',
      group: 'benefits',
      initialValue: 'Five reasons this method changes how people think about growing food.',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'benefits',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Steps ─────────────────────────────────────────────
    defineField({
      name: 'stepsTitle',
      title: 'Steps Section Title',
      type: 'string',
      group: 'steps',
      initialValue: 'How It Works',
    }),
    defineField({
      name: 'stepsSubtitle',
      title: 'Steps Section Subtitle',
      type: 'string',
      group: 'steps',
      initialValue: 'Six steps from empty bale to full harvest. This is the exact method Concetta teaches.',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      group: 'steps',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Step Number', type: 'string', description: 'e.g. 01' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
            defineField({
              name: 'image',
              title: 'Step Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
            prepare: ({ title, subtitle }) => ({ title: `${subtitle}: ${title}` }),
          },
        },
      ],
    }),

    // ── Gallery ───────────────────────────────────────────
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Title',
      type: 'string',
      group: 'gallery',
      initialValue: 'The Garden at Forevermore',
    }),
    defineField({
      name: 'galleryPhotos',
      title: 'Gallery Photos',
      description: 'Drag to reorder. Order here = order on page.',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),

    // ── Workshop CTA ──────────────────────────────────────
    defineField({
      name: 'workshopLabel',
      title: 'Workshop Label (eyebrow)',
      type: 'string',
      group: 'workshop',
      initialValue: 'This Season',
    }),
    defineField({
      name: 'workshopTitle',
      title: 'Workshop Title',
      type: 'string',
      group: 'workshop',
      initialValue: 'Workshops with Concetta',
    }),
    defineField({
      name: 'workshopBody',
      title: 'Workshop Body',
      type: 'text',
      rows: 4,
      group: 'workshop',
      initialValue:
        'Learn straw bale gardening hands-on at Forevermore Farm. Small groups, real instruction, real soil — or rather, real bales. Workshop dates will be announced to the email list first.',
    }),
    defineField({
      name: 'workshopCtaText',
      title: 'Workshop CTA Button Text',
      type: 'string',
      group: 'workshop',
      initialValue: 'See Upcoming Events',
    }),
    defineField({
      name: 'workshopCtaLink',
      title: 'Workshop CTA Link',
      type: 'string',
      group: 'workshop',
      initialValue: '/events',
    }),

    // ── Email Capture ─────────────────────────────────────
    defineField({
      name: 'emailHeadline',
      title: 'Email Capture Headline',
      type: 'string',
      group: 'email',
      initialValue: 'Workshop dates announced first.',
    }),
    defineField({
      name: 'emailSubtitle',
      title: 'Email Capture Subtitle',
      type: 'string',
      group: 'email',
      initialValue: 'Join the list and hear before anyone else.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Straw Bale Garden Page' }),
  },
})
