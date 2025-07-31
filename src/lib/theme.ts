// Theme configuration with Python-inspired color palette
export const theme = {
  colors: {
    // Python-inspired primary colors
    python: {
      blue: '#306998',
      yellow: '#ffd43b',
      green: '#4b8b3b',
      electric: '#1e90ff',
      neon: '#39ff14'
    },
    
    // Dark mode (primary theme)
    dark: {
      background: '#000000',
      surface: '#0a0a0a',
      surfaceVariant: '#1a1a1a',
      border: '#2a2a2a',
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
        accent: '#ffd43b'
      }
    },
    
    // Light mode (secondary theme) 
    light: {
      background: '#fafafa',
      surface: '#ffffff',
      surfaceVariant: '#f5f5f5',
      border: '#e5e5e5',
      text: {
        primary: '#1a1a1a',
        secondary: '#666666',
        accent: '#306998'
      }
    },
    
    // Semantic colors
    semantic: {
      success: '#39ff14',
      warning: '#ffd43b',
      error: '#ff4444',
      info: '#1e90ff'
    }
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      display: 'Space Grotesk, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
      '9xl': '8rem'      // 128px
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    }
  },
  
  // Spacing scale
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },
  
  // Animation configuration
  animation: {
    duration: {
      fast: '0.2s',
      base: '0.3s',
      slow: '0.5s',
      slower: '0.8s',
      cinematic: '1.2s'
    },
    
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      dramatic: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Box shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(255 212 59 / 0.3)',
    glowLarge: '0 0 60px rgb(57 255 20 / 0.4)'
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  }
} as const

// CSS custom properties generator
export const generateCSSCustomProperties = (isDark: boolean = true) => {
  const currentTheme = isDark ? theme.colors.dark : theme.colors.light
  
  return {
    // Colors
    '--color-background': currentTheme.background,
    '--color-surface': currentTheme.surface,
    '--color-surface-variant': currentTheme.surfaceVariant,
    '--color-border': currentTheme.border,
    '--color-text-primary': currentTheme.text.primary,
    '--color-text-secondary': currentTheme.text.secondary,
    '--color-text-accent': currentTheme.text.accent,
    
    // Python colors
    '--color-python-blue': theme.colors.python.blue,
    '--color-python-yellow': theme.colors.python.yellow,
    '--color-python-green': theme.colors.python.green,
    '--color-python-electric': theme.colors.python.electric,
    '--color-python-neon': theme.colors.python.neon,
    
    // Animation
    '--animation-duration-fast': theme.animation.duration.fast,
    '--animation-duration-base': theme.animation.duration.base,
    '--animation-duration-slow': theme.animation.duration.slow,
    '--animation-duration-cinematic': theme.animation.duration.cinematic,
    '--animation-easing-dramatic': theme.animation.easing.dramatic,
    '--animation-easing-bounce': theme.animation.easing.bounce
  }
}

export type Theme = typeof theme
export type ThemeColors = typeof theme.colors
