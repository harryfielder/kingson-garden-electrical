import configPromise from '@payload-config'
import { getPayload, type CollectionSlug } from 'payload'
import React from 'react'

import { docToCard } from '@/blocks/Cards/fetchCards'
import { DocumentCard } from '@/components/DocumentCard'
import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { Container, Grid, Reveal, Section, Text } from '@/design-system'
import {
  breadcrumbSchema,
  buildGraph,
  itemListSchema,
  webPageSchema,
  type Breadcrumb,
} from '@/seo/schema'
import { collectionLabel, getDocumentPath, type RoutableCollection } from '@/utilities/routing'

/**
 * Shared listing page for every routable collection.
 *
 * Emits an ItemList alongside the WebPage entity — listing pages that describe
 * their own contents are far more useful to answer engines than a bare grid.
 */
export const CollectionIndex: React.FC<{
  cardStyle?: 'image' | 'overlay' | 'text'
  collection: RoutableCollection
  columns?: 2 | 3 | 4
  emptyMessage?: string
  eyebrow?: string
  intro?: string
  limit?: number
  sort?: string
  title: string
}> = async ({
  cardStyle = 'image',
  collection,
  columns = 3,
  emptyMessage = 'Nothing published here yet.',
  eyebrow,
  intro,
  limit = 48,
  sort,
  title,
}) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: collection as CollectionSlug,
    depth: 1,
    limit,
    sort: sort || '-createdAt',
    ...(collection === 'team' || collection === 'downloads'
      ? {}
      : { where: { _status: { equals: 'published' } } }),
  })

  const path = getDocumentPath(collection, '') === '/' ? `/${collection}` : ''
  const indexPath = `/${collection === 'posts' ? 'blog' : collection === 'locations' ? 'areas-we-cover' : collection}`

  const cards = result.docs.map((doc) => docToCard(collection, doc as Record<string, any>))
  const crumbs: Breadcrumb[] = [
    { name: 'Home', path: '/' },
    { name: collectionLabel[collection], path: indexPath },
  ]

  const graph = buildGraph([
    webPageSchema({ breadcrumbPath: indexPath, description: intro, name: title, path: indexPath }),
    breadcrumbSchema(crumbs),
    itemListSchema(
      cards.map((card) => ({ name: card.title, path: card.href || indexPath })),
      indexPath,
      title,
    ),
  ])

  return (
    <>
      <JsonLd data={graph} />
      <PageHeader breadcrumbs={crumbs} eyebrow={eyebrow} intro={intro} title={title} />

      <Section spacing="md">
        <Container>
          {cards.length ? (
            <Grid cols={columns} gap="md">
              {cards.map((card, i) => (
                <Reveal className="flex" delay={i * 50} key={card.href || i}>
                  <DocumentCard {...card} className="w-full" style={cardStyle} />
                </Reveal>
              ))}
            </Grid>
          ) : (
            <Text>{emptyMessage}</Text>
          )}
        </Container>
      </Section>
    </>
  )
}
