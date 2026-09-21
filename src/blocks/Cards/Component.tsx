import React from 'react'

import type { CardsBlock as CardsBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { DocumentCard, type CardData } from '@/components/DocumentCard'
import { Grid, Reveal, SectionHeader, Stack } from '@/design-system'
import { getDocumentPath, type RoutableCollection } from '@/utilities/routing'

import { BlockSection, isInverse } from '../shared/BlockSection'
import { fetchCollectionCards, selectionToCards } from './fetchCards'

const columnMap: Record<string, 2 | 3 | 4> = { '2': 2, '3': 3, '4': 4 }

const sizesFor: Record<string, string> = {
  '2': '(max-width: 640px) 100vw, 50vw',
  '3': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  '4': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
}

export const CardsBlockComponent: React.FC<CardsBlockProps> = async ({
  appearance,
  cardStyle,
  categories,
  columns,
  eyebrow,
  heading,
  headingLevel,
  intro,
  limit,
  links,
  manualCards,
  relationTo,
  selectedDocs,
  source,
}) => {
  let cards: CardData[] = []

  if (source === 'collection' && relationTo) {
    cards = await fetchCollectionCards({
      collection: relationTo as RoutableCollection,
      limit,
      categories,
    })
  } else if (source === 'selection') {
    cards = selectionToCards(selectedDocs)
  } else if (source === 'manual') {
    cards = (manualCards || []).map((card) => ({
      title: card.title,
      description: card.description,
      eyebrow: card.eyebrow,
      image: card.image,
      href: card.enableLink
        ? card.link?.type === 'reference' && typeof card.link.reference?.value === 'object'
          ? getDocumentPath(
              card.link.reference.relationTo,
              (card.link.reference.value as { slug?: string }).slug,
            )
          : card.link?.url
        : null,
    }))
  }

  if (!cards.length) return null

  const inverse = isInverse(appearance)
  const cols = columnMap[columns || '3'] || 3

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

        <Grid cols={cols} gap="md">
          {cards.map((card, i) => (
            <Reveal delay={i * 60} key={i} className="flex">
              <DocumentCard
                {...card}
                as={headingLevel === 'h3' ? 'h4' : 'h3'}
                className="w-full"
                sizes={sizesFor[columns || '3']}
                style={cardStyle}
              />
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
