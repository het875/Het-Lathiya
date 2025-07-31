# Locomotive Scroll v5 Implementation Guide

## Overview

This document provides a comprehensive guide for implementing Locomotive Scroll v5 in the Kairovest Advisors React application. Locomotive Scroll v5 is built on top of Lenis and provides smooth scrolling animations with a completely different API compared to v4.

## Key Changes from v4 to v5

### 1. **API Changes**

- No longer uses `el` property for container
- Built on top of Lenis smooth scrolling library
- Different initialization options
- New `scrollTo` method signature
- Removed data attributes (`data-scroll-container`, `data-scroll-section`, etc.)

### 2. **New Options Structure**

```typescript
new LocomotiveScroll({
  lenisOptions: {
    lerp: 0.1, // Smooth scrolling intensity
    duration: 1.2, // Animation duration
    smoothWheel: true, // Enable smooth wheel scrolling
    touchMultiplier: 2, // Touch scroll multiplier
  },
})
```

### 3. **ScrollTo Method**

```typescript
// v5 uses lenis.scrollTo method
locomotiveScroll.lenis.scrollTo(target, {
  duration: 1.5,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})
```

## Implementation Structure

### 1. **App.tsx - Root Level Initialization**

```typescript
import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'

function App() {
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null)

  useEffect(() => {
    // Initialize Locomotive Scroll v5
    locomotiveScrollRef.current = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 2,
      },
    })

    // Make globally available
    ;(window as any).locomotiveScroll = locomotiveScrollRef.current

    // Cleanup
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
        locomotiveScrollRef.current = null
      }
    }
  }, [])

  // ... rest of component
}
```

### 2. **Smooth Scroll Helper Function**

Create a reusable function for smooth scrolling:

```typescript
const handleSmoothScroll = (href: string) => {
  const locomotiveScroll = (window as any).locomotiveScroll
  if (locomotiveScroll && locomotiveScroll.lenis) {
    const target = document.querySelector(href)
    if (target) {
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset
      locomotiveScroll.lenis.scrollTo(targetTop, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  } else {
    // Fallback to native smooth scroll
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
```

### 3. **Scroll to Top Function**

For footer scroll-to-top functionality:

```typescript
const scrollToTop = () => {
  const locomotiveScroll = (window as any).locomotiveScroll
  if (locomotiveScroll && locomotiveScroll.lenis) {
    locomotiveScroll.lenis.scrollTo(0, {
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    // Fallback to native smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
```

## Component Integration

### Navigation Components

#### Navbar.tsx

- Use `handleSmoothScroll` function for all navigation links
- Apply to both desktop and mobile navigation
- Include on CTA buttons

#### Footer.tsx

- Use `handleSmoothScroll` for internal links
- Use `scrollToTop` for scroll-to-top button
- Maintain fallback for accessibility

#### Hero.tsx

- Use `handleSmoothScroll` for CTA buttons
- Apply to scroll indicator for better UX

## CSS Integration

Ensure Locomotive Scroll CSS is imported in your main stylesheet:

```css
@import 'tailwindcss';
@import 'locomotive-scroll/dist/locomotive-scroll.css';
```

## Best Practices

### 1. **Global Instance Management**

- Initialize once at the root level (App.tsx)
- Make available globally via window object
- Proper cleanup in useEffect return function

### 2. **Fallback Handling**

- Always provide native scroll fallback
- Check for locomotive scroll availability before use
- Maintain accessibility standards

### 3. **Performance Optimization**

- Use appropriate lerp values (0.1 recommended)
- Optimize duration settings (1.2-1.5s recommended)
- Consider reduced motion preferences

### 4. **Error Handling**

- Wrap scroll methods in try-catch blocks
- Provide meaningful fallbacks
- Log errors for debugging

## Troubleshooting

### Common Issues

1. **Scroll not working**: Check if Locomotive Scroll is properly initialized
2. **TypeScript errors**: Use proper type assertions for window object
3. **Performance issues**: Adjust lerp and duration values
4. **Mobile issues**: Ensure touchMultiplier is set appropriately

### Debug Steps

1. Check console for Locomotive Scroll initialization
2. Verify global window object has locomotiveScroll property
3. Test fallback scroll functionality
4. Check CSS imports are correct

## Testing Checklist

- [ ] Smooth scrolling works on desktop
- [ ] Smooth scrolling works on mobile
- [ ] Navigation links scroll to correct sections
- [ ] Footer links work properly
- [ ] Scroll-to-top button functions
- [ ] Fallback scrolling works when JS disabled
- [ ] No console errors
- [ ] Performance is acceptable

## Migration Notes

When migrating from v4 to v5:

1. Remove all `data-scroll` attributes
2. Update initialization options
3. Replace `scrollTo` method calls
4. Test all scroll interactions
5. Update documentation

## Version Information

- Locomotive Scroll: v5.0.0-beta
- React: 19+
- TypeScript: 5+
- Installation: `npm install locomotive-scroll@beta`

This implementation provides smooth, performant scrolling that works across all devices while maintaining proper fallbacks and accessibility standards.
