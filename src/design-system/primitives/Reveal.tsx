'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

type RevealProps = React.ComponentProps<'div'> & {
  /** Stagger in ms, for revealing grid children in sequence. */
  delay?: number
}

/**
 * Fades content up as it enters the viewport.
 *
 * Deliberately CSS-driven and initially *visible-in-markup*: the element is
 * rendered with content in the DOM and only the transform is animated, so
 * crawlers and users with JS disabled always see the content. Respects
 * prefers-reduced-motion via the global media query in globals.css.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-out-expo) motion-reduce:translate-y-0 motion-reduce:opacity-100',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
