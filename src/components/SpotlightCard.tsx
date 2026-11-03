/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.15)',
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-theme-border bg-theme-surface/70 backdrop-blur-xl overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Spotlight Flashlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity,
          border: '1px solid rgba(96, 165, 250, 0.3)',
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.2), transparent 40%)`,
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
