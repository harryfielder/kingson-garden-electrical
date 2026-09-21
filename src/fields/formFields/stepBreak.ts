import type { Block } from 'payload'

/**
 * A marker inside a form's field list that starts a new step.
 *
 * The form-builder plugin stores fields as a flat array; the renderer splits
 * that array on these markers. Placing the step boundary in the form (rather
 * than on the page block) means one form definition can be reused on several
 * pages and keep its step structure.
 */
export const StepBreak: Block = {
  slug: 'stepBreak',
  dbName: ({ tableName }) => `${tableName}_b_step`,
  interfaceName: 'FormStepBreak',
  labels: { singular: 'Step break', plural: 'Step breaks' },
  fields: [
    {
      name: 'stepTitle',
      type: 'text',
      required: true,
      admin: { description: 'Shown in the progress indicator, e.g. "About your garden".' },
    },
    {
      name: 'stepDescription',
      type: 'text',
      admin: { description: 'Optional helper text shown at the top of this step.' },
    },
  ],
}
