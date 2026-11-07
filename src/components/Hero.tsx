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
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden bg-ink text-mist"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Editorial Metadata (Codecuy Style) */}
      <div className="flex justify-between items-center px-5 sm:px-8 md:px-12 z-20 w-full">
        <span className="text-mist/50 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.12em] sm:tracking-[0.25em] truncate">
          Based in Tulungagung, working worldwide
        </span>
        <span className="hidden sm:inline text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-[0.25em]">
          Portfolio / Vol. 26
        </span>
      </div>

      {/* Interactive Full-Bleed 3D Cyber Wavefield */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-55 hover:opacity-85 transition-opacity duration-700 pointer-events-auto">
        <ThreeCanvas className="w-full h-full" />
      </div>

      {/* Central Screen-Filling Headline (Codecuy Signature) */}
      <div className="relative z-10 overflow-hidden my-auto py-6 sm:py-8 w-full px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase tracking-tight leading-none text-center text-[12.5vw] sm:text-[11vw] md:text-[11.5vw] lg:text-[12.5vw] select-none"
        >
          <span className="hero-heading">Hi, i'm </span>
          <span className="heading-ember">alvin</span>
        </motion.h1>

        <div className="text-center mt-3 sm:mt-4">
          <span className="text-mist/70 font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.14em] sm:tracking-[0.28em] font-medium inline-block max-w-[95vw]">
            Creative Technologist &bull; UI/UX Architect
          </span>
        </div>
      </div>

      {/* Bottom Editorial Bar (Codecuy Style) */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-center md:items-end px-5 sm:px-8 md:px-12 gap-6 sm:gap-8">
        {/* Left Subhead */}
        <p className="text-mist/80 font-light uppercase tracking-wide leading-relaxed max-w-[320px] sm:max-w-[340px] text-xs sm:text-sm md:text-base text-center md:text-left">
          turning ideas into fast, accessible, and polished web interfaces that refuse to blend in.
        </p>

        {/* Center Scroll Indicator */}
        <div className="hidden lg:flex flex-col items-center gap-2 text-mist/40 self-end mb-2">
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Right Action Buttons with Clean Responsive Flex */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="ember-btn inline-flex items-center justify-center gap-2 rounded-full text-white font-medium uppercase tracking-widest px-6 py-3.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg shadow-ember/20"
          >
            <span>Let's work together</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <a
              href="https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-mist/20 hover:border-mist/50 bg-ink-soft text-mist font-medium uppercase tracking-widest px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm transition-colors cursor-pointer text-center"
            >
              <Download className="w-3.5 h-3.5 text-ember" />
              <span>CV</span>
            </a>

            <button
              onClick={copyEmail}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-mist/20 hover:border-mist/50 bg-ink-soft text-mist font-medium uppercase tracking-widest px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm transition-colors cursor-pointer text-center"
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
      </div>

      {/* Bottom Bento Metric Cards */}
      <div className="relative z-10 px-5 sm:px-8 md:px-12 max-w-7xl w-full mx-auto mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
              className={`p-4 sm:p-5 rounded-2xl bg-ink-soft border border-mist/10 flex items-center justify-between group hover:border-ember/40 transition-colors duration-300 ${
                stat.clickable ? 'cursor-pointer active:scale-[0.98]' : ''
              }`}
              title={stat.clickable ? 'Click to view verified awards from CV' : undefined}
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mist/40 truncate">
                    {stat.label}
                  </span>
                  {stat.clickable && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-ember/15 text-ember whitespace-nowrap">
                      View all (4)
                    </span>
                  )}
                </div>
                <span className="font-editorial text-xl sm:text-2xl font-black text-mist tracking-tight block truncate">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-mist/60 font-light block truncate">
                  {stat.desc}
                </span>
              </div>
              <div className="w-10 h-10 shrink-0 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center text-ember group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Verified Awards Modal */}
      <AnimatePresence>
        {awardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl bg-ink-soft border border-mist/20 p-5 sm:p-8 shadow-2xl text-mist"
            >
              <div className="flex items-center justify-between pb-4 border-b border-mist/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-ember/15 border border-ember/30 flex items-center justify-center text-ember">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg sm:text-xl font-bold uppercase tracking-tight text-mist">
                      Honors & Awards
                    </h3>
                    <p className="font-mono text-[10px] sm:text-[11px] text-mist/50 uppercase tracking-wider">
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

              <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {AWARDS_LIST.map((aw, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-ink border border-mist/10 flex items-start justify-between gap-3 hover:border-ember/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-editorial text-sm sm:text-base font-bold text-ember">
                          {aw.rank}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mist/10 text-mist/70">
                          {aw.year}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-mist leading-tight">
                        {aw.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-mist/60 mt-0.5">
                        {aw.organizer}
                      </p>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-mist/40 whitespace-nowrap self-start mt-1 hidden xs:inline">
                      {aw.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3.5 border-t border-mist/10 flex justify-between items-center text-xs">
                <span className="text-mist/50 font-mono text-[10px] sm:text-[11px]">
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
