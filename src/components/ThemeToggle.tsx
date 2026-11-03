/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 md:top-8 md:right-8 z-[1100] w-12 h-12 glass-panel rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden group shadow-lg"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? 0 : 40,
            opacity: theme === 'dark' ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center text-brand-primary"
        >
          <Moon className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            y: theme === 'light' ? 0 : -40,
            opacity: theme === 'light' ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center text-brand-primary"
        >
          <Sun className="w-6 h-6" />
        </motion.div>
      </div>
      
      {/* Tooltip hint */}
      <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  );
}
