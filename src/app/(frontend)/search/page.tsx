import configPromise from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { PageHeader } from '@/components/PageHeader'
import { Container, Heading, Section, Stack, Surface, Text } from '@/design-system'
import { Search } from '@/search/Component'
import { collectionLabel, getDocumentPath, isRoutableCollection } from '@/utilities/routing'
import { getServerSideURL } from '@/utilities/getURL'

type Args = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const results = query
    ? await payload.find({
        collection: 'search',
        depth: 1,
        limit: 24,
        pagination: false,
        where: {
          or: [
            { title: { like: query } },
            { 'meta.description': { like: query } },
            { 'meta.title': { like: query } },
            { slug: { like: query } },
          ],
        },
      })
    : null

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Search', path: '/search' },
        ]}
        eyebrow="Search"
        title={query ? `Results for “${query}”` : 'Search'}
      />

      <Section spacing="md">
        <Container size="narrow">
          <Stack gap="xl">
            <Search />

            {results && (
              <Stack gap="sm">
                <Text size="sm">
                  {results.totalDocs || results.docs.length} result
                  {(results.totalDocs || results.docs.length) === 1 ? '' : 's'}
                </Text>

                {results.docs.length ? (
                  <ul className="flex flex-col gap-3">
                    {results.docs.map((doc) => {
                      const relationTo = doc.doc?.relationTo
                      const href = isRoutableCollection(relationTo)
                        ? getDocumentPath(relationTo, doc.slug)
                        : '/'

                      return (
                        <li key={doc.id}>
                          <Surface as="article" interactive padding="md" radius="lg">
                            <Stack gap="xs">
                              {isRoutableCollection(relationTo) && (
                                <Text as="span" size="xs" tone="subtle" className="font-mono uppercase">
                                  {collectionLabel[relationTo]}
                                </Text>
                              )}
                              <Heading as="h2" size="h5">
                                <Link className="after:absolute after:inset-0" href={href}>
                                  {doc.title}
                                </Link>
                              </Heading>
                              {doc.meta?.description && (
                                <Text size="sm" className="line-clamp-2">
                                  {doc.meta.description}
                                </Text>
                              )}
                            </Stack>
                          </Surface>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <Text>No results. Try a broader term, or browse our services.</Text>
                )}
              </Stack>
            )}
          </Stack>
        </Container>
      </Section>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Search',
    description: 'Search Kingson Garden Electrical.',
    alternates: { canonical: `${getServerSideURL()}/search` },
    // Search result pages are thin and near-infinite in number; keeping them
    // out of the index protects crawl budget for pages that can rank.
    robots: { index: false, follow: true },
  }
}
