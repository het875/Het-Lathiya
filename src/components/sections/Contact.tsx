import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  Code,
  AlertCircle,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank } from '@fortawesome/free-brands-svg-icons'
import portfolioHelpers from '../../lib/portfolio-helpers'
import { sendEmail, validateEmailJSConfig } from '../../utils/email'

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

const Contact: React.FC = () => {
  const { email, phone, location } = portfolioHelpers.getPersonalInfo()
  const socialLinksData = portfolioHelpers.getSocialLinks()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Map form field names to state property names for EmailJS compatibility
    const fieldMapping: { [key: string]: keyof FormData } = {
      from_name: 'name',
      reply_to: 'email',
      company: 'company',
      subject: 'subject',
      message: 'message',
    }

    const stateField = fieldMapping[name] || (name as keyof FormData)
    setFormData({
      ...formData,
      [stateField]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    setError(null)

    // Check if EmailJS is configured
    if (!validateEmailJSConfig()) {
      setError('Email service is not properly configured. Please try again later.')
      setIsSubmitting(false)
      return
    }

    try {
      await sendEmail(formRef.current)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', company: '', subject: '', message: '' })
      }, 3000)
    } catch (error) {
      setError('Failed to send message. Please try again.')
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      color: 'python-electric',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone}`,
      color: 'python-yellow',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: location,
      href: '#',
      color: 'python-neon',
    },
  ]

  const socialLinksFormatted = [
    { icon: Github, href: socialLinksData.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinksData.linkedin, label: 'LinkedIn' },
    { icon: Code, href: socialLinksData.leetcode, label: 'LeetCode' },
  ]

  return (
    <section
      id="contact"
      className="from-dark-bg via-dark-surface to-dark-surface-variant relative w-full overflow-hidden bg-gradient-to-br px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-display mb-4 text-2xl font-bold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-python-electric">Let's</span>{' '}
            <span className="text-python-yellow">Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 overflow-hidden sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h3 className="font-display text-python-neon mb-6 text-lg font-semibold sm:mb-8 sm:text-2xl">
              Get In Touch
            </h3>

            <div className="mb-6 space-y-4 sm:mb-8 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="group bg-dark-surface/50 border-dark-border hover:border-python-electric/50 flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 sm:gap-4 sm:p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="from-python-electric to-python-electric/60 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                    <info.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-dark-text-secondary text-xs sm:text-sm">{info.label}</div>
                    <div className="text-python-electric truncate text-sm font-medium transition-colors group-hover:text-white sm:text-lg">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinksFormatted.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dark-surface border-dark-border text-dark-text-secondary hover:text-python-electric hover:border-python-electric/50 rounded-lg border p-2.5 transition-all duration-300 sm:p-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    whileHover={{ scale: 1.1 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="sm:h-5 sm:w-5" />
                  </motion.a>
                ))}

                {/* HackerRank with FontAwesome icon */}
                <motion.a
                  href={socialLinksData.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-surface border-dark-border text-dark-text-secondary hover:text-python-electric hover:border-python-electric/50 rounded-lg border p-2.5 transition-all duration-300 sm:p-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + socialLinksFormatted.length * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{ scale: 1.1 }}
                  aria-label="HackerRank"
                >
                  <FontAwesomeIcon icon={faHackerrank} className="text-lg sm:text-xl" />
                </motion.a>
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="from-python-neon/10 to-python-yellow/10 border-python-neon/30 mt-6 rounded-xl border bg-gradient-to-r p-3 sm:mt-8 sm:p-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-python-neon h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full sm:h-3 sm:w-3"></div>
                <span className="text-python-neon text-sm font-medium sm:text-base">
                  Available for new opportunities
                </span>
              </div>
              <p className="text-dark-text-secondary mt-1 text-xs sm:mt-2 sm:text-sm">
                Currently open to full-time positions and exciting freelance projects.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="bg-dark-surface/80 border-dark-border overflow-hidden rounded-2xl border p-4 backdrop-blur-sm sm:p-8">
              <h3 className="font-display text-python-yellow mb-4 text-lg font-semibold sm:mb-6 sm:text-2xl">
                Send a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  className="py-6 text-center sm:py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="text-python-neon mx-auto mb-3 h-12 w-12 sm:mb-4 sm:h-16 sm:w-16" />
                  <h4 className="text-python-neon mb-1 text-lg font-semibold sm:mb-2 sm:text-xl">
                    Message Sent!
                  </h4>
                  <p className="text-dark-text-secondary text-sm sm:text-base">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {error && (
                    <motion.div
                      className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 sm:gap-3 sm:p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400 sm:h-5 sm:w-5" />
                      <p className="text-xs text-red-400 sm:text-sm">{error}</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        htmlFor="from_name"
                        className="mb-2 block text-xs font-medium text-white sm:text-sm"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-dark-bg border-dark-border placeholder-dark-text-secondary focus:border-python-electric focus:ring-python-electric w-full rounded-lg border px-3 py-2.5 text-sm text-white transition-colors outline-none focus:ring-1 sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="min-w-0">
                      <label
                        htmlFor="reply_to"
                        className="mb-2 block text-xs font-medium text-white sm:text-sm"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="reply_to"
                        name="reply_to"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-dark-bg border-dark-border placeholder-dark-text-secondary focus:border-python-electric focus:ring-python-electric w-full rounded-lg border px-3 py-2.5 text-sm text-white transition-colors outline-none focus:ring-1 sm:px-4 sm:py-3 sm:text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        htmlFor="company"
                        className="mb-2 block text-xs font-medium text-white sm:text-sm"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-dark-bg border-dark-border placeholder-dark-text-secondary focus:border-python-electric focus:ring-python-electric w-full rounded-lg border px-3 py-2.5 text-sm text-white transition-colors outline-none focus:ring-1 sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div className="min-w-0">
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-xs font-medium text-white sm:text-sm"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-dark-bg border-dark-border placeholder-dark-text-secondary focus:border-python-electric focus:ring-python-electric w-full rounded-lg border px-3 py-2.5 text-sm text-white transition-colors outline-none focus:ring-1 sm:px-4 sm:py-3 sm:text-base"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium text-white sm:text-sm"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="bg-dark-bg border-dark-border placeholder-dark-text-secondary focus:border-python-electric focus:ring-python-electric sm:rows-5 w-full resize-none rounded-lg border px-3 py-2.5 text-sm text-white transition-colors outline-none focus:ring-1 sm:px-4 sm:py-3 sm:text-base"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="from-python-blue to-python-electric hover:shadow-python-blue/50 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:py-4 sm:text-base"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="h-4 w-4 rounded-full border-2 border-white border-t-transparent sm:h-5 sm:w-5"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="sm:h-5 sm:w-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
