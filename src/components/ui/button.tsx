'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/**
 * The single button definition for the whole site — CMS-driven links, forms
 * and bespoke components all resolve here, so a change to the brand's call to
 * action only has to be made once.
 *
 * Kept at `components/ui/button` (rather than moved into design-system/) so
 * the imports that ship with the Payload website template keep resolving; the
 * design-system barrel re-exports it.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium tracking-tight',
    'transition-[background-color,color,border-color,box-shadow,transform]',
    'duration-(--duration-fast) ease-(--ease-out-quint)',
    'disabled:pointer-events-none disabled:opacity-45',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        /** Primary action. Deep green, the workhorse. */
        default: 'rounded-md bg-brand text-brand-foreground shadow-subtle hover:bg-brand-hover active:translate-y-px',
        /** Highest-emphasis action. Brass — used once per view at most. */
        accent:
          'rounded-md bg-apricot-500 text-olive-950 shadow-subtle hover:bg-apricot-400 active:translate-y-px',
        outline:
          'rounded-md border border-line-strong bg-transparent text-ink hover:border-brand hover:bg-brand-soft hover:text-brand',
        /** For use on brand/ink sections where the background is dark. */
        inverse:
          'rounded-md bg-sand-50 text-olive-950 shadow-subtle hover:bg-white active:translate-y-px',
        inverseOutline:
          'rounded-md border border-white/30 bg-transparent text-sand-50 hover:border-apricot-300 hover:bg-white/10 hover:text-apricot-200',
        secondary: 'rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'rounded-md text-ink hover:bg-canvas-subtle hover:text-brand',
        destructive:
          'rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90',
        /** Text-only. Underline is offset so it never clips descenders. */
        link: 'text-brand underline decoration-apricot-400 underline-offset-4 hover:decoration-apricot-600',
      },
      size: {
        clear: '',
        sm: 'h-9 px-3.5 text-sm',
        default: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
