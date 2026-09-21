import { cn } from '@/utilities/ui'
import * as React from 'react'

/**
 * Places a form field on the layout grid.
 *
 * The form-builder expresses field width as a percentage. Previously that was
 * applied as `max-width: 50%` on an element that was already a cell in a
 * two-column grid, so a half-width field occupied a quarter of the row and
 * every input looked cramped. Mapping the percentage onto a column span
 * instead lets fields fill the space they were given.
 */
export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const percent = typeof width === 'string' ? Number(width) : width

  // Anything at or below half sits in one column; everything else spans both.
  const span = !percent || percent > 50 ? 'md:col-span-2' : 'md:col-span-1'

  return <div className={cn('col-span-1 flex flex-col gap-2', span, className)}>{children}</div>
}
