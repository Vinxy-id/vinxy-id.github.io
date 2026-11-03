/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail, Github, Linkedin, ArrowUpRight, Instagram, MapPin } from "lucide-react";

export default function ContactSection() {
  const socials = [
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/alvin-widiantara-041067360/', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com/Vinxy-id', color: 'hover:text-white' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/vinxy.tsx/', color: 'hover:text-pink-400' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:alvinwdntr@gmail.com', color: 'hover:text-brand-primary' },
  ];

  return (
    <section id="contact" className="py-32 px-4 md:px-8 border-t border-theme-border bg-gradient-to-b from-transparent to-brand-primary/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-brand-primary/30 text-brand-primary font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Available for Visionary Projects</span>
          </div>

          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-8">
            Let's build the <br/>
            <span className="text-gradient">unconventional.</span>
          </h2>
          <p className="text-theme-muted max-w-xl mx-auto font-medium text-lg leading-relaxed mb-6">
            Searching for a hybrid designer-developer to push the limits of what's possible in the digital landscape? Reach out and let's start the dialogue.
          </p>
          <div className="inline-flex items-center gap-2 text-theme-dim text-sm font-mono">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span>Tulungagung, Jawa Timur, Indonesia</span>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socials.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-3 px-6 sm:px-8 py-4 glass-panel rounded-2xl border border-theme-border transition-all duration-300 ${social.color} group`}
            >
              {social.icon}
              <span className="font-mono text-xs uppercase tracking-widest">{social.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" 
        />
      </div>
    </section>
  );
}
