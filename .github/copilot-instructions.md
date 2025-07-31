# Copilot Instructions - Het Portfolio

## Project Overview

This is a world-class, award-winning portfolio website built with a cinematic and theatrical experience. The project embodies the aesthetic standards of Awwwards-winning websites with a sophisticated Python-inspired color scheme against a pitch-black backdrop, supporting both light and dark modes for ultimate visual impact.

## Tech Stack & Architecture

### Core Technologies
- **React 19** with TypeScript for type-safe component development
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS v4** for utility-first styling with CSS-first configuration
- **shadcn/ui** for high-quality, accessible UI components
- **GSAP** for professional-grade animations and cinematic transitions
- **Framer Motion** for React-specific animations and gesture handling
- **Lucide React** for consistent, beautiful iconography

### Design Philosophy
- **Cinematic Experience**: Every interaction should feel intentional and engaging
- **Theatrical Animations**: Smooth, dramatic transitions that tell a story
- **Python-Inspired Aesthetics**: Deep blues, vibrant greens, and electric yellows against pitch black
- **Accessibility First**: All animations respect user preferences and accessibility standards
- **Performance Optimized**: Smooth 60fps animations with optimized bundle size

## File Structure Standards

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components (Header, Footer, Navigation)
│   ├── sections/        # Page sections (Hero, About, Projects, Contact)
│   └── common/          # Common reusable components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
│   ├── utils.ts         # General utilities
│   ├── animations.ts    # GSAP animation utilities
│   └── constants.ts     # App constants and configurations
├── styles/              # Global styles and Tailwind configuration
├── types/               # TypeScript type definitions
├── assets/              # Static assets (images, videos, etc.)
└── data/                # Static data and content
```

## Animation Guidelines

### GSAP Usage
- Use for complex timeline animations and scroll-triggered effects
- Implement cinematic page transitions
- Handle scroll-based animations with ScrollTrigger
- Create smooth entrance and exit animations

### Framer Motion Usage
- Use for React component animations and state transitions
- Handle gesture-based interactions (hover, tap, drag)
- Implement layout animations with automatic positioning
- Create loading states and micro-interactions

### Animation Best Practices
- Always respect `prefers-reduced-motion` media query
- Use `will-change` property judiciously to optimize performance
- Implement proper cleanup in React components using `useGSAP`
- Maintain 60fps performance on all animations
- Use CSS transforms over position changes for smooth animations

## Theme System

### Color Palette (Python-Inspired)
```css
/* Primary Colors */
--python-blue: #306998
--python-yellow: #ffd43b
--python-green: #4b8b3b
--electric-blue: #1e90ff
--neon-green: #39ff14

/* Dark Mode (Primary) */
--background: #000000
--surface: #0a0a0a
--surface-variant: #1a1a1a

/* Light Mode (Secondary) */
--background-light: #fafafa
--surface-light: #ffffff
--surface-variant-light: #f5f5f5
```

### Typography
- Primary: Modern system fonts for readability
- Display: Custom font for headings and emphasis
- Code: Monospace for technical elements

## Component Development Standards

### React Component Structure
```tsx
// Standard component template
interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  
  return (
    // JSX
  );
};
```

### shadcn/ui Integration
- Use shadcn/ui components as base building blocks
- Customize components through Tailwind classes and CSS variables
- Maintain consistent design system across all components
- Follow shadcn/ui naming conventions and patterns

### Animation Component Patterns
```tsx
// GSAP Component Pattern
const AnimatedComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // GSAP animations here
    return () => {
      // Cleanup if needed
    };
  }, { scope: containerRef });
  
  return <div ref={containerRef}>Content</div>;
};

// Framer Motion Component Pattern
const MotionComponent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  );
};
```

## Development Workflow

### Code Quality
- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Implement proper error boundaries
- Use React.memo() for performance optimization where needed

### Testing Strategy
- Unit tests for utility functions
- Component testing for complex interactions
- Visual regression testing for animations
- Performance testing for animation smoothness

### Git Workflow
- Feature branches for all development
- Conventional commits for clear history
- Pull request reviews required
- Automated deployment on main branch

## Performance Optimization

### Bundle Optimization
- Code splitting by route and feature
- Dynamic imports for heavy libraries
- Tree shaking for unused code elimination
- Asset optimization (images, fonts, videos)

### Animation Performance
- Use CSS transforms for smooth animations
- Implement `will-change` property strategically
- Debounce scroll and resize events
- Use `requestAnimationFrame` for custom animations

### Loading Strategy
- Critical CSS inlined
- Progressive image loading
- Preload critical assets
- Lazy load below-the-fold content

## Accessibility Standards

### Animation Accessibility
- Respect `prefers-reduced-motion` setting
- Provide animation controls where appropriate
- Ensure animations don't cause seizures (avoid rapid flashing)
- Maintain focus management during transitions

### UI Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader optimization

## Content Strategy

### Portfolio Sections
1. **Hero**: Dramatic introduction with cinematic animations
2. **About**: Personal story with interactive elements
3. **Skills**: Technical expertise with visual representations
4. **Projects**: Case studies with detailed breakdowns
5. **Experience**: Professional timeline with smooth transitions
6. **Contact**: Engaging interaction forms

### Content Guidelines
- Concise, impactful copy
- Technical depth without overwhelming
- Visual storytelling through animations
- Professional yet personality-driven tone

## Deployment & Hosting

### Build Configuration
- Vite production optimizations
- Asset compression and minification
- Environment-specific configurations
- Progressive Web App features

### Hosting Requirements
- Static site hosting (Vercel, Netlify)
- CDN for global performance
- HTTPS with proper security headers
- Analytics and performance monitoring

This portfolio represents the intersection of technical excellence and artistic expression, showcasing both development skills and creative vision through a seamless, engaging user experience.
