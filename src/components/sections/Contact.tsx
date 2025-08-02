import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, Code, AlertCircle } from 'lucide-react'
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
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Map form field names to state property names for EmailJS compatibility
    const fieldMapping: { [key: string]: keyof FormData } = {
      from_name: "name",
      reply_to: "email",
      company: "company",
      subject: "subject",
      message: "message",
    }
    
    const stateField = fieldMapping[name] || name as keyof FormData
    setFormData({
      ...formData,
      [stateField]: value
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
      color: 'python-electric'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone}`,
      color: 'python-yellow'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: location,
      href: '#',
      color: 'python-neon'
    }
  ]

  const socialLinksFormatted = [
    { icon: Github, href: socialLinksData.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinksData.linkedin, label: 'LinkedIn' },
    { icon: Code, href: socialLinksData.leetcode, label: 'LeetCode' }
  ]

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-surface-variant">
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-python-electric">Let's</span>{' '}
            <span className="text-python-yellow">Connect</span>
          </h2>
          <p className="text-base sm:text-xl text-dark-text-secondary max-w-full sm:max-w-2xl md:max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can work together 
            to create something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-2xl font-display font-semibold text-python-neon mb-6 sm:mb-8">
              Get In Touch
            </h3>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-dark-surface/50 rounded-xl border border-dark-border hover:border-python-electric/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-python-electric to-python-electric/60 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-dark-text-secondary">{info.label}</div>
                    <div className="text-sm sm:text-lg font-medium text-python-electric group-hover:text-white transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Follow Me</h4>
              <div className="flex gap-3 sm:gap-4">
                {socialLinksFormatted.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 bg-dark-surface border border-dark-border rounded-lg text-dark-text-secondary hover:text-python-electric hover:border-python-electric/50 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
                
                {/* HackerRank with FontAwesome icon */}
                <motion.a
                  href={socialLinksData.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 bg-dark-surface border border-dark-border rounded-lg text-dark-text-secondary hover:text-python-electric hover:border-python-electric/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + socialLinksFormatted.length * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label="HackerRank"
                >
                  <FontAwesomeIcon icon={faHackerrank} className="text-lg sm:text-xl" />
                </motion.a>
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-python-neon/10 to-python-yellow/10 rounded-xl border border-python-neon/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-python-neon rounded-full animate-pulse"></div>
                <span className="text-python-neon font-medium text-sm sm:text-base">Available for new opportunities</span>
              </div>
              <p className="text-dark-text-secondary text-xs sm:text-sm mt-1 sm:mt-2">
                Currently open to full-time positions and exciting freelance projects.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark-surface/80 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-dark-border">
              <h3 className="text-lg sm:text-2xl font-display font-semibold text-python-yellow mb-4 sm:mb-6">
                Send a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-6 sm:py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-python-neon mx-auto mb-3 sm:mb-4" />
                  <h4 className="text-lg sm:text-xl font-semibold text-python-neon mb-1 sm:mb-2">Message Sent!</h4>
                  <p className="text-dark-text-secondary text-sm sm:text-base">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {error && (
                    <motion.div
                      className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 sm:gap-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-xs sm:text-sm">{error}</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="from_name" className="block text-xs sm:text-sm font-medium text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text-secondary focus:border-python-electric focus:ring-1 focus:ring-python-electric outline-none transition-colors text-sm sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="reply_to" className="block text-xs sm:text-sm font-medium text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="reply_to"
                        name="reply_to"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text-secondary focus:border-python-electric focus:ring-1 focus:ring-python-electric outline-none transition-colors text-sm sm:text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-white mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text-secondary focus:border-python-electric focus:ring-1 focus:ring-python-electric outline-none transition-colors text-sm sm:text-base"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-white mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text-secondary focus:border-python-electric focus:ring-1 focus:ring-python-electric outline-none transition-colors text-sm sm:text-base"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text-secondary focus:border-python-electric focus:ring-1 focus:ring-python-electric outline-none transition-colors resize-none text-sm sm:text-base sm:rows-5"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-python-blue to-python-electric text-white font-semibold rounded-lg shadow-lg hover:shadow-python-blue/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                    whileHover={!isSubmitting ? { y: -2, scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="sm:w-5 sm:h-5" />
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
