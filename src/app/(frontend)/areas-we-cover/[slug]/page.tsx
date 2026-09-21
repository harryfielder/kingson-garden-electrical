import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { docToCard } from '@/blocks/Cards/fetchCards'
import { DocumentCard } from '@/components/DocumentCard'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageHeader } from '@/components/PageHeader'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Badge, Container, Grid, Heading, Section, SectionHeader, Stack, Text } from '@/design-system'
import type { Location, Service, Testimonial } from '@/payload-types'
import { extractFaqs } from '@/seo/extractFaqs'
import {
  breadcrumbsFor,
  breadcrumbSchema,
  buildGraph,
  faqSchema,
  locationSchema,
  reviewSchemas,
  webPageSchema,
} from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath } from '@/utilities/routing'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listSlugs('locations')
}

export default async function LocationPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const location = await queryDocumentBySlug<Location>({
    collection: 'locations',
    slug: decodedSlug,
  })
  const path = getDocumentPath('locations', decodedSlug)

  if (!location) return <PayloadRedirects url={path} />

  const [settings, payload] = await Promise.all([
    getSiteSettings(),
    getPayload({ config: configPromise }),
  ])

  // An empty `servicesOffered` means "everything we do is available here".
  const services = location.servicesOffered?.length
    ? (location.servicesOffered.filter((s): s is Service => typeof s === 'object') as Service[])
    : ((
        await payload.find({
          collection: 'services',
          depth: 1,
          limit: 12,
          sort: 'order',
          where: { _status: { equals: 'published' } },
        })
      ).docs as Service[])

  const reviews = await payload.find({
    collection: 'testimonials',
    depth: 0,
    limit: 12,
    where: { relatedLocation: { equals: location.id }, verified: { equals: true } },
  })

  const crumbs = breadcrumbsFor(
    'locations',
    'Areas we cover',
    '/areas-we-cover',
    location.name,
    decodedSlug,
  )

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      datePublished: location.publishedAt,
      dateModified: location.updatedAt,
      description: location.meta?.description || location.intro,
      image: location.meta?.image || location.featuredImage,
      name: location.name,
      path,
    }),
    locationSchema({ ...location, servicesOffered: services }, settings),
    breadcrumbSchema(crumbs),
    faqSchema(extractFaqs(location.layout), path),
    ...reviewSchemas(reviews.docs as Testimonial[]),
  ])

  const nearby = (location.nearbyAreas || []).filter(
    (area): area is Location => typeof area === 'object',
  )

  return (
    <article>
      <PayloadRedirects disableNotFound url={path} />
      {draft && <LivePreviewListener />}
      <JsonLd data={graph} />

      <PageHeader
        breadcrumbs={crumbs}
        eyebrow={location.county || 'Areas we cover'}
        intro={location.intro}
        title={`Garden lighting in ${location.name}`}
      />

      {location.postcodes?.length ? (
        <Section spacing="sm">
          <Container>
            <Stack gap="sm">
              <Heading as="h2" size="h5">
                Postcode districts covered
              </Heading>
              <div className="flex flex-wrap gap-2">
                {location.postcodes.map((postcode, i) => (
                  <Badge key={i} tone="neutral">
                    {postcode.code}
                  </Badge>
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      ) : null}

      {services.length > 0 && (
        <Section spacing="md" tone="subtle">
          <Container>
            <Stack gap="lg">
              <SectionHeader
                intro={`What we install across ${location.name} and the surrounding area.`}
                title="Services in this area"
              />
              <Grid cols={3} gap="md">
                {services.map((service) => (
                  <DocumentCard key={service.id} {...docToCard('services', service)} />
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>
      )}

      <RenderBlocks blocks={location.layout} />

      {nearby.length > 0 && (
        <Section spacing="sm">
          <Container>
            <Stack gap="sm">
              <Heading as="h2" size="h5">
                Nearby areas
              </Heading>
              <div className="flex flex-wrap gap-3">
                {nearby.map((area) => (
                  <Link
                    className="text-brand text-sm underline underline-offset-4"
                    href={getDocumentPath('locations', area.slug)}
                    key={area.id}
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
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
  const doc = await queryDocumentBySlug<Location>({
    collection: 'locations',
    depth: 1,
    slug: decodedSlug,
  })

  return generateMeta({ doc, path: getDocumentPath('locations', decodedSlug) })
}
