import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import { Check } from 'lucide-react'

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
  Surface,
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
import { cn } from '@/utilities/ui'
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

      {/* The scope and the price are the two things a buyer scans for, so they
          are lifted out of the prose onto their own panels and the band is set
          in the neutral grey — it reads as a specification, not as more copy.
          The price panel takes the accent tint because it is the one that
          carries the decision. */}
      {(service.deliverables?.length || service.priceFrom) && (
        <Section spacing="sm" tone="neutral">
          <Container>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {service.deliverables?.length ? (
                <Surface
                  // Not every service carries a price; without one the scope
                  // panel takes the full width rather than leaving a gap.
                  className={service.priceFrom ? 'lg:col-span-8' : 'lg:col-span-12'}
                  elevation="subtle"
                  padding="lg"
                  radius="lg"
                  tone="surface"
                >
                  <Stack gap="md">
                    <Heading as="h2" size="h3">
                      What’s included
                    </Heading>
                    <ul
                      className={cn(
                        'grid grid-cols-1 gap-x-8 sm:grid-cols-2',
                        !service.priceFrom && 'lg:grid-cols-3',
                      )}
                    >
                      {service.deliverables.map((deliverable, i) => (
                        <li className="border-line flex items-start gap-3 border-b py-3" key={i}>
                          <Check
                            aria-hidden
                            className="text-accent-ink mt-1 size-4 shrink-0"
                            strokeWidth={2.5}
                          />
                          <Text as="span">{deliverable.item}</Text>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </Surface>
              ) : null}

              {service.priceFrom ? (
                <Surface
                  className={cn(
                    // Stretched to the scope panel's height so the band reads
                    // as two columns rather than a card beside a gap.
                    'border-apricot-200 flex flex-col justify-center',
                    service.deliverables?.length ? 'lg:col-span-4' : 'lg:col-span-6',
                  )}
                  elevation="subtle"
                  padding="lg"
                  radius="lg"
                  tone="accent"
                >
                  <Stack gap="sm">
                    <Heading as="h2" size="h4">
                      Indicative pricing
                    </Heading>
                    <p className="font-display text-h2 text-brand leading-none">
                      From £{service.priceFrom.toLocaleString('en-GB')}
                    </p>
                    {service.priceNote && <Text size="sm">{service.priceNote}</Text>}
                  </Stack>
                </Surface>
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
