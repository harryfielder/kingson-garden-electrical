import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

/**
 * Releases a gated download in exchange for an email address.
 *
 * The file URL is deliberately never rendered into the page for a gated
 * document — it is only returned here, after the address has been recorded.
 * Putting the URL in the markup and hiding it with JavaScript would make the
 * gate decorative.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Small in-memory throttle. Serverless instances are not shared, so this
// bounds abuse from a single warm instance rather than providing a hard
// guarantee; it is a speed bump, not the security boundary.
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

const isRateLimited = (key: string): boolean => {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { downloadId, email, marketingConsent, name, sourceUrl } = body as {
    downloadId?: number | string
    email?: string
    marketingConsent?: boolean
    name?: string
    sourceUrl?: string
  }

  if (!email || typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (!downloadId) {
    return NextResponse.json({ error: 'Missing download.' }, { status: 400 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 },
    )
  }

  const payload = await getPayload({ config: configPromise })

  try {
    const download = await payload.findByID({
      collection: 'downloads',
      id: Number(downloadId),
      depth: 0,
    })

    if (!download?.url) {
      return NextResponse.json({ error: 'That download is unavailable.' }, { status: 404 })
    }

    // `create` is closed on the REST API, so this runs with overrideAccess.
    await payload.create({
      collection: 'download-requests',
      data: {
        email: email.trim().toLowerCase(),
        name: typeof name === 'string' ? name.trim() : undefined,
        download: download.id,
        marketingConsent: Boolean(marketingConsent),
        sourceUrl: typeof sourceUrl === 'string' ? sourceUrl : undefined,
      },
      overrideAccess: true,
    })

    return NextResponse.json({ url: download.url, filename: download.filename })
  } catch (error) {
    payload.logger.error({ err: error }, 'Failed to unlock download')
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
