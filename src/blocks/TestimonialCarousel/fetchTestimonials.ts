import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Where } from 'payload'

import type { Testimonial } from '@/payload-types'

export const fetchTestimonials = async ({
  limit = 8,
  selected,
  service,
  source,
}: {
  limit?: number | null
  selected?: (Testimonial | number)[] | null
  service?: { id: number } | number | null
  source?: string | null
}): Promise<Testimonial[]> => {
  if (source === 'selection') {
    return (selected || []).filter((entry): entry is Testimonial => typeof entry === 'object')
  }

  const payload = await getPayload({ config: configPromise })

  const where: Where = {}
  if (source === 'featured') where.featured = { equals: true }
  if (service) {
    where.relatedService = { in: [typeof service === 'object' ? service.id : service] }
  }

  const result = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: limit || 8,
    sort: '-reviewDate',
    ...(Object.keys(where).length ? { where } : {}),
  })

  return result.docs
}
