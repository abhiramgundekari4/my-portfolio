import { Icons } from '@/components/icons';
import { Code, BrainCircuit, Database, Trophy, Languages } from 'lucide-react';
import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: 'Abhiram Gundekari',
  title: 'Python & SQL Developer | DSA Enthusiast',
  contact: {
    email: 'abhiramgundekari4@gmail.com',
    phone: '7993979070',
  },
  socials: {
    github: 'https://github.com/2303A51087',
    linkedin: 'https://www.linkedin.com/in/abhiram-gundekari-56a740295/',
  },
  skills: [
    {
      title: 'Languages & Databases',
      icon: Code,
      skills: ['Python (Proficient)', 'SQL (Proficient)', 'C', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Frameworks & Libraries',
      icon: BrainCircuit,
      skills: ['Pandas', 'NumPy', 'Node.js', 'React'],
    },
    {
      title: 'Core Concepts & Tools',
      icon: Database,
      skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'REST APIs', 'Git & GitHub', 'Docker'],
    },
  ],
  projects: [
    {
      title: 'Student Services Portal',
      description: 'A comprehensive web application designed to streamline university services, allowing students to manage courses, view grades, and access campus resources efficiently. Implemented robust data management using SQL.',
      tags: ['Python', 'Django', 'PostgreSQL', 'SQL', 'Bootstrap'],
      image: 'project-student-portal',
      githubUrl: 'https://github.com/2303A51087',
    },
  ],
  education: {
    institution: 'SR University',
    degree: 'Bachelor of Science in Computer Science',
    period: '2023 - 2027',
    details: [
      'Concentration in Software Engineering and Data Science.',
      'Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development.'
    ],
  },
  certifications: [
    {
      name: 'Complete UNIX & Linux OS Fundamentals Training',
      issuer: 'Infosys',
      date: 'September 2024',
      url: '/unix-linux-certificate.pdf', 
    },
    {
      name: 'Matrix Algebra for Engineers',
      issuer: 'Coursera',
      date: 'April 2024',
      url: 'https://coursera.org/verify/4AMMD32RY7U7',
    }
  ],
  achievements: [
    {
        category: "Languages",
        icon: Languages,
        items: [
            {
                title: "English",
                description: "Professional Working Proficiency"
            },
            {
                title: "Telugu",
                description: "Native or Bilingual Proficiency"
            },
            {
                title: "Hindi",
                description: "Professional Working Proficiency"
            }
        ]
    }
  ]
};
