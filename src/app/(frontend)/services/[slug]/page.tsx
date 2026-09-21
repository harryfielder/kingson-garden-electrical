import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { DocumentCard } from '@/components/DocumentCard'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageHeader } from '@/components/PageHeader'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import {
  AspectRatio,
  Badge,
  Container,
  Grid,
  Heading,
  Section,
  SectionHeader,
  Stack,
  Text,
} from '@/design-system'
import type { Service, Testimonial } from '@/payload-types'
import { docToCard } from '@/blocks/Cards/fetchCards'
import { extractFaqs } from '@/seo/extractFaqs'
import {
  breadcrumbsFor,
  breadcrumbSchema,
  buildGraph,
  faqSchema,
  reviewSchemas,
  serviceSchema,
  webPageSchema,
} from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath } from '@/utilities/routing'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listSlugs('services')
}

export default async function ServicePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const service = await queryDocumentBySlug<Service>({ collection: 'services', slug: decodedSlug })
  const path = getDocumentPath('services', decodedSlug)

  if (!service) return <PayloadRedirects url={path} />

  const [settings, payload] = await Promise.all([
    getSiteSettings(),
    getPayload({ config: configPromise }),
  ])

  const reviews = await payload.find({
    collection: 'testimonials',
    depth: 0,
    limit: 12,
    where: { relatedService: { in: [service.id] }, verified: { equals: true } },
  })

  const crumbs = breadcrumbsFor('services', 'Services', '/services', service.title, decodedSlug)
  const faqs = extractFaqs(service.layout)

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      datePublished: service.publishedAt,
      dateModified: service.updatedAt,
      description: service.meta?.description || service.shortDescription,
      image: service.meta?.image || service.featuredImage,
      name: service.title,
      path,
    }),
    serviceSchema(service, settings),
    breadcrumbSchema(crumbs),
    faqSchema(faqs, path),
    ...reviewSchemas(reviews.docs as Testimonial[]),
  ])

  const related = (service.relatedServices || []).filter(
    (entry): entry is Service => typeof entry === 'object',
  )

  return (
    <article>
      <PayloadRedirects disableNotFound url={path} />
      {draft && <LivePreviewListener />}
      <JsonLd data={graph} />

      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Service"
        intro={service.shortDescription}
        title={service.title}
      />

      {service.featuredImage && (
        <Section spacing="sm">
          <Container size="wide">
            <AspectRatio radius="lg" ratio="21/9">
              <Media
                resource={service.featuredImage}
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

      {(service.deliverables?.length || service.priceFrom) && (
        <Section spacing="sm" tone="canvas">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {service.deliverables?.length ? (
                <div className="lg:col-span-8">
                  <Stack gap="md">
                    <Heading as="h2" size="h3">
                      What’s included
                    </Heading>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.deliverables.map((deliverable, i) => (
                        <li className="border-line flex gap-3 border-b pb-3" key={i}>
                          <Text as="span">{deliverable.item}</Text>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </div>
              ) : null}

              {service.priceFrom ? (
                <div className="lg:col-span-4">
                  <Stack gap="sm">
                    <Heading as="h2" size="h4">
                      Indicative pricing
                    </Heading>
                    <Text size="lead" tone="default" weight="semibold">
                      From £{service.priceFrom.toLocaleString('en-GB')}
                    </Text>
                    {service.priceNote && <Text size="sm">{service.priceNote}</Text>}
                  </Stack>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      )}

      <RenderBlocks blocks={service.layout} />

      {related.length > 0 && (
        <Section spacing="md" tone="subtle">
          <Container>
            <Stack gap="lg">
              <SectionHeader title="Related services" />
              <Grid cols={3} gap="md">
                {related.map((item) => (
                  <DocumentCard key={item.id} {...docToCard('services', item)} />
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>
      )}

      {service.serviceArea?.length ? (
        <Section spacing="sm">
          <Container>
            <Stack gap="md">
              <Heading as="h2" size="h4">
                Where we offer this
              </Heading>
              <div className="flex flex-wrap gap-2">
                {service.serviceArea
                  .filter((area): area is NonNullable<typeof area> => typeof area === 'object')
                  .map((area: any) => (
                    <a href={getDocumentPath('locations', area.slug)} key={area.id}>
                      <Badge tone="outline">{area.name}</Badge>
                    </a>
                  ))}
              </div>
            </Stack>
          </Container>
        </Section>
      ) : null}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryDocumentBySlug<Service>({
    collection: 'services',
    depth: 1,
    slug: decodedSlug,
  })

  return generateMeta({ doc: service, path: getDocumentPath('services', decodedSlug) })
}
