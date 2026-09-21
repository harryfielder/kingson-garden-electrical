import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/** Ungated list of useful documents — guides, certificates, spec sheets. */
export const DownloadLinksBlock: Block = {
  slug: 'downloadLinks',
  dbName: ({ tableName }) => `${tableName}_b_dls`,
  interfaceName: 'DownloadLinksBlock',
  labels: { singular: 'Download Links', plural: 'Download Link Blocks' },
  fields: [
    ...sectionHeadingFields(),
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'selection',
          options: [
            { label: 'Choose downloads', value: 'selection' },
            { label: 'All downloads in a category', value: 'category' },
          ],
        },
        {
          name: 'layout',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'list',
          options: [
            { label: 'List', value: 'list' },
            { label: 'Cards', value: 'cards' },
          ],
        },
      ],
    },
    {
      name: 'downloads',
      type: 'relationship',
      relationTo: 'downloads',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'selection' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { condition: (_, s) => s?.source === 'category' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      min: 1,
      max: 24,
      admin: { condition: (_, s) => s?.source === 'category', step: 1 },
    },
    appearanceField,
  ],
}
