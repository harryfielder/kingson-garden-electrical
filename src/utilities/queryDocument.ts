import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type CollectionSlug } from 'payload'
import { cache } from 'react'

/**
 * Fetches one document by slug, honouring draft mode.
 *
 * Wrapped in React's `cache` so a route's `generateMetadata` and its component
 * share a single query per request instead of hitting the database twice for
 * the same document.
 */
export const queryDocumentBySlug = cache(
  async <T = any>({
    collection,
    depth = 2,
    slug,
  }: {
    collection: CollectionSlug
    depth?: number
    slug: string
  }): Promise<T | null> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection,
      depth,
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: { slug: { equals: slug } },
    })

    return (result.docs?.[0] as T) || null
  },
)

/** Lists published slugs for `generateStaticParams`. */
export const listSlugs = async (collection: CollectionSlug): Promise<{ slug: string }[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection,
    depth: 0,
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return result.docs
    .map((doc) => (doc as { slug?: string }).slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }))
}
