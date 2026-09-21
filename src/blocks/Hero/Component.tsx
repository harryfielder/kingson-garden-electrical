import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { Badge, Container, Eyebrow, Heading, Stack, Text } from '@/design-system'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

const heightClasses: Record<string, string> = {
  full: 'min-h-[100svh] pt-32 pb-20',
  half: 'min-h-[62svh] pt-32 pb-16 lg:min-h-[70svh]',
  compact: 'pt-32 pb-14 lg:pt-40 lg:pb-20',
}

const overlayClasses: Record<string, string> = {
  gradient: 'bg-gradient-to-t from-olive-950/90 via-olive-950/45 to-olive-950/20',
  scrim: 'bg-olive-950/55',
  strong: 'bg-olive-950/72',
  none: '',
}

const textureClasses: Record<string, string> = {
  forest: 'bg-gradient-brand',
  ink: 'bg-gradient-ink',
  stone: 'bg-gradient-wash',
}

/**
 * The page opener.
 *
 * The heading is always an h1 — a hero is only ever the first block, and a
 * page should have exactly one. The background image is marked `priority`
 * because it is nearly always the LCP element.
 */
export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  align,
  background,
  eyebrow,
  heading,
  height,
  image,
  links,
  overlay,
  subheading,
  texture,
  trustSignals,
  video,
  videoPoster,
}) => {
  const hasMedia = background === 'image' || background === 'video'
  const onDark = hasMedia || texture !== 'stone'
  const centered = align === 'center'

  return (
    <section
      className={cn(
        // Pulls up under the fixed header, which `main` offsets for.
        '-mt-20 relative isolate flex w-full flex-col justify-end overflow-hidden',
        heightClasses[height || 'half'],
        !hasMedia && textureClasses[texture || 'forest'],
        onDark ? 'tone-inverse text-sand-50' : 'text-olive-950',
      )}
      // Read by the header, in CSS, to decide whether it may float
      // transparently over this block. See `.header-float` in globals.css.
      data-hero-tone={onDark ? 'dark' : 'light'}
    >
      {background === 'image' && image && (
        <Media
          resource={image}
          fill
          priority
          htmlElement={null}
          imgClassName="absolute inset-0 -z-20 h-full w-full object-cover"
          size="100vw"
        />
      )}

      {background === 'video' && video && (
        <Media
          resource={video}
          htmlElement={null}
          videoClassName="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}

      {background === 'video' && !video && videoPoster && (
        <Media
          resource={videoPoster}
          fill
          priority
          htmlElement={null}
          imgClassName="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}

      {hasMedia && (
        <div
          aria-hidden
          className={cn('absolute inset-0 -z-10', overlayClasses[overlay || 'gradient'])}
        />
      )}

      {/* A soft pool of warm light behind the headline. Purely decorative. */}
      <div aria-hidden className="bg-gradient-glow pointer-events-none absolute inset-x-0 top-0 -z-[5] h-2/3" />

      <Container className="relative z-10">
        <div className={cn('max-w-4xl', centered && 'mx-auto max-w-5xl text-center')}>
          <Stack gap="lg" align={centered ? 'center' : 'start'}>
            {eyebrow && (
              <Eyebrow tone={onDark ? 'inverse' : 'accent'}>
                {eyebrow}
              </Eyebrow>
            )}

            <Heading
              as="h1"
              size={height === 'full' ? 'display2' : 'h1'}
              tone={onDark ? 'inverse' : 'default'}
            >
              {heading}
            </Heading>

            {subheading && (
              <Text
                size="lead"
                tone={onDark ? 'inverse' : 'muted'}
                measure={centered ? 'none' : 'default'}
              >
                {subheading}
              </Text>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <Stack direction="row" gap="sm" align="center">
                {links.map(({ link }, i) => (
                  <CMSLink key={i} {...link} size="lg" />
                ))}
              </Stack>
            )}

            {Array.isArray(trustSignals) && trustSignals.length > 0 && (
              <Stack direction="row" gap="sm" align="center" className="pt-2">
                {trustSignals.map((signal, i) => (
                  <Badge key={i} tone={onDark ? 'inverse' : 'neutral'}>
                    {signal.label}
                  </Badge>
                ))}
              </Stack>
            )}
          </Stack>
        </div>
      </Container>
    </section>
  )
}
