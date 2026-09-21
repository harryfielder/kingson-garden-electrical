import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { Container, Divider, Heading, Section, Stack, Text } from '@/design-system'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getDocumentPath } from '@/utilities/routing'
import { getSiteSettings } from '@/utilities/getSiteSettings'

import { NewsletterForm } from './NewsletterForm'

const hrefFor = (link?: { reference?: any; type?: string | null; url?: string | null } | null) => {
  if (!link) return '/'
  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    return getDocumentPath(link.reference.relationTo, link.reference.value?.slug)
  }
  return link.url || '/'
}

export async function Footer() {
  const [footerData, settings] = await Promise.all([
    getCachedGlobal('footer', 2)(),
    getSiteSettings(),
  ])

  const address = settings.address
  const telHref = `tel:${settings.phoneE164 || settings.phone?.replace(/\s/g, '')}`
  const newsletter = footerData.newsletter
  const formId =
    newsletter?.form && typeof newsletter.form === 'object'
      ? newsletter.form.id
      : typeof newsletter?.form === 'number'
        ? newsletter.form
        : null

  return (
    <Section as="footer" spacing="none" tone="ink">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Stack gap="md">
              <Heading as="p" size="h4" tone="inverse">
                {settings.businessName}
              </Heading>
              {settings.tagline && (
                <Text size="sm" tone="inverse" measure="tight">
                  {settings.tagline}
                </Text>
              )}

              <address className="mt-2 flex flex-col gap-3 not-italic">
                {settings.phone && (
                  <a
                    className="flex items-center gap-3 text-sm text-sand-50/80 transition-colors hover:text-apricot-300"
                    href={telHref}
                  >
                    <Phone aria-hidden className="size-4 shrink-0" />
                    {settings.phone}
                  </a>
                )}
                {settings.email && (
                  <a
                    className="flex items-center gap-3 text-sm text-sand-50/80 transition-colors hover:text-apricot-300"
                    href={`mailto:${settings.email}`}
                  >
                    <Mail aria-hidden className="size-4 shrink-0" />
                    {settings.email}
                  </a>
                )}
                {(address?.streetAddress || address?.addressLocality) && (
                  <span className="flex items-start gap-3 text-sm text-sand-50/80">
                    <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
                    <span>
                      {[
                        address?.streetAddress,
                        address?.addressLocality,
                        address?.addressRegion,
                        address?.postalCode,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </span>
                )}
              </address>
            </Stack>
          </div>

          {(footerData.columns || []).map((column, index) => (
            <div className="lg:col-span-2" key={index}>
              <p className="font-mono text-eyebrow uppercase text-apricot-300">{column.heading}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {(column.links || []).map((entry, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      className="text-sm text-sand-50/80 transition-colors hover:text-apricot-300"
                      href={hrefFor(entry.link)}
                    >
                      {entry.link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {newsletter?.enabled && (
            <div className="lg:col-span-4">
              <Stack gap="md">
                <Heading as="p" size="h4" tone="inverse">
                  {newsletter.heading}
                </Heading>
                {newsletter.description && (
                  <Text size="sm" tone="inverse">
                    {newsletter.description}
                  </Text>
                )}
                <NewsletterForm consentText={newsletter.consentText} formId={formId} />
              </Stack>
            </div>
          )}
        </div>

        {footerData.showAccreditations && settings.accreditations?.length ? (
          <>
            <Divider className="bg-white/10" />
            <div className="flex flex-wrap items-center gap-8 py-8">
              {settings.accreditations.map((accreditation, index) =>
                accreditation.logo && typeof accreditation.logo === 'object' ? (
                  <Media
                    key={index}
                    resource={accreditation.logo}
                    htmlElement={null}
                    size="120px"
                    imgClassName="h-10 w-auto opacity-70 transition-opacity hover:opacity-100"
                  />
                ) : (
                  <span className="text-xs text-sand-50/60" key={index}>
                    {accreditation.name}
                    {accreditation.registrationNumber ? ` · ${accreditation.registrationNumber}` : ''}
                  </span>
                ),
              )}
            </div>
          </>
        ) : null}

        <Divider className="bg-white/10" />

        <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <Text size="xs" tone="inverse">
            © {new Date().getFullYear()} {settings.legalName || settings.businessName}
            {settings.companyNumber ? ` · Registered in England no. ${settings.companyNumber}` : ''}
          </Text>

          <ul className="flex flex-wrap gap-6">
            {(footerData.legalLinks || []).map((entry, index) => (
              <li key={index}>
                <Link
                  className="text-xs text-sand-50/70 transition-colors hover:text-apricot-300"
                  href={hrefFor(entry.link)}
                >
                  {entry.link?.label}
                </Link>
              </li>
            ))}
          </ul>

          {settings.socialProfiles?.length ? (
            <ul className="flex flex-wrap gap-4">
              {settings.socialProfiles.map((profile, index) => (
                <li key={index}>
                  <a
                    className="text-xs text-sand-50/70 capitalize transition-colors hover:text-apricot-300"
                    href={profile.url}
                    rel="noopener noreferrer me"
                    target="_blank"
                  >
                    {profile.platform}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
