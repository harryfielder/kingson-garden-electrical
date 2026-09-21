import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

/**
 * Customer reviews. Not routable — testimonials surface inside carousels and
 * on service pages, and feed Review / AggregateRating structured data.
 *
 * `verified` gates which reviews are allowed into structured data: Google's
 * guidelines require reviews to be genuine and attributable, and marking the
 * distinction in the CMS keeps that decision with the person who knows.
 */
export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    quote: true,
    authorName: true,
    authorLocation: true,
    rating: true,
    authorPhoto: true,
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'featured', 'reviewDate'],
    group: 'Content',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: { description: 'The review in the customer’s own words. Do not paraphrase.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'authorName', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'authorLocation',
          type: 'text',
          admin: { width: '50%', description: 'e.g. "Esher, Surrey"' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          admin: { width: '33%' },
          defaultValue: 5,
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'reviewDate',
          type: 'date',
          admin: { width: '33%', date: { pickerAppearance: 'dayOnly' } },
          required: true,
        },
        {
          name: 'source',
          type: 'select',
          admin: { width: '34%' },
          defaultValue: 'direct',
          options: [
            { label: 'Direct to us', value: 'direct' },
            { label: 'Google', value: 'google' },
            { label: 'Checkatrade', value: 'checkatrade' },
            { label: 'Trustpilot', value: 'trustpilot' },
            { label: 'Houzz', value: 'houzz' },
            { label: 'Yell', value: 'yell' },
            { label: 'Other review site', value: 'other' },
          ],
        },
      ],
    },
    { name: 'authorPhoto', type: 'upload', relationTo: 'media' },
    {
      name: 'projectImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional photo of the completed work this review refers to.' },
    },
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedLocation',
      type: 'relationship',
      relationTo: 'locations',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar' },
      label: 'Featured',
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Only verified reviews are included in structured data. Untick for reviews you cannot attribute to a real, identifiable customer.',
      },
      label: 'Verified — safe for structured data',
    },
  ],
}
