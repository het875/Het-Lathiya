import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Code } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank } from '@fortawesome/free-brands-svg-icons'
import portfolioHelpers from '../../lib/portfolio-helpers'
import TypingAnimation from '../common/TypingAnimation'

const Hero: React.FC = () => {
  const { headline } = portfolioHelpers.getPersonalInfo()
  const socialLinks = portfolioHelpers.getSocialLinks()
  
  // Typing animation texts based on GitHub profile
  const typingTexts = [
    "Python Software Developer",
    "Backend API Specialist", 
    "FinTech & Web Scraping Expert",
    "Django | FastAPI Enthusiast"
  ]
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-dark-surface to-dark-surface-variant">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(48,105,152,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(48,105,152,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-float" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-python-electric/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-48 h-48 bg-python-neon/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Greeting & Name */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Greeting */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium mb-2 sm:mb-4">
            <span className="text-dark-text-secondary">Hi there, I'm </span>
            <span className="bg-gradient-to-r from-python-electric via-python-yellow to-python-neon bg-clip-text text-transparent animate-gradient-shift font-bold">
              Het Lathiya
            </span>
            <span className="text-python-yellow text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ml-1 sm:ml-2 animate-bounce inline-block">👋</span>
          </div>
          {/* Main Name Display */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold">
            <span className="bg-gradient-to-r from-python-electric via-python-yellow to-python-neon bg-clip-text text-transparent animate-gradient-shift">
              Het Lathiya
            </span>
          </h1>
        </motion.div>

        {/* Title with Typing Animation */}
        <motion.div
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 font-medium min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <TypingAnimation
            texts={typingTexts}
            speed={100}
            deleteSpeed={50}
            pauseDuration={2000}
            className="text-python-electric font-semibold"
            cursorClassName="text-python-yellow"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-dark-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-python-blue to-python-electric text-white font-semibold rounded-lg shadow-lg hover:shadow-python-blue/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          <motion.button
            className="px-8 py-4 border-2 border-python-yellow text-python-yellow font-semibold rounded-lg hover:bg-python-yellow hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-6 justify-center"
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
              className="p-3 text-dark-text-secondary hover:text-python-electric transition-colors duration-300 hover:shadow-lg hover:shadow-python-electric/20 rounded-lg"
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
            className="p-3 text-dark-text-secondary hover:text-python-electric transition-colors duration-300 hover:shadow-lg hover:shadow-python-electric/20 rounded-lg"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center text-dark-text-secondary"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
