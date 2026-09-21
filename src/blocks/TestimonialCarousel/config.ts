import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { sectionHeadingFields } from '@/fields/sectionHeading'

export const TestimonialCarouselBlock: Block = {
  slug: 'testimonialCarousel',
  dbName: ({ tableName }) => `${tableName}_b_tstm`,
  interfaceName: 'TestimonialCarouselBlock',
  labels: { singular: 'Testimonial Carousel', plural: 'Testimonial Carousels' },
  fields: [
    ...sectionHeadingFields(),
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'latest',
          options: [
            { label: 'Most recent testimonials', value: 'latest' },
            { label: 'Featured testimonials only', value: 'featured' },
            { label: 'Choose manually', value: 'selection' },
          ],
        },
        {
          name: 'limit',
          type: 'number',
          admin: { width: '50%', condition: (_, s) => s?.source !== 'selection', step: 1 },
          defaultValue: 8,
          min: 1,
          max: 24,
        },
      ],
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        condition: (_, s) => s?.source !== 'selection',
        description: 'Optional. Only show testimonials attached to this service.',
      },
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'selection' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Single large quote', value: 'single' },
        { label: 'Static grid', value: 'grid' },
      ],
    },
    {
      name: 'showRatingSummary',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show average rating summary',
      admin: {
        description:
          'Displays the aggregate rating and emits AggregateRating structured data for this page.',
      },
    },
    appearanceField,
  ],
}
