/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { SKILLS } from "../constants";

export default function SkillGalaxy() {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-24 px-4 overflow-hidden bg-theme-bg/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-mono text-brand-secondary text-sm uppercase tracking-widest block mb-4">Competency Map</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">Logical Architecture.</h2>
          <p className="text-theme-muted max-w-xl mx-auto font-medium">
            Bridging the gap between creative visual execution and robust programming methodologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border border-theme-border relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tighter transition-colors group-hover:text-brand-secondary text-theme-text">
                  {category}
                </h3>
                <div className="space-y-6">
                  {SKILLS.filter(s => s.category === category).map((skill, i) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-theme-dim">{skill.name}</span>
                        <span className="font-mono text-[10px] text-theme-muted">{(skill.level * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-1 w-full bg-theme-bg/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level * 100}%` }}
                          transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`h-full ${catIdx % 2 === 0 ? 'bg-brand-primary' : 'bg-brand-secondary'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Background accent */}
              <div className={`absolute top-0 right-0 w-48 h-48 blur-[100px] opacity-10 pointer-events-none ${catIdx % 2 === 0 ? 'bg-brand-primary' : 'bg-brand-secondary'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
