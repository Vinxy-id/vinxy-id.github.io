/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Layers, Globe, Smartphone, Video, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServiceItem {
  number: string;
  id: string;
  title: string;
  tagline: string;
  icon: typeof Layers;
  deliverables: string[];
  techStack: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    id: 'ui-ux',
    title: 'UI/UX & Design Systems',
    tagline: 'Transforming complex product logic into intuitive, pixel-perfect, human-centered interfaces.',
    icon: Layers,
    deliverables: [
      'Interactive Figma prototypes & wireframes',
      'Scalable design tokens & component libraries',
      'Design handoff specifications & user flows',
      'Accessibility & WCAG contrast compliance'
    ],
    techStack: ['Figma', 'Design Systems', 'Prototyping', 'User Research']
  },
  {
    number: '02',
    id: 'web-gis',
    title: 'Modern Web & Web-GIS Platforms',
    tagline: 'High-performance web applications, geospatial dashboards, and SEO-engineered landing experiences.',
    icon: Globe,
    deliverables: [
      'React 19 & Next.js Single Page Applications',
      'Leaflet & Mapbox Web-GIS spatial visualizations',
      'Audit-grade Lighthouse 98+ SEO & speed tuning',
      'REST API, GraphQL & Database integration'
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Leaflet GIS', 'PostGIS']
  },
  {
    number: '03',
    id: 'mobile',
    title: 'Cross-Platform Mobile Apps',
    tagline: 'Smooth, responsive native mobile solutions with sub-60ms interaction response times.',
    icon: Smartphone,
    deliverables: [
      'Flutter & Dart Android/iOS development',
      'Gamified UX workflows & procedural algorithms',
      'Offline-first caching & SQLite architectures',
      'Clean state management & custom shaders'
    ],
    techStack: ['Flutter', 'Dart', 'Custom Shaders', 'Mobile UX']
  },
  {
    number: '04',
    id: 'motion',
    title: 'Motion Design & Creative Video',
    tagline: 'High-retention digital storytelling with kinetic typography, color grading, and dynamic edits.',
    icon: Video,
    deliverables: [
      'Commercial teasers & launch showreels',
      'Vertical short-form reels for TikTok & Instagram',
      'Precision audio design synchronization',
      'Kinetic typography & After Effects animations'
    ],
    techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Illustrator']
  }
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 bg-[#ece7dd] text-[#1a1714] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-14 px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-36 pb-32 sm:pb-36 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Paper Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1a1714]/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1a1714]/60 mb-3">
              <span className="w-2 h-2 rounded-full bg-ember" />
              <span>[ 02 ] Capabilities & Architecture</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#1a1714]">
              Turning Bold Ideas Into Fast, Accessible Interfaces.
            </h2>
          </div>
          <p className="text-[#1a1714]/75 max-w-md font-sans text-sm sm:text-base leading-relaxed">
            From algorithmic data pipelines and spatial mapping to motion showreels — engineered to perform and crafted to captivate.
          </p>
        </div>

        {/* Editorial Numbered Rows (01, 02, 03, 04) */}
        <div className="flex flex-col divide-y divide-[#1a1714]/15">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group hover:bg-[#e4ded2]/50 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-3xl transition-all duration-300"
              >
                {/* Huge Editorial Number */}
                <div className="lg:col-span-2 flex items-baseline gap-4">
                  <span className="font-editorial text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#1a1714]/20 group-hover:text-ember transition-colors duration-300">
                    {service.number}
                  </span>
                </div>

                {/* Service Details */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1714]/5 border border-[#1a1714]/10 flex items-center justify-center text-[#1a1714]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#1a1714] group-hover:text-ember transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[#1a1714]/80 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {service.tagline}
                  </p>

                  {/* Tech stack pills on paper */}
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/70 border border-[#1a1714]/15 text-[#1a1714] font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="lg:col-span-5 bg-white/40 p-6 rounded-2xl border border-[#1a1714]/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1714]/50 block mb-3 font-bold">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1a1714]/85 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
