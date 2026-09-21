import type { Metadata } from 'next'
import React from 'react'

import { CollectionIndex } from '@/components/CollectionIndex'
import { generateMeta } from '@/utilities/generateMeta'

const TITLE = 'Guides and downloads'
const INTRO = 'Specification guides, maintenance checklists and planning documents for garden lighting projects.'

export default function Page() {
  return (
    <CollectionIndex
      cardStyle="text"
      collection="downloads"
      columns={3}
      eyebrow="Resources"
      intro={INTRO}
      sort="title"
      title={TITLE}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { title: TITLE, meta: { description: INTRO } },
    path: '/downloads',
  })
}
