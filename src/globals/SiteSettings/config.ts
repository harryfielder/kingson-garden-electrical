import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { authenticated } from '@/access/authenticated'

/**
 * The organisation's own record of itself.
 *
 * Everything needed to emit a complete Organization / LocalBusiness entity
 * lives here, so the site's structured data is maintained by the business
 * rather than hard-coded. NAP consistency (name, address, phone) is the single
 * biggest lever in local search, and this is the one place it is stated.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true, update: authenticated },
  admin: { group: 'Configuration' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'businessName',
                  type: 'text',
                  required: true,
                  defaultValue: 'Kingson Garden Electrical',
                  admin: { width: '50%', description: 'The trading name used across the site.' },
                },
                {
                  name: 'legalName',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Registered company name, if different.',
                  },
                },
              ],
            },
            {
              name: 'tagline',
              type: 'text',
              admin: { description: 'Short positioning line, e.g. "Garden lighting and power, designed and installed".' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              maxLength: 400,
              admin: {
                description:
                  'Plain-language description of the business. Used for the site meta description, the Organization entity and llms.txt. Write it as an answer to "what does this company do?".',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Full lockup, used in the header.' },
                },
                {
                  name: 'logoMark',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Square mark, used for structured data.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'foundingYear',
                  type: 'number',
                  admin: { width: '50%' },
                },
                {
                  name: 'companyNumber',
                  type: 'text',
                  label: 'Companies House number',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'vatNumber',
              type: 'text',
              label: 'VAT number',
            },
          ],
        },
        {
          label: 'Contact & location',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Displayed format, e.g. "01372 123456".',
                  },
                },
                {
                  name: 'phoneE164',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'International format for tel: links and structured data, e.g. "+441372123456".',
                  },
                },
              ],
            },
            { name: 'email', type: 'email', required: true },
            {
              name: 'address',
              type: 'group',
              label: 'Registered address',
              fields: [
                { name: 'streetAddress', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'addressLocality', type: 'text', label: 'Town or city', admin: { width: '50%' } },
                    { name: 'addressRegion', type: 'text', label: 'County', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'postalCode', type: 'text', admin: { width: '50%' } },
                    {
                      name: 'addressCountry',
                      type: 'text',
                      defaultValue: 'GB',
                      admin: { width: '50%', description: 'ISO country code.' },
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'latitude', type: 'number', admin: { width: '50%' } },
                { name: 'longitude', type: 'number', admin: { width: '50%' } },
              ],
            },
            {
              name: 'priceRange',
              type: 'select',
              defaultValue: '££',
              admin: { description: 'Rough price banding, shown in some search results.' },
              options: [
                { label: '£ — budget', value: '£' },
                { label: '££ — mid', value: '££' },
                { label: '£££ — premium', value: '£££' },
                { label: '££££ — luxury', value: '££££' },
              ],
            },
            {
              name: 'openingHours',
              type: 'array',
              label: 'Opening hours',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'days',
                      type: 'select',
                      hasMany: true,
                      required: true,
                      admin: { width: '40%' },
                      options: [
                        { label: 'Monday', value: 'Monday' },
                        { label: 'Tuesday', value: 'Tuesday' },
                        { label: 'Wednesday', value: 'Wednesday' },
                        { label: 'Thursday', value: 'Thursday' },
                        { label: 'Friday', value: 'Friday' },
                        { label: 'Saturday', value: 'Saturday' },
                        { label: 'Sunday', value: 'Sunday' },
                      ],
                    },
                    {
                      name: 'opens',
                      type: 'text',
                      admin: { width: '30%', description: '24h, e.g. 08:00' },
                    },
                    {
                      name: 'closes',
                      type: 'text',
                      admin: { width: '30%', description: '24h, e.g. 17:30' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'emergencyAvailable',
              type: 'checkbox',
              label: 'Offer an out-of-hours emergency service',
            },
          ],
        },
        {
          label: 'Credibility',
          fields: [
            {
              name: 'accreditations',
              type: 'array',
              label: 'Accreditations',
              admin: {
                initCollapsed: true,
                description:
                  'NICEIC, NAPIT, TrustMark and similar. Shown in the footer and emitted as credentials in structured data.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'registrationNumber', type: 'text', admin: { width: '50%' } },
                  ],
                },
                { name: 'logo', type: 'upload', relationTo: 'media' },
                { name: 'url', type: 'text', label: 'Verification URL' },
              ],
            },
            {
              name: 'socialProfiles',
              type: 'array',
              label: 'Social and review profiles',
              admin: {
                initCollapsed: true,
                description:
                  'Every profile listed here is emitted as a sameAs link, which is how search engines reconcile this business across the web.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      admin: { width: '40%' },
                      options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Pinterest', value: 'pinterest' },
                        { label: 'Houzz', value: 'houzz' },
                        { label: 'Google Business Profile', value: 'google' },
                        { label: 'Checkatrade', value: 'checkatrade' },
                        { label: 'Trustpilot', value: 'trustpilot' },
                      ],
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Search & AI',
          fields: [
            {
              name: 'defaultMetaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Fallback social share image, 1200×630. Used when a page sets none.',
              },
            },
            {
              name: 'titleTemplate',
              type: 'text',
              defaultValue: '%s | Kingson Garden Electrical',
              admin: {
                description: 'Browser tab title pattern. %s is replaced by the page title.',
              },
            },
            {
              name: 'llmsSummary',
              type: 'textarea',
              label: 'Summary for AI assistants',
              admin: {
                description:
                  'Published at /llms.txt to help AI assistants describe the business accurately. State what you do, where you operate, what you are accredited for, and how to get in touch.',
              },
            },
            {
              name: 'allowAiTraining',
              type: 'checkbox',
              defaultValue: true,
              label: 'Allow AI crawlers to access the site',
              admin: {
                description:
                  'When off, robots.txt disallows GPTBot, ClaudeBot, PerplexityBot and similar. Turning this off reduces visibility in AI answers.',
              },
            },
            {
              name: 'googleSiteVerification',
              type: 'text',
              admin: { description: 'The content value of the verification meta tag.' },
            },
          ],
        },
        {
          label: 'Notifications',
          fields: [
            {
              name: 'enquiryRecipients',
              type: 'array',
              label: 'Send enquiry notifications to',
              admin: {
                description: 'Form submissions and download requests are emailed to these addresses.',
              },
              fields: [{ name: 'email', type: 'email', required: true }],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        // Site settings feed the header, footer, every page's metadata and all
        // structured data, so a change has to invalidate the whole site.
        // Skipped when seeding, where there is no Next.js request context.
        if (context.disableRevalidate) return
        revalidateTag('site-settings', 'max')
      },
    ],
  },
}
