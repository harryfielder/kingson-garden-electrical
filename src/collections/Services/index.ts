import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { layoutField } from '@/fields/layout'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const { afterChange, afterDelete } = buildRevalidateHooks('services')

/**
 * The commercial core of the site. Each service is a standalone landing page
 * and the entity that Service structured data is generated from.
 */
export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    shortDescription: true,
    featuredImage: true,
    icon: true,
    meta: { image: true, description: true },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'services', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'services', req }),
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
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              maxLength: 280,
              admin: {
                description:
                  'One or two sentences, used on cards and in listings. Lead with what the customer gets.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'Used on service cards and as the social share image.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  admin: { width: '50%' },
                  defaultValue: 'zap',
                  options: [
                    { label: 'Lightbulb', value: 'lightbulb' },
                    { label: 'Zap', value: 'zap' },
                    { label: 'Leaf', value: 'leaf' },
                    { label: 'Shield', value: 'shield' },
                    { label: 'Wrench', value: 'wrench' },
                    { label: 'Sparkles', value: 'sparkles' },
                    { label: 'Droplet', value: 'droplet' },
                    { label: 'Home', value: 'home' },
                  ],
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  admin: { width: '50%' },
                  label: 'Feature in navigation and on the home page',
                },
              ],
            },
            {
              name: 'parent',
              type: 'relationship',
              relationTo: 'services',
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
              admin: {
                position: 'sidebar',
                description: 'Optional. Groups this under a broader service.',
              },
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
              admin: { position: 'sidebar' },
            },
          ],
        },
        {
          label: 'Page content',
          fields: [layoutField({ includeHero: false })],
        },
        {
          label: 'Commercial',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'priceFrom',
                  type: 'number',
                  admin: {
                    width: '50%',
                    description: 'Optional indicative starting price, in GBP.',
                  },
                },
                {
                  name: 'priceNote',
                  type: 'text',
                  admin: { width: '50%', description: 'e.g. "per installation, excluding VAT"' },
                },
              ],
            },
            {
              name: 'deliverables',
              type: 'array',
              label: "What's included",
              admin: { initCollapsed: true },
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'serviceArea',
              type: 'relationship',
              relationTo: 'locations',
              hasMany: true,
              admin: {
                description:
                  'Locations where this service is offered. Drives the areaServed property in structured data.',
              },
            },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
      defaultValue: 0,
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
