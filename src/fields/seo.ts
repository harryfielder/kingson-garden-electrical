import type { Field } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/**
 * The SEO tab, shared by every indexable collection.
 *
 * Beyond the plugin's meta fields this adds the controls that actually move
 * the needle for a local service business: an explicit canonical, indexing
 * control, and a short plain-language summary that feeds both the page's
 * `description` structured data and the site's llms.txt.
 */
export const seoTab = (): { fields: Field[]; label: string; name: string } => ({
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({}),
    MetaImageField({ relationTo: 'media' }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
    {
      type: 'collapsible',
      label: 'Advanced',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'noindex',
              type: 'checkbox',
              admin: { width: '50%' },
              label: 'Hide from search engines',
            },
            {
              name: 'priority',
              type: 'select',
              admin: {
                width: '50%',
                description: 'Relative importance in the XML sitemap.',
              },
              defaultValue: '0.7',
              options: [
                { label: 'Highest (1.0) — home page', value: '1.0' },
                { label: 'High (0.8) — key services', value: '0.8' },
                { label: 'Normal (0.7)', value: '0.7' },
                { label: 'Low (0.5)', value: '0.5' },
                { label: 'Lowest (0.3)', value: '0.3' },
              ],
            },
          ],
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL override',
          admin: {
            description:
              'Only set this when this page duplicates another. Leave blank to self-canonicalise.',
          },
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Plain-language summary',
          admin: {
            description:
              'One or two sentences describing this page in plain English. Used for AI/LLM discovery (llms.txt) and structured data. Write it as an answer, not a slogan.',
          },
        },
      ],
    },
  ],
})
