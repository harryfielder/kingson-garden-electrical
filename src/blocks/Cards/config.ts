import type { Block } from 'payload'

import { appearanceField } from '@/fields/appearance'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { sectionHeadingFields } from '@/fields/sectionHeading'

/**
 * A card grid that is either hand-authored or pulled from a collection.
 *
 * The automatic mode keeps landing pages current without editor upkeep; the
 * manual mode exists for bespoke marketing rows that do not map to a document.
 */
export const CardsBlock: Block = {
  slug: 'cards',
  dbName: ({ tableName }) => `${tableName}_b_cards`,
  interfaceName: 'CardsBlock',
  labels: { singular: 'Cards', plural: 'Card Blocks' },
  fields: [
    ...sectionHeadingFields(),
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'collection',
          options: [
            { label: 'Pull from a collection', value: 'collection' },
            { label: 'Choose documents manually', value: 'selection' },
            { label: 'Write cards by hand', value: 'manual' },
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
      name: 'relationTo',
      type: 'select',
      admin: { condition: (_, s) => s?.source === 'collection' },
      defaultValue: 'services',
      label: 'Collection',
      options: [
        { label: 'Services', value: 'services' },
        { label: 'Case Studies', value: 'case-studies' },
        { label: 'Blog', value: 'posts' },
        { label: 'Areas We Cover', value: 'locations' },
        { label: 'Team', value: 'team' },
        { label: 'Downloads', value: 'downloads' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: { condition: (_, s) => s?.source === 'collection', step: 1 },
      defaultValue: 6,
      min: 1,
      max: 24,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, s) => s?.source === 'collection' && s?.relationTo === 'posts',
        description: 'Optional. Limits blog cards to these categories.',
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: { condition: (_, s) => s?.source === 'selection' },
      hasMany: true,
      label: 'Documents',
      relationTo: ['services', 'case-studies', 'posts', 'locations', 'team', 'downloads', 'pages'],
    },
    {
      name: 'manualCards',
      type: 'array',
      admin: {
        condition: (_, s) => s?.source === 'manual',
        initCollapsed: true,
        components: { RowLabel: '@/components/ArrayRowLabel#CardRowLabel' },
      },
      label: 'Cards',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Make this card clickable',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: { admin: { condition: (_, s) => Boolean(s?.enableLink) } },
        }),
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cardStyle',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'image',
          options: [
            { label: 'Image on top', value: 'image' },
            { label: 'Image fills card, text overlaid', value: 'overlay' },
            { label: 'Text only', value: 'text' },
          ],
        },
        {
          name: 'imageRatio',
          type: 'select',
          admin: {
            width: '50%',
            condition: (_, s) => s?.cardStyle !== 'text',
            description:
              'Pick a portrait crop when the source photography is portrait — a landscape crop discards most of the frame.',
          },
          defaultValue: 'auto',
          options: [
            { label: 'Automatic (suits the card style)', value: 'auto' },
            { label: 'Portrait 3:4', value: '3/4' },
            { label: 'Tall portrait 2:3', value: '2/3' },
            { label: 'Square', value: 'square' },
            { label: 'Landscape 4:3', value: '4/3' },
            { label: 'Landscape 3:2', value: '3/2' },
          ],
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'accent', 'outline', 'link'],
      overrides: { maxRows: 1, label: 'Call to action' },
    }),
    appearanceField,
  ],
}
