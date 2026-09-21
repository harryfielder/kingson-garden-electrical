import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { draftMode } from 'next/headers'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { JsonLd } from '@/components/JsonLd'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { buildGraph, organisationSchema, websiteSchema } from '@/seo/schema'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import { getServerSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

import './globals.css'

/**
 * Fraunces carries the editorial half of the brand. Loaded as a variable font
 * with `display: swap`, so a slow font fetch delays styling rather than text —
 * a blocking font is one of the easiest ways to lose an LCP score.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getSiteSettings()

  // Emitted once, in the layout, so the organisation and website entities are
  // declared on every page and can be referenced by @id from page-level graphs.
  const siteGraph = buildGraph([organisationSchema(settings), websiteSchema(settings)])

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, fraunces.variable)}
      data-theme="light"
      lang="en-GB"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <JsonLd data={siteGraph} />
      </head>
      <body>
        <a
          className="sr-only-focusable bg-brand text-brand-foreground absolute top-2 left-2 z-100 rounded-md px-4 py-2 text-sm font-medium"
          href="#main"
        >
          Skip to content
        </a>
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <Header />
          <main className="flex-1 pt-20" id="main">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: settings.businessName || 'Kingson Garden Electrical',
      template: settings.titleTemplate || '%s',
    },
    description: settings.description,
    applicationName: settings.businessName,
    ...(settings.googleSiteVerification
      ? { verification: { google: settings.googleSiteVerification } }
      : {}),
    formatDetection: { telephone: true },
  }
}
