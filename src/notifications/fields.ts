import type { Field } from 'payload'

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'skipped'

/**
 * Records what happened to the enquiry email for a submission.
 *
 * `sent` means Resend accepted it; `delivered` means the receiving mail server
 * (Microsoft 365) confirmed it. Only `delivered` proves it reached the inbox —
 * the retry cron moves rows from one to the other.
 */
export const notificationField: Field = {
  name: 'notification',
  type: 'group',
  label: 'Email notification',
  admin: {
    position: 'sidebar',
    readOnly: true,
    description: 'Retried automatically every 10 minutes for up to an hour if it fails.',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Failed', value: 'failed' },
        { label: 'Not sent', value: 'skipped' },
      ],
    },
    { name: 'attempts', type: 'number', defaultValue: 0 },
    {
      name: 'lastAttemptAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'recipients', type: 'text' },
    { name: 'messageId', type: 'text', label: 'Provider message ID' },
    { name: 'error', type: 'textarea' },
  ],
}
