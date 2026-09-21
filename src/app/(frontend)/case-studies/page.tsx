import type { Metadata } from 'next'
import React from 'react'

import { CollectionIndex } from '@/components/CollectionIndex'
import { generateMeta } from '@/utilities/generateMeta'

const TITLE = 'Projects'
const INTRO = 'Completed gardens across London and Hertfordshire, with the brief, the approach and the result behind each one.'

export default function Page() {
  return (
    <CollectionIndex
      cardStyle="overlay"
      collection="case-studies"
      columns={2}
      eyebrow="Our work"
      intro={INTRO}
      sort="-completedAt"
      title={TITLE}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { title: TITLE, meta: { description: INTRO } },
    path: '/case-studies',
  })
}
