/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Layers, Globe, Smartphone, Video, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Layers;
  deliverables: string[];
  techStack: string[];
}

const SERVICES: ServiceItem[] = [
  {
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
    <section id="services" className="py-28 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5 text-brand-primary" />
            <span>Scope & Capabilities</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-theme-text">
            Capabilities.
          </h2>
        </div>
        <p className="text-theme-muted max-w-md font-medium text-sm sm:text-base leading-relaxed">
          End-to-end creative technology solutions tailored to build products with uncompromising visual craft and engineering integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-theme-muted hover:text-brand-primary transition-colors py-1.5 px-3 rounded-full bg-theme-bg/50 border border-theme-border"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-theme-text mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-theme-dim leading-relaxed mb-6 font-normal">
                    {service.tagline}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-xs text-theme-dim">
                        <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-theme-border/60 flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-bg/60 border border-theme-border text-theme-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
