import configPromise from '@payload-config'
import { getPayload, type BasePayload, type CollectionSlug } from 'payload'

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

type Section = {
  collection: RoutableCollection
  /** Collections without versions have no `_status` column to filter on. */
  drafts: boolean
  filter?: (doc: Record<string, any>) => boolean
  heading: string
  limit: number
  sort: string
}

/**
 * Pages below this sitemap priority are orientation noise for an assistant —
 * the privacy policy and the like — so they drop to the spec's `## Optional`
 * section rather than being listed alongside the pages that sell the business.
 */
const CORE_PAGE_PRIORITY = 0.7

const pagePriority = (doc: Record<string, any>): number => Number(doc.meta?.priority ?? '0.7')

/** `home` is the document behind the H1; `contact` has its own section. */
const isStandalonePage = (doc: Record<string, any>): boolean =>
  doc.slug !== 'home' && doc.slug !== 'contact'

const SECTIONS: Section[] = [
  {
    collection: 'pages',
    heading: 'Key pages',
    limit: 30,
    sort: 'title',
    drafts: true,
    filter: (doc) => isStandalonePage(doc) && pagePriority(doc) >= CORE_PAGE_PRIORITY,
  },
  { collection: 'services', heading: 'Services', limit: 20, sort: 'order', drafts: true },
  { collection: 'locations', heading: 'Areas covered', limit: 30, sort: 'name', drafts: true },
  { collection: 'case-studies', heading: 'Projects', limit: 20, sort: '-completedAt', drafts: true },
  { collection: 'posts', heading: 'Guides and articles', limit: 30, sort: '-publishedAt', drafts: true },
  { collection: 'team', heading: 'Team', limit: 20, sort: 'order', drafts: false },
  { collection: 'downloads', heading: 'Free guides', limit: 20, sort: 'title', drafts: false },
]

/** Per the spec, `## Optional` is the last section and may be skipped. */
const OPTIONAL_SECTION: Section = {
  collection: 'pages',
  heading: 'Optional',
  limit: 30,
  sort: 'title',
  drafts: true,
  filter: (doc) => isStandalonePage(doc) && pagePriority(doc) < CORE_PAGE_PRIORITY,
}

/**
 * The first usable prose for a document, in descending order of how
 * deliberately it was written. Anything non-string is a rich-text field that
 * would serialise as `[object Object]`, so it is skipped.
 */
const describe = (doc: Record<string, any>): string | undefined =>
  [
    doc.meta?.summary,
    doc.shortDescription,
    doc.summary,
    doc.excerpt,
    doc.description,
    doc.shortBio,
    doc.intro,
    doc.meta?.description,
  ].find((value): value is string => typeof value === 'string' && value.trim().length > 0)

const renderSection = async (
  payload: BasePayload,
  base: string,
  section: Section,
): Promise<string[]> => {
  const result = await payload.find({
    collection: section.collection as CollectionSlug,
    depth: 0,
    limit: section.limit,
    sort: section.sort,
    ...(section.drafts ? { where: { _status: { equals: 'published' } } } : {}),
  })

  const items = result.docs
    .map((doc) => doc as Record<string, any>)
    .filter((doc) => doc.slug && !doc.meta?.noindex && (!section.filter || section.filter(doc)))
    .map((doc) => {
      const title = doc.title || doc.name
      const description = describe(doc)
      const url = `${base}${getDocumentPath(section.collection, doc.slug)}`

      return `- [${title}](${url})${description ? `: ${description}` : ''}`
    })

  return items.length ? [`## ${section.heading}`, '', ...items, ''] : []
}

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
    lines.push(...(await renderSection(payload, base, section)))
  }

  lines.push('## Contact', '')
  lines.push(`- [Contact us](${base}/contact)`)
  if (settings.phone) lines.push(`- Telephone: ${settings.phone}`)
  if (settings.email) lines.push(`- Email: ${settings.email}`)
  lines.push('')

  lines.push(...(await renderSection(payload, base, OPTIONAL_SECTION)))

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
