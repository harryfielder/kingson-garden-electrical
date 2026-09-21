'use client'

import { Check, Download as DownloadIcon } from 'lucide-react'
import React, { useState } from 'react'

import RichText from '@/components/RichText'
import { Button, Stack, Text } from '@/design-system'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Props = {
  askName?: boolean | null
  consentText?: DefaultTypedEditorState | null
  downloadId: number
  submitLabel?: string | null
  successMessage?: string | null
}

/**
 * The email gate.
 *
 * The file URL arrives only in the unlock response, never in the page source,
 * so the gate cannot be skipped by viewing the HTML.
 */
export const GatedDownloadForm: React.FC<Props> = ({
  askName,
  consentText,
  downloadId,
  submitLabel,
  successMessage,
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState<string>()
  const [fileUrl, setFileUrl] = useState<string>()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage(undefined)

    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/downloads/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          downloadId,
          email: form.get('email'),
          name: form.get('name') || undefined,
          marketingConsent: form.get('marketingConsent') === 'on',
          sourceUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(result.error || 'Something went wrong. Please try again.')
        return
      }

      setFileUrl(result.url)
      setStatus('done')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'done' && fileUrl) {
    return (
      <Stack gap="md" role="status">
        <Text as="span" className="text-brand inline-flex items-center gap-2" weight="semibold">
          <Check aria-hidden className="size-5" />
          {successMessage || 'Thanks — your download is ready.'}
        </Text>
        <Button asChild variant="accent" size="lg">
          <a download href={fileUrl} rel="noopener">
            <DownloadIcon aria-hidden className="size-4" />
            Download now
          </a>
        </Button>
      </Stack>
    )
  }

  const inputClass =
    'border-line bg-surface text-ink placeholder:text-ink-subtle h-11 w-full rounded-md border px-3.5 text-sm outline-none focus-visible:border-brand'

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {askName && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="gated-name">
            Your name
          </label>
          <input autoComplete="name" className={inputClass} id="gated-name" name="name" type="text" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="gated-email">
          Email address <span aria-hidden>*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          autoComplete="email"
          className={inputClass}
          id="gated-email"
          name="email"
          required
          type="email"
        />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input className="mt-1 size-4 shrink-0" name="marketingConsent" type="checkbox" />
        <span className="text-ink-muted">
          {consentText ? (
            <RichText data={consentText} enableGutter={false} enableProse={false} size="sm" />
          ) : (
            'Keep me updated with occasional garden lighting ideas. Unsubscribe any time.'
          )}
        </span>
      </label>

      {status === 'error' && message && (
        <p className="text-destructive text-sm" role="alert">
          {message}
        </p>
      )}

      <Button disabled={status === 'loading'} size="lg" type="submit" variant="accent">
        {status === 'loading' ? 'Sending…' : submitLabel || 'Send me the guide'}
      </Button>
    </form>
  )
}
