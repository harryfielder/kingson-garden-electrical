import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Location, Service } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSiteSettings } from '@/utilities/getSiteSettings'

import { HeaderClient, type MegamenuColumnData } from './Component.client'

/**
 * Resolves the megamenu's auto-populated columns on the server.
 *
 * Columns sourced from Services or Areas are fetched once here rather than in
 * the client component, so navigation costs no client-side requests and stays
 * present in the initial HTML for crawlers.
 */
export async function Header() {
  const [headerData, settings] = await Promise.all([
    getCachedGlobal('header', 2)(),
    getSiteSettings(),
  ])

  const needsServices = headerData.navItems?.some((item) =>
    item.megamenu?.columns?.some((column) => column.source === 'services'),
  )
  const needsLocations = headerData.navItems?.some((item) =>
    item.megamenu?.columns?.some((column) => column.source === 'locations'),
  )

  const payload = await getPayload({ config: configPromise })

  const [services, locations] = await Promise.all([
    needsServices
      ? payload.find({
          collection: 'services',
          depth: 0,
          limit: 12,
          sort: 'order',
          where: { _status: { equals: 'published' } },
        })
      : null,
    needsLocations
      ? payload.find({
          collection: 'locations',
          depth: 0,
          limit: 16,
          sort: 'name',
          where: { _status: { equals: 'published' } },
        })
      : null,
  ])

  const autoColumns: Record<string, MegamenuColumnData[]> = {
    services: ((services?.docs as Service[]) || []).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      description: service.shortDescription,
    })),
    locations: ((locations?.docs as Location[]) || []).map((location) => ({
      label: location.name,
      href: `/areas-we-cover/${location.slug}`,
      description: location.county,
    })),
  }

  return <HeaderClient autoColumns={autoColumns} data={headerData} settings={settings} />
}
