/**
 * Premium Typography System - Awwwards Style
 * Inspired by award-winning portfolio websites
 */

export const typography = {
  // Font Families - Award-Winning Premium Fonts
  fonts: {
    display: '"Playfair Display", "Cormorant Garamond", "Times New Roman", serif',
    heading: '"Space Grotesk", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"DM Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "IBM Plex Mono", "SF Mono", "Monaco", monospace',
    tech: '"Space Grotesk", "Inter", monospace',
  },

  // Premium text scale with fluid sizing
  scale: {
    display: 'clamp(3rem, 8vw, 8rem)',
    hero: 'clamp(2.5rem, 6vw, 6rem)',
    h1: 'clamp(2.25rem, 5vw, 4.5rem)',
    h2: 'clamp(1.875rem, 4vw, 3rem)',
    h3: 'clamp(1.5rem, 3vw, 2.25rem)',
    h4: 'clamp(1.25rem, 2.5vw, 1.875rem)',
    h5: 'clamp(1.125rem, 2vw, 1.5rem)',
    h6: 'clamp(1rem, 1.8vw, 1.25rem)',
    body: 'clamp(1rem, 1.5vw, 1.125rem)',
    small: 'clamp(0.875rem, 1.3vw, 1rem)',
    caption: 'clamp(0.75rem, 1.1vw, 0.875rem)',
  },

  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeights: {
    tight: 0.9,
    snug: 1.1,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Typography utility classes generator
export const getTypographyClasses = () => ({
  // Display text (hero sections)
  display: {
    fontFamily: typography.fonts.display,
    fontSize: typography.scale.display,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tighter,
    fontStyle: 'italic',
  },

  // Large hero text
  hero: {
    fontFamily: typography.fonts.display,
    fontSize: typography.scale.hero,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  // Main headings
  heading: {
    fontFamily: typography.fonts.heading,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.snug,
    letterSpacing: typography.letterSpacing.tight,
  },

  // Body text
  body: {
    fontFamily: typography.fonts.body,
    fontSize: typography.scale.body,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.relaxed,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Code/technical text
  mono: {
    fontFamily: typography.fonts.mono,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
    letterSpacing: typography.letterSpacing.wide,
  },

  // Technical badges/labels
  tech: {
    fontFamily: typography.fonts.tech,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.normal,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
});

// CSS-in-JS styles for components
export const typographyStyles = {
  // Hero section large text
  heroDisplay: `
    font-family: ${typography.fonts.display};
    font-size: ${typography.scale.display};
    font-weight: ${typography.weights.regular};
    line-height: ${typography.lineHeights.tight};
    letter-spacing: ${typography.letterSpacing.tighter};
    font-style: italic;
  `,

  // Section headings
  sectionHeading: `
    font-family: ${typography.fonts.heading};
    font-size: ${typography.scale.h2};
    font-weight: ${typography.weights.semibold};
    line-height: ${typography.lineHeights.snug};
    letter-spacing: ${typography.letterSpacing.tight};
  `,

  // Card titles
  cardTitle: `
    font-family: ${typography.fonts.heading};
    font-size: ${typography.scale.h4};
    font-weight: ${typography.weights.semibold};
    line-height: ${typography.lineHeights.snug};
    letter-spacing: ${typography.letterSpacing.tight};
  `,

  // Body paragraph
  bodyText: `
    font-family: ${typography.fonts.body};
    font-size: ${typography.scale.body};
    font-weight: ${typography.weights.regular};
    line-height: ${typography.lineHeights.relaxed};
    letter-spacing: ${typography.letterSpacing.normal};
  `,

  // Technical labels
  techLabel: `
    font-family: ${typography.fonts.tech};
    font-weight: ${typography.weights.medium};
    line-height: ${typography.lineHeights.normal};
    letter-spacing: ${typography.letterSpacing.widest};
    text-transform: uppercase;
  `,
};

// Tailwind CSS classes
export const typographyTailwind = {
  display: 'font-display text-display-size font-normal leading-tight tracking-tighter italic',
  hero: 'font-display text-hero-size font-medium leading-tight tracking-tight',
  h1: 'font-heading text-h1-size font-semibold leading-snug tracking-tight',
  h2: 'font-heading text-h2-size font-semibold leading-snug tracking-tight',
  h3: 'font-heading text-h3-size font-medium leading-snug tracking-tight',
  h4: 'font-heading text-h4-size font-semibold leading-snug tracking-tight',
  h5: 'font-heading text-h5-size font-semibold leading-normal',
  h6: 'font-heading text-h6-size font-medium leading-normal',
  body: 'font-body text-body-size font-normal leading-relaxed',
  bodyLarge: 'font-body text-lg font-normal leading-relaxed',
  small: 'font-body text-small-size font-normal leading-normal',
  caption: 'font-body text-caption-size font-normal leading-normal',
  mono: 'font-mono font-normal leading-normal tracking-wide',
  tech: 'font-tech font-medium leading-normal tracking-widest uppercase',
};

export default typography;
