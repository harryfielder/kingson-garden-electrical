import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { SiteSetting } from '@/payload-types'

/**
 * Site Settings is read by the header, the footer, every page's metadata and
 * all structured data, so it is fetched once per request-cache and tagged for
 * invalidation from the global's afterChange hook.
 *
 * depth 1 resolves the logo/image uploads, which are needed almost everywhere
 * it is used.
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSetting> => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'site-settings', depth: 1 })
  },
  ['site-settings'],
  { tags: ['site-settings', 'global_site-settings'] },
)
