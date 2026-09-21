import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig, type PayloadRequest } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { CaseStudies } from './collections/CaseStudies'
import { Downloads } from './collections/Downloads'
import { DownloadRequests } from './collections/DownloadRequests'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './globals/SiteSettings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Set by the `db:*` scripts so migrations bypass the connection pooler. */
const isMigrating = process.env.PAYLOAD_MIGRATING === 'true'

/**
 * SMTP is optional: without it Payload logs emails to the console, which is
 * the right behaviour locally and in previews. Configuring it is what turns
 * form notifications into real mail.
 */
const emailAdapter = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'noreply@kingsongardenelectrical.co.uk',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Kingson Garden Electrical',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: { baseDir: path.resolve(dirname) },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    meta: {
      titleSuffix: ' · Kingson Garden Electrical',
    },
  },

  editor: defaultLexical,

  db: postgresAdapter({
    pool: {
      // Serverless request handlers use Neon's pooled endpoint; schema changes
      // use the direct one. Neon's pooler runs PgBouncer in transaction mode,
      // where the session-level state that DDL and advisory locks rely on is
      // not guaranteed to survive between statements.
      connectionString: isMigrating
        ? process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || ''
        : process.env.DATABASE_URL || '',
    },
    // Schema changes are applied through committed migrations rather than
    // push-on-boot, so a deploy can never silently alter production's schema.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  collections: [
    Pages,
    Posts,
    Services,
    CaseStudies,
    Locations,
    Testimonials,
    Team,
    Downloads,
    DownloadRequests,
    Categories,
    Media,
    Users,
  ],

  globals: [Header, Footer, SiteSettings],

  ...(emailAdapter ? { email: emailAdapter } : {}),

  cors: [getServerSideURL()].filter(Boolean),
  plugins,
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        return req.headers.get('authorization') === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
