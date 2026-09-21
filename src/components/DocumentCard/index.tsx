import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { AspectRatio, Eyebrow, Heading, Surface, Text, type AspectRatioProps } from '@/design-system'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type CardData = {
  description?: string | null
  eyebrow?: string | null
  href?: string | null
  image?: MediaType | number | null
  title: string
}

type DocumentCardProps = CardData & {
  className?: string
  /** Matches the block's `cardStyle` control. */
  style?: 'image' | 'overlay' | 'text' | null
  /** Heading level, so cards nest correctly under the section heading. */
  as?: 'h3' | 'h4'
  /**
   * Crop for the card image. Much of the available photography is portrait,
   * and forcing it into a 4:3 landscape crop throws away most of the frame —
   * so the ratio is a choice rather than a constant.
   */
  ratio?: AspectRatioProps['ratio']
  sizes?: string
}

/**
 * One card, whether it came from a collection or was typed by hand.
 *
 * The whole card is clickable via a stretched overlay on the title link rather
 * than by wrapping everything in an anchor — that keeps a single, meaningful
 * link in the accessibility tree instead of one anchor swallowing the image,
 * heading and description.
 */
export const DocumentCard: React.FC<DocumentCardProps> = ({
  as = 'h3',
  className,
  description,
  eyebrow,
  href,
  image,
  ratio,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  style = 'image',
  title,
}) => {
  const titleNode = href ? (
    <Link className="after:absolute after:inset-0 after:content-['']" href={href}>
      {title}
    </Link>
  ) : (
    title
  )

  if (style === 'overlay') {
    return (
      <Surface
        as="article"
        border={false}
        padding="none"
        radius="lg"
        tone="none"
        interactive={Boolean(href)}
        className={cn('group isolate overflow-hidden', className)}
      >
        <AspectRatio radius="lg" ratio={ratio || '3/4'}>
          {image && (
            <Media
              resource={image}
              fill
              htmlElement={null}
              size={sizes}
              imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out-expo) group-hover:scale-105"
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-olive-950/90 via-olive-950/30 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
            {eyebrow && <Eyebrow tone="inverse">{eyebrow}</Eyebrow>}
            <Heading as={as} size="h4" tone="inverse">
              {titleNode}
            </Heading>
            {description && (
              <Text size="sm" tone="inverse" className="line-clamp-2">
                {description}
              </Text>
            )}
          </div>
        </AspectRatio>
      </Surface>
    )
  }

  return (
    <Surface
      as="article"
      padding="none"
      radius="lg"
      interactive={Boolean(href)}
      className={cn('group flex flex-col overflow-hidden', className)}
    >
      {style === 'image' && image && (
        <AspectRatio radius="none" ratio={ratio || '4/3'}>
          <Media
            resource={image}
            fill
            htmlElement={null}
            size={sizes}
            imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out-expo) group-hover:scale-105"
          />
        </AspectRatio>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading as={as} size="h4">
          {titleNode}
        </Heading>
        {description && (
          <Text size="sm" className="line-clamp-3">
            {description}
          </Text>
        )}
      </div>
    </Surface>
  )
}
