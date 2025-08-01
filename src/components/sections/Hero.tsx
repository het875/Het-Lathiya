import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Code } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank } from '@fortawesome/free-brands-svg-icons'
import portfolioHelpers from '../../lib/portfolio-helpers'
import { scrollToProjects, scrollToContact, scrollToAbout } from '../../lib/locomotive-scroll'

const Hero: React.FC = () => {
  const { name, title, headline } = portfolioHelpers.getPersonalInfo()
  const socialLinks = portfolioHelpers.getSocialLinks()

  return (
    <section className="via-dark-surface to-dark-surface-variant relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="animate-float absolute inset-0 bg-[linear-gradient(rgba(48,105,152,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(48,105,152,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        {/* Floating orbs */}
        <motion.div
          className="bg-python-electric/20 absolute top-1/4 left-1/4 h-40 w-40 rounded-full blur-3xl sm:h-64 sm:w-64"
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
          className="bg-python-neon/15 absolute top-3/4 right-1/3 h-32 w-32 rounded-full blur-3xl sm:h-48 sm:w-48"
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
        {/* Name */}
        <motion.h1
          className="font-display mb-4 text-4xl font-bold sm:mb-6 sm:text-6xl md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="from-python-electric via-python-yellow to-python-neon animate-gradient-shift bg-gradient-to-r bg-clip-text text-transparent">
            {name}
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-dark-text-secondary mb-6 text-base font-medium sm:mb-8 sm:text-xl md:text-2xl lg:text-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-dark-text-secondary mx-auto mb-8 max-w-full text-sm leading-relaxed sm:mb-12 sm:max-w-2xl sm:text-lg md:max-w-3xl md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            className="from-python-blue to-python-electric hover:shadow-python-blue/50 rounded-lg bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
          >
            View My Work
          </motion.button>
          <motion.button
            className="border-python-yellow text-python-yellow hover:bg-python-yellow rounded-lg border-2 px-8 py-4 font-semibold transition-all duration-300 hover:text-black"
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="text-dark-text-secondary flex cursor-pointer flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToAbout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="mb-2 text-sm">Scroll to explore</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
