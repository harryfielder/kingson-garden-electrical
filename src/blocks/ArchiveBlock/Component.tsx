import React from 'react'

import type { ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import { DocumentCard } from '@/components/DocumentCard'
import { Grid, Reveal, SectionHeader, Stack } from '@/design-system'
import type { RoutableCollection } from '@/utilities/routing'

import { BlockSection, isInverse } from '../shared/BlockSection'
import { fetchCollectionCards } from '../Cards/fetchCards'

/** A longer listing of a collection, for archive-style pages. */
export const ArchiveBlock: React.FC<ArchiveBlockProps> = async ({
  appearance,
  categories,
  eyebrow,
  heading,
  headingLevel,
  intro,
  limit,
  relationTo,
}) => {
  const cards = await fetchCollectionCards({
    collection: (relationTo as RoutableCollection) || 'posts',
    limit,
    categories,
  })

  if (!cards.length) return null

  return (
    <BlockSection appearance={appearance}>
      <Stack gap="xl">
        <SectionHeader
          as={(headingLevel as 'h2') || 'h2'}
          eyebrow={eyebrow}
          intro={intro}
          size={headingLevel === 'h3' ? 'h3' : 'h2'}
          title={heading}
          tone={isInverse(appearance) ? 'inverse' : 'default'}
        />

        <Grid cols={3} gap="md">
          {cards.map((card, i) => (
            <Reveal delay={i * 50} key={i} className="flex">
              <DocumentCard {...card} className="w-full" />
            </Reveal>
          ))}
        </Grid>
      </Stack>
    </BlockSection>
  )
}
