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

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-python-electric to-python-yellow bg-clip-text text-transparent mb-4">
              Het Lathiya
            </h3>
            <p className="text-dark-text-secondary leading-relaxed">
              {personalInfo.aboutMe.split('.')[0]}. Specializing in Python, FastAPI, and financial systems development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Experience', href: '#experience' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-dark-text-secondary hover:text-python-electric transition-colors duration-300 inline-block hover:translate-x-1 transform"
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
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-2 text-dark-text-secondary">
              <p>{location}</p>
              <a
                href={`mailto:${email}`}
                className="hover:text-python-yellow transition-colors duration-300 block"
              >
                {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="hover:text-python-neon transition-colors duration-300 block"
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
            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
            <div className="flex flex-col space-y-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-dark-text-secondary hover:text-python-electric transition-colors duration-300 group"
              >
                <Github className="w-5 h-5" />
                <span className="group-hover:translate-x-1 transform transition-transform duration-300">GitHub</span>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-dark-text-secondary hover:text-python-blue transition-colors duration-300 group"
              >
                <Linkedin className="w-5 h-5" />
                <span className="group-hover:translate-x-1 transform transition-transform duration-300">LinkedIn</span>
              </a>
              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-dark-text-secondary hover:text-python-yellow transition-colors duration-300 group"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="group-hover:translate-x-1 transform transition-transform duration-300">LeetCode</span>
              </a>
              <a
                href={socialLinks.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-dark-text-secondary hover:text-python-neon transition-colors duration-300 group"
              >
                <FontAwesomeIcon icon={faHackerrank} className="w-5 h-5" />
                <span className="group-hover:translate-x-1 transform transition-transform duration-300">HackerRank</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-border mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            className="text-dark-text-secondary text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span>© {currentYear} Het Lathiya. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and</span>
            <Coffee className="w-4 h-4 text-yellow-600" />
            <span>in {location}</span>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="flex items-center gap-2 text-dark-text-secondary text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Code className="w-4 h-4" />
            <span>Built with</span>
            <span className="text-python-electric">React</span>
            <span>+</span>
            <span className="text-python-yellow">TypeScript</span>
            <span>+</span>
            <span className="text-python-neon">Tailwind CSS</span>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-python-blue via-python-electric to-python-neon opacity-30"></div>
      </div>
    </footer>
  )
}

export default Footer
