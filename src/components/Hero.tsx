/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowDown, Download, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale brightness-50"
        >
          <source src="https://cdn.pixabay.com/video/2023/10/20/185852-876774435_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-theme-bg/80 via-theme-bg/50 to-theme-bg" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-primary/30 text-brand-primary text-xs font-mono uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          <span>Creative Visual Competition II Winner</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
          ALVIN <span className="text-brand-primary">WIDIA</span>NTARA
        </h1>
        
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-theme-dim font-medium leading-relaxed mb-10">
          The intersection of <span className="text-theme-text font-bold">Aesthetic Sensation</span> and <span className="text-theme-text font-bold">Technical Logic</span>. 
          Designing high-fidelity UI/UX, architecting Web-GIS platforms, and engineering robust Informatics solutions.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-full bg-brand-primary text-black font-semibold text-sm tracking-wide shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-shadow cursor-pointer"
          >
            Explore Projects
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full glass-panel border border-theme-border text-theme-text font-medium text-sm tracking-wide hover:border-brand-primary/50 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-brand-primary" />
            <span>Download CV</span>
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-theme-muted">Discover Playground</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-brand-primary w-5 h-5" />
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8">
        {['01', '02', '03', '04'].map((num, i) => (
          <div key={num} className="flex flex-col items-center gap-2 group cursor-pointer">
            <span className="font-mono text-[10px] text-theme-muted group-hover:text-brand-primary transition-colors">{num}</span>
            <div className={`w-px h-12 ${i === 0 ? 'bg-brand-primary' : 'bg-theme-border'} group-hover:bg-brand-primary transition-colors`} />
          </div>
        ))}
      </div>
    </section>
  );
}
