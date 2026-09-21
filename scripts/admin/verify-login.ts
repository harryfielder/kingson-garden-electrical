import '../seed/env'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

/** Confirms a set of credentials actually authenticates. Nothing is written. */
const payload = await getPayload({ config: configPromise })

try {
  const result = await payload.login({
    collection: 'users',
    data: { email: process.env.ADMIN_EMAIL!, password: process.env.ADMIN_PASSWORD! },
  })
  console.log('LOGIN OK ->', (result as { user?: { email?: string } }).user?.email)
} catch (error) {
  console.log('LOGIN FAILED ->', (error as Error)?.message)
  process.exit(1)
}

process.exit(0)
