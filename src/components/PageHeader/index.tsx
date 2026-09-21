import Link from 'next/link'
import React from 'react'

import { Container, Eyebrow, Heading, Section, Stack, Text } from '@/design-system'
import type { Breadcrumb } from '@/seo/schema'

/**
 * Header for index and detail pages that do not open with a hero block.
 *
 * Breadcrumbs are rendered as a real nav landmark and mirrored into
 * BreadcrumbList structured data by the page, so the visible trail and the
 * machine-readable one always agree.
 */
export const PageHeader: React.FC<{
  breadcrumbs?: Breadcrumb[]
  eyebrow?: string | null
  intro?: string | null
  title: string
}> = ({ breadcrumbs, eyebrow, intro, title }) => (
  <Section spacing="sm" tone="subtle">
    <Container>
      <Stack gap="md">
        {breadcrumbs && breadcrumbs.length > 1 && (
          <nav aria-label="Breadcrumb">
            <ol className="text-ink-subtle flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1

                return (
                  <li className="flex items-center gap-2" key={crumb.path}>
                    {isLast ? (
                      <span aria-current="page" className="text-ink-muted">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link className="hover:text-brand transition-colors" href={crumb.path}>
                        {crumb.name}
                      </Link>
                    )}
                    {!isLast && <span aria-hidden>/</span>}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

        <Heading as="h1" size="h1">
          {title}
        </Heading>

        {intro && (
          <Text measure="default" size="lead">
            {intro}
          </Text>
        )}
      </Stack>
    </Container>
  </Section>
)
