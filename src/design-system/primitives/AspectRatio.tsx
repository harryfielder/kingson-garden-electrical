import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Reserves layout space before media loads. Every image on the site goes
 * through here or through an explicitly sized parent — an unreserved image is
 * a CLS regression, which Core Web Vitals penalise directly.
 */
export const aspectVariants = cva('relative w-full overflow-hidden', {
  variants: {
    ratio: {
      square: 'aspect-square',
      video: 'aspect-video',
      '4/3': 'aspect-4/3',
      '3/2': 'aspect-3/2',
      '3/4': 'aspect-3/4',
      '2/3': 'aspect-2/3',
      '21/9': 'aspect-21/9',
      golden: 'aspect-[1.618/1]',
      auto: '',
    },
    radius: { none: '', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl' },
  },
  defaultVariants: { ratio: '4/3', radius: 'md' },
})

export type AspectRatioProps = React.ComponentProps<'div'> & VariantProps<typeof aspectVariants>

export const AspectRatio: React.FC<AspectRatioProps> = ({ className, ratio, radius, ...props }) => (
  <div className={cn(aspectVariants({ ratio, radius }), className)} {...props} />
)
