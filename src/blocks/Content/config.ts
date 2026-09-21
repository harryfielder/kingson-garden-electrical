import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { appearanceField } from '@/fields/appearance'
import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'select',
        admin: { width: '50%' },
        defaultValue: 'full',
        options: [
          { label: 'One third', value: 'oneThird' },
          { label: 'Half', value: 'half' },
          { label: 'Two thirds', value: 'twoThirds' },
          { label: 'Full width', value: 'full' },
        ],
      },
      {
        name: 'measure',
        type: 'select',
        admin: {
          width: '50%',
          description: 'Constrains line length for comfortable reading.',
        },
        defaultValue: 'prose',
        options: [
          { label: 'Readable measure', value: 'prose' },
          { label: 'Fill the column', value: 'full' },
        ],
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        HorizontalRuleFeature(),
      ],
    }),
    label: false,
  },
  { name: 'enableLink', type: 'checkbox' },
  link({
    overrides: {
      admin: { condition: (_data, siblingData) => Boolean(siblingData?.enableLink) },
    },
  }),
]

/** Simple text content, optionally split into columns. */
export const Content: Block = {
  slug: 'content',
  dbName: ({ tableName }) => `${tableName}_b_cont`,
  interfaceName: 'ContentBlock',
  labels: { singular: 'Text Content', plural: 'Text Content Blocks' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: columnFields,
    },
    appearanceField,
  ],
}
