/**
 * The wireframe shown for a block in the admin's "Add block" drawer.
 *
 * The SVGs live in `public/block-thumbnails/`, one per block slug, drawn at
 * 480×320 — the 3:2 frame Payload crops drawer thumbnails to.
 */
export const blockThumbnail = (slug: string, alt: string) => ({
  thumbnail: { url: `/block-thumbnails/${slug}.svg`, alt },
})
