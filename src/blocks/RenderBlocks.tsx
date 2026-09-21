import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CardsBlockComponent } from '@/blocks/Cards/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { DownloadLinksBlockComponent } from '@/blocks/DownloadLinks/Component'
import { FaqBlockComponent } from '@/blocks/Faq/Component'
import { FeatureRowBlockComponent } from '@/blocks/FeatureRow/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'
import { GatedDownloadBlockComponent } from '@/blocks/GatedDownload/Component'
import { HeroBlockComponent } from '@/blocks/Hero/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TestimonialCarouselBlockComponent } from '@/blocks/TestimonialCarousel/Component'
import { TextMediaBlockComponent } from '@/blocks/TextMedia/Component'
import { BlockSection } from '@/blocks/shared/BlockSection'

const blockComponents = {
  archive: ArchiveBlock,
  cards: CardsBlockComponent,
  content: ContentBlock,
  cta: CallToActionBlock,
  downloadLinks: DownloadLinksBlockComponent,
  faq: FaqBlockComponent,
  featureRow: FeatureRowBlockComponent,
  formBlock: FormBlock,
  gallery: GalleryBlockComponent,
  gatedDownload: GatedDownloadBlockComponent,
  hero: HeroBlockComponent,
  mediaBlock: MediaBlock,
  testimonialCarousel: TestimonialCarouselBlockComponent,
  textMedia: TextMediaBlockComponent,
}

/**
 * Renders a page's block list.
 *
 * Blocks own their own vertical spacing through BlockSection, so no wrapper
 * margins are applied here — adding them would double up on the spacing scale
 * and break the ability for two blocks to sit flush.
 */
export const RenderBlocks: React.FC<{ blocks?: Page['layout'] | null }> = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (!blockType || !(blockType in blockComponents)) return null

        const Block = blockComponents[blockType as keyof typeof blockComponents]
        if (!Block) return null

        // `formBlock` and `mediaBlock` predate the shared appearance field, so
        // they are wrapped here rather than each managing its own section.
        if (blockType === 'formBlock' || blockType === 'mediaBlock') {
          const containerSize =
            blockType === 'mediaBlock' && 'size' in block
              ? block.size === 'full'
                ? 'full'
                : block.size === 'wide'
                  ? 'wide'
                  : 'default'
              : 'default'

          return (
            <BlockSection
              appearance={'appearance' in block ? block.appearance : undefined}
              containerSize={containerSize}
              key={index}
            >
              {/* @ts-expect-error block props are narrowed at runtime by blockType */}
              <Block {...block} enableGutter={false} />
            </BlockSection>
          )
        }

        return (
          <Fragment key={index}>
            {/* @ts-expect-error block props are narrowed at runtime by blockType */}
            <Block {...block} />
          </Fragment>
        )
      })}
    </Fragment>
  )
}
