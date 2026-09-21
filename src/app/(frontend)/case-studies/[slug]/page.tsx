import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { TestimonialCard } from '@/blocks/TestimonialCarousel/Carousel'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PageHeader } from '@/components/PageHeader'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { AspectRatio, Container, Grid, Heading, Section, Stack, Text } from '@/design-system'
import type { CaseStudy, Testimonial } from '@/payload-types'
import { extractFaqs } from '@/seo/extractFaqs'
import {
  breadcrumbsFor,
  breadcrumbSchema,
  buildGraph,
  caseStudySchema,
  faqSchema,
  webPageSchema,
} from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath } from '@/utilities/routing'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listSlugs('case-studies')
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const caseStudy = await queryDocumentBySlug<CaseStudy>({
    collection: 'case-studies',
    slug: decodedSlug,
  })
  const path = getDocumentPath('case-studies', decodedSlug)

  if (!caseStudy) return <PayloadRedirects url={path} />

  const crumbs = breadcrumbsFor(
    'case-studies',
    'Projects',
    '/case-studies',
    caseStudy.title,
    decodedSlug,
  )

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      datePublished: caseStudy.publishedAt,
      dateModified: caseStudy.updatedAt,
      description: caseStudy.meta?.description || caseStudy.summary,
      image: caseStudy.meta?.image || caseStudy.featuredImage,
      name: caseStudy.title,
      path,
    }),
    caseStudySchema(caseStudy),
    breadcrumbSchema(crumbs),
    faqSchema(extractFaqs(caseStudy.layout), path),
  ])

  const sections = [
    { body: caseStudy.challenge, title: 'The challenge' },
    { body: caseStudy.approach, title: 'Our approach' },
    { body: caseStudy.outcome, title: 'The outcome' },
  ].filter((section) => section.body)

  return (
    <article>
      <PayloadRedirects disableNotFound url={path} />
      {draft && <LivePreviewListener />}
      <JsonLd data={graph} />

      <PageHeader
        breadcrumbs={crumbs}
        eyebrow={caseStudy.clientLocation || 'Project'}
        intro={caseStudy.summary}
        title={caseStudy.title}
      />

      {caseStudy.featuredImage && (
        <Section spacing="sm">
          <Container size="wide">
            <AspectRatio radius="lg" ratio="21/9">
              <Media
                resource={caseStudy.featuredImage}
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

      {caseStudy.stats?.length ? (
        <Section spacing="sm" tone="subtle">
          <Container>
            <Grid cols={4} gap="md">
              {caseStudy.stats.map((stat, i) => (
                <Stack gap="xs" key={i}>
                  <span className="font-display text-h2 text-brand">{stat.value}</span>
                  <Text size="sm">{stat.label}</Text>
                </Stack>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {sections.length > 0 && (
        <Section spacing="md">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {sections.map((section) => (
                <Stack gap="sm" key={section.title}>
                  <Heading as="h2" size="h4">
                    {section.title}
                  </Heading>
                  <Text>{section.body}</Text>
                </Stack>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <RenderBlocks blocks={caseStudy.layout} />

      {caseStudy.testimonial && typeof caseStudy.testimonial === 'object' && (
        <Section spacing="md" tone="subtle">
          <Container size="narrow">
            <TestimonialCard large testimonial={caseStudy.testimonial as Testimonial} />
          </Container>
        </Section>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const doc = await queryDocumentBySlug<CaseStudy>({
    collection: 'case-studies',
    depth: 1,
    slug: decodedSlug,
  })

  return generateMeta({ doc, path: getDocumentPath('case-studies', decodedSlug) })
}
