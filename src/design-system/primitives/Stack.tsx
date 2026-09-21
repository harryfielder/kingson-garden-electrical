import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

export const stackVariants = cva('flex', {
  variants: {
    direction: { col: 'flex-col', row: 'flex-row flex-wrap' },
    gap: {
      none: 'gap-0',
      xs: 'gap-1.5',
      sm: 'gap-3',
      md: 'gap-5',
      lg: 'gap-8',
      xl: 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: { direction: 'col', gap: 'md', align: 'stretch', justify: 'start' },
})

export type StackProps = React.ComponentProps<'div'> & VariantProps<typeof stackVariants>

export const Stack: React.FC<StackProps> = ({
  className,
  direction,
  gap,
  align,
  justify,
  ...props
}) => (
  <div className={cn(stackVariants({ direction, gap, align, justify }), className)} {...props} />
)
