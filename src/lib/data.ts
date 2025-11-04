import { Briefcase, LineChart, Users } from 'lucide-react';

export const services = [
  {
    icon: Briefcase,
    title: 'Operations Management',
    description: 'Streamlining business operations to enhance efficiency, reduce costs, and improve overall performance.',
  },
  {
    icon: LineChart,
    title: 'Process Improvement',
    description: 'Identifying bottlenecks and implementing agile methodologies to create leaner, more effective workflows.',
  },
  {
    icon: Users,
    title: 'Talent Development',
    description: 'Nurturing talent through strategic training, mentorship, and creating a culture of continuous growth.',
  },
];

export const skills = [
  'Strategic Planning',
  'Project Management',
  'Data Analysis',
  'Agile Methodologies',
  'Change Management',
  'Leadership',
  'Budgeting & Forecasting',
  'Stakeholder Management',
  'Lean Six Sigma',
  'Business Process Re-engineering',
  'Performance Metrics',
  'Risk Management',
];

export const experience = [
  {
    company: 'Innovate Solutions Inc.',
    role: 'Senior Operations Consultant',
    period: '2018 - Present',
    description: [
      'Led a company-wide process overhaul, resulting in a 20% increase in operational efficiency.',
      'Managed cross-functional teams to implement new ERP system, completed 2 months ahead of schedule.',
      'Developed and monitored key performance indicators (KPIs) to track progress and drive improvements.',
    ],
  },
  {
    company: 'Growth Dynamics',
    role: 'Process Improvement Manager',
    period: '2015 - 2018',
    description: [
      'Analyzed and re-engineered core business processes, cutting down production time by 15%.',
      'Facilitated workshops and training sessions on Lean principles for over 200 employees.',
      'Collaborated with IT to automate manual tasks, saving an estimated 500+ man-hours per month.',
    ],
  },
];

export const education = [
    {
        institution: 'State University',
        degree: 'Master of Business Administration (MBA)',
        period: '2013 - 2015',
        description: 'Specialized in Operations Management and Corporate Strategy. Graduated with honors.',
    },
    {
        institution: 'Tech Institute',
        degree: 'B.S. in Industrial Engineering',
        period: '2009 - 2013',
        description: 'Focused on systems analysis and optimization. Captain of the debate team.',
    },
];

export const projects = [
    {
        title: 'ERP System Implementation',
        description: 'Successfully deployed a new Enterprise Resource Planning system across 5 departments, integrating finance, HR, and supply chain modules. The project improved data accuracy and reporting capabilities.',
        imageId: 'project-1',
        tags: ['ERP', 'Project Management', 'Change Management'],
    },
    {
        title: 'Leadership Development Program',
        description: 'Designed and launched a 6-month leadership program for high-potential managers. The initiative boosted employee engagement scores by 25% and reduced management turnover.',
        imageId: 'project-2',
        tags: ['Talent Development', 'HR', 'Training'],
    },
    {
        title: 'Supply Chain Optimization',
        description: 'Restructured the entire supply chain, from procurement to final delivery. This project reduced lead times by 30% and lowered logistics costs by 18% in the first year.',
        imageId: 'project-3',
        tags: ['Logistics', 'Operations', 'Cost Reduction'],
    },
];
