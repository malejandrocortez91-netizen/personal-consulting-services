import { Code, Cloud, Cpu } from 'lucide-react';

export const services = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'Building end-to-end web solutions with a focus on clean architecture, performance, and user experience.',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Leveraging cloud infrastructure to create scalable, resilient systems and automated deployment pipelines.',
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    description: 'Integrating generative AI and machine learning models to build intelligent features and automate complex tasks.',
  },
];

export const skills = [
  'React / Next.js',
  'Node.js / TypeScript',
  'Python',
  'Google Cloud / Firebase',
  'Docker / Kubernetes',
  'CI/CD Pipelines',
  'SQL / NoSQL Databases',
  'System Architecture',
  'GenAI / LLMs',
  'API Design & Integration',
  'Agile Methodologies',
  'Microservices',
];

export const experience = [
  {
    company: 'Tech Innovators LLC',
    role: 'Senior Software Consultant',
    period: '2019 - Present',
    description: [
      'Architected and led the development of a multi-tenant SaaS platform, serving over 10,000 users.',
      'Implemented a CI/CD pipeline that reduced deployment time by 80% and improved release stability.',
      'Integrated a GenAI-powered chatbot that automated 60% of customer support inquiries.',
    ],
  },
  {
    company: 'Digital Solutions Co.',
    role: 'Full-Stack Developer',
    period: '2016 - 2019',
    description: [
      'Developed and maintained client-facing web applications using React and Node.js.',
      'Migrated legacy infrastructure to a modern, cloud-native stack on Google Cloud Platform.',
      'Worked in an agile team to deliver features on-time, contributing to a 30% YoY growth in user base.',
    ],
  },
];

export const education = [
    {
        institution: 'University of Technology',
        degree: 'Master of Science in Computer Science',
        period: '2014 - 2016',
        description: 'Specialized in distributed systems and artificial intelligence. Published research on scalable AI.',
    },
    {
        institution: 'State College of Engineering',
        degree: 'B.S. in Software Engineering',
        period: '2010 - 2014',
        description: 'Graduated summa cum laude. Led the university coding club and won the national hackathon in 2013.',
    },
];

export const projects = [
    {
        title: 'AI-Powered Analytics Dashboard',
        description: 'Developed a real-time analytics dashboard that uses AI to provide predictive insights and data visualization for business intelligence. Hosted on a serverless architecture.',
        imageId: 'project-1',
        tags: ['Next.js', 'GenAI', 'Google Cloud', 'Data Visualization'],
    },
    {
        title: 'E-Commerce Platform Modernization',
        description: 'Led the migration of a monolithic e-commerce site to a microservices architecture, resulting in a 50% improvement in page load times and increased developer velocity.',
        imageId: 'project-2',
        tags: ['Microservices', 'Node.js', 'React', 'DevOps'],
    },
    {
        title: 'Cloud Cost Optimization',
        description: 'Analyzed and optimized cloud spending for a large enterprise client, identifying underutilized resources and implementing autoscaling policies to reduce monthly costs by 25%.',
        imageId: 'project-3',
        tags: ['Cloud', 'Cost Optimization', 'FinOps'],
    },
];
