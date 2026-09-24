import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';
import { FloatingContact } from '@/components/sections/floating-contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <FloatingContact />
    </main>
  );
}
