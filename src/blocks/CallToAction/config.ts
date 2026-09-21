import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { linkGroup } from '@/fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  dbName: ({ tableName }) => `${tableName}_b_cta`,
  interfaceName: 'CallToActionBlock',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'layout',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'split',
          options: [
            { label: 'Split (text left, buttons right)', value: 'split' },
            { label: 'Centred', value: 'centered' },
            { label: 'Banner with background image', value: 'banner' },
          ],
        },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.layout === 'banner' },
      required: true,
    },
    {
      name: 'phoneCta',
      type: 'checkbox',
      label: 'Show the company phone number alongside the buttons',
      defaultValue: false,
      admin: {
        description: 'Uses the number from Site Settings, as a tappable tel: link.',
      },
    },
    linkGroup({
      appearances: ['accent', 'inverse', 'inverseOutline', 'default', 'outline'],
      overrides: { maxRows: 2, label: 'Buttons' },
    }),
    appearanceField,
  ],
}
