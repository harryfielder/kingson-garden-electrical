import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { CardData } from '@/components/DocumentCard'
import { getDocumentPath, type RoutableCollection } from '@/utilities/routing'

type AnyDoc = Record<string, any>

/**
 * Normalises a document from any collection into the shape a card needs.
 *
 * Collections disagree about which field is the title (`title` vs `name`) and
 * which is the summary, so the mapping lives here rather than being repeated
 * in every component that renders a card.
 */
export const docToCard = (collection: RoutableCollection, doc: AnyDoc): CardData => ({
  title: doc.title || doc.name || 'Untitled',
  description:
    doc.shortDescription || doc.summary || doc.excerpt || doc.intro || doc.description || null,
  image: doc.featuredImage || doc.heroImage || doc.photo || doc.thumbnail || doc.meta?.image || null,
  href: getDocumentPath(collection, doc.slug),
  eyebrow:
    collection === 'team'
      ? doc.role
      : collection === 'case-studies'
        ? doc.clientLocation
        : collection === 'locations'
          ? doc.county
          : null,
})

const sortFor: Partial<Record<RoutableCollection, string>> = {
  services: 'order',
  team: 'order',
  posts: '-publishedAt',
  'case-studies': '-completedAt',
  locations: 'name',
  downloads: 'title',
}

export const fetchCollectionCards = async ({
  categories,
  collection,
  limit = 6,
}: {
  categories?: (number | { id: number })[] | null
  collection: RoutableCollection
  limit?: number | null
}): Promise<CardData[]> => {
  const payload = await getPayload({ config: configPromise })

  const categoryIds = (categories || [])
    .map((category) => (typeof category === 'object' ? category.id : category))
    .filter(Boolean)

  const result = await payload.find({
    collection,
    depth: 1,
    limit: limit || 6,
    sort: sortFor[collection] || '-createdAt',
    // Unpublished documents must never leak into a public listing.
    ...(collection === 'team' ? {} : { where: { _status: { equals: 'published' } } }),
    ...(categoryIds.length ? { where: { categories: { in: categoryIds } } } : {}),
  })

  return result.docs.map((doc) => docToCard(collection, doc as AnyDoc))
}

/** Maps a polymorphic relationship selection into cards, preserving order. */
export const selectionToCards = (
  selection?: ({ relationTo: string; value: AnyDoc | number } | null)[] | null,
): CardData[] =>
  (selection || [])
    .filter((entry): entry is { relationTo: string; value: AnyDoc } =>
      Boolean(entry && typeof entry.value === 'object'),
    )
    .map((entry) => docToCard(entry.relationTo as RoutableCollection, entry.value))
