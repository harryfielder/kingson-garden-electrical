import React from 'react'

/**
 * Emits a JSON-LD graph into the document.
 *
 * Rendered server-side as a plain script tag so the payload is present in the
 * initial HTML — crawlers that do not execute JavaScript still see it.
 *
 * `<` is escaped to prevent a `</script>` sequence inside CMS content from
 * closing the tag early, which would break the page and inject raw content
 * into the DOM.
 */
export const JsonLd: React.FC<{ data: Record<string, unknown> | null }> = ({ data }) => {
  if (!data) return null

  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
