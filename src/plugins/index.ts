import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Plugin } from 'payload'

import { StepBreak } from '@/fields/formFields/stepBreak'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchFields } from '@/search/fieldOverrides'
import { getDocumentPath } from '@/utilities/routing'
import { getServerSideURL } from '@/utilities/getURL'

type SeoDoc = { title?: string | null; name?: string | null; slug?: string | null }

const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => {
  const title = doc?.title || doc?.name
  return title ? `${title} | Kingson Garden Electrical` : 'Kingson Garden Electrical'
}

const generateURL: GenerateURL<SeoDoc> = ({ collectionSlug, doc }) => {
  const url = getServerSideURL()
  if (!doc?.slug) return url

  return `${url}${getDocumentPath(collectionSlug, doc.slug)}`
}

export const plugins: Plugin[] = [
  vercelBlobStorage({
    // Uploads go to Vercel Blob in every environment that has a token. Local
    // disk is not an option on Vercel — the filesystem is ephemeral, so media
    // uploaded through the admin panel would vanish on the next deploy.
    enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    collections: { media: true, downloads: true },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),

  redirectsPlugin({
    collections: ['pages', 'posts', 'services', 'case-studies', 'locations'],
    overrides: {
      // @ts-expect-error — mapped fields don't resolve to the same type
      fields: ({ defaultFields }) =>
        defaultFields.map((field) =>
          'name' in field && field.name === 'from'
            ? {
                ...field,
                admin: {
                  description:
                    'The old path, including the leading slash. Changes take effect on the next request.',
                },
              }
            : field,
        ),
      hooks: { afterChange: [revalidateRedirects] },
    },
  }),

  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),

  // The meta fields are inserted per collection by `seoTab()` rather than by
  // the plugin's `collections` option, so they can sit inside each
  // collection's existing tab layout and carry our extra indexing controls.
  seoPlugin({ generateTitle, generateURL }),

  formBuilderPlugin({
    fields: {
      payment: false,
      // Lets an editor split a long form into steps from inside the form
      // itself, so one definition can render as a wizard or a single page.
      stepBreak: StepBreak,
    },
    formOverrides: {
      admin: { group: 'Submissions' },
      fields: ({ defaultFields }) =>
        defaultFields.map((field) =>
          'name' in field && field.name === 'confirmationMessage'
            ? {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  ],
                }),
              }
            : field,
        ),
    },
    formSubmissionOverrides: { admin: { group: 'Submissions' } },
  }),

  searchPlugin({
    collections: ['posts', 'services', 'case-studies', 'locations'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      admin: { group: 'Configuration' },
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
]
