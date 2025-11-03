import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import portfolioHelpers from '../../lib/portfolio-helpers'

const Projects: React.FC = () => {
  const featuredProjects = portfolioHelpers.getFeaturedProjectsData()
  const allProjects = portfolioHelpers.getPortfolioData().projects
  const otherProjects = allProjects.filter(project => !project.featured)

  return (
    <section
      id="projects"
      className="from-dark-bg via-dark-surface to-dark-bg bg-gradient-to-br px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="font-display mb-4 text-2xl leading-tight font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-python-neon">Featured</span>{' '}
            <span className="text-python-yellow">Projects</span>
          </h2>
          <p className="font-body text-dark-text-secondary mx-auto max-w-full text-base leading-relaxed sm:max-w-2xl sm:text-lg md:max-w-3xl md:text-xl">
            A showcase of my recent work, demonstrating technical expertise and creative
            problem-solving across various domains and technologies.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <motion.h3
            className="font-heading text-python-electric mb-8 text-2xl leading-snug font-semibold tracking-tight sm:text-3xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Work
          </motion.h3>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-dark-surface border-dark-border hover:border-python-electric/50 relative overflow-hidden rounded-2xl border p-4 transition-all duration-500 sm:p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Project Image */}
                <div className="from-python-blue/20 to-python-electric/20 relative h-40 overflow-hidden bg-gradient-to-br sm:h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xl font-bold text-white/20 sm:text-4xl">
                      {project.title
                        .split(' ')
                        .map(word => word[0])
                        .join('')}
                    </div>
                  </div>
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium sm:px-3 ${
                        project.status === 'production'
                          ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                          : project.status === 'completed'
                            ? 'border border-blue-500/30 bg-blue-500/20 text-blue-400'
                            : 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <h4 className="font-heading group-hover:text-python-yellow mb-2 text-lg leading-snug font-semibold tracking-tight text-white transition-colors sm:mb-3 sm:text-xl">
                    {project.title}
                  </h4>
                  <p className="font-body text-dark-text-secondary mb-2 text-sm leading-relaxed sm:mb-4 sm:text-base">
                    {project.description}
                  </p>
                  {/* Technologies */}
                  <div className="mb-2 flex flex-wrap gap-2 sm:mb-4">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="font-tech bg-python-blue/20 text-python-electric border-python-blue/30 rounded-full border px-2 py-1 text-xs font-medium tracking-widest uppercase sm:px-3"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="flex gap-2 sm:gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-dark-text-secondary hover:text-python-electric flex items-center gap-2 font-medium tracking-tight transition-colors"
                      >
                        <Github size={16} />
                        <span className="hidden sm:inline">Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-dark-text-secondary hover:text-python-yellow flex items-center gap-2 font-medium tracking-tight transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span className="hidden sm:inline">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <motion.h3
            className="font-display text-python-neon mb-8 text-2xl font-semibold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            More Projects
          </motion.h3>

          <div className="grid gap-6 md:grid-cols-2">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-dark-surface/50 border-dark-border hover:border-python-neon/50 rounded-xl border p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <h4 className="group-hover:text-python-neon text-lg font-semibold text-white transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-text-secondary hover:text-python-electric transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-text-secondary hover:text-python-yellow transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-dark-text-secondary mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="bg-python-neon/10 text-python-neon rounded px-2 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-dark-text-secondary px-2 py-1 text-xs">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                {/* Project Category */}
                <div className="text-python-yellow text-xs font-medium">
                  {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
