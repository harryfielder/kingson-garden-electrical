import {
  Award,
  Check,
  Clock,
  Droplet,
  Home,
  Leaf,
  Lightbulb,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import React from 'react'

/**
 * Editors pick an icon by name from a select field; this maps those names to
 * components. Importing individually (rather than dynamically) keeps the set
 * tree-shakeable and avoids shipping the whole icon library.
 */
const icons: Record<string, LucideIcon> = {
  award: Award,
  check: Check,
  clock: Clock,
  droplet: Droplet,
  home: Home,
  leaf: Leaf,
  lightbulb: Lightbulb,
  mapPin: MapPin,
  phone: Phone,
  shield: Shield,
  sparkles: Sparkles,
  users: Users,
  wrench: Wrench,
  zap: Zap,
}

export const Icon: React.FC<{ className?: string; name?: string | null }> = ({
  className,
  name,
}) => {
  const Component = icons[name || 'check'] || Check
  return <Component aria-hidden className={className} />
}
