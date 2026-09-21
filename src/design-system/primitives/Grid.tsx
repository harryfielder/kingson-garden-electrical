import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Responsive card grid. Column counts are the *maximum* at the largest
 * breakpoint; the grid steps down predictably below that.
 */
export const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      /** 12-column editorial grid for bespoke block layouts. */
      12: 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-5 lg:gap-6',
      lg: 'gap-8 lg:gap-10',
      xl: 'gap-10 lg:gap-16',
    },
  },
  defaultVariants: { cols: 3, gap: 'md' },
})

export type GridProps = React.ComponentProps<'div'> & VariantProps<typeof gridVariants>

export const Grid: React.FC<GridProps> = ({ className, cols, gap, ...props }) => (
  <div className={cn(gridVariants({ cols, gap }), className)} {...props} />
)
