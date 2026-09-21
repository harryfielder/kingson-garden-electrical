import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { layoutField } from '@/fields/layout'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const { afterChange, afterDelete } = buildRevalidateHooks('case-studies')

/** Completed projects, structured as challenge → approach → outcome. */
export const CaseStudies: CollectionConfig<'case-studies'> = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    featuredImage: true,
    clientLocation: true,
    meta: { image: true, description: true },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientLocation', '_status', 'completedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'case-studies', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'case-studies', req }),
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 320,
              admin: { description: 'The outcome in one or two sentences.' },
            },
            { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'clientLocation',
                  type: 'text',
                  admin: { width: '50%', description: 'e.g. "Private residence, Cobham"' },
                },
                {
                  name: 'completedAt',
                  type: 'date',
                  admin: { width: '50%', date: { pickerAppearance: 'monthOnly' } },
                },
              ],
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: { position: 'sidebar' },
            },
            {
              name: 'location',
              type: 'relationship',
              relationTo: 'locations',
              admin: { position: 'sidebar' },
            },
            {
              name: 'testimonial',
              type: 'relationship',
              relationTo: 'testimonials',
              admin: { position: 'sidebar', description: 'Shown as a pull quote.' },
            },
          ],
        },
        {
          label: 'The project',
          fields: [
            {
              name: 'challenge',
              type: 'textarea',
              label: 'The challenge',
              admin: { description: 'What the client needed, and what made it difficult.' },
            },
            {
              name: 'approach',
              type: 'textarea',
              label: 'Our approach',
            },
            {
              name: 'outcome',
              type: 'textarea',
              label: 'The outcome',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Headline figures',
              maxRows: 4,
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      admin: { width: '50%', description: 'e.g. "42" or "3 weeks"' },
                    },
                    { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Page content',
          fields: [layoutField({ includeHero: false })],
        },
        seoTab(),
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
