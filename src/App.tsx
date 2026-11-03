/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import SkillGalaxy from './components/SkillGalaxy';
import ContactSection from './components/ContactSection';
import ContactAgent from './components/ContactAgent';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['hero', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'projects', label: 'Playground' },
    { id: 'skills', label: 'Competence' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <main className="bg-theme-bg text-theme-text selection:bg-brand-primary selection:text-black min-h-screen lg:cursor-none transition-colors duration-300">
      <CustomCursor />
      <ThemeToggle />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[1000] origin-left shadow-[0_0_10px_rgba(59,130,246,0.5)] overflow-hidden"
        style={{ scaleX }}
      >
        {/* Animated wave effect */}
        <motion.div 
          animate={{ 
            x: ['-110%', '210%'],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 0.5
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 skew-x-[30deg]"
        />
      </motion.div>
      
      {/* Navigation Rail (Floating - Desktop) */}
      <nav className="fixed top-8 left-4 z-[1000] hidden lg:block">
        <div className="flex flex-col gap-6 items-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-black font-display font-black text-xl cursor-pointer shadow-lg shadow-brand-primary/25"
          >
            A
          </motion.div>
          <div className="h-20 w-px bg-white/10 mx-auto" />
          <div className="flex flex-col gap-28 items-center pt-12 relative">
             {/* Shared sliding indicator */}
             <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-0 w-[1px] bg-white/5" />
             
             {navItems.map((item) => {
               const isActive = activeSection === item.id;
               return (
                 <div key={item.id} className="relative flex items-center justify-center h-8">
                   <motion.div 
                     className="rotate-90 origin-center whitespace-nowrap"
                     animate={{ 
                       scale: isActive ? 1.1 : 1,
                       x: 0
                     }}
                   >
                     <a 
                       href={`#${item.id}`} 
                       className={`font-mono text-[10px] uppercase tracking-[0.4em] transition-all duration-500 block ${isActive ? 'text-brand-primary font-bold' : 'text-theme-muted hover:text-theme-text'}`}
                     >
                       {item.label}
                     </a>
                   </motion.div>
                   
                   {/* Active Indicator dot on the line */}
                   <AnimatePresence>
                     {isActive && (
                       <motion.div
                         layoutId="nav-dot"
                         className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_15px_#3B82F6] z-20"
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       />
                     )}
                   </AnimatePresence>
                 </div>
               );
             })}
          </div>
        </div>
      </nav>

      <Hero />
      
      <div className="relative">
        {/* Transitional element */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-theme-bg to-transparent z-10" />
        
        <ProjectGrid />
        <SkillGalaxy />
        <ContactSection />
        
        <footer className="py-20 px-4 text-center border-t border-theme-border">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
             <div className="w-16 h-16 rounded-2xl bg-theme-bg/5 flex items-center justify-center mb-8 border border-theme-border shadow-md">
                <span className="font-display font-black text-2xl text-brand-primary">A</span>
             </div>
             <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 italic px-4">Pushing boundaries, one pixel at a time.</h3>
             <p className="text-theme-muted font-mono text-[10px] md:text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose px-4">
               Designed & Engineered by Alvin Widiantara<br className="hidden md:block" />
               Informatics @ Creative Visual Competition II Winner<br className="hidden md:block" />
               Built with React, Vite & Motion
             </p>
             <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 px-4">
               {[
                 { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alvin-widiantara-041067360/' },
                 { name: 'GitHub', url: 'https://github.com/Vinxy-id' },
                 { name: 'Instagram', url: 'https://www.instagram.com/vinxy.tsx/' },
                 { name: 'TikTok', url: 'https://www.tiktok.com/@vinxy070' },
                 { name: 'Email', url: 'mailto:alvinwdntr@gmail.com' }
               ].map(link => (
                 <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.2em] text-theme-muted hover:text-brand-primary transition-colors">
                   {link.name}
                 </a>
               ))}
             </div>
          </div>
        </footer>
      </div>

      <ContactAgent />
    </main>
  );
}
