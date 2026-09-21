import React from 'react'

import type { TestimonialCarouselBlock as TestimonialCarouselBlockProps } from '@/payload-types'

import { Grid, SectionHeader, Stack, Text } from '@/design-system'

import { BlockSection, isInverse } from '../shared/BlockSection'
import { TestimonialCard, TestimonialCarousel, Stars } from './Carousel'
import { fetchTestimonials } from './fetchTestimonials'

export const TestimonialCarouselBlockComponent: React.FC<
  TestimonialCarouselBlockProps
> = async ({
  appearance,
  eyebrow,
  heading,
  headingLevel,
  intro,
  layout,
  limit,
  service,
  showRatingSummary,
  source,
  testimonials: selected,
}) => {
  const testimonials = await fetchTestimonials({ limit, selected, service, source })

  if (!testimonials.length) return null

  const inverse = isInverse(appearance)

  const rated = testimonials.filter((testimonial) => testimonial.rating)
  const average = rated.length
    ? rated.reduce((total, testimonial) => total + (testimonial.rating || 0), 0) / rated.length
    : 0

  return (
    <BlockSection appearance={appearance} containerSize={layout === 'single' ? 'narrow' : 'default'}>
      <Stack gap="xl">
        <SectionHeader
          actions={
            showRatingSummary && average ? (
              <div className="flex items-center gap-3">
                <Stars rating={Math.round(average)} />
                <Text as="span" size="sm" tone={inverse ? 'inverse' : 'muted'}>
                  {average.toFixed(1)} from {rated.length} review{rated.length === 1 ? '' : 's'}
                </Text>
              </div>
            ) : undefined
          }
          as={(headingLevel as 'h2') || 'h2'}
          eyebrow={eyebrow}
          intro={intro}
          size={headingLevel === 'h3' ? 'h3' : 'h2'}
          title={heading}
          tone={inverse ? 'inverse' : 'default'}
        />

        {layout === 'single' && testimonials[0] && (
          <TestimonialCard inverse={inverse} large testimonial={testimonials[0]} />
        )}

        {layout === 'grid' && (
          <Grid cols={3} gap="md">
            {testimonials.map((testimonial) => (
              <TestimonialCard inverse={inverse} key={testimonial.id} testimonial={testimonial} />
            ))}
          </Grid>
        )}

        {(!layout || layout === 'carousel') && (
          <TestimonialCarousel inverse={inverse} testimonials={testimonials} />
        )}
      </Stack>
    </BlockSection>
  )
}

