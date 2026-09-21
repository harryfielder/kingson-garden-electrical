import type { Metadata } from 'next'
import React from 'react'

import { CollectionIndex } from '@/components/CollectionIndex'
import { generateMeta } from '@/utilities/generateMeta'

const TITLE = 'Garden lighting notes'
const INTRO = 'Practical guidance on designing, specifying and maintaining garden lighting that lasts.'

export default function Page() {
  return (
    <CollectionIndex
      cardStyle="image"
      collection="posts"
      columns={3}
      eyebrow="Journal"
      intro={INTRO}
      sort="-publishedAt"
      title={TITLE}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { title: TITLE, meta: { description: INTRO } },
    path: '/blog',
  })
}
