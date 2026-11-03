/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SKILLS } from '../constants';
import { Cpu, Terminal, Palette, Code, Film } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function SkillGalaxy() {
  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));

  const categoryIcons: Record<string, typeof Cpu> = {
    Design: Palette,
    Frontend: Code,
    Backend: Terminal,
    Logic: Cpu,
    Production: Film,
  };

  return (
    <section id="skills" className="py-28 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5 text-brand-primary" />
            <span>Editorial Competency Architecture</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-theme-text">
            Logical Matrix.
          </h2>
        </div>
        <p className="text-theme-muted max-w-md font-medium text-sm sm:text-base leading-relaxed">
          Structured mapping of software engineering competencies, spatial frameworks, and creative design tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, catIdx) => {
          const Icon = categoryIcons[category] || Cpu;
          const skillsInCategory = SKILLS.filter((s) => s.category === category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: catIdx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <SpotlightCard className="p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-theme-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-wider text-theme-text">
                        {category}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-theme-muted">
                      {skillsInCategory.length} skills
                    </span>
                  </div>

                  <div className="space-y-5">
                    {skillsInCategory.map((skill, i) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-theme-text">{skill.name}</span>
                          <span className="font-mono text-[11px] text-theme-muted">
                            {(skill.level * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-theme-bg/80 rounded-full overflow-hidden border border-theme-border/40">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level * 100}%` }}
                            transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-theme-border/40 flex items-center justify-between text-[11px] font-mono text-theme-muted">
                  <span>Domain verified</span>
                  <span className="text-brand-primary font-semibold">Active</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
