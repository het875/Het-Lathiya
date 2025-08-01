import LocomotiveScroll from 'locomotive-scroll'

// Global reference to Locomotive Scroll instance
let locomotiveScrollInstance: LocomotiveScroll | null = null

// Initialize Locomotive Scroll v5
export const initializeLocomotiveScroll = (): LocomotiveScroll => {
  if (locomotiveScrollInstance) {
    return locomotiveScrollInstance
  }

  locomotiveScrollInstance = new LocomotiveScroll({
    lenisOptions: {
      lerp: 0.1, // Smooth scrolling intensity (0-1)
      duration: 1.2, // Animation duration
      smoothWheel: true, // Enable smooth wheel scrolling
      touchMultiplier: 2, // Touch scroll multiplier
    },
  })

  // Make globally available for debugging and access
  ;(window as any).locomotiveScroll = locomotiveScrollInstance

  return locomotiveScrollInstance
}

// Destroy Locomotive Scroll instance
export const destroyLocomotiveScroll = (): void => {
  if (locomotiveScrollInstance) {
    locomotiveScrollInstance.destroy()
    locomotiveScrollInstance = null
    ;(window as any).locomotiveScroll = null
  }
}

// Get current Locomotive Scroll instance
export const getLocomotiveScrollInstance = (): LocomotiveScroll | null => {
  return locomotiveScrollInstance
}

// Smooth scroll to a specific section
export const handleSmoothScroll = (href: string): void => {
  const locomotiveScroll = locomotiveScrollInstance || (window as any).locomotiveScroll

  if (locomotiveScroll && locomotiveScroll.lenis) {
    if (href === '#' || href === '#hero') {
      // Scroll to top
      locomotiveScroll.lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      // Scroll to specific section
      const target = document.querySelector(href)
      if (target) {
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset
        locomotiveScroll.lenis.scrollTo(targetTop, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }
  } else {
    // Fallback to native smooth scroll
    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}

// Scroll to top function
export const scrollToTop = (): void => {
  const locomotiveScroll = locomotiveScrollInstance || (window as any).locomotiveScroll

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

// Scroll to projects section (for Hero CTA)
export const scrollToProjects = (): void => {
  handleSmoothScroll('#projects')
}

// Scroll to contact section (for Hero CTA)
export const scrollToContact = (): void => {
  handleSmoothScroll('#contact')
}

// Scroll to about section (for scroll indicator)
export const scrollToAbout = (): void => {
  handleSmoothScroll('#about')
}
