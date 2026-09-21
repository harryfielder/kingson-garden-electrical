import type { Metadata } from 'next'
import React from 'react'

import { CollectionIndex } from '@/components/CollectionIndex'
import { generateMeta } from '@/utilities/generateMeta'

const TITLE = 'Areas we cover'
const INTRO = 'We design and install garden lighting across Hertfordshire, north London and the surrounding counties.'

export default function Page() {
  return (
    <CollectionIndex
      cardStyle="text"
      collection="locations"
      columns={4}
      eyebrow="Where we work"
      intro={INTRO}
      sort="name"
      title={TITLE}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { title: TITLE, meta: { description: INTRO } },
    path: '/areas-we-cover',
  })
}
