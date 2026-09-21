import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true, update: authenticated },
  admin: { group: 'Configuration' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          admin: { initCollapsed: true },
          fields: [link({ appearances: false })],
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter sign-up',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Garden lighting notes',
          admin: { condition: (_, s) => Boolean(s?.enabled) },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Occasional design ideas, maintenance reminders and project photography. No more than once a month.',
          admin: { condition: (_, s) => Boolean(s?.enabled) },
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          admin: {
            condition: (_, s) => Boolean(s?.enabled),
            description:
              'The form that receives sign-ups. Create one with a single email field.',
          },
        },
        {
          name: 'consentText',
          type: 'text',
          defaultValue: 'We’ll only use your address for this newsletter. Unsubscribe any time.',
          admin: { condition: (_, s) => Boolean(s?.enabled) },
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal links',
      maxRows: 5,
      admin: { initCollapsed: true },
      fields: [link({ appearances: false })],
    },
    {
      name: 'showAccreditations',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show accreditation logos from Site Settings',
    },
  ],
  hooks: { afterChange: [revalidateFooter] },
}
