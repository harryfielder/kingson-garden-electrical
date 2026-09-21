// Mirrors the breakpoint tokens declared in app/(frontend)/globals.css.
// Kept in JS because next.config and the image `sizes` calculation cannot read
// CSS custom properties.

export const cssVariables = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1440,
  },
}
