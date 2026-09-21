import type { Metadata } from 'next'
import React from 'react'

import { CollectionIndex } from '@/components/CollectionIndex'
import { generateMeta } from '@/utilities/generateMeta'

const TITLE = 'The team'
const INTRO = 'Qualified electricians who have specialised in gardens for a quarter of a century.'

export default function Page() {
  return (
    <CollectionIndex
      cardStyle="image"
      collection="team"
      columns={3}
      eyebrow="Who we are"
      intro={INTRO}
      sort="order"
      title={TITLE}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { title: TITLE, meta: { description: INTRO } },
    path: '/team',
  })
}
