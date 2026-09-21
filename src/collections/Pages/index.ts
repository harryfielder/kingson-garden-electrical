import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { layoutField } from '@/fields/layout'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const { afterChange, afterDelete } = buildRevalidateHooks('pages')

/**
 * Freeform pages, composed entirely from blocks.
 *
 * Unlike the Payload website template there is no separate `hero` field — the
 * hero is a block like any other, so every page is a single ordered list of
 * blocks and pages that genuinely shouldn't open with a hero don't have to.
 */
export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: { title: true, slug: true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'pages', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'pages', req }),
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        { label: 'Content', fields: [layoutField({ required: true })] },
        seoTab(),
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
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
