import React from 'react'

import { defaultTheme, themeLocalStorageKey, themeToggleEnabled } from '../shared'

/**
 * Applies the stored theme before first paint.
 *
 * Deliberately does *not* fall back to `prefers-color-scheme`: this is a brand
 * site, and half the audience silently receiving a different palette makes the
 * presentation unpredictable. The palette is whatever `NEXT_PUBLIC_THEME` sets,
 * or the visitor's own choice from the header toggle where that is enabled.
 *
 * With the toggle disabled the stored choice is ignored, so a visitor who
 * picked the other theme before the toggle was removed isn't stuck on it.
 *
 * A plain inline script rather than `next/script`: this has to run before the
 * document paints, and `beforeInteractive` inside a component draws a warning
 * from React about script tags it will not execute on the client. Running once
 * per document load is exactly what is wanted here.
 */
export const InitTheme: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: !themeToggleEnabled
        ? `document.documentElement.setAttribute('data-theme','${defaultTheme}');`
        : `(function(){try{var p=window.localStorage.getItem('${themeLocalStorageKey}');document.documentElement.setAttribute('data-theme',p==='light'||p==='dark'?p:'${defaultTheme}')}catch(e){document.documentElement.setAttribute('data-theme','${defaultTheme}')}})();`,
    }}
  />
)
