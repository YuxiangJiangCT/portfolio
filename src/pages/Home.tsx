import Hero from '../components/sections/Hero';
import SelectedWork from '../components/sections/SelectedWork';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Awards from '../components/sections/Awards';
import Skills from '../components/sections/Skills';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import { useFadeIn } from '../hooks/useFadeIn';

function FadeSection({ children }: { children: React.ReactNode }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-section">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FadeSection>
        <SelectedWork />
      </FadeSection>
      <FadeSection>
        <Experience />
      </FadeSection>
      <FadeSection>
        <Education />
      </FadeSection>
      <FadeSection>
        <Awards />
      </FadeSection>
      <FadeSection>
        <Skills />
      </FadeSection>
      <FadeSection>
        <About />
      </FadeSection>
      <FadeSection>
        <Contact />
      </FadeSection>
    </>
  );
}
