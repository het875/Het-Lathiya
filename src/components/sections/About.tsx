import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Globe, Zap, Download } from 'lucide-react'
import portfolioHelpers from '../../lib/portfolio-helpers'
import { Python } from '../common/Python'

const About: React.FC = () => {
  const { name, aboutMe, resume } = portfolioHelpers.getPersonalInfo()
  const coreCompetencies = portfolioHelpers.getCoreCompetenciesData()
  const stats = portfolioHelpers.getPortfolioStats()
  const totalYears = portfolioHelpers.getTotalExperienceYears()

  return (
    <section
      id="about"
      className="from-dark-surface to-dark-surface-variant relative w-full overflow-hidden bg-gradient-to-br px-4 py-12 sm:px-6 sm:py-20"
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
          <Python className="mx-auto mb-6 h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96" />

          <h2 className="font-display mb-4 text-2xl leading-tight font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-python-electric">About</span>{' '}
            <span className="text-python-yellow">Me</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="mb-12 grid grid-cols-1 items-center gap-8 overflow-hidden sm:mb-20 sm:gap-16 md:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h3 className="font-heading text-python-yellow mb-4 text-2xl leading-snug font-semibold tracking-tight sm:mb-6 sm:text-3xl md:text-4xl">
              Crafting Digital Excellence
            </h3>
            <div className="font-body text-dark-text-secondary space-y-2 text-base leading-relaxed sm:space-y-4 sm:text-lg">
              {aboutMe
                .split('\n\n')
                .slice(1, 4)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Stats */}
            <div className="bg-dark-bg/30 mt-6 grid grid-cols-1 gap-4 rounded-xl p-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 sm:p-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-python-electric text-xl font-bold sm:text-2xl">
                  {totalYears}+
                </div>
                <div className="text-dark-text-secondary text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-python-yellow text-xl font-bold sm:text-2xl">
                  {stats.totalProjects}+
                </div>
                <div className="text-dark-text-secondary text-xs sm:text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-python-neon text-xl font-bold sm:text-2xl">
                  {stats.certifications}
                </div>
                <div className="text-dark-text-secondary text-xs sm:text-sm">Certifications</div>
              </div>
            </div>

            {/* Resume Download */}
            <motion.a
              href={resume}
              download
              style={{ textDecoration: 'none' }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-bold text-black shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl sm:mt-6 sm:px-6 sm:py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="from-python-blue/20 to-python-electric/20 relative h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-br sm:h-[550px] md:h-[600px] lg:h-[650px]">
              {/* Code snippet visual */}
              <div className="bg-dark-bg/80 absolute inset-4 overflow-hidden rounded-2xl p-4 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm md:p-8 md:text-base">
                <div className="mb-4 flex items-center gap-2 sm:mb-6">
                  <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500 sm:h-3 sm:w-3"></div>
                  <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-yellow-500 sm:h-3 sm:w-3"></div>
                  <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-500 sm:h-3 sm:w-3"></div>
                </div>
                <motion.div
                  className="space-y-1 overflow-y-scroll sm:space-y-0"
                  style={{
                    maxHeight: 'calc(100% - 60px)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#1e90ff rgba(10, 10, 10, 0.5)',
                    overscrollBehavior: 'contain',
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true, margin: '-100px' }}
                  onWheel={e => {
                    e.stopPropagation()
                  }}
                  tabIndex={0}
                >
                  <div className="text-python-blue break-words">
                    <span className="text-python-electric">class</span> HetLathiya:
                  </div>
                  <div className="text-python-neon ml-2 break-words sm:ml-4">
                    <span className="text-python-electric">def</span>{' '}
                    <span className="text-python-yellow">__init__</span>(
                    <span className="text-python-electric">self</span>):
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    self.name = <span className="text-python-yellow">"{name}"</span>
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    self.role ={' '}
                    <span className="text-python-yellow">"Python Software Developer"</span>
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    self.location = <span className="text-python-yellow">"Gujarat, India"</span>
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    self.current_company = <span className="text-python-yellow">"ANV Tech"</span>
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    self.languages = [
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Python", "C", "C++", "SQL"
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">]</div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    self.specialization = [
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Backend Development",
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">"REST APIs",</div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "FinTech Systems",
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Web Scraping",
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Real-time Data Processing"
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">]</div>
                  <div className="text-python-neon mt-3 ml-2 break-words sm:mt-4 sm:ml-4">
                    <span className="text-python-electric">def</span>{' '}
                    <span className="text-python-yellow">get_current_focus</span>(
                    <span className="text-python-electric">self</span>):
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">
                    <span className="text-python-electric">return</span> [
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Building scalable microservices architecture",
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Developing real-time trading systems",
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Implementing fraud detection algorithms",
                  </div>
                  <div className="text-python-yellow ml-6 break-words sm:ml-12">
                    "Optimizing API performance"
                  </div>
                  <div className="text-python-neon ml-4 break-words sm:ml-8">]</div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="bg-python-electric/30 absolute top-8 right-8 h-16 w-16 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Core Competencies Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {coreCompetencies.map((competency, index) => (
            <motion.div
              key={competency.name}
              className="group bg-dark-bg/50 border-dark-border hover:border-python-electric/50 rounded-xl border p-6 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div
                className={`from-python-electric to-python-blue/60 mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110`}
              >
                {index === 0 && <Code className="h-6 w-6 text-white" />}
                {index === 1 && <Globe className="h-6 w-6 text-white" />}
                {index === 2 && <Zap className="h-6 w-6 text-white" />}
                {index === 3 && <Database className="h-6 w-6 text-white" />}
                {index === 4 && <Code className="h-6 w-6 text-white" />}
                {index === 5 && <Globe className="h-6 w-6 text-white" />}
              </div>
              <h4 className="mb-2 text-lg font-semibold text-white">{competency.name}</h4>
              <p className="text-dark-text-secondary text-sm break-words">
                {competency.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
