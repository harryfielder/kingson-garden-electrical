import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { appearanceField } from '@/fields/appearance'

/**
 * Renders a form built in the Forms collection.
 *
 * Multi-step behaviour is driven by "Step break" fields placed inside the form
 * itself, so a single form definition can be rendered as one page or as a
 * wizard depending on this block's `layout`.
 */
export const FormBlock: Block = {
  slug: 'formBlock',
  dbName: ({ tableName }) => `${tableName}_b_form`,
  interfaceName: 'FormBlock',
  labels: { singular: 'Form', plural: 'Form Blocks' },
  graphQL: { singularName: 'FormBlock' },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'single',
          options: [
            { label: 'Single page', value: 'single' },
            { label: 'Multi-step (uses step breaks in the form)', value: 'steps' },
          ],
        },
        {
          name: 'width',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'narrow',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Full width', value: 'full' },
            { label: 'Beside intro content', value: 'split' },
          ],
        },
      ],
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable intro content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: { condition: (_, { enableIntro }) => Boolean(enableIntro) },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Intro content',
    },
    appearanceField,
  ],
}
