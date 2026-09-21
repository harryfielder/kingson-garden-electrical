import type { Field } from 'payload'

/**
 * The eyebrow / heading / intro triad shared by most blocks.
 *
 * `headingLevel` is exposed because a correct document outline matters for
 * both accessibility and how search engines and LLMs parse page structure —
 * an editor placing a block below an h2 should be able to mark it h3.
 */
export const sectionHeadingFields = (options?: { required?: boolean }): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'eyebrow',
        type: 'text',
        admin: {
          width: '50%',
          description: 'Short kicker above the heading, e.g. "Our services".',
        },
      },
      {
        name: 'headingLevel',
        type: 'select',
        admin: {
          width: '50%',
          description: 'Use h2 unless this block sits beneath another heading.',
        },
        defaultValue: 'h2',
        options: [
          { label: 'H2', value: 'h2' },
          { label: 'H3', value: 'h3' },
          { label: 'H4', value: 'h4' },
        ],
      },
    ],
  },
  {
    name: 'heading',
    type: 'text',
    required: options?.required ?? false,
  },
  {
    name: 'intro',
    type: 'textarea',
    admin: { description: 'One or two sentences. Keep it under ~240 characters.' },
  },
]
