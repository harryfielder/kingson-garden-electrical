import type { Field } from 'payload'

import { bodyBlocks, layoutBlocks } from '@/blocks'

type LayoutFieldOptions = {
  /** Omit the Hero block for documents that render their own header. */
  includeHero?: boolean
  label?: string
  name?: string
  required?: boolean
}

/** The flexible-content field shared by every page-like collection. */
export const layoutField = ({
  includeHero = true,
  label = 'Page content',
  name = 'layout',
  required = false,
}: LayoutFieldOptions = {}): Field => ({
  name,
  type: 'blocks',
  blocks: includeHero ? layoutBlocks : bodyBlocks,
  label,
  required,
  admin: { initCollapsed: true },
})
