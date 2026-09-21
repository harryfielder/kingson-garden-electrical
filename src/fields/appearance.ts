import type { Field } from 'payload'

/**
 * Editor-facing controls that map 1:1 onto the design system's Section
 * variants. Editors choose from a fixed vocabulary rather than entering
 * colours or spacing, so the palette can be reskinned centrally without
 * touching content.
 */
export const appearanceField: Field = {
  name: 'appearance',
  type: 'group',
  label: 'Appearance',
  admin: {
    description: 'Controls the background and vertical spacing of this section.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'tone',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'canvas',
          options: [
            { label: 'Canvas (page background)', value: 'canvas' },
            { label: 'Subtle (warm sand)', value: 'subtle' },
            { label: 'Neutral (cool grey)', value: 'neutral' },
            { label: 'Wash (soft gradient)', value: 'wash' },
            { label: 'Surface (white panel)', value: 'surface' },
            { label: 'Brand (deep olive)', value: 'brand' },
            { label: 'Ink (near black)', value: 'ink' },
            { label: 'Accent (apricot tint)', value: 'accent' },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          admin: { width: '50%' },
          defaultValue: 'md',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'sm' },
            { label: 'Standard', value: 'md' },
            { label: 'Generous', value: 'lg' },
          ],
        },
      ],
    },
  ],
}

/** Tones that render light text; blocks use this to pick inverse variants. */
export const INVERSE_TONES = ['brand', 'ink'] as const

export const isInverseTone = (tone?: string | null): boolean =>
  INVERSE_TONES.includes(tone as (typeof INVERSE_TONES)[number])
