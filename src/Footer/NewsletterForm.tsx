'use client'

import { ArrowRight, Check } from 'lucide-react'
import React, { useState } from 'react'

import { getClientSideURL } from '@/utilities/getURL'

/**
 * Newsletter sign-up.
 *
 * Posts to the same form-submissions endpoint as every other form, so
 * sign-ups land in the CMS alongside enquiries rather than in a second system.
 */
export const NewsletterForm: React.FC<{
  consentText?: string | null
  formId: number | null
}> = ({ consentText, formId }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState<string>()

  if (!formId) return null

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')

    setStatus('loading')
    setMessage(undefined)

    try {
      const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData: [{ field: 'email', value: email }],
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        setStatus('error')
        setMessage(result?.errors?.[0]?.message || 'Sign-up failed. Please try again.')
        return
      }

      setStatus('done')
    } catch {
      setStatus('error')
      setMessage('Sign-up failed. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-brass-300" role="status">
        <Check aria-hidden className="size-4" />
        Thanks — you’re on the list.
      </p>
    )
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          autoComplete="email"
          className="h-11 w-full rounded-md border border-white/20 bg-white/5 px-3.5 text-sm text-stone-50 placeholder:text-stone-50/45 outline-none focus-visible:border-brass-400"
          id="newsletter-email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <button
          aria-label="Sign up"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-brass-500 px-4 text-green-950 transition-colors hover:bg-brass-400 disabled:opacity-50"
          disabled={status === 'loading'}
          type="submit"
        >
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>

      {consentText && <p className="text-xs text-stone-50/55">{consentText}</p>}

      {status === 'error' && message && (
        <p className="text-xs text-red-300" role="alert">
          {message}
        </p>
      )}
    </form>
  )
}
