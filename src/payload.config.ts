import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
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
 * Mail sends through Resend (provisioned from the Vercel Marketplace, which
 * sets `RESEND_API_KEY`), with plain SMTP kept as an alternative. Without
 * either, Payload logs emails to the console.
 *
 * The sending domain must be the one verified in Resend — gardenelectrician.co.uk,
 * whose DKIM/SPF/DMARC records live in Cloudflare. Never send *from* the
 * client's Microsoft 365 domain: it publishes `-all` SPF and would reject us.
 *
 * Only production mails the client. Previews and local dev share the API key,
 * so they either redirect everything to `EMAIL_TEST_RECIPIENT` or fall back
 * to the console — a test submission must never land in Kingson's inbox.
 */
const emailFromAddress =
  process.env.EMAIL_FROM_ADDRESS ||
  `notifications@${process.env.RESEND_EMAIL_DOMAIN || 'gardenelectrician.co.uk'}`
const emailFromName = process.env.EMAIL_FROM_NAME || 'Kingson Garden Electrical website'
const isProduction = process.env.VERCEL_ENV === 'production'
const testRecipient = process.env.EMAIL_TEST_RECIPIENT
const canSendMail = isProduction || Boolean(testRecipient)

const emailAdapter = !canSendMail
  ? undefined
  : process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: emailFromAddress,
        defaultFromName: emailFromName,
        ...(isProduction ? {} : { overrideRecipientAddress: testRecipient }),
      })
    : process.env.SMTP_HOST && isProduction
      ? nodemailerAdapter({
          defaultFromAddress: emailFromAddress,
          defaultFromName: emailFromName,
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
