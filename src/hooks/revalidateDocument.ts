import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { collectionIndexPath, getDocumentPath, type RoutableCollection } from '@/utilities/routing'

type Doc = { id: number | string; _status?: string | null; slug?: string | null }

/**
 * Builds the afterChange/afterDelete revalidation pair for a routable
 * collection.
 *
 * Every page-like collection needs the same four behaviours — revalidate on
 * publish, revalidate the old path when a slug changes or a document is
 * unpublished, refresh the collection index, and bust the sitemap — so they
 * are defined once here rather than copied per collection.
 */
export const buildRevalidateHooks = <T extends Doc>(collection: RoutableCollection) => {
  const indexPath = collectionIndexPath[collection]

  const revalidateFor = (slug?: string | null) => {
    revalidatePath(getDocumentPath(collection, slug))
    if (indexPath) revalidatePath(indexPath)
    revalidateTag(`${collection}-sitemap`, 'max')
  }

  const afterChange: CollectionAfterChangeHook<T> = ({ doc, previousDoc, req }) => {
    if (req.context.disableRevalidate) return doc

    if (doc._status === 'published') {
      req.payload.logger.info(`Revalidating ${collection}: ${getDocumentPath(collection, doc.slug)}`)
      revalidateFor(doc.slug)
    }

    // A slug change or an unpublish leaves the previous path stale.
    const wasPublished = previousDoc?._status === 'published'
    const pathChanged = previousDoc?.slug && previousDoc.slug !== doc.slug
    if (wasPublished && (pathChanged || doc._status !== 'published')) {
      revalidateFor(previousDoc.slug)
    }

    return doc
  }

  const afterDelete: CollectionAfterDeleteHook<T> = ({ doc, req }) => {
    if (!req.context.disableRevalidate) revalidateFor(doc?.slug)
    return doc
  }

  return { afterChange, afterDelete }
}
