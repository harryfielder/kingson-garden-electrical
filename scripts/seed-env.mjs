import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
for (const f of ['.env.local', '.env']) dotenv.config({ path: path.join(root, f), override: false, quiet: true })
