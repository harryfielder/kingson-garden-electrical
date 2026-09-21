import type { Metadata } from 'next'

import type { Media, SiteSetting } from '@/payload-types'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { getServerSideURL } from './getURL'

type MetaDoc = {
  meta?: {
    canonicalUrl?: string | null
    description?: string | null
    image?: Media | number | null
    noindex?: boolean | null
    title?: string | null
  } | null
  publishedAt?: string | null
  title?: string | null
  name?: string | null
  updatedAt?: string | null
}

const imageUrl = (image: Media | number | null | undefined, settings: SiteSetting): string => {
  const resolve = (candidate?: Media | number | null): string | undefined => {
    if (!candidate || typeof candidate !== 'object') return undefined
    const url = candidate.sizes?.og?.url || candidate.url
    if (!url) return undefined
    return url.startsWith('http') ? url : `${getServerSideURL()}${url}`
  }

  return (
    resolve(image) ||
    resolve(settings.defaultMetaImage as Media | null) ||
    `${getServerSideURL()}/website-template-OG.webp`
  )
}

/**
 * Builds a page's Metadata from its SEO fields, falling back to Site Settings.
 *
 * A self-referencing canonical is always emitted. Without one, query strings
 * and trailing-slash variants of the same page get indexed separately and
 * split their own ranking signals.
 */
export const generateMeta = async ({
  doc,
  path,
}: {
  doc: MetaDoc | null
  path: string
}): Promise<Metadata> => {
  const settings = await getSiteSettings()

  const rawTitle = doc?.meta?.title || doc?.title || doc?.name || settings.businessName
  const template = settings.titleTemplate || '%s'
  const title = doc?.meta?.title?.includes('|')
    ? doc.meta.title
    : template.replace('%s', rawTitle || '')

  const description = doc?.meta?.description || settings.description || undefined
  const canonical = doc?.meta?.canonicalUrl || `${getServerSideURL()}${path}`
  const ogImage = imageUrl(doc?.meta?.image, settings)
  const noindex = Boolean(doc?.meta?.noindex)

  return {
    // `absolute` stops Next applying the root layout's title template on top of
    // a title that already carries the business name.
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: settings.businessName,
      title,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
