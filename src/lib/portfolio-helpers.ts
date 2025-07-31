/**
 * Portfolio Data Helper Functions
 * Centralized access to portfolio data with useful utility functions
 */

import {
  personalInfo,
  socialLinks,
  coreCompetencies,
  skills,
  experiences,
  projects,
  education,
  certifications,
  getFeaturedProjects,
  getSkillsByCategory,
  getCurrentExperience,
  getTotalExperience,
  getRecentProjects,
  type Skill
} from '../data/portfolio-data';

import {
  PROJECT_CATEGORIES,
  SKILL_CATEGORIES,
  NAVIGATION
} from '../data/constants';

// =============================================================================
// DATA ACCESS FUNCTIONS
// =============================================================================

/**
 * Get all portfolio data
 */
export const getPortfolioData = () => ({
  personalInfo,
  socialLinks,
  coreCompetencies,
  skills,
  experiences,
  projects,
  education,
  certifications
});

/**
 * Get navigation items with current section tracking
 */
export const getNavigationItems = () => NAVIGATION.main;

/**
 * Get social media links
 */
export const getSocialLinks = () => socialLinks;

/**
 * Get personal information
 */
export const getPersonalInfo = () => personalInfo;

// =============================================================================
// PROJECT FUNCTIONS
// =============================================================================

/**
 * Get featured projects for homepage
 */
export const getFeaturedProjectsData = () => getFeaturedProjects();

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

/**
 * Get project categories for filtering
 */
export const getProjectCategories = () => PROJECT_CATEGORIES;

/**
 * Get project by ID
 */
export const getProjectById = (id: string) => 
  projects.find(project => project.id === id);

/**
 * Get recent projects for quick display
 */
export const getRecentProjectsData = (count: number = 3) => 
  getRecentProjects(count);

// =============================================================================
// SKILLS FUNCTIONS
// =============================================================================

/**
 * Get skills organized by category
 */
export const getSkillsGrouped = () => {
  const grouped: Record<string, Skill[]> = {};
  
  Object.keys(SKILL_CATEGORIES).forEach(category => {
    grouped[category] = getSkillsByCategory(category as Skill['category']);
  });
  
  return grouped;
};

/**
 * Get top skills (expert level)
 */
export const getTopSkills = () => 
  skills.filter(skill => skill.proficiency === 'expert');

/**
 * Get technical skills only
 */
export const getTechnicalSkills = () => 
  skills.filter(skill => skill.category !== 'soft');

/**
 * Get soft skills only
 */
export const getSoftSkills = () => 
  getSkillsByCategory('soft');

// =============================================================================
// EXPERIENCE FUNCTIONS
// =============================================================================

/**
 * Get current work experience
 */
export const getCurrentExperienceData = () => getCurrentExperience();

/**
 * Get all experiences sorted by date (most recent first)
 */
export const getExperiencesData = () => 
  [...experiences].sort((a, b) => {
    // Sort by start date, most recent first
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

/**
 * Get total years of experience
 */
export const getTotalExperienceYears = () => getTotalExperience();

/**
 * Get unique technologies from all experiences
 */
export const getTechnologiesFromExperience = () => {
  const allTech = experiences.flatMap(exp => exp.technologies);
  return [...new Set(allTech)].sort();
};

// =============================================================================
// EDUCATION & CERTIFICATIONS
// =============================================================================

/**
 * Get education information
 */
export const getEducationData = () => education;

/**
 * Get certifications sorted by date (most recent first)
 */
export const getCertificationsData = () => 
  [...certifications].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

/**
 * Get recent certifications
 */
export const getRecentCertifications = (count: number = 3) =>
  getCertificationsData().slice(0, count);

// =============================================================================
// CORE COMPETENCIES
// =============================================================================

/**
 * Get core competencies/specializations
 */
export const getCoreCompetenciesData = () => coreCompetencies;

// =============================================================================
// STATISTICS & METRICS
// =============================================================================

/**
 * Get portfolio statistics
 */
export const getPortfolioStats = () => ({
  totalProjects: projects.length,
  featuredProjects: getFeaturedProjects().length,
  totalSkills: skills.length,
  totalExperience: getTotalExperience(),
  certifications: certifications.length,
  yearsOfExperience: getTotalExperience(),
  companiesWorked: experiences.length
});

/**
 * Get technology breakdown from projects
 */
export const getTechnologyBreakdown = () => {
  const techCount: Record<string, number> = {};
  
  projects.forEach(project => {
    project.techStack.forEach(tech => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });
  
  return Object.entries(techCount)
    .sort(([, a], [, b]) => b - a)
    .map(([tech, count]) => ({ technology: tech, count }));
};

// =============================================================================
// SEARCH & FILTER FUNCTIONS
// =============================================================================

/**
 * Search projects by keyword
 */
export const searchProjects = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  
  return projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.techStack.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
    project.keyFeatures.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Filter experiences by technology
 */
export const filterExperiencesByTech = (technology: string) => 
  experiences.filter(exp => 
    exp.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

/**
 * Get contact information formatted for display
 */
export const getContactInfo = () => ({
  email: personalInfo.email,
  phone: personalInfo.phone,
  location: personalInfo.location,
  socialLinks: socialLinks,
  resumeUrl: personalInfo.resume
});

/**
 * Generate email subject for contact
 */
export const generateEmailSubject = (context: string = 'portfolio') => 
  `Portfolio Contact: ${context} - ${personalInfo.name}`;

/**
 * Generate mailto link
 */
export const generateMailtoLink = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  return `mailto:${personalInfo.email}${params.toString() ? '?' + params.toString() : ''}`;
};

// =============================================================================
// EXPORT ALL
// =============================================================================

export default {
  // Data access
  getPortfolioData,
  getNavigationItems,
  getSocialLinks,
  getPersonalInfo,
  
  // Projects
  getFeaturedProjectsData,
  getProjectsByCategory,
  getProjectCategories,
  getProjectById,
  getRecentProjectsData,
  
  // Skills
  getSkillsGrouped,
  getTopSkills,
  getTechnicalSkills,
  getSoftSkills,
  
  // Experience
  getCurrentExperienceData,
  getExperiencesData,
  getTotalExperienceYears,
  getTechnologiesFromExperience,
  
  // Education & Certifications
  getEducationData,
  getCertificationsData,
  getRecentCertifications,
  
  // Core competencies
  getCoreCompetenciesData,
  
  // Statistics
  getPortfolioStats,
  getTechnologyBreakdown,
  
  // Search & Filter
  searchProjects,
  filterExperiencesByTech,
  
  // Contact
  getContactInfo,
  generateEmailSubject,
  generateMailtoLink
};
