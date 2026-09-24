export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education';
};

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Full-Stack Developer',
    company: 'TechFlow Solutions',
    period: '2023 — Present',
    description: 'Leading development of scalable web applications and mentoring junior developers.',
    achievements: [
      'Architected and shipped a microservices platform serving 50k+ daily users',
      'Reduced page load times by 60% through code splitting and lazy loading',
      'Mentored 4 junior developers and established team coding standards',
    ],
    type: 'work',
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer',
    company: 'DigitalCraft Studios',
    period: '2021 — 2023',
    description: 'Built end-to-end web applications with React, Node.js, and PostgreSQL.',
    achievements: [
      'Developed 15+ client projects with 98% on-time delivery rate',
      'Implemented CI/CD pipelines reducing deployment time by 75%',
      'Created reusable component library adopted across 3 teams',
    ],
    type: 'work',
  },
  {
    id: 'exp-3',
    role: 'Frontend Developer',
    company: 'InnovateLab',
    period: '2020 — 2021',
    description: 'Focused on building responsive, accessible user interfaces with React.',
    achievements: [
      'Built 20+ responsive landing pages with 95+ Lighthouse scores',
      'Integrated REST APIs and GraphQL endpoints for 5+ products',
      'Collaborated with designers to create pixel-perfect UIs',
    ],
    type: 'work',
  },
  {
    id: 'exp-4',
    role: 'B.S. in Computer Science',
    company: 'State University',
    period: '2016 — 2020',
    description: 'Graduated with honors. Focus on web technologies and software engineering.',
    achievements: [
      'GPA: 3.8/4.0 — Dean\'s List 6 semesters',
      'Led university coding club with 200+ members',
      'Won 1st place at regional hackathon (2019)',
    ],
    type: 'education',
  },
];
