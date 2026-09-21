import '../seed/env'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Resets a Payload user's password.
 *
 * Passwords are stored as a PBKDF2 salt and hash, so this has to go through
 * Payload's local API rather than a direct SQL write — the plaintext is only
 * ever held in memory here.
 *
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... npx tsx scripts/admin/reset-password.ts
 */
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are both required.')
  process.exit(1)
}

const payload = await getPayload({ config: configPromise })

const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  depth: 0,
})

const user = docs[0] as { id: number | string } | undefined

if (!user) {
  console.error(`No user with the email ${email}.`)
  process.exit(1)
}

await payload.update({
  collection: 'users',
  id: user.id,
  data: { password },
  overrideAccess: true,
})

console.log(`Password updated for ${email} (id ${user.id}).`)
process.exit(0)
