import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Page } from '@/payload-types'
import { extractFaqs } from '@/seo/extractFaqs'
import { breadcrumbSchema, buildGraph, faqSchema, webPageSchema } from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug?: string }> }

export async function generateStaticParams() {
  const slugs = await listSlugs('pages')
  return slugs.filter(({ slug }) => slug !== 'home')
}

export default async function PageRoute({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryDocumentBySlug<Page>({ collection: 'pages', slug: decodedSlug })

  if (!page) return <PayloadRedirects url={`/${decodedSlug}`} />

  const path = decodedSlug === 'home' ? '/' : `/${decodedSlug}`
  const faqs = extractFaqs(page.layout)

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      description: page.meta?.description,
      image: page.meta?.image,
      name: page.title,
      path,
    }),
    // The home page is the site root; a two-item trail there adds nothing.
    path === '/'
      ? null
      : breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: page.title, path },
        ]),
    faqSchema(faqs, path),
  ])

  return (
    <article>
      <PayloadRedirects disableNotFound url={path} />
      {draft && <LivePreviewListener />}
      <JsonLd data={graph} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryDocumentBySlug<Page>({ collection: 'pages', depth: 1, slug: decodedSlug })

  return generateMeta({ doc: page, path: decodedSlug === 'home' ? '/' : `/${decodedSlug}` })
}
