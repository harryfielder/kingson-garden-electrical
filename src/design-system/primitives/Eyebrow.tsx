import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Small mono kicker above a heading. The monospace face reads as technical
 * precision, which is the half of the brand the serif does not carry.
 */
export const eyebrowVariants = cva(
  'font-mono text-eyebrow font-medium uppercase inline-flex items-center gap-2',
  {
    variants: {
      tone: {
        accent: 'text-brass-700',
        brand: 'text-brand',
        muted: 'text-ink-subtle',
        inverse: 'text-brass-300',
      },
      /** Adds a short rule before the label — used to anchor section openers. */
      rule: {
        true: 'before:h-px before:w-8 before:bg-current before:opacity-50 before:content-[""]',
        false: '',
      },
    },
    defaultVariants: { tone: 'accent', rule: false },
  },
)

export type EyebrowProps = React.ComponentProps<'span'> & VariantProps<typeof eyebrowVariants>

export const Eyebrow: React.FC<EyebrowProps> = ({ className, tone, rule, ...props }) => (
  <span className={cn(eyebrowVariants({ tone, rule }), className)} {...props} />
)
