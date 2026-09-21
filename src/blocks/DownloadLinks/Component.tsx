import configPromise from '@payload-config'
import { ArrowDownToLine, FileText } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import type { Download, DownloadLinksBlock as DownloadLinksBlockProps } from '@/payload-types'

import { Grid, Heading, SectionHeader, Stack, Surface, Text } from '@/design-system'
import { getDocumentPath } from '@/utilities/routing'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'

/** Renders a byte count as a human-readable size. */
const formatSize = (bytes?: number | null): string | null => {
  if (!bytes) return null
  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** exponent).toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`
}

export const DownloadLinksBlockComponent: React.FC<DownloadLinksBlockProps> = async ({
  appearance,
  category,
  downloads: selected,
  eyebrow,
  heading,
  headingLevel,
  intro,
  layout,
  limit,
}) => {
  let downloads: Download[] = []

  if (source(selected, category) === 'selection') {
    downloads = (selected || []).filter((entry): entry is Download => typeof entry === 'object')
  } else if (category) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'downloads',
      depth: 1,
      limit: limit || 8,
      where: { category: { equals: typeof category === 'object' ? category.id : category } },
    })
    downloads = result.docs
  }

  if (!downloads.length) return null

  const inverse = isInverse(appearance)
  const asCards = layout === 'cards'

  return (
    <BlockSection appearance={appearance} containerSize={asCards ? 'default' : 'narrow'}>
      <Stack gap="xl">
        <SectionHeader
          as={(headingLevel as 'h2') || 'h2'}
          eyebrow={eyebrow}
          intro={intro}
          size={headingLevel === 'h3' ? 'h3' : 'h2'}
          title={heading}
          tone={inverse ? 'inverse' : 'default'}
        />

        <Grid cols={asCards ? 3 : 1} gap={asCards ? 'md' : 'sm'}>
          {downloads.map((download) => {
            // Gated files link to their own page, where the email gate lives.
            // Ungated files link straight at the asset.
            const href = download.gated
              ? getDocumentPath('downloads', download.slug)
              : download.url || getDocumentPath('downloads', download.slug)

            return (
              <Surface
                as="article"
                interactive
                key={download.id}
                padding={asCards ? 'lg' : 'md'}
                radius="lg"
                tone={inverse ? 'brand' : 'surface'}
                className={cn('group flex gap-4', asCards ? 'flex-col' : 'items-center')}
              >
                <span
                  className={cn(
                    'inline-flex size-11 shrink-0 items-center justify-center rounded-full',
                    inverse ? 'bg-white/10 text-brass-300' : 'bg-brand-soft text-brand',
                  )}
                >
                  <FileText aria-hidden className="size-5" />
                </span>

                <div className="flex flex-1 flex-col gap-1">
                  <Heading as={headingLevel === 'h3' ? 'h4' : 'h3'} size="h5" tone={inverse ? 'inverse' : 'default'}>
                    <Link
                      className="after:absolute after:inset-0 after:content-['']"
                      href={href}
                      {...(download.gated ? {} : { download: true })}
                    >
                      {download.title}
                    </Link>
                  </Heading>

                  <Text size="sm" tone={inverse ? 'inverse' : 'muted'} className={asCards ? 'line-clamp-3' : undefined}>
                    {download.description}
                  </Text>

                  <Text as="span" size="xs" tone={inverse ? 'inverse' : 'subtle'} className="font-mono uppercase">
                    {[
                      download.mimeType?.split('/')[1]?.toUpperCase(),
                      formatSize(download.filesize),
                      download.gated ? 'Email required' : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </Text>
                </div>

                <ArrowDownToLine
                  aria-hidden
                  className={cn(
                    'size-5 shrink-0 transition-transform group-hover:translate-y-0.5',
                    inverse ? 'text-brass-300' : 'text-brass-600',
                    asCards && 'hidden',
                  )}
                />
              </Surface>
            )
          })}
        </Grid>
      </Stack>
    </BlockSection>
  )
}

function source(selected: unknown, category: unknown): 'selection' | 'category' {
  if (Array.isArray(selected) && selected.length) return 'selection'
  return category ? 'category' : 'selection'
}
