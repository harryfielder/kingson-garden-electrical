import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/** Masonry image gallery with a lightbox. */
export const GalleryBlock: Block = {
  slug: 'gallery',
  dbName: ({ tableName }) => `${tableName}_b_gal`,
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    ...sectionHeadingFields(),
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'masonry',
          options: [
            { label: 'Masonry', value: 'masonry' },
            { label: 'Uniform grid', value: 'grid' },
            { label: 'Editorial (mixed sizes)', value: 'editorial' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: '3',
          options: [
            { label: 'Two across', value: '2' },
            { label: 'Three across', value: '3' },
            { label: 'Four across', value: '4' },
          ],
        },
      ],
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      defaultValue: true,
      label: 'Open images in a lightbox',
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      required: true,
      labels: { singular: 'Image', plural: 'Images' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/components/ArrayRowLabel#GalleryRowLabel' },
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'caption',
          type: 'text',
          admin: { description: 'Shown in the lightbox and beneath the image.' },
        },
        {
          name: 'emphasis',
          type: 'checkbox',
          label: 'Feature this image (wider in editorial layout)',
        },
      ],
    },
    appearanceField,
  ],
}
