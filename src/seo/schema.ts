import type {
  CaseStudy,
  Download,
  Location,
  Media,
  Post,
  Service,
  SiteSetting,
  Team,
  Testimonial,
} from '@/payload-types'
import { getDocumentPath, type RoutableCollection } from '@/utilities/routing'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * JSON-LD builders.
 *
 * Every entity is minted with a stable `@id` derived from its URL, and entities
 * reference each other by `@id` rather than being re-declared inline. That is
 * what lets a crawler assemble one connected graph for the site instead of a
 * pile of unrelated fragments, and it is the difference between structured
 * data that is merely valid and structured data that is actually understood.
 */

type Thing = Record<string, unknown>

const abs = (path = '/'): string => `${getServerSideURL()}${path}`

/** Stable identifiers for the site-wide entities, referenced from every page. */
export const ORGANISATION_ID = abs('/#organisation')
export const WEBSITE_ID = abs('/#website')

const mediaUrl = (image?: Media | number | null, size?: 'og' | 'large'): string | undefined => {
  if (!image || typeof image !== 'object') return undefined
  const sized = size ? image.sizes?.[size]?.url : undefined
  const url = sized || image.url
  if (!url) return undefined
  return url.startsWith('http') ? url : abs(url)
}

const imageObject = (image?: Media | number | null, size?: 'og' | 'large'): Thing | undefined => {
  const url = mediaUrl(image, size)
  if (!url) return undefined

  const width = size && typeof image === 'object' ? image?.sizes?.[size]?.width : undefined
  const height = size && typeof image === 'object' ? image?.sizes?.[size]?.height : undefined

  return {
    '@type': 'ImageObject',
    url,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(typeof image === 'object' && image?.alt ? { caption: image.alt } : {}),
  }
}

/** Drops undefined/null/empty values so the emitted JSON stays clean. */
const compact = <T extends Thing>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === '') return false
      if (Array.isArray(v) && v.length === 0) return false
      return true
    }),
  ) as T

// ---------------------------------------------------------------------------
// Site-wide entities
// ---------------------------------------------------------------------------

/**
 * The business itself, as an `Electrician` — a LocalBusiness subtype, which is
 * more specific (and therefore more useful) than plain Organization for a
 * trade that serves a geographic area.
 */
export const organisationSchema = (settings: SiteSetting): Thing => {
  const address = settings.address

  const hasAddress = Boolean(
    address?.streetAddress || address?.addressLocality || address?.postalCode,
  )

  return compact({
    '@type': ['Electrician', 'LocalBusiness', 'Organization'],
    '@id': ORGANISATION_ID,
    name: settings.businessName,
    legalName: settings.legalName || undefined,
    description: settings.description,
    url: abs('/'),
    telephone: settings.phoneE164 || settings.phone,
    email: settings.email,
    priceRange: settings.priceRange || undefined,
    foundingDate: settings.foundingYear ? String(settings.foundingYear) : undefined,
    vatID: settings.vatNumber || undefined,
    ...(settings.companyNumber
      ? {
          identifier: {
            '@type': 'PropertyValue',
            name: 'Companies House number',
            value: settings.companyNumber,
          },
        }
      : {}),
    logo: imageObject(settings.logoMark || settings.logo),
    image: imageObject(settings.defaultMetaImage, 'og') || imageObject(settings.logo),
    ...(hasAddress
      ? {
          address: compact({
            '@type': 'PostalAddress',
            streetAddress: address?.streetAddress,
            addressLocality: address?.addressLocality,
            addressRegion: address?.addressRegion,
            postalCode: address?.postalCode,
            addressCountry: address?.addressCountry || 'GB',
          }),
        }
      : {}),
    ...(settings.latitude && settings.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: settings.latitude,
            longitude: settings.longitude,
          },
        }
      : {}),
    openingHoursSpecification: (settings.openingHours || [])
      .filter((entry) => entry.days?.length && entry.opens && entry.closes)
      .map((entry) =>
        compact({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: entry.days,
          opens: entry.opens,
          closes: entry.closes,
        }),
      ),
    // sameAs is how search engines reconcile this business with its profiles
    // elsewhere; it is the strongest entity-resolution signal available.
    sameAs: (settings.socialProfiles || []).map((profile) => profile.url).filter(Boolean),
    hasCredential: (settings.accreditations || []).map((accreditation) =>
      compact({
        '@type': 'EducationalOccupationalCredential',
        name: accreditation.name,
        credentialCategory: 'Professional accreditation',
        identifier: accreditation.registrationNumber || undefined,
        url: accreditation.url || undefined,
      }),
    ),
  })
}

export const websiteSchema = (settings: SiteSetting): Thing =>
  compact({
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: abs('/'),
    name: settings.businessName,
    description: settings.description,
    publisher: { '@id': ORGANISATION_ID },
    inLanguage: 'en-GB',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: abs('/search?q={search_term_string}'),
      },
      'query-input': 'required name=search_term_string',
    },
  })

// ---------------------------------------------------------------------------
// Page-level entities
// ---------------------------------------------------------------------------

export type Breadcrumb = { name: string; path: string }

export const breadcrumbSchema = (crumbs: Breadcrumb[]): Thing | null => {
  if (crumbs.length < 2) return null

  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(crumbs[crumbs.length - 1]!.path)}#breadcrumbs`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  }
}

export const webPageSchema = ({
  breadcrumbPath,
  datePublished,
  dateModified,
  description,
  image,
  name,
  path,
}: {
  breadcrumbPath?: string
  datePublished?: string | null
  dateModified?: string | null
  description?: string | null
  image?: Media | number | null
  name: string
  path: string
}): Thing =>
  compact({
    '@type': 'WebPage',
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description: description || undefined,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANISATION_ID },
    primaryImageOfPage: imageObject(image, 'og'),
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    inLanguage: 'en-GB',
    ...(breadcrumbPath ? { breadcrumb: { '@id': `${abs(breadcrumbPath)}#breadcrumbs` } } : {}),
  })

export const serviceSchema = (service: Service, settings: SiteSetting): Thing => {
  const path = getDocumentPath('services', service.slug)

  const areaServed = (service.serviceArea || [])
    .filter((area): area is Location => typeof area === 'object')
    .map((area) =>
      compact({
        '@type': 'Place',
        name: area.name,
        ...(area.latitude && area.longitude
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: area.latitude,
                longitude: area.longitude,
              },
            }
          : {}),
      }),
    )

  return compact({
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name: service.title,
    description: service.shortDescription,
    url: abs(path),
    serviceType: service.title,
    provider: { '@id': ORGANISATION_ID },
    image: imageObject(service.featuredImage, 'large'),
    areaServed: areaServed.length ? areaServed : undefined,
    ...(service.priceFrom
      ? {
          offers: compact({
            '@type': 'Offer',
            priceCurrency: 'GBP',
            price: service.priceFrom,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: service.priceFrom,
              priceCurrency: 'GBP',
              valueAddedTaxIncluded: false,
            },
            description: service.priceNote || undefined,
            availableAtOrFrom: { '@id': ORGANISATION_ID },
          }),
        }
      : {}),
    ...(service.deliverables?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `What's included — ${service.title}`,
            itemListElement: service.deliverables.map((deliverable, index) => ({
              '@type': 'Offer',
              position: index + 1,
              itemOffered: { '@type': 'Service', name: deliverable.item },
            })),
          },
        }
      : {}),
    ...(settings.businessName ? { brand: { '@id': ORGANISATION_ID } } : {}),
  })
}

export const articleSchema = (post: Post): Thing => {
  const path = getDocumentPath('posts', post.slug)

  const authors = (post.authors || [])
    .filter((author): author is Team => typeof author === 'object')
    .map((author) => ({
      '@type': 'Person',
      '@id': `${abs(getDocumentPath('team', author.slug))}#person`,
      name: author.name,
      jobTitle: author.role,
      url: abs(getDocumentPath('team', author.slug)),
    }))

  const reviewer =
    post.reviewedBy && typeof post.reviewedBy === 'object' ? post.reviewedBy : undefined

  return compact({
    '@type': 'Article',
    '@id': `${abs(path)}#article`,
    headline: post.title,
    description: post.excerpt || post.meta?.description || undefined,
    url: abs(path),
    mainEntityOfPage: { '@id': `${abs(path)}#webpage` },
    image: imageObject(post.heroImage || post.meta?.image, 'large'),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: authors.length ? authors : [{ '@id': ORGANISATION_ID }],
    publisher: { '@id': ORGANISATION_ID },
    // An explicit, named reviewer is a direct expertise signal — worth
    // emitting whenever the business has actually had the piece checked.
    ...(reviewer
      ? {
          reviewedBy: {
            '@type': 'Person',
            name: reviewer.name,
            jobTitle: reviewer.role,
            url: abs(getDocumentPath('team', reviewer.slug)),
          },
        }
      : {}),
    inLanguage: 'en-GB',
  })
}

export const caseStudySchema = (caseStudy: CaseStudy): Thing => {
  const path = getDocumentPath('case-studies', caseStudy.slug)

  return compact({
    '@type': 'CreativeWork',
    '@id': `${abs(path)}#project`,
    name: caseStudy.title,
    abstract: caseStudy.summary,
    url: abs(path),
    image: imageObject(caseStudy.featuredImage, 'large'),
    creator: { '@id': ORGANISATION_ID },
    dateCreated: caseStudy.completedAt || undefined,
    locationCreated: caseStudy.clientLocation
      ? { '@type': 'Place', name: caseStudy.clientLocation }
      : undefined,
    about: (caseStudy.services || [])
      .filter((service): service is Service => typeof service === 'object')
      .map((service) => ({
        '@type': 'Service',
        '@id': `${abs(getDocumentPath('services', service.slug))}#service`,
        name: service.title,
      })),
  })
}

export const personSchema = (member: Team): Thing => {
  const path = getDocumentPath('team', member.slug)

  return compact({
    '@type': 'Person',
    '@id': `${abs(path)}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.shortBio || undefined,
    url: abs(path),
    image: imageObject(member.photo),
    worksFor: { '@id': ORGANISATION_ID },
    email: member.email || undefined,
    telephone: member.phone || undefined,
    sameAs: member.linkedin ? [member.linkedin] : undefined,
    hasCredential: (member.qualifications || []).map((qualification) =>
      compact({
        '@type': 'EducationalOccupationalCredential',
        name: qualification.name,
        ...(qualification.issuer
          ? { recognizedBy: { '@type': 'Organization', name: qualification.issuer } }
          : {}),
      }),
    ),
  })
}

/**
 * A location page describes the business *as served from* that area, so it is
 * emitted as a LocalBusiness scoped to the place rather than a second, competing
 * copy of the organisation.
 */
export const locationSchema = (location: Location, settings: SiteSetting): Thing => {
  const path = getDocumentPath('locations', location.slug)

  return compact({
    '@type': 'Electrician',
    '@id': `${abs(path)}#business`,
    name: `${settings.businessName} — ${location.name}`,
    description: location.intro,
    url: abs(path),
    telephone: settings.phoneE164 || settings.phone,
    email: settings.email,
    parentOrganization: { '@id': ORGANISATION_ID },
    image: imageObject(location.featuredImage, 'large'),
    priceRange: settings.priceRange || undefined,
    areaServed: compact({
      '@type': 'GeoCircle',
      name: location.name,
      ...(location.latitude && location.longitude
        ? {
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }
        : {}),
      ...(location.serviceRadiusMiles
        ? {
            geoRadius: Math.round(location.serviceRadiusMiles * 1609.34),
          }
        : {}),
    }),
    ...(location.postcodes?.length
      ? {
          serviceArea: location.postcodes.map((postcode) => ({
            '@type': 'PostalCodeRangeSpecification',
            postalCodeBegin: postcode.code,
          })),
        }
      : {}),
    makesOffer: (location.servicesOffered || [])
      .filter((service): service is Service => typeof service === 'object')
      .map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${abs(getDocumentPath('services', service.slug))}#service`,
          name: service.title,
        },
      })),
  })
}

export const faqSchema = (
  items: { question: string; answerText: string }[],
  path: string,
): Thing | null => {
  const valid = items.filter((item) => item.question && item.answerText)
  if (!valid.length) return null

  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answerText },
    })),
  }
}

/**
 * Reviews and their aggregate.
 *
 * Only reviews an editor has marked `verified` are emitted — Google requires
 * reviews to be genuine and attributable, and emitting unverifiable ones risks
 * a manual action against the whole site.
 */
export const reviewSchemas = (testimonials: Testimonial[]): Thing[] => {
  const verified = testimonials.filter((t) => t.verified && t.rating)
  if (!verified.length) return []

  const average =
    verified.reduce((total, testimonial) => total + (testimonial.rating || 0), 0) / verified.length

  return [
    {
      '@type': 'AggregateRating',
      '@id': `${ORGANISATION_ID}-rating`,
      itemReviewed: { '@id': ORGANISATION_ID },
      ratingValue: Number(average.toFixed(1)),
      reviewCount: verified.length,
      bestRating: 5,
      worstRating: 1,
    },
    ...verified.slice(0, 10).map((testimonial) =>
      compact({
        '@type': 'Review',
        itemReviewed: { '@id': ORGANISATION_ID },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: testimonial.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: { '@type': 'Person', name: testimonial.authorName },
        reviewBody: testimonial.quote,
        datePublished: testimonial.reviewDate || undefined,
      }),
    ),
  ]
}

export const downloadSchema = (download: Download): Thing => {
  const path = getDocumentPath('downloads', download.slug)

  return compact({
    '@type': 'DigitalDocument',
    '@id': `${abs(path)}#document`,
    name: download.title,
    description: download.description,
    url: abs(path),
    encodingFormat: download.mimeType || undefined,
    contentSize: download.filesize ? `${download.filesize}` : undefined,
    publisher: { '@id': ORGANISATION_ID },
    // Gated files are not freely accessible; saying so honestly avoids
    // promising crawlers a document they cannot reach.
    isAccessibleForFree: !download.gated,
  })
}

export const itemListSchema = (
  items: { name: string; path: string }[],
  path: string,
  name: string,
): Thing | null => {
  if (!items.length) return null

  return {
    '@type': 'ItemList',
    '@id': `${abs(path)}#list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: abs(item.path),
    })),
  }
}

/** Wraps entities into a single connected `@graph` document. */
export const buildGraph = (entities: (Thing | null | undefined)[]): Thing => ({
  '@context': 'https://schema.org',
  '@graph': entities.filter(Boolean),
})

export const breadcrumbsFor = (
  collection: RoutableCollection,
  indexName: string,
  indexPath: string,
  docName: string,
  slug?: string | null,
): Breadcrumb[] => [
  { name: 'Home', path: '/' },
  { name: indexName, path: indexPath },
  { name: docName, path: getDocumentPath(collection, slug) },
]
