'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

/**
 * Array rows default to "Row 01" in the admin UI, which makes long lists of
 * features or FAQs unreadable. These label the row with its own content.
 */
const makeRowLabel = (key: string, fallback: string): React.FC => {
  const Label: React.FC = () => {
    const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
    const value = data?.[key]
    const index = typeof rowNumber === 'number' ? rowNumber + 1 : ''

    return (
      <div>
        {typeof value === 'string' && value.trim() ? value : `${fallback} ${index}`.trim()}
      </div>
    )
  }

  Label.displayName = `${fallback}RowLabel`
  return Label
}

export const FeatureRowLabel = makeRowLabel('title', 'Feature')
export const CardRowLabel = makeRowLabel('title', 'Card')
export const FaqRowLabel = makeRowLabel('question', 'Question')
export const GalleryRowLabel = makeRowLabel('caption', 'Image')
export const NavItemRowLabel = makeRowLabel('label', 'Item')
