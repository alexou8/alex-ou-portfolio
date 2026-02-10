// ============================================================
// Typed Content Objects for Portfolio
// Centralized, structured content with full type safety
// ============================================================

/* =========================
   Types
========================= */
export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  subtitle: string;
  impact: string;
  bullets: string[];
  stack: string[];
  links?: ProjectLink[];
};

export type Experience = {
  role: string;
  company: string;
  time: string;
  location: string;
  bullets: string[];
};

export type AboutMe = {
  name: string;
  location: string;
  tagline: string;
  headline: string;
  rotatingHeadlines: string[]; // For typewriter effect
  summary: string;
};

export type NavItem = {
  id: string;
  label: string;
  emoji: string;
};

export type ContactLinks = {
  github: string;
  linkedin: string;
  email: string;
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

/* =========================
   Content Objects
========================= */
export const aboutMe: AboutMe = {
  name: "Alex Ou",
  location: "Richmond Hill, ON",
  tagline: "Software • Data • AI • Systems",
  headline: "Building reliable software systems that turn data into decisions.",
  rotatingHeadlines: [
    "Alex Ou / Software Developer",
    "Alex Ou / Data Engineer",
    "Alex Ou / AI Enthusiast",
    "Alex Ou / Systems Builder",
  ],
  summary:
    "Senior Computer Science student with experience across software engineering, data workflows, and applied AI. I've supported production IoT systems operating across 1,000+ devices, built backend services with FastAPI and PostgreSQL, and developed data pipelines and ML-driven insights to support real-world decision-making.",
};

export const contactLinks: ContactLinks = {
  github: "https://github.com/alexou8",
  linkedin: "https://www.linkedin.com/in/alexou8/",
  email: "oualex8@gmail.com",
};

export const experiences: Experience[] = [
  {
    role: "IoT Software Developer Intern",
    company: "Guangzhou Mingliang Energy Saving Technology Co., Ltd.",
    time: "Summer 2024",
    location: "Guangdong, China",
    bullets: [
      "Developed and tested IoT smart-lighting software supporting 1,000+ active devices in live environments.",
      "Automated device provisioning using configuration templates, reducing manual setup effort by ~25%.",
      "Built Python monitoring and diagnostic scripts to analyze telemetry and logs across large-scale deployments.",
      "Implemented automated device health checks to improve system reliability and reduce downtime.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "DiaLog",
    subtitle: "AI-Powered Diabetes Health Tracking Platform",
    impact:
      "Automated manual health tracking into a structured workflow with ML-driven pattern detection and insight generation.",
    bullets: [
      "Designed ingestion pipelines to convert raw user inputs into validated, analysis-ready datasets.",
      "Implemented trend and anomaly detection to surface meaningful health insights.",
      "Built backend services to support reporting and future optimization.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Pandas", "Scikit-learn"],
    links: [],
  },
  {
    name: "FareShare",
    subtitle: "Ride-Sharing Backend & Data Platform",
    impact:
      "FastAPI and PostgreSQL backend supporting trip ingestion, analytics, and reporting for future optimization use cases.",
    bullets: [
      "Developed REST APIs for automated trip data ingestion and processing.",
      "Designed scalable relational schemas for maintainable backend workflows.",
      "Generated structured datasets to support analytics and forecasting.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Python", "REST"],
    links: [],
  },
  {
    name: "Client–Server Networking Application",
    subtitle: "Concurrent Session Management System",
    impact:
      "Multithreaded Python server handling concurrent clients with robust lifecycle tracking and validation.",
    bullets: [
      "Built a multithreaded server to manage concurrent connections.",
      "Implemented structured logging and validation for fault-tolerant operation.",
    ],
    stack: ["Python", "TCP", "Multithreading", "Logging"],
    links: [],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "SQL", "Java", "JavaScript", "C", "TypeScript"],
  },
  {
    category: "Backend & Data",
    skills: ["FastAPI", "PostgreSQL", "REST APIs", "Data Pipelines"],
  },
  {
    category: "AI / ML",
    skills: ["Scikit-learn", "Applied ML", "Data Analysis"],
  },
  {
    category: "Tools",
    skills: ["Git", "Linux", "Postman", "Power Automate"],
  },
];

export const navigation: NavItem[] = [
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "work", label: "Work", emoji: "🧩" },
  { id: "projects", label: "Projects", emoji: "🧋" },
  { id: "skills", label: "Skills", emoji: "✨" },
  { id: "contact", label: "Contact", emoji: "✉️" },
];
