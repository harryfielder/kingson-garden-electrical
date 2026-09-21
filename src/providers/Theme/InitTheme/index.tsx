import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../shared'

/**
 * Applies the stored theme before first paint.
 *
 * Deliberately does *not* fall back to `prefers-color-scheme`: this is a brand
 * site, and half the audience silently receiving a different palette makes the
 * presentation unpredictable. The dark palette is an explicit opt-in via the
 * theme toggle in the header.
 *
 * A plain inline script rather than `next/script`: this has to run before the
 * document paints, and `beforeInteractive` inside a component draws a warning
 * from React about script tags it will not execute on the client. Running once
 * per document load is exactly what is wanted here.
 */
export const InitTheme: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var p=window.localStorage.getItem('${themeLocalStorageKey}');document.documentElement.setAttribute('data-theme',p==='light'||p==='dark'?p:'${defaultTheme}')}catch(e){document.documentElement.setAttribute('data-theme','${defaultTheme}')}})();`,
    }}
  />
)
