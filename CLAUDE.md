# CLAUDE.md

Kingson Garden Electrical — Payload CMS 3 + Next.js 16 (App Router), Neon Postgres,
Vercel Blob, deployed on Vercel.

**Read `docs/HANDOFF.md` first.** It carries the current state, the live infrastructure
IDs, what is still outstanding before launch, and the traps that already cost time.

## Commands

```bash
pnpm dev                      # dev server; /admin for the CMS
pnpm build                    # runs db:migrate, then next build
pnpm seed                     # idempotent by slug; --fresh wipes first
pnpm db:migrate:create <name> # generate a migration after changing config
pnpm generate:types           # after ANY collection/block/field change
npx tsc --noEmit              # full typecheck (~90s)
```

## Conventions

- Import primitives from `@/design-system`, never from `design-system/primitives/*`
- Colour, type, spacing and motion are CSS custom properties in
  `app/(frontend)/globals.css`, in three tiers. Never hard-code a colour in a component
- `src/utilities/routing.ts` is the single source of truth for collection → URL. Links,
  breadcrumbs, sitemaps, canonicals, preview and JSON-LD all resolve through it
- Blocks own their vertical rhythm via `BlockSection`; `RenderBlocks` adds no spacing
- A new block needs: `config.ts`, `Component.tsx`, registration in `src/blocks/index.ts`
  and in `RenderBlocks.tsx`, then `pnpm generate:types` and a migration

## Hard-won rules

- Block `dbName` must be the function form ``({ tableName }) => `${tableName}_b_x` ``.
  A string replaces the whole table name and collapses every collection into one table
- `robots.ts` / `sitemap.ts` stay at `src/app/` root; inside a route group the `[slug]`
  catch-all shadows them, silently
- Don't pass `collections` to `seoPlugin` — it overrides the manual `seoTab()` fields
- Any Payload hook calling `revalidateTag`/`revalidatePath` must first check
  `context.disableRevalidate`, or it breaks the seed
- After changing the config, generate AND apply a migration before seeding; the symptom
  of drift is an opaque Drizzle error naming a missing column

## Care

- Testimonials are seeded `verified: false` on purpose — see `docs/HANDOFF.md`. Do not
  flip that flag, and never invent review text
- Pushing to `main` deploys to production. Ask first
