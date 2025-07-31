/**
 * Example Usage Guide for Portfolio Data System
 * This file demonstrates how to use the centralized portfolio data
 */

import React from 'react';
import portfolioHelpers from '../lib/portfolio-helpers';

// =============================================================================
// EXAMPLE COMPONENT USAGE
// =============================================================================

/**
 * Example: Hero Section Component
 */
const ExampleHeroSection: React.FC = () => {
  const { name, title, headline } = portfolioHelpers.getPersonalInfo();
  const social = portfolioHelpers.getSocialLinks();
  
  return (
    <section className="hero">
      <h1>{name}</h1>
      <h2>{title}</h2>
      <p>{headline}</p>
      
      <div className="social-links">
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={social.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </section>
  );
};

/**
 * Example: Skills Section Component
 */
const ExampleSkillsSection: React.FC = () => {
  const skillsGrouped = portfolioHelpers.getSkillsGrouped();
  const topSkills = portfolioHelpers.getTopSkills();
  
  return (
    <section className="skills">
      <h2>Top Skills</h2>
      <div className="top-skills">
        {topSkills.map(skill => (
          <span key={skill.name} className="skill-tag">
            {skill.name}
          </span>
        ))}
      </div>
      
      <h3>All Skills by Category</h3>
      {Object.entries(skillsGrouped).map(([category, skillsList]) => (
        <div key={category} className="skill-category">
          <h4>{category}</h4>
          <div className="skills-list">
            {skillsList.map(skill => (
              <span key={skill.name} className={`skill-item ${skill.proficiency}`}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

/**
 * Example: Projects Section Component
 */
const ExampleProjectsSection: React.FC = () => {
  const featuredProjects = portfolioHelpers.getFeaturedProjectsData();
  const categories = portfolioHelpers.getProjectCategories();
  
  return (
    <section className="projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {featuredProjects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.techStack.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <h3>Project Categories</h3>
      <div className="category-filters">
        {Object.entries(categories).map(([key, label]) => (
          <button key={key} className="category-filter">
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};

/**
 * Example: Experience Section Component
 */
const ExampleExperienceSection: React.FC = () => {
  const experiences = portfolioHelpers.getExperiencesData();
  const currentJob = portfolioHelpers.getCurrentExperienceData();
  const totalYears = portfolioHelpers.getTotalExperienceYears();
  
  return (
    <section className="experience">
      <h2>Experience ({totalYears} years)</h2>
      
      {currentJob && (
        <div className="current-role">
          <h3>Currently: {currentJob.position} at {currentJob.company}</h3>
          <p>{currentJob.industry} • {currentJob.location}</p>
        </div>
      )}
      
      <div className="experience-timeline">
        {experiences.map(exp => (
          <div key={exp.id} className="experience-item">
            <div className="timeline-marker"></div>
            <div className="experience-content">
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              <p className="duration">{exp.startDate} - {exp.endDate} • {exp.duration}</p>
              <p className="location">{exp.location} • {exp.type}</p>
              
              <ul className="achievements">
                {exp.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
              
              <div className="technologies">
                {exp.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * Example: About Section Component
 */
const ExampleAboutSection: React.FC = () => {
  const { aboutMe, resume } = portfolioHelpers.getPersonalInfo();
  const competencies = portfolioHelpers.getCoreCompetenciesData();
  const stats = portfolioHelpers.getPortfolioStats();
  
  return (
    <section className="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          {aboutMe.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">{stats.totalProjects}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.yearsOfExperience}</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.certifications}</span>
            <span className="stat-label">Certifications</span>
          </div>
        </div>
      </div>
      
      <div className="core-competencies">
        <h3>Core Competencies</h3>
        <div className="competencies-grid">
          {competencies.map(competency => (
            <div key={competency.name} className="competency-card">
              <h4>{competency.name}</h4>
              <p>{competency.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <a href={resume} download className="resume-download">
        Download Resume
      </a>
    </section>
  );
};

/**
 * Example: Contact Section Component
 */
const ExampleContactSection: React.FC = () => {
  const contactInfo = portfolioHelpers.getContactInfo();
  
  const handleEmailClick = () => {
    const subject = portfolioHelpers.generateEmailSubject('Project Inquiry');
    const body = 'Hi Het,\n\nI found your portfolio and would like to discuss...';
    const mailtoLink = portfolioHelpers.generateMailtoLink(subject, body);
    window.location.href = mailtoLink;
  };
  
  return (
    <section className="contact">
      <h2>Get In Touch</h2>
      <div className="contact-info">
        <div className="contact-item">
          <strong>Email:</strong>
          <button onClick={handleEmailClick} className="email-link">
            {contactInfo.email}
          </button>
        </div>
        <div className="contact-item">
          <strong>Phone:</strong>
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
        </div>
        <div className="contact-item">
          <strong>Location:</strong>
          <span>{contactInfo.location}</span>
        </div>
      </div>
      
      <div className="social-links">
        {Object.entries(contactInfo.socialLinks).map(([platform, url]) => (
          <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
            {platform}
          </a>
        ))}
      </div>
    </section>
  );
};

// =============================================================================
// SEARCH FUNCTIONALITY EXAMPLE
// =============================================================================

/**
 * Example: Search Projects Component
 */
const ExampleProjectSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(portfolioHelpers.getFeaturedProjectsData());
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults(portfolioHelpers.getFeaturedProjectsData());
    } else {
      setSearchResults(portfolioHelpers.searchProjects(query));
    }
  };
  
  return (
    <div className="project-search">
      <input
        type="text"
        placeholder="Search projects by name, description, or technology..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map(project => (
            <div key={project.id} className="search-result">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
          ))
        ) : (
          <p>No projects found matching "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// UTILITY USAGE EXAMPLES
// =============================================================================

/**
 * Example: Technology Statistics Component
 */
const ExampleTechStats: React.FC = () => {
  const techBreakdown = portfolioHelpers.getTechnologyBreakdown();
  const techFromExperience = portfolioHelpers.getTechnologiesFromExperience();
  
  return (
    <div className="tech-stats">
      <h3>Technology Usage</h3>
      <div className="tech-breakdown">
        {techBreakdown.slice(0, 10).map(({ technology, count }) => (
          <div key={technology} className="tech-stat">
            <span className="tech-name">{technology}</span>
            <span className="tech-count">{count} projects</span>
          </div>
        ))}
      </div>
      
      <h4>Technologies from Experience</h4>
      <div className="experience-tech">
        {techFromExperience.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
    </div>
  );
};

/**
 * Example: Recent Updates Component
 */
const ExampleRecentUpdates: React.FC = () => {
  const recentProjects = portfolioHelpers.getRecentProjectsData(2);
  const recentCertifications = portfolioHelpers.getRecentCertifications(3);
  
  return (
    <div className="recent-updates">
      <h3>Recent Work</h3>
      <div className="recent-projects">
        {recentProjects.map(project => (
          <div key={project.id} className="recent-item">
            <h4>{project.title}</h4>
            <span className="status">{project.status}</span>
          </div>
        ))}
      </div>
      
      <h3>Recent Certifications</h3>
      <div className="recent-certifications">
        {recentCertifications.map(cert => (
          <div key={cert.name} className="cert-item">
            <span className="cert-name">{cert.name}</span>
            <span className="cert-issuer">{cert.issuer}</span>
            <span className="cert-date">{cert.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// EXPORT COMPONENTS FOR REFERENCE
// =============================================================================

export {
  ExampleHeroSection,
  ExampleSkillsSection,
  ExampleProjectsSection,
  ExampleExperienceSection,
  ExampleAboutSection,
  ExampleContactSection,
  ExampleProjectSearch,
  ExampleTechStats,
  ExampleRecentUpdates
};
