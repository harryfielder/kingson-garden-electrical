import type { Metadata } from 'next'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Media } from '@/components/Media'
import { PageHeader } from '@/components/PageHeader'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { AspectRatio, Badge, Container, Heading, Section, Stack, Text } from '@/design-system'
import type { Service, Team } from '@/payload-types'
import {
  breadcrumbsFor,
  breadcrumbSchema,
  buildGraph,
  personSchema,
  webPageSchema,
} from '@/seo/schema'
import { generateMeta } from '@/utilities/generateMeta'
import { getDocumentPath } from '@/utilities/routing'
import { listSlugs, queryDocumentBySlug } from '@/utilities/queryDocument'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listSlugs('team')
}

export default async function TeamMemberPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const member = await queryDocumentBySlug<Team>({ collection: 'team', slug: decodedSlug })
  const path = getDocumentPath('team', decodedSlug)

  if (!member) return <PayloadRedirects url={path} />

  const crumbs = breadcrumbsFor('team', 'Team', '/team', member.name, decodedSlug)

  const graph = buildGraph([
    webPageSchema({
      breadcrumbPath: path,
      dateModified: member.updatedAt,
      description: member.meta?.description || member.shortBio,
      image: member.meta?.image || member.photo,
      name: member.name,
      path,
    }),
    personSchema(member),
    breadcrumbSchema(crumbs),
  ])

  const specialisms = (member.specialisms || []).filter(
    (s): s is Service => typeof s === 'object',
  )

  return (
    <article>
      <JsonLd data={graph} />
      <PageHeader breadcrumbs={crumbs} eyebrow={member.role} intro={member.shortBio} title={member.name} />

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {member.photo && (
              <div className="lg:col-span-5">
                <AspectRatio radius="lg" ratio="3/4">
                  <Media
                    resource={member.photo}
                    fill
                    priority
                    htmlElement={null}
                    size="(max-width: 1024px) 100vw, 40vw"
                    imgClassName="absolute inset-0 h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            )}

            <div className="lg:col-span-7">
              <Stack gap="lg">
                {member.bio && <Text size="lead">{member.bio}</Text>}

                {member.qualifications?.length ? (
                  <Stack gap="sm">
                    <Heading as="h2" size="h5">
                      Qualifications
                    </Heading>
                    <ul className="flex flex-col gap-2">
                      {member.qualifications.map((qualification, i) => (
                        <li className="border-line border-b pb-2" key={i}>
                          <Text as="span" weight="medium" tone="default">
                            {qualification.name}
                          </Text>
                          {qualification.issuer && (
                            <Text as="span" size="sm" className="ml-2">
                              {qualification.issuer}
                            </Text>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Stack>
                ) : null}

                {specialisms.length > 0 && (
                  <Stack gap="sm">
                    <Heading as="h2" size="h5">
                      Specialisms
                    </Heading>
                    <div className="flex flex-wrap gap-2">
                      {specialisms.map((service) => (
                        <a href={getDocumentPath('services', service.slug)} key={service.id}>
                          <Badge tone="outline">{service.title}</Badge>
                        </a>
                      ))}
                    </div>
                  </Stack>
                )}
              </Stack>
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
  const doc = await queryDocumentBySlug<Team>({ collection: 'team', depth: 1, slug: decodedSlug })

  return generateMeta({ doc, path: getDocumentPath('team', decodedSlug) })
}
