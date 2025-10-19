import { useState, useEffect } from 'react'

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sectionIds.find(sectionId => {
        const element = sectionId === 'hero' ? document.body : document.getElementById(sectionId)

        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeSection
}

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

export const useScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return scrollToTop
}
