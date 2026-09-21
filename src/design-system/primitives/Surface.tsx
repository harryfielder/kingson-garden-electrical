import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/** A raised panel — the base for cards, quote blocks and form shells. */
export const surfaceVariants = cva('relative', {
  variants: {
    tone: {
      surface: 'bg-surface text-ink',
      subtle: 'bg-canvas-subtle text-ink',
      brand: 'bg-olive-900 text-sand-50 [--line:var(--line-inverse)]',
      accent: 'bg-apricot-50 text-olive-950',
      outline: 'bg-transparent text-ink',
      none: '',
    },
    border: { true: 'border border-line', false: '' },
    radius: { none: 'rounded-none', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl' },
    elevation: {
      none: '',
      subtle: 'shadow-subtle',
      raised: 'shadow-raised',
      float: 'shadow-float',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8 lg:p-10',
      xl: 'p-8 lg:p-14',
    },
    interactive: {
      true: 'transition-[transform,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out-expo) hover:-translate-y-0.5 hover:shadow-float focus-within:-translate-y-0.5',
      false: '',
    },
  },
  defaultVariants: {
    tone: 'surface',
    border: true,
    radius: 'md',
    elevation: 'none',
    padding: 'md',
    interactive: false,
  },
})

export type SurfaceProps = React.ComponentProps<'div'> &
  VariantProps<typeof surfaceVariants> & { as?: 'div' | 'article' | 'li' | 'section' | 'figure' }

export const Surface: React.FC<SurfaceProps> = ({
  as = 'div',
  className,
  tone,
  border,
  radius,
  elevation,
  padding,
  interactive,
  ...props
}) => {
  const Tag = as as React.ElementType
  return (
    <Tag
      className={cn(
        surfaceVariants({ tone, border, radius, elevation, padding, interactive }),
        className,
      )}
      {...props}
    />
  )
}
