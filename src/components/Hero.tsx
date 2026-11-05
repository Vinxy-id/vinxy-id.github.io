/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, Sparkles, Copy, Check, MapPin, Trophy, Code2, Cpu, ExternalLink } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('alvinwdntr@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Award Recognition', value: '1st Place', desc: 'Creative Visual Competition II', icon: Trophy },
    { label: 'Core Engineering', value: 'Informatics', desc: 'Web-GIS & Software Systems', icon: Code2 },
    { label: 'Built Solutions', value: '6+ Live', desc: 'Web-GIS, Flutter, SCM & Games', icon: Cpu },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-28 md:pt-32 pb-16 overflow-hidden bg-[#0c0c0c] text-white">
      {/* Background Subtle Grid & Ambient Aurora Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0c0c0c_85%)] pointer-events-none" />
      
      {/* Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-ember/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Interactive Three.js 3D Canvas Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] z-0 opacity-55 hover:opacity-95 transition-opacity duration-700 pointer-events-auto">
        <ThreeCanvas className="w-full h-full" />
      </div>

      {/* Top Editorial Metadata (Codecuy Style) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-brand-primary" />
          <span>Based in Tulungagung, Working Worldwide</span>
        </div>
        <span>Portfolio / Vol. 26</span>
      </div>

      {/* Central Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-start my-auto">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/90 font-medium">Available for Projects & Engineering</span>
          </div>
        </motion.div>

        {/* Massive Editorial Headline (Kanit) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-left"
        >
          <h1 className="font-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black uppercase tracking-tight leading-[0.88] mb-6">
            <span className="text-silver block">HI, I'M</span>
            <span className="text-white">
              ALVIN <span className="text-gradient">WIDIA</span>NTARA
            </span>
          </h1>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.2em] text-brand-secondary font-medium mb-8">
            <Sparkles className="w-4 h-4 text-brand-primary inline" />
            <span>Creative Technologist & UI/UX Architect</span>
          </div>
        </motion.div>

        {/* Editorial Subheadline & Quick Action Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-end mt-4 pt-6 border-t border-white/10">
          <p className="lg:col-span-7 font-display uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-semibold">
            Turning complex computational logic, geospatial GIS architectures, and gamified systems into fast, accessible, and cinematic web interfaces that refuse to blend in.
          </p>

          <div className="lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-3.5">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-brand-primary hover:bg-blue-600 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-primary/30 hover:scale-105 active:scale-95"
            >
              <span>Explore Works</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-brand-primary" />
              <span>CV</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 font-mono text-xs transition-all duration-300 flex items-center gap-2 hover:border-brand-primary/40 cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bento Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl w-full mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#141416]/80 border border-white/8 backdrop-blur-xl flex items-center justify-between group hover:border-brand-primary/30 transition-all duration-300 shadow-md"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                  {stat.label}
                </span>
                <span className="font-editorial text-2xl font-black text-white tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-xs text-white/60 font-normal">
                  {stat.desc}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
