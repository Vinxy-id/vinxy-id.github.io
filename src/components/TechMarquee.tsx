/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const ROW_1 = [
  { name: 'React', slug: 'react', color: '' },
  { name: 'TypeScript', slug: 'typescript', color: '' },
  { name: 'JavaScript', slug: 'javascript', color: '' },
  { name: 'Next.js', slug: 'nextdotjs', color: 'white' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '' },
  { name: 'Node.js', slug: 'nodedotjs', color: '' },
  { name: 'GraphQL', slug: 'graphql', color: '' },
  { name: 'Vite', slug: 'vite', color: '' },
  { name: 'HTML5', slug: 'html5', color: '' },
  { name: 'CSS3', slug: 'css', color: '' },
];

const ROW_2 = [
  { name: 'Flutter', slug: 'flutter', color: '' },
  { name: 'Dart', slug: 'dart', color: '' },
  { name: 'Three.js', slug: 'threedotjs', color: 'white' },
  { name: 'Figma', slug: 'figma', color: '' },
  { name: 'Git', slug: 'git', color: '' },
  { name: 'Laravel', slug: 'laravel', color: '' },
  { name: 'Python', slug: 'python', color: '' },
  { name: 'Leaflet', slug: 'leaflet', color: '' },
  { name: 'Blender 3D', slug: 'blender', color: '' },
  { name: 'DaVinci Resolve', slug: 'davinciresolve', color: '' },
  { name: 'Vercel', slug: 'vercel', color: 'white' },
];

function BrandTile({ item }: { item: { name: string; slug: string; color: string } }) {
  const src = `https://cdn.simpleicons.org/${item.slug}${item.color ? '/' + item.color : ''}`;
  return (
    <div
      className="shrink-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-mist/10 bg-ink-soft transition-all duration-300 hover:border-ember/40 hover:bg-[#1a1a1e] group"
      style={{ width: '220px', height: '150px' }}
    >
      <img
        src={src}
        alt={item.name}
        loading="lazy"
        className="h-12 w-12 md:h-16 md:w-16 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <span className="font-mono text-[11px] uppercase tracking-wider text-mist/40 group-hover:text-mist transition-colors">
        {item.name}
      </span>
    </div>
  );
}

export default function TechMarquee() {
  const row1Doubled = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2Doubled = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="bg-ink pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative z-0">
      <div className="flex items-center justify-between gap-4 px-6 md:px-12 mb-10 sm:mb-14">
        <span className="text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-[0.3em]">
          Selected frontend work & tools
        </span>
        <span className="text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-[0.3em]">
          2021 to 2026
        </span>
      </div>

      <div className="pause-hover flex flex-col gap-3.5 overflow-hidden relative">
        {/* Row 1 */}
        <div className="relative overflow-hidden w-full flex">
          <div className="animate-marquee flex gap-3.5 pr-3.5">
            {row1Doubled.map((item, idx) => (
              <BrandTile key={`r1-${item.slug}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden w-full flex">
          <div className="animate-marquee-reverse flex gap-3.5 pr-3.5">
            {row2Doubled.map((item, idx) => (
              <BrandTile key={`r2-${item.slug}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Edge fade */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-ink to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-ink to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
