'use client'

import { Moon, Sun } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'
import { useTheme } from '..'

/**
 * Light/dark switch.
 *
 * Two states rather than three. "Auto" sounds tidier but it makes the site's
 * appearance depend on a setting the visitor may not know they have, and the
 * palette here is a brand asset — light is the intended presentation and dark
 * is an opt-in. The choice is stored, so it survives a reload; `InitTheme`
 * applies it before first paint so there is no flash.
 *
 * Both icons are always rendered and swapped in CSS off `[data-theme]`, and
 * the label stays fixed. Choosing the icon from React state instead would
 * hydrate against markup the server rendered without knowing the stored
 * theme, which React reports as a mismatch and repairs by discarding the
 * tree. The current theme is read from the document at click time for the
 * same reason.
 */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { setTheme } = useTheme()

  return (
    <button
      aria-label="Switch between the light and dark theme"
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-md transition-colors',
        'hover:bg-canvas-subtle text-ink hover:text-brand',
        className,
      )}
      onClick={() =>
        setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')
      }
      title="Switch between the light and dark theme"
      type="button"
    >
      <Moon aria-hidden className="size-4.5 dark:hidden" />
      <Sun aria-hidden className="hidden size-4.5 dark:block" />
    </button>
  )
}
