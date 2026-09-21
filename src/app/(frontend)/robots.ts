import type { MetadataRoute } from 'next'

import { getSiteSettings } from '@/utilities/getSiteSettings'
import { getServerSideURL } from '@/utilities/getURL'

/** Crawlers that build AI answer engines, controlled separately from search. */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
]

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings()
  const base = getServerSideURL()

  // The admin panel, the API and preview routes have no business in an index.
  const disallow = ['/admin', '/api/', '/next/', '/search?']

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_CRAWLERS.map((userAgent) =>
        settings.allowAiTraining
          ? { userAgent, allow: '/', disallow }
          : { userAgent, disallow: '/' },
      ),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
