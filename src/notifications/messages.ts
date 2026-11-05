import type { Payload, PayloadRequest } from 'payload'

import type { DownloadRequest, FormSubmission } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export type NotifiableCollection = 'form-submissions' | 'download-requests'

export type NotificationMessage = {
  html: string
  replyTo?: string
  subject: string
  text: string
}

type Row = { label: string; value: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Visitor input ends up in the subject line; a newline there is header injection.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

/**
 * Email clients can't read the site's CSS custom properties, so this layout is
 * deliberately plain: inline styles, neutral greys, no images. Plain markup
 * also scores better with spam filters than a designed template.
 */
const render = ({ heading, rows, adminUrl }: { adminUrl: string; heading: string; rows: Row[] }) => {
  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;">
<h1 style="font-size:18px;margin:0 0 16px;">${escapeHtml(heading)}</h1>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px;">
${rows
  .map(
    (row) => `<tr>
<td style="border-bottom:1px solid #e2e2e2;vertical-align:top;width:35%;color:#5c5c5c;">${escapeHtml(row.label)}</td>
<td style="border-bottom:1px solid #e2e2e2;vertical-align:top;white-space:pre-wrap;">${escapeHtml(row.value)}</td>
</tr>`,
  )
  .join('\n')}
</table>
<p style="margin:16px 0 0;font-size:13px;color:#5c5c5c;">Reply to this email to answer the customer directly. <a href="${escapeHtml(adminUrl)}">View in the website admin</a>.</p>
</body></html>`

  const text = [
    heading,
    '',
    ...rows.map((row) => `${row.label}: ${row.value}`),
    '',
    'Reply to this email to answer the customer directly.',
    `View in the website admin: ${adminUrl}`,
  ].join('\n')

  return { html, text }
}

const adminUrl = (collection: NotifiableCollection, id: number) =>
  `${getServerSideURL()}/admin/collections/${collection}/${id}`

const buildFormSubmission = async (
  payload: Payload,
  doc: FormSubmission,
  req?: PayloadRequest,
): Promise<NotificationMessage> => {
  const form =
    typeof doc.form === 'object'
      ? doc.form
      : await payload.findByID({ collection: 'forms', id: doc.form, depth: 0, req })

  // Labels come from the form definition so the email reads like the form did.
  const labels = new Map<string, string>()
  const emailFields = new Set<string>()
  for (const field of form.fields || []) {
    if (!('name' in field) || !field.name) continue
    if ('label' in field && field.label) labels.set(field.name, field.label)
    if (field.blockType === 'email') emailFields.add(field.name)
  }

  const data = (doc.submissionData || []).filter((entry) => entry.value !== '' && entry.value != null)
  const valueOf = (name: string) => data.find((entry) => entry.field === name)?.value

  const visitorEmail = data.find((entry) => emailFields.has(entry.field) || entry.field === 'email')
    ?.value
  const visitorName = valueOf('name')

  const rows: Row[] = data.map((entry) => ({
    label: labels.get(entry.field) || entry.field,
    value: String(entry.value),
  }))
  rows.push({ label: 'Received', value: new Date(doc.createdAt).toUTCString() })

  const heading = `New ${form.title} enquiry`
  return {
    ...render({ heading, rows, adminUrl: adminUrl('form-submissions', doc.id) }),
    replyTo: visitorEmail && EMAIL_PATTERN.test(visitorEmail) ? visitorEmail : undefined,
    subject: oneLine(visitorName ? `${heading} from ${visitorName}` : heading),
  }
}

const buildDownloadRequest = async (
  payload: Payload,
  doc: DownloadRequest,
  req?: PayloadRequest,
): Promise<NotificationMessage> => {
  const download =
    typeof doc.download === 'object'
      ? doc.download
      : await payload.findByID({ collection: 'downloads', id: doc.download, depth: 0, req })

  const rows: Row[] = [
    { label: 'Download', value: download.title || download.filename || String(download.id) },
    ...(doc.name ? [{ label: 'Name', value: doc.name }] : []),
    { label: 'Email', value: doc.email },
    { label: 'Happy to be contacted', value: doc.marketingConsent ? 'Yes' : 'No' },
    ...(doc.sourceUrl ? [{ label: 'Page', value: doc.sourceUrl }] : []),
    { label: 'Received', value: new Date(doc.createdAt).toUTCString() },
  ]

  return {
    ...render({
      heading: 'New download request',
      rows,
      adminUrl: adminUrl('download-requests', doc.id),
    }),
    replyTo: EMAIL_PATTERN.test(doc.email) ? doc.email : undefined,
    subject: oneLine(`Download request: ${rows[0]!.value}`),
  }
}

export const buildMessage = (
  payload: Payload,
  collection: NotifiableCollection,
  doc: DownloadRequest | FormSubmission,
  req?: PayloadRequest,
): Promise<NotificationMessage> =>
  collection === 'form-submissions'
    ? buildFormSubmission(payload, doc as FormSubmission, req)
    : buildDownloadRequest(payload, doc as DownloadRequest, req)
