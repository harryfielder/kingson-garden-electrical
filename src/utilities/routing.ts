/**
 * Single source of truth for how CMS documents map onto front-end URLs.
 *
 * Every consumer — CMSLink, breadcrumbs, sitemaps, the SEO plugin's
 * generateURL, live-preview paths and JSON-LD — resolves through here, so a
 * route can be changed in exactly one place without orphaning links.
 */

export type RoutableCollection =
  | 'pages'
  | 'posts'
  | 'services'
  | 'case-studies'
  | 'locations'
  | 'team'
  | 'downloads'

/** URL prefix for each routable collection. `pages` live at the root. */
export const collectionPathPrefix: Record<RoutableCollection, string> = {
  pages: '',
  posts: '/blog',
  services: '/services',
  'case-studies': '/case-studies',
  locations: '/areas-we-cover',
  team: '/team',
  downloads: '/downloads',
}

/** Human labels, used for breadcrumbs and admin-facing copy. */
export const collectionLabel: Record<RoutableCollection, string> = {
  pages: 'Pages',
  posts: 'Blog',
  services: 'Services',
  'case-studies': 'Case Studies',
  locations: 'Areas We Cover',
  team: 'Team',
  downloads: 'Downloads',
}

/** Index route for each collection, e.g. `/services`. `pages` has no index. */
export const collectionIndexPath: Partial<Record<RoutableCollection, string>> = {
  posts: '/blog',
  services: '/services',
  'case-studies': '/case-studies',
  locations: '/areas-we-cover',
  team: '/team',
  downloads: '/downloads',
}

export const routableCollections = Object.keys(collectionPathPrefix) as RoutableCollection[]

export const isRoutableCollection = (value: unknown): value is RoutableCollection =>
  typeof value === 'string' && value in collectionPathPrefix

/**
 * Resolve a document to its site-relative path.
 *
 * The home page is stored with the slug `home` but lives at `/`, so it is
 * special-cased here rather than at every call site.
 */
export const getDocumentPath = (
  collection: RoutableCollection | string | null | undefined,
  slug: string | null | undefined,
): string => {
  if (!slug || !isRoutableCollection(collection)) return '/'
  if (collection === 'pages' && (slug === 'home' || slug === 'index')) return '/'

  return `${collectionPathPrefix[collection]}/${slug}`
}
