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
    <section id="skills" className="py-28 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
            <Cpu className="w-3.5 h-3.5 text-brand-primary" />
            <span>[ 04 ] Competency Architecture</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            Logical Matrix.
          </h2>
        </div>
        <p className="text-white/60 max-w-md font-sans text-xs sm:text-sm leading-relaxed">
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
              <SpotlightCard className="p-7 h-full flex flex-col justify-between bg-[#141416] border-white/8 rounded-3xl">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-editorial text-xl font-black uppercase tracking-wider text-white">
                        {category}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                      {skillsInCategory.length} skills
                    </span>
                  </div>

                  <div className="space-y-4">
                    {skillsInCategory.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                          <span className="text-white/85 font-medium">{skill.name}</span>
                          <span className="text-brand-secondary">{Math.round(skill.level * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-brand-primary to-cyan-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level * 100}%` }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: false }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Domain verified</span>
                  <span className="text-brand-primary font-bold">Active</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
