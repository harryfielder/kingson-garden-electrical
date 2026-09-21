import { Check } from 'lucide-react'
import React from 'react'

import type { GatedDownloadBlock as GatedDownloadBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { AspectRatio, Eyebrow, Heading, Stack, Surface, Text } from '@/design-system'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'
import { GatedDownloadForm } from './Form'

export const GatedDownloadBlockComponent: React.FC<GatedDownloadBlockProps> = ({
  appearance,
  askName,
  bullets,
  consentText,
  coverImage,
  download,
  eyebrow,
  heading,
  headingLevel,
  intro,
  submitLabel,
  successMessage,
}) => {
  if (!download) return null

  const downloadId = typeof download === 'object' ? download.id : download
  const inverse = isInverse(appearance)

  return (
    <BlockSection appearance={appearance}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Stack gap="lg">
            {eyebrow && <Eyebrow tone={inverse ? 'inverse' : 'accent'}>{eyebrow}</Eyebrow>}

            <Heading
              as={(headingLevel as 'h2') || 'h2'}
              size={headingLevel === 'h3' ? 'h3' : 'h2'}
              tone={inverse ? 'inverse' : 'default'}
            >
              {heading}
            </Heading>

            {intro && (
              <Text size="lead" tone={inverse ? 'inverse' : 'muted'} measure="default">
                {intro}
              </Text>
            )}

            {Array.isArray(bullets) && bullets.length > 0 && (
              <ul className="flex flex-col gap-3">
                {bullets.map((bullet, i) => (
                  <li className="flex items-start gap-3" key={i}>
                    <Check
                      aria-hidden
                      className={cn(
                        'mt-0.5 size-5 shrink-0',
                        inverse ? 'text-apricot-300' : 'text-apricot-600',
                      )}
                    />
                    <Text as="span" tone={inverse ? 'inverse' : 'muted'}>
                      {bullet.text}
                    </Text>
                  </li>
                ))}
              </ul>
            )}

            {coverImage && (
              <AspectRatio className="max-w-xs" radius="md" ratio="3/4">
                <Media
                  resource={coverImage}
                  fill
                  htmlElement={null}
                  size="(max-width: 1024px) 60vw, 320px"
                  imgClassName="absolute inset-0 h-full w-full object-cover"
                />
              </AspectRatio>
            )}
          </Stack>
        </div>

        <div className="lg:col-span-6">
          <Surface elevation="raised" padding="lg" radius="lg">
            <GatedDownloadForm
              askName={askName}
              consentText={consentText}
              downloadId={downloadId}
              submitLabel={submitLabel}
              successMessage={successMessage}
            />
          </Surface>
        </div>
      </div>
    </BlockSection>
  )
}
