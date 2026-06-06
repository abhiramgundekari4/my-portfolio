import type { LucideIcon } from 'lucide-react';

// ==========================================
// Portfolio Types
// ==========================================

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

export type JourneyItem = {
  year: string;
  title: string;
  desc: string;
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
  journey: JourneyItem[];
};

// ==========================================
// AI App Generator Engine Types
// ==========================================

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: any;
}

export interface ColumnConfig {
  key: string;
  header: string;
  type?: 'text' | 'number' | 'badge' | 'date';
}

export interface ComponentProps {
  // Common properties
  title?: string;
  description?: string;
  
  // Grid/Layout properties
  columns?: number;
  gap?: string;
  
  // Card/Stats properties
  value?: string | number;
  metric?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };

  // Form properties
  fields?: FieldConfig[];
  submitButtonText?: string;
  formId?: string;

  // Table properties
  tableId?: string;
  tableColumns?: ColumnConfig[];
  actions?: string[];

  // General styling
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface ComponentConfig {
  type: string;
  id: string;
  props?: ComponentProps;
  children?: ComponentConfig[];
}

export interface AppConfig {
  appId: string;
  appName: string;
  description: string;
  theme?: {
    primaryColor?: string;
    darkMode?: boolean;
  };
  layout: ComponentConfig[];
}
