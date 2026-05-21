import { Code, BrainCircuit, Database, Briefcase } from 'lucide-react';
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
    github: 'https://github.com/abhiramgundekari4',
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
      skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Git & GitHub'],
    },
  ],
  projects: [
    {
      title: 'AI RAG Chatbot',
      description: 'An intelligent Retrieval-Augmented Generation (RAG) chatbot that answers questions from uploaded PDF documents using Generative AI and vector search. Built with semantic search, context-aware AI responses, and a fast, real-time interactive user interface.',
      tags: ['Python', 'Streamlit', 'LangChain', 'FAISS', 'HuggingFace', 'Groq API'],
      image: 'project-rag-chatbot',
      githubUrl: 'https://github.com/abhiramgundekari4',
      liveUrl: 'https://lnkd.in/gUJ9-PPf',
    },
    {
      title: 'Smart Task Manager',
      description: 'A full-stack student productivity application built using the MERN (MongoDB, Express, React, Node) stack. It streamlines academic planning by allowing users to create, prioritize, and track tasks. Features real-time deadline monitoring, priority organization, and progress analytics on an interactive dashboard.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'MERN Stack'],
      image: 'project-task-manager',
      githubUrl: 'https://github.com/abhiramgundekari4',
    },
    {
      title: 'Student Services Portal',
      description: 'A dedicated web portal developed using HTML and CSS. This platform streamlines university operations by integrating external academic websites and resources into a single, cohesive interface for better accessibility.',
      tags: ['HTML', 'CSS', 'Web Integration'],
      image: 'project-student-portal',
      githubUrl: 'https://github.com/abhiramgundekari4',
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
    },
    {
      name: 'Data Analyst Certificate',
      issuer: 'Udemy',
      date: 'March 2026',
      url: '/data-analyst-certificate.pdf',
    }
  ],
  achievements: [
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
    }
  ]
};
