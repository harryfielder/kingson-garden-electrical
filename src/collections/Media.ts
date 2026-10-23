import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// The public Blob store origin, derived from the token the same way the
// storage plugin does it (`vercel_blob_rw_<storeId>_<secret>`).
const blobStoreId = process.env.BLOB_READ_WRITE_TOKEN?.match(
  /^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i,
)?.[1]?.toLowerCase()
const blobBaseURL =
  process.env.STORAGE_VERCEL_BLOB_BASE_URL ||
  (blobStoreId ? `https://${blobStoreId}.public.blob.vercel-storage.com` : undefined)

/**
 * The image shown in the admin's media grid and upload pickers.
 *
 * Payload builds this from the raw database row, which stores the proxied
 * `/api/media/file/…` path. With `disablePayloadAccessControl` on, that route
 * no longer serves Blob files — it looks on local disk and 500s — so every
 * thumbnail in the admin was a broken image. Point it at the Blob CDN instead,
 * matching the `url` and `sizes.*.url` the storage plugin returns.
 *
 * Images narrower than 300px get no thumbnail size, so fall back to the original.
 */
const adminThumbnail = ({ doc }: { doc: Record<string, unknown> }) => {
  const sizes = doc.sizes as { thumbnail?: { filename?: string | null } } | undefined
  const file = sizes?.thumbnail?.filename || (doc.filename as string | undefined)
  if (!file) return null

  const encoded = encodeURIComponent(file)
  return blobBaseURL ? `${blobBaseURL}/${encoded}` : `/api/media/file/${encoded}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail,
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
