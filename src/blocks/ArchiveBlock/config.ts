import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/**
 * Paginated listing of a collection. Use `cards` for a fixed-length row; this
 * block is for archive-style pages that show a full, filterable index.
 */
export const Archive: Block = {
  slug: 'archive',
  dbName: ({ tableName }) => `${tableName}_b_arch`,
  interfaceName: 'ArchiveBlock',
  labels: { singular: 'Archive', plural: 'Archives' },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'posts',
      label: 'Collection to show',
      options: [
        { label: 'Blog', value: 'posts' },
        { label: 'Case Studies', value: 'case-studies' },
        { label: 'Services', value: 'services' },
        { label: 'Areas We Cover', value: 'locations' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      label: 'Limit to categories',
      relationTo: 'categories',
      admin: { condition: (_, s) => s?.relationTo === 'posts' },
    },
    {
      name: 'limit',
      type: 'number',
      admin: { step: 1 },
      defaultValue: 12,
      min: 1,
      max: 48,
    },
    appearanceField,
  ],
}
