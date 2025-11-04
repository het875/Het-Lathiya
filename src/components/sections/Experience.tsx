import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import portfolioHelpers from '../../lib/portfolio-helpers'

const Experience: React.FC = () => {
  const experiences = portfolioHelpers.getExperiencesData()
  const totalYears = portfolioHelpers.getTotalExperienceYears()
  const stats = portfolioHelpers.getPortfolioStats()

  return (
    <section id="experience" className="bg-dark-surface px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display mb-4 text-3xl font-bold sm:text-5xl lg:text-6xl">
            <span className="text-python-yellow">Professional</span>{' '}
            <span className="text-python-electric">Experience</span>
          </h2>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-bg/50 border-dark-border hover:border-python-electric/50 hover:shadow-python-electric/10 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg sm:p-8">
                {/* Header Section */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-start gap-3">
                      <div className="bg-python-electric/20 flex-shrink-0 rounded-lg p-2">
                        <Briefcase className="text-python-electric h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-python-electric mb-1 text-xl font-bold sm:text-2xl">
                          {exp.company}
                        </h3>
                        <p className="mb-2 text-lg font-semibold text-white">{exp.position}</p>
                      </div>
                    </div>
                  </div>

                  {/* Industry Badge */}
                  <div className="bg-python-neon/10 text-python-neon border-python-neon/30 flex-shrink-0 self-start rounded-full border px-4 py-1.5 text-sm font-medium">
                    {exp.industry}
                  </div>
                </div>

                {/* Meta Information */}
                <div className="mb-6 flex flex-wrap gap-4 text-sm">
                  <div className="text-dark-text-secondary flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {exp.startDate} - {exp.endDate === 'present' ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-dark-text-secondary flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="bg-python-yellow/10 text-python-yellow rounded-full px-3 py-1 text-xs font-medium">
                    {exp.type}
                  </div>
                  <div className="bg-dark-surface text-dark-text-secondary rounded-full px-3 py-1 text-xs">
                    {exp.duration}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold tracking-wider text-white uppercase">
                    Key Achievements
                  </h4>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        className="text-dark-text-secondary flex items-start gap-3 text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * idx }}
                        viewport={{ once: true }}
                      >
                        <span className="bg-python-electric mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"></span>
                        <span>{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="mb-3 text-sm font-semibold tracking-wider text-white uppercase">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-python-blue/10 text-python-blue border-python-blue/20 hover:bg-python-blue/20 rounded-lg border px-3 py-1 text-xs font-medium transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Career Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Years Experience', value: `${totalYears}+`, color: 'python-electric' },
            { label: 'Companies', value: `${stats.companiesWorked}`, color: 'python-yellow' },
            { label: 'Projects', value: `${stats.totalProjects}+`, color: 'python-neon' },
            { label: 'Certifications', value: `${stats.certifications}`, color: 'python-blue' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-dark-bg/30 rounded-xl p-6 text-center backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div
                className={`font-display text-${stat.color} mb-2 text-3xl font-bold sm:text-4xl`}
              >
                {stat.value}
              </div>
              <div className="text-dark-text-secondary text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
