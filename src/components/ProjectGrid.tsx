/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ExternalLink, Code2, Layout, Zap, ChevronDown, Cpu, ArrowUpRight } from 'lucide-react';

function Collapsible({
  title,
  icon,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-mist/10 py-3.5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between group py-1.5 cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-ember group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-mist group-hover:text-ember transition-colors">
            {title}
          </h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-mist/50"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-2 text-sm text-mist/75 leading-relaxed font-light">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 4 Featured Projects with rich multi-image column layouts for Codecuy Sticky Cards
const STICKY_PROJECTS = [
  {
    number: '01',
    id: 'si-mukti',
    name: 'SI-MUKTI Rantai Pasok',
    category: 'Research & Spatial',
    year: '2026',
    tags: ['React', 'Leaflet Web-GIS', 'PostGIS', 'Smart Contract'],
    col1: [
      './assets/projects/si-mukti.jpeg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=75',
    ],
    col2: './assets/projects/si-mukti.jpeg',
    projectRef: PROJECTS[0],
  },
  {
    number: '02',
    id: 'pantrix',
    name: 'PANTRIX Smart Assistant',
    category: 'Winner CVC II',
    year: '2025',
    tags: ['Flutter', 'Dart', 'Gamification', 'Mobile UX'],
    col1: [
      './assets/projects/pantrix.png',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=75',
    ],
    col2: './assets/projects/pantrix.png',
    projectRef: PROJECTS[1],
  },
  {
    number: '03',
    id: 'aqualux',
    name: 'AQUALUX Platform',
    category: 'Production Web',
    year: '2025',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Lighthouse 98+'],
    col1: [
      './assets/projects/aqualux.webp',
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=900&q=75',
    ],
    col2: './assets/projects/aqualux.webp',
    projectRef: PROJECTS[2],
  },
  {
    number: '04',
    id: 'web-scm',
    name: 'Web SCM Marmer Tulungagung',
    category: 'Enterprise SCM',
    year: '2024',
    tags: ['Laravel', 'PostgreSQL', 'SCM', 'Industrial IT'],
    col1: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=75',
      './assets/projects/adhigana.png',
    ],
    col2: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=75',
    projectRef: PROJECTS[4],
  },
];

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('problem');

  // Chapter Switcher State
  const [activeChapter, setActiveChapter] = useState(0);

  // Auto-advance chapter switcher every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const round = 'rounded-[30px] sm:rounded-[40px] md:rounded-[50px]';

  return (
    <>
      {/* SECTION 4: STICKY STACKING CARDS (Codecuy Signature) */}
      <section
        id="projects"
        className="relative z-20 bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-32 pb-32"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          <span className="text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-[0.3em]">
            Selected work
          </span>
        </div>

        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>

        {/* Sticky Cards Stacking Container */}
        <div className="space-y-24 max-w-6xl mx-auto">
          {STICKY_PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="min-h-[80vh] sticky top-24 md:top-32 flex justify-center"
            >
              <div
                className={`relative w-full ${round} border border-mist/15 p-5 sm:p-7 md:p-10 origin-top shadow-[0_-25px_60px_-25px_rgba(0,0,0,0.9)] bg-ink-soft transition-transform duration-300`}
                style={{ top: `${i * 24}px` }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-6 sm:mb-8">
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                    <span
                      className="text-mist/25 font-black leading-none select-none"
                      style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
                    >
                      {p.number}
                    </span>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <span className="text-ember font-medium uppercase tracking-[0.25em] text-xs sm:text-sm">
                        {p.category} &bull; {p.year}
                      </span>
                      <h3
                        className="text-mist font-medium uppercase leading-tight"
                        style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)' }}
                      >
                        {p.name}
                      </h3>
                      <div className="hidden sm:flex flex-wrap gap-2 mt-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-mist/20 px-3 py-0.5 text-[0.65rem] uppercase tracking-widest text-mist/60 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(p.projectRef)}
                    className="group inline-flex items-center gap-2 rounded-full border border-mist/30 text-mist font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm transition-all duration-300 hover:border-ember hover:text-ember hover:bg-ember/10 cursor-pointer"
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                {/* 2-Column Photo Collage (Codecuy Style) */}
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 cursor-pointer" onClick={() => setSelectedProject(p.projectRef)}>
                  {/* Left Column (40% width) - 2 Stacked Images */}
                  <div className="flex flex-row md:flex-col gap-3 sm:gap-4 md:gap-5 w-full md:w-[40%]">
                    <img
                      src={p.col1[0]}
                      alt={p.name}
                      loading="lazy"
                      className={`w-1/2 md:w-full object-cover ${round} transition-transform duration-500 hover:scale-[1.02]`}
                      style={{ height: 'clamp(140px, 16vw, 220px)' }}
                    />
                    <img
                      src={p.col1[1]}
                      alt={p.name}
                      loading="lazy"
                      className={`w-1/2 md:w-full object-cover ${round} transition-transform duration-500 hover:scale-[1.02]`}
                      style={{ height: 'clamp(160px, 20vw, 280px)' }}
                    />
                  </div>

                  {/* Right Column (60% width) - 1 Large Hero Image */}
                  <div className="relative w-full md:w-[60%] min-h-[240px] md:min-h-[auto] bg-black/40 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden flex items-center justify-center">
                    <img
                      src={p.col2}
                      alt={p.name}
                      loading="lazy"
                      className={`w-full h-full ${p.id === 'pantrix' ? 'object-contain p-4' : 'object-cover'} ${round} transition-transform duration-500 hover:scale-[1.02]`}
                      style={{ maxHeight: '520px', minHeight: 'clamp(240px, 36vw, 520px)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-[30px] sm:rounded-[40px] md:rounded-[50px]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CHAPTER SWITCHER / COLLECTION (Codecuy Signature) */}
      <section id="collection" className="relative w-full bg-ink text-mist flex flex-col z-30 pt-20 pb-32 border-t border-mist/10">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-14 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
          <h2
            className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] leading-[1.1] font-medium tracking-tight text-mist max-w-3xl"
          >
            Shipped from years of curiosity & code.
          </h2>

          <div className="xl:text-right">
            <p className="text-[10px] md:text-[11px] tracking-widest text-mist/40 uppercase mb-4 leading-relaxed font-mono">
              We don't just ship features<br />we craft experiences worth remembering
            </p>
            <div className="flex flex-wrap xl:justify-end gap-2">
              <span className="rounded-full border border-mist/20 px-4 py-1.5 text-[10px] tracking-widest uppercase text-mist/70">
                Fast
              </span>
              <span className="rounded-full border border-mist/20 px-4 py-1.5 text-[10px] tracking-widest uppercase text-mist/70">
                Accessible
              </span>
              <span className="rounded-full border border-mist/20 px-4 py-1.5 text-[10px] tracking-widest uppercase text-mist/70">
                Polished
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-mist/15 mb-8" />

        {/* 2-Column Interactive Chapter Browser */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left Large Photo with Blur Fade Transition */}
          <div className="md:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/60 border border-mist/15 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={PROJECTS[activeChapter].id}
                src={PROJECTS[activeChapter].image}
                alt={PROJECTS[activeChapter].title}
                initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-ember font-mono text-[10px] uppercase tracking-widest block mb-1">
                {PROJECTS[activeChapter].category}
              </span>
              <h4 className="font-editorial text-2xl font-bold uppercase text-white">
                {PROJECTS[activeChapter].title}
              </h4>
            </div>
          </div>

          {/* Right Chapter List */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-mist/40 pb-4 border-b border-mist/10 mb-2">
              <span>Chapter {String(activeChapter + 1).padStart(2, '0')}</span>
              <span>{String(activeChapter + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
            </div>

            <ul className="flex flex-col divide-y divide-mist/10">
              {PROJECTS.map((c, i) => {
                const isOn = activeChapter === i;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setActiveChapter(i)}
                      className={`group flex w-full items-center justify-between py-6 text-left transition-colors cursor-pointer ${
                        isOn ? 'text-mist' : 'text-[#555] hover:text-[#999]'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl md:text-[1.8rem] font-medium tracking-tight font-editorial uppercase">
                        {c.title}
                      </span>
                      <span className={`transition-opacity duration-300 ${isOn ? 'opacity-100 text-ember' : 'opacity-0'}`}>
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-ink-soft rounded-3xl overflow-hidden overflow-y-auto border border-mist/20 shadow-2xl z-10 text-mist"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-black/80 border border-mist/20 hover:border-ember/40 transition-colors z-20 text-mist cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 md:h-full min-h-[320px]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-ink-soft" />
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/15 border border-ember/30 text-ember font-mono text-xs uppercase tracking-wider mb-4">
                      <span>{selectedProject.vibe}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-editorial font-black uppercase tracking-tight mb-3 text-mist">
                      {selectedProject.title}
                    </h2>

                    <p className="text-sm text-mist/70 mb-8 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-1">
                      <Collapsible
                        title="The Problem"
                        icon={<Layout className="w-4 h-4" />}
                        isOpen={openSection === 'problem'}
                        onToggle={() => setOpenSection(openSection === 'problem' ? null : 'problem')}
                      >
                        {selectedProject.details.problem}
                      </Collapsible>

                      <Collapsible
                        title="The Architectural Solution"
                        icon={<Code2 className="w-4 h-4" />}
                        isOpen={openSection === 'solution'}
                        onToggle={() => setOpenSection(openSection === 'solution' ? null : 'solution')}
                      >
                        {selectedProject.details.solution}
                      </Collapsible>

                      <Collapsible
                        title="Technologies & Frameworks"
                        icon={<Cpu className="w-4 h-4" />}
                        isOpen={openSection === 'tech'}
                        onToggle={() => setOpenSection(openSection === 'tech' ? null : 'tech')}
                      >
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {selectedProject.details.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono text-mist bg-black/60 border border-mist/10 px-2.5 py-1 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </Collapsible>

                      <Collapsible
                        title="Impact & Results"
                        icon={<Zap className="w-4 h-4" />}
                        isOpen={openSection === 'impact'}
                        onToggle={() => setOpenSection(openSection === 'impact' ? null : 'impact')}
                      >
                        <p className="text-mist font-medium leading-relaxed">
                          {selectedProject.details.impact}
                        </p>
                      </Collapsible>
                    </div>
                  </div>

                  {selectedProject.link && (
                    <div className="mt-8 pt-6 border-t border-mist/10">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ember-btn w-full text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
                      >
                        <span>View Repository / Code</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
