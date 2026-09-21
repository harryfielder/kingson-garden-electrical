import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { routableCollections } from '@/utilities/routing'

export type LinkAppearances =
  | 'default'
  | 'accent'
  | 'outline'
  | 'inverse'
  | 'inverseOutline'
  | 'ghost'
  | 'link'

/** Mirrors the variants in `components/ui/button`, described for editors. */
export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: { label: 'Primary (solid green)', value: 'default' },
  accent: { label: 'Accent (brass)', value: 'accent' },
  outline: { label: 'Outline', value: 'outline' },
  inverse: { label: 'On dark — solid', value: 'inverse' },
  inverseOutline: { label: 'On dark — outline', value: 'inverseOutline' },
  ghost: { label: 'Ghost', value: 'ghost' },
  link: { label: 'Text link', value: 'link' },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: { layout: 'horizontal', width: '50%' },
            defaultValue: 'reference',
            options: [
              { label: 'Internal link', value: 'reference' },
              { label: 'Custom URL', value: 'custom' },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: { style: { alignSelf: 'flex-end' }, width: '50%' },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: { condition: (_, siblingData) => siblingData?.type === 'reference' },
      label: 'Document to link to',
      // Every routable collection is linkable, so editors never need to paste
      // an internal URL by hand (which would break on slug changes).
      relationTo: routableCollections,
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        description: 'An absolute URL, or a site-relative path beginning with / or #.',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    const halfWidthLinkTypes = linkTypes.map(
      (linkType) => ({ ...linkType, admin: { ...linkType.admin, width: '50%' } }) as Field,
    )

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...halfWidthLinkTypes,
        {
          name: 'label',
          type: 'text',
          admin: { width: '50%' },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    const appearanceOptionsToUse = appearances
      ? appearances.map((appearance) => appearanceOptions[appearance])
      : [
          appearanceOptions.default,
          appearanceOptions.accent,
          appearanceOptions.outline,
          appearanceOptions.link,
        ]

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: { description: 'How this link should be rendered.' },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
