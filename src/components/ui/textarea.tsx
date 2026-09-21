import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => (
  <textarea
    data-slot="textarea"
    className={cn(
      'border-line bg-surface text-ink placeholder:text-ink-subtle',
      'min-h-32 w-full rounded-md border px-4 py-3 text-base',
      'transition-[border-color,box-shadow] duration-(--duration-fast)',
      'hover:border-line-strong',
      'focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive',
      className,
    )}
    {...props}
  />
)

export { Textarea }
