import type { Block } from 'payload'

import { Archive } from './ArchiveBlock/config'
import { Banner } from './Banner/config'
import { CallToAction } from './CallToAction/config'
import { CardsBlock } from './Cards/config'
import { Code } from './Code/config'
import { Content } from './Content/config'
import { DownloadLinksBlock } from './DownloadLinks/config'
import { FaqBlock } from './Faq/config'
import { FeatureRowBlock } from './FeatureRow/config'
import { FormBlock } from './Form/config'
import { GalleryBlock } from './Gallery/config'
import { GatedDownloadBlock } from './GatedDownload/config'
import { HeroBlock } from './Hero/config'
import { MediaBlock } from './MediaBlock/config'
import { TestimonialCarouselBlock } from './TestimonialCarousel/config'
import { TextMediaBlock } from './TextMedia/config'

/**
 * The full palette available when composing a page.
 *
 * Order matters: it is the order editors see in the "Add block" menu, so the
 * blocks used most often come first.
 */
export const layoutBlocks: Block[] = [
  HeroBlock,
  TextMediaBlock,
  CardsBlock,
  FeatureRowBlock,
  GalleryBlock,
  TestimonialCarouselBlock,
  FaqBlock,
  CallToAction,
  FormBlock,
  GatedDownloadBlock,
  DownloadLinksBlock,
  Content,
  MediaBlock,
  Archive,
]

/**
 * Blocks for records that already have their own hero and header — a hero
 * inside a service page body would produce a second H1.
 */
export const bodyBlocks: Block[] = layoutBlocks.filter((block) => block.slug !== 'hero')

/** Blocks embeddable inside rich text. */
export const richTextBlocks: Block[] = [Banner, Code, MediaBlock]

export {
  Archive,
  Banner,
  CallToAction,
  CardsBlock,
  Code,
  Content,
  DownloadLinksBlock,
  FaqBlock,
  FeatureRowBlock,
  FormBlock,
  GalleryBlock,
  GatedDownloadBlock,
  HeroBlock,
  MediaBlock,
  TestimonialCarouselBlock,
  TextMediaBlock,
}
