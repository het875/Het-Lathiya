import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Terminal, Github, Linkedin } from 'lucide-react'
import { NAVIGATION } from '../../data/constants'
import { Python } from '../common/Python'
import { LeetCode } from '../common/LeetCode'
import { HackerRank } from '../common/HackerRank'
import TextRoll from '../TextRoll'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = NAVIGATION.main.map(item => item.id)
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP animations for menu items
  useGSAP(
    () => {
      if (isOpen) {
        // Animate menu items in with stagger
        gsap.fromTo(
          navItemsRef.current,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.2,
          }
        )
      }
    },
    { dependencies: [isOpen], scope: menuRef }
  )

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    // Small delay to allow menu close animation, then scroll
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Hamburger menu animation variants
  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  }

  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 7 },
  }

  const middleLineVariants = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: -20 },
  }

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -7 },
  }

  return (
    <>
      {/* Floating Controls - Hamburger Menu Only */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-6 right-6 z-[100] flex items-center gap-3 ${
          scrolled ? 'rounded-full border border-white/10 bg-black/80 p-2 backdrop-blur-xl' : ''
        } transition-all duration-500`}
      >
        {/* Hamburger Menu */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group from-python-blue/30 to-python-green/30 border-python-yellow/40 hover:border-python-yellow relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-full border-2 bg-gradient-to-br transition-all duration-300 sm:h-12 sm:w-12"
          variants={hamburgerVariants}
          animate={isOpen ? 'open' : 'closed'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {/* Animated background pulse */}
          <motion.div
            className="from-python-neon/20 to-python-electric/20 absolute inset-0 bg-gradient-to-br"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Hamburger lines */}
          <div className="relative z-10 flex h-4 w-5 flex-col justify-between sm:h-5 sm:w-6">
            <motion.span
              variants={topLineVariants}
              className="bg-python-yellow group-hover:bg-python-neon h-0.5 w-full origin-center rounded-full transition-colors duration-300"
            />
            <motion.span
              variants={middleLineVariants}
              className="bg-python-yellow group-hover:bg-python-neon h-0.5 w-full rounded-full transition-colors duration-300"
            />
            <motion.span
              variants={bottomLineVariants}
              className="bg-python-yellow group-hover:bg-python-neon h-0.5 w-full origin-center rounded-full transition-colors duration-300"
            />
          </div>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isOpen
                ? '0 0 40px rgba(57, 255, 20, 0.6)'
                : '0 0 20px rgba(255, 212, 59, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Full Screen Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[90] overflow-hidden"
            onClick={() => setIsOpen(false)}
          >
            {/* Animated background layers */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Gradient overlay with animation */}
            <motion.div
              className="from-python-blue/20 via-python-green/10 to-python-electric/20 absolute inset-0 bg-gradient-to-br"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 212, 59, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 212, 59, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />
            </div>

            {/* Content Container */}
            <div
              className="relative flex h-svh flex-col items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:px-12 lg:px-16"
              onClick={e => e.stopPropagation()}
            >
              {/* Developer Branding */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-3 left-3 flex items-center gap-2 sm:top-6 sm:left-6 sm:gap-3 md:top-8 md:left-8"
              >
                <Python className="h-10 w-10 flex-shrink-0 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-24 lg:w-24" />
                <div className="text-left">
                  <p className="text-python-yellow/80 font-mono text-[10px] sm:text-xs md:text-sm">
                    {'<developer>'}
                  </p>
                  <p className="font-heading text-xs font-bold text-white sm:text-sm md:text-lg lg:text-xl">
                    Het Lathiya
                  </p>
                  <p className="text-python-yellow/80 font-mono text-[8px] sm:text-[10px] md:text-xs">
                    {'</developer>'}
                  </p>
                </div>
              </motion.div>

              {/* Navigation Links - FIXED: Constrained width */}
              <nav className="relative z-10 flex items-center justify-center px-2 sm:px-12 md:px-16 lg:px-20">
                <ul className="space-y-4 sm:space-y-2 md:space-y-3">
                  {NAVIGATION.main.map((item, index) => (
                    <motion.li
                      key={item.id}
                      ref={el => {
                        navItemsRef.current[index] = el
                      }}
                      className="perspective-1000"
                      style={{ opacity: 0 }}
                    >
                      <a
                        href={item.href}
                        onClick={e => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        className={`group font-heading relative inline-flex overflow-hidden px-2 py-2 transition-all duration-300 sm:px-4 sm:py-3 md:px-6 md:py-4`}
                      >
                        {/* Hover animation wrapper */}
                        <motion.div
                          className="flex items-center"
                          whileHover={{ x: 20 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          {/* Number prefix */}
                          <span className="text-python-yellow/60 text-md mr-2 inline-block flex-shrink-0 font-mono sm:mr-3 sm:text-lg md:mr-4 md:text-xl lg:text-2xl">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          {/* Link text */}
                          <span
                            className={`relative inline-block text-3xl leading-[1.15] font-bold break-words transition-colors duration-300 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
                              activeSection === item.id
                                ? 'text-python-yellow'
                                : 'text-white/60 group-hover:text-white'
                            }`}
                          >
                            <TextRoll className="relative inline-block">{item.name}</TextRoll>

                            {/* Underline effect */}
                            <motion.span
                              className="from-python-yellow via-python-neon to-python-electric absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r sm:h-1"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                            />

                            {/* Glow effect on active */}
                            {activeSection === item.id && (
                              <motion.span
                                className="bg-python-yellow/10 absolute -inset-2 -z-10 rounded-lg blur-xl sm:-inset-4"
                                animate={{
                                  opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                              />
                            )}
                          </span>

                          {/* Terminal cursor for active item */}
                          {activeSection === item.id && (
                            <motion.span
                              className="bg-python-neon ml-1 inline-block h-5 w-1 align-middle sm:ml-2 sm:h-8 sm:w-2 md:ml-3 md:h-12 md:w-2 lg:h-16 lg:w-3 xl:h-20 xl:w-4"
                              style={{ verticalAlign: 'middle' }}
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                          )}
                        </motion.div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Section - Social Links & Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute right-3 bottom-3 left-3 flex flex-col items-center justify-between gap-3 sm:right-6 sm:bottom-6 sm:left-6 sm:gap-4 md:right-8 md:bottom-8 md:left-8 md:flex-row md:gap-6"
              >
                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  {NAVIGATION.social.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group border-python-yellow/30 hover:border-python-yellow relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-white/5 transition-all duration-300 sm:h-12 sm:w-12"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.name === 'HackerRank' ? (
                        <HackerRank className="text-python-yellow group-hover:text-python-neon h-4 w-4 transition-colors sm:h-5 sm:w-5" />
                      ) : social.icon === 'github' ? (
                        <Github className="text-python-yellow group-hover:text-python-neon h-4 w-4 transition-colors sm:h-5 sm:w-5" />
                      ) : social.icon === 'linkedin' ? (
                        <Linkedin className="text-python-yellow group-hover:text-python-neon h-4 w-4 transition-colors sm:h-5 sm:w-5" />
                      ) : social.icon === 'code' ? (
                        <LeetCode className="text-python-yellow group-hover:text-python-neon h-4 w-4 transition-colors sm:h-5 sm:w-5" />
                      ) : (
                        <Terminal className="text-python-yellow group-hover:text-python-neon h-4 w-4 transition-colors sm:h-5 sm:w-5" />
                      )}

                      {/* Glow on hover */}
                      <motion.div
                        className="bg-python-yellow/0 absolute inset-0 rounded-full blur-xl"
                        whileHover={{ background: 'rgba(255, 212, 59, 0.3)' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Copyright */}
                <p className="text-center font-mono text-xs text-white/40 sm:text-sm">
                  © 2025 Het Lathiya
                </p>
              </motion.div>

              {/* Decorative terminal prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-python-yellow/20 pointer-events-none absolute top-1/2 left-8 hidden -translate-y-1/2 font-mono text-6xl select-none lg:block lg:text-8xl xl:text-9xl"
              >
                {'>>>'}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
