// Type definitions for the portfolio

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  title: string;
  titles: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Stat {
  value: number;
  label: string;
  description?: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface About {
  greeting: string;
  intro: string;
  description: string;
  paragraphs: string[];
  highlights: Highlight[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  dateRange: string;
  status: 'completed' | 'current';
  summary: string;
  achievements: string[];
  techStack: string[];
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'ai-ml' | 'web' | 'data' | 'mobile';
  year: string;
  description: string;
  highlights: { icon: string; text: string }[];
  techStack: string[];
  github: string;
  featured: boolean;
  icon: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Proficiency {
  icon: string;
  title: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  dateRange: string;
  status: 'completed' | 'current';
  specialization?: string;
  availability?: string;
  coursework: { icon: string; name: string }[];
}

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  providerIcon: string;
  description: string;
  skills: string[];
  credentialUrl: string;
  icon: string;
}

export interface CertificateGroup {
  id: string;
  camp: string;
  title: string;
  certificates: Certificate[];
}

export interface Conference {
  title: string;
  conference: string;
  year: string;
  description: string;
  highlights: { icon: string; text: string }[];
  techStack: string[];
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'location' | 'linkedin';
  icon: string;
  label: string;
  value: string;
  displayValue?: string;
  href?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// Zoom animation configuration types
export interface ZoomPoint {
  scrollStart: number;
  scrollEnd: number;
  scaleFrom: number;
  scaleTo: number;
  originX: number;
  originY: number;
  contentRevealAt: number;
}

export interface SectionConfig {
  id: string;
  height: string;
  background: string;
  zoomPoints: ZoomPoint[];
}
