/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    number: '01',
    name: 'Frontend Development',
    description: 'Building production-grade interfaces with React, Next.js and TypeScript, component-driven, type-safe and maintainable at scale.',
  },
  {
    number: '02',
    name: 'Web-GIS & Spatial Architecture',
    description: 'Architecting interactive spatial mapping dashboards with Leaflet, Mapbox, PostGIS, and real-time volumetric calculation pipelines.',
  },
  {
    number: '03',
    name: 'UI/UX & Design Systems',
    description: 'Translating designs into pixel-perfect, responsive layouts with clean, semantic and accessible markup that holds up everywhere.',
  },
  {
    number: '04',
    name: 'Cross-Platform Mobile (Flutter)',
    description: 'Engineering native mobile experiences with sub-60ms interaction response times, gamified inventories, and offline-first SQLite architectures.',
  },
  {
    number: '05',
    name: 'Motion Design & Interaction',
    description: 'Adding purposeful animation and kinetic typography with Framer Motion, Three.js and Premiere/After Effects to bring interfaces to life without hurting performance.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-paper text-paper-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 relative z-10 -mt-10 sm:-mt-12 md:-mt-14"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-ember" />
        <span className="text-paper-ink/50 text-xs sm:text-sm font-medium uppercase tracking-[0.3em]">
          What I do
        </span>
      </div>

      <h2
        className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col">
        {SERVICES.map((service) => (
          <div
            key={service.number}
            className="group relative flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 cursor-default transition-all duration-300"
            style={{ borderTop: '1px solid rgba(26,23,20,0.15)' }}
          >
            {/* Massive Number */}
            <span
              className="font-black leading-none shrink-0 text-paper-ink/30 transition-colors duration-300 group-hover:text-ember select-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </span>

            {/* Title & Description */}
            <div className="flex flex-col gap-3 sm:gap-4 pt-1 flex-1">
              <h3
                className="font-medium uppercase leading-tight transition-transform duration-300 group-hover:translate-x-2 text-paper-ink"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl opacity-70 text-paper-ink"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>

            {/* Animated Hover Arrow */}
            <ArrowUpRight className="hidden sm:block w-8 h-8 md:w-10 md:h-10 shrink-0 self-center text-transparent -translate-x-3 transition-all duration-300 group-hover:text-ember group-hover:translate-x-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
