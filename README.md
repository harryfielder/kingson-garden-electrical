# Kingson Garden Electrical

Marketing site for Kingson Garden Electrical — Payload CMS 3 + Next.js 16 (App Router),
Neon Postgres and Vercel Blob, deployed on Vercel.

## Getting started

```bash
pnpm install
cp .env.example .env                              # then fill in the secrets
vercel env pull .env.local --environment=development   # DATABASE_URL + BLOB_READ_WRITE_TOKEN
pnpm db:migrate
pnpm dev
```

The admin panel is at `/admin`.

### Environment

Two files, deliberately separated:

- **`.env`** — application config you own (`PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`).
- **`.env.local`** — infrastructure secrets, managed by Vercel. Never edit by hand;
  re-pull with `pnpm env:pull`. Next loads it with higher precedence than `.env`.

`NEXT_PUBLIC_SERVER_URL` is only set locally. On Vercel the canonical origin is derived
from `VERCEL_PROJECT_PRODUCTION_URL`, so previews get their own correct URLs. Set it
explicitly once a custom domain is live.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Applies migrations, then builds |
| `pnpm seed` | Seeds/updates content (idempotent by slug) |
| `pnpm seed --fresh` | Deletes seeded content first |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:migrate:create <name>` | Generate a migration from config drift |
| `pnpm generate:types` | Regenerate `payload-types.ts` |

Migrations run against Neon's **direct** endpoint (`DATABASE_URL_UNPOOLED`) via the
`PAYLOAD_MIGRATING` flag, because Neon's pooler runs PgBouncer in transaction mode and
does not reliably support the session state DDL needs. Runtime uses the pooled endpoint.

## Architecture

```
src/
  design-system/      Primitives (Section, Container, Heading, Surface…) — import from '@/design-system'
  blocks/             One folder per block: config.ts (schema) + Component.tsx (render)
  collections/        Pages, Posts, Services, CaseStudies, Locations, Testimonials, Team, Downloads…
  globals/            SiteSettings — the single source of NAP, accreditations and schema data
  seo/                JSON-LD builders and FAQ extraction
  utilities/routing.ts  Single source of truth for collection → URL mapping
```

### Design system

All colour, type, spacing, motion and elevation live as CSS custom properties in
`app/(frontend)/globals.css`, in three tiers: primitive ramps → semantic aliases →
Tailwind theme. Components only ever consume the Tailwind utilities (`bg-canvas`,
`text-brand`, `font-display`). To reskin the site, change tier 1 and tier 2 only.

Editors choose from a fixed vocabulary (`appearanceField`: tone + spacing) rather than
entering colours, so the palette can change without touching content.

### Routing

`src/utilities/routing.ts` maps every collection to its URL prefix. Links, breadcrumbs,
sitemaps, canonical URLs, live preview and JSON-LD all resolve through it — change a
prefix there and the whole site follows.

### Blocks

Blocks own their own vertical rhythm via `BlockSection`; `RenderBlocks` adds no spacing.
Adding a block: create `config.ts` + `Component.tsx`, register in `src/blocks/index.ts`
and in `RenderBlocks.tsx`.

> **Note on `dbName`:** block `dbName` must be the *function* form
> ``({ tableName }) => `${tableName}_b_x` ``. A plain string replaces the entire table
> name, which makes every collection share one table. Short names are needed because
> Postgres caps identifiers at 63 characters.

### SEO

- One connected JSON-LD `@graph` per page, entities cross-referenced by `@id`
- `Electrician`/`LocalBusiness` organisation, `WebSite`, `WebPage`, `Service`,
  `BreadcrumbList`, `FAQPage`, `Article`, `Person`, `Review`/`AggregateRating`, `ItemList`
- Self-referencing canonicals, per-page `noindex` and sitemap priority
- `/sitemap.xml`, `/robots.txt` and `/llms.txt`, all generated from the CMS

Metadata routes (`robots.ts`, `sitemap.ts`) live at `src/app/` root, not inside the
`(frontend)` group — inside the group they are shadowed by the `[slug]` catch-all.

## Before launch

- [ ] **Change the admin password** (seeded as `ChangeMe!2026`).
- [ ] **Get written permission for the customer reviews.** The four testimonials are
      reproduced verbatim from the public review profile but are seeded with
      `verified: false`, so they render on the page but are excluded from Review
      structured data. Tick `verified` only once permission is confirmed — Google
      requires reviews to be genuine and attributable.
- [ ] Replace the placeholder privacy policy.
- [ ] Configure SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
      `SMTP_FROM_ADDRESS`) so form notifications actually send. Without it Payload
      logs emails to the console.
- [ ] Set `NEXT_PUBLIC_SERVER_URL` to the live domain.
- [ ] Add the Google Search Console verification token in Site Settings → Search & AI.

## Content provenance

Imagery in `seed-assets/kingson/` was taken from the company's existing site at
`gardenelectrician.co.uk/wp-content/uploads` — it is Kingson's own photography, plus
the ECA/NICEIC/ELECSA marks and the Hunza and in-lite brand logos. Business details
(address, phone, founding year, accreditations) come from the company's own site and
listings; voice and proof points come from the supplied staff interview.
