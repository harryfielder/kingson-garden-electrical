import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Typographic scale, decoupled from heading level.
 *
 * `as` controls the semantic tag (document outline, SEO); `size` controls the
 * visual weight. A page's single h1 can therefore look small, and an h2 can
 * carry display treatment, without compromising the outline.
 */
export const headingVariants = cva('font-display text-balance-pretty', {
  variants: {
    size: {
      display1: 'text-display-1 font-normal',
      display2: 'text-display-2 font-normal',
      h1: 'text-h1 font-normal',
      h2: 'text-h2 font-normal',
      h3: 'text-h3 font-normal',
      h4: 'text-h4 font-medium',
      h5: 'font-sans text-base font-semibold tracking-tight',
    },
    tone: {
      default: 'text-ink',
      muted: 'text-ink-muted',
      brand: 'text-brand',
      inverse: 'text-sand-50',
      inherit: '',
    },
  },
  defaultVariants: { size: 'h2', tone: 'inherit' },
})

export type HeadingProps = React.ComponentProps<'h2'> &
  VariantProps<typeof headingVariants> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  }

export const Heading: React.FC<HeadingProps> = ({
  as = 'h2',
  className,
  size,
  tone,
  ...props
}) => {
  const Tag = as as React.ElementType
  return <Tag className={cn(headingVariants({ size, tone }), className)} {...props} />
}
