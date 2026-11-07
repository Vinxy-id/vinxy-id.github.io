/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const currentTheme =
      savedTheme ||
      (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ||
      'dark';

    setTheme(currentTheme);
    applyTheme(currentTheme);
  }, []);

  const applyTheme = (nextTheme: 'dark' | 'light') => {
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new CustomEvent('themechange', { detail: nextTheme }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-[84px] sm:w-[96px] h-8 rounded-full border border-mist/15 bg-ink-soft/60" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full border border-mist/20 bg-ink-soft/80 backdrop-blur-md text-mist hover:border-ember/60 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_16px_rgba(255,90,31,0.22)] select-none"
      title={`Aktifkan mode ${theme === 'dark' ? 'Terang (Light)' : 'Gelap (Dark)'}`}
      aria-label={`Toggle Theme. Mode aktif: ${theme}`}
    >
      {/* Sliding Capsule Toggle with Vector Sun / Moon */}
      <div className="relative flex items-center bg-black/20 dark:bg-black/30 rounded-full p-0.5 border border-mist/10">
        <span
          className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-200 ${
            theme === 'light' ? 'text-white' : 'text-mist/40 group-hover:text-mist/70'
          }`}
        >
          <Sun className="w-3 h-3" />
        </span>

        <span
          className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-mist/40 group-hover:text-mist/70'
          }`}
        >
          <Moon className="w-3 h-3" />
        </span>

        {/* Animated Active Pill Indicator */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className={`absolute top-0.5 bottom-0.5 w-5 rounded-full bg-ember shadow-sm shadow-ember/40 ${
            theme === 'light' ? 'left-0.5' : 'left-[calc(100%-22px)]'
          }`}
        />
      </div>

      {/* Monospace Mode Label */}
      <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-mist/70 group-hover:text-mist font-semibold pr-1 transition-colors">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </motion.button>
  );
}
