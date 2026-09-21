/**
 * Loads environment variables for scripts run directly through tsx.
 *
 * The `payload` CLI does this itself via Next's loader, but this script is
 * invoked directly, so it has to replicate Next's precedence: `.env.local`
 * wins over `.env`. Imported for its side effect, and imported *first* — the
 * Payload config reads `process.env` while it is being evaluated.
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

for (const file of ['.env.local', '.env']) {
  dotenv.config({ path: path.join(root, file), override: false, quiet: true })
}
