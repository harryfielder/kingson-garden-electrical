import clsx from 'clsx'
import React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** The logo uploaded in Site Settings. */
  resource?: MediaType | number | null
  /** Business name, used for the alt text and the wordmark fallback. */
  name?: string | null
}

/**
 * The site logo, driven by Site Settings.
 *
 * Falls back to a typographic wordmark rather than a broken image, so the
 * header is never empty before a logo has been uploaded.
 */
export const Logo = ({ className, loading = 'lazy', priority = 'low', resource, name }: Props) => {
  const businessName = name || 'Kingson Garden Electrical'

  if (resource && typeof resource === 'object') {
    return (
      <Media
        resource={resource}
        alt={businessName}
        htmlElement={null}
        loading={loading}
        priority={priority === 'high'}
        size="200px"
        imgClassName={clsx('h-9 w-auto object-contain', className)}
      />
    )
  }

  return (
    <span
      className={clsx(
        'font-display text-h4 leading-none font-normal tracking-tight whitespace-nowrap',
        className,
      )}
    >
      {businessName}
    </span>
  )
}
