import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Vertical rhythm + surface treatment for a page band.
 *
 * Blocks never set their own top/bottom padding or background; they wrap
 * themselves in a Section instead. That keeps the spacing scale enforceable
 * from one place and lets editors switch a block's tone without new CSS.
 */
export const sectionVariants = cva('relative w-full', {
  variants: {
    tone: {
      canvas: 'bg-canvas text-ink',
      subtle: 'bg-canvas-subtle text-ink',
      surface: 'bg-surface text-ink',
      /** A soft wash from sand into apricot — the default for quieter bands. */
      wash: 'bg-gradient-wash text-ink',
      brand: 'bg-gradient-brand text-sand-50 [--line:var(--line-inverse)]',
      ink: 'bg-gradient-ink text-sand-50 [--line:var(--line-inverse)]',
      accent: 'bg-gradient-accent text-olive-950',
      none: '',
    },
    spacing: {
      none: '',
      sm: 'py-section-sm',
      md: 'py-section',
      lg: 'py-section-lg',
      /** Trims the top so two same-tone sections read as one band. */
      flush: 'pb-section',
    },
    overflow: {
      hidden: 'overflow-hidden',
      visible: '',
    },
  },
  defaultVariants: { tone: 'canvas', spacing: 'md', overflow: 'visible' },
})

export type SectionProps = React.ComponentProps<'section'> &
  VariantProps<typeof sectionVariants> & {
    as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer'
  }

export const Section: React.FC<SectionProps> = ({
  as = 'section',
  className,
  tone,
  spacing,
  overflow,
  ...props
}) => {
  const Tag = as as React.ElementType
  return <Tag className={cn(sectionVariants({ tone, spacing, overflow }), className)} {...props} />
}
