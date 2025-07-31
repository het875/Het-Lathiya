import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Globe, Zap, Download } from 'lucide-react'
import portfolioHelpers from '../../lib/portfolio-helpers'

const About: React.FC = () => {
  const { name, aboutMe, resume } = portfolioHelpers.getPersonalInfo()
  const coreCompetencies = portfolioHelpers.getCoreCompetenciesData()
  const stats = portfolioHelpers.getPortfolioStats()
  const totalYears = portfolioHelpers.getTotalExperienceYears()
  
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-dark-surface to-dark-surface-variant">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-python-electric">About</span>{' '}
            <span className="text-python-yellow">Me</span>
          </h2>
          <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
            {aboutMe.split('\n\n')[0]}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-python-yellow">
              Crafting Digital Excellence
            </h3>
            <div className="space-y-4 text-lg text-dark-text-secondary">
              {aboutMe.split('\n\n').slice(1, 4).map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 p-6 bg-dark-bg/30 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-python-electric">{totalYears}+</div>
                <div className="text-sm text-dark-text-secondary">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-python-yellow">{stats.totalProjects}+</div>
                <div className="text-sm text-dark-text-secondary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-python-neon">{stats.certifications}</div>
                <div className="text-sm text-dark-text-secondary">Certifications</div>
              </div>
            </div>
            
            {/* Resume Download */}
            <motion.a
              href={resume}
              download
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-python-blue to-python-electric text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-python-blue/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 rounded-2xl bg-gradient-to-br from-python-blue/20 to-python-electric/20 overflow-hidden">
              {/* Code snippet visual */}
              <div className="absolute inset-4 bg-dark-bg/80 rounded-xl p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="text-python-blue">
                    <span className="text-python-electric">const</span> developer = {'{'}
                  </div>
                  <div className="ml-4 text-python-neon">
                    name: <span className="text-python-yellow">"{name}"</span>,
                  </div>
                  <div className="ml-4 text-python-neon">
                    skills: <span className="text-python-yellow">["React", "Python", "TypeScript"]</span>,
                  </div>
                  <div className="ml-4 text-python-neon">
                    passion: <span className="text-python-yellow">"Building amazing things"</span>
                  </div>
                  <div className="text-python-blue">{'}'}</div>
                </motion.div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 bg-python-electric/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Core Competencies Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          {coreCompetencies.map((competency, index) => (
            <motion.div
              key={competency.name}
              className="group p-6 bg-dark-bg/50 rounded-xl border border-dark-border hover:border-python-electric/50 transition-all duration-300"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br from-python-electric to-python-blue/60 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {index === 0 && <Code className="w-6 h-6 text-white" />}
                {index === 1 && <Globe className="w-6 h-6 text-white" />}
                {index === 2 && <Zap className="w-6 h-6 text-white" />}
                {index === 3 && <Database className="w-6 h-6 text-white" />}
                {index === 4 && <Code className="w-6 h-6 text-white" />}
                {index === 5 && <Globe className="w-6 h-6 text-white" />}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{competency.name}</h4>
              <p className="text-dark-text-secondary text-sm">{competency.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
