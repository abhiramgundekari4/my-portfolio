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
    icon: any; // Using any for flexible icon types
    items: {
        title: string;
        description: string;
        url?: string;
    }[];
};

export type PortfolioData = {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
  };
  socials: {
    github: string;
    linkedin: string;
    leetcode?: string;
  };
  skills: {
    title: string;
    icon: any;
    skills: string[];
  }[];
  projects: Project[];
  education: AcademicRecord;
  certifications: Certification[];
  achievements: Achievement[];
};
