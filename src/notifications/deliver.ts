import type { Payload, PayloadRequest, Where } from 'payload'

import type { NotificationStatus } from './fields'
import { buildMessage, type NotifiableCollection } from './messages'

export const NOTIFIABLE_COLLECTIONS: NotifiableCollection[] = ['form-submissions', 'download-requests']

// Ten-minute cron, so six attempts covers about an hour of provider outage.
const MAX_ATTEMPTS = 6
// Old enquiries are not sent automatically; a three-day-old "new enquiry" email
// is more confusing than useful. Resend those by hand.
const RETRY_WINDOW_MS = 3 * 24 * 60 * 60 * 1000
// Leaves rows alone while the create request that made them is still sending.
const IN_FLIGHT_MS = 2 * 60 * 1000

const getRecipients = async (payload: Payload, req?: PayloadRequest) => {
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, req })
  return (settings.enquiryRecipients || []).map((row) => row.email).filter(Boolean)
}

const describe = (error: unknown) => (error instanceof Error ? error.message : String(error))

/**
 * Sends the enquiry email for one row and records the outcome on it.
 *
 * Never throws: a mail failure must not lose the submission or show the
 * visitor an error. The row is marked `failed` instead and the cron retries it.
 */
export const deliver = async ({
  collection,
  id,
  payload,
  req,
}: {
  collection: NotifiableCollection
  id: number
  payload: Payload
  req?: PayloadRequest
}): Promise<NotificationStatus> => {
  const doc = await payload.findByID({ collection, id, depth: 0, req, overrideAccess: true })
  const previous = doc.notification || {}

  let outcome: { error: string | null; messageId?: string | null; recipients?: string | null; status: NotificationStatus }

  try {
    if (payload.email.name === 'console') {
      throw new Error('Email is not configured in this environment, so nothing was sent.')
    }

    const recipients = await getRecipients(payload, req)
    if (!recipients.length) {
      throw new Error('No recipients are set in Site Settings → Notifications.')
    }

    const message = await buildMessage(payload, collection, doc, req)
    const result = (await payload.sendEmail({
      to: recipients,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
    })) as { id?: string; messageId?: string } | undefined

    // Outside production the adapter redirects to EMAIL_TEST_RECIPIENT; record
    // where it really went so a preview row can't be mistaken for a real alert.
    const testRecipient =
      process.env.VERCEL_ENV !== 'production' ? process.env.EMAIL_TEST_RECIPIENT : undefined

    outcome = {
      error: null,
      messageId: result?.id || result?.messageId || null,
      recipients: testRecipient ? `${testRecipient} (test redirect)` : recipients.join(', '),
      status: 'sent',
    }
  } catch (error) {
    payload.logger.error({ err: error }, `Enquiry notification failed for ${collection} ${id}`)
    outcome = { error: describe(error), status: 'failed' }
  }

  try {
    await payload.update({
      collection,
      id,
      data: {
        notification: {
          ...previous,
          ...outcome,
          attempts: (previous.attempts || 0) + 1,
          lastAttemptAt: new Date().toISOString(),
        },
      },
      context: { disableRevalidate: true, skipNotification: true },
      depth: 0,
      overrideAccess: true,
      req,
    })
  } catch (error) {
    payload.logger.error({ err: error }, `Could not record notification status for ${collection} ${id}`)
  }

  return outcome.status
}

type ResendEmail = { last_event?: string }

/**
 * Asks Resend what happened to a `sent` email. Its `last_event` is driven by
 * the receiving server, so `delivered` means Microsoft 365 accepted it and
 * `bounced` means it was refused even though the send itself succeeded.
 */
const confirm = async (payload: Payload, collection: NotifiableCollection, doc: any) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !doc.notification?.messageId) return

  const res = await fetch(`https://api.resend.com/emails/${doc.notification.messageId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!res.ok) return

  const { last_event: event } = (await res.json()) as ResendEmail
  const delivered = ['delivered', 'opened', 'clicked', 'complained'].includes(event || '')
  const refused = ['bounced', 'failed', 'suppressed'].includes(event || '')
  if (!delivered && !refused) return

  await payload.update({
    collection,
    id: doc.id,
    data: {
      notification: {
        ...doc.notification,
        status: delivered ? 'delivered' : 'failed',
        error: refused ? `The receiving mail server reported: ${event}.` : null,
      },
    },
    context: { disableRevalidate: true, skipNotification: true },
    depth: 0,
    overrideAccess: true,
  })
}

/**
 * The cron's work: retry anything pending or failed, then confirm delivery of
 * anything Resend has accepted but not yet reported on.
 */
export const processNotifications = async (payload: Payload) => {
  const now = Date.now()
  const windowStart = new Date(now - RETRY_WINDOW_MS).toISOString()
  const summary = { confirmed: 0, retried: 0, failed: 0 }

  for (const collection of NOTIFIABLE_COLLECTIONS) {
    const retryable: Where = {
      and: [
        { 'notification.status': { in: ['pending', 'failed'] } },
        { 'notification.attempts': { less_than: MAX_ATTEMPTS } },
        { createdAt: { greater_than: windowStart } },
        { createdAt: { less_than: new Date(now - IN_FLIGHT_MS).toISOString() } },
      ],
    }
    const { docs: toRetry } = await payload.find({ collection, where: retryable, depth: 0, limit: 50 })

    for (const doc of toRetry) {
      const status = await deliver({ collection, id: doc.id, payload })
      summary[status === 'failed' ? 'failed' : 'retried'] += 1
    }

    const { docs: toConfirm } = await payload.find({
      collection,
      where: {
        and: [
          { 'notification.status': { equals: 'sent' } },
          { 'notification.lastAttemptAt': { greater_than: windowStart } },
        ],
      },
      depth: 0,
      limit: 50,
    })

    for (const doc of toConfirm) {
      try {
        await confirm(payload, collection, doc)
        summary.confirmed += 1
      } catch (error) {
        payload.logger.error({ err: error }, `Could not confirm delivery for ${collection} ${doc.id}`)
      }
    }
  }

  return summary
}
