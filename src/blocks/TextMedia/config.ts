import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { appearanceField } from '@/fields/appearance'
import { linkGroup } from '@/fields/linkGroup'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/** Paired text and media, with the media on either side. */
export const TextMediaBlock: Block = {
  slug: 'textMedia',
  dbName: ({ tableName }) => `${tableName}_b_txtmed`,
  interfaceName: 'TextMediaBlock',
  labels: { singular: 'Text & Media', plural: 'Text & Media' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'mediaPosition',
          type: 'select',
          admin: { width: '33%' },
          defaultValue: 'right',
          options: [
            { label: 'Media right', value: 'right' },
            { label: 'Media left', value: 'left' },
          ],
        },
        {
          name: 'mediaRatio',
          type: 'select',
          admin: { width: '33%' },
          defaultValue: '4/3',
          options: [
            { label: 'Landscape 4:3', value: '4/3' },
            { label: 'Landscape 3:2', value: '3/2' },
            { label: 'Portrait 3:4', value: '3/4' },
            { label: 'Square', value: 'square' },
            { label: 'Widescreen 16:9', value: 'video' },
          ],
        },
        {
          name: 'mediaWidth',
          type: 'select',
          admin: { width: '34%' },
          defaultValue: 'half',
          options: [
            { label: 'Equal halves', value: 'half' },
            { label: 'Media wider', value: 'mediaWide' },
            { label: 'Text wider', value: 'textWide' },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ...sectionHeadingFields({ required: true }),
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Body',
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Bullet points',
      admin: { initCollapsed: true },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    linkGroup({
      appearances: ['default', 'accent', 'outline', 'link'],
      overrides: { maxRows: 2, label: 'Calls to action' },
    }),
    appearanceField,
  ],
}
