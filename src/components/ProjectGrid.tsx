/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ExternalLink, Code2, Layout, Zap, ChevronDown, Cpu, Sparkles, FolderGit2, ArrowUpRight, Grid, List } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

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
    <div className="border-b border-theme-border py-3.5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between group py-1.5 cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-brand-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h4 className="font-display uppercase tracking-wider text-sm font-bold text-theme-text group-hover:text-brand-primary transition-colors">
            {title}
          </h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-theme-muted"
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
            <div className="pt-3 pb-2 text-sm text-theme-dim leading-relaxed font-normal">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project>(PROJECTS[0]);
  const [openSection, setOpenSection] = useState<string | null>('problem');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'chapters' | 'bento'>('chapters');

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'web', label: 'Web & Geospatial' },
    { id: 'mobile', label: 'Mobile & UI/UX' },
    { id: 'enterprise', label: 'Enterprise & SCM' },
    { id: 'media', label: 'Motion & Media' },
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.tags.some(t => ['Web-GIS', 'PostGIS', 'Landing Page', 'SEO Optimization'].includes(t));
    if (activeFilter === 'mobile') return project.tags.some(t => ['Flutter', 'Mobile UX', 'Gamification'].includes(t));
    if (activeFilter === 'enterprise') return project.tags.some(t => ['SCM', 'Laravel', 'PostgreSQL', 'Smart Contract'].includes(t));
    if (activeFilter === 'media') return project.tags.some(t => ['After Effects', 'Premiere Pro', 'Motion Design'].includes(t));
    return true;
  });

  return (
    <section
      id="projects"
      className="relative z-20 bg-[#0c0c0c] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-14 px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-36 pb-32 shadow-[0_-20px_50px_rgba(0,0,0,0.7)] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span>[ 03 ] Selected Work & Engineering</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white">
              Shipped From Years Of Curiosity & Code.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/60 max-w-sm font-sans text-xs sm:text-sm leading-relaxed">
              Live spatial platforms, gamified mobile tools, and full-stack architectures.
            </p>

            {/* View Mode Toggle */}
            <div className="inline-flex p-1 rounded-full bg-[#18181b] border border-white/10 text-xs font-mono">
              <button
                onClick={() => setViewMode('chapters')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'chapters' ? 'bg-brand-primary text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
                title="Interactive Chapter Switcher (Codecuy Style)"
              >
                <List className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </button>
              <button
                onClick={() => setViewMode('bento')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'bento' ? 'bg-brand-primary text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
                title="Bento Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  const first = filteredProjects[0];
                  if (first) setHoveredProject(first);
                }}
                className="relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-tab"
                    className="absolute inset-0 rounded-full bg-brand-primary/20 border border-brand-primary/50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 font-semibold ${isActive ? 'text-brand-primary' : 'text-white/50 hover:text-white'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* VIEW 1: Codecuy-Style Interactive Chapter Switcher */}
        {viewMode === 'chapters' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Sticky Preview Window */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <motion.div
                key={hoveredProject.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl overflow-hidden bg-[#141416] border border-white/10 shadow-2xl p-4 flex flex-col group"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/60 mb-5">
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-brand-primary text-black font-bold">
                      {hoveredProject.vibe}
                    </span>
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
                    {hoveredProject.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {hoveredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {hoveredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(hoveredProject)}
                    className="w-full py-3 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 cursor-pointer"
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive List */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
              {filteredProjects.map((project, idx) => {
                const isHovered = hoveredProject.id === project.id;
                const formattedNum = String(idx + 1).padStart(2, '0');

                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project)}
                    onClick={() => setSelectedProject(project)}
                    className={`py-8 sm:py-10 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isHovered ? 'bg-[#18181b]' : 'hover:bg-[#141416]/60'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                      <span className={`font-editorial text-3xl sm:text-4xl font-black transition-colors ${
                        isHovered ? 'text-brand-primary' : 'text-white/20 group-hover:text-white/40'
                      }`}>
                        {formattedNum}
                      </span>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-brand-secondary">
                            {project.category}
                          </span>
                        </div>
                        <h4 className="font-editorial text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors">
                          {project.title}
                        </h4>
                        <div className="hidden sm:flex flex-wrap gap-2 mt-2">
                          {project.tags.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] font-mono text-white/50">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isHovered ? 'bg-brand-primary border-brand-primary text-white scale-110' : 'border-white/15 text-white/40 group-hover:border-white/40 group-hover:text-white'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* VIEW 2: Bento Grid View */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer group h-[440px]"
                >
                  <SpotlightCard className="h-full flex flex-col justify-between overflow-hidden relative border-white/10 group-hover:border-brand-primary/40 group-hover:shadow-2xl group-hover:shadow-brand-primary/20 transition-all duration-500 rounded-3xl bg-[#141416]">
                    
                    {/* Background Image Container */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-30 group-hover:opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/85 to-transparent" />
                    </div>

                    {/* Top Content */}
                    <div className="relative z-10 p-6 flex items-start justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-brand-primary/20 border border-brand-primary/30 text-brand-primary font-bold">
                        {project.vibe}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-brand-primary group-hover:scale-110 transition-all">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="relative z-10 p-6 pt-0">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-editorial text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-brand-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/65 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-brand-primary">
                        <span className="inline-flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[10px] uppercase text-white/40 font-normal">
                          Click to expand
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
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
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#141416] rounded-3xl overflow-hidden overflow-y-auto border border-white/15 shadow-2xl z-10 text-white"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-black/80 border border-white/15 hover:border-brand-primary/40 transition-colors z-20 text-white cursor-pointer"
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
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#141416]" />
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs uppercase tracking-wider mb-4">
                      <span>{selectedProject.vibe}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-editorial font-black uppercase tracking-tight mb-3 text-white">
                      {selectedProject.title}
                    </h2>
                    
                    <p className="text-sm text-white/70 mb-8 leading-relaxed font-normal">
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
                              className="text-[11px] font-mono text-white bg-black/60 border border-white/10 px-2.5 py-1 rounded"
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
                        <p className="text-white font-medium leading-relaxed">
                          {selectedProject.details.impact}
                        </p>
                      </Collapsible>
                    </div>
                  </div>

                  {selectedProject.link && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-primary text-white font-semibold py-3.5 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-brand-primary/20"
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
    </section>
  );
}
