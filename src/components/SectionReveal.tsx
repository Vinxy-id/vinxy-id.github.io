/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: 'blur(8px)',
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
      }}
      viewport={{
        once: false, // Animate out when section is scrolled out of view!
        amount: 0.08,
        margin: '-60px 0px -60px 0px',
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1], // High-grade spring easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
