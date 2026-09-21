import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Small mono kicker above a heading. The monospace face reads as technical
 * precision, which is the half of the brand the serif does not carry.
 *
 * The leading rule that used to sit before the label has been removed — it
 * fought the generous whitespace the layout otherwise has, and the letter
 * spacing already separates the eyebrow from the heading well enough.
 */
export const eyebrowVariants = cva(
  'font-mono text-eyebrow font-medium uppercase inline-flex items-center gap-2',
  {
    variants: {
      tone: {
        accent: 'text-accent-ink',
        brand: 'text-brand',
        muted: 'text-ink-subtle',
        inverse: 'text-apricot-200',
      },
    },
    defaultVariants: { tone: 'accent' },
  },
)

export type EyebrowProps = React.ComponentProps<'span'> & VariantProps<typeof eyebrowVariants>

export const Eyebrow: React.FC<EyebrowProps> = ({ className, tone, ...props }) => (
  <span className={cn(eyebrowVariants({ tone }), className)} {...props} />
)
