import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { richTextBlocks } from '@/blocks'
import { layoutField } from '@/fields/layout'
import { seoTab } from '@/fields/seo'
import { buildRevalidateHooks } from '@/hooks/revalidateDocument'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const { afterChange, afterDelete } = buildRevalidateHooks('posts')

/**
 * Blog articles. Kept on the `posts` slug so the search and SEO plugins keep
 * working out of the box, but labelled and routed as the blog.
 *
 * Authors are team members rather than CMS users — a byline that points at a
 * real, qualified person with a profile page is a far stronger authorship
 * signal than an admin account.
 */
export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    heroImage: true,
    excerpt: true,
    publishedAt: true,
    meta: { image: true, description: true },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'publishedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'posts', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'posts', req }),
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              name: 'excerpt',
              type: 'textarea',
              maxLength: 320,
              admin: {
                description:
                  'Shown on cards and in listings. Answer the article’s question directly — this is often what gets quoted.',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlocksFeature({ blocks: richTextBlocks }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          label: 'Extra sections',
          description: 'Optional blocks appended beneath the article body.',
          fields: [layoutField({ includeHero: false, label: 'Appended blocks' })],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: { description: 'Surfaces this article on those service pages.' },
            },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) =>
            siblingData._status === 'published' && !value ? new Date() : value,
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      filterOptions: () => ({ isAuthor: { equals: true } }),
      admin: { position: 'sidebar', description: 'Team members marked as authors.' },
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'team',
      admin: {
        position: 'sidebar',
        description:
          'Optional technical reviewer. Displayed on the article as a competence signal.',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
