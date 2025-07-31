import { getReducedMotionPreference, getResponsiveAnimationDuration } from './utils'

// GSAP imports with proper typing
let gsap: any = null
let ScrollTrigger: any = null

// Dynamic imports for GSAP to handle SSR and improve bundle splitting
const initGSAP = async () => {
  if (typeof window === 'undefined') return
  
  if (!gsap) {
    const gsapModule = await import('gsap')
    gsap = gsapModule.default
    
    const scrollTriggerModule = await import('gsap/ScrollTrigger')
    ScrollTrigger = scrollTriggerModule.ScrollTrigger
    
    gsap.registerPlugin(ScrollTrigger)
  }
  
  return { gsap, ScrollTrigger }
}

// Animation presets following our design system
export const animationPresets = {
  // Entrance animations
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  dramaticReveal: {
    initial: { opacity: 0, scale: 0.8, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  typewriter: {
    initial: { width: 0 },
    animate: { width: "auto" },
    transition: { duration: 2, ease: "easeInOut" }
  },
  
  // Micro-interactions
  buttonHover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(255, 212, 59, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  cardHover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  iconPulse: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  
  // Page transitions
  pageTransition: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  cinematicWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
  }
}

// GSAP Timeline creators
export const createSectionEntranceTimeline = async (container: HTMLElement) => {
  const gsapModules = await initGSAP()
  if (!gsapModules) return null
  
  const { gsap } = gsapModules
  const tl = gsap.timeline({ paused: true })
  const duration = getResponsiveAnimationDuration(1)
  const prefersReducedMotion = getReducedMotionPreference()
  
  if (prefersReducedMotion) {
    tl.set(container, { opacity: 1 })
    return tl
  }
  
  tl.from(container.querySelector('.section-title'), {
    y: 80,
    opacity: 0,
    duration: duration,
    ease: "power3.out"
  })
  .from(container.querySelectorAll('.section-content'), {
    y: 60,
    opacity: 0,
    duration: duration * 0.8,
    stagger: 0.2,
    ease: "power2.out"
  }, "-=0.5")
  .from(container.querySelector('.section-decoration'), {
    scale: 0,
    rotation: 180,
    duration: duration * 0.6,
    ease: "back.out(1.7)"
  }, "-=0.3")
  
  return tl
}

export const createParallaxAnimation = async (element: HTMLElement, speed: number = 0.5) => {
  if (getReducedMotionPreference()) return
  
  const gsapModules = await initGSAP()
  if (!gsapModules) return
  
  const { gsap } = gsapModules
  
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  })
}

export const createStaggeredAnimation = async (elements: HTMLElement[], options = {}) => {
  const gsapModules = await initGSAP()
  if (!gsapModules) return
  
  const { gsap } = gsapModules
  
  const defaultOptions = {
    y: 100,
    opacity: 0,
    duration: getResponsiveAnimationDuration(0.8),
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
  
  const finalOptions = { ...defaultOptions, ...options }
  
  if (getReducedMotionPreference()) {
    gsap.set(elements, { opacity: 1 })
    return
  }
  
  gsap.from(elements, finalOptions)
}

// Utility function to clean up animations
export const killAllAnimations = async () => {
  const gsapModules = await initGSAP()
  if (!gsapModules) return
  
  const { gsap, ScrollTrigger } = gsapModules
  gsap.killTweensOf("*")
  ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
}

// Performance monitoring for animations
export const monitorAnimationPerformance = (name: string) => {
  if (typeof performance === 'undefined') return { start: () => {}, end: () => {} }
  
  return {
    start: () => {
      performance.mark(`${name}-start`)
    },
    end: () => {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measures = performance.getEntriesByName(name, 'measure')
      if (measures.length > 0) {
        const duration = measures[measures.length - 1].duration
        if (duration > 16.67) { // > 60fps
          console.warn(`Animation "${name}" took ${duration.toFixed(2)}ms (> 16.67ms threshold)`)
        }
      }
    }
  }
}
