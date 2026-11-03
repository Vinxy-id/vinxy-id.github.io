/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ExternalLink, Code2, Layout, Zap, ChevronDown, Cpu, Sparkles, FolderGit2 } from 'lucide-react';
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
  const [openSection, setOpenSection] = useState<string | null>('problem');
  const [activeFilter, setActiveFilter] = useState<string>('all');

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
    <section id="projects" className="py-28 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>Selected Projects & Engineering</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-theme-text">
            The Playground.
          </h2>
        </div>
        <p className="text-theme-muted max-w-md font-medium text-sm sm:text-base leading-relaxed">
          A showcase of live systems, competitive solutions, and production architectures combining high-performance logic with aesthetic direction.
        </p>
      </div>

      {/* Filter Tabs (Emil Kowalski spring style) */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-theme-border/60 pb-4">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className="relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="active-project-tab"
                  className="absolute inset-0 rounded-full bg-brand-primary/15 border border-brand-primary/40"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 font-semibold ${isActive ? 'text-brand-primary' : 'text-theme-muted hover:text-theme-text'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
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
              <SpotlightCard className="h-full flex flex-col justify-between overflow-hidden relative border-theme-border group-hover:border-brand-primary/40 group-hover:shadow-2xl group-hover:shadow-brand-primary/20 transition-all duration-500">
                
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/60 to-transparent" />
                </div>

                {/* Top Bar on Card */}
                <div className="relative z-20 p-6 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full bg-theme-bg/80 backdrop-blur-md border border-brand-primary/30 text-brand-secondary uppercase tracking-wider">
                    {project.vibe}
                  </span>
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-full bg-theme-bg/80 backdrop-blur-md border border-theme-border flex items-center justify-center text-theme-muted hover:text-brand-primary hover:border-brand-primary/50 transition-colors"
                      title="Open Repository"
                    >
                      <FolderGit2 className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Bottom Content on Card */}
                <div className="relative z-20 p-6">
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase bg-theme-bg/70 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-theme-dim border border-theme-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-primary transition-colors text-theme-text">
                    {project.title}
                  </h3>
                  
                  <p className="text-theme-dim text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-theme-border/50 text-xs font-mono text-brand-primary">
                    <span className="inline-flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                      <span>Explore Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] uppercase text-theme-muted font-normal">
                      Click to expand
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-theme-bg/90 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-theme-surface/95 backdrop-blur-2xl rounded-3xl overflow-hidden overflow-y-auto border border-theme-border shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-theme-bg/80 border border-theme-border hover:border-brand-primary/40 transition-colors z-20 text-theme-text cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-theme-surface/95" />
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs uppercase tracking-wider mb-4">
                      <span>{selectedProject.vibe}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-theme-text">
                      {selectedProject.title}
                    </h2>
                    
                    <p className="text-sm text-theme-dim mb-8 leading-relaxed font-normal">
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
                              className="text-[11px] font-mono text-theme-text bg-theme-bg/60 border border-theme-border px-2.5 py-1 rounded"
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
                        <p className="text-theme-text font-medium leading-relaxed">
                          {selectedProject.details.impact}
                        </p>
                      </Collapsible>
                    </div>
                  </div>

                  {selectedProject.link && (
                    <div className="mt-8 pt-6 border-t border-theme-border">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-primary text-black font-semibold py-3.5 rounded-xl hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-brand-primary/20"
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
