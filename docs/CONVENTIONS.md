# Development Conventions & Best Practices

## 🎯 Code Quality Standards

### TypeScript Configuration
```json
// tsconfig.json principles
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Component Development Patterns

#### 1. Component Structure Template
```typescript
// ComponentName.tsx
import { forwardRef } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

// Define variants using CVA for consistent styling
const componentVariants = cva(
  // Base styles
  'relative inline-flex items-center justify-center transition-all duration-300',
  {
    variants: {
      variant: {
        primary: 'bg-python-blue text-white hover:bg-python-blue-dark',
        secondary: 'bg-transparent text-python-yellow border-2 border-python-yellow',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-variant',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
      animated: {
        true: 'transform-gpu will-change-transform',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      animated: true,
    },
  }
);

// Props interface extending both HTML props and Motion props
interface ComponentNameProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    MotionProps,
    VariantProps<typeof componentVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Component implementation with forwardRef for ref passing
export const ComponentName = forwardRef<HTMLButtonElement, ComponentNameProps>(
  (
    {
      className,
      variant,
      size,
      animated,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          componentVariants({ variant, size, animated }),
          disabled && 'opacity-50 cursor-not-allowed',
          isLoading && 'pointer-events-none',
          className
        )}
        disabled={disabled || isLoading}
        whileHover={animated ? { scale: 1.02 } : undefined}
        whileTap={animated ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {isLoading ? <LoadingSpinner /> : children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

#### 2. Animation Hook Patterns
```typescript
// hooks/useScrollAnimation.ts
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  duration = 0.8,
}: ScrollAnimationOptions = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: threshold });

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return {
    ref,
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    variants,
  };
};

// hooks/useGSAPAnimation.ts
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

export const useGSAPAnimation = (
  animationCallback: (ctx: gsap.Context) => void,
  dependencies: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      animationCallback(gsap.context());
    },
    { scope: containerRef, dependencies }
  );

  return containerRef;
};
```

#### 3. Performance Optimization Patterns
```typescript
// Memoization patterns
export const ExpensiveComponent = React.memo(
  ({ data, onAction }: ExpensiveComponentProps) => {
    // Memoize expensive calculations
    const processedData = useMemo(
      () => data.map(item => expensiveProcessing(item)),
      [data]
    );

    // Memoize event handlers
    const handleAction = useCallback(
      (id: string) => {
        onAction(id);
      },
      [onAction]
    );

    return <div>{/* Component JSX */}</div>;
  },
  // Custom comparison function for complex props
  (prevProps, nextProps) => {
    return (
      prevProps.data.length === nextProps.data.length &&
      prevProps.onAction === nextProps.onAction
    );
  }
);

// Lazy loading pattern
const LazySection = lazy(() => import('./components/sections/ProjectsSection'));

export const App = () => {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <LazySection />
    </Suspense>
  );
};
```

---

## 🎨 Styling Conventions

### Tailwind CSS Class Organization
```typescript
// Class ordering: Layout → Spacing → Sizing → Typography → Colors → Effects → Animations
const buttonClasses = cn(
  // Layout
  'relative flex items-center justify-center',
  // Spacing
  'px-6 py-3 gap-2',
  // Sizing
  'min-w-0 h-12',
  // Typography
  'text-base font-medium',
  // Colors
  'bg-python-blue text-white',
  // Effects
  'rounded-lg shadow-lg',
  // Animations
  'transition-all duration-300 hover:scale-105',
  // State modifiers
  'disabled:opacity-50 disabled:cursor-not-allowed'
);
```

### CSS Custom Properties Usage
```css
/* Define semantic tokens */
.button {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all var(--duration-fast) var(--ease-out);
}

.button:hover {
  background: var(--color-primary-hover);
  transform: translateY(var(--space-1));
  box-shadow: var(--shadow-lg);
}
```

---

## ⚡ Animation Best Practices

### GSAP Animation Patterns
```typescript
// Timeline management pattern
export const createSectionAnimation = (element: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });

  tl.set(element, { autoAlpha: 0 })
    .from(element.querySelector('.title'), {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
    .from(
      element.querySelectorAll('.content-item'),
      {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.5'
    )
    .to(element, { autoAlpha: 1, duration: 0.1 }, 0);

  return tl;
};

// Scroll trigger pattern
export const setupScrollAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach(element => {
    const animation = createSectionAnimation(element);

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => animation.play(),
      onLeaveBack: () => animation.reverse(),
    });
  });
};
```

### Framer Motion Patterns
```typescript
// Shared animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

// Layout animation pattern
export const LayoutAnimatedComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
```

### Performance-First Animation Rules
```typescript
// ✅ Prefer these properties (composited)
const performantAnimation = {
  x: 100,           // transform: translateX
  y: 50,            // transform: translateY
  scale: 1.2,       // transform: scale
  rotate: 45,       // transform: rotate
  opacity: 0.8,     // opacity
};

// ❌ Avoid these properties (cause layout/paint)
const expensiveAnimation = {
  width: '200px',   // Forces layout
  height: '100px',  // Forces layout
  top: '50px',      // Forces layout
  backgroundColor: '#ff0000', // Forces paint (unless on own layer)
};

// Performance monitoring
const AnimatedComponent = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <motion.div
      style={{ willChange: isAnimating ? 'transform' : 'auto' }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      animate={{ x: 100 }}
    />
  );
};
```

---

## 🧪 Testing Conventions

### Component Testing Pattern
```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { ComponentName } from './ComponentName';

// Disable animations in tests
const renderWithMotion = (ui: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">
      {ui}
    </MotionConfig>
  );
};

describe('ComponentName', () => {
  it('renders with correct variant styles', () => {
    renderWithMotion(<ComponentName variant="primary">Test</ComponentName>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-python-blue');
  });

  it('handles loading state correctly', () => {
    renderWithMotion(<ComponentName isLoading>Test</ComponentName>);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithMotion(
      <ComponentName onClick={handleClick}>Test</ComponentName>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Animation Testing
```typescript
// Animation behavior tests
describe('ComponentName animations', () => {
  it('applies hover animation when hovered', async () => {
    render(<ComponentName>Test</ComponentName>);
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    await waitFor(() => {
      expect(button).toHaveStyle('transform: scale(1.02)');
    });
  });

  it('respects reduced motion preferences', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(<ComponentName>Test</ComponentName>);
    // Test that animations are disabled or simplified
  });
});
```

---

## 📁 File Organization Standards

### Component Structure
```
components/
├── ui/                     # shadcn/ui base components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   └── Card/
│       ├── Card.tsx
│       ├── Card.test.tsx
│       └── index.ts
├── layout/                 # Layout components
│   ├── Header/
│   ├── Footer/
│   ├── Navigation/
│   └── Layout/
├── sections/              # Page sections
│   ├── HeroSection/
│   ├── AboutSection/
│   ├── ProjectsSection/
│   └── ContactSection/
└── common/                # Reusable components
    ├── AnimatedContainer/
    ├── LoadingSpinner/
    └── ErrorBoundary/
```

### Import Organization
```typescript
// 1. React and React-related imports
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 2. Third-party library imports
import { cn } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { type ProjectData } from '@/types/project';

// 4. Relative imports
import { ProjectCard } from './ProjectCard';
import { projectsData } from './data';
```

---

## 🔒 Security & Privacy Conventions

### Input Sanitization
```typescript
import DOMPurify from 'dompurify';

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};

// Usage in components
export const SafeHTMLRenderer = ({ content }: { content: string }) => {
  const sanitizedContent = useMemo(() => sanitizeHTML(content), [content]);
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="prose"
    />
  );
};
```

### Environment Variables
```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  VITE_API_URL: z.string().url(),
  VITE_ANALYTICS_ID: z.string().optional(),
});

export const env = envSchema.parse(import.meta.env);
```

---

## 📊 Performance Monitoring

### Bundle Analysis
```bash
# Add to package.json scripts
"analyze": "vite-bundle-analyzer dist",
"lighthouse": "lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html"
```

### Performance Hooks
```typescript
// hooks/usePerformanceMonitor.ts
export const usePerformanceMonitor = (name: string) => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`${name}: ${entry.duration}ms`);
      });
    });

    observer.observe({ entryTypes: ['measure'] });
    performance.mark(`${name}-start`);

    return () => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      observer.disconnect();
    };
  }, [name]);
};
```

---

## 🌐 Accessibility Standards

### ARIA Patterns
```typescript
// Accessible animation component
export const AccessibleMotionDiv = ({ children, ...props }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      animate={prefersReducedMotion ? false : props.animate}
      transition={prefersReducedMotion ? { duration: 0.01 } : props.transition}
      aria-hidden={props['aria-hidden']}
      role={props.role}
    >
      {children}
    </motion.div>
  );
};

// Focus management
export const useFocusManagement = () => {
  const focusRing = useCallback((element: HTMLElement) => {
    element.focus({ preventScroll: true });
    element.setAttribute('data-focus-visible', 'true');
  }, []);

  return { focusRing };
};
```

These conventions ensure consistent, maintainable, and high-quality code throughout the project while maintaining the cinematic user experience we're aiming for.
