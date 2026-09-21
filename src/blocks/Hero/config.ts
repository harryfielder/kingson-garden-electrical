import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

/**
 * Page opener. Supports a full-height cinematic treatment, a half-height
 * banner for interior pages, and a typographic variant with no media.
 *
 * Heroes are blocks rather than a fixed page field so that every page is
 * composed the same way, and so a page can legitimately open without one.
 */
export const HeroBlock: Block = {
  slug: 'hero',
  dbName: ({ tableName }) => `${tableName}_b_hero`,
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'height',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'half',
          options: [
            { label: 'Full height (landing pages)', value: 'full' },
            { label: 'Half height (interior pages)', value: 'half' },
            { label: 'Compact (text only)', value: 'compact' },
          ],
        },
        {
          name: 'background',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
            { label: 'Texture (no media)', value: 'texture' },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'image',
        description: 'Landscape, at least 2400px wide. This is usually the page LCP element.',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { condition: (_, siblingData) => siblingData?.background === 'video' },
    },
    {
      name: 'videoPoster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'video',
        description: 'Shown while the video loads, and to users who prefer reduced motion.',
      },
    },
    {
      name: 'texture',
      type: 'select',
      defaultValue: 'forest',
      admin: { condition: (_, siblingData) => siblingData?.background === 'texture' },
      options: [
        { label: 'Deep green', value: 'forest' },
        { label: 'Near black', value: 'ink' },
        { label: 'Warm stone', value: 'stone' },
      ],
    },
    {
      name: 'overlay',
      type: 'select',
      defaultValue: 'gradient',
      admin: {
        condition: (_, siblingData) => ['image', 'video'].includes(siblingData?.background),
        description: 'Keeps text legible over media. Required for accessible contrast.',
      },
      options: [
        { label: 'Gradient from bottom', value: 'gradient' },
        { label: 'Even scrim', value: 'scrim' },
        { label: 'Strong scrim', value: 'strong' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'align',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Centre', value: 'center' },
          ],
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description:
          'The page H1. Lead with the service and the place, e.g. "Garden lighting design in Surrey".',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: { description: 'One or two sentences of supporting copy.' },
    },
    linkGroup({
      appearances: ['accent', 'inverse', 'inverseOutline', 'default', 'outline'],
      overrides: { maxRows: 2, label: 'Buttons' },
    }),
    {
      name: 'trustSignals',
      type: 'array',
      label: 'Trust signals',
      maxRows: 4,
      admin: {
        description: 'Short proof points shown beneath the buttons, e.g. "NICEIC Approved".',
        initCollapsed: true,
      },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
