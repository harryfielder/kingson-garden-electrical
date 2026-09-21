/**
 * Seeds the database with Kingson Garden Electrical's content.
 *
 * Idempotent by slug: running it again updates the existing documents rather
 * than creating duplicates, so it is safe to re-run while iterating.
 *
 *   pnpm seed          # seed / update
 *   pnpm seed --fresh  # delete existing seeded content first
 */

// Must precede the config import: buildConfig reads process.env on evaluation.
import './env'

import config from '@payload-config'
import { readFileSync } from 'fs'
import path from 'path'
import { getPayload, type Payload } from 'payload'
import { fileURLToPath } from 'url'

import { business, locations, services, testimonials } from './content'
import { heading, list, paragraph, prose, richText } from './lexical'
import { buildPdf } from './pdf'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS = path.resolve(dirname, '../../seed-assets/kingson')

const fresh = process.argv.includes('--fresh')

type MediaMap = Record<string, number>

const log = (message: string) => console.log(`  ${message}`)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Creates or updates a document identified by `slug`, returning its id. */
const upsert = async (
  payload: Payload,
  collection: any,
  slug: string,
  data: Record<string, any>,
  slugKey = 'slug',
): Promise<number> => {
  const existing = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    where: { [slugKey]: { equals: slug } },
  })

  if (existing.docs[0]) {
    const updated = await payload.update({
      collection,
      id: (existing.docs[0] as any).id,
      data,
      context: { disableRevalidate: true },
    })
    return (updated as any).id
  }

  const created = await payload.create({
    collection,
    data: { ...data, [slugKey]: slug },
    context: { disableRevalidate: true },
  })
  return (created as any).id
}

const uploadImage = async (
  payload: Payload,
  media: MediaMap,
  file: string,
  alt: string,
): Promise<number | undefined> => {
  if (media[file]) return media[file]

  const filePath = path.join(ASSETS, file)

  try {
    const data = readFileSync(filePath)
    const existing = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1,
      where: { filename: { like: file.replace(/\.[^.]+$/, '') } },
    })

    if (existing.docs[0]) {
      media[file] = (existing.docs[0] as any).id
      return media[file]
    }

    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data,
        mimetype: file.endsWith('.png')
          ? 'image/png'
          : file.endsWith('.svg')
            ? 'image/svg+xml'
            : 'image/jpeg',
        name: file,
        size: data.length,
      },
      context: { disableRevalidate: true },
    })

    media[file] = (created as any).id
    return media[file]
  } catch (error) {
    log(`! could not upload ${file}: ${(error as Error).message}`)
    return undefined
  }
}

const appearance = (tone: string, spacing = 'md') => ({ tone, spacing })

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('\nSeeding Kingson Garden Electrical\n')

  if (fresh) {
    log('clearing existing content…')
    for (const collection of [
      'pages',
      'posts',
      'services',
      'case-studies',
      'locations',
      'testimonials',
      'team',
      'downloads',
      'categories',
      'forms',
    ] as const) {
      await payload.delete({
        collection,
        where: { id: { exists: true } },
        context: { disableRevalidate: true },
      })
    }
  }

  // -- Admin user ----------------------------------------------------------
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'harry@umidigital.co.uk'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!2026'

  const existingUsers = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    where: { email: { equals: adminEmail } },
  })

  if (!existingUsers.docs.length) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, password: adminPassword, name: 'Harry Fielder' },
    })
    log(`created admin user ${adminEmail}`)
  } else {
    log(`admin user ${adminEmail} already exists`)
  }

  // -- Media ---------------------------------------------------------------
  log('uploading media…')
  const media: MediaMap = {}

  const imageAlts: Record<string, string> = {
    'hero-pathway.jpg': 'A garden pathway lit by low-level fittings after dark',
    'hero-inlite.jpg': 'in-lite garden lighting installed across a planted terrace',
    'hero-header.jpg': 'A lit garden at dusk seen from the house',
    'hero-bg.jpg': 'Garden lighting picking out planting and paving at night',
    'hero-website3.jpg': 'A landscaped garden lit after dark',
    'hero-services.jpg': 'Exterior lighting across a residential garden',
    'hero-projects.jpg': 'A completed garden lighting installation at night',
    'hero-contact.jpg': 'An illuminated garden terrace',
    'hero-footer.jpg': 'A garden lit at dusk',
    'proj-yates.jpg': 'The Yates garden lighting scheme after dark',
    'proj-finished.jpg': 'A finished garden lighting project lit at night',
    'proj-landscaping.jpg': 'Lighting integrated into new landscaping',
    'proj-patio-install.jpg': 'Coring holes for recessed patio lighting during installation',
    'proj-large-garden.jpg': 'A large garden lit across several levels',
    'proj-driveway.jpg': 'Block-paved driveway lighting on a residential property',
    'proj-recessed-home.jpg': 'Recessed exterior lighting on a house elevation',
    'proj-recessed-fence.jpg': 'Recessed uplighting washing a garden fence',
    'proj-patio.jpg': 'A lit patio and seating area',
    'proj-two.jpg': 'A completed garden lighting scheme',
    'proj-two-path.jpg': 'Path lighting through a planted border',
    'proj-two-property.jpg': 'Outdoor property lighting on a house and garden',
    'proj-nl-01.jpg': 'A north London garden lit at night',
    'proj-nl-02.jpg': 'Uplit trees in a north London garden',
    'proj-nl-03.jpg': 'Lighting to steps and terracing in a north London garden',
    'proj-nl-04.jpg': 'A lit garden path in north London',
    'proj-website3-full.jpg': 'A landscaped garden with lighting to planting and paving',
    'proj-website1.jpg': 'Garden lighting to a planted border',
    'proj-website2.jpg': 'Lighting to a garden feature after dark',
    'proj-img8032.jpg': 'A garden lighting installation photographed at dusk',
    'detail-tree-uplight.jpg': 'An uplighter at the base of a mature tree',
    'detail-uplighting.jpg': 'Uplighting to a specimen tree',
    'detail-underwater.jpg': 'Underwater lighting in a garden water feature',
    'detail-deck.jpg': 'Ground and deck lights set into timber decking',
    'detail-wall-mount.jpg': 'A wall-mounted exterior light fitting',
    'detail-pole.jpg': 'A pole-mounted garden light fitting',
    'detail-tree-mount.jpg': 'A tree-mounted downlight fitting',
    'design-professional.jpg': 'A professionally designed garden lighting scheme',
    'team-dave.jpg': 'Dave King, founder of Kingson Garden Electrical',
    'recent-01.jpg': 'A recent garden lighting installation',
    'recent-02.jpg': 'Lighting to planting in a recent project',
    'recent-03.jpg': 'A recently completed lighting scheme after dark',
    'recent-04.jpg': 'Garden lighting installed in autumn',
    'logo-kingson.png': 'Kingson Garden Electrical logo',
    'favicon-kingson.png': 'Kingson Garden Electrical logo mark',
    'accred-eca.png': 'ECA — Electrical Contractors’ Association',
    'accred-niceic.png': 'NICEIC Approved Contractor',
    'accred-elecsa.jpg': 'ELECSA registered',
    'brand-hunza.jpg': 'Hunza Lighting',
    'brand-inlite.jpg': 'in-lite outdoor lighting',
  }

  for (const [file, alt] of Object.entries(imageAlts)) {
    await uploadImage(payload, media, file, alt)
  }
  log(`uploaded ${Object.keys(media).length} images`)

  const img = (name: string) => media[`${name}.jpg`] ?? media[`${name}.png`]


  // -- Categories ----------------------------------------------------------
  const categoryIds: Record<string, number> = {}
  for (const [slug, title] of [
    ['design', 'Design'],
    ['installation', 'Installation'],
    ['maintenance', 'Maintenance'],
    ['guides', 'Guides'],
  ] as const) {
    categoryIds[slug] = await upsert(payload, 'categories', slug, { title })
  }
  log(`categories: ${Object.keys(categoryIds).length}`)

  // -- Team ----------------------------------------------------------------
  const daveId = await upsert(payload, 'team', 'dave-king', {
    name: 'Dave King',
    role: 'Founder & Lead Designer',
    photo: img('team-dave'),
    order: 1,
    isAuthor: true,
    shortBio:
      'Dave started out as an apprentice engineer at Lucas Aerospace, founded Kingson in 1985, and has specialised exclusively in garden lighting for the past twenty-five years.',
    bio: 'Dave began his working life at sixteen with a five-year engineering apprenticeship at Lucas Aerospace, staying on for another four years afterwards. In 1985 he started an electrical business in Hemel Hempstead doing domestic work, moved into commercial contracting a decade later — shopfitting, offices, schools and main-dealer garages — and then made the decision that has defined the company since: to stop doing everything and become expert in one thing. For the last twenty-five years that has been gardens. The reasoning was simple. Garden lighting done occasionally, by people who mostly do something else, is unreliable — and it deserves to be done properly. Dave works most often alongside landscape architects and garden designers on high-end gardens across Hertfordshire and north London, and is closely involved in specifying every scheme the company installs.',
    qualifications: [
      { name: 'Electrical Engineering Apprenticeship', issuer: 'Lucas Aerospace' },
      { name: 'ECA Member', issuer: 'Electrical Contractors’ Association' },
      { name: 'NICEIC Approved Contractor', issuer: 'NICEIC' },
    ],
    meta: {
      title: 'Dave King — Founder, Kingson Garden Electrical',
      description:
        'Dave King founded Kingson in 1985 and has specialised in garden lighting design and installation for twenty-five years.',
      summary:
        'Founder of Kingson Garden Electrical, specialising in garden lighting design across Hertfordshire and north London since 1985.',
    },
  })
  log('team: 1')

  // -- Services ------------------------------------------------------------
  const serviceIds: Record<string, number> = {}
  for (const service of services) {
    serviceIds[service.slug] = await upsert(payload, 'services', service.slug, {
      title: service.title,
      _status: 'published',
      publishedAt: new Date('2026-01-15').toISOString(),
      shortDescription: service.shortDescription,
      featuredImage: img(service.image),
      icon: service.icon,
      featured: service.featured,
      order: service.order,
      priceFrom: (service as any).priceFrom,
      priceNote: (service as any).priceNote,
      deliverables: service.deliverables.map((item) => ({ item })),
      meta: {
        title: `${service.title} | Kingson Garden Electrical`,
        description: service.metaDescription,
        image: img(service.image),
        priority: '0.8',
        summary: service.summary,
      },
      layout: [
        {
          blockType: 'textMedia',
          mediaPosition: 'right',
          mediaRatio: '4/3',
          mediaWidth: 'half',
          media: img(service.image),
          eyebrow: 'Why it matters',
          headingLevel: 'h2',
          heading: 'Done once, properly',
          body: prose(service.intro),
          bullets: service.deliverables.slice(0, 4).map((text) => ({ text })),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Book a free consultation',
                appearance: 'accent',
              },
            },
          ],
          appearance: appearance('canvas'),
        },
        {
          blockType: 'testimonialCarousel',
          source: 'featured',
          limit: 6,
          layout: 'carousel',
          showRatingSummary: true,
          eyebrow: 'What clients say',
          headingLevel: 'h2',
          heading: 'Trusted on gardens like yours',
          appearance: appearance('subtle'),
        },
        {
          blockType: 'cta',
          layout: 'banner',
          eyebrow: 'Next step',
          heading: 'Let’s look at your garden together',
          body: 'The first visit is free, and we bring the fittings with us so you can see exactly what the light does before anything is specified.',
          backgroundImage: img('hero-pathway'),
          phoneCta: true,
          links: [
            {
              link: { type: 'custom', url: '/contact', label: 'Request a quote', appearance: 'accent' },
            },
          ],
          appearance: appearance('ink'),
        },
      ],
    })
  }
  log(`services: ${Object.keys(serviceIds).length}`)

  // -- Locations -----------------------------------------------------------
  const locationIds: Record<string, number> = {}
  for (const location of locations) {
    locationIds[location.slug] = await upsert(payload, 'locations', location.slug, {
      name: location.name,
      _status: 'published',
      publishedAt: new Date('2026-01-20').toISOString(),
      county: location.county,
      region: location.county === 'North London' ? 'Greater London' : 'East of England',
      intro: location.intro,
      featuredImage: img(location.image),
      postcodes: location.postcodes.map((code) => ({ code })),
      latitude: location.latitude,
      longitude: location.longitude,
      serviceRadiusMiles: location.radius,
      meta: {
        title: `Garden Lighting in ${location.name} | Kingson Garden Electrical`,
        description: `Specialist garden lighting design and installation in ${location.name}, ${location.county}. Free consultation, ECA and NICEIC registered, twelve-month guarantee.`,
        image: img(location.image),
        priority: '0.8',
        summary: `Garden lighting design and installation covering ${location.name} and the surrounding ${location.postcodes.join(', ')} postcodes.`,
      },
      layout: [
        {
          blockType: 'faq',
          eyebrow: 'Common questions',
          headingLevel: 'h2',
          heading: `Garden lighting in ${location.name}`,
          emitStructuredData: true,
          items: [
            {
              question: `Do you cover ${location.name}?`,
              answer: prose(
                `Yes. We cover ${location.name} and the surrounding ${location.postcodes.join(', ')} postcode districts, working from our base in Hemel Hempstead. There is no charge for the first design visit.`,
              ),
            },
            {
              question: 'How much does garden lighting cost?',
              answer: prose(
                'A typical installed scheme for a medium-sized garden starts around £3,500 excluding VAT, but it depends entirely on the size of the garden and how much of it you want lit. We quote every garden individually after a site visit, and the quotation is itemised so you can see exactly what you are paying for.',
              ),
            },
            {
              question: 'How long does an installation take?',
              answer: prose(
                'Most residential gardens take between two and five days on site. We agree the dates in advance, turn up on them, and arrive with everything we need for the job rather than disappearing to a wholesaler halfway through.',
              ),
            },
            {
              question: 'Is the work guaranteed?',
              answer: prose(
                'Our workmanship is guaranteed for twelve months. The fittings we install carry substantial manufacturer warranties of their own — up to ten years on some Hunza products — and we honour those on your behalf. If something fails, we come back and put it right.',
              ),
            },
          ],
          appearance: appearance('subtle'),
        },
        {
          blockType: 'cta',
          layout: 'split',
          eyebrow: `Serving ${location.name}`,
          heading: 'Book a free design visit',
          body: 'We will come to you, walk the garden, and bring sample fittings so you can see the light in place.',
          phoneCta: true,
          links: [
            { link: { type: 'custom', url: '/contact', label: 'Get in touch', appearance: 'accent' } },
          ],
          appearance: appearance('brand'),
        },
      ],
    })
  }

  // Cross-link neighbouring areas and attach service areas.
  const neighbours: Record<string, string[]> = {
    'hemel-hempstead': ['berkhamsted', 'st-albans', 'watford'],
    'st-albans': ['harpenden', 'hemel-hempstead', 'radlett'],
    harpenden: ['st-albans', 'hemel-hempstead'],
    berkhamsted: ['hemel-hempstead', 'chorleywood'],
    radlett: ['st-albans', 'watford', 'barnet'],
    totteridge: ['barnet'],
    barnet: ['totteridge', 'radlett'],
    rickmansworth: ['chorleywood', 'watford'],
    watford: ['rickmansworth', 'hemel-hempstead', 'radlett'],
    chorleywood: ['rickmansworth', 'berkhamsted'],
  }

  for (const [slug, others] of Object.entries(neighbours)) {
    await payload.update({
      collection: 'locations',
      id: locationIds[slug]!,
      data: { nearbyAreas: others.map((other) => locationIds[other]!).filter(Boolean) },
      context: { disableRevalidate: true },
    })
  }

  const allLocationIds = Object.values(locationIds)
  for (const serviceId of Object.values(serviceIds)) {
    await payload.update({
      collection: 'services',
      id: serviceId,
      data: { serviceArea: allLocationIds },
      context: { disableRevalidate: true },
    })
  }
  log(`locations: ${allLocationIds.length}`)

  // -- Testimonials --------------------------------------------------------
  const testimonialIds: number[] = []
  for (const testimonial of testimonials) {
    const id = await upsert(
      payload,
      'testimonials',
      testimonial.authorName,
      {
        quote: testimonial.quote,
        rating: testimonial.rating,
        reviewDate: new Date(testimonial.reviewDate).toISOString(),
        source: testimonial.source,
        featured: testimonial.featured,
        // Reproduced verbatim from the company's public review profile, but not
        // yet confirmed with the customer — the client's own brief asks for
        // permission before naming people on the site.
        verified: false,
        relatedService: [serviceIds['garden-feature-lighting']!],
      },
      'authorName',
    )
    testimonialIds.push(id)
  }
  log(`testimonials: ${testimonialIds.length} (all marked unverified pending permission)`)

  // -- Case studies --------------------------------------------------------
  const caseStudies = [
    {
      slug: 'totteridge-common',
      title: 'A garden lit in phases at Totteridge Common',
      clientLocation: 'Private residence, Totteridge Common',
      completedAt: '2024-09-01',
      featured: true,
      image: 'proj-nl-01',
      location: 'totteridge',
      summary:
        'A long-running collaboration with the landscaper, lighting the garden as it was built rather than retrofitting it afterwards — and treated by the client as part of the design, not an add-on.',
      challenge:
        'The garden was being rebuilt in stages over an extended programme, with new levels, planting and hard landscaping arriving phase by phase. Lighting specified at the end would have meant cutting into finished surfaces and compromising on fitting positions.',
      approach:
        'We were brought in early and stayed on site alongside the landscaper throughout. That gave us the opportunity to put light wherever something had been made — a wall, a specimen tree, a change of level — with cable routes laid in before surfaces were closed up. The client gave us the trust and the time to get it right rather than rushing to a fixed date.',
      outcome:
        'A scheme that reads as part of the garden rather than something added to it, with every fitting concealed in daylight. The relationship has continued through subsequent phases of the garden.',
      stats: [
        { value: '3', label: 'phases delivered' },
        { value: '60+', label: 'fittings installed' },
        { value: '10 yr', label: 'fitting warranty' },
      ],
      gallery: ['proj-nl-01', 'proj-nl-02', 'proj-nl-03', 'proj-nl-04'],
    },
    {
      slug: 'north-london-terraced-garden',
      title: 'Terraced levels lit across a north London garden',
      clientLocation: 'Private residence, north London',
      completedAt: '2024-06-01',
      featured: true,
      image: 'proj-two',
      location: 'barnet',
      summary:
        'A steeply terraced garden where lighting the level changes made the space both safe to move through after dark and far larger to the eye.',
      challenge:
        'The garden dropped away from the house across several terraces. After dark it was effectively unusable — the steps were hazardous, and from the house the garden simply ended at the edge of the terrace.',
      approach:
        'Recessed fittings to every step and retaining wall, deliberately shielded so the light falls on the tread rather than into the eye. Uplighting to the specimen trees at the far boundary to draw the eye through and give the garden depth from indoors.',
      outcome:
        'The garden is now used through the evening across all three terraces, and from the kitchen the planting at the far end reads as part of the room.',
      stats: [
        { value: '3', label: 'terraces lit' },
        { value: '4 days', label: 'on site' },
      ],
      gallery: ['proj-two', 'proj-two-path', 'proj-two-property', 'proj-recessed-fence'],
    },
    {
      slug: 'yates-garden-lighting-scheme',
      title: 'A drawn lighting plan for a mature Hertfordshire garden',
      clientLocation: 'Private residence, Hertfordshire',
      completedAt: '2023-10-01',
      featured: false,
      image: 'proj-yates',
      location: 'st-albans',
      summary:
        'A fully drawn scheme worked up from a survey of the existing planting, so the client could see exactly what would be lit — and what deliberately would not be.',
      challenge:
        'An established garden with a great deal worth lighting, and a client who wanted to understand the scheme before committing rather than be talked through a list of fittings.',
      approach:
        'A measured survey followed by a drawn lighting plan showing every fitting position, beam angle and circuit. We walked the garden after dark with sample fittings so the colour temperature could be chosen against the actual brickwork and planting.',
      outcome:
        'The client approved the scheme from the drawing with no changes on site, and the installation ran to the agreed programme.',
      stats: [
        { value: '1', label: 'drawn scheme' },
        { value: '0', label: 'changes on site' },
      ],
      gallery: ['proj-yates', 'proj-large-garden', 'proj-finished', 'proj-landscaping'],
    },
  ]

  const caseStudyIds: Record<string, number> = {}
  for (const study of caseStudies) {
    caseStudyIds[study.slug] = await upsert(payload, 'case-studies', study.slug, {
      title: study.title,
      _status: 'published',
      publishedAt: new Date(study.completedAt).toISOString(),
      completedAt: new Date(study.completedAt).toISOString(),
      summary: study.summary,
      featuredImage: img(study.image),
      clientLocation: study.clientLocation,
      featured: study.featured,
      challenge: study.challenge,
      approach: study.approach,
      outcome: study.outcome,
      stats: study.stats,
      services: [serviceIds['garden-feature-lighting']!],
      location: locationIds[study.location],
      meta: {
        title: `${study.title} | Kingson Garden Electrical`,
        description: study.summary.slice(0, 155),
        image: img(study.image),
        priority: '0.7',
        summary: study.summary,
      },
      layout: [
        {
          blockType: 'gallery',
          layout: 'masonry',
          columns: '3',
          enableLightbox: true,
          eyebrow: 'The garden',
          headingLevel: 'h2',
          heading: 'Photographs from the project',
          images: study.gallery
            .map((name) => ({ image: img(name), caption: null }))
            .filter((entry) => entry.image),
          appearance: appearance('canvas'),
        },
      ],
    })
  }
  log(`case studies: ${Object.keys(caseStudyIds).length}`)

  // -- Blog ----------------------------------------------------------------
  const posts = [
    {
      slug: 'why-garden-lighting-fails',
      title: 'Why most garden lighting fails within three years',
      category: 'guides',
      image: 'detail-uplighting',
      publishedAt: '2026-03-04',
      excerpt:
        'Garden lighting usually fails for four reasons: the wrong fittings, unprotected joints, undersized cable, and nobody coming back to maintain it. Here is what to look for.',
      body: [
        heading('It is almost never the lamp', 'h2'),
        paragraph(
          'When a garden lighting scheme stops working, people assume a bulb has gone. In our experience it is far more often the connection, the cable, or the fitting itself giving up after a couple of British winters. Garden lighting lives outdoors, in water, in soil, through frost. Very little of what is sold for the job is actually built for it.',
        ),
        heading('The four failure points', 'h2'),
        paragraph(
          'Almost every failed installation we are called out to comes down to one of the following.',
        ),
        list([
          '**Indoor-grade fittings used outdoors.** An IP rating on the box is not the same as a fitting designed to sit in a flower bed for a decade. Look for solid brass or 316 stainless steel, not painted aluminium.',
          '**Unprotected joints.** Every connection below ground or below water needs to be properly sealed — resin or gel-filled, not a connector block in a plastic box.',
          '**Undersized cable.** Run low-voltage cable too far on too small a conductor and the voltage drops. The fittings at the end of the run go dim, then the drivers fail early.',
          '**No maintenance.** Gardens grow. An uplighter perfectly aimed at a young tree is aimed at a trunk three years later, and lenses silt up with soil splash.',
        ]),
        heading('What good looks like', 'h2'),
        paragraph(
          'A well-built scheme uses fittings with a genuine warranty behind them, joints made to last as long as the cable, conductors sized for the run rather than for the price, and a service visit once a year to re-aim and clean. None of that is exotic. It is simply what the job requires, and it is the difference between a garden that looks right for a decade and one that is half-dark by the third summer.',
        ),
      ],
    },
    {
      slug: 'low-voltage-vs-mains-garden-lighting',
      title: 'Low-voltage or mains: which is right for your garden?',
      category: 'design',
      image: 'detail-deck',
      publishedAt: '2026-02-11',
      excerpt:
        'Low-voltage systems are safer to work around planting and far easier to extend later. Mains has its place. The decision usually comes down to cable runs and how likely the garden is to change.',
      body: [
        heading('The short answer', 'h2'),
        paragraph(
          'For most residential gardens, a 12V or 24V low-voltage system is the better choice. It is safer to work around planting, the cable does not need burying to the same depth, and adding a fitting in two years’ time is a twenty-minute job rather than a rewire.',
        ),
        heading('When mains makes more sense', 'h2'),
        paragraph(
          'Long runs are where low-voltage struggles. Beyond a certain distance the voltage drop becomes difficult to manage without heavy cable or multiple transformers, and at that point a mains circuit with local drivers is simpler and more reliable. Large or high-output fittings — floodlighting a substantial elevation, for instance — often call for mains too.',
        ),
        heading('What we usually specify', 'h2'),
        paragraph(
          'A hybrid. A mains-fed, weatherproof supply point out in the garden feeding one or more transformers, with low-voltage distribution from there to the fittings. You get the flexibility of low-voltage where the planting is, without fighting voltage drop across the whole site.',
        ),
      ],
    },
    {
      slug: 'choosing-colour-temperature-garden-lighting',
      title: 'Choosing colour temperature for garden lighting',
      category: 'design',
      image: 'detail-tree-uplight',
      publishedAt: '2026-01-21',
      excerpt:
        'Warm white flatters brick, stone and bark. Cooler light suits foliage and water. Most gardens want 2700K, and almost none want anything above 3000K.',
      body: [
        heading('Start at 2700K', 'h2'),
        paragraph(
          'Colour temperature is measured in kelvin. Lower numbers are warmer and more golden; higher numbers are cooler and bluer. For gardens, 2700K is the default worth starting from — it flatters brick, stone, timber and bark, and it sits comfortably alongside the warm light spilling out of the house.',
        ),
        heading('Where cooler light earns its place', 'h2'),
        paragraph(
          'Green foliage can read slightly dull under very warm light, and water often looks better a little cooler. Some designers use 3000K selectively on planting and keep 2700K on hard materials. Above 3000K you are into territory that reads as commercial or institutional, and it will make a garden feel like a car park.',
        ),
        heading('Consistency matters more than the number', 'h2'),
        paragraph(
          'The most common mistake is mixing temperatures by accident — a few replacement lamps bought from a different source, and suddenly half the garden is a different colour. Whatever you choose, record it, and replace like with like. Ask for the CRI too: above 90 is worth paying for outdoors, where you are lighting subtle natural colour.',
        ),
      ],
    },
    {
      slug: 'planning-garden-lighting-with-your-landscaper',
      title: 'Planning lighting with your landscaper, not after them',
      category: 'installation',
      image: 'proj-patio-install',
      publishedAt: '2025-11-19',
      excerpt:
        'Lighting specified during the build costs less, looks better and avoids cutting into finished surfaces. Here is when to bring the electrician in.',
      body: [
        heading('The cheapest time to run a cable is before the paving goes down', 'h2'),
        paragraph(
          'Almost every compromise in a garden lighting scheme traces back to timing. Once the terrace is laid and the borders are planted, fitting positions are dictated by where a cable can still be got to, not by where the light should come from. Bring the lighting in at design stage and the cable routes are simply part of the build.',
        ),
        heading('What we need from the landscaper', 'h2'),
        list([
          'The layout drawing, as early as it exists',
          'Planting positions for anything that will be uplit — specimen trees especially',
          'A week or so of notice before surfaces are closed up',
          'Duct runs under paving and driveways while the ground is open',
        ]),
        heading('Working with designers', 'h2'),
        paragraph(
          'We work regularly alongside landscape architects and garden designers, and we are happy to be the ones who take the lighting off their plate entirely — specifying it, installing it, and picking up any fault that arises afterwards. For a designer, that removes the part of the job most likely to come back.',
        ),
      ],
    },
  ]

  const postIds: Record<string, number> = {}
  for (const post of posts) {
    postIds[post.slug] = await upsert(payload, 'posts', post.slug, {
      title: post.title,
      _status: 'published',
      publishedAt: new Date(post.publishedAt).toISOString(),
      heroImage: img(post.image),
      excerpt: post.excerpt,
      content: richText(...post.body),
      categories: [categoryIds[post.category]!],
      authors: [daveId],
      meta: {
        title: `${post.title} | Kingson Garden Electrical`,
        description: post.excerpt.slice(0, 155),
        image: img(post.image),
        priority: '0.5',
        summary: post.excerpt,
      },
    })
  }

  // Cross-link related reading.
  const slugs = Object.keys(postIds)
  for (const slug of slugs) {
    await payload.update({
      collection: 'posts',
      id: postIds[slug]!,
      data: {
        relatedPosts: slugs.filter((other) => other !== slug).slice(0, 2).map((other) => postIds[other]!),
        relatedServices: [serviceIds['garden-feature-lighting']!],
      },
      context: { disableRevalidate: true },
    })
  }
  log(`blog posts: ${Object.keys(postIds).length}`)

  // -- Downloads -----------------------------------------------------------
  const downloadDefs = [
    {
      slug: 'garden-lighting-planning-guide',
      title: 'The Garden Lighting Planning Guide',
      gated: true,
      category: 'guides',
      thumbnail: 'design-professional',
      description:
        'A twelve-page guide to planning a garden lighting scheme: what to light, what to leave dark, how to choose fittings that survive outdoors, and the questions to ask any installer before you commit.',
      pdf: {
        title: 'The Garden Lighting Planning Guide',
        subtitle: 'Kingson Garden Electrical — kingsonelectrical.co.uk',
        body: [
          'This guide covers how to plan a garden lighting scheme that still looks right in ten years.',
          '1. Decide what the garden is for after dark. Movement, atmosphere, or both? The answer changes everything that follows.',
          '2. Light the structure first. Trees, walls, level changes and water give a garden its shape. Light those and the garden reads as a whole.',
          '3. Leave things dark. Contrast is what makes a lit garden feel considered rather than floodlit.',
          '4. Choose fittings built for outdoors. Solid brass or 316 stainless steel, a genuine IP rating, and a manufacturer warranty measured in years.',
          '5. Size the cable for the run, not for the price. Voltage drop is the most common cause of premature driver failure.',
          '6. Plan the switching. Manual, timer, astro clock or app control — decide before first fix, not after.',
          '7. Budget for maintenance. Gardens grow, and fittings need re-aiming and cleaning once a year.',
          'Questions to ask any installer: What is the warranty on the fittings? How are the joints made? Who comes back if something fails? Are you registered with a competent-person scheme?',
          'Kingson Garden Electrical — 01442 531176 — info@kingsonelectrical.co.uk',
        ],
      },
    },
    {
      slug: 'garden-lighting-maintenance-checklist',
      title: 'Annual Maintenance Checklist',
      gated: false,
      category: 'maintenance',
      thumbnail: 'detail-tree-mount',
      description:
        'A one-page checklist for keeping a garden lighting installation working properly — what to check each year, and what to leave to an electrician.',
      pdf: {
        title: 'Annual Maintenance Checklist',
        subtitle: 'Kingson Garden Electrical — kingsonelectrical.co.uk',
        body: [
          'Once a year, ideally in early autumn before the evenings draw in:',
          'Clean every lens. Soil splash and algae reduce output far more than people expect.',
          'Re-aim uplighters. Trees and shrubs move; a fitting aimed at a canopy three years ago is now lighting a trunk.',
          'Check fittings have not been buried by mulch or growth.',
          'Look for damaged cable where borders have been dug over.',
          'Test the RCD at the consumer unit.',
          'Check the transformer housing is dry and ventilated.',
          'Replace any failed lamps like for like — matching colour temperature and CRI.',
          'Leave to an electrician: anything involving opening joints, transformers, or the consumer unit.',
          'Kingson Garden Electrical — 01442 531176 — info@kingsonelectrical.co.uk',
        ],
      },
    },
  ]

  const downloadIds: Record<string, number> = {}
  for (const download of downloadDefs) {
    const existing = await payload.find({
      collection: 'downloads',
      depth: 0,
      limit: 1,
      where: { slug: { equals: download.slug } },
    })

    const data = {
      title: download.title,
      description: download.description,
      gated: download.gated,
      category: categoryIds[download.category],
      thumbnail: img(download.thumbnail),
      relatedServices: [serviceIds['garden-feature-lighting']!],
      meta: {
        title: `${download.title} | Kingson Garden Electrical`,
        description: download.description.slice(0, 155),
        priority: '0.5',
        summary: download.description,
      },
    }

    if (existing.docs[0]) {
      downloadIds[download.slug] = (existing.docs[0] as any).id
      await payload.update({
        collection: 'downloads',
        id: downloadIds[download.slug]!,
        data: data as any,
        context: { disableRevalidate: true },
      })
    } else {
      const pdf = buildPdf(download.pdf)
      const created = await payload.create({
        collection: 'downloads',
        data: { ...data, slug: download.slug } as any,
        file: {
          data: pdf,
          mimetype: 'application/pdf',
          name: `${download.slug}.pdf`,
          size: pdf.length,
        },
        context: { disableRevalidate: true },
      })
      downloadIds[download.slug] = (created as any).id
    }
  }
  log(`downloads: ${Object.keys(downloadIds).length}`)

  // -- Forms ---------------------------------------------------------------
  const findOrCreateForm = async (title: string, data: Record<string, any>): Promise<number> => {
    const existing = await payload.find({
      collection: 'forms',
      depth: 0,
      limit: 1,
      where: { title: { equals: title } },
    })

    if (existing.docs[0]) {
      await payload.update({ collection: 'forms', id: (existing.docs[0] as any).id, data })
      return (existing.docs[0] as any).id
    }

    const created = await payload.create({ collection: 'forms', data: { ...data, title } })
    return (created as any).id
  }

  const quoteFormId = await findOrCreateForm('Request a quote', {
    submitButtonLabel: 'Send my enquiry',
    confirmationType: 'message',
    confirmationMessage: prose(
      'Thank you — we have your enquiry and will be in touch within one working day to arrange a free consultation.',
    ),
    fields: [
      { blockType: 'stepBreak', stepTitle: 'About your garden', stepDescription: 'A few details so we arrive prepared.' },
      {
        blockType: 'select',
        name: 'projectType',
        label: 'What are you looking for?',
        required: true,
        width: 100,
        options: [
          { label: 'Garden and feature lighting', value: 'lighting' },
          { label: 'Outdoor power and sockets', value: 'power' },
          { label: 'Water feature wiring', value: 'water' },
          { label: 'Hot tub or spa supply', value: 'hottub' },
          { label: 'Maintenance of an existing system', value: 'maintenance' },
          { label: 'Something else', value: 'other' },
        ],
      },
      {
        blockType: 'select',
        name: 'gardenSize',
        label: 'Roughly how large is the garden?',
        width: 50,
        options: [
          { label: 'Courtyard or small garden', value: 'small' },
          { label: 'Medium — up to half an acre', value: 'medium' },
          { label: 'Large — half an acre or more', value: 'large' },
          { label: 'Not sure', value: 'unsure' },
        ],
      },
      {
        blockType: 'select',
        name: 'timescale',
        label: 'When are you hoping to start?',
        width: 50,
        options: [
          { label: 'As soon as possible', value: 'asap' },
          { label: 'Within three months', value: '3m' },
          { label: 'Later this year', value: 'year' },
          { label: 'Just researching', value: 'research' },
        ],
      },
      {
        blockType: 'textarea',
        name: 'details',
        label: 'Tell us about the garden',
        width: 100,
      },
      { blockType: 'stepBreak', stepTitle: 'Your details', stepDescription: 'So we can get back to you.' },
      { blockType: 'text', name: 'name', label: 'Your name', required: true, width: 50 },
      { blockType: 'email', name: 'email', label: 'Email address', required: true, width: 50 },
      { blockType: 'text', name: 'phone', label: 'Telephone', width: 50 },
      { blockType: 'text', name: 'postcode', label: 'Postcode', required: true, width: 50 },
    ],
  })

  const contactFormId = await findOrCreateForm('Contact us', {
    submitButtonLabel: 'Send message',
    confirmationType: 'message',
    confirmationMessage: prose('Thank you — we will get back to you within one working day.'),
    fields: [
      { blockType: 'text', name: 'name', label: 'Your name', required: true, width: 50 },
      { blockType: 'email', name: 'email', label: 'Email address', required: true, width: 50 },
      { blockType: 'text', name: 'phone', label: 'Telephone', width: 50 },
      { blockType: 'text', name: 'postcode', label: 'Postcode', width: 50 },
      { blockType: 'textarea', name: 'message', label: 'How can we help?', required: true, width: 100 },
    ],
  })

  const newsletterFormId = await findOrCreateForm('Newsletter sign-up', {
    submitButtonLabel: 'Sign up',
    confirmationType: 'message',
    confirmationMessage: prose('Thanks — you are on the list.'),
    fields: [{ blockType: 'email', name: 'email', label: 'Email address', required: true, width: 100 }],
  })
  log('forms: 3 (quote, contact, newsletter)')

  // -- Pages ---------------------------------------------------------------
  // Home follows the client's page brief: hero, intro, what we do, how it
  // works, featured projects, trust, closing CTA — with an FAQ added, because
  // it is the block answer engines quote from most readily.
  await upsert(payload, 'pages', 'home', {
    title: 'Garden lighting, designed and installed to the highest standard',
    _status: 'published',
    publishedAt: new Date('2026-01-10').toISOString(),
    meta: {
      title: 'Garden Lighting Design & Installation | Kingson Garden Electrical',
      description:
        'Specialist garden lighting designers and installers since 1985, working across Hertfordshire and north London. Free design consultation. ECA and NICEIC registered.',
      image: img('hero-pathway'),
      priority: '1.0',
      summary:
        'Kingson Garden Electrical designs and installs garden lighting and outdoor electrical systems across Hertfordshire and north London. Free consultation, ECA and NICEIC registered, twelve-month workmanship guarantee.',
    },
    layout: [
      {
        blockType: 'hero',
        height: 'full',
        background: 'image',
        image: img('hero-pathway'),
        overlay: 'gradient',
        align: 'left',
        eyebrow: 'Setting the standard for over 40 years',
        heading: 'Garden lighting, designed and installed to the highest standard',
        subheading:
          'Specialist garden electricians for exceptional gardens across Hertfordshire and north London. We light gardens for people who actually use them — through every season, after dark.',
        links: [
          { link: { type: 'custom', url: '/contact', label: 'Book a free consultation', appearance: 'accent' } },
          { link: { type: 'custom', url: '/services', label: 'What we do', appearance: 'inverseOutline' } },
        ],
        trustSignals: [
          { label: 'ECA registered' },
          { label: 'NICEIC approved' },
          { label: 'Specialists since 1985' },
          { label: '12-month guarantee' },
        ],
      },
      {
        blockType: 'textMedia',
        mediaPosition: 'right',
        mediaRatio: '4/3',
        mediaWidth: 'half',
        media: img('design-professional'),
        eyebrow: 'Why Kingson',
        headingLevel: 'h2',
        heading: 'Most garden lighting is unreliable. It deserves to be done properly.',
        body: prose(
          'We decided a long time ago to stop being electricians who occasionally do gardens, and become specialists who do nothing else. Twenty-five years later, that is still the difference — we know the products, we know how they behave outdoors over a decade, and we know where other people cut corners.',
          'The result is a garden that looks considered rather than floodlit, and a system that still works in ten years.',
        ),
        bullets: [
          { text: 'Fittings chosen to survive outdoors, not to hit a price' },
          { text: 'A design drawn around your planting, levels and materials' },
          { text: 'Every joint sealed, every circuit tested and certified' },
          { text: 'Workmanship guaranteed for twelve months' },
        ],
        links: [{ link: { type: 'custom', url: '/about', label: 'About us', appearance: 'outline' } }],
        appearance: appearance('canvas'),
      },
      {
        blockType: 'cards',
        source: 'collection',
        relationTo: 'services',
        limit: 6,
        columns: '3',
        cardStyle: 'image',
        eyebrow: 'What we do',
        headingLevel: 'h2',
        heading: 'Lighting, power and everything the garden needs',
        intro:
          'From a drawn lighting scheme to the socket at the bottom of the garden — specified together, installed by one team, certified once.',
        links: [{ link: { type: 'custom', url: '/services', label: 'All services', appearance: 'outline' } }],
        appearance: appearance('subtle'),
      },
      {
        blockType: 'featureRow',
        style: 'numbered',
        columns: '4',
        eyebrow: 'How it works',
        headingLevel: 'h2',
        heading: 'From first call to handover',
        intro: 'The first visit is free, and there is no obligation at the end of it.',
        features: [
          {
            icon: 'phone',
            title: 'Free consultation',
            description:
              'Call us and we arrange a visit. We come to you, walk the garden, and bring sample fittings so you can see the light rather than a photograph of it.',
          },
          {
            icon: 'sparkles',
            title: 'Design and quote',
            description:
              'We work up a lighting plan around your planting and levels, and discuss switching, finishes, beam angles and colour temperature. You get a drawn scheme and an itemised quotation.',
          },
          {
            icon: 'zap',
            title: 'Installation',
            description:
              'Our engineers arrive on the agreed date with everything the job needs. We work cleanly, we do not disappear to a wholesaler mid-job, and we hit the programme we set out.',
          },
          {
            icon: 'shield',
            title: 'Testing and aftercare',
            description:
              'Everything is tested and certified before handover. Workmanship is guaranteed for twelve months, and we honour the manufacturer warranties on your fittings.',
          },
        ],
        links: [{ link: { type: 'custom', url: '/contact', label: 'Start with a free visit', appearance: 'accent' } }],
        appearance: appearance('canvas'),
      },
      {
        blockType: 'cards',
        source: 'collection',
        relationTo: 'case-studies',
        limit: 3,
        columns: '3',
        cardStyle: 'overlay',
        eyebrow: 'Recent work',
        headingLevel: 'h2',
        heading: 'Gardens we have lit',
        links: [{ link: { type: 'custom', url: '/case-studies', label: 'All projects', appearance: 'outline' } }],
        appearance: appearance('ink'),
      },
      {
        blockType: 'featureRow',
        style: 'card',
        columns: '3',
        eyebrow: 'Reasons to choose us',
        headingLevel: 'h2',
        heading: 'What you get that you would struggle to get elsewhere',
        features: [
          {
            icon: 'award',
            title: 'Specialists, not generalists',
            description:
              'Twenty-five years doing only garden lighting. We know the products and the failure modes because we have seen them over decades, not seasons.',
          },
          {
            icon: 'shield',
            title: 'Properly accredited',
            description:
              'ECA and NICEIC registered. Every installation is tested and certified, and you are insured through the scheme — we do not take chances with that.',
          },
          {
            icon: 'sparkles',
            title: 'The best materials',
            description:
              'Hunza and in-lite fittings as standard — solid brass and stainless steel, with manufacturer warranties measured in years, not months.',
          },
          {
            icon: 'users',
            title: 'A team you get to know',
            description:
              'The same friendly engineers, job after job. We invest in our people and hold them to a standard, and clients notice the difference.',
          },
          {
            icon: 'leaf',
            title: 'Partners to landscapers',
            description:
              'We take the whole headache of garden lighting off a landscaper’s hands — specification, installation, and any fault that comes up afterwards.',
          },
          {
            icon: 'clock',
            title: 'We come back',
            description:
              'Gardens grow and things occasionally fail. Our workmanship is guaranteed for a year, and we honour the manufacturer warranties on everything we fit.',
          },
        ],
        appearance: appearance('subtle'),
      },
      {
        blockType: 'testimonialCarousel',
        source: 'latest',
        limit: 8,
        layout: 'carousel',
        showRatingSummary: true,
        eyebrow: 'In our clients’ words',
        headingLevel: 'h2',
        heading: 'What people say afterwards',
        appearance: appearance('canvas'),
      },
      {
        blockType: 'faq',
        eyebrow: 'Questions',
        headingLevel: 'h2',
        heading: 'Frequently asked',
        emitStructuredData: true,
        items: [
          {
            question: 'How much does garden lighting cost?',
            answer: prose(
              'A typical installed scheme for a medium-sized garden starts at around £3,500 excluding VAT. The final figure depends on the size of the garden, how much of it you want lit, and the fittings chosen. Every garden is quoted individually after a free site visit, and the quotation is itemised.',
            ),
          },
          {
            question: 'Do you charge for the first visit?',
            answer: prose(
              'No. The design consultation is free and carries no obligation. We come to you, walk the garden, bring sample fittings so you can see what the light actually does, and follow up with a drawn plan and a written quotation.',
            ),
          },
          {
            question: 'What areas do you cover?',
            answer: prose(
              'We work across Hertfordshire and north London from our base in Hemel Hempstead — including St Albans, Harpenden, Berkhamsted, Radlett, Watford, Rickmansworth, Chorleywood, Barnet and Totteridge. If you are just outside that, call us and ask.',
            ),
          },
          {
            question: 'How long does an installation take?',
            answer: prose(
              'Most residential gardens take between two and five days on site. We agree dates in advance and arrive with everything the job needs, so the programme holds.',
            ),
          },
          {
            question: 'What guarantee do you offer?',
            answer: prose(
              'Our workmanship is guaranteed for twelve months. The fittings we install carry their own manufacturer warranties — up to ten years on some products — and we honour those on your behalf. If anything fails, we come back and rectify it.',
            ),
          },
          {
            question: 'Do you work with landscapers and garden designers?',
            answer: prose(
              'Frequently, and it is the best way to do it. Lighting specified during the build costs less and looks better than lighting retrofitted afterwards. For designers, we take the whole lighting element off your plate — including any fault that arises later.',
            ),
          },
        ],
        appearance: appearance('surface'),
      },
      {
        blockType: 'cta',
        layout: 'banner',
        eyebrow: 'Get started',
        heading: 'Book a free garden lighting consultation',
        body: 'We will come to you, walk the garden, and show you the fittings in place. No charge, no obligation.',
        backgroundImage: img('hero-footer'),
        phoneCta: true,
        links: [{ link: { type: 'custom', url: '/contact', label: 'Request a quote', appearance: 'accent' } }],
        appearance: appearance('ink'),
      },
    ],
  })

  await upsert(payload, 'pages', 'about', {
    title: 'About Kingson',
    _status: 'published',
    publishedAt: new Date('2026-01-10').toISOString(),
    meta: {
      title: 'About Kingson Garden Electrical',
      description:
        'Founded in 1985 and specialising exclusively in garden lighting for twenty-five years. ECA and NICEIC registered, working across Hertfordshire and north London.',
      image: img('proj-yates'),
      priority: '0.8',
      summary:
        'The story of Kingson Garden Electrical: founded 1985, specialising in garden lighting since the early 2000s, ECA and NICEIC registered.',
    },
    layout: [
      {
        blockType: 'hero',
        height: 'half',
        background: 'image',
        image: img('proj-yates'),
        overlay: 'scrim',
        align: 'left',
        eyebrow: 'About us',
        heading: 'Perfectionists in one field',
        subheading:
          'We stopped doing everything so we could be the best at one thing. Twenty-five years later, garden lighting is still all we do.',
      },
      {
        blockType: 'textMedia',
        mediaPosition: 'left',
        mediaRatio: '3/2',
        mediaWidth: 'half',
        media: img('team-dave'),
        eyebrow: 'Our story',
        headingLevel: 'h2',
        heading: 'From Lucas Aerospace to the bottom of your garden',
        body: prose(
          'Dave King began a five-year engineering apprenticeship at Lucas Aerospace at sixteen and stayed on for another four years. In 1985 he started an electrical business in Hemel Hempstead doing domestic work, then moved into commercial contracting — shopfitting, offices, schools and main-dealer garages.',
          'The decision that shaped the company came next: stop doing everything, and specialise. Gardens were the choice, and the reasoning was simple — most garden lighting is unreliable because it is installed by people who do not do it often enough to be good at it. We believe we are now the best garden lighting installers in the country, and that is only possible because it is the only thing we do.',
        ),
        appearance: appearance('canvas'),
      },
      {
        blockType: 'featureRow',
        style: 'plain',
        columns: '3',
        eyebrow: 'What we care about',
        headingLevel: 'h2',
        heading: 'The standards we hold ourselves to',
        features: [
          {
            icon: 'shield',
            title: 'Safety, without exception',
            description:
              'ECA standards throughout, with real emphasis on testing. Our clients are insured through the scheme. We do not take chances with that.',
          },
          {
            icon: 'award',
            title: 'Integrity and reputation',
            description:
              'The best materials, the best equipment, the best products. No shortcuts, because the shortcuts are exactly what fails three winters later.',
          },
          {
            icon: 'users',
            title: 'Investing in our people',
            description:
              'We help our engineers progress and develop, show them the standard and hold them to it. Familiar faces, job after job.',
          },
        ],
        appearance: appearance('subtle'),
      },
      {
        blockType: 'gallery',
        layout: 'editorial',
        columns: '3',
        enableLightbox: true,
        eyebrow: 'Our work',
        headingLevel: 'h2',
        heading: 'A selection of gardens',
        images: [
          { image: img('proj-nl-01'), emphasis: true },
          { image: img('proj-large-garden') },
          { image: img('detail-uplighting') },
          { image: img('proj-two-path') },
          { image: img('proj-recessed-home') },
          { image: img('detail-underwater') },
        ].filter((entry) => entry.image),
        appearance: appearance('canvas'),
      },
      {
        blockType: 'cta',
        layout: 'centered',
        eyebrow: 'Work with us',
        heading: 'Tell us about your garden',
        body: 'The first visit is free and there is no obligation at the end of it.',
        phoneCta: true,
        links: [{ link: { type: 'custom', url: '/contact', label: 'Get in touch', appearance: 'accent' } }],
        appearance: appearance('brand'),
      },
    ],
  })

  await upsert(payload, 'pages', 'contact', {
    title: 'Contact',
    _status: 'published',
    publishedAt: new Date('2026-01-10').toISOString(),
    meta: {
      title: 'Contact Kingson Garden Electrical',
      description:
        'Request a free garden lighting consultation. Call 01442 531176 or send us a few details about your garden.',
      image: img('hero-contact'),
      priority: '0.8',
      summary:
        'Contact Kingson Garden Electrical on 01442 531176 or info@kingsonelectrical.co.uk to arrange a free garden lighting consultation.',
    },
    layout: [
      {
        blockType: 'hero',
        height: 'compact',
        background: 'texture',
        texture: 'forest',
        align: 'left',
        eyebrow: 'Get in touch',
        heading: 'Request a free consultation',
        subheading:
          'Tell us a little about the garden and we will be in touch within one working day to arrange a visit.',
      },
      {
        blockType: 'formBlock',
        form: quoteFormId,
        layout: 'steps',
        width: 'narrow',
        enableIntro: false,
        appearance: appearance('canvas'),
      },
      {
        blockType: 'featureRow',
        style: 'plain',
        columns: '3',
        heading: 'Other ways to reach us',
        headingLevel: 'h2',
        features: [
          { icon: 'phone', title: 'Telephone', description: '01442 531176, Monday to Friday, 8am to 5pm.' },
          { icon: 'mapPin', title: 'Our workshop', description: 'Unit 4, Maylands Business Centre, Redbourn Road, Hemel Hempstead HP2 7ES.' },
          { icon: 'clock', title: 'Response time', description: 'We reply to every enquiry within one working day.' },
        ],
        appearance: appearance('subtle'),
      },
    ],
  })

  await upsert(payload, 'pages', 'for-landscapers', {
    title: 'For landscapers and garden designers',
    _status: 'published',
    publishedAt: new Date('2026-01-12').toISOString(),
    meta: {
      title: 'Garden Lighting for Landscapers & Designers | Kingson',
      description:
        'We take garden lighting off your plate entirely — specification, installation and aftercare — so you can hand the whole element to one specialist.',
      image: img('proj-landscaping'),
      priority: '0.8',
      summary:
        'Kingson partners with landscape architects and garden designers, handling lighting specification, installation and ongoing fault resolution.',
    },
    layout: [
      {
        blockType: 'hero',
        height: 'half',
        background: 'image',
        image: img('proj-landscaping'),
        overlay: 'gradient',
        align: 'left',
        eyebrow: 'Trade partners',
        heading: 'Say goodbye to the stress of garden lighting',
        subheading:
          'We take on all the headaches that come with lighting a garden — and when a fault arises, we are the ones who come and solve it.',
        links: [{ link: { type: 'custom', url: '/contact', label: 'Talk to us', appearance: 'accent' } }],
      },
      {
        blockType: 'featureRow',
        style: 'card',
        columns: '3',
        eyebrow: 'How we work with you',
        headingLevel: 'h2',
        heading: 'One specialist, start to finish',
        features: [
          { icon: 'sparkles', title: 'Specified at design stage', description: 'Bring us in early and cable routes become part of the build rather than a compromise afterwards.' },
          { icon: 'wrench', title: 'Installed around your programme', description: 'We work to your dates and coordinate first fix before surfaces are closed up.' },
          { icon: 'shield', title: 'Supported afterwards', description: 'Any lighting fault that arises later comes to us, not to you.' },
        ],
        appearance: appearance('canvas'),
      },
      {
        blockType: 'gatedDownload',
        download: downloadIds['garden-lighting-planning-guide'],
        coverImage: img('design-professional'),
        eyebrow: 'Free guide',
        headingLevel: 'h2',
        heading: 'The Garden Lighting Planning Guide',
        intro:
          'Twelve pages on planning a scheme that still looks right in ten years — written for people who specify gardens for a living.',
        bullets: [
          { text: 'What to light, and what to deliberately leave dark' },
          { text: 'Choosing fittings that survive a British winter' },
          { text: 'Cable, voltage drop and why schemes go dim' },
          { text: 'The questions to ask any lighting installer' },
        ],
        askName: true,
        submitLabel: 'Send me the guide',
        successMessage: 'Thanks — your guide is ready to download.',
        consentText: prose(
          'We will email you the guide and occasionally send garden lighting notes. Unsubscribe any time.',
        ),
        appearance: appearance('subtle'),
      },
    ],
  })

  await upsert(payload, 'pages', 'privacy-policy', {
    title: 'Privacy policy',
    _status: 'published',
    publishedAt: new Date('2026-01-10').toISOString(),
    meta: {
      title: 'Privacy Policy | Kingson Garden Electrical',
      description: 'How Kingson Garden Electrical collects, uses and protects your personal data.',
      noindex: false,
      priority: '0.3',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            measure: 'prose',
            richText: richText(
              heading('Privacy policy', 'h2'),
              paragraph(
                'This is placeholder text. Replace it with your own privacy policy before the site goes live — it must describe what personal data you collect through the enquiry and download forms, your lawful basis for processing it, how long you keep it, and how someone can request its deletion.',
              ),
              heading('What we collect', 'h3'),
              paragraph(
                'When you submit an enquiry or download a guide, we collect the details you provide — typically your name, email address, telephone number and postcode — along with the content of your message.',
              ),
              heading('Contact', 'h3'),
              paragraph(
                'For any question about your data, write to info@kingsonelectrical.co.uk or call 01442 531176.',
              ),
            ),
          },
        ],
        appearance: appearance('canvas'),
      },
    ],
  })
  log('pages: home, about, contact, for-landscapers, privacy-policy')

  // -- Globals -------------------------------------------------------------
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      businessName: business.name,
      legalName: business.legalName,
      tagline: business.tagline,
      description: business.description,
      logo: img('logo-kingson'),
      logoMark: img('favicon-kingson'),
      foundingYear: business.foundingYear,
      phone: business.phone,
      phoneE164: business.phoneE164,
      email: business.email,
      address: business.address,
      latitude: business.latitude,
      longitude: business.longitude,
      priceRange: '£££',
      openingHours: [
        {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      accreditations: [
        { name: 'ECA — Electrical Contractors’ Association', logo: img('accred-eca'), url: 'https://www.eca.co.uk' },
        { name: 'NICEIC Approved Contractor', logo: img('accred-niceic'), url: 'https://www.niceic.com' },
        { name: 'ELECSA Registered', logo: img('accred-elecsa') },
      ],
      socialProfiles: [
        { platform: 'facebook', url: 'https://www.facebook.com/GardenElectrician/' },
      ],
      defaultMetaImage: img('hero-pathway'),
      titleTemplate: '%s | Kingson Garden Electrical',
      llmsSummary: business.llmsSummary,
      allowAiTraining: true,
      enquiryRecipients: [{ email: business.email }],
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      showPhone: true,
      navItems: [
        {
          label: 'Services',
          type: 'megamenu',
          link: { type: 'custom', url: '/services' },
          megamenu: {
            description:
              'Lighting, power and everything else a garden needs — specified and installed by one specialist team.',
            columns: [
              { heading: 'All services', source: 'services' },
            ],
            featured: {
              enabled: true,
              image: img('design-professional'),
              title: 'Free design consultation',
              description: 'We visit, bring the fittings, and show you the light in place.',
              link: { type: 'custom', url: '/contact', label: 'Book a visit' },
            },
          },
        },
        {
          label: 'Projects',
          type: 'link',
          link: { type: 'custom', url: '/case-studies' },
        },
        {
          label: 'Areas',
          type: 'megamenu',
          link: { type: 'custom', url: '/areas-we-cover' },
          megamenu: {
            description: 'Working across Hertfordshire and north London from our base in Hemel Hempstead.',
            columns: [{ heading: 'Areas we cover', source: 'locations' }],
          },
        },
        { label: 'For landscapers', type: 'link', link: { type: 'custom', url: '/for-landscapers' } },
        { label: 'About', type: 'link', link: { type: 'custom', url: '/about' } },
        { label: 'Journal', type: 'link', link: { type: 'custom', url: '/blog' } },
      ],
      ctas: [
        { link: { type: 'custom', url: '/contact', label: 'Get a free quote', appearance: 'accent' } },
      ],
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      showAccreditations: true,
      columns: [
        {
          heading: 'Services',
          links: services.slice(0, 5).map((service) => ({
            link: { type: 'custom' as const, url: `/services/${service.slug}`, label: service.title },
          })),
        },
        {
          heading: 'Areas',
          links: locations.slice(0, 6).map((location) => ({
            link: { type: 'custom' as const, url: `/areas-we-cover/${location.slug}`, label: location.name },
          })),
        },
        {
          heading: 'Company',
          links: [
            { link: { type: 'custom', url: '/about', label: 'About us' } },
            { link: { type: 'custom', url: '/case-studies', label: 'Projects' } },
            { link: { type: 'custom', url: '/for-landscapers', label: 'For landscapers' } },
            { link: { type: 'custom', url: '/blog', label: 'Journal' } },
            { link: { type: 'custom', url: '/downloads', label: 'Guides' } },
            { link: { type: 'custom', url: '/contact', label: 'Contact' } },
          ],
        },
      ],
      newsletter: {
        enabled: true,
        heading: 'Garden lighting notes',
        description:
          'Occasional design ideas, maintenance reminders and project photography. No more than once a month.',
        form: newsletterFormId,
        consentText: 'We’ll only use your address for this newsletter. Unsubscribe any time.',
      },
      legalLinks: [
        { link: { type: 'custom', url: '/privacy-policy', label: 'Privacy policy' } },
      ],
    },
    context: { disableRevalidate: true },
  })
  log('globals: site settings, header, footer')

  console.log('\nSeed complete.\n')
  console.log(`  Admin:    /admin`)
  console.log(`  Email:    ${adminEmail}`)
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log(`  Password: ${adminPassword}  <- change this immediately\n`)
  }

  process.exit(0)
}

seed().catch((error: any) => {
  // Drizzle wraps the driver error; the useful part is the cause.
  console.error('\nSeed failed:', error?.message?.slice(0, 200))
  if (error?.cause) {
    console.error('Cause:', error.cause?.message || error.cause)
    if (error.cause?.detail) console.error('Detail:', error.cause.detail)
    if (error.cause?.hint) console.error('Hint:', error.cause.hint)
  }
  process.exit(1)
})
