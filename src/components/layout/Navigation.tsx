import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Briefcase, Code, Mail } from 'lucide-react'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, href: '#' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'projects', label: 'Projects', icon: Code, href: '#projects' },
    { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      const currentSection = sections.find(section => {
        const element = section === 'hero' ? document.body : document.getElementById(section)
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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '')
    if (targetId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-bg/90 border-dark-border/50 border-b backdrop-blur-md'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto max-w-full px-4 py-3 sm:max-w-3xl sm:px-6 sm:py-4 md:max-w-5xl lg:max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="font-display from-python-electric to-python-yellow bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent sm:text-xl"
              onClick={e => {
                e.preventDefault()
                scrollToSection('#')
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Het Lathiya
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex lg:gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={`relative px-2 py-2 text-sm font-medium transition-colors duration-300 lg:px-3 lg:text-base ${
                    activeSection === item.id
                      ? 'text-python-electric'
                      : 'text-dark-text-secondary hover:text-white'
                  }`}
                  onClick={e => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="bg-python-electric absolute right-0 bottom-0 left-0 h-0.5"
                      layoutId="activeIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="text-dark-text-secondary hover:text-python-electric flex min-h-[44px] min-w-[44px] items-center justify-center p-2 transition-colors md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="bg-dark-surface/95 border-dark-border absolute top-16 right-4 left-4 rounded-2xl border p-4 backdrop-blur-md sm:top-20 sm:right-6 sm:left-6 sm:p-6"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="space-y-2 sm:space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className={`flex min-h-[48px] items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-300 sm:px-4 sm:py-3 ${
                      activeSection === item.id
                        ? 'bg-python-electric/20 text-python-electric border-python-electric/30 border'
                        : 'text-dark-text-secondary hover:bg-dark-bg/50 hover:text-white'
                    }`}
                    onClick={e => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium sm:text-base">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
