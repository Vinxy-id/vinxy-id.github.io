/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, GraduationCap, Code2, Sparkles, Calendar, MapPin } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface Milestone {
  year: string;
  role: string;
  organization: string;
  location: string;
  badge?: string;
  description: string;
  highlights: string[];
  icon: typeof Award;
}

const MILESTONES: Milestone[] = [
  {
    year: '2026',
    role: 'Lead Architect & Researcher',
    organization: 'SI-MUKTI Project (LKTIN UNIMED 2026)',
    location: 'Tulungagung / Kebumen',
    badge: 'Research & Innovation',
    description: 'Designed and engineered an integrated multi-stakeholder supply chain platform combining Leaflet Web-GIS geospatial tracing, AI volumetric measurement, and smart contracts for traditional tile & marble industries.',
    highlights: ['Web-GIS Geospatial Analytics', 'Volumetric AI Pipeline', 'PostGIS 16+ DDL & Spatials', 'Smart Contract QR Traceability'],
    icon: Sparkles,
  },
  {
    year: '2025',
    role: '1st Place Winner',
    organization: 'Creative Visual Competition II',
    location: 'National Level',
    badge: '1st Place Gold Award',
    description: 'Awarded 1st Place for PANTRIX — a revolutionary gamified meal planning and kitchen inventory mobile assistant with sub-60ms response transitions and procedural recipe generation.',
    highlights: ['Flutter & Dart Engine', 'Sub-60ms Interaction Speed', 'Gamification Mechanics', 'High-Fidelity UI/UX System'],
    icon: Award,
  },
  {
    year: '2024 — Present',
    role: 'Undergraduate Informatics Student',
    organization: 'Computer Science & Software Engineering',
    location: 'East Java, Indonesia',
    badge: 'Academics',
    description: 'Focusing on core computing foundations: algorithms, advanced data structures, geospatial information systems (GIS), and modern software engineering practices.',
    highlights: ['Algorithm Analysis', 'Data Structures (Stack/Queue/Graph)', 'Relational & Spatial Databases', 'Software Architecture Patterns'],
    icon: GraduationCap,
  },
  {
    year: '2023 — Present',
    role: 'Creative Technologist & UI/UX Architect',
    organization: 'Freelance & Independent Projects',
    location: 'Remote / Indonesia',
    badge: 'Production',
    description: 'Bridging aesthetic visual storytelling and full-stack engineering. Built high-conversion landing pages (AQUALUX), orientation minigames (Digital Frontier), and commercial motion showreels.',
    highlights: ['React 19 & Next.js Platforms', 'Figma Design Systems', 'Short-Form Kinetic Video', '98+ Lighthouse SEO Audits'],
    icon: Code2,
  },
];

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-28 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5 text-brand-primary" />
            <span>Career & Academic Milestones</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-theme-text">
            The Journey.
          </h2>
        </div>
        <p className="text-theme-muted max-w-md font-medium text-sm sm:text-base leading-relaxed">
          Tracing the evolution from computational fundamentals to national competition awards and production-grade software architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {MILESTONES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.year + item.role}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/25">
                      {item.year}
                    </span>
                    {item.badge && (
                      <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-theme-border/50 text-theme-dim border border-theme-border">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0 text-brand-primary mt-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-theme-text">{item.role}</h3>
                      <p className="text-sm text-brand-secondary font-medium">{item.organization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-theme-muted font-mono mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-sm text-theme-dim leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-theme-border/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted block mb-2.5">
                    Competencies Applied:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-theme-bg/60 border border-theme-border text-theme-text/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
