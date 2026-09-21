# Handoff — state as of 21 September 2026

Written so this project can be picked up cold, by a person or a fresh agent session.

## Where it stands

The site is **built, seeded, building cleanly and verified locally**. 48 routes, all
returning 200. Two commits sit ahead of `origin/main` and have **not been pushed** — a
push triggers a production deploy on Vercel.

```bash
pnpm install
pnpm env:pull        # DATABASE_URL + BLOB_READ_WRITE_TOKEN from Vercel
pnpm dev             # /admin — harry@umidigital.co.uk / ChangeMe!2026
```

## Live infrastructure (already provisioned)

| Thing | Value |
|---|---|
| Vercel project | `harry-fielder/kingson-garden-electrical` (`prj_Gf9RQWA323WZL227cUTRka3fey0Z`) |
| Neon store | `kingson-garden-db`, connected to production + preview + development |
| Blob store | `kingson-garden-media` (`store_WzcDKMcjFus4XoMC`), public access |
| GitHub | `harryfielder/kingson-garden-electrical`, connected to the Vercel project |
| Env in Vercel | `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET` + the Neon/Blob vars |

`NEXT_PUBLIC_SERVER_URL` is deliberately **not** set in Vercel, so previews derive their
own origin from `VERCEL_PROJECT_PRODUCTION_URL`. Set it once a custom domain exists.

## Outstanding before launch

1. **Change the admin password** — seeded as `ChangeMe!2026`.
2. **Testimonial permission.** The four reviews are verbatim from Kingson's public review
   profile but seeded `verified: false`: they render on the page and are excluded from
   `Review`/`AggregateRating` structured data. The client's own brief
   (`docs/client-brief/staff-interview-questions.md`) says to get permission before
   naming customers. Flip `verified` only once that is confirmed. Harry was separately
   scraping Checkatrade reviews — those still need adding.
3. **SMTP.** Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_ADDRESS`.
   Until then Payload logs emails to the console and no enquiry notifications send.
   The adapter is already wired in `payload.config.ts` behind a `SMTP_HOST` check.
4. **Replace the placeholder privacy policy** (`/privacy-policy`).
5. **Google Search Console token** — Site Settings → Search & AI.
6. **Real photography for the hero.** The client brief says the hero image "carries the
   whole brand". Current imagery is Kingson's own but mostly older and low-resolution;
   the brief suggests new dusk shoots, landscape and portrait crops.

## Deliberate decisions worth knowing

- **Hero is a block, not a page field.** The Payload website template ships a fixed
  `hero` group; it was removed so every page is one ordered list of blocks and a page
  can legitimately open without a hero.
- **Dark mode is opt-in, and now reachable.** The toggle sits at the right-hand end of
  the header (`providers/Theme/ThemeToggle`). `InitTheme` honours a stored preference but
  deliberately does *not* follow `prefers-color-scheme` — half the audience silently
  getting a different palette makes brand presentation unpredictable. The toggle renders
  both icons and swaps them in CSS off `[data-theme]`; picking one from React state
  hydrates against markup the server rendered without knowing the stored theme, which
  React reports as a mismatch.
- **The palette is derived from two client hexes.** `--olive-500` is exactly `#7e8a5d`
  and `--apricot-500` is exactly `#f09427`; every other step walks that colour along the
  OKLCH lightness axis. `sand` is the warm off-white the site sits on, `stone` is the
  near-neutral grey for bands that need to step back from the warmth. Change a ramp in
  `globals.css` and the site reskins — no component holds a colour value.
- **`-base` fills, `-ink` writes.** `#7e8a5d` reaches only 3.5:1 on the canvas, so
  `--brand-base` is for fills and marks and `--brand` is the darker text-safe step. Same
  split on the accent. `--accent-foreground` is the text that sits *on* the orange fill
  and stays dark in both themes; text on `--accent-soft` wants `--accent-ink`, which
  inverts with the theme.
- **Inverse bands redefine the tokens locally.** `Section` tones `brand` and `ink`, and a
  Hero over a dark image, carry `.tone-inverse`, which repoints `--ink`, `--line-strong`,
  `--brand` and friends at their light-on-dark values. Blocks therefore don't need to
  thread the section tone into every link they render.
- **The header's ink follows the hero, in CSS.** The Hero declares `data-hero-tone`, and
  `body:has([data-hero-tone='dark']) .header-float` knocks the wordmark out to white.
  The header is rendered above the page in the tree so it can't be told from the page,
  and probing in an effect flashes the wrong colours on first paint. Those rules live in
  `@layer utilities`, not `components` — Tailwind orders utilities last, so a
  components-layer rule loses to `text-ink` however specific it is.
- **`push: false` on the DB adapter.** Schema changes go through committed migrations, so
  a deploy can never silently alter production's schema.
- **Migrations use Neon's direct endpoint** via the `PAYLOAD_MIGRATING` flag; the pooler
  runs PgBouncer in transaction mode and can't reliably carry DDL. Runtime uses pooled.
- **`build` runs `db:migrate` first**, so Vercel applies migrations before Next builds
  pages that read the database.
- **Media is served straight from the Blob CDN** (`disablePayloadAccessControl: true`)
  rather than proxied through Payload's file route — one less serverless invocation per
  asset on a site that is mostly photography.
- **Testimonials carry a `verified` flag** specifically to separate "safe for structured
  data" from "safe to display".

## Traps that already cost time — don't rediscover them

**Block `dbName` must be the function form.**
```ts
dbName: ({ tableName }) => `${tableName}_b_txtmed`   // correct
dbName: 'txt_media'                                   // WRONG
```
A string replaces the *entire* table name, so a block used by several collections
collapses into one shared table whose `_parent_id` FK points at whichever collection was
created first. Every other collection then fails to insert. Short names are needed at all
because Postgres caps identifiers at 63 characters and Payload derives names from the
full nested path, which overflows inside versioned collections.

**Metadata routes belong at `src/app/` root.** `robots.ts` inside `(frontend)` compiled
to a static page and was shadowed by the `[slug]` catch-all — `/robots.txt` 404'd with no
build warning, while `sitemap.ts` in the same folder worked. After touching either, curl
them against a running server; a green build proves nothing.

**The SEO plugin's `collections` option fights manual fields.** Passing `collections` to
`seoPlugin` makes it inject its own `meta` group, which replaced the hand-inserted fields
and silently dropped `meta.image` and the whole advanced group. The plugin is configured
with `generateTitle`/`generateURL` only; fields come from `seoTab()` per collection.

**Page titles need `title: { absolute }`.** The root layout sets a title template, which
Next applies on top of page metadata — producing "X | Kingson | Kingson" until
`generateMeta` started returning `absolute`.

**The seed needs its own env bootstrap.** It runs via `tsx`, not the `payload` CLI, so it
imports `./env` *first* — before `@payload-config`, which reads `process.env` while being
evaluated.

**Revalidation hooks must respect `context.disableRevalidate`.** `revalidateTag` throws
`Invariant: static generation store missing` outside a Next request, which breaks the
seed. All hooks now guard on it.

## Re-seeding

`pnpm seed` is idempotent by slug — safe to re-run, it updates rather than duplicates.
`pnpm seed --fresh` deletes seeded content first. A full run takes a few minutes: ~49
image uploads plus ~45 document writes, all transatlantic to Neon in `iad1`.

If the schema and config ever diverge, the symptom is an opaque Drizzle error naming a
missing column. Fix with `pnpm db:migrate:create <name> && pnpm db:migrate`.

## Content sources

- `docs/client-brief/staff-interview-questions.md` — Dave's answers; the source of the
  site's voice and every proof point
- `docs/client-brief/page-copy-brief.md` — the client's home-page outline. Harry said to
  treat it as a floor, not a ceiling
- `seed-assets/kingson/` — 49 images taken from `gardenelectrician.co.uk`'s open
  WordPress media API (238 items available there in total, if more are wanted)
