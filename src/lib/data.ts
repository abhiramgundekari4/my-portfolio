import { Code, BrainCircuit, Database, Briefcase } from 'lucide-react';
import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: 'Abhiram Gundekari',
  title: 'B.Tech CS Student | Adaptable Software Engineer & Data Analyst',

  summary: 'B.Tech Computer Science student (Graduating 2027) with strong foundations in Software Development, Data Analytics, Full-Stack engineering, and Machine Learning. Highly adaptable and ready to enter any of these fields as a fresher. Skilled in Python, JavaScript, SQL, DBMS, OOP, and Data Structures & Algorithms. Experienced in building full-stack MERN web apps, handling relational and non-relational database architectures (MySQL, MongoDB), and constructing predictive machine learning models (TensorFlow, Scikit-Learn). Passionate about applying problem-solving skills to drive software efficiency and extract data insights.',

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
      skills: ['Python', 'JavaScript', 'SQL', 'MongoDB', 'MySQL', 'C', 'HTML', 'CSS'],
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
      liveUrl: '/task-manager',
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
  ],
  journey: [
    {
      year: "2023",
      title: "Discovered CS & Programming",
      desc: "Initiated my B.Tech in Computer Science & Engineering at SR University. Developed a deep fascination for core algorithms, modular architecture, and problem-solving paradigms."
    },
    {
      year: "Early 2024",
      title: "Mastering DSA & OOP",
      desc: "Delved into standard data structures, algorithmic complexities, and clean object-oriented concepts (Encapsulation, Inheritance, Abstraction, Polymorphism) in C and Python."
    },

    {
      year: "Mid 2024",
      title: "Venturing into Full-Stack MERN",
      desc: "Learned database models and Web APIs, mastering MongoDB, Express, React, and Node.js. Built interactive frontends and modular database architectures."
    },
    {
      year: "Late 2024",
      title: "Google & EduSkills Internships",
      desc: "Completed intensive virtual internships with EduSkills Foundation focusing on practical industry-aligned standards and software engineering workflows."
    },
    {
      year: "2025",
      title: "LeetCode Milestones",
      desc: "Solved over 245+ algorithmic problems on arrays, hash maps, trees, and logic optimizations to sharpen logical reasoning."
    },
    {
      year: "Now (2026)",
      title: "Ready for Software Engineering Roles",
      desc: "Actively seeking internship and developer opportunities to apply full-stack architectures, relational/non-relational database design, and machine learning pipelines."
    }
  ]
};

