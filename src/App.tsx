/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import ProjectGrid from './components/ProjectGrid';
import JourneyTimeline from './components/JourneyTimeline';
import SkillGalaxy from './components/SkillGalaxy';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ContactAgent from './components/ContactAgent';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import SectionReveal from './components/SectionReveal';
import { motion, useScroll, useSpring } from 'motion/react';

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
    const sections = ['hero', 'journey', 'services', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: '#projects', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#journey', label: 'About' },
    { href: '#skills', label: 'Matrix' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <main className="bg-[#0c0c0c] text-white selection:bg-brand-primary selection:text-black min-h-screen lg:cursor-none transition-colors duration-300 relative overflow-x-hidden">
      <CustomCursor />
      <ThemeToggle />

      {/* Spring Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-cyan-400 to-amber-500 z-[1000] origin-left shadow-[0_0_12px_rgba(59,130,246,0.6)] overflow-hidden"
        style={{ scaleX }}
      />

      {/* Codecuy-Style Floating Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-[900] px-5 sm:px-8 md:px-12 py-5 bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#"
          className="font-editorial font-black text-xl tracking-tight text-white flex items-center gap-1 group"
        >
          <span>ALVIN</span>
          <span className="text-brand-primary text-xs font-mono group-hover:rotate-45 transition-transform duration-300">
            °
          </span>
        </a>

        {/* Center Pill Badge */}
        <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Creative Technologist & UI/UX Architect</span>
        </div>

        {/* Right Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-8 pr-12 md:pr-16">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* 1. Hero Section (Dark Matte Ink) */}
      <Hero />

      {/* 2. Infinite Tech Squircle Marquee */}
      <TechMarquee />

      {/* 3. The Journey & About Me */}
      <SectionReveal>
        <JourneyTimeline />
      </SectionReveal>

      {/* 4. What I Do / Capabilities (Warm Paper Sheet Layer - Stacks with rounded top) */}
      <SectionReveal>
        <ServicesSection />
      </SectionReveal>

      {/* 5. Selected Work / Projects (Dark Ink Sheet Layer - Stacks over Paper) */}
      <SectionReveal>
        <ProjectGrid />
      </SectionReveal>

      {/* 6. Competency Architecture / Logical Matrix */}
      <SectionReveal>
        <SkillGalaxy />
      </SectionReveal>

      {/* 7. Let's Connect / Collaboration (Final Dark Carbon Sheet Layer) */}
      <SectionReveal>
        <ContactSection />
      </SectionReveal>

      {/* Editorial Footer */}
      <footer className="py-20 px-5 sm:px-8 md:px-12 text-center border-t border-white/10 bg-[#08080a]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#141416] flex items-center justify-center mb-6 border border-white/10 shadow-md">
            <span className="font-editorial font-black text-2xl text-brand-primary">A</span>
          </div>
          
          <h3 className="font-editorial text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 px-4 text-white">
            Precision in Logic. Clarity in Design.
          </h3>
          
          <p className="text-white/50 font-mono text-[11px] md:text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose px-4 mb-8">
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
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-[10px] font-mono text-white/40">
            &copy; {new Date().getFullYear()} Alvin Widiantara (Vinxy-ID). Crafted with React 19, Vite, Three.js, Tailwind CSS & Motion.
          </div>
        </div>
      </footer>

      {/* Floating Virtual Collaborator AI Agent */}
      <ContactAgent />
    </main>
  );
}
