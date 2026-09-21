'use client'

import { cn } from '@/utilities/ui'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'

const Label: React.FC<React.ComponentProps<typeof LabelPrimitive.Root>> = ({
  className,
  ...props
}) => (
  <LabelPrimitive.Root
    data-slot="label"
    className={cn(
      'text-ink text-sm font-medium leading-none',
      '[&_.required]:text-accent-ink',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
)

export { Label }
