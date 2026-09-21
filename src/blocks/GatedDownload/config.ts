import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { appearanceField } from '@/fields/appearance'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/**
 * A lead magnet: the file is released only after an email address is captured.
 *
 * The file URL is never rendered into the initial HTML — it is returned by the
 * gate endpoint after the address is recorded, so the gate cannot be bypassed
 * by reading the page source.
 */
export const GatedDownloadBlock: Block = {
  slug: 'gatedDownload',
  dbName: ({ tableName }) => `${tableName}_b_gated`,
  interfaceName: 'GatedDownloadBlock',
  labels: { singular: 'Gated Download', plural: 'Gated Downloads' },
  fields: [
    ...sectionHeadingFields({ required: true }),
    {
      name: 'download',
      type: 'relationship',
      relationTo: 'downloads',
      required: true,
      admin: { description: 'The document released once the visitor submits their email.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional cover or preview of the document.' },
    },
    {
      name: 'bullets',
      type: 'array',
      label: "What's inside",
      admin: { initCollapsed: true },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'submitLabel',
          type: 'text',
          admin: { width: '50%' },
          defaultValue: 'Send me the guide',
        },
        {
          name: 'askName',
          type: 'checkbox',
          admin: { width: '50%' },
          defaultValue: true,
          label: 'Also ask for a name',
        },
      ],
    },
    {
      name: 'consentText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        description:
          'Shown beside the consent checkbox. Must state what the address will be used for.',
      },
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thanks — your download is ready.',
    },
    appearanceField,
  ],
}
