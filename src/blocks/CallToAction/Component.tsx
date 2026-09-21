import { Phone } from 'lucide-react'
import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Eyebrow, Heading, Stack, Text } from '@/design-system'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'

export const CallToActionBlock: React.FC<CTABlockProps> = async ({
  appearance,
  backgroundImage,
  body,
  eyebrow,
  heading,
  layout,
  links,
  phoneCta,
}) => {
  const settings = phoneCta ? await getSiteSettings() : null
  const isBanner = layout === 'banner'
  // A banner sits over an image, so its text is always light regardless of tone.
  const inverse = isBanner || isInverse(appearance)
  const centered = layout === 'centered' || isBanner

  const content = (
    <div className={cn('flex flex-col gap-8', !centered && 'md:flex-row md:items-center md:justify-between')}>
      {/* The eyebrow is inline-flex, so `text-center` alone leaves it hard left.
          Centring the flex items is what actually moves it. */}
      <Stack
        gap="sm"
        align={centered ? 'center' : 'stretch'}
        className={cn(centered && 'mx-auto max-w-3xl text-center')}
      >
        {eyebrow && <Eyebrow tone={inverse ? 'inverse' : 'accent'}>{eyebrow}</Eyebrow>}
        <Heading as="h2" size="h2" tone={inverse ? 'inverse' : 'default'}>
          {heading}
        </Heading>
        {body && (
          <Text size="lead" tone={inverse ? 'inverse' : 'muted'} measure={centered ? 'none' : 'default'}>
            {body}
          </Text>
        )}
      </Stack>

      <Stack
        direction="row"
        gap="sm"
        align="center"
        className={cn('shrink-0', centered && 'justify-center')}
      >
        {(links || []).map(({ link }, i) => (
          <CMSLink key={i} {...link} size="lg" />
        ))}

        {settings?.phone && (
          <a
            className={cn(
              'inline-flex items-center gap-2 text-base font-medium underline-offset-4 hover:underline',
              inverse ? 'text-sand-50' : 'text-brand',
            )}
            href={`tel:${settings.phoneE164 || settings.phone.replace(/\s/g, '')}`}
          >
            <Phone aria-hidden className="size-4" />
            {settings.phone}
          </a>
        )}
      </Stack>
    </div>
  )

  if (isBanner) {
    return (
      <BlockSection appearance={appearance} className="isolate" overflow="hidden">
        {backgroundImage && (
          <>
            <Media
              resource={backgroundImage}
              fill
              htmlElement={null}
              imgClassName="absolute inset-0 -z-20 h-full w-full object-cover"
              size="100vw"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-olive-950/72" />
          </>
        )}
        <div className="relative z-10">{content}</div>
      </BlockSection>
    )
  }

  return <BlockSection appearance={appearance}>{content}</BlockSection>
}
