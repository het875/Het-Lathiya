/**
 * Central Portfolio Data Store
 * All portfolio information consolidated in one place
 * Last updated: August 2025
 */

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  headline: string
  aboutMe: string
  profileImage?: string
  resume: string
}

export interface SocialLinks {
  linkedin: string
  github: string
  leetcode: string
  hackerrank: string
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'database' | 'tool' | 'concept' | 'soft'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  type: 'on-site' | 'remote' | 'hybrid'
  startDate: string
  endDate: string | 'present'
  duration: string
  industry: string
  achievements: string[]
  technologies: string[]
  companyLogo?: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  techStack: string[]
  keyFeatures: string[]
  role: string[]
  status: 'completed' | 'in-progress' | 'production'
  category: 'web-app' | 'api' | 'scraping' | 'dashboard' | 'management-system'
  githubUrl?: string
  liveUrl?: string
  images?: string[]
  featured: boolean
}

export interface Education {
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate: string
  location: string
  gpa?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  url?: string
}

export interface CoreCompetency {
  name: string
  description: string
  icon?: string
}

export interface Achievement {
  name: string
  description: string
  img: string
  route?: string
}

// =============================================================================
// PORTFOLIO DATA
// =============================================================================

export const personalInfo: PersonalInfo = {
  name: 'Het Lathiya',
  title: 'Python Software Developer',
  email: 'hetglathiya875@gmail.com',
  phone: '+91 8758803220',
  location: 'Surat, Gujarat, India',
  headline:
    'Passionate about building efficient backend solutions with expertise in Python, FastAPI, web scraping and Financial Systems. I solve complex problems with multiple innovative approaches.',
  aboutMe: `Passionate Python developer with expertise in financial systems and innovative problem-solving.

Detail-oriented and motivated Python Developer with a strong interest in backend development and data-driven systems. I specialize in building efficient APIs, automating tasks through web scraping, and developing robust data pipelines using Python frameworks like Django and FastAPI. With solid problem-solving skills in algorithms and database design, I aim to contribute to high-impact projects that require clean architecture, maintainable code, and scalable backend solutions. I'm particularly interested in roles involving real-time data processing, web scraping automation, and RESTful API design in fast-moving tech environments.

My journey began with comprehensive backend python training, where I mastered Python, Django, and MySQL. During this phase, I developed key projects including a rental cloth platform django app.

I then transitioned into professional development, specializing in web backend & financial systems. Over the past year, I've worked extensively with FastAPI, web scraping, and real-time data processing technologies, gaining deep expertise in financial protocols and trading systems.

What sets me apart is my approach to problem-solving: I always explore multiple solution paths for every challenge, ensuring the most efficient and innovative implementation.`,
  resume: '/Het Lathiya cv -SDE.pdf',
}

export const socialLinks: SocialLinks = {
  linkedin: 'https://www.linkedin.com/in/het-lathiya-83a310281/',
  github: 'https://github.com/het875',
  leetcode: 'https://leetcode.com/u/hetlathiya875/',
  hackerrank: 'https://www.hackerrank.com/profile/hetglathiya875',
}

export const coreCompetencies: CoreCompetency[] = [
  {
    name: 'Python Development',
    description: 'Expert in Python programming with focus on backend development and automation',
  },
  {
    name: 'Web Scraping',
    description:
      'Advanced web scraping using multiple libraries and frameworks for data extraction',
  },
  {
    name: 'Real-time Processing',
    description: 'Building systems that handle real-time data processing and live updates',
  },
  {
    name: 'Financial Systems',
    description: 'Specialized in FinTech solutions, trading systems, and financial data processing',
  },
  {
    name: 'Problem Solving',
    description: 'Analytical approach to complex problems with multiple innovative solutions',
  },
  {
    name: 'Desktop Applications',
    description: 'Cross-platform desktop application development using Qt frameworks',
  },
]

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'language', proficiency: 'expert' },
  { name: 'C', category: 'language', proficiency: 'intermediate' },
  { name: 'C++', category: 'language', proficiency: 'intermediate' },
  { name: 'SQL', category: 'language', proficiency: 'advanced' },

  // Backend Frameworks
  { name: 'Django', category: 'framework', proficiency: 'expert' },
  { name: 'Django REST Framework', category: 'framework', proficiency: 'expert' },
  { name: 'FastAPI', category: 'framework', proficiency: 'expert' },
  { name: 'Socket.io', category: 'framework', proficiency: 'advanced' },
  { name: 'Streamlit', category: 'framework', proficiency: 'advanced' },

  // Desktop Development
  { name: 'PyQt5', category: 'framework', proficiency: 'advanced' },
  { name: 'PySide2', category: 'framework', proficiency: 'advanced' },
  { name: 'Qt Designer', category: 'tool', proficiency: 'advanced' },

  // Data & Analysis
  { name: 'Pandas', category: 'framework', proficiency: 'expert' },
  { name: 'NumPy', category: 'framework', proficiency: 'advanced' },
  { name: 'OpenCV', category: 'framework', proficiency: 'intermediate' },
  { name: 'Matplotlib', category: 'framework', proficiency: 'advanced' },
  { name: 'OCR', category: 'concept', proficiency: 'intermediate' },

  // Scraping Libraries
  { name: 'Requests', category: 'framework', proficiency: 'expert' },
  { name: 'BeautifulSoup', category: 'framework', proficiency: 'expert' },
  { name: 'Selenium', category: 'framework', proficiency: 'expert' },
  { name: 'Scrapy', category: 'framework', proficiency: 'expert' },
  { name: 'html5lib', category: 'framework', proficiency: 'advanced' },

  // Databases
  { name: 'MySQL', category: 'database', proficiency: 'expert' },
  { name: 'PostgreSQL', category: 'database', proficiency: 'expert' },
  { name: 'SQLite', category: 'database', proficiency: 'expert' },
  { name: 'SQL Server', category: 'database', proficiency: 'advanced' },
  { name: 'MongoDB', category: 'database', proficiency: 'advanced' },

  // Tools
  { name: 'Git', category: 'tool', proficiency: 'expert' },
  { name: 'GitHub', category: 'tool', proficiency: 'expert' },
  { name: 'Jira', category: 'tool', proficiency: 'advanced' },
  { name: 'Postman', category: 'tool', proficiency: 'expert' },
  { name: 'VS Code', category: 'tool', proficiency: 'expert' },
  { name: 'PyCharm', category: 'tool', proficiency: 'expert' },
  { name: 'SSMS', category: 'tool', proficiency: 'advanced' },
  { name: 'Cursor', category: 'tool', proficiency: 'advanced' },
  { name: 'Adobe XD', category: 'tool', proficiency: 'intermediate' },

  // Concepts
  { name: 'ORM', category: 'concept', proficiency: 'expert' },
  { name: 'Microservices', category: 'concept', proficiency: 'advanced' },
  { name: 'API Integration', category: 'concept', proficiency: 'expert' },
  { name: 'Real-time Processing', category: 'concept', proficiency: 'expert' },
  { name: 'REST APIs', category: 'concept', proficiency: 'expert' },
  { name: 'Web Scraping', category: 'concept', proficiency: 'expert' },
  { name: 'Scripting', category: 'concept', proficiency: 'expert' },

  // Soft Skills
  { name: 'Team Leadership', category: 'soft', proficiency: 'advanced' },
  { name: 'Critical Thinking', category: 'soft', proficiency: 'expert' },
  { name: 'Agile Communication', category: 'soft', proficiency: 'advanced' },
  { name: 'Technical Documentation', category: 'soft', proficiency: 'expert' },
  { name: 'Efficient Debugging', category: 'soft', proficiency: 'expert' },
  { name: 'Teamwork', category: 'soft', proficiency: 'expert' },
  { name: 'Communication', category: 'soft', proficiency: 'advanced' },
  { name: 'Problem Solving', category: 'soft', proficiency: 'expert' },
]

export const experiences: Experience[] = [
  {
    id: 'anv-tech-2025',
    company: 'ANV Tech',
    position: 'Python Software Developer',
    location: 'Surat, Gujarat',
    type: 'on-site',
    startDate: '2025-03',
    endDate: 'present',
    duration: '5+ months',
    industry: 'FinTech',
    achievements: [
      'Architected FinTech APIs using FastAPI and Django, optimized for speed and modularity',
      'Scraped IPO data from NSE/BSE using requests, BeautifulSoup, brotli, and gzip decompression',
      'Developed portfolio analytics and fraud detection using microservices architecture',
      'Integrated real-time webhook systems for payment updates and stock alerts',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Django',
      'BeautifulSoup',
      'Microservices',
      'Webhooks',
      'NSE/BSE APIs',
    ],
  },
  {
    id: 'daos-infotech-2024',
    company: 'Daos Infotech',
    position: 'Python Software Developer',
    location: 'Remote',
    type: 'remote',
    startDate: '2024-07',
    endDate: '2025-03',
    duration: '9 months',
    industry: 'Service Management',
    achievements: [
      'Led the Water Purifier Filter Tracking project with barcode and map-based routing',
      'Scraped purifier usage data to automate service scheduling by location zone',
      'Built WhatsApp API integration for service alerts and feedback collection',
      'Used Django, PostgreSQL, Kafka, and Docker for end-to-end development',
    ],
    technologies: [
      'Django',
      'PostgreSQL',
      'Kafka',
      'Docker',
      'WhatsApp API',
      'Barcode Systems',
      'Maps Integration',
    ],
  },
  {
    id: 'sixty13-full-2024',
    company: 'Sixty13 Web Solutions',
    position: 'Python Software Developer',
    location: 'Remote',
    type: 'remote',
    startDate: '2024-02',
    endDate: '2024-06',
    duration: '6 months',
    industry: 'Hospitality & Web Solutions',
    achievements: [
      'Built a hotel management suite including booking, check-in, and staff modules',
      'Scraped pricing data from travel sites and competitors using concurrent requests',
      'Implemented secure auth using JWT and RBAC',
    ],
    technologies: ['Python', 'Django', 'JWT', 'RBAC', 'Web Scraping', 'Concurrent Programming'],
  },
  {
    id: 'sixty13-intern-2023',
    company: 'Sixty13 Web Solutions',
    position: 'Python Software Developer - Intern',
    location: 'Surat, Gujarat',
    type: 'on-site',
    startDate: '2023-08',
    endDate: '2024-01',
    duration: '6 months',
    industry: 'Web Solutions',
    achievements: [
      'Developed REST APIs for e-commerce and booking systems',
      'Managed database logic for hybrid SQL backends: PostgreSQL + SQL Server + SQLite',
      'Worked with teams for frontend-backend integration and endpoint optimization',
    ],
    technologies: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'SQL Server', 'SQLite'],
  },
  {
    id: 'skillqode-2023',
    company: 'SkillQode Institute',
    position: 'Python Developer - Trainee',
    location: 'Surat, Gujarat',
    type: 'on-site',
    startDate: '2023-08',
    endDate: '2024-01',
    duration: '6 months',
    industry: 'Education & Training',
    achievements: [
      'Developed a rental platform backend in Django with SQLite and admin dashboard',
      'Created scraping tools for catalog data enrichment and price comparison',
      'Practiced Git workflows, code reviews, and Agile task planning using Jira',
    ],
    technologies: ['Django', 'SQLite', 'Git', 'Jira', 'Web Scraping', 'Admin Dashboard'],
  },
]

export const projects: Project[] = [
  {
    id: 'anv-fincap-bse-market-feed',
    title: 'ANV Fincap – Real-Time BSE Market Feed System',
    description:
      'A real-time financial data processing system connecting to the Bombay Stock Exchange (BSE) using official WebSocket feeds.',
    longDescription:
      'A high-performance real-time financial data processing system that connects to the Bombay Stock Exchange (BSE) using official WebSocket feeds. The system retrieves raw binary tokens, decodes them into integers, and extracts key market insights such as market picture, market depth, and OHLC data. Built with FastAPI and WebSocket.IO for high-speed asynchronous data streaming and efficient API communication.',
    techStack: ['FastAPI', 'WebSocket.IO', 'Python', 'AsyncIO', 'CSV'],
    keyFeatures: [
      'Real-time BSE WebSocket integration',
      'Binary token decoding and processing',
      'Market picture and depth extraction',
      'OHLC data processing and storage',
      'High-speed asynchronous data streaming',
      'CSV-based data storage for analytics',
    ],
    role: [
      'Architected real-time data processing pipeline',
      'Implemented WebSocket integration with BSE feeds',
      'Developed binary data decoding algorithms',
      'Built asynchronous data streaming with FastAPI',
    ],
    status: 'production',
    category: 'api',
    featured: true,
  },
  {
    id: 'cradbuzzpay-payment-system',
    title: 'CradBuzsPay Payment System',
    description:
      'A FinTech-based ERP payment platform enabling credit card bill payments, utility management, and mobile recharges.',
    longDescription:
      'A comprehensive FinTech-based ERP payment platform built during freelancing that enables credit card bill payments, utility bill management, mobile recharges, and fund withdrawals. Features a multi-role user management system with controlled access to specific modules. The system includes secure authentication (JWT) and role-based access control (RBAC), allowing efficient handling of financial workflows and user activities.',
    techStack: ['Django', 'REST API', 'Python', 'JWT', 'RBAC', 'ERP'],
    keyFeatures: [
      'Credit card bill payment processing',
      'Utility bill management system',
      'Mobile recharge integration',
      'Fund withdrawal capabilities',
      'Multi-role user management',
      'JWT-based secure authentication',
      'Role-based access control (RBAC)',
      'Financial workflow automation',
    ],
    role: [
      'Designed and implemented ERP payment platform',
      'Developed multi-role user management system',
      'Integrated secure JWT authentication',
      'Built role-based access control modules',
      'Implemented RESTful API architecture',
    ],
    status: 'completed',
    category: 'management-system',
    featured: true,
  },
  {
    id: 'water-purifier-management',
    title: 'Water Purifier Service Management System',
    description:
      'A full-fledged system for managing water purifier services across multiple organizations with QR-based tracking.',
    longDescription:
      'A comprehensive service management platform that handles water purifier maintenance across multiple organizations. Features include service request tracking, QR code validation, customer feedback systems, and administrative dashboards.',
    techStack: ['Django', 'React', 'MySQL', 'REST APIs', 'QR Code'],
    keyFeatures: [
      'Service request tracking and assignment',
      'QR code scanning for validation',
      'Organization registration & approval system',
      'Customer feedback and rating mechanism',
      'Admin and user management dashboards',
    ],
    role: [
      'Designed and implemented backend logic using Django',
      'Developed RESTful APIs for frontend-backend communication',
      'Implemented QR code-based tracking and service flow',
    ],
    status: 'completed',
    category: 'management-system',
    featured: true,
  },
  {
    id: 'rental-clothes-platform',
    title: 'Rental Clothes Booking Platform',
    description:
      'A platform for managing rental dress bookings, primarily targeted at occasion wear.',
    longDescription:
      'An internship project focused on creating a rental dress booking system with inventory management and user authentication.',
    techStack: ['Django', 'SQLite'],
    keyFeatures: [
      'Admin dashboard for inventory control',
      'Dress listing with booking system',
      'User registration and authentication',
    ],
    role: [
      'Built models and CRUD operations',
      'Created user forms and login system',
      'Developed admin controls for dress inventory',
    ],
    status: 'completed',
    category: 'web-app',
    featured: false,
  },
  {
    id: 'streamlit-dashboard',
    title: 'Streamlit Data Dashboard',
    description:
      'An interactive dashboard for analyzing and visualizing real-time data with filtering and charting capabilities.',
    longDescription:
      'A dynamic data visualization platform built with Streamlit for real-time analytics and interactive charting.',
    techStack: ['Streamlit', 'Pandas', 'Plotly'],
    keyFeatures: [
      'Real-time dynamic data charts',
      'Filters for granular data analysis',
      'Exportable graph modules',
    ],
    role: [
      'Developed chart rendering logic',
      'Integrated data processing using Pandas',
      'Designed UI elements with Streamlit components',
    ],
    status: 'completed',
    category: 'dashboard',
    featured: false,
  },
  {
    id: 'hotel-management-system',
    title: 'Hotel Management System',
    description:
      'An end-to-end hotel management platform covering booking, customer service, HR, and reporting.',
    longDescription:
      'A comprehensive hotel management solution that handles all aspects of hotel operations from booking to HR management.',
    techStack: ['Django', 'React', 'MySQL', 'REST APIs'],
    keyFeatures: [
      'Room booking and cancellation system',
      'Services & amenities management',
      'Customer feedback with email notifications',
      'HRMS (employee onboarding, attendance, and leaves)',
      'Admin portal with authentication and reporting tools',
    ],
    role: [
      'Built backend APIs for all core modules',
      'Integrated frontend with REST APIs using React',
      'Developed user and admin authentication systems',
    ],
    status: 'completed',
    category: 'management-system',
    featured: true,
  },
  {
    id: 'ipo-data-scraper',
    title: 'IPO Data Scraper & Analysis System',
    description:
      'A production-grade system to scrape, manage, and analyze IPO data from 2019–2025.',
    longDescription:
      'A robust data extraction and analysis system for IPO data with comprehensive error handling and data validation.',
    techStack: ['Python', 'SQLite', 'SQL Server', 'Requests', 'BeautifulSoup'],
    keyFeatures: [
      'Extracts IPO summary and detailed data from investorgain.com',
      'Upserts data into SQLite and SQL Server',
      'Deduplication using constraints and validations',
      'Real-time logging, error handling, retry mechanism',
      'Clean data pipeline and backup strategies',
    ],
    role: [
      'Developed robust scraping pipelines',
      'Designed database schema for clean data flow',
      'Implemented error handling, deduplication & logging',
    ],
    status: 'production',
    category: 'scraping',
    featured: true,
  },
  {
    id: 'nse-data-scraper',
    title: 'NSE Data Scraper & API System',
    description:
      'A scalable web scraping and data serving system for real-time and historical stock market data from NSE India.',
    longDescription:
      'A comprehensive stock market data platform with real-time scraping capabilities and RESTful API services.',
    techStack: ['FastAPI', 'MongoDB', 'Scrapy', 'Selenium', 'BeautifulSoup', 'Requests', 'Docker'],
    keyFeatures: [
      'Scrapes top gainers, losers, new listings, and indices',
      'Async FastAPI-based RESTful backend',
      'MongoDB for real-time data storage',
      'Swagger/OpenAPI documentation',
      'Cron jobs for automated scraping',
      'Token-based authentication system',
    ],
    role: [
      'Built scraping pipelines using Scrapy, Selenium & Requests',
      'Created FastAPI-based API services with MongoDB integration',
      'Setup Docker environment for deployment and cron scheduling',
    ],
    status: 'production',
    category: 'api',
    featured: true,
  },
]

export const education: Education[] = [
  {
    institution: 'Veer Narmad South Gujarat University',
    degree: "Bachelor's Degree",
    field: 'Computer Science', // Inferred from context
    startDate: '2020-03',
    endDate: '2023-04',
    location: 'Surat, Gujarat',
  },
]

export const certifications: Certification[] = [
  {
    name: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: '2024-03',
  },
  {
    name: 'Python (Basic)',
    issuer: 'HackerRank',
    date: '2024-04',
  },
  {
    name: 'Git & GitHub Bootcamp',
    issuer: 'LetsUpgrade',
    date: '2024-04',
  },
  {
    name: 'Postman API Fundamentals',
    issuer: 'LetsUpgrade',
    date: '2024-04',
  },
  {
    name: 'Python Course for Beginners',
    issuer: 'Scaler',
    date: '2024-04',
  },
  {
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: '2024-10',
  },
]

export const achievements: Achievement[] = [
  {
    name: '365 Days Badge',
    description: 'Consistency is key - Solved problems for 365 consecutive days',
    img: '/leet-code/365-days.gif',
    route: 'https://leetcode.com/u/hetlathiya875/',
  },
  {
    name: '200 Days Badge 2024',
    description: 'Dedicated problem solver - 200 days streak in 2024',
    img: '/leet-code/200-days-24.gif',
    route: 'https://leetcode.com/u/hetlathiya875/',
  },
  {
    name: '100 Days Badge 2024',
    description: 'Building momentum - 100 days of continuous learning',
    img: '/leet-code/100-days-24.gif',
    route: 'https://leetcode.com/u/hetlathiya875/',
  },
  {
    name: '100 Days Badge 2025',
    description: 'Strong start to 2025 - 100 days streak',
    img: '/leet-code/100-days-25.gif',
    route: 'https://leetcode.com/u/hetlathiya875/',
  },
  {
    name: '50 Days Badge 2024',
    description: 'First milestone - 50 days of problem solving',
    img: '/leet-code/50-days-24.gif',
    route: 'https://leetcode.com/u/hetlathiya875/',
  },
  {
    name: '50 Days Badge 2025',
    description: 'Continuing the journey - 50 days streak in 2025',
    img: '/leet-code/50-days-25.gif',
    route: 'https://leetcode.com/u/hetlathiya875/',
  },
]

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const getFeaturedProjects = () => projects.filter(project => project.featured)

export const getSkillsByCategory = (category: Skill['category']) =>
  skills.filter(skill => skill.category === category)

export const getCurrentExperience = () => experiences.find(exp => exp.endDate === 'present')

export const getTotalExperience = () => {
  // Calculate total years of experience
  const startYear = 2023 // First professional role
  const currentYear = new Date().getFullYear()
  return currentYear - startYear + 1
}

export const getRecentProjects = (count: number = 3) => projects.slice(0, count)

// Export all data as default
export default {
  personalInfo,
  socialLinks,
  coreCompetencies,
  skills,
  experiences,
  projects,
  education,
  certifications,
  achievements,
  // Utility functions
  getFeaturedProjects,
  getSkillsByCategory,
  getCurrentExperience,
  getTotalExperience,
  getRecentProjects,
}
