/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, Sparkles, Copy, Check, MapPin, Github, Linkedin, Instagram, Trophy, Code2, Cpu } from 'lucide-react';
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
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-28 pb-20">
      {/* Background Subtle Grid & Ambient Aurora Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Radial Mask for Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--bg-color)_80%)] pointer-events-none" />
      
      {/* Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Interactive Three.js 3D Canvas Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[620px] md:h-[620px] z-0 opacity-60 hover:opacity-100 transition-opacity duration-700 pointer-events-auto">
        <ThreeCanvas className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
        
        {/* Availability Badge & Location */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-primary/30 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-theme-text font-medium">Available for Projects & Engineering</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-theme-border text-xs font-mono text-theme-muted">
            <MapPin className="w-3.5 h-3.5 text-brand-primary" />
            <span>Tulungagung, Indonesia</span>
          </div>
        </motion.div>

        {/* Big Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.95] mb-6 text-theme-text drop-shadow-sm">
            ALVIN <span className="text-gradient">WIDIA</span>NTARA
          </h1>

          <div className="inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-mono uppercase tracking-[0.25em] text-brand-secondary font-medium mb-6">
            <Sparkles className="w-4 h-4 text-brand-primary inline" />
            <span>Creative Technologist & UI/UX Architect</span>
          </div>
          
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-theme-dim font-normal leading-relaxed mb-4 px-4">
            The intersection of <span className="text-theme-text font-semibold">Aesthetic Sensation</span> and <span className="text-theme-text font-semibold">Computational Logic</span>. 
            Designing high-fidelity UI/UX, architecting Web-GIS platforms, and engineering fluid applications from prototype to production.
          </p>

          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/70 block mb-10">
            &bull; Interactive 3D Core in background &bull; Drag or move mouse to inspect &bull;
          </span>
        </motion.div>

        {/* Action Buttons & Copy Email Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-full shimmer-btn text-black font-semibold text-sm tracking-wide shadow-lg shadow-brand-primary/25 cursor-pointer"
          >
            Explore Showcase
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full glass-panel border border-theme-border text-theme-text font-medium text-sm tracking-wide hover:border-brand-primary/50 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-brand-primary" />
            <span>Download CV</span>
          </motion.a>

          {/* Quick Copy Email Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={copyEmail}
            className="px-5 py-3.5 rounded-full glass-panel border border-theme-border text-xs font-mono text-theme-dim hover:text-theme-text hover:border-brand-primary/40 transition-all inline-flex items-center gap-2 cursor-pointer"
            title="Click to copy email address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-brand-primary" />
                <span>alvinwdntr@gmail.com</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Quick Stats Bento Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl px-4 pointer-events-auto"
        >
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="glass-panel p-5 rounded-2xl border border-theme-border text-left relative overflow-hidden group hover:border-brand-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-brand-primary/70 group-hover:text-brand-primary transition-colors" />
                </div>
                <div className="text-2xl font-display font-bold text-theme-text mb-1">
                  {item.value}
                </div>
                <div className="text-xs text-theme-dim">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Social Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-3 mt-10 pointer-events-auto"
        >
          <a
            href="https://github.com/Vinxy-id"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full glass-panel border border-theme-border flex items-center justify-center text-theme-dim hover:text-white hover:border-brand-primary/50 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/alvin-widiantara-041067360/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full glass-panel border border-theme-border flex items-center justify-center text-theme-dim hover:text-blue-400 hover:border-brand-primary/50 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/vinxy.tsx/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full glass-panel border border-theme-border flex items-center justify-center text-theme-dim hover:text-pink-400 hover:border-brand-primary/50 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </motion.div>

      </div>

      {/* Discover Playground Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-14 z-10 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-theme-muted">
          Explore Works
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="text-brand-primary w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
