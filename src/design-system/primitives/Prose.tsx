import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

/**
 * Long-form rich text from the CMS. Editors cannot add classes, so every
 * element style an editor can produce has to be defined here.
 */
export const proseVariants = cva(
  [
    'prose max-w-none',
    // Headings take the display face; the prose plugin's own sizing is replaced.
    'prose-headings:font-display prose-headings:font-normal prose-headings:text-ink prose-headings:text-balance-pretty',
    'prose-h2:text-h2 prose-h2:mt-14 prose-h2:mb-5',
    'prose-h3:text-h3 prose-h3:mt-10 prose-h3:mb-4',
    'prose-h4:text-h4 prose-h4:mt-8 prose-h4:mb-3 prose-h4:font-medium',
    'prose-p:text-ink-muted prose-p:leading-relaxed',
    'prose-li:text-ink-muted prose-li:marker:text-brass-500',
    'prose-strong:text-ink prose-strong:font-semibold',
    'prose-a:text-brand prose-a:underline prose-a:underline-offset-4 prose-a:decoration-brass-400 hover:prose-a:decoration-brass-600',
    'prose-blockquote:border-l-2 prose-blockquote:border-brass-400 prose-blockquote:font-display prose-blockquote:not-italic prose-blockquote:text-ink prose-blockquote:text-h4',
    'prose-img:rounded-md',
    'prose-hr:border-line',
    'prose-figcaption:text-ink-subtle prose-figcaption:text-sm',
    'prose-code:text-brand prose-code:before:content-none prose-code:after:content-none',
    'prose-table:text-sm prose-th:text-ink prose-td:text-ink-muted',
  ],
  {
    variants: {
      size: { sm: 'prose-sm', base: 'prose-base', lg: 'prose-lg' },
      tone: {
        default: '',
        inverse:
          'prose-headings:text-stone-50 prose-p:text-stone-50/80 prose-li:text-stone-50/80 prose-strong:text-stone-50 prose-a:text-brass-300 prose-blockquote:text-stone-50',
      },
    },
    defaultVariants: { size: 'base', tone: 'default' },
  },
)

export type ProseProps = React.ComponentProps<'div'> & VariantProps<typeof proseVariants>

export const Prose: React.FC<ProseProps> = ({ className, size, tone, ...props }) => (
  <div className={cn(proseVariants({ size, tone }), className)} {...props} />
)
