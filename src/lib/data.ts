import { Code, BrainCircuit, Database, Briefcase } from 'lucide-react';
import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: 'Abhiram Gundekari',
  title: 'B.Tech CS Student | Full-Stack & Machine Learning Developer',
  summary: 'B.Tech Computer Science student (Graduating 2027) with skills in Java, Python, JavaScript, SQL, Machine Learning, Data Structures & Algorithms, DBMS, OOP, and Software Development concepts. Experienced in building full-stack web applications and machine learning projects using MERN stack, REST APIs, TensorFlow, Scikit-Learn, MongoDB, and MySQL. Strong problem-solving abilities demonstrated through 150+ LeetCode problems and seeking internship opportunities to apply technical skills in real-world environments.',
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
      skills: ['Java', 'Python', 'JavaScript', 'SQL', 'MongoDB', 'MySQL', 'C', 'HTML', 'CSS'],
    },
    {
      title: 'Frameworks & Libraries',
      icon: BrainCircuit,
      skills: ['MERN Stack', 'React', 'Node.js', 'Express', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy'],
    },
    {
      title: 'Core Concepts & Tools',
      icon: Database,
      skills: ['Data Structures & Algorithms (150+ Solved)', 'Machine Learning', 'REST APIs', 'DBMS', 'OOP', 'Git & GitHub'],
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
    degree: 'B.Tech in Computer Science & Engineering',
    period: '2023 - 2027',
    details: [
      'Academic Record: 7.4 CGPA / 10',
      'Focus on Software Development, Artificial Intelligence, and Advanced Data Structures.',
      'Relevant Coursework: Data Structures, Algorithms, DBMS, OOPs, Web Development, Machine Learning.'
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
