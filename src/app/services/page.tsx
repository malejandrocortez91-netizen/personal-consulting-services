import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Contact from '@/components/landing/contact';

const servicesData = [
  {
    title: 'High-Tech Process Outsourcing (Near-shore)',
    summary:
      'Scale your operations intelligently by leveraging high-caliber talent in near-shore locations. We specialize in building and managing dedicated teams for technical support, software development, and back-office functions. Through my network of experts, I offer high-volume and specialized per-role recruiting in key LATAM markets including Nicaragua, Mexico, Argentina, and Colombia. This model provides a cost-effective alternative to local hiring without sacrificing quality or time-zone alignment, enabling you to focus on your core business while we handle the operational complexities.',
    deliverables: [
      'Outsourcing Needs Analysis and Strategy',
      'High-Volume & Specialized Recruiting (Nicaragua, Mexico, Argentina, Colombia)',
      'Near-shore Team Recruitment and Onboarding',
      'Infrastructure and IT Setup',
      'Process Documentation and Knowledge Transfer',
      'Ongoing Team Management and Performance Oversight',
      'Quality Assurance and Compliance Frameworks',
    ],
  },
  {
    title: 'Startup Consulting & Scaling Strategy Support',
    summary:
      'Turn your innovative idea into a viable, scalable business. We provide foundational support for startups, helping you refine your business model, develop a robust go-to-market strategy, and build a minimum viable product (MVP). Our guidance covers everything from financial modeling and pitch deck creation to establishing core operational processes that prepare you for rapid growth and investor scrutiny.',
    deliverables: [
      'Business Plan and Financial Model Development',
      'Go-to-Market (GTM) Strategy',
      'Pitch Deck Creation and Investor Readiness Coaching',
      'MVP Definition and Development Roadmap',
      'Lean Operational Process Setup (HR, Finance, Legal)',
      'Early-Stage Growth and Traction Strategy',
    ],
  },
  {
    title: 'Enterprise Transformation & AI-Driven Process Optimization',
    summary:
      "Drive transformative change by embedding intelligence and efficiency into your core operations. We apply rigorous, data-driven methodologies like Six Sigma (DMAIC) to re-engineer workflows, identify systemic weaknesses, and implement AI-powered automation. This holistic approach not only optimizes your investment in consulting and technology but also builds a resilient, self-improving operational framework that guarantees measurable ROI and a sustainable competitive advantage.",
    deliverables: [
      'Six Sigma (DMAIC) Based Process Audit & Value Stream Mapping',
      'AI-Powered Automation & Augmentation Roadmap',
      'Custom AI Tool Integration & Workflow Re-engineering',
      'Consultant & Vendor Performance Management Framework',
      'Governance Models for Risk Mitigation & Issue Resolution',
      'Executive Dashboards for Performance & ROI Tracking',
    ],
  },
  {
    title: 'Technical Project Management',
    summary:
      'Navigate complex technical projects with confidence. We provide expert project management leadership to guide your initiatives from conception to launch. Specializing in Agile and Scrum methodologies, we manage cross-functional teams, oversee timelines, allocate resources, and mitigate risks. Our focus is on clear communication and transparent reporting, ensuring projects are delivered on time, within budget, and to the highest quality standards.',
    deliverables: [
      'End-to-End Project Plan & Roadmap',
      'Agile/Scrum Framework Implementation',
      'Resource Allocation and Budget Management',
      'Stakeholder Communication and Reporting Plan',
      'Risk Management and Mitigation Strategy',
      'Quality Assurance and User Acceptance Testing (UAT) Coordination',
    ],
  },
  {
    title: 'Digital Marketing & Web Presence Management',
    summary:
      'Establish a powerful and professional online presence. We offer end-to-end digital marketing solutions, starting with a custom, high-performance website designed to convert visitors into leads. Beyond the website, we manage your entire digital footprint, including optimizing your Google My Business profile to enhance local search visibility and building a cohesive brand image across all digital channels.',
    deliverables: [
      'Custom Website Design and Development',
      'Google My Business Profile Creation and Optimization',
      'Content Strategy and Creation Plan',
      'Brand Identity and Messaging Guide',
      'Digital Channel Integration (Social Media, Email)',
      'Performance Analytics and Reporting',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />
      <main className="flex-1">
        <section id="services-detailed" className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                Specialized Consulting Services
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Tailored solutions designed to address your most critical business challenges and unlock sustainable growth. Explore our offerings below to see how we can partner to achieve your strategic objectives.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1">
              {servicesData.map((service) => (
                <Card
                  key={service.title}
                  className="hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/50"
                >
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary font-bold">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="pt-2 text-base">
                      {service.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-foreground">
                      Key Deliverables:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent mt-1 shrink-0" />
                          <span className="text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
