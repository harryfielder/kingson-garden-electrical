/**
 * Design system barrel.
 *
 * Application code should import primitives from `@/design-system` only.
 * Reaching past this file into `primitives/*` couples features to the current
 * file layout and makes the system harder to evolve.
 */

export { AspectRatio, aspectVariants, type AspectRatioProps } from './primitives/AspectRatio'
export { Badge, badgeVariants, type BadgeProps } from './primitives/Badge'
export { Container, containerVariants, type ContainerProps } from './primitives/Container'
export { Divider } from './primitives/Divider'
export { Eyebrow, eyebrowVariants, type EyebrowProps } from './primitives/Eyebrow'
export { Grid, gridVariants, type GridProps } from './primitives/Grid'
export { Heading, headingVariants, type HeadingProps } from './primitives/Heading'
export { Prose, proseVariants, type ProseProps } from './primitives/Prose'
export { Reveal } from './primitives/Reveal'
export { Section, sectionVariants, type SectionProps } from './primitives/Section'
export { SectionHeader } from './primitives/SectionHeader'
export { Stack, stackVariants, type StackProps } from './primitives/Stack'
export { Surface, surfaceVariants, type SurfaceProps } from './primitives/Surface'
export { Text, textVariants, type TextProps } from './primitives/Text'

// The button lives with the template's ui primitives; re-exported so consumers
// have a single import surface.
export { Button, buttonVariants, type ButtonProps } from '@/components/ui/button'
