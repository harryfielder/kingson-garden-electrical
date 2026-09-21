import type { Metadata } from 'next'
import React from 'react'

import { CollectionIndex } from '@/components/CollectionIndex'
import { generateMeta } from '@/utilities/generateMeta'

const TITLE = 'Garden lighting and outdoor electrical services'
const INTRO = 'Lighting design, installation, outdoor power and controls — designed for the garden, installed to last, and guaranteed.'

export default function Page() {
  return (
    <CollectionIndex
      cardStyle="image"
      collection="services"
      columns={3}
      eyebrow="What we do"
      intro={INTRO}
      sort="order"
      title={TITLE}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { title: TITLE, meta: { description: INTRO } },
    path: '/services',
  })
}
