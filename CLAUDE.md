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
- The ramps are anchored on the client's two hexes: `--olive-500` is `#7e8a5d` and
  `--apricot-500` is `#f09427`. Reach for the semantic alias (`--brand`, `--accent-ink`),
  not a ramp step, so a component keeps working in both themes
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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
