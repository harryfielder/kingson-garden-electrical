'use client'

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Media } from '@/components/Media'
import { Heading, Surface, Text } from '@/design-system'
import type { Testimonial } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const Stars: React.FC<{ className?: string; rating?: number | null }> = ({
  className,
  rating,
}) => {
  if (!rating) return null

  return (
    <div aria-label={`${rating} out of 5 stars`} className={cn('flex gap-0.5', className)} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          aria-hidden
          className={cn('size-4', i < rating ? 'fill-apricot-500 text-apricot-500' : 'text-sand-300')}
          key={i}
        />
      ))}
    </div>
  )
}

export const TestimonialCard: React.FC<{
  inverse?: boolean
  large?: boolean
  testimonial: Testimonial
}> = ({ inverse, large, testimonial }) => (
  <Surface
    as="figure"
    padding={large ? 'xl' : 'lg'}
    radius="lg"
    tone={inverse ? 'brand' : 'surface'}
    className="flex h-full flex-col justify-between gap-6"
  >
    <div className="flex flex-col gap-5">
      <Stars rating={testimonial.rating} />
      <blockquote>
        <Heading
          as="p"
          size={large ? 'h3' : 'h4'}
          tone={inverse ? 'inverse' : 'default'}
          className="font-normal"
        >
          {/* Curly quotes are decorative; the text itself carries the meaning. */}
          <span aria-hidden>“</span>
          {testimonial.quote}
          <span aria-hidden>”</span>
        </Heading>
      </blockquote>
    </div>

    <figcaption className="flex items-center gap-3">
      {testimonial.authorPhoto && typeof testimonial.authorPhoto === 'object' && (
        <Media
          resource={testimonial.authorPhoto}
          htmlElement={null}
          size="48px"
          imgClassName="size-12 rounded-full object-cover"
        />
      )}
      <span className="flex flex-col">
        <Text as="span" size="sm" weight="semibold" tone={inverse ? 'inverse' : 'default'}>
          {testimonial.authorName}
        </Text>
        {testimonial.authorLocation && (
          <Text as="span" size="xs" tone={inverse ? 'inverse' : 'subtle'}>
            {testimonial.authorLocation}
          </Text>
        )}
      </span>
    </figcaption>
  </Surface>
)

/**
 * Scroll-snap carousel.
 *
 * Built on native overflow scrolling rather than a carousel library: it is
 * swipeable and keyboard-scrollable for free, degrades to a plain scrolling
 * row without JavaScript, and adds nothing to the bundle.
 */
export const TestimonialCarousel: React.FC<{
  inverse?: boolean
  testimonials: Testimonial[]
}> = ({ inverse, testimonials }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateBounds = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setAtStart(track.scrollLeft <= 8)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8)
  }, [])

  useEffect(() => {
    updateBounds()
    const track = trackRef.current
    if (!track) return

    track.addEventListener('scroll', updateBounds, { passive: true })
    window.addEventListener('resize', updateBounds)
    return () => {
      track.removeEventListener('scroll', updateBounds)
      window.removeEventListener('resize', updateBounds)
    }
  }, [updateBounds])

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className="-mx-gutter flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={trackRef}
      >
        {testimonials.map((testimonial) => (
          <div
            className="w-[86%] shrink-0 snap-start sm:w-[58%] lg:w-[38%]"
            key={testimonial.id}
          >
            <TestimonialCard inverse={inverse} testimonial={testimonial} />
          </div>
        ))}
      </div>

      {testimonials.length > 1 && (
        <div className="flex gap-2">
          {[
            { label: 'Previous testimonials', icon: ChevronLeft, dir: -1 as const, disabled: atStart },
            { label: 'Next testimonials', icon: ChevronRight, dir: 1 as const, disabled: atEnd },
          ].map(({ label, icon: IconComponent, dir, disabled }) => (
            <button
              aria-label={label}
              className={cn(
                'rounded-full border p-3 transition-colors disabled:opacity-35',
                inverse
                  ? 'border-white/25 text-sand-50 hover:bg-white/10'
                  : 'border-line-strong text-ink hover:border-brand hover:text-brand',
              )}
              disabled={disabled}
              key={label}
              onClick={() => scrollBy(dir)}
              type="button"
            >
              <IconComponent aria-hidden className="size-5" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
