import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Code } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank } from '@fortawesome/free-brands-svg-icons'
import portfolioHelpers from '../../lib/portfolio-helpers'
import LightRays from './LightRays'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero: React.FC = () => {
  const socialLinks = portfolioHelpers.getSocialLinks()
  const nameRef = useRef<HTMLDivElement>(null)

  // Rotating titles
  const titles = [
    'Python Software Developer',
    'Django | FastAPI Enthusiast',
    'Back-end API Specialist',
    'FinTech & Web Scraping Expert',
  ]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(prevIndex => (prevIndex + 1) % titles.length)
    }, 3000) // Change title every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // GSAP animation for name reveal
  useGSAP(
    () => {
      if (!nameRef.current) return

      const letters = nameRef.current.querySelectorAll('.letter')

      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power4.out',
          stagger: 0.05,
          delay: 0.2,
        }
      )
    },
    { scope: nameRef }
  )

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="via-dark-surface to-dark-surface-variant relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-black">
      <div className="absolute inset-0 z-0 w-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffd43b"
          raysSpeed={0.5}
          lightSpread={1.2}
          rayLength={6}
          pulsating={true}
          fadeDistance={5}
          saturation={9}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0}
          distortion={8}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full px-4 text-center sm:px-6 md:px-8">
        {/* Name - Premium Display Typography - Huge Modern Style */}
        <div className="mb-10 overflow-visible">
          <div
            ref={nameRef}
            className="flex flex-col items-center justify-center gap-4 overflow-visible px-2 sm:flex-row sm:gap-6 md:gap-8"
            style={{ perspective: '1000px' }}
          >
            <h1 className="letter from-python-electric via-python-yellow to-python-neon animate-gradient-shift font-display inline-block overflow-visible  bg-gradient-to-r bg-clip-text text-[clamp(4.5rem,10vw,11rem)] font-bold tracking-[-0.01em] text-transparent">
              Het
            </h1>
            <h1 className="letter from-python-electric via-python-yellow to-python-neon animate-gradient-shift font-display inline-block overflow-visible bg-gradient-to-r bg-clip-text text-[clamp(4.5rem,10vw,11rem)] font-bold tracking-[-0.01em] text-transparent">
              Lathiya
            </h1>
          </div>
        </div>

        {/* Auto-switching Title with Animation */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="font-heading text-dark-text-secondary text-xl leading-relaxed font-semibold tracking-tight sm:text-2xl xl:text-3xl"
            >
              <span className="bg-python-electric/6 ring-python-electric/10 inline-block rounded-full px-8 py-3.5 ring-1 drop-shadow-sm backdrop-blur-sm sm:px-10 sm:py-4 md:px-10 md:py-2">
                <span className="from-python-yellow via-python-electric to-python-blue bg-gradient-to-r bg-clip-text font-bold text-transparent">
                  {titles[currentTitleIndex]}
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="mb-10 flex flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            className="from-python-blue to-python-electric font-heading shadow-python-blue/30 hover:shadow-python-blue/50 rounded-full bg-gradient-to-r px-6 py-2.5 text-sm font-semibold tracking-tight text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:px-8 sm:py-2 sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
          >
            View My Work
          </motion.button>
          <motion.button
            className="border-python-yellow font-heading text-python-yellow hover:bg-python-yellow rounded-full border-2 px-6 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 hover:text-black active:translate-y-0 sm:px-8 sm:py-2 sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-5 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {[
            { icon: Github, href: socialLinks.github, label: 'GitHub' },
            { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
            { icon: Code, href: socialLinks.leetcode, label: 'LeetCode' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text-secondary hover:text-python-electric hover:shadow-python-electric/20 rounded-lg p-4 transition-colors duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
            >
                <Icon size={32} className="md:h-8 md:w-8" />
              </motion.a>
          ))}

          {/* HackerRank with FontAwesome icon */}
          <motion.a
            href={socialLinks.hackerrank}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-text-secondary hover:text-python-electric hover:shadow-python-electric/20 rounded-lg p-4 transition-colors duration-300 hover:shadow-lg md:p-5"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="HackerRank"
          >
            <FontAwesomeIcon icon={faHackerrank} size="2x" className="md:text-4xl" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
