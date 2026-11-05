/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TechItem {
  name: string;
  category: string;
  slug: string;
  color: string;
}

const ROW_1: TechItem[] = [
  { name: 'React 19', category: 'Frontend', slug: 'react', color: '61DAFB' },
  { name: 'TypeScript', category: 'Language', slug: 'typescript', color: '3178C6' },
  { name: 'Flutter', category: 'Mobile UI', slug: 'flutter', color: '02569B' },
  { name: 'PostGIS / Postgres', category: 'Geospatial DB', slug: 'postgresql', color: '4169E1' },
  { name: 'Tailwind CSS', category: 'Styling', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Leaflet Web-GIS', category: 'Mapping', slug: 'leaflet', color: '199900' },
  { name: 'Next.js', category: 'Framework', slug: 'nextdotjs', color: 'FFFFFF' },
  { name: 'Python AI', category: 'Intelligence', slug: 'python', color: '3776AB' },
];

const ROW_2: TechItem[] = [
  { name: 'Dart Engine', category: 'Language', slug: 'dart', color: '0175C2' },
  { name: 'Figma Systems', category: 'UI/UX Design', slug: 'figma', color: 'F24E1E' },
  { name: 'Three.js / 3D', category: 'WebGL & Shader', slug: 'threedotjs', color: 'FFFFFF' },
  { name: 'PHP / Laravel', category: 'Enterprise Backend', slug: 'laravel', color: 'FF2D20' },
  { name: 'DaVinci Resolve', category: 'Video Production', slug: 'davinciresolve', color: 'FF2828' },
  { name: 'Blender 3D', category: 'Motion & Assets', slug: 'blender', color: 'F5792A' },
  { name: 'Vite', category: 'Tooling', slug: 'vite', color: '646CFF' },
  { name: 'Git Workflow', category: 'VCS & CI/CD', slug: 'git', color: 'F05032' },
];

function MarqueeCard({ item }: { item: TechItem }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#141416] border border-white/8 hover:border-brand-primary/40 hover:bg-[#1a1a1e] transition-all duration-300 shadow-lg cursor-default group min-w-[210px]">
      <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
        <img
          src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
          alt={item.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-sm text-white group-hover:text-brand-primary transition-colors tracking-tight">
          {item.name}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
          {item.category}
        </span>
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="relative z-0 bg-[#0c0c0c] pt-20 pb-24 overflow-hidden border-t border-white/5">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          <span>[ 01 ] Selected Technologies & Tools</span>
        </div>
        <span>2021 to 2026</span>
      </div>

      {/* Infinite Marquee Rows */}
      <div className="pause-hover flex flex-col gap-4">
        {/* Row 1 - Leftward */}
        <div className="relative overflow-hidden w-full flex">
          <div className="animate-marquee flex gap-4 pr-4">
            {[...ROW_1, ...ROW_1].map((item, idx) => (
              <MarqueeCard key={`row1-${item.name}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 - Rightward */}
        <div className="relative overflow-hidden w-full flex">
          <div className="animate-marquee-reverse flex gap-4 pr-4">
            {[...ROW_2, ...ROW_2].map((item, idx) => (
              <MarqueeCard key={`row2-${item.name}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Soft gradient edge fade */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none z-10" />
    </section>
  );
}
