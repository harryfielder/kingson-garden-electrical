'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export type LightboxItem = { caption?: string | null; image: MediaType }

/**
 * Accessible image lightbox.
 *
 * Implemented directly rather than pulled from a library: the whole behaviour
 * is a focus trap, three key handlers and a portal-free fixed overlay, and a
 * dependency here would cost more bytes than the feature.
 */
export const Lightbox: React.FC<{
  index: number
  items: LightboxItem[]
  onClose: () => void
  onNavigate: (index: number) => void
}> = ({ index, items, onClose, onNavigate }) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const item = items[index]
  const hasMultiple = items.length > 1

  const next = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  )
  const previous = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  )

  // Move focus into the dialog on open and restore it on close, so keyboard
  // users are not dumped back at the top of the document.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement
    closeRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      previouslyFocused.current?.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && hasMultiple) next()
      if (event.key === 'ArrowLeft' && hasMultiple) previous()

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusable?.length) return

        const first = focusable[0]!
        const last = focusable[focusable.length - 1]!

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [hasMultiple, next, onClose, previous])

  if (!item) return null

  return (
    <div
      aria-label="Image gallery"
      aria-modal="true"
      className="fixed inset-0 z-200 flex flex-col bg-green-950/95 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      ref={dialogRef}
      role="dialog"
    >
      <div className="flex items-center justify-between gap-4 p-4 text-stone-50">
        <span className="font-mono text-xs tabular-nums opacity-70">
          {index + 1} / {items.length}
        </span>
        <button
          aria-label="Close gallery"
          className="rounded-full p-2 transition-colors hover:bg-white/10"
          onClick={onClose}
          ref={closeRef}
          type="button"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
        {hasMultiple && (
          <button
            aria-label="Previous image"
            className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-stone-50 transition-colors hover:bg-white/20 md:left-6"
            onClick={previous}
            type="button"
          >
            <ChevronLeft aria-hidden className="size-6" />
          </button>
        )}

        <figure className="flex max-h-full flex-col items-center gap-4">
          <Media
            resource={item.image}
            htmlElement={null}
            size="90vw"
            imgClassName="max-h-[76svh] w-auto object-contain"
          />
          {item.caption && (
            <figcaption className="max-w-2xl text-center text-sm text-stone-50/75">
              {item.caption}
            </figcaption>
          )}
        </figure>

        {hasMultiple && (
          <button
            aria-label="Next image"
            className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-stone-50 transition-colors hover:bg-white/20 md:right-6"
            onClick={next}
            type="button"
          >
            <ChevronRight aria-hidden className="size-6" />
          </button>
        )}
      </div>
    </div>
  )
}
