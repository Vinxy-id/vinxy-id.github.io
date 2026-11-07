/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const ROW_1 = [
  { name: 'React', slug: 'react', isMono: false },
  { name: 'TypeScript', slug: 'typescript', isMono: false },
  { name: 'JavaScript', slug: 'javascript', isMono: false },
  { name: 'Next.js', slug: 'nextdotjs', isMono: true },
  { name: 'Tailwind CSS', slug: 'tailwindcss', isMono: false },
  { name: 'PostgreSQL', slug: 'postgresql', isMono: false },
  { name: 'Node.js', slug: 'nodedotjs', isMono: false },
  { name: 'GraphQL', slug: 'graphql', isMono: false },
  { name: 'Vite', slug: 'vite', isMono: false },
  { name: 'HTML5', slug: 'html5', isMono: false },
  { name: 'CSS3', slug: 'css', isMono: false },
];

const ROW_2 = [
  { name: 'Flutter', slug: 'flutter', isMono: false },
  { name: 'Dart', slug: 'dart', isMono: false },
  { name: 'Three.js', slug: 'threedotjs', isMono: true },
  { name: 'Figma', slug: 'figma', isMono: false },
  { name: 'Git', slug: 'git', isMono: false },
  { name: 'Laravel', slug: 'laravel', isMono: false },
  { name: 'Python', slug: 'python', isMono: false },
  { name: 'Leaflet', slug: 'leaflet', isMono: false },
  { name: 'Blender 3D', slug: 'blender', isMono: false },
  { name: 'DaVinci Resolve', slug: 'davinciresolve', isMono: false },
  { name: 'Vercel', slug: 'vercel', isMono: true },
];

function BrandTile({ item }: { item: { name: string; slug: string; isMono: boolean } }) {
  const src = `https://cdn.simpleicons.org/${item.slug}`;
  return (
    <div
      className="shrink-0 flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-mist/10 bg-ink-soft transition-all duration-300 hover:border-ember/40 hover:bg-mist/5 group w-[130px] h-[95px] sm:w-[170px] sm:h-[120px] md:w-[220px] md:h-[150px]"
    >
      <img
        src={src}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className={`h-7 w-7 sm:h-10 sm:w-10 md:h-14 md:w-14 object-contain transition-transform duration-300 group-hover:scale-110 ${
          item.isMono ? 'icon-mono' : ''
        }`}
      />
      <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-mist/40 group-hover:text-mist transition-colors">
        {item.name}
      </span>
    </div>
  );
}

export default function TechMarquee() {
  const row1Doubled = [...ROW_1, ...ROW_1];
  const row2Doubled = [...ROW_2, ...ROW_2];

  return (
    <section className="bg-ink pt-16 sm:pt-28 md:pt-36 pb-8 sm:pb-10 overflow-hidden relative z-0">
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 md:px-12 mb-6 sm:mb-12">
        <span className="text-mist/50 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em]">
          Selected frontend work & tools
        </span>
        <span className="text-mist/50 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em]">
          2021 to 2026
        </span>
      </div>

      <div className="pause-hover flex flex-col gap-2.5 sm:gap-3.5 overflow-hidden relative" style={{ willChange: 'transform' }}>
        {/* Row 1 */}
        <div className="relative overflow-hidden w-full flex">
          <div className="flex gap-2.5 sm:gap-3.5 animate-marquee" style={{ willChange: 'transform' }}>
            {row1Doubled.map((item, idx) => (
              <BrandTile key={`${item.name}-${idx}`} item={item} />
            ))}
          </div>
          <div className="flex gap-2.5 sm:gap-3.5 animate-marquee" aria-hidden="true" style={{ willChange: 'transform' }}>
            {row1Doubled.map((item, idx) => (
              <BrandTile key={`dup-${item.name}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden w-full flex">
          <div className="flex gap-2.5 sm:gap-3.5 animate-marquee-reverse" style={{ willChange: 'transform' }}>
            {row2Doubled.map((item, idx) => (
              <BrandTile key={`${item.name}-${idx}`} item={item} />
            ))}
          </div>
          <div className="flex gap-2.5 sm:gap-3.5 animate-marquee-reverse" aria-hidden="true" style={{ willChange: 'transform' }}>
            {row2Doubled.map((item, idx) => (
              <BrandTile key={`dup-${item.name}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
