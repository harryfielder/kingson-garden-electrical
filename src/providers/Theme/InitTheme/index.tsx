import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

/**
 * Applies the stored theme before first paint.
 *
 * Deliberately does *not* fall back to `prefers-color-scheme`: this is a brand
 * site, and half the audience silently receiving a different palette makes the
 * presentation unpredictable. The dark palette is kept for an explicit opt-in
 * via the theme selector.
 */
export const InitTheme: React.FC = () => (
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  <Script
    dangerouslySetInnerHTML={{
      __html: `
  (function () {
    try {
      var preference = window.localStorage.getItem('${themeLocalStorageKey}')
      var theme = preference === 'light' || preference === 'dark' ? preference : '${defaultTheme}'
      document.documentElement.setAttribute('data-theme', theme)
    } catch (e) {
      document.documentElement.setAttribute('data-theme', '${defaultTheme}')
    }
  })();
  `,
    }}
    id="theme-script"
    strategy="beforeInteractive"
  />
)
