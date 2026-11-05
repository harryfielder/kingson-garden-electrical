import '../seed/env'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { processNotifications } from '@/notifications'

/**
 * Sends a test enquiry through the real submission hook, waits for the
 * receiving server to confirm delivery, then deletes the test row.
 *
 * Outside production the email adapter redirects every message to
 * EMAIL_TEST_RECIPIENT, so this never reaches the client's inbox.
 *
 *   npx tsx scripts/admin/test-notification.ts [formId]
 */
const formId = Number(process.argv[2] || 2)
const payload = await getPayload({ config: configPromise })

const submission = await payload.create({
  collection: 'form-submissions',
  data: {
    form: formId,
    submissionData: [
      { field: 'name', value: 'Test Enquiry' },
      { field: 'email', value: 'test-visitor@example.com' },
      { field: 'phone', value: '01442 000000' },
      { field: 'message', value: 'Test notification from scripts/admin/test-notification.ts.' },
    ],
  },
})

const read = async () =>
  (await payload.findByID({ collection: 'form-submissions', id: submission.id, depth: 0 }))
    .notification

console.log('After send:', await read())

// Delivery confirmation comes from Microsoft's server, usually within seconds.
for (let i = 0; i < 6; i++) {
  await new Promise((resolve) => setTimeout(resolve, 10_000))
  await processNotifications(payload)
  const notification = await read()
  console.log(`Check ${i + 1}: ${notification?.status}${notification?.error ? ` — ${notification.error}` : ''}`)
  if (notification?.status !== 'sent') break
}

await payload.delete({ collection: 'form-submissions', id: submission.id })
console.log(`Deleted test submission ${submission.id}.`)

process.exit(0)
