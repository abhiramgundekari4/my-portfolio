import { Code, BrainCircuit, Database, Languages, Briefcase, Trophy } from 'lucide-react';
import { Icons } from '@/components/icons';
import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: 'Abhiram Gundekari',
  title: 'Python & SQL Developer | DSA Enthusiast',
  summary: 'I am a motivated student with a strong foundation in programming fundamentals, object-oriented concepts, and database management. I enjoy building logical, data-driven solutions and continuously improving my skills through hands-on projects and learning. I am eager to contribute to real-world applications while growing as a software professional.',
  contact: {
    email: 'abhiramgundekari4@gmail.com',
    phone: '7993979070',
  },
  socials: {
    github: 'https://github.com/2303A51087',
    linkedin: 'https://www.linkedin.com/in/abhiram-gundekari-56a740295/',
    leetcode: 'https://leetcode.com/u/abhirammmm/',
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
      description: 'A dedicated web portal developed using HTML and CSS. This platform streamlines university operations by integrating external academic websites and resources into a single, cohesive interface for better accessibility.',
      tags: ['HTML', 'CSS', 'Web Integration'],
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
        category: "Coding Challenges",
        icon: Icons.leetcode,
        items: [
            {
                title: "LeetCode Proficiency",
                description: "Solved numerous problems across various topics like Arrays, Strings, and Linked Lists to strengthen problem-solving skills.",
                url: "https://leetcode.com/u/abhirammmm/"
            }
        ]
    },
    {
        category: "Internships",
        icon: Briefcase,
        items: [
            {
                title: "Virtual Internship 1 - EduSkills Foundation",
                description: "Successfully completed a corporate-aligned virtual internship program focusing on emerging technologies.",
                url: "/eduskills-internship-1.pdf"
            },
            {
                title: "Virtual Internship 2 - EduSkills Foundation",
                description: "Completed an intensive virtual internship focused on practical technical skill development and industry standards.",
                url: "/eduskills-internship-2.pdf"
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