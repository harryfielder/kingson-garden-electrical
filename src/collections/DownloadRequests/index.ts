import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

/**
 * Email addresses captured by the gated-download flow.
 *
 * Writes happen server-side from `/api/downloads/unlock` using Payload's local
 * API, so `create` stays closed to the public REST API — otherwise the
 * endpoint's rate limiting and validation could be bypassed entirely.
 */
export const DownloadRequests: CollectionConfig<'download-requests'> = {
  slug: 'download-requests',
  labels: { singular: 'Download Request', plural: 'Download Requests' },
  access: {
    create: () => false,
    delete: authenticated,
    read: authenticated,
    update: () => false,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'download', 'marketingConsent', 'createdAt'],
    group: 'Submissions',
    description: 'Captured when a visitor unlocks a gated download.',
  },
  fields: [
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'name', type: 'text' },
    {
      name: 'download',
      type: 'relationship',
      relationTo: 'downloads',
      required: true,
      index: true,
    },
    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Consented to marketing contact',
    },
    {
      name: 'sourceUrl',
      type: 'text',
      admin: { description: 'The page the request came from.' },
    },
  ],
  timestamps: true,
}
