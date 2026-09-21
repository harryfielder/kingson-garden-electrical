import type { PayloadRequest } from 'payload'

import type { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { getDocumentPath, type RoutableCollection } from '@/utilities/routing'

type Props = {
  collection: RoutableCollection
  req?: PayloadRequest
  slug: string | null | undefined
}

/** Builds the signed draft-preview URL the admin panel links to. */
export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) return null

  const path = getDocumentPath(collection, slug)

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}
