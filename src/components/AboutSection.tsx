/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const ABOUT_TEXT =
  "I'm Alvin Widiantara, an Informatics Engineering student and Creative Technologist who crafts fast, accessible interfaces, geospatial architectures, and gamified digital systems with React, TypeScript, Flutter, and PostGIS. I work best with teams shipping products that need to feel as good as they look. Top 4 Finalist in National Business Case BMNC (FEB UNAIR) and 1st Place Winner in Embun Festival.";

function CharSpan({ char, index, total, scrollProgress }: { char: string; index: number; total: number; scrollProgress: any }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollProgress, [start * 0.8, end * 0.9], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="transition-colors">
      {char}
    </motion.span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const chars = Array.from(ABOUT_TEXT);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-24 sm:py-32 bg-ink text-mist overflow-hidden z-10"
    >
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
          
          {/* Title */}
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>

          {/* Char-by-Char Scroll Illuminated Text */}
          <p
            className="text-mist font-medium text-center leading-relaxed max-w-[640px]"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)' }}
          >
            {chars.map((ch, i) =>
              ch === ' ' ? (
                ' '
              ) : (
                <CharSpan
                  key={i}
                  char={ch}
                  index={i}
                  total={chars.length}
                  scrollProgress={scrollYProgress}
                />
              )
            )}
          </p>

          {/* 3 Giant Metric Numbers in .heading-ember */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-x-16">
            <div className="flex flex-col items-center">
              <span className="heading-ember font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                Top 4
              </span>
              <span className="mt-1 text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-widest text-center">
                Business Case FEB UNAIR
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="heading-ember font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                98+
              </span>
              <span className="mt-1 text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-widest">
                Lighthouse Speed & SEO
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="heading-ember font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                6+
              </span>
              <span className="mt-1 text-mist/50 text-xs sm:text-sm font-medium uppercase tracking-widest">
                Shipped Systems
              </span>
            </div>
          </div>
        </div>

        {/* Ember CTA Pill Button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="ember-btn group inline-flex items-center gap-2 rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm md:text-base transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
        >
          <span>Let's work together</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
