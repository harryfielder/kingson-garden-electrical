import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { appearanceField } from '@/fields/appearance'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/**
 * Question-and-answer accordion.
 *
 * Doubles as the source for FAQPage structured data, which is a direct route
 * into rich results and into the passages that answer engines quote.
 */
export const FaqBlock: Block = {
  slug: 'faq',
  dbName: ({ tableName }) => `${tableName}_b_faq`,
  interfaceName: 'FaqBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      required: true,
      labels: { singular: 'Question', plural: 'Questions' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/components/ArrayRowLabel#FaqRowLabel' },
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            description:
              'Phrase it the way a customer would ask it out loud — that is what answer engines match against.',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          admin: {
            description:
              'Answer the question directly in the first sentence, then add detail.',
          },
        },
      ],
    },
    {
      name: 'emitStructuredData',
      type: 'checkbox',
      defaultValue: true,
      label: 'Include in this page’s FAQ structured data',
      admin: {
        description:
          'Leave on unless another FAQ block on the same page already covers these questions.',
      },
    },
    appearanceField,
  ],
}
