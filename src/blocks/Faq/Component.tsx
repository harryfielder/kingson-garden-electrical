'use client'

import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Heading, SectionHeader, Stack } from '@/design-system'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'

/**
 * FAQ accordion.
 *
 * Every answer stays in the DOM whether or not it is expanded, hidden with
 * `hidden` rather than conditional rendering. Collapsed answers are still
 * indexable, which is the whole point of publishing FAQs for search — and the
 * matching FAQPage structured data is emitted by the page, not this component.
 */
export const FaqBlockComponent: React.FC<FaqBlockProps> = ({
  appearance,
  eyebrow,
  heading,
  headingLevel,
  intro,
  items,
}) => {
  const [open, setOpen] = useState<number | null>(0)

  if (!items?.length) return null

  const inverse = isInverse(appearance)

  return (
    <BlockSection appearance={appearance} containerSize="narrow">
      <Stack gap="xl">
        <SectionHeader
          as={(headingLevel as 'h2') || 'h2'}
          eyebrow={eyebrow}
          intro={intro}
          size={headingLevel === 'h3' ? 'h3' : 'h2'}
          title={heading}
          tone={inverse ? 'inverse' : 'default'}
        />

        <div className="border-line border-t">
          {items.map((item, i) => {
            const expanded = open === i
            const panelId = `faq-panel-${i}`
            const buttonId = `faq-button-${i}`

            return (
              <div className="border-line border-b" key={i}>
                <Heading as={headingLevel === 'h3' ? 'h4' : 'h3'} size="h5">
                  <button
                    aria-controls={panelId}
                    aria-expanded={expanded}
                    className={cn(
                      'flex w-full items-center justify-between gap-6 py-6 text-left transition-colors',
                      inverse ? 'text-stone-50 hover:text-brass-200' : 'text-ink hover:text-brand',
                    )}
                    id={buttonId}
                    onClick={() => setOpen(expanded ? null : i)}
                    type="button"
                  >
                    <span className="text-h4 font-display font-normal">{item.question}</span>
                    <Plus
                      aria-hidden
                      className={cn(
                        'size-5 shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out-expo)',
                        expanded && 'rotate-45',
                        inverse ? 'text-brass-300' : 'text-brass-600',
                      )}
                    />
                  </button>
                </Heading>

                <div aria-labelledby={buttonId} hidden={!expanded} id={panelId} role="region">
                  <div className="pb-8">
                    <RichText
                      data={item.answer}
                      enableGutter={false}
                      size="sm"
                      tone={inverse ? 'inverse' : 'default'}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Stack>
    </BlockSection>
  )
}
