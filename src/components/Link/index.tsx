import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { getDocumentPath, type RoutableCollection } from '@/utilities/routing'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: RoutableCollection | string
    value: { slug?: string | null } | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

/**
 * Renders a link authored in the CMS.
 *
 * Internal references resolve through the central routing map, so moving a
 * collection's URL prefix updates every link on the site at once.
 */
export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value?.slug
      ? getDocumentPath(reference.relationTo, reference.value.slug)
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // Inline links inherit surrounding rich-text styling rather than becoming buttons.
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label}
        {children}
      </Link>
    )
  }

  return (
    <Button asChild size={size ?? undefined} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label}
        {children}
      </Link>
    </Button>
  )
}
