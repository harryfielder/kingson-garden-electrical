import { Check } from 'lucide-react'
import React from 'react'

import type { TextMediaBlock as TextMediaBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { AspectRatio, Eyebrow, Heading, Reveal, Stack, Text } from '@/design-system'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'

const widthClasses: Record<string, { media: string; text: string }> = {
  half: { media: 'lg:col-span-6', text: 'lg:col-span-6' },
  mediaWide: { media: 'lg:col-span-7', text: 'lg:col-span-5' },
  textWide: { media: 'lg:col-span-5', text: 'lg:col-span-7' },
}

export const TextMediaBlockComponent: React.FC<TextMediaBlockProps> = ({
  appearance,
  body,
  bullets,
  eyebrow,
  heading,
  headingLevel,
  links,
  media,
  mediaPosition,
  mediaRatio,
  mediaWidth,
}) => {
  const inverse = isInverse(appearance)
  const widths = widthClasses[mediaWidth || 'half'] || widthClasses.half!

  return (
    <BlockSection appearance={appearance}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal
          className={cn(
            widths.media,
            // Source order stays text-first for screen readers and crawlers;
            // only the visual order flips.
            mediaPosition === 'left' && 'lg:order-first',
          )}
        >
          <AspectRatio ratio={(mediaRatio as 'square') || '4/3'} radius="lg">
            <Media
              resource={media}
              fill
              htmlElement={null}
              imgClassName="absolute inset-0 h-full w-full object-cover"
              size="(max-width: 1024px) 100vw, 50vw"
            />
          </AspectRatio>
        </Reveal>

        <div className={widths.text}>
          <Stack gap="lg">
            {eyebrow && <Eyebrow tone={inverse ? 'inverse' : 'accent'} rule>{eyebrow}</Eyebrow>}

            <Heading
              as={(headingLevel as 'h2') || 'h2'}
              size={headingLevel === 'h3' ? 'h3' : 'h2'}
              tone={inverse ? 'inverse' : 'default'}
            >
              {heading}
            </Heading>

            {body && (
              <RichText
                data={body}
                enableGutter={false}
                tone={inverse ? 'inverse' : 'default'}
              />
            )}

            {Array.isArray(bullets) && bullets.length > 0 && (
              <ul className="flex flex-col gap-3">
                {bullets.map((bullet, i) => (
                  <li className="flex items-start gap-3" key={i}>
                    <Check
                      aria-hidden
                      className={cn(
                        'mt-0.5 size-5 shrink-0',
                        inverse ? 'text-brass-300' : 'text-brass-600',
                      )}
                    />
                    <Text as="span" tone={inverse ? 'inverse' : 'muted'}>
                      {bullet.text}
                    </Text>
                  </li>
                ))}
              </ul>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <Stack direction="row" gap="sm" align="center">
                {links.map(({ link }, i) => (
                  <CMSLink key={i} {...link} />
                ))}
              </Stack>
            )}
          </Stack>
        </div>
      </div>
    </BlockSection>
  )
}
