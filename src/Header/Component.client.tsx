'use client'

import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { Button, Container, Eyebrow, Text } from '@/design-system'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import { getDocumentPath } from '@/utilities/routing'
import { cn } from '@/utilities/ui'

export type MegamenuColumnData = { description?: string | null; href: string; label: string }

type Props = {
  autoColumns: Record<string, MegamenuColumnData[]>
  data: HeaderType
  settings: SiteSetting
}

const hrefFor = (link?: { reference?: any; type?: string | null; url?: string | null } | null) => {
  if (!link) return '/'
  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    return getDocumentPath(link.reference.relationTo, link.reference.value?.slug)
  }
  return link.url || '/'
}

/**
 * Site header.
 *
 * Transparent over a hero until the page is scrolled, then it commits to a
 * solid background — an image-led site loses its opening shot to a solid bar,
 * but text over an unknown photo needs a real backdrop once scrolling starts.
 */
export const HeaderClient: React.FC<Props> = ({ autoColumns, data, settings }) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenMenu(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navItems = data.navItems || []
  const solid = scrolled || openMenu !== null || mobileOpen
  const telHref = `tel:${settings.phoneE164 || settings.phone?.replace(/\s/g, '')}`

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-100 transition-[background-color,box-shadow,border-color] duration-(--duration-base)',
        solid
          ? 'bg-canvas/95 border-line border-b shadow-subtle backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
      ref={headerRef}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link aria-label={`${settings.businessName} — home`} className="shrink-0" href="/">
            <Logo
              className={cn('h-9 w-auto transition-[filter]', !solid && 'brightness-0 invert')}
              loading="eager"
              name={settings.businessName}
              priority="high"
              resource={settings.logo}
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isMegamenu = item.type === 'megamenu'
                const expanded = openMenu === index

                return (
                  <li key={index}>
                    {isMegamenu ? (
                      <button
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          solid ? 'text-ink hover:text-brand' : 'text-sand-50 hover:text-apricot-200',
                        )}
                        onClick={() => setOpenMenu(expanded ? null : index)}
                        type="button"
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className={cn('size-4 transition-transform', expanded && 'rotate-180')}
                        />
                      </button>
                    ) : (
                      <Link
                        className={cn(
                          'inline-block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          solid ? 'text-ink hover:text-brand' : 'text-sand-50 hover:text-apricot-200',
                        )}
                        href={hrefFor(item.link)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {data.showPhone && settings.phone && (
              <a
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-medium transition-colors',
                  solid ? 'text-ink hover:text-brand' : 'text-sand-50 hover:text-apricot-200',
                )}
                href={telHref}
              >
                <Phone aria-hidden className="size-4" />
                {settings.phone}
              </a>
            )}
            {(data.ctas || []).map(({ link }, i) => (
              <CMSLink key={i} {...link} size="sm" />
            ))}
          </div>

          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={cn('rounded-md p-2 lg:hidden', solid ? 'text-ink' : 'text-sand-50')}
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Megamenu panel */}
      {openMenu !== null && navItems[openMenu]?.type === 'megamenu' && (
        <div className="bg-gradient-wash border-line hidden border-t shadow-float lg:block">
          <Container>
            {(() => {
              const menu = navItems[openMenu]?.megamenu
              const hasFeatured = Boolean(menu?.featured?.enabled)
              const hasIntro = Boolean(menu?.description)
              // With no featured panel the link columns would leave a third of
              // the menu empty, so they widen and the lists split in two.
              const introSpan = 'col-span-3'
              const columnSpan = hasFeatured ? 'col-span-3' : hasIntro ? 'col-span-9' : 'col-span-12'
              // A flex container ignores `columns-*`, so the multi-column
              // variant has to drop flex rather than sit alongside it.
              const listClass = hasFeatured
                ? 'mt-4 flex flex-col gap-1'
                : 'mt-4 block columns-2 gap-x-8 xl:columns-3'

              return (
            <div className="grid grid-cols-12 gap-10 py-10">
              {hasIntro && (
                <div className={introSpan}>
                  <Eyebrow>{navItems[openMenu]?.label}</Eyebrow>
                  <Text className="mt-4" size="sm">
                    {navItems[openMenu]?.megamenu?.description}
                  </Text>
                  <Button asChild className="mt-6" size="sm" variant="outline">
                    <Link href={hrefFor(navItems[openMenu]?.link)}>View all</Link>
                  </Button>
                </div>
              )}

              {(navItems[openMenu]?.megamenu?.columns || []).map((column, columnIndex) => {
                const links: MegamenuColumnData[] =
                  column.source === 'manual'
                    ? (column.links || []).map((entry) => ({
                        label: entry.link?.label || '',
                        href: hrefFor(entry.link),
                        description: entry.description,
                      }))
                    : autoColumns[column.source || ''] || []

                if (!links.length) return null

                return (
                  <div className={columnSpan} key={columnIndex}>
                    {column.heading && (
                      <p className="text-ink-subtle font-mono text-eyebrow uppercase">
                        {column.heading}
                      </p>
                    )}
                    <ul className={listClass}>
                      {links.map((link, linkIndex) => (
                        <li className="break-inside-avoid" key={linkIndex}>
                          <Link
                            className="group hover:bg-canvas-subtle block rounded-md px-3 py-2 transition-colors"
                            href={link.href}
                          >
                            <span className="text-ink group-hover:text-brand block text-sm font-medium">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="text-ink-subtle mt-0.5 line-clamp-1 block text-xs">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}

              {hasFeatured && (
                <div className="col-span-3">
                  <Link className="group block" href={hrefFor(navItems[openMenu]?.megamenu?.featured?.link)}>
                    {navItems[openMenu]?.megamenu?.featured?.image && (
                      <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                        <Media
                          resource={navItems[openMenu]?.megamenu?.featured?.image}
                          fill
                          htmlElement={null}
                          size="320px"
                          imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-(--duration-slow) group-hover:scale-105"
                        />
                      </div>
                    )}
                    <p className="text-ink group-hover:text-brand mt-4 font-medium">
                      {navItems[openMenu]?.megamenu?.featured?.title}
                    </p>
                    <p className="text-ink-subtle mt-1 text-sm">
                      {navItems[openMenu]?.megamenu?.featured?.description}
                    </p>
                  </Link>
                </div>
              )}
            </div>
              )
            })()}
          </Container>
        </div>
      )}

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="bg-canvas border-line h-[calc(100svh-5rem)] overflow-y-auto border-t lg:hidden">
          <Container className="py-8">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="text-ink border-line block border-b py-4 text-lg font-medium"
                      href={hrefFor(item.link)}
                    >
                      {item.label}
                    </Link>
                    {item.type === 'megamenu' && (
                      <ul className="flex flex-col py-2">
                        {(item.megamenu?.columns || []).flatMap((column) =>
                          (column.source === 'manual'
                            ? (column.links || []).map((entry) => ({
                                label: entry.link?.label || '',
                                href: hrefFor(entry.link),
                              }))
                            : autoColumns[column.source || ''] || []
                          ).map((link, linkIndex) => (
                            <li key={`${column.id}-${linkIndex}`}>
                              <Link className="text-ink-muted block py-2 pl-4 text-sm" href={link.href}>
                                {link.label}
                              </Link>
                            </li>
                          )),
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              {(data.ctas || []).map(({ link }, i) => (
                <CMSLink key={i} {...link} size="lg" />
              ))}
              {settings.phone && (
                <a
                  className="text-brand inline-flex items-center justify-center gap-2 py-3 text-base font-medium"
                  href={telHref}
                >
                  <Phone aria-hidden className="size-4" />
                  {settings.phone}
                </a>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
