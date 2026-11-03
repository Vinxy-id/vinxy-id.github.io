/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import JourneyTimeline from './components/JourneyTimeline';
import SkillGalaxy from './components/SkillGalaxy';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ContactAgent from './components/ContactAgent';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import SectionReveal from './components/SectionReveal';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['hero', 'projects', 'journey', 'skills', 'services', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'projects', label: 'Playground' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Matrix' },
    { id: 'services', label: 'Capabilities' },
    { id: 'contact', label: 'Connect' },
  ];

  return (
    <main className="bg-theme-bg text-theme-text selection:bg-brand-primary selection:text-black min-h-screen lg:cursor-none transition-colors duration-300 relative">
      <CustomCursor />
      <ThemeToggle />

      {/* Spring Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-cyan-400 to-brand-secondary z-[1000] origin-left shadow-[0_0_12px_rgba(59,130,246,0.6)] overflow-hidden"
        style={{ scaleX }}
      >
        <motion.div
          animate={{
            x: ['-110%', '210%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.5,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 skew-x-[30deg]"
        />
      </motion.div>

      {/* Floating Vertical Navigation Rail (Desktop) */}
      <nav className="fixed top-8 left-4 z-[1000] hidden lg:block">
        <div className="flex flex-col gap-5 items-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-black font-display font-black text-xl cursor-pointer shadow-lg shadow-brand-primary/25"
            title="Back to Top"
          >
            A
          </motion.div>
          <div className="h-16 w-px bg-white/10 mx-auto" />
          <div className="flex flex-col gap-24 items-center pt-8 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-0 w-[1px] bg-white/5" />

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="relative flex items-center justify-center h-7">
                  <motion.div
                    className="rotate-90 origin-center whitespace-nowrap"
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      className={`font-mono text-[10px] uppercase tracking-[0.35em] transition-all duration-300 block ${
                        isActive
                          ? 'text-brand-primary font-bold'
                          : 'text-theme-muted hover:text-theme-text'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-dot"
                        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_12px_#3B82F6] z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Sections with Spring Reveal */}
      <Hero />

      <SectionReveal>
        <ProjectGrid />
      </SectionReveal>

      <SectionReveal>
        <JourneyTimeline />
      </SectionReveal>

      <SectionReveal>
        <SkillGalaxy />
      </SectionReveal>

      <SectionReveal>
        <ServicesSection />
      </SectionReveal>

      <SectionReveal>
        <ContactSection />
      </SectionReveal>

      {/* Editorial Footer */}
      <footer className="py-20 px-4 text-center border-t border-theme-border/60 bg-theme-bg/60">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-theme-surface flex items-center justify-center mb-6 border border-theme-border shadow-md">
            <span className="font-display font-black text-2xl text-brand-primary">A</span>
          </div>
          
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 px-4 text-theme-text">
            Precision in Logic. Clarity in Design.
          </h3>
          
          <p className="text-theme-muted font-mono text-[11px] md:text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose px-4 mb-8">
            Designed & Engineered by Alvin Widiantara<br />
            Creative Visual Competition II Winner &bull; Informatics Engineering
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 px-4 mb-8">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alvin-widiantara-041067360/' },
              { name: 'GitHub', url: 'https://github.com/Vinxy-id' },
              { name: 'Instagram', url: 'https://www.instagram.com/vinxy.tsx/' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@vinxy070' },
              { name: 'Email', url: 'mailto:alvinwdntr@gmail.com' },
              { name: 'CV Document', url: 'https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-theme-muted hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-[10px] font-mono text-theme-muted/60">
            &copy; {new Date().getFullYear()} Alvin Widiantara (Vinxy-ID). Crafted with React 19, Vite, Three.js, Tailwind CSS & Motion.
          </div>
        </div>
      </footer>

      {/* Floating Virtual Collaborator AI Agent */}
      <ContactAgent />
    </main>
  );
}
