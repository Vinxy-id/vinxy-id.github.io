/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../constants";
import { Project } from "../types";
import { X, ExternalLink, Code2, Layout, Zap, ChevronDown, Cpu } from "lucide-react";

function Collapsible({ title, icon, children, isOpen, onToggle }: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-theme-border py-4">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between group py-2"
      >
        <div className="flex items-center gap-3">
          <div className="text-brand-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h4 className="font-display uppercase tracking-widest text-sm font-bold text-theme-text group-hover:text-brand-primary transition-colors">
            {title}
          </h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-theme-muted"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 text-theme-dim leading-relaxed">
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
  const [openSection, setOpenSection] = useState<string | null>("problem");

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="font-mono text-brand-primary text-sm uppercase tracking-widest block mb-4">Selected Works</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">The Playground.</h2>
        </div>
        <p className="text-theme-muted max-w-md text-right font-medium">
          A collection of experiments combining high-performance logic with aesthetic visual direction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedProject(project)}
            onHoverStart={() => {}} 
            whileHover={{ y: -12, scale: 1.02 }}
            className="group glass-panel rounded-2xl overflow-hidden cursor-pointer h-[450px] relative border border-theme-border hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/30 transition-all duration-500"
          >
            {/* Dynamic Glass Flare */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
               <motion.div 
                 initial={{ x: '-100%', y: '-100%', opacity: 0 }}
                 whileHover={{ x: '100%', y: '100%', opacity: 1 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent w-[200%] h-[200%]"
               />
            </div>

            {/* Hover Glow Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-transparent to-brand-secondary/5 pointer-events-none z-10"
            />

            <div className="absolute inset-0 z-0 scale-105 group-hover:scale-110 transition-transform duration-700">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <div className="flex items-center gap-3 mb-3">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono uppercase bg-theme-bg/20 px-2 py-1 rounded text-theme-text/70">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-brand-primary transition-colors text-theme-text">{project.title}</h3>
              <p className="text-theme-dim text-sm line-clamp-2 mb-4 font-medium">{project.description}</p>
              <div className="flex items-center gap-4 text-brand-primary text-xs font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <span>VIEW CASE STUDY <ExternalLink className="w-3 h-3 inline pb-0.5" /></span>
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 hover:text-theme-text transition-colors border-l border-theme-border pl-4"
                  >
                    LIVE DEMO <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-theme-bg/95 backdrop-blur-xl"
            />
            
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="relative w-full max-w-5xl max-h-[90vh] bg-theme-glass backdrop-blur-3xl rounded-3xl overflow-hidden overflow-y-auto border border-theme-border shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-theme-bg/10 hover:bg-theme-bg/20 transition-colors z-20 text-theme-text"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="h-64 lg:h-full sticky lg:relative top-0">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-bg/50 to-transparent" />
                </div>
                
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-brand-primary text-xs font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20 uppercase">
                      {selectedProject.vibe}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{selectedProject.title}</h2>
                  <p className="text-xl text-theme-dim mb-12 font-medium">{selectedProject.description}</p>

                  <div className="space-y-2">
                    <Collapsible 
                      title="The problem" 
                      icon={<Layout className="w-5 h-5" />}
                      isOpen={openSection === "problem"}
                      onToggle={() => setOpenSection(openSection === "problem" ? null : "problem")}
                    >
                      {selectedProject.details.problem}
                    </Collapsible>

                    <Collapsible 
                      title="The solution" 
                      icon={<Code2 className="w-5 h-5" />}
                      isOpen={openSection === "solution"}
                      onToggle={() => setOpenSection(openSection === "solution" ? null : "solution")}
                    >
                      {selectedProject.details.solution}
                    </Collapsible>

                    <Collapsible 
                      title="Technologies used" 
                      icon={<Cpu className="w-5 h-5" />}
                      isOpen={openSection === "tech"}
                      onToggle={() => setOpenSection(openSection === "tech" ? null : "tech")}
                    >
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedProject.details.tech.map(t => (
                          <span key={t} className="text-[10px] font-mono text-theme-muted border border-theme-border px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Collapsible>

                    <Collapsible 
                      title="The impact" 
                      icon={<Zap className="w-5 h-5" />}
                      isOpen={openSection === "impact"}
                      onToggle={() => setOpenSection(openSection === "impact" ? null : "impact")}
                    >
                      <p className="text-theme-text font-medium italic underline decoration-brand-primary/40 underline-offset-4 leading-relaxed">
                        {selectedProject.details.impact}
                      </p>
                    </Collapsible>
                  </div>
                  
                  {selectedProject.link && (
                    <div className="mt-16 pt-8 border-t border-theme-border">
                       <a 
                         href={selectedProject.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="w-full bg-theme-text text-theme-bg font-bold py-4 rounded-xl hover:bg-brand-primary hover:text-white transition-colors flex items-center justify-center gap-2 text-center"
                       >
                         LIVE DEMO <ExternalLink className="w-5 h-5" />
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
