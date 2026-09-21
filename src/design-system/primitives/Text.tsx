import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

export const textVariants = cva('', {
  variants: {
    size: {
      lead: 'text-lead',
      base: 'text-base/relaxed',
      sm: 'text-sm/relaxed',
      xs: 'text-xs/relaxed',
    },
    tone: {
      default: 'text-ink',
      muted: 'text-ink-muted',
      subtle: 'text-ink-subtle',
      brand: 'text-brand',
      inverse: 'text-stone-50/80',
      inherit: '',
    },
    weight: { normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold' },
    /** Caps the measure so long paragraphs stay readable beside imagery. */
    measure: { none: '', default: 'max-w-prose', tight: 'max-w-[46ch]' },
  },
  defaultVariants: { size: 'base', tone: 'muted', weight: 'normal', measure: 'none' },
})

export type TextProps = React.ComponentProps<'p'> &
  VariantProps<typeof textVariants> & { as?: 'p' | 'span' | 'div' | 'li' }

export const Text: React.FC<TextProps> = ({
  as = 'p',
  className,
  size,
  tone,
  weight,
  measure,
  ...props
}) => {
  const Tag = as as React.ElementType
  return <Tag className={cn(textVariants({ size, tone, weight, measure }), className)} {...props} />
}
