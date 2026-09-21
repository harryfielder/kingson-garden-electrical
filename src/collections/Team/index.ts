import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const { afterChange, afterDelete } = buildRevalidateHooks('team')

/**
 * The people behind the work. Named, qualified individuals are a meaningful
 * trust and E-E-A-T signal for a trade business, and each member becomes a
 * Person entity that blog posts can be attributed to.
 */
export const Team: CollectionConfig<'team'> = {
  slug: 'team',
  labels: { singular: 'Team Member', plural: 'Team' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: { name: true, slug: true, role: true, photo: true, shortBio: true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'team', req }),
    },
    group: 'Content',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'role',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'e.g. "Lead Electrician"' },
                },
                {
                  name: 'pronouns',
                  type: 'text',
                  admin: { width: '50%', description: 'Optional, e.g. "they/them".' },
                },
              ],
            },
            { name: 'photo', type: 'upload', relationTo: 'media' },
            {
              name: 'shortBio',
              type: 'textarea',
              maxLength: 280,
              admin: { description: 'Shown on team cards.' },
            },
            { name: 'bio', type: 'textarea', label: 'Full biography' },
            {
              name: 'qualifications',
              type: 'array',
              label: 'Qualifications and accreditations',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      admin: { width: '60%', description: 'e.g. "NICEIC Approved Contractor"' },
                    },
                    {
                      name: 'issuer',
                      type: 'text',
                      admin: { width: '40%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'specialisms',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: { position: 'sidebar' },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', admin: { width: '50%' } },
                { name: 'phone', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
            {
              name: 'isAuthor',
              type: 'checkbox',
              label: 'Can be credited as a blog author',
              defaultValue: false,
            },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    slugField({ useAsSlug: 'name' }),
  ],
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
