import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { processNotifications } from '@/notifications'

/**
 * Retries failed enquiry emails and confirms delivery of sent ones.
 *
 * Called every ten minutes by the Vercel cron in `vercel.json`, which sends
 * `Authorization: Bearer $CRON_SECRET` automatically.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET

  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const summary = await processNotifications(payload)

  return NextResponse.json(summary)
}
