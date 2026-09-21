import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

/**
 * Primary navigation.
 *
 * Each top-level item is either a plain link or a megamenu. Megamenu columns
 * can be hand-authored or auto-populated from Services or Areas, so adding a
 * service does not require a separate navigation edit — a common source of
 * orphaned pages.
 */
export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true, update: authenticated },
  admin: { group: 'Configuration' },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 7,
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/components/ArrayRowLabel#NavItemRowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'link',
              admin: { width: '50%' },
              options: [
                { label: 'Simple link', value: 'link' },
                { label: 'Megamenu', value: 'megamenu' },
              ],
            },
          ],
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            label: 'Destination',
            admin: {
              description:
                'For a megamenu this is the heading link, e.g. the Services index.',
            },
          },
        }),
        {
          name: 'megamenu',
          type: 'group',
          admin: { condition: (_, s) => s?.type === 'megamenu' },
          fields: [
            {
              name: 'description',
              type: 'textarea',
              admin: { description: 'Short intro shown in the first column.' },
            },
            {
              name: 'columns',
              type: 'array',
              maxRows: 4,
              admin: { initCollapsed: true },
              fields: [
                { name: 'heading', type: 'text' },
                {
                  name: 'source',
                  type: 'select',
                  defaultValue: 'manual',
                  options: [
                    { label: 'Manual links', value: 'manual' },
                    { label: 'All featured services', value: 'services' },
                    { label: 'All areas covered', value: 'locations' },
                  ],
                },
                {
                  name: 'links',
                  type: 'array',
                  admin: { condition: (_, s) => s?.source === 'manual', initCollapsed: true },
                  fields: [
                    link({ appearances: false }),
                    {
                      name: 'description',
                      type: 'text',
                      admin: { description: 'Optional one-line description beneath the link.' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'featured',
              type: 'group',
              label: 'Featured panel',
              admin: { description: 'Optional promoted card shown on the right of the menu.' },
              fields: [
                { name: 'enabled', type: 'checkbox' },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { condition: (_, s) => Boolean(s?.enabled) },
                },
                {
                  name: 'title',
                  type: 'text',
                  admin: { condition: (_, s) => Boolean(s?.enabled) },
                },
                {
                  name: 'description',
                  type: 'text',
                  admin: { condition: (_, s) => Boolean(s?.enabled) },
                },
                link({
                  appearances: false,
                  overrides: { admin: { condition: (_, s) => Boolean(s?.enabled) } },
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'ctas',
      type: 'array',
      label: 'Header buttons',
      maxRows: 2,
      admin: { initCollapsed: true },
      fields: [link({ appearances: ['accent', 'default', 'outline'] })],
    },
    {
      name: 'showPhone',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the phone number in the header',
    },
  ],
  hooks: { afterChange: [revalidateHeader] },
}
