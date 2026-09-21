import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

import { BlockSection, isInverse } from '../shared/BlockSection'

const colSpan: Record<string, string> = {
  full: 'lg:col-span-12',
  half: 'lg:col-span-6',
  oneThird: 'lg:col-span-4',
  twoThirds: 'lg:col-span-8',
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ appearance, columns }) => {
  if (!columns?.length) return null

  const inverse = isInverse(appearance)

  return (
    <BlockSection appearance={appearance}>
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
        {columns.map((column, i) => (
          <div className={cn(colSpan[column.size || 'full'])} key={i}>
            {column.richText && (
              <RichText
                data={column.richText}
                enableGutter={false}
                tone={inverse ? 'inverse' : 'default'}
                className={cn(column.measure === 'prose' && 'max-w-prose')}
              />
            )}
            {column.enableLink && column.link && (
              <div className="mt-6">
                <CMSLink {...column.link} />
              </div>
            )}
          </div>
        ))}
      </div>
    </BlockSection>
  )
}
