import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, TrendingUp } from 'lucide-react'
import portfolioHelpers from '../../lib/portfolio-helpers'

const Experience: React.FC = () => {
  const experiences = portfolioHelpers.getExperiencesData()
  const totalYears = portfolioHelpers.getTotalExperienceYears()
  const stats = portfolioHelpers.getPortfolioStats()
  
  // Add color mapping for different industries
  const getColorByIndustry = (industry: string) => {
    const colorMap: Record<string, string> = {
      'FinTech': 'python-blue',
      'Service Management': 'python-electric', 
      'Hospitality & Web Solutions': 'python-neon',
      'Web Solutions': 'python-yellow',
      'Education & Training': 'python-green'
    }
    return colorMap[industry] || 'python-blue'
  }
  
  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-dark-surface-variant via-dark-surface to-dark-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-python-yellow">Professional</span>{' '}
            <span className="text-python-electric">Journey</span>
          </h2>
          <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
            My career path through leading tech companies, building scalable solutions 
            and driving innovation at enterprise scale.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-python-electric via-python-yellow to-python-neon transform md:-translate-x-0.5"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const color = getColorByIndustry(exp.industry)
              const duration = `${exp.startDate} - ${exp.endDate === 'present' ? 'Present' : exp.endDate}`
              
              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-${color} rounded-full transform md:-translate-x-2 border-4 border-dark-bg shadow-lg shadow-${color}/50 z-10`}></div>

                  {/* Content Card */}
                  <motion.div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`group p-6 bg-dark-bg/80 backdrop-blur-sm rounded-2xl border border-dark-border hover:border-${color}/50 transition-all duration-300 shadow-lg`}>
                      {/* Company & Position */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`text-xl font-display font-bold text-${color} mb-1`}>
                            {exp.company}
                          </h3>
                          <h4 className="text-lg font-semibold text-white">
                            {exp.position}
                          </h4>
                        </div>
                        <div className={`px-3 py-1 bg-${color}/20 text-${color} text-xs font-medium rounded-full border border-${color}/30`}>
                          {exp.industry}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-dark-text-secondary">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                        <div className={`px-2 py-1 bg-${color}/10 text-${color} rounded text-xs`}>
                          {exp.type}
                        </div>
                        <div className="text-xs bg-dark-surface/50 px-2 py-1 rounded">
                          {exp.duration}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Key Achievements
                        </h5>
                        <ul className="space-y-1 text-sm">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              className="text-dark-text-secondary flex items-start gap-2"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 * idx }}
                              viewport={{ once: true }}
                            >
                              <span className={`w-1.5 h-1.5 bg-${color} rounded-full mt-2 flex-shrink-0`}></span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs font-medium bg-${color}/10 text-${color} rounded border border-${color}/20`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Year Badge (for larger screens) */}
                  <div className={`hidden md:block w-2/12 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`inline-block px-4 py-2 bg-${color}/20 text-${color} rounded-full text-sm font-medium border border-${color}/30`}>
                      {exp.startDate.split('-')[0]}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Career Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Years Experience', value: `${totalYears}+`, color: 'python-blue' },
            { label: 'Companies', value: `${stats.companiesWorked}`, color: 'python-electric' },
            { label: 'Projects Delivered', value: `${stats.totalProjects}+`, color: 'python-yellow' },
            { label: 'Certifications', value: `${stats.certifications}`, color: 'python-neon' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className={`text-3xl md:text-4xl font-display font-bold text-${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-dark-text-secondary text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
