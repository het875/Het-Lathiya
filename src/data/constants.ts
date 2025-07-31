/**
 * Portfolio Configuration Constants
 * Central place for all configuration values and settings
 */

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const SITE_CONFIG = {
  title: "Het Lathiya | Python Software Developer",
  description: "Passionate Python developer with expertise in financial systems, web scraping, and backend development. Building efficient solutions with FastAPI, Django, and modern technologies.",
  keywords: [
    "Python Developer",
    "Backend Developer",
    "FastAPI",
    "Django",
    "Web Scraping",
    "FinTech",
    "Software Engineer",
    "REST APIs",
    "Financial Systems",
    "Data Processing"
  ],
  author: "Het Lathiya",
  siteUrl: "https://het-portfolio.vercel.app", // Update with actual domain
  image: "/og-image.jpg", // Add when available
  favicon: "/favicon.ico"
} as const;

// =============================================================================
// ANIMATION SETTINGS
// =============================================================================

export const ANIMATION_CONFIG = {
  // Global animation settings
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8
  },
  easing: {
    default: "ease-out",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  // Page transition settings
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  // Section reveal settings
  sectionReveal: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  // Stagger animations
  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }
  }
} as const;

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

export const THEME_CONFIG = {
  // Color palette based on Python-inspired design
  colors: {
    primary: {
      blue: "#306998",
      yellow: "#ffd43b",
      green: "#4b8b3b",
      electricBlue: "#1e90ff",
      neonGreen: "#39ff14"
    },
    dark: {
      background: "#000000",
      surface: "#0a0a0a",
      surfaceVariant: "#1a1a1a",
      text: "#ffffff",
      textSecondary: "#a1a1aa"
    },
    light: {
      background: "#fafafa",
      surface: "#ffffff",
      surfaceVariant: "#f5f5f5",
      text: "#000000",
      textSecondary: "#6b7280"
    }
  },
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
    code: "JetBrains Mono, Monaco, monospace"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
} as const;

// =============================================================================
// NAVIGATION CONFIGURATION
// =============================================================================

export const NAVIGATION = {
  main: [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" }
  ],
  social: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/het-lathiya-83a310281/",
      icon: "linkedin"
    },
    {
      name: "GitHub",
      href: "https://github.com/het875",
      icon: "github"
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/hetlathiya875/",
      icon: "code"
    },
    {
      name: "HackerRank",
      href: "https://www.hackerrank.com/profile/hetglathiya875",
      icon: "terminal"
    }
  ]
} as const;

// =============================================================================
// CONTACT CONFIGURATION
// =============================================================================

export const CONTACT_CONFIG = {
  email: "hetglathiya875@gmail.com",
  phone: "+91 8758803220",
  location: "Surat, Gujarat, India",
  availability: "Open to opportunities",
  preferredContact: "email", // 'email' | 'phone' | 'linkedin'
  responseTime: "24 hours",
  // Contact form settings
  form: {
    emailService: "emailjs", // Configure with actual service
    templateId: "template_portfolio_contact",
    serviceId: "service_portfolio",
    publicKey: "some_public_key" // Update with actual public key
  }
} as const;

// =============================================================================
// PROJECT CATEGORIES
// =============================================================================

export const PROJECT_CATEGORIES = {
  all: "All Projects",
  "web-app": "Web Applications",
  "api": "APIs & Backend",
  "scraping": "Data Scraping",
  "dashboard": "Dashboards",
  "management-system": "Management Systems"
} as const;

// =============================================================================
// SKILL CATEGORIES
// =============================================================================

export const SKILL_CATEGORIES = {
  language: "Programming Languages",
  framework: "Frameworks & Libraries",
  database: "Databases",
  tool: "Tools & Platforms",
  concept: "Concepts & Practices",
  soft: "Soft Skills"
} as const;

// =============================================================================
// EXPERIENCE SETTINGS
// =============================================================================

export const EXPERIENCE_CONFIG = {
  showDuration: true,
  showTechnologies: true,
  maxTechnologiesShown: 5,
  dateFormat: "MMM yyyy", // Format for displaying dates
  currentLabel: "Present"
} as const;

// =============================================================================
// SEO CONFIGURATION
// =============================================================================

export const SEO_CONFIG = {
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.title,
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title
      }
    ]
  },
  twitter: {
    handle: "@hetlathiya", // Update with actual handle
    site: "@hetlathiya",
    cardType: "summary_large_image"
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      name: "application-name",
      content: SITE_CONFIG.title
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default"
    },
    {
      name: "apple-mobile-web-app-title",
      content: SITE_CONFIG.title
    }
  ]
} as const;

// =============================================================================
// PERFORMANCE SETTINGS
// =============================================================================

export const PERFORMANCE_CONFIG = {
  // Image optimization
  images: {
    formats: ["webp", "avif"],
    sizes: {
      small: 400,
      medium: 800,
      large: 1200,
      xlarge: 1600
    },
    quality: 85
  },
  // Lazy loading
  lazyLoading: {
    rootMargin: "50px",
    threshold: 0.1
  },
  // Animation performance
  animations: {
    reducedMotion: true, // Respect user preferences
    optimizeForMobile: true
  }
} as const;

// =============================================================================
// FEATURE FLAGS
// =============================================================================

export const FEATURE_FLAGS = {
  enableDarkMode: true,
  enableAnimations: true,
  enableContactForm: true,
  enableBlogSection: false, // For future implementation
  enableTestimonials: false, // For future implementation
  enableAnalytics: true,
  enableProgressiveWebApp: true
} as const;

// =============================================================================
// ANALYTICS CONFIGURATION
// =============================================================================

export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    measurementId: "some_measurement_id", // Update with actual ID
    enabled: FEATURE_FLAGS.enableAnalytics
  },
  // Add other analytics services as needed
  hotjar: {
    siteId: "some_hotjar_site_id", // Update with actual ID
    enabled: false
  }
} as const;

// =============================================================================
// DEVELOPMENT SETTINGS
// =============================================================================

export const DEV_CONFIG = {
  showGrid: false, // Show layout grid in development
  showAnimationDebug: false, // Show animation debug info
  logPerformance: false, // Log performance metrics
  enableDevTools: false
} as const;

// Export all configurations
export default {
  SITE_CONFIG,
  ANIMATION_CONFIG,
  THEME_CONFIG,
  NAVIGATION,
  CONTACT_CONFIG,
  PROJECT_CATEGORIES,
  SKILL_CATEGORIES,
  EXPERIENCE_CONFIG,
  SEO_CONFIG,
  PERFORMANCE_CONFIG,
  FEATURE_FLAGS,
  ANALYTICS_CONFIG,
  DEV_CONFIG
};
