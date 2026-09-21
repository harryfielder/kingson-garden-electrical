import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Horizontal measure. `prose` is capped at a readable line length; `wide`
 * is for image-led layouts that should breathe closer to the viewport edge.
 */
export const containerVariants = cva('mx-auto w-full px-gutter', {
  variants: {
    size: {
      prose: 'max-w-3xl',
      narrow: 'max-w-4xl',
      default: 'max-w-(--breakpoint-xl)',
      wide: 'max-w-(--breakpoint-2xl)',
      full: 'max-w-none px-0',
    },
  },
  defaultVariants: { size: 'default' },
})

export type ContainerProps = React.ComponentProps<'div'> & VariantProps<typeof containerVariants>

export const Container: React.FC<ContainerProps> = ({ className, size, ...props }) => (
  <div className={cn(containerVariants({ size }), className)} {...props} />
)
