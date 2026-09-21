import React from 'react'

import type { FeatureRowBlock as FeatureRowBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Grid, Heading, Reveal, SectionHeader, Stack, Surface, Text } from '@/design-system'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'
import { Icon } from '../shared/Icon'

const columnMap: Record<string, 2 | 3 | 4> = { '2': 2, '3': 3, '4': 4 }

/** "Reasons to choose us" — icon, numbered or plain value propositions. */
export const FeatureRowBlockComponent: React.FC<FeatureRowBlockProps> = ({
  appearance,
  columns,
  eyebrow,
  features,
  heading,
  headingLevel,
  intro,
  links,
  style,
}) => {
  if (!features?.length) return null

  const inverse = isInverse(appearance)
  const cols = columnMap[columns || '3'] || 3
  const isCard = style === 'card'
  const isNumbered = style === 'numbered'

  return (
    <BlockSection appearance={appearance}>
      <Stack gap="xl">
        <SectionHeader
          as={(headingLevel as 'h2') || 'h2'}
          eyebrow={eyebrow}
          intro={intro}
          size={headingLevel === 'h3' ? 'h3' : 'h2'}
          title={heading}
          tone={inverse ? 'inverse' : 'default'}
        />

        <Grid cols={cols} gap={isCard ? 'md' : 'lg'}>
          {features.map((feature, i) => (
            <Reveal delay={i * 70} key={i}>
              <Surface
                as="div"
                border={isCard}
                padding={isCard ? 'lg' : 'none'}
                radius="lg"
                tone={isCard ? (inverse ? 'brand' : 'surface') : 'none'}
                className="flex h-full flex-col gap-4"
              >
                {isNumbered ? (
                  <span
                    aria-hidden
                    className={cn(
                      'font-display text-h2 leading-none',
                      inverse ? 'text-apricot-300' : 'text-apricot-500',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ) : (
                  <span
                    className={cn(
                      'inline-flex size-11 items-center justify-center rounded-full',
                      inverse ? 'bg-white/10 text-apricot-300' : 'bg-brand-soft text-brand',
                    )}
                  >
                    <Icon className="size-5" name={feature.icon} />
                  </span>
                )}

                <Heading
                  as={headingLevel === 'h3' ? 'h4' : 'h3'}
                  size="h4"
                  tone={inverse ? 'inverse' : 'default'}
                >
                  {feature.title}
                </Heading>

                {feature.description && (
                  <Text size="sm" tone={inverse ? 'inverse' : 'muted'}>
                    {feature.description}
                  </Text>
                )}
              </Surface>
            </Reveal>
          ))}
        </Grid>

        {Array.isArray(links) && links.length > 0 && (
          <Stack direction="row" gap="sm" align="center">
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...link} />
            ))}
          </Stack>
        )}
      </Stack>
    </BlockSection>
  )
}
