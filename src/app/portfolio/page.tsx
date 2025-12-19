import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import ProjectHighlights from '@/components/landing/project-highlights';
import MyWork from '@/components/landing/my-work';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />
      <main className="flex-1 bg-card">
        <div className="py-12 sm:py-16">
          <ProjectHighlights />
          <MyWork />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
