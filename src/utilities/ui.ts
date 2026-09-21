import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * `cn` — merge class names, resolving Tailwind conflicts.
 *
 * tailwind-merge only knows Tailwind's stock scales. Our design tokens add
 * custom font sizes (`text-display-1`, `text-h2`, `text-lead`, `text-eyebrow`),
 * and without registering them here tailwind-merge treats `text-h2` and
 * `text-ink` as the same kind of utility — a colour — and silently drops the
 * size. That made every heading on the site render at body size.
 *
 * Custom spacing scales (`py-section`, `px-gutter`) need the same treatment.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['display-1', 'display-2', 'h1', 'h2', 'h3', 'h4', 'lead', 'eyebrow'],
        },
      ],
      'font-family': [{ font: ['display', 'sans', 'mono'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
