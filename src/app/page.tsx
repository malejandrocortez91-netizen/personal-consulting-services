import Chatbot from '@/components/chatbot';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ProjectHighlights from '@/components/landing/project-highlights';
import ResumeTimeline from '@/components/landing/resume-timeline';
import Services from '@/components/landing/services';
import Skills from '@/components/landing/skills';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Skills />
        <ResumeTimeline />
        <ProjectHighlights />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
