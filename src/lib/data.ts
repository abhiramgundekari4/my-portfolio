import { Icons } from '@/components/icons';
import { Code, BrainCircuit, Database, Trophy, Languages } from 'lucide-react';
import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: 'PortfolioPro',
  title: 'Python & SQL Developer | DSA Enthusiast',
  contact: {
    email: 'hello@portfoliopro.dev',
    phone: '+1 (123) 456-7890',
  },
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com/in',
  },
  skills: [
    {
      title: 'Languages & Databases',
      icon: Code,
      skills: ['Python (Proficient)', 'SQL (Proficient)', 'JavaScript/TypeScript', 'PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
      title: 'Frameworks & Libraries',
      icon: BrainCircuit,
      skills: ['Django', 'Flask', 'Pandas, NumPy, Scikit-learn', 'React, Next.js', 'Tailwind CSS', 'Node.js'],
    },
    {
      title: 'Core Concepts & Tools',
      icon: Database,
      skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'REST APIs', 'Git & GitHub', 'Docker'],
    },
  ],
  projects: [
    {
      title: 'Data Analytics Dashboard',
      description: 'A web-based dashboard for visualizing and analyzing sales data, built with Python, Pandas, and Flask.',
      tags: ['Python', 'Flask', 'Pandas', 'SQL', 'Chart.js'],
      image: 'project-1',
      githubUrl: 'https://github.com',
    },
    {
      title: 'E-commerce Platform API',
      description: 'A robust RESTful API for an e-commerce website, featuring product management, user authentication, and order processing.',
      tags: ['Python', 'Django REST Framework', 'PostgreSQL', 'JWT'],
      image: 'project-2',
      githubUrl: 'https://github.com',
    },
    {
      title: 'Algorithm Visualizer',
      description: 'An interactive tool built with React to visualize common sorting and pathfinding algorithms like A* and Dijkstra.',
      tags: ['React', 'TypeScript', 'Data Structures', 'Algorithms'],
      image: 'project-3',
      githubUrl: 'https://github.com',
    },
  ],
  education: {
    institution: 'University of Technology',
    degree: 'Bachelor of Science in Computer Science',
    period: '2021 - 2025',
    details: [
      'Concentration in Software Engineering and Data Science.',
      'Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development.',
      'Dean\'s List for 4 consecutive semesters.'
    ],
  },
  certifications: [
    {
      name: 'Python for Everybody Specialization',
      issuer: 'Coursera',
      date: 'May 2023',
      url: 'https://coursera.org',
    },
    {
      name: 'SQL for Data Science',
      issuer: 'Coursera',
      date: 'July 2023',
      url: 'https://coursera.org',
    },
  ],
  achievements: [
    {
        category: "Achievements",
        icon: Trophy,
        items: [
            {
                title: "CodeChampion 2023 - 1st Place",
                description: "Won first place in a national level competitive programming contest."
            },
            {
                title: "Hack-a-thon 2022 - Best Project",
                description: "Our team won the best project award for developing a solution for urban traffic management."
            }
        ]
    },
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
