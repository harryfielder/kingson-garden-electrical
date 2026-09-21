import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { afterChange, afterDelete } = buildRevalidateHooks('downloads')

/**
 * Downloadable documents — guides, specification sheets, certificates.
 *
 * This is an upload-enabled collection, so the file and its metadata live in
 * one record. Gated files are served through `/api/downloads/unlock`, which
 * records the email address before returning the URL.
 */
export const Downloads: CollectionConfig<'downloads'> = {
  slug: 'downloads',
  labels: { singular: 'Download', plural: 'Downloads' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    description: true,
    gated: true,
    thumbnail: true,
    filename: true,
    filesize: true,
    mimeType: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'gated', 'updatedAt'],
    group: 'Content',
  },
  upload: {
    staticDir: path.resolve(dirname, '../../../public/downloads'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/*',
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'What this document contains and who it is for.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          admin: { width: '50%' },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Optional cover image.' },
        },
      ],
    },
    {
      name: 'gated',
      type: 'checkbox',
      label: 'Require an email address before download',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'When on, the file URL is withheld from the page and released only after the visitor submits their address.',
      },
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    { type: 'tabs', tabs: [seoTab()] },
    slugField(),
  ],
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
