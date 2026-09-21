import configPromise from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload, type CollectionSlug } from 'payload'

import {
  collectionIndexPath,
  getDocumentPath,
  type RoutableCollection,
} from '@/utilities/routing'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * XML sitemap, generated from the CMS at request time.
 *
 * Pages an editor has marked `noindex` are excluded — listing a page in the
 * sitemap while telling crawlers not to index it sends contradictory signals
 * and wastes crawl budget.
 */

type SitemapCollection = {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  collection: RoutableCollection
  defaultPriority: number
  drafts: boolean
}

const collections: SitemapCollection[] = [
  { collection: 'pages', defaultPriority: 0.8, changeFrequency: 'monthly', drafts: true },
  { collection: 'services', defaultPriority: 0.9, changeFrequency: 'monthly', drafts: true },
  { collection: 'locations', defaultPriority: 0.8, changeFrequency: 'monthly', drafts: true },
  { collection: 'case-studies', defaultPriority: 0.7, changeFrequency: 'monthly', drafts: true },
  { collection: 'posts', defaultPriority: 0.6, changeFrequency: 'weekly', drafts: true },
  { collection: 'team', defaultPriority: 0.4, changeFrequency: 'yearly', drafts: false },
  { collection: 'downloads', defaultPriority: 0.4, changeFrequency: 'yearly', drafts: false },
]

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const base = getServerSideURL()

  const documents: MetadataRoute.Sitemap = []

  /**
   * An index route has no document of its own, so it inherits the freshest
   * `updatedAt` of the collection it lists — without that a crawler gets no
   * recency signal at all on the hub pages it hits most often.
   */
  const newestPerCollection = new Map<RoutableCollection, Date>()
  let homeLastModified: Date | undefined

  for (const config of collections) {
    const result = await payload.find({
      collection: config.collection as CollectionSlug,
      depth: 0,
      limit: 2000,
      pagination: false,
      select: { slug: true, updatedAt: true, meta: true } as never,
      ...(config.drafts ? { where: { _status: { equals: 'published' } } } : {}),
    })

    result.docs.forEach((doc) => {
      const typed = doc as { meta?: { noindex?: boolean; priority?: string }; slug?: string; updatedAt?: string }
      if (!typed.slug || typed.meta?.noindex) return

      const lastModified = typed.updatedAt ? new Date(typed.updatedAt) : undefined

      if (lastModified) {
        const newest = newestPerCollection.get(config.collection)
        if (!newest || lastModified > newest) {
          newestPerCollection.set(config.collection, lastModified)
        }
      }

      // The home page is already listed at the root, and dates it.
      if (config.collection === 'pages' && typed.slug === 'home') {
        homeLastModified = lastModified
        return
      }

      documents.push({
        url: `${base}${getDocumentPath(config.collection, typed.slug)}`,
        lastModified,
        changeFrequency: config.changeFrequency,
        priority: typed.meta?.priority ? Number(typed.meta.priority) : config.defaultPriority,
      })
    })
  }

  return [
    { url: `${base}/`, lastModified: homeLastModified, changeFrequency: 'weekly', priority: 1 },
    ...Object.entries(collectionIndexPath).flatMap(([collection, path]) =>
      path
        ? [
            {
              url: `${base}${path}`,
              lastModified: newestPerCollection.get(collection as RoutableCollection),
              changeFrequency: 'weekly' as const,
              priority: 0.7,
            },
          ]
        : [],
    ),
    ...documents,
  ]
}
