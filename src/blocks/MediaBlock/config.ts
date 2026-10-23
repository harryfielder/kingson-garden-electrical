import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { blockThumbnail } from '@/blocks/shared/thumbnail'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  dbName: ({ tableName }) => `${tableName}_b_med`,
  interfaceName: 'MediaBlock',
  admin: { images: blockThumbnail('mediaBlock', 'A single image or video with caption') },
  labels: { singular: 'Media', plural: 'Media Blocks' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Contained', value: 'default' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full bleed', value: 'full' },
      ],
    },
    appearanceField,
  ],
}
