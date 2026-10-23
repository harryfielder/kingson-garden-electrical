import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

/**
 * Theme behaviour is set per deployment, not in the CMS.
 *
 * - `NEXT_PUBLIC_THEME` — `light` or `dark`. With the toggle on, it is the theme
 *   a first-time visitor sees; with the toggle off, it is the only theme.
 * - `NEXT_PUBLIC_THEME_TOGGLE` — `false` hides the header toggle and ignores any
 *   choice a visitor stored earlier, so everyone gets `NEXT_PUBLIC_THEME`.
 *
 * Both are `NEXT_PUBLIC_` because the toggle and provider run in the browser,
 * which means they are inlined at build time: changing either needs a redeploy.
 * Unset, they keep the original behaviour — toggle shown, light by default.
 */
export const defaultTheme: Theme = process.env.NEXT_PUBLIC_THEME === 'dark' ? 'dark' : 'light'

export const themeToggleEnabled = process.env.NEXT_PUBLIC_THEME_TOGGLE !== 'false'

export const getImplicitPreference = (): Theme | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
