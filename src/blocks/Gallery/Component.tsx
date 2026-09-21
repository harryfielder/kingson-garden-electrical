'use client'

import React, { useState } from 'react'

import type { GalleryBlock as GalleryBlockProps, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { AspectRatio, SectionHeader, Stack } from '@/design-system'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'
import { Lightbox, type LightboxItem } from './Lightbox'

const masonryColumns: Record<string, string> = {
  '2': 'columns-1 sm:columns-2',
  '3': 'columns-1 sm:columns-2 lg:columns-3',
  '4': 'columns-2 sm:columns-3 lg:columns-4',
}

const gridColumns: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-2 lg:grid-cols-4',
}

export const GalleryBlockComponent: React.FC<GalleryBlockProps> = ({
  appearance,
  columns,
  enableLightbox,
  eyebrow,
  heading,
  headingLevel,
  images,
  intro,
  layout,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!images?.length) return null

  const inverse = isInverse(appearance)
  const cols = columns || '3'

  const items: LightboxItem[] = images
    .filter((entry) => typeof entry.image === 'object' && entry.image)
    .map((entry) => ({ caption: entry.caption, image: entry.image as MediaType }))

  const sizes =
    cols === '4'
      ? '(max-width: 640px) 50vw, 25vw'
      : cols === '2'
        ? '(max-width: 640px) 100vw, 50vw'
        : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  const renderImage = (entry: (typeof images)[number], i: number) => {
    const inner = (
      <Media
        resource={entry.image}
        fill={layout !== 'masonry'}
        htmlElement={null}
        size={sizes}
        imgClassName={cn(
          'transition-transform duration-(--duration-slow) ease-(--ease-out-expo) group-hover:scale-[1.03]',
          layout === 'masonry'
            ? 'h-auto w-full rounded-md'
            : 'absolute inset-0 h-full w-full object-cover',
        )}
      />
    )

    const body =
      layout === 'masonry' ? (
        inner
      ) : (
        <AspectRatio
          ratio={layout === 'editorial' && entry.emphasis ? '3/2' : '4/3'}
          radius="md"
        >
          {inner}
        </AspectRatio>
      )

    if (!enableLightbox) return body

    return (
      <button
        aria-label={`View image ${i + 1}${entry.caption ? `: ${entry.caption}` : ''}`}
        className="group block w-full cursor-zoom-in text-left"
        onClick={() => setOpenIndex(i)}
        type="button"
      >
        {body}
      </button>
    )
  }

  return (
    <BlockSection appearance={appearance} containerSize="wide">
      <Stack gap="xl">
        <SectionHeader
          as={(headingLevel as 'h2') || 'h2'}
          eyebrow={eyebrow}
          intro={intro}
          size={headingLevel === 'h3' ? 'h3' : 'h2'}
          title={heading}
          tone={inverse ? 'inverse' : 'default'}
        />

        {layout === 'masonry' ? (
          <div className={cn(masonryColumns[cols], 'gap-4 [column-fill:_balance]')}>
            {images.map((entry, i) => (
              <figure className="mb-4 break-inside-avoid" key={i}>
                {renderImage(entry, i)}
                {entry.caption && (
                  <figcaption
                    className={cn(
                      'mt-2 text-sm',
                      inverse ? 'text-sand-50/70' : 'text-ink-subtle',
                    )}
                  >
                    {entry.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <div className={cn('grid gap-4', gridColumns[cols])}>
            {images.map((entry, i) => (
              <figure
                className={cn(
                  layout === 'editorial' && entry.emphasis && 'sm:col-span-2 sm:row-span-2',
                )}
                key={i}
              >
                {renderImage(entry, i)}
                {entry.caption && (
                  <figcaption
                    className={cn(
                      'mt-2 text-sm',
                      inverse ? 'text-sand-50/70' : 'text-ink-subtle',
                    )}
                  >
                    {entry.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </Stack>

      {enableLightbox && openIndex !== null && (
        <Lightbox
          index={openIndex}
          items={items}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </BlockSection>
  )
}
