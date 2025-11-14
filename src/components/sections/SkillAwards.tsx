import React from 'react'
import { motion } from 'framer-motion'
import portfolioHelpers from '../../lib/portfolio-helpers'

interface SkillCategory {
  title: string
  skills: Array<{
    name: string
    proficiency: string
  }>
  gradient: string
  accentColor: string
}

const SkillAwards: React.FC = () => {
  const skillsData = portfolioHelpers.getPortfolioData().skills

  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      gradient: 'from-python-blue to-python-electric',
      accentColor: 'text-python-electric',
      skills: skillsData.filter(s => s.category === 'language').map(s => ({
        name: s.name,
        proficiency: s.proficiency,
      })),
    },
    {
      title: 'Frameworks',
      gradient: 'from-python-yellow to-amber-500',
      accentColor: 'text-python-yellow',
      skills: skillsData.filter(s => s.category === 'framework').map(s => ({
        name: s.name,
        proficiency: s.proficiency,
      })),
    },
    {
      title: 'Databases',
      gradient: 'from-python-neon to-green-500',
      accentColor: 'text-python-neon',
      skills: skillsData.filter(s => s.category === 'database').map(s => ({
        name: s.name,
        proficiency: s.proficiency,
      })),
    },
    {
      title: 'Tools',
      gradient: 'from-purple-500 to-pink-500',
      accentColor: 'text-purple-400',
      skills: skillsData.filter(s => s.category === 'tool').map(s => ({
        name: s.name,
        proficiency: s.proficiency,
      })),
    },
    {
      title: 'Concepts',
      gradient: 'from-orange-500 to-red-500',
      accentColor: 'text-orange-400',
      skills: skillsData.filter(s => s.category === 'concept').map(s => ({
        name: s.name,
        proficiency: s.proficiency,
      })),
    },
    {
      title: 'Soft Skills',
      gradient: 'from-cyan-500 to-blue-500',
      accentColor: 'text-cyan-400',
      skills: skillsData.filter(s => s.category === 'soft').map(s => ({
        name: s.name,
        proficiency: s.proficiency,
      })),
    },
  ]

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'expert':
        return 'from-yellow-400 to-amber-500'
      case 'advanced':
        return 'from-blue-400 to-cyan-500'
      case 'intermediate':
        return 'from-green-400 to-emerald-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display mb-4 bg-gradient-to-r from-python-electric via-python-yellow to-python-neon bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Technical Expertise
          </h2>
          <p className="font-heading text-dark-text-secondary mx-auto max-w-2xl text-sm sm:text-base md:text-lg">
            Comprehensive skill set across multiple domains
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl border border-dark-border bg-dark-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-opacity-50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Category Header */}
              <div className="mb-6">
                <div className={`mb-2 inline-block rounded-full bg-gradient-to-r ${category.gradient} px-4 py-1 text-xs font-bold text-white`}>
                  {category.skills.length} {category.skills.length === 1 ? 'Skill' : 'Skills'}
                </div>
                <h3 className={`font-heading text-2xl font-bold ${category.accentColor}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-dark-border/50 bg-dark-bg/50 p-3 transition-all duration-300 hover:border-opacity-100 hover:bg-dark-bg/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <span className="font-heading text-sm font-medium text-white">{skill.name}</span>
                    <span
                      className={`rounded-md bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} px-2 py-1 text-xs font-bold capitalize text-white`}
                    >
                      {skill.proficiency}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="mt-6 flex items-center justify-between border-t border-dark-border/30 pt-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${category.accentColor}`}>
                    {category.skills.filter(s => s.proficiency === 'expert').length}
                  </div>
                  <div className="text-dark-text-secondary text-xs uppercase">Expert</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${category.accentColor}`}>
                    {category.skills.filter(s => s.proficiency === 'advanced').length}
                  </div>
                  <div className="text-dark-text-secondary text-xs uppercase">Advanced</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${category.accentColor}`}>
                    {category.skills.length}
                  </div>
                  <div className="text-dark-text-secondary text-xs uppercase">Total</div>
                </div>
              </div>

              {/* Decorative Background Gradient */}
              <div
                className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${category.gradient} opacity-5 blur-3xl transition-opacity duration-300 group-hover:opacity-10`}
              />
            </motion.div>
          ))}
        </div>

        {/* Overall Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-dark-border bg-dark-surface/30 p-8 backdrop-blur-sm md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-python-yellow mb-2 text-4xl font-bold">
              {skillsData.filter(s => s.proficiency === 'expert').length}
            </div>
            <div className="text-dark-text-secondary text-sm font-medium uppercase tracking-wider">
              Expert Level
            </div>
          </div>
          <div className="text-center">
            <div className="text-python-electric mb-2 text-4xl font-bold">
              {skillsData.filter(s => s.proficiency === 'advanced').length}
            </div>
            <div className="text-dark-text-secondary text-sm font-medium uppercase tracking-wider">
              Advanced
            </div>
          </div>
          <div className="text-center">
            <div className="text-python-neon mb-2 text-4xl font-bold">
              {skillCategories.length}
            </div>
            <div className="text-dark-text-secondary text-sm font-medium uppercase tracking-wider">
              Categories
            </div>
          </div>
          <div className="text-center">
            <div className="from-python-electric via-python-yellow to-python-neon mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              {skillsData.length}
            </div>
            <div className="text-dark-text-secondary text-sm font-medium uppercase tracking-wider">
              Total Skills
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillAwards
