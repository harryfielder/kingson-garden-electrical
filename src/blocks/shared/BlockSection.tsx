import React from 'react'

import { Container, Section, type ContainerProps, type SectionProps } from '@/design-system'

type Appearance = { spacing?: string | null; tone?: string | null } | null | undefined

/**
 * Applies a block's editor-chosen appearance to a design-system Section.
 *
 * Every block renders through this, so the mapping from the CMS vocabulary to
 * design tokens exists in exactly one place.
 */
export const BlockSection: React.FC<
  {
    appearance?: Appearance
    children: React.ReactNode
    className?: string
    containerSize?: ContainerProps['size']
    /** Set when the block manages its own container (e.g. full-bleed media). */
    bare?: boolean
    id?: string
  } & Pick<SectionProps, 'overflow'>
> = ({ appearance, bare = false, children, className, containerSize = 'default', id, overflow }) => (
  <Section
    id={id}
    tone={(appearance?.tone as SectionProps['tone']) || 'canvas'}
    spacing={(appearance?.spacing as SectionProps['spacing']) || 'md'}
    overflow={overflow}
    className={className}
  >
    {bare ? children : <Container size={containerSize}>{children}</Container>}
  </Section>
)

export const isInverse = (appearance?: Appearance): boolean =>
  appearance?.tone === 'brand' || appearance?.tone === 'ink'
