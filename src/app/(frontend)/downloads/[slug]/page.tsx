import type { Metadata } from 'next'
import React from 'react'

import { GatedDownloadForm } from '@/blocks/GatedDownload/Form'
import { JsonLd } from '@/components/JsonLd'
import { Media } from '@/components/Media'
import { PageHeader } from '@/components/PageHeader'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { AspectRatio, Button, Container, Section, Stack, Surface, Text } from '@/design-system'
import type { Download } from '@/payload-types'
import {
  breadcrumbsFor,
  breadcrumbSchema,
  buildGraph,
  downloadSchema,
  webPageSchema,
} from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath } from '@/utilities/routing'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listSlugs('downloads')
}

export default async function DownloadPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const download = await queryDocumentBySlug<Download>({
    collection: 'downloads',
    slug: decodedSlug,
  })
  const path = getDocumentPath('downloads', decodedSlug)

  if (!download) return <PayloadRedirects url={path} />

  const crumbs = breadcrumbsFor('downloads', 'Downloads', '/downloads', download.title, decodedSlug)

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      dateModified: download.updatedAt,
      description: download.meta?.description || download.description,
      image: download.meta?.image || download.thumbnail,
      name: download.title,
      path,
    }),
    downloadSchema(download),
    breadcrumbSchema(crumbs),
  ])

  return (
    <article>
      <JsonLd data={graph} />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Download"
        intro={download.description}
        title={download.title}
      />

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {download.thumbnail && (
              <div className="lg:col-span-5">
                <AspectRatio radius="lg" ratio="3/4">
                  <Media
                    resource={download.thumbnail}
                    fill
                    htmlElement={null}
                    size="(max-width: 1024px) 100vw, 40vw"
                    imgClassName="absolute inset-0 h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            )}

            <div className="lg:col-span-7">
              <Surface elevation="raised" padding="lg" radius="lg">
                {download.gated ? (
                  <Stack gap="md">
                    <Text weight="medium" tone="default">
                      Enter your email address and we’ll send you straight through to the document.
                    </Text>
                    <GatedDownloadForm askName downloadId={download.id} />
                  </Stack>
                ) : (
                  <Stack gap="md">
                    <Text>This document is free to download, no details required.</Text>
                    {download.url && (
                      <Button asChild size="lg" variant="accent">
                        <a download href={download.url} rel="noopener">
                          Download {download.filename}
                        </a>
                      </Button>
                    )}
                  </Stack>
                )}
              </Surface>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const doc = await queryDocumentBySlug<Download>({
    collection: 'downloads',
    depth: 1,
    slug: decodedSlug,
  })

  return generateMeta({ doc, path: getDocumentPath('downloads', decodedSlug) })
}
