'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import React, { Suspense, useEffect } from 'react'

import { GA_MEASUREMENT_ID, trackEvent } from '@/utilities/analytics'

/**
 * Fires a `page_view` on every route change.
 *
 * The App Router navigates client-side, so the tag's own load-time page view
 * would only ever count the landing page. Automatic page views are switched off
 * in the config below and sent from here instead, once per URL.
 */
const PageViews: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.toString()

    trackEvent('page_view', {
      page_location: `${window.location.origin}${pathname}${query ? `?${query}` : ''}`,
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}

export const GoogleAnalytics: React.FC = () => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`}
    </Script>
    {/* useSearchParams opts the subtree into client rendering; the boundary keeps that to this component */}
    <Suspense fallback={null}>
      <PageViews />
    </Suspense>
  </>
)
