import { cn } from '@/utilities/ui'
import React from 'react'

import { Eyebrow } from './Eyebrow'
import { Heading, type HeadingProps } from './Heading'
import { Text } from './Text'

type SectionHeaderProps = {
  align?: 'left' | 'center'
  as?: HeadingProps['as']
  className?: string
  /** Rendered to the right of the heading on wide screens, e.g. a "view all" link. */
  actions?: React.ReactNode
  eyebrow?: string | null
  intro?: string | null
  size?: HeadingProps['size']
  title?: string | null
  tone?: 'default' | 'inverse'
}

/**
 * The eyebrow / heading / intro triad that opens most blocks. Centralised so
 * every section shares identical vertical rhythm and optical alignment.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  actions,
  align = 'left',
  as = 'h2',
  className,
  eyebrow,
  intro,
  size = 'h2',
  title,
  tone = 'default',
}) => {
  if (!eyebrow && !title && !intro && !actions) return null

  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        actions && 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4',
          // `items-center` is required as well as `text-center`: the eyebrow is
          // an inline-flex element and text alignment does not move it.
          centered && 'mx-auto max-w-3xl items-center text-center',
        )}
      >
        {eyebrow && <Eyebrow tone={tone === 'inverse' ? 'inverse' : 'accent'}>{eyebrow}</Eyebrow>}
        {title && (
          <Heading as={as} size={size} tone={tone === 'inverse' ? 'inverse' : 'default'}>
            {title}
          </Heading>
        )}
        {intro && (
          <Text
            size="lead"
            tone={tone === 'inverse' ? 'inverse' : 'muted'}
            measure={centered ? 'none' : 'default'}
          >
            {intro}
          </Text>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </div>
  )
}
