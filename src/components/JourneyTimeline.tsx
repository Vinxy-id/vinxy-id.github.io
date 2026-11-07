/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, GraduationCap, Code2, Sparkles, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
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
    role: 'Top 4 Finalist',
    organization: 'National Business Case BMNC (FEB UNAIR)',
    location: 'Surabaya, Indonesia',
    badge: 'National Finalist',
    description: 'Formulated corporate scalability and nationwide franchise roadmap for GBT Laras Imbang (75-year automotive specialist), engineering a Hub & Spoke replication model, EV-ready diagnostic centers, and Malaysia JV entry strategy.',
    highlights: ['Two-Tier Hub & Spoke Model', 'EV Precision Infrastructure', 'Financial Feasibility & BEP', 'Global Market Entry Strategy'],
    icon: Award,
  },
  {
    year: '2026',
    role: 'Lead Architect & Researcher',
    organization: 'SI-MUKTI Project (Research Innovation)',
    location: 'Tulungagung / Kebumen',
    badge: 'Spatial & GIS',
    description: 'Designed and engineered an integrated multi-stakeholder supply chain platform combining Leaflet Web-GIS geospatial tracing, AI volumetric measurement, and smart contracts for traditional tile & marble industries.',
    highlights: ['Web-GIS Geospatial Analytics', 'Volumetric AI Pipeline', 'PostGIS 16+ DDL & Spatials', 'Smart Contract QR Traceability'],
    icon: Sparkles,
  },
  {
    year: '2025',
    role: '2nd Place Winner & Lead Designer',
    organization: 'Creative Visual Competition (UBAYA) / PANTRIX',
    location: 'Surabaya / National',
    badge: 'Silver Award',
    description: 'Awarded 2nd Place in Creative Visual Competition by Universitas Surabaya (UBAYA). Also engineered PANTRIX — a gamified meal planning and smart pantry Flutter assistant with sub-60ms responsive interactions.',
    highlights: ['Cinematic Visual Storytelling', 'Flutter & Dart Architecture', 'Sub-60ms Interaction Speed', 'Design System Architecture'],
    icon: Award,
  },
  {
    year: '2024',
    role: '1st Place Winner (Juara 1 Film Pendek)',
    organization: 'Embun Theater Festival & Inhum Dhipotion',
    location: 'East Java, Indonesia',
    badge: 'Gold Award & Best Script',
    description: 'Awarded 1st Place in Short Film at Embun Festival UBhi 2024. Also earned dual honors for Best Actor and Best Script at Inhum Dhipotion Showcase for dramatic screenwriting and technical audiovisual production.',
    highlights: ['1st Place Short Film Production', 'Best Actor & Best Script Award', 'Audiovisual Color Grading', 'Narrative Directing'],
    icon: Award,
  },
  {
    year: '2024 — Present',
    role: 'Undergraduate Informatics Student & Asdos',
    organization: 'Computer Science & Software Systems Research',
    location: 'East Java, Indonesia',
    badge: 'Academics & Research',
    description: 'Focusing on core computing foundations: algorithms, geospatial information systems (GIS), and distributed systems. Served as Student Assistant (Asdos) on E-SCM Research developing Laravel 11 and FastAPI microservices.',
    highlights: ['Algorithm & Data Structures', 'Relational & Spatial Databases', 'FastAPI & Statsmodels Microservices', 'Midtrans Payment Integration'],
    icon: GraduationCap,
  },
];

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-28 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto transition-colors duration-300">
      {/* Editorial About Header (Codecuy Style) */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-mist/50 mb-4">
          <span className="w-2 h-2 rounded-full bg-ember" />
          <span>About Me · Career & Academic Milestones</span>
        </div>

        <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-mist mb-8">
          <span className="text-mist/40 block">THE JOURNEY &</span>
          <span>COMPUTATIONAL ROOTS.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-mist/10 pt-8">
          <p className="lg:col-span-8 font-sans text-base sm:text-lg md:text-xl text-mist/80 leading-relaxed font-normal">
            I’m <strong className="text-mist font-semibold">Alvin Widiantara</strong>, an Informatics Engineering student and Creative Technologist. I specialize in the convergence of <strong className="text-mist font-semibold">computational architecture</strong>, <strong className="text-mist font-semibold">spatial Web-GIS systems</strong>, and <strong className="text-mist font-semibold">strategic business innovation</strong>. Recognized as <strong className="text-ember font-semibold">Top 4 Finalist in National Business Case BMNC (FEB UNAIR)</strong> alongside multiple film and audiovisual directing awards.
          </p>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-ink-soft border border-mist/10 flex items-center justify-between">
              <span className="font-mono text-xs text-mist/50 uppercase tracking-wider">Lighthouse Score</span>
              <span className="font-editorial text-xl font-black text-ember">98+ Speed</span>
            </div>
            <div className="p-4 rounded-2xl bg-ink-soft border border-mist/10 flex items-center justify-between">
              <span className="font-mono text-xs text-mist/50 uppercase tracking-wider">BMNC 2026 Case</span>
              <span className="font-editorial text-xl font-black text-amber-400">Top 4 Finalist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Bento Grid */}
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
              <SpotlightCard className="p-8 h-full flex flex-col justify-between bg-ink-soft border border-mist/10 rounded-3xl">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-ember/10 text-ember border border-ember/25">
                      {item.year}
                    </span>
                    {item.badge && (
                      <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-mist/5 text-mist/70 border border-mist/10">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center shrink-0 text-ember mt-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-editorial font-black uppercase tracking-tight text-mist">{item.role}</h3>
                      <p className="text-sm text-mist/60 font-medium">{item.organization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-mist/50 font-mono mb-4">
                    <MapPin className="w-3.5 h-3.5 text-ember" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-sm text-mist/70 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-mist/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-mist/40 block mb-2.5 font-bold">
                    Competencies Applied:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-ink/70 border border-mist/10 text-mist/80"
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
