/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, type MotionValue } from 'motion/react';
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

// 6 Flagship Projects with live web screenshots & authentic assets
const STICKY_PROJECTS = [
  {
    number: '01',
    id: 'wattpulse',
    name: 'WattPulse AI Energy SaaS',
    category: 'Energy AI & B2B SaaS',
    year: '2026',
    tags: ['Next.js 15', 'Gemini 3.8 Flash', 'B2B SaaS', 'Live on Vercel'],
    col1: [
      './assets/projects/wattpulse-schedule.png',
      './assets/projects/wattpulse-ocr.png',
    ],
    col2: './assets/projects/wattpulse-dashboard.png',
    projectRef: PROJECTS.find((p) => p.id === 'wattpulse') || PROJECTS[0],
    liveUrl: 'https://wattpulse-ai.vercel.app',
    isLive: true,
    liveLabel: 'App',
  },
  {
    number: '02',
    id: 'web-scm',
    name: 'E-SCM Marmer Tulungagung',
    category: 'Enterprise SCM & Cloud',
    year: '2024 - 2026',
    tags: ['Laravel 11', 'PostgreSQL', 'Python ARIMA', 'Live: onyxtulungagung.id'],
    col1: [
      './assets/projects/scm-dashboard-kpi.png',
      './assets/projects/scm-live-katalog-page.png',
    ],
    col2: './assets/projects/scm-live-hero.png',
    projectRef: PROJECTS.find((p) => p.id === 'web-scm') || PROJECTS[0],
    liveUrl: 'https://onyxtulungagung.id',
    isLive: true,
    liveLabel: 'Web',
  },
  {
    number: '03',
    id: 'aqualux',
    name: 'AQUALUX Swimming Platform',
    category: 'Production Web',
    year: '2025',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Live on Vercel'],
    col1: [
      './assets/projects/aqualux-live-programs.png',
      './assets/projects/aqualux-live-cta.png',
    ],
    col2: './assets/projects/aqualux-live-hero.png',
    projectRef: PROJECTS.find((p) => p.id === 'aqualux') || PROJECTS[0],
    liveUrl: 'https://aqualux-delta.vercel.app',
    isLive: true,
    liveLabel: 'Web',
  },
  {
    number: '04',
    id: 'ecokiln',
    name: 'EcoKiln Venturi 3D SCADA',
    category: 'Digital Twin & CleanTech',
    year: '2026',
    tags: ['Three.js 3D', 'IoT Telemetry', 'CleanTech', 'LKTIN 2026'],
    col1: [
      './assets/projects/ecokiln-live-3d.png',
      './assets/projects/ecokiln-live-portal.png',
    ],
    col2: './assets/projects/ecokiln-live-hero.png',
    projectRef: PROJECTS.find((p) => p.id === 'ecokiln') || PROJECTS[1],
    liveUrl: 'https://eco-kiln-web3d.vercel.app',
    isLive: true,
    liveLabel: '3D SCADA',
  },
  {
    number: '05',
    id: 'si-mukti',
    name: 'SI-MUKTI Rantai Pasok',
    category: 'Spatial Logistics & Web-GIS',
    year: '2026',
    tags: ['React 19', 'Leaflet Web-GIS', 'PostGIS', 'Smart Contract'],
    col1: [
      './assets/projects/simukti-live-hero.png',
      './assets/projects/simukti-live-dashboard.png',
    ],
    col2: './assets/projects/simukti-live-map.png',
    projectRef: PROJECTS.find((p) => p.id === 'si-mukti') || PROJECTS[2],
    liveUrl: 'https://si-mukti.vercel.app',
    isLive: true,
    liveLabel: 'GIS Web',
  },
  {
    number: '06',
    id: 'pantrix',
    name: 'PANTRIX Smart Kitchen Assistant',
    category: 'Winner Juara 2 CVC II',
    year: '2025',
    tags: ['Flutter', 'Dart', 'Gamification', 'Live Web Demo'],
    col1: [
      './assets/projects/pantrix-live-mobile.png',
      './assets/projects/pantrix-live-features.png',
    ],
    col2: './assets/projects/pantrix-live-hero.png',
    projectRef: PROJECTS.find((p) => p.id === 'pantrix') || PROJECTS[3],
    liveUrl: 'https://vinxy-id.github.io/Pantrix/',
    isLive: true,
    liveLabel: 'Demo',
  },
];

function StickyProjectCard({
  project,
  index,
  total,
  containerProgress,
  onSelect,
  round,
}: {
  project: (typeof STICKY_PROJECTS)[0];
  index: number;
  total: number;
  containerProgress: MotionValue<number>;
  onSelect: (p: Project) => void;
  round: string;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.028;
  const start = index / total;

  const scale = useTransform(containerProgress, (p) => {
    const localP = Math.min(Math.max((p - start) / (1 - start), 0), 1);
    return 1 - (1 - targetScale) * localP;
  });

  const brightness = useTransform(containerProgress, (p) => {
    if (index === total - 1) return 1;
    const localP = Math.min(Math.max((p - start) / (1 - start), 0), 1);
    return 1 - 0.2 * localP;
  });

  return (
    <div className="relative md:sticky md:top-24 lg:top-28 h-auto md:h-[85vh] flex justify-center mb-8 md:mb-0">
      <motion.div
        style={{
          scale,
          filter: useMotionTemplate`brightness(${brightness})`,
          top: `${index * 22}px`,
          transformOrigin: 'top center',
        }}
        className={`relative w-full max-w-6xl ${round} border border-mist/15 p-4 sm:p-7 md:p-8 shadow-[var(--card-shadow)] bg-ink-soft transition-colors duration-300`}
      >
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-6 md:gap-8">
            <span
              className="text-mist/25 font-black leading-none select-none font-editorial shrink-0"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 110px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-ember font-medium uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[11px] sm:text-sm font-mono truncate">
                  {project.category} &bull; {project.year}
                </span>
                {project.isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live {project.liveLabel || 'Web'}
                  </span>
                )}
              </div>
              <h3
                className="text-mist font-medium uppercase leading-tight font-editorial"
                style={{ fontSize: 'clamp(1.15rem, 2.2vw, 2rem)' }}
              >
                {project.name}
              </h3>
              <div className="hidden sm:flex flex-wrap gap-2 mt-1">
                {project.tags.map((t) => (
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

          <div className="flex items-center gap-2.5 w-full sm:w-auto mt-1 sm:mt-0">
            {project.liveUrl && project.isLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-1.5 rounded-full bg-ember text-white font-medium uppercase tracking-widest px-4 py-2 sm:px-5 sm:py-2.5 text-xs transition-transform duration-200 hover:scale-105 shadow-md shadow-ember/25 text-center"
              >
                <span>Live {project.liveLabel || 'Web'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => onSelect(project.projectRef)}
              className="flex-1 sm:flex-initial justify-center group inline-flex items-center gap-2 rounded-full border border-mist/30 text-mist font-medium uppercase tracking-widest px-4 py-2 sm:px-7 sm:py-2.5 text-xs sm:text-sm transition-all duration-300 hover:border-ember hover:text-ember hover:bg-ember/10 cursor-pointer text-center"
            >
              <span>Case Study</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Browser Mockup Frame with Direct Live Link (User Request) */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/mockup block relative overflow-hidden rounded-[20px] sm:rounded-[26px] md:rounded-[30px] border border-mist/20 bg-black/60 shadow-2xl transition-all duration-300 hover:border-ember/60 hover:shadow-[0_10px_40px_rgba(255,90,31,0.25)] cursor-pointer"
          title={`Buka live preview ${project.name} langsung di tab baru`}
        >
          {/* Mac-Style Window Chrome Bar with Live Domain */}
          <div className="flex items-center justify-between px-4 py-2 sm:py-2.5 bg-[#101014] border-b border-mist/15 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-mist/60 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {project.liveUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-ember group-hover/mockup:translate-x-0.5 transition-transform font-bold">
              <span>Buka Web Asli</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2-Column Photo Collage Inside Mockup Frame */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 p-2.5 sm:p-3.5 bg-black/30">
            {/* Left Column (40% width) - 2 Stacked Images */}
            <div className="flex flex-row md:flex-col gap-3 sm:gap-4 md:gap-5 w-full md:w-[40%]">
              <div className="relative w-1/2 md:w-full overflow-hidden rounded-[14px] sm:rounded-[18px] border border-mist/10">
                <img
                  src={project.col1[0]}
                  alt={project.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/mockup:scale-[1.03]"
                  style={{ height: 'clamp(130px, 14vw, 200px)' }}
                />
              </div>
              <div className="relative w-1/2 md:w-full overflow-hidden rounded-[14px] sm:rounded-[18px] border border-mist/10">
                <img
                  src={project.col1[1]}
                  alt={project.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/mockup:scale-[1.03]"
                  style={{ height: 'clamp(140px, 17vw, 250px)' }}
                />
              </div>
            </div>

            {/* Right Column (60% width) - 1 Large Hero Image */}
            <div className="relative w-full md:w-[60%] min-h-[200px] md:min-h-[auto] bg-black/50 rounded-[14px] sm:rounded-[18px] overflow-hidden flex items-center justify-center border border-mist/10 group">
              <img
                src={project.col2}
                alt={project.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/mockup:scale-[1.02]"
                style={{ maxHeight: '460px', minHeight: 'clamp(200px, 32vw, 460px)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white/90 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Preview</span>
                <ArrowUpRight className="w-3 h-3 text-ember" />
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('problem');

  // Chapter Switcher State
  const [activeChapter, setActiveChapter] = useState(0);

  // Auto-advance chapter switcher every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const round = 'rounded-[26px] sm:rounded-[36px] md:rounded-[46px]';

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
        <div ref={containerRef} className="max-w-6xl mx-auto relative">
          {STICKY_PROJECTS.map((p, i) => (
            <StickyProjectCard
              key={p.id}
              project={p}
              index={i}
              total={STICKY_PROJECTS.length}
              containerProgress={scrollYProgress}
              onSelect={setSelectedProject}
              round={round}
            />
          ))}
        </div>
      </section>

      {/* SECTION 7: CHAPTER SWITCHER / COLLECTION (Codecuy Signature) */}
      <section id="collection" className="relative w-full bg-ink text-mist flex flex-col z-30 pt-20 pb-32 border-t border-mist/10">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-14 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
          <h2
            className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] leading-[1.1] font-medium tracking-tight text-mist max-w-3xl font-editorial uppercase"
          >
            Shipped from years of curiosity & code.
          </h2>

          <div className="xl:text-right">
            <p className="text-[10px] md:text-[11px] tracking-widest text-mist/40 uppercase mb-4 leading-relaxed font-mono">
              We don't just ship features<br />we craft experiences worth remembering
            </p>
            <div className="flex flex-wrap xl:justify-end gap-2">
              <span className="rounded-full border border-mist/20 px-4 py-1.5 text-[10px] tracking-widest uppercase text-mist/70 font-mono">
                Fast
              </span>
              <span className="rounded-full border border-mist/20 px-4 py-1.5 text-[10px] tracking-widest uppercase text-mist/70 font-mono">
                Accessible
              </span>
              <span className="rounded-full border border-mist/20 px-4 py-1.5 text-[10px] tracking-widest uppercase text-mist/70 font-mono">
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
                      className={`group flex w-full items-center justify-between py-5 sm:py-6 text-left transition-colors cursor-pointer ${
                        isOn ? 'text-mist' : 'text-[#555] hover:text-[#999]'
                      }`}
                    >
                      <span className="text-lg sm:text-xl md:text-[1.6rem] font-medium tracking-tight font-editorial uppercase">
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
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-ink-soft border border-mist/20 p-6 md:p-10 shadow-2xl text-mist"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-mist/5 border border-mist/10 text-mist/70 hover:text-ember hover:bg-mist/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-ember font-mono text-xs uppercase tracking-widest">
                      {selectedProject.category}
                    </span>
                    <span className="text-mist/30">&bull;</span>
                    <span className="text-mist/50 font-mono text-xs">
                      {selectedProject.vibe}
                    </span>
                  </div>
                  <h3 className="font-editorial text-3xl md:text-4xl font-bold uppercase text-mist tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-mist/70 mt-2 text-sm md:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden border border-mist/15 bg-black/40 aspect-video max-h-[380px]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Structured Breakdown Accordions */}
                <div className="flex flex-col">
                  <Collapsible
                    title="The Core Problem"
                    icon={<Zap className="w-4 h-4" />}
                    isOpen={openSection === 'problem'}
                    onToggle={() => setOpenSection(openSection === 'problem' ? null : 'problem')}
                  >
                    {selectedProject.details.problem}
                  </Collapsible>

                  <Collapsible
                    title="Architectural Solution"
                    icon={<Layout className="w-4 h-4" />}
                    isOpen={openSection === 'solution'}
                    onToggle={() => setOpenSection(openSection === 'solution' ? null : 'solution')}
                  >
                    {selectedProject.details.solution}
                  </Collapsible>

                  <Collapsible
                    title="Real-World Impact & Metrics"
                    icon={<Cpu className="w-4 h-4" />}
                    isOpen={openSection === 'impact'}
                    onToggle={() => setOpenSection(openSection === 'impact' ? null : 'impact')}
                  >
                    {selectedProject.details.impact}
                  </Collapsible>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-widest text-mist/50 mb-3">
                    Technologies Deployed
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.details.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/5 border border-mist/15 font-mono text-xs text-mist/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-mist/10">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-ember text-white font-medium uppercase tracking-widest px-6 py-3 text-xs transition-transform duration-200 hover:scale-105 shadow-lg shadow-ember/30"
                    >
                      <span>Explore Repository / App</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-mist/20 text-mist/70 hover:text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
