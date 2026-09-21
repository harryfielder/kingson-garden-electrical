import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'border-line bg-canvas-subtle text-ink-muted',
        brand: 'border-transparent bg-brand-soft text-brand',
        accent: 'border-transparent bg-accent-soft text-accent-ink',
        outline: 'border-line-strong bg-transparent text-ink',
        inverse: 'border-white/20 bg-white/10 text-sand-50',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

export type BadgeProps = React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>

export const Badge: React.FC<BadgeProps> = ({ className, tone, ...props }) => (
  <span className={cn(badgeVariants({ tone }), className)} {...props} />
)
