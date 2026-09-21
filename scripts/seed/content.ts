/**
 * Seed content for Kingson Garden Electrical.
 *
 * Business facts (address, phone, accreditations, founding) come from the
 * company's own site and listings. Voice and proof points come from the staff
 * interview supplied by the client. Customer reviews are reproduced verbatim
 * from the company's public review profile — see the note in README before
 * publishing, as the client's own brief asks for permission before naming
 * customers on the site.
 */

export const business = {
  name: 'Kingson Garden Electrical',
  legalName: 'Kingson Electrical Ltd',
  tagline: 'Setting the standard for over 40 years',
  description:
    'Kingson Garden Electrical designs and installs garden lighting and outdoor electrical systems for exceptional gardens across Hertfordshire and north London. Specialist garden electricians since 1985, working in low-voltage and mains lighting, outdoor power, water features and hot tubs.',
  llmsSummary:
    'Kingson Garden Electrical (trading as Kingson Electrical Ltd) is a specialist garden lighting and outdoor electrical contractor based in Hemel Hempstead, Hertfordshire. Established in 1985 and focused exclusively on gardens for the last 25 years, the company designs and installs garden and feature lighting, outdoor power and sockets, water feature wiring and hot tub installations. It works across Hertfordshire, north London and the surrounding counties, frequently in partnership with landscape architects and garden designers on high-end residential gardens. The company is ECA and NICEIC registered, installs Hunza and in-lite fittings, offers a free design consultation, and guarantees its workmanship for twelve months. Contact: 01442 531176, info@kingsonelectrical.co.uk.',
  phone: '01442 531176',
  phoneE164: '+441442531176',
  email: 'info@kingsonelectrical.co.uk',
  address: {
    streetAddress: 'Unit 4, Maylands Business Centre, Redbourn Road',
    addressLocality: 'Hemel Hempstead',
    addressRegion: 'Hertfordshire',
    postalCode: 'HP2 7ES',
    addressCountry: 'GB',
  },
  latitude: 51.7657,
  longitude: -0.4407,
  foundingYear: 1985,
}

export const services = [
  {
    slug: 'garden-feature-lighting',
    title: 'Garden & Feature Lighting',
    icon: 'lightbulb',
    featured: true,
    order: 1,
    image: 'hero-pathway',
    shortDescription:
      'Lighting designed around your planting, levels and materials — so the garden reads beautifully after dark and stays reliable for years.',
    metaDescription:
      'Specialist garden and feature lighting design and installation across Hertfordshire and north London. Hunza and in-lite fittings, twelve-month workmanship guarantee.',
    summary:
      'Bespoke garden lighting design and installation for high-end residential gardens in Hertfordshire and north London.',
    priceFrom: 3500,
    priceNote: 'typical installed scheme, excluding VAT. Every garden is quoted individually.',
    deliverables: [
      'Free on-site design consultation with fittings to handle',
      'A lighting plan drawn around the planting and the levels',
      'Uplighting to specimen trees and architectural planting',
      'Path, step and level-change lighting for safe movement',
      'Discreet cable routing and IP-rated joints throughout',
      'Switching by manual, timer, astro or phone control',
      'Full electrical testing and certification on completion',
      'Twelve-month workmanship guarantee',
    ],
    intro:
      'Most garden lighting is unreliable. It is installed by someone who does not specialise in it, using fittings that were never meant to sit outdoors through a British winter, and it fails within a couple of seasons. We have spent twenty-five years doing only this.',
  },
  {
    slug: 'outdoor-power-sockets',
    title: 'Outdoor Power & Sockets',
    icon: 'zap',
    featured: true,
    order: 2,
    image: 'proj-driveway',
    shortDescription:
      'Weatherproof sockets, garden office supplies and armoured circuits, installed where you actually need them and certified to Part P.',
    metaDescription:
      'Outdoor power and weatherproof socket installation for gardens, garden offices and outbuildings across Hertfordshire and north London.',
    summary:
      'Weatherproof outdoor sockets, garden office supplies and armoured garden circuits, fully tested and certified.',
    priceFrom: 450,
    priceNote: 'for a single weatherproof outdoor socket on an existing circuit, excluding VAT.',
    deliverables: [
      'IP-rated weatherproof sockets and isolators',
      'Armoured supplies to garden offices, studios and outbuildings',
      'Dedicated circuits for pumps, heaters and machinery',
      'Correctly buried and protected cable routes',
      'RCD protection and Part P certification',
    ],
    intro:
      'A garden that gets used through the seasons needs power in it — for the office at the bottom of the garden, the pump, the heater, the mower. Done properly, it is invisible.',
  },
  {
    slug: 'water-feature-wiring',
    title: 'Water Feature Wiring',
    icon: 'droplet',
    featured: true,
    order: 3,
    image: 'detail-underwater',
    shortDescription:
      'Pumps, filtration and submerged lighting wired to the standards water demands — the part of a water feature nobody sees and everybody depends on.',
    metaDescription:
      'Water feature and pond electrical installation: pumps, filtration and underwater lighting, wired and certified by specialist garden electricians.',
    summary:
      'Electrical installation for ponds, rills, pools and water features, including submerged lighting and pump supplies.',
    deliverables: [
      'Pump and filtration supplies with correct isolation',
      'Submerged and submersible lighting installation',
      'Equipotential bonding around water',
      'IP68 joints and marine-grade terminations',
      'Testing and certification for wet environments',
    ],
    intro:
      'Water and electricity is where corner-cutting shows up fastest. Every joint below the waterline is made to last, bonded correctly and tested before we leave.',
  },
  {
    slug: 'hot-tub-spa-installations',
    title: 'Hot Tub & Spa Installations',
    icon: 'home',
    featured: true,
    order: 4,
    image: 'proj-patio',
    shortDescription:
      'The dedicated, RCD-protected supply a hot tub actually requires — sized correctly, buried properly and signed off.',
    metaDescription:
      'Hot tub and spa electrical installation across Hertfordshire and north London. Dedicated RCD-protected supplies, correctly sized and certified.',
    summary: 'Dedicated electrical supplies for hot tubs, swim spas and saunas.',
    priceFrom: 850,
    priceNote: 'for a typical dedicated hot tub supply, excluding VAT.',
    deliverables: [
      'Load assessment and correctly sized cable',
      'Dedicated RCD-protected circuit from the consumer unit',
      'Weatherproof rotary isolator within reach of the tub',
      'Armoured cable, buried to depth',
      'Certification and handover documentation',
    ],
    intro:
      'A hot tub is a continuous, high-current load sitting outdoors in water. It needs its own circuit and its own isolator, not an extension from the garage.',
  },
  {
    slug: 'lighting-design-consultation',
    title: 'Lighting Design & Consultation',
    icon: 'sparkles',
    featured: false,
    order: 5,
    image: 'design-professional',
    shortDescription:
      'A free first visit with fittings in hand, so you can see the light — beam angle, warmth and finish — before anything is specified.',
    metaDescription:
      'Free garden lighting design consultation. We visit, bring sample fittings, and produce a lighting plan for your garden.',
    summary:
      'Free on-site garden lighting design consultation and scheme drawings, including for landscape architects and garden designers.',
    deliverables: [
      'A site visit at no cost and no obligation',
      'Sample fittings to see in your own garden',
      'Guidance on colour temperature, beam angle and finish',
      'A drawn lighting plan and detailed written quotation',
      'Collaboration with your landscape architect or designer',
    ],
    intro:
      'Photographs of fittings tell you very little. We bring the products to you, in your garden, after dark if that helps, so the decisions get made on what the light actually does.',
  },
  {
    slug: 'maintenance-aftercare',
    title: 'Maintenance & Aftercare',
    icon: 'wrench',
    featured: false,
    order: 6,
    image: 'detail-uplighting',
    shortDescription:
      'Annual servicing, re-aiming as planting matures, and a guarantee we actually honour — including the manufacturer warranties on your fittings.',
    metaDescription:
      'Garden lighting maintenance and aftercare: annual servicing, re-aiming, fault finding and warranty support across Hertfordshire and north London.',
    summary:
      'Servicing, fault finding and warranty support for garden lighting installations, including schemes we did not install.',
    deliverables: [
      'Annual service visit and full system test',
      'Re-aiming and adjustment as planting grows in',
      'Lamp and fitting replacement under manufacturer warranty',
      'Fault finding on existing and inherited installations',
      'Twelve-month guarantee on all our workmanship',
    ],
    intro:
      'Gardens grow. A tree that was uplit perfectly three years ago has moved. We come back, re-aim, clean the lenses and test the system — and if something has failed, we put it right.',
  },
]

export const locations = [
  {
    slug: 'hemel-hempstead',
    name: 'Hemel Hempstead',
    county: 'Hertfordshire',
    postcodes: ['HP1', 'HP2', 'HP3'],
    latitude: 51.7526,
    longitude: -0.4692,
    radius: 12,
    image: 'hero-bg',
    intro:
      'Our workshop and stores are in Maylands, so Hemel is the area we know best. Much of our work here is in the older parts of Boxmoor and Felden, where mature gardens and established trees give plenty to light, and where cable routes have to be worked around root protection areas rather than through them.',
  },
  {
    slug: 'st-albans',
    name: 'St Albans',
    county: 'Hertfordshire',
    postcodes: ['AL1', 'AL2', 'AL3', 'AL4'],
    latitude: 51.7520,
    longitude: -0.3360,
    radius: 12,
    image: 'proj-yates',
    intro:
      'A great deal of our St Albans work sits inside conservation areas, where external fittings need to be discreet in daylight as well as effective after dark. We favour recessed and ground-level fittings here, and warm colour temperatures that suit brick and flint rather than flattening them.',
  },
  {
    slug: 'harpenden',
    name: 'Harpenden',
    county: 'Hertfordshire',
    postcodes: ['AL5'],
    latitude: 51.8175,
    longitude: -0.3556,
    radius: 10,
    image: 'proj-large-garden',
    intro:
      'Harpenden gardens tend to be generous and heavily planted, often with specimen trees worth lighting properly. We are frequently brought in by landscape architects here at the design stage, which is always the point at which lighting works out best and costs least.',
  },
  {
    slug: 'berkhamsted',
    name: 'Berkhamsted',
    county: 'Hertfordshire',
    postcodes: ['HP4'],
    latitude: 51.7607,
    longitude: -0.5626,
    radius: 10,
    image: 'proj-landscaping',
    intro:
      'Berkhamsted sits on the edge of the Chilterns, and many gardens here run steeply away from the house. Level changes are the opportunity: lighting steps, retaining walls and terraces makes the garden safe to move through and gives the scheme its structure.',
  },
  {
    slug: 'radlett',
    name: 'Radlett',
    county: 'Hertfordshire',
    postcodes: ['WD7'],
    latitude: 51.6850,
    longitude: -0.3190,
    radius: 10,
    image: 'proj-two',
    intro:
      'Radlett has a concentration of large, recently landscaped gardens, often with pools, outdoor kitchens and garden rooms that all need power as well as light. We do a lot of integrated work here — lighting, outdoor sockets and hot tub supplies specified together as one installation.',
  },
  {
    slug: 'totteridge',
    name: 'Totteridge',
    county: 'North London',
    postcodes: ['N20'],
    latitude: 51.6280,
    longitude: -0.1900,
    radius: 8,
    image: 'proj-nl-01',
    intro:
      'Totteridge Common and the surrounding lanes hold some of the largest private gardens in north London. Our work here has typically been long-running collaborations with landscapers, lighting a garden in phases as it is built rather than retrofitting once the planting is in.',
  },
  {
    slug: 'barnet',
    name: 'Barnet',
    county: 'North London',
    postcodes: ['EN4', 'EN5', 'N20'],
    latitude: 51.6520,
    longitude: -0.1990,
    radius: 10,
    image: 'proj-nl-02',
    intro:
      'From Hadley Green to Arkley, Barnet gardens vary enormously in size but share a lot of mature tree cover. Uplighting established oaks and limes transforms these gardens after dark, and it is work that has to be done carefully around roots and tree health.',
  },
  {
    slug: 'rickmansworth',
    name: 'Rickmansworth',
    county: 'Hertfordshire',
    postcodes: ['WD3'],
    latitude: 51.6390,
    longitude: -0.4680,
    radius: 10,
    image: 'proj-recessed-fence',
    intro:
      'Water is a recurring theme in Rickmansworth — the Chess and the Colne, and a good number of gardens with ponds and formal rills. That brings its own electrical requirements, and it is the sort of work that rewards doing once, properly.',
  },
  {
    slug: 'watford',
    name: 'Watford',
    county: 'Hertfordshire',
    postcodes: ['WD17', 'WD18', 'WD19', 'WD24', 'WD25'],
    latitude: 51.6560,
    longitude: -0.3960,
    radius: 10,
    image: 'proj-recessed-home',
    intro:
      'Watford work ranges from compact courtyard gardens in Cassiobury, where a handful of well-placed fittings does everything, to larger properties on the edge of the town. Small gardens are not easier — with less space, every fitting has to earn its place.',
  },
  {
    slug: 'chorleywood',
    name: 'Chorleywood',
    county: 'Hertfordshire',
    postcodes: ['WD3'],
    latitude: 51.6540,
    longitude: -0.5180,
    radius: 8,
    image: 'proj-two-property',
    intro:
      'Chorleywood gardens back onto common and woodland in many cases, which changes the brief: the aim is usually to light the garden without throwing light into the trees beyond it. Controlled beam angles and proper shielding matter more here than raw output.',
  },
]

/**
 * Reproduced verbatim from the company's public review profile.
 * Reviews that were truncated at source have been left out rather than
 * completed by inference.
 */
export const testimonials = [
  {
    quote: 'Excellent service as always, I would highly recommend for your garden lighting',
    authorName: 'Chris Peters',
    rating: 5,
    reviewDate: '2026-04-15',
    source: 'other',
    featured: true,
  },
  {
    quote: "This company seem to 'go the extra mile' on a job, leaving the site clean",
    authorName: 'Paul Skelton',
    rating: 5,
    reviewDate: '2026-04-02',
    source: 'other',
    featured: true,
  },
  {
    quote: 'Amazing service',
    authorName: 'Chin Din',
    rating: 5,
    reviewDate: '2024-09-10',
    source: 'other',
    featured: false,
  },
  {
    quote: 'All Good',
    authorName: 'Neil Adams',
    rating: 5,
    reviewDate: '2024-06-18',
    source: 'other',
    featured: false,
  },
]
