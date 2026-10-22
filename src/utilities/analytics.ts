/**
 * Google Analytics 4.
 *
 * One measurement ID for the whole site. The tag only loads on the production
 * deployment (see `GoogleAnalytics`), so previews and local dev never send hits.
 */
export const GA_MEASUREMENT_ID = 'G-1B1HPDYHL2'

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Sends a GA4 event. A no-op when the tag isn't loaded, so components can call
 * it unconditionally without checking the environment.
 */
export const trackEvent = (name: string, params: GtagParams = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
