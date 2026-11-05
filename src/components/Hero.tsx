/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, Sparkles, Copy, Check, MapPin, Trophy, Code2, Cpu, ArrowUpRight } from 'lucide-react';
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
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-12 overflow-hidden bg-ink text-mist"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Editorial Metadata (Codecuy Style) */}
      <div className="flex justify-between items-center px-6 md:px-12 z-20">
        <span className="text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-[0.25em]">
          Based in Tulungagung, working worldwide
        </span>
        <span className="hidden sm:inline text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-[0.25em]">
          Portfolio / Vol. 26
        </span>
      </div>

      {/* Interactive Three.js 3D Canvas Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[680px] md:h-[680px] z-0 opacity-45 hover:opacity-90 transition-opacity duration-700 pointer-events-auto">
        <ThreeCanvas className="w-full h-full" />
      </div>

      {/* Central Screen-Filling Headline (Codecuy Signature) */}
      <div className="relative z-10 overflow-hidden my-auto py-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[10.5vw] sm:text-[11vw] md:text-[11.5vw] lg:text-[12.5vw] select-none"
        >
          <span className="hero-heading">Hi, i'm </span>
          <span className="heading-ember">alvin</span>
        </motion.h1>

        <div className="text-center mt-3">
          <span className="text-mist/60 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] font-medium">
            Creative Technologist &bull; UI/UX Architect
          </span>
        </div>
      </div>

      {/* Bottom Editorial Bar (Codecuy Style) */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 gap-8">
        
        {/* Left Subhead */}
        <p className="text-mist font-light uppercase tracking-wide leading-snug max-w-[280px] sm:max-w-[340px] text-xs sm:text-sm md:text-base">
          turning ideas into fast, accessible, and polished web interfaces that refuse to blend in.
        </p>

        {/* Center Scroll Indicator */}
        <div className="hidden lg:flex flex-col items-center gap-2 text-mist/40 self-end mb-2">
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a
            href="#contact"
            className="ember-btn inline-flex items-center gap-2 rounded-full text-white font-medium uppercase tracking-widest px-7 py-3 sm:px-9 sm:py-3.5 text-xs sm:text-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Let's work together</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-mist/20 hover:border-mist/50 bg-ink-soft text-mist font-medium uppercase tracking-widest px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-ember" />
            <span>CV</span>
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-mist/20 hover:border-mist/50 bg-ink-soft text-mist font-medium uppercase tracking-widest px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm transition-colors cursor-pointer"
            title="Copy Email Address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-ember" />
                <span>Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Bento Metric Cards */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl w-full mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-ink-soft border border-mist/10 flex items-center justify-between group hover:border-ember/40 transition-colors duration-300"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist/40 block mb-1">
                  {stat.label}
                </span>
                <span className="font-editorial text-2xl font-black text-mist tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-xs text-mist/60 font-light">
                  {stat.desc}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center text-ember group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
