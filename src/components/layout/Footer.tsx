import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Code, Coffee, Github, Linkedin, ExternalLink } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank } from '@fortawesome/free-brands-svg-icons'
import * as portfolioHelpers from '../../lib/portfolio-helpers'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  // Extract real data from portfolio system
  const personalInfo = portfolioHelpers.getPersonalInfo()
  const { email, phone, location } = personalInfo
  const socialLinks = portfolioHelpers.getSocialLinks()

  const handleSmoothScroll = (href: string) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-dark-bg border-dark-border border-t">
      <div className="mx-auto max-w-full px-4 py-8 sm:max-w-3xl sm:px-6 sm:py-12 md:max-w-5xl lg:max-w-6xl">
        {/* Main Footer Content */}
        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
          {/* Brand */}
          <motion.div
            className="sm:col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display from-python-electric to-python-yellow mb-3 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent sm:mb-4 sm:text-2xl">
              Het Lathiya
            </h3>
            <p className="text-dark-text-secondary text-sm leading-relaxed sm:text-base">
              {personalInfo.aboutMe.split('.')[0]}. Specializing in Python, FastAPI, and financial
              systems development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Experience', href: '#experience' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      handleSmoothScroll(link.href)
                    }}
                    className="text-dark-text-secondary hover:text-python-electric inline-block transform text-sm transition-colors duration-300 hover:translate-x-1 sm:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
              Get In Touch
            </h4>
            <div className="text-dark-text-secondary space-y-1.5 text-sm sm:space-y-2 sm:text-base">
              <p>{location}</p>
              <a
                href={`mailto:${email}`}
                className="hover:text-python-yellow block break-all transition-colors duration-300 sm:break-normal"
              >
                {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="hover:text-python-neon block transition-colors duration-300"
              >
                {phone}
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
              Follow Me
            </h4>
            <div className="flex flex-col space-y-2 sm:space-y-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-secondary hover:text-python-electric group flex min-h-[44px] items-center gap-2 p-1 transition-colors duration-300 sm:gap-3"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="transform text-sm transition-transform duration-300 group-hover:translate-x-1 sm:text-base">
                  GitHub
                </span>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-secondary hover:text-python-blue group flex min-h-[44px] items-center gap-2 p-1 transition-colors duration-300 sm:gap-3"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="transform text-sm transition-transform duration-300 group-hover:translate-x-1 sm:text-base">
                  LinkedIn
                </span>
              </a>
              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-secondary hover:text-python-yellow group flex min-h-[44px] items-center gap-2 p-1 transition-colors duration-300 sm:gap-3"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="transform text-sm transition-transform duration-300 group-hover:translate-x-1 sm:text-base">
                  LeetCode
                </span>
              </a>
              <a
                href={socialLinks.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-secondary hover:text-python-neon group flex min-h-[44px] items-center gap-2 p-1 transition-colors duration-300 sm:gap-3"
              >
                <FontAwesomeIcon icon={faHackerrank} className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="transform text-sm transition-transform duration-300 group-hover:translate-x-1 sm:text-base">
                  HackerRank
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-dark-border mb-6 border-t sm:mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
          {/* Copyright */}
          <motion.div
            className="text-dark-text-secondary flex flex-wrap items-center justify-center gap-1 text-xs sm:justify-start sm:gap-2 sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span>© {currentYear} Het Lathiya. Made with</span>
            <Heart className="h-3 w-3 animate-pulse text-red-500 sm:h-4 sm:w-4" />
            <span>and</span>
            <Coffee className="h-3 w-3 text-yellow-600 sm:h-4 sm:w-4" />
            <span>in {location}</span>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="text-dark-text-secondary flex flex-wrap items-center justify-center gap-1 text-xs sm:justify-end sm:gap-2 sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Built with</span>
            <span className="text-python-electric">React</span>
            <span>+</span>
            <span className="text-python-yellow">TypeScript</span>
            <span>+</span>
            <span className="text-python-neon">Tailwind CSS</span>
          </motion.div>
        </div>

        {/* LightRays Credit */}
        <motion.div
          className="text-dark-text-secondary mt-4 flex items-center justify-center text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="opacity-70">Gyldlab for Het Lathiya</span>
        </motion.div>

        {/* Background Decoration */}
        <div className="from-python-blue via-python-electric to-python-neon absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r opacity-30"></div>
      </div>
    </footer>
  )
}

export default Footer
