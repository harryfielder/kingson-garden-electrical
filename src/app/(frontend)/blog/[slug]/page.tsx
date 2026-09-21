import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { docToCard } from '@/blocks/Cards/fetchCards'
import { DocumentCard } from '@/components/DocumentCard'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PageHeader } from '@/components/PageHeader'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { AspectRatio, Container, Grid, Section, SectionHeader, Stack, Text } from '@/design-system'
import type { Post, Team } from '@/payload-types'
import { extractFaqs } from '@/seo/extractFaqs'
import {
  articleSchema,
  breadcrumbsFor,
  breadcrumbSchema,
  buildGraph,
  faqSchema,
  webPageSchema,
} from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath } from '@/utilities/routing'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listSlugs('posts')
}

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

export default async function BlogPostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const post = await queryDocumentBySlug<Post>({ collection: 'posts', slug: decodedSlug })
  const path = getDocumentPath('posts', decodedSlug)

  if (!post) return <PayloadRedirects url={path} />

  const crumbs = breadcrumbsFor('posts', 'Blog', '/blog', post.title, decodedSlug)

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      description: post.meta?.description || post.excerpt,
      image: post.meta?.image || post.heroImage,
      name: post.title,
      path,
    }),
    articleSchema(post),
    breadcrumbSchema(crumbs),
    faqSchema(extractFaqs(post.layout), path),
  ])

  const authors = (post.authors || []).filter((a): a is Team => typeof a === 'object')
  const reviewer = typeof post.reviewedBy === 'object' ? post.reviewedBy : null
  const related = (post.relatedPosts || []).filter((p): p is Post => typeof p === 'object')

  return (
    <article>
      <PayloadRedirects disableNotFound url={path} />
      {draft && <LivePreviewListener />}
      <JsonLd data={graph} />

      <PageHeader breadcrumbs={crumbs} eyebrow="Journal" intro={post.excerpt} title={post.title} />

      <Section spacing="sm">
        <Container size="prose">
          <div className="text-ink-subtle flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}
            {authors.length > 0 && (
              <span>
                By{' '}
                {authors.map((author, i) => (
                  <React.Fragment key={author.id}>
                    {i > 0 && ', '}
                    <Link
                      className="hover:text-brand underline underline-offset-4"
                      href={getDocumentPath('team', author.slug)}
                      rel="author"
                    >
                      {author.name}
                    </Link>
                  </React.Fragment>
                ))}
              </span>
            )}
            {reviewer && (
              <span>
                Reviewed by{' '}
                <Link
                  className="hover:text-brand underline underline-offset-4"
                  href={getDocumentPath('team', reviewer.slug)}
                >
                  {reviewer.name}
                </Link>
                {reviewer.role ? `, ${reviewer.role}` : ''}
              </span>
            )}
          </div>
        </Container>
      </Section>

      {post.heroImage && (
        <Section spacing="sm">
          <Container size="wide">
            <AspectRatio radius="lg" ratio="21/9">
              <Media
                resource={post.heroImage}
                fill
                priority
                htmlElement={null}
                size="100vw"
                imgClassName="absolute inset-0 h-full w-full object-cover"
              />
            </AspectRatio>
          </Container>
        </Section>
      )}

      <Section spacing="md">
        <Container size="prose">
          <RichText data={post.content} enableGutter={false} size="lg" />
        </Container>
      </Section>

      <RenderBlocks blocks={post.layout} />

      {related.length > 0 && (
        <Section spacing="md" tone="subtle">
          <Container>
            <Stack gap="lg">
              <SectionHeader title="Related reading" />
              <Grid cols={3} gap="md">
                {related.map((item) => (
                  <DocumentCard key={item.id} {...docToCard('posts', item)} />
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const doc = await queryDocumentBySlug<Post>({ collection: 'posts', depth: 1, slug: decodedSlug })

  return generateMeta({ doc, path: getDocumentPath('posts', decodedSlug) })
}
