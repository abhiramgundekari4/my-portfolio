import type { LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export type AcademicRecord = {
  degree: string;
  institution: string;
  period: string;
  details: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url: string;
};

export type Achievement = {
    category: string;
    icon: LucideIcon;
    items: {
        title: string;
        description: string;
    }[];
};

export type PortfolioData = {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
  };
  socials: {
    github: string;
    linkedin: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  education: AcademicRecord;
  certifications: Certification[];
  achievements: Achievement[];
};
