import { cn } from '@/utilities/ui'
import React from 'react'

export const Divider: React.FC<React.ComponentProps<'hr'> & { tone?: 'default' | 'strong' }> = ({
  className,
  tone = 'default',
  ...props
}) => (
  <hr
    className={cn('h-px w-full border-0', tone === 'strong' ? 'bg-line-strong' : 'bg-line', className)}
    {...props}
  />
)
