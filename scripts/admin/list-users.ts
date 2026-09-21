import '../seed/env'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })
const { docs } = await payload.find({ collection: 'users', limit: 100, depth: 0 })

for (const doc of docs as Array<{ id: number | string; email: string; name?: string }>) {
  console.log(`${doc.id}\t${doc.email}\t${doc.name ?? ''}`)
}

process.exit(0)
