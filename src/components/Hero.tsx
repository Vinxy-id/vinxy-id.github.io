/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  Download,
  Copy,
  Check,
  Trophy,
  Code2,
  Cpu,
  ArrowUpRight,
  X,
  Award,
} from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

const AWARDS_LIST = [
  {
    rank: 'Top 4 Finalist',
    title: 'National Business Case BMNC 2026',
    organizer: 'FEB Universitas Airlangga x BMN Institute',
    year: '2026',
    tag: 'Strategic Case & EV Study',
  },
  {
    rank: '1st Place Winner',
    title: 'Embun Theater Festival 2024',
    organizer: 'Universitas Bhinneka PGRI',
    year: '2024',
    tag: 'Juara 1 Film Pendek',
  },
  {
    rank: '2nd Place Winner',
    title: 'Creative Visual Competition 2025',
    organizer: 'Universitas Surabaya (UBAYA)',
    year: '2025',
    tag: 'Juara 2 Film Pendek',
  },
  {
    rank: 'Best Actor & Script',
    title: 'Inhum Dhipotion Showcase 2024',
    organizer: 'Arts & Cultural Committee',
    year: '2024',
    tag: 'Double Category Winner',
  },
];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [awardModalOpen, setAwardModalOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('alvinwdntr@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      label: 'Award Recognition',
      value: 'Top 4 Finalist',
      desc: 'National Business Case · FEB UNAIR',
      icon: Trophy,
      clickable: true,
    },
    {
      label: 'Core Engineering',
      value: 'Informatics',
      desc: 'Web-GIS & Software Systems',
      icon: Code2,
      clickable: false,
    },
    {
      label: 'Built Solutions',
      value: '6+ Live',
      desc: 'Web-GIS, Flutter, SCM & Games',
      icon: Cpu,
      clickable: false,
    },
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

      {/* Interactive Full-Bleed 3D Cyber Wavefield */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-60 hover:opacity-90 transition-opacity duration-700 pointer-events-auto">
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
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
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
              onClick={() => {
                if (stat.clickable) {
                  setAwardModalOpen(true);
                }
              }}
              className={`p-5 rounded-2xl bg-ink-soft border border-mist/10 flex items-center justify-between group hover:border-ember/40 transition-colors duration-300 ${
                stat.clickable ? 'cursor-pointer' : ''
              }`}
              title={stat.clickable ? 'Click to view verified awards from CV' : undefined}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mist/40">
                    {stat.label}
                  </span>
                  {stat.clickable && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-ember/15 text-ember">
                      View all (4)
                    </span>
                  )}
                </div>
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

      {/* Verified Awards Modal */}
      <AnimatePresence>
        {awardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl bg-ink-soft border border-mist/20 p-6 sm:p-8 shadow-2xl text-mist"
            >
              <div className="flex items-center justify-between pb-4 border-b border-mist/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-ember/15 border border-ember/30 flex items-center justify-center text-ember">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold uppercase tracking-tight text-mist">
                      Honors & Awards
                    </h3>
                    <p className="font-mono text-[11px] text-mist/50 uppercase tracking-wider">
                      Verified from Official CV
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAwardModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-mist/15 flex items-center justify-center text-mist/60 hover:text-mist hover:border-mist/40 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {AWARDS_LIST.map((aw, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-ink border border-mist/10 flex items-start justify-between gap-3 hover:border-ember/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-editorial text-base font-bold text-ember">
                          {aw.rank}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mist/10 text-mist/70">
                          {aw.year}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-mist leading-tight">
                        {aw.title}
                      </h4>
                      <p className="text-xs text-mist/60 mt-0.5">
                        {aw.organizer}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-mist/40 whitespace-nowrap self-start mt-1">
                      {aw.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-mist/10 flex justify-between items-center text-xs">
                <span className="text-mist/50 font-mono text-[11px]">
                  Total 4 competitive honors
                </span>
                <button
                  onClick={() => setAwardModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-ember text-white font-medium uppercase tracking-wider text-[11px] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
