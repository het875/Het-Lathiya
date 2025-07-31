# Het Portfolio Design System

## 🎨 Design Philosophy

### Core Principles
- **Cinematic Experience**: Every interaction tells a story
- **Theatrical Timing**: Animations have dramatic pacing and purpose
- **Python-Inspired Aesthetics**: Deep blues, vibrant greens, electric yellows against pitch black
- **Performance First**: 60fps animations with optimized rendering
- **Accessibility Always**: Respects user preferences and WCAG guidelines

---

## 🎭 Animation System

### Animation Categories

#### 1. Entrance Animations
```typescript
// Fade In with Slide
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
}

// Dramatic Reveal
const dramaticReveal = {
  initial: { opacity: 0, scale: 0.8, y: 40 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
}

// Typewriter Effect
const typewriter = {
  initial: { width: 0 },
  animate: { width: "auto" },
  transition: { duration: 2, ease: "easeInOut" }
}
```

#### 2. Micro-Interactions
```typescript
// Button Hover
const buttonHover = {
  scale: 1.05,
  boxShadow: "0 10px 30px rgba(255, 212, 59, 0.3)",
  transition: { duration: 0.3, ease: "easeOut" }
}

// Card Hover
const cardHover = {
  y: -8,
  scale: 1.02,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
}

// Icon Pulse
const iconPulse = {
  scale: [1, 1.2, 1],
  rotate: [0, 5, -5, 0],
  transition: { duration: 0.6, ease: "easeInOut" }
}
```

#### 3. Page Transitions
```typescript
// Page Slide Transition
const pageTransition = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
}

// Cinematic Wipe
const cinematicWipe = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { clipPath: "inset(0 0% 0 0)" },
  transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
}
```

### GSAP Timeline Patterns

#### 1. Section Entrance
```typescript
const sectionEntranceTimeline = () => {
  const tl = gsap.timeline({ paused: true });
  
  tl.from(".section-title", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from(".section-content", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  }, "-=0.5")
  .from(".section-decoration", {
    scale: 0,
    rotation: 180,
    duration: 0.6,
    ease: "back.out(1.7)"
  }, "-=0.3");
  
  return tl;
};
```

#### 2. Scroll-Triggered Animations
```typescript
const scrollAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Parallax Background
  gsap.to(".parallax-bg", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
  
  // Staggered Cards
  gsap.from(".project-card", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
};
```

### Performance Guidelines

#### 1. Animation Optimization
```typescript
// Use will-change strategically
const optimizedMotion = {
  style: { willChange: "transform, opacity" },
  animate: { x: 100, opacity: 1 },
  onAnimationComplete: () => {
    // Remove will-change after animation
    element.style.willChange = "auto";
  }
}

// Prefer transforms over layout properties
const performantAnimation = {
  // ✅ Good - transforms
  x: 100,
  scale: 1.2,
  rotate: 45,
  
  // ❌ Avoid - layout properties
  // width: "200px",
  // height: "200px",
  // top: "100px"
}
```

#### 2. Reduced Motion Support
```typescript
const respectsMotionPreference = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.1 : 0.8
  }
}
```

---

## 🎨 Color System

### Python-Inspired Palette
```css
:root {
  /* Primary Colors - Python Inspired */
  --python-blue: #306998;
  --python-blue-light: #4c8bc7;
  --python-blue-dark: #1e4d6b;
  
  --python-yellow: #ffd43b;
  --python-yellow-light: #ffe066;
  --python-yellow-dark: #e6bf00;
  
  --python-green: #4b8b3b;
  --python-green-light: #6ba05b;
  --python-green-dark: #3a6b2a;
  
  /* Accent Colors */
  --electric-blue: #1e90ff;
  --neon-green: #39ff14;
  --cyber-purple: #8a2be2;
  --terminal-orange: #ff6600;
  
  /* Neutral Grays */
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-300: #d4d4d4;
  --gray-400: #a3a3a3;
  --gray-500: #737373;
  --gray-600: #525252;
  --gray-700: #404040;
  --gray-800: #262626;
  --gray-900: #171717;
  --gray-950: #0a0a0a;
  
  /* Dark Theme (Primary) */
  --background: #000000;
  --surface: #0a0a0a;
  --surface-variant: #1a1a1a;
  --surface-elevated: #262626;
  
  /* Light Theme */
  --background-light: #fafafa;
  --surface-light: #ffffff;
  --surface-variant-light: #f5f5f5;
  --surface-elevated-light: #ffffff;
  
  /* Semantic Colors */
  --success: var(--python-green);
  --warning: var(--python-yellow);
  --error: #ef4444;
  --info: var(--electric-blue);
  
  /* Text Colors */
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-muted: #737373;
  --text-inverse: #000000;
}

/* Light theme overrides */
[data-theme="light"] {
  --background: var(--background-light);
  --surface: var(--surface-light);
  --surface-variant: var(--surface-variant-light);
  --surface-elevated: var(--surface-elevated-light);
  --text-primary: #000000;
  --text-secondary: #525252;
  --text-muted: #737373;
  --text-inverse: #ffffff;
}
```

### Color Usage Guidelines
```css
/* Component Color Patterns */
.btn-primary {
  background: var(--python-blue);
  color: var(--text-inverse);
  border: 2px solid var(--python-blue);
}

.btn-secondary {
  background: transparent;
  color: var(--python-yellow);
  border: 2px solid var(--python-yellow);
}

.card-elevated {
  background: var(--surface-elevated);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.text-accent {
  background: linear-gradient(135deg, var(--python-yellow), var(--electric-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 📐 Spacing & Layout System

### Spacing Scale
```css
:root {
  /* Spacing Scale (based on 8px grid) */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;
  --space-48: 192px;
  --space-56: 224px;
  --space-64: 256px;
  
  /* Responsive Spacing */
  --space-section: clamp(4rem, 8vw, 8rem);
  --space-container: clamp(1rem, 4vw, 2rem);
}
```

### Layout Grid
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-container);
}

.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-12 {
  grid-template-columns: repeat(12, 1fr);
}

.section {
  padding: var(--space-section) 0;
}
```

---

## 🔤 Typography System

### Font Configuration
```css
:root {
  /* Font Families */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: "Satoshi", "Inter", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  --text-7xl: 4.5rem;    /* 72px */
  --text-8xl: 6rem;      /* 96px */
  --text-9xl: 8rem;      /* 128px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### Typography Components
```css
.headline-1 {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

.headline-2 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

.body-large {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.caption {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

.code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  background: var(--surface-variant);
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
}
```

---

## 📱 Responsive Design System

### Breakpoints
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Responsive Animation Scaling
```typescript
const getResponsiveAnimation = (baseAnimation: any) => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024;
  
  return {
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      duration: isMobile ? baseAnimation.transition.duration * 0.7 : baseAnimation.transition.duration,
    }
  };
};
```

---

## 🧩 Component Architecture

### Component Naming Conventions
```typescript
// Component Files
ComponentName.tsx          // Main component
ComponentName.stories.tsx  // Storybook stories
ComponentName.test.tsx     // Unit tests
ComponentName.module.css   // Component styles (if needed)
index.ts                   // Barrel export

// Component Structure
interface ComponentNameProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'component-base-styles',
        variants[variant],
        sizes[size],
        isLoading && 'loading-styles',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

### Animation Hooks Pattern
```typescript
// useAnimation.ts
export const useScrollAnimation = (threshold = 0.1) => {
  const [ref, inView] = useInView({ threshold });
  
  return {
    ref,
    initial: { opacity: 0, y: 60 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  };
};

// useGSAPTimeline.ts
export const useGSAPTimeline = (dependencies: any[] = []) => {
  const timelineRef = useRef<gsap.core.Timeline>();
  
  useGSAP(() => {
    timelineRef.current = gsap.timeline({ paused: true });
    return () => {
      timelineRef.current?.kill();
    };
  }, dependencies);
  
  return timelineRef.current;
};
```

---

## 🎯 Performance Standards

### Animation Performance Checklist
- [ ] Use `transform` and `opacity` for animations
- [ ] Apply `will-change` strategically and remove after animation
- [ ] Respect `prefers-reduced-motion`
- [ ] Target 60fps for all animations
- [ ] Use `transform3d()` to trigger hardware acceleration
- [ ] Optimize animation complexity on mobile devices

### Code Quality Standards
- [ ] All components are TypeScript with strict types
- [ ] Use React.memo() for expensive components
- [ ] Implement proper error boundaries
- [ ] Follow WCAG accessibility guidelines
- [ ] Maintain Lighthouse scores above 95

---

## 🔧 Development Conventions

### File Organization
```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   └── common/             # Reusable components
├── hooks/                  # Custom hooks
├── lib/
│   ├── animations.ts       # Animation utilities
│   ├── utils.ts           # General utilities
│   └── constants.ts       # App constants
├── styles/
│   ├── globals.css        # Global styles & Tailwind
│   ├── animations.css     # Animation keyframes
│   └── components.css     # Component overrides
├── types/                 # TypeScript definitions
└── data/                  # Static content
```

### Git Commit Conventions
```
feat: add hero section with cinematic animations
fix: resolve animation performance on mobile
style: update Python color palette
refactor: improve GSAP timeline management
docs: add animation system documentation
test: add component interaction tests
```

This design system will serve as the foundation for creating a world-class, cinematic portfolio that meets Awwwards standards while maintaining exceptional performance and accessibility.
