import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { linkGroup } from '@/fields/linkGroup'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/** "Reasons to choose us" — a row of icon-led value propositions. */
export const FeatureRowBlock: Block = {
  slug: 'featureRow',
  dbName: ({ tableName }) => `${tableName}_b_feats`,
  interfaceName: 'FeatureRowBlock',
  labels: { singular: 'Feature Row', plural: 'Feature Rows' },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: 'Two across', value: '2' },
        { label: 'Three across', value: '3' },
        { label: 'Four across', value: '4' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'plain',
      options: [
        { label: 'Plain (no card)', value: 'plain' },
        { label: 'Bordered cards', value: 'card' },
        { label: 'Numbered steps', value: 'numbered' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      required: true,
      admin: { initCollapsed: true, components: { RowLabel: '@/components/ArrayRowLabel#FeatureRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              admin: { width: '50%' },
              defaultValue: 'check',
              options: [
                { label: 'Check', value: 'check' },
                { label: 'Shield (safety)', value: 'shield' },
                { label: 'Award (accreditation)', value: 'award' },
                { label: 'Lightbulb (lighting)', value: 'lightbulb' },
                { label: 'Leaf (garden)', value: 'leaf' },
                { label: 'Zap (electrical)', value: 'zap' },
                { label: 'Clock (speed)', value: 'clock' },
                { label: 'Users (team)', value: 'users' },
                { label: 'Wrench (maintenance)', value: 'wrench' },
                { label: 'Map pin (local)', value: 'mapPin' },
                { label: 'Sparkles (design)', value: 'sparkles' },
                { label: 'Phone (support)', value: 'phone' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              admin: { width: '50%' },
              required: true,
            },
          ],
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    linkGroup({
      appearances: ['default', 'accent', 'outline', 'link'],
      overrides: { maxRows: 1, label: 'Call to action' },
    }),
    appearanceField,
  ],
}
