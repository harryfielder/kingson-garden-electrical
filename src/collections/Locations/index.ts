import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { layoutField } from '@/fields/layout'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const { afterChange, afterDelete } = buildRevalidateHooks('locations')

/**
 * Location landing pages — the backbone of local organic search.
 *
 * Each record carries the geography needed for Service `areaServed` and for a
 * per-location LocalBusiness entity, plus enough distinct, genuinely local
 * content to avoid being treated as a doorway page.
 */
export const Locations: CollectionConfig<'locations'> = {
  slug: 'locations',
  labels: { singular: 'Area', plural: 'Areas We Cover' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: { name: true, slug: true, county: true, intro: true, featuredImage: true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'county', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'locations', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'locations', req }),
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'The place name alone, e.g. "Esher". Not "Electrician in Esher".' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Area',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'county', type: 'text', admin: { width: '50%' }, required: true },
                {
                  name: 'region',
                  type: 'text',
                  admin: { width: '50%', description: 'e.g. "South East England"' },
                },
              ],
            },
            {
              name: 'intro',
              type: 'textarea',
              required: true,
              maxLength: 400,
              admin: {
                description:
                  'Genuinely specific to this area — reference local property types, conservation areas or terrain. Near-duplicate intros across areas will be treated as doorway pages.',
              },
            },
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            {
              name: 'postcodes',
              type: 'array',
              label: 'Postcode districts covered',
              admin: {
                initCollapsed: true,
                description: 'Outward codes only, e.g. "KT10".',
              },
              fields: [{ name: 'code', type: 'text', required: true }],
            },
            {
              name: 'nearbyAreas',
              type: 'relationship',
              relationTo: 'locations',
              hasMany: true,
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
              admin: { position: 'sidebar' },
            },
            {
              name: 'servicesOffered',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: {
                position: 'sidebar',
                description: 'Leave empty to show all services.',
              },
            },
          ],
        },
        {
          label: 'Geography',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'latitude',
                  type: 'number',
                  admin: { width: '50%', description: 'Decimal degrees, e.g. 51.3690' },
                },
                {
                  name: 'longitude',
                  type: 'number',
                  admin: { width: '50%', description: 'Decimal degrees, e.g. -0.3660' },
                },
              ],
            },
            {
              name: 'serviceRadiusMiles',
              type: 'number',
              defaultValue: 15,
              admin: { description: 'Used for the geographic service area in structured data.' },
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
    slugField({ useAsSlug: 'name' }),
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
