import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Code } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank } from '@fortawesome/free-brands-svg-icons'
import portfolioHelpers from '../../lib/portfolio-helpers'
import { scrollToProjects, scrollToContact } from '../../lib/locomotive-scroll'
import BlurText from '../common/BlurText'
import TextType from '../common/TextType'
import PixelBlast from './PixelBlast'

const Hero: React.FC = () => {
  const { name, title, headline } = portfolioHelpers.getPersonalInfo()
  const socialLinks = portfolioHelpers.getSocialLinks()

  return (
    <section className="via-dark-surface to-dark-surface-variant relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black">
      {/* Background Elements (PixelBlast integrated under visual layers) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* PixelBlast as the interactive background - full bleed and behind content */}
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-95">
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#39ff14"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        </div>

        {/* Floating orbs (kept as decorative layers above PixelBlast but beneath main content) */}
        <motion.div
          className="bg-python-electric/18 absolute top-1/4 left-1/4 h-40 w-40 rounded-full blur-3xl sm:h-64 sm:w-64 z-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-python-neon/12 absolute top-3/4 right-1/3 h-32 w-32 rounded-full blur-3xl sm:h-48 sm:w-48 z-10"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-full px-4 text-center sm:max-w-3xl sm:px-6 md:max-w-5xl lg:max-w-6xl">
        {/* Name - Premium Display Typography */}
        <BlurText
          text={name}
          delay={150}
          animateBy="words"
          direction="top"
          className="font-display text-display mb-6 font-normal italic sm:mb-8 py-2"
        />

        {/* Title - Clean heading font */}
        <motion.p
          className="font-heading text-dark-text-secondary mb-6 text-xl font-medium leading-snug tracking-tight sm:mb-8 sm:text-2xl md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full px-5 py-2 bg-python-electric/6 ring-1 ring-python-electric/10 backdrop-blur-sm drop-shadow-sm">
            <span className="bg-gradient-to-r from-python-yellow via-python-electric to-python-blue bg-clip-text text-transparent font-semibold">
              {title}
            </span>
          </span>
        </motion.p>

        {/* Description - Premium body font */}
        <motion.div
          className="mx-auto mb-8 max-w-full sm:mb-12 sm:max-w-2xl md:max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <TextType
            text={[headline]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="font-body text-dark-text-secondary text-lg leading-relaxed sm:text-xl md:text-2xl"
            loop={false}
            startOnVisible={true}
          />
        </motion.div>

        {/* CTA Buttons - Enhanced typography */}
        <motion.div
          className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            className="font-heading from-python-blue to-python-electric hover:shadow-python-blue/50 rounded-lg bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 tracking-tight"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
          >
            View My Work
          </motion.button>
          <motion.button
            className="font-heading border-python-yellow text-python-yellow hover:bg-python-yellow rounded-lg border-2 px-8 py-4 font-semibold transition-all duration-300 hover:text-black tracking-tight"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6"
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
              className="text-dark-text-secondary hover:text-python-electric hover:shadow-python-electric/20 rounded-lg p-3 transition-colors duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
            >
              <Icon size={24} />
            </motion.a>
          ))}

          {/* HackerRank with FontAwesome icon */}
          <motion.a
            href={socialLinks.hackerrank}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-text-secondary hover:text-python-electric hover:shadow-python-electric/20 rounded-lg p-3 transition-colors duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="HackerRank"
          >
            <FontAwesomeIcon icon={faHackerrank} size="lg" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
