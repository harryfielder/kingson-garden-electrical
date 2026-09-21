import configPromise from '@payload-config'
import { getPayload, type CollectionSlug } from 'payload'

import { getDocumentPath, type RoutableCollection } from '@/utilities/routing'
import { getServerSideURL } from '@/utilities/getURL'
import { getSiteSettings } from '@/utilities/getSiteSettings'

/**
 * /llms.txt — a plain-text map of the site for AI assistants.
 *
 * The emerging convention (llmstxt.org) is a markdown summary plus curated
 * links, so an assistant can describe the business accurately without
 * scraping and guessing. Generated from the CMS so it never goes stale.
 */

export const revalidate = 3600

const SECTIONS: { collection: RoutableCollection; heading: string; limit: number; sort: string }[] =
  [
    { collection: 'services', heading: 'Services', limit: 20, sort: 'order' },
    { collection: 'locations', heading: 'Areas covered', limit: 30, sort: 'name' },
    { collection: 'case-studies', heading: 'Projects', limit: 20, sort: '-completedAt' },
    { collection: 'posts', heading: 'Guides and articles', limit: 30, sort: '-publishedAt' },
  ]

export async function GET(): Promise<Response> {
  const [settings, payload] = await Promise.all([
    getSiteSettings(),
    getPayload({ config: configPromise }),
  ])

  const base = getServerSideURL()
  const lines: string[] = [`# ${settings.businessName}`, '']

  const summary = settings.llmsSummary || settings.description
  if (summary) lines.push(`> ${summary}`, '')

  const facts = [
    settings.tagline,
    settings.foundingYear ? `Established ${settings.foundingYear}.` : null,
    settings.phone ? `Telephone: ${settings.phone}.` : null,
    settings.email ? `Email: ${settings.email}.` : null,
    settings.address?.addressLocality
      ? `Based in ${[settings.address.addressLocality, settings.address.addressRegion]
          .filter(Boolean)
          .join(', ')}.`
      : null,
    settings.accreditations?.length
      ? `Accreditations: ${settings.accreditations.map((a) => a.name).join(', ')}.`
      : null,
  ].filter((fact): fact is string => Boolean(fact))

  if (facts.length) lines.push(...facts, '')

  for (const section of SECTIONS) {
    const result = await payload.find({
      collection: section.collection as CollectionSlug,
      depth: 0,
      limit: section.limit,
      sort: section.sort,
      where: { _status: { equals: 'published' } },
    })

    if (!result.docs.length) continue

    lines.push(`## ${section.heading}`, '')

    result.docs.forEach((doc) => {
      const typed = doc as Record<string, any>
      if (typed.meta?.noindex) return

      const title = typed.title || typed.name
      const description =
        typed.meta?.summary ||
        typed.shortDescription ||
        typed.summary ||
        typed.excerpt ||
        typed.intro ||
        typed.meta?.description

      if (!typed.slug) return
      const url = `${base}${getDocumentPath(section.collection, typed.slug)}`
      lines.push(`- [${title}](${url})${description ? `: ${description}` : ''}`)
    })

    lines.push('')
  }

  lines.push('## Contact', '')
  lines.push(`- [Contact us](${base}/contact)`)
  if (settings.phone) lines.push(`- Telephone: ${settings.phone}`)
  if (settings.email) lines.push(`- Email: ${settings.email}`)
  lines.push('')

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
