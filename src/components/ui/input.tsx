import { cn } from '@/utilities/ui'
import * as React from 'react'

/**
 * Text input, sized and styled from the design tokens so form fields match the
 * buttons and cards around them rather than shadcn's defaults.
 */
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => (
  <input
    data-slot="input"
    className={cn(
      'border-line bg-surface text-ink placeholder:text-ink-subtle',
      'h-12 w-full min-w-0 rounded-md border px-4 text-base',
      'transition-[border-color,box-shadow] duration-(--duration-fast)',
      'hover:border-line-strong',
      'focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive',
      className,
    )}
    type={type}
    {...props}
  />
)

export { Input }
