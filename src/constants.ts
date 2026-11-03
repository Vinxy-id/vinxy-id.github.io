/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'si-mukti',
    title: 'SI-MUKTI Rantai Pasok',
    description: 'Integrated multi-stakeholder supply chain platform with Web-GIS mapping, volumetric AI analysis, and smart contracts.',
    category: 'Architecture',
    tags: ['Web-GIS', 'PostGIS', 'Smart Contract', 'AI Volumetric'],
    image: './assets/projects/si-mukti.jpeg',
    link: 'https://github.com/Vinxy-id/si-mukti',
    vibe: 'Geospatial & Traceability',
    details: {
      problem: 'In the Kebumen & Tulungagung traditional tile and marble industries, supply chain transactions were opaque, quality control lacked digital certification, and logistics tracking was entirely manual.',
      solution: 'Architected an integrated platform combining Leaflet Web-GIS spatial monitoring, volumetric AI raw-material analysis, and blockchain-inspired smart contract certification with QR traceability.',
      impact: 'Created for LKTIN UNIMED 2026; established end-to-end transparent supply chain tracking and reduced manual verification overhead by 45%.',
      tech: ['React', 'Leaflet Web-GIS', 'PostgreSQL PostGIS', 'Python AI', 'Tailwind CSS'],
    }
  },
  {
    id: 'pantrix',
    title: 'PANTRIX Smart Assistant',
    description: 'A revolutionary gamified meal planner and kitchen inventory assistant app with procedural recipe generation.',
    category: 'Game / Tool',
    tags: ['Flutter', 'Mobile UX', 'Gamification', 'Winner CVC II'],
    image: './assets/projects/pantrix.png',
    link: 'https://github.com/Vinxy-id/Pantrix',
    vibe: 'Gamified Utility',
    details: {
      problem: 'Standard grocery and meal tracking apps suffer from tedious manual data entry, clinical interfaces, and quick user drop-off.',
      solution: 'Engineered a high-fidelity interaction system using Flutter featuring dynamic pantry gamification, expiry alert pipelines, and smart recipe generation.',
      impact: 'Won 1st Place in Creative Visual Competition II for innovative UI/UX architecture and fluid interaction design.',
      tech: ['Flutter', 'Dart', 'Figma', 'Custom Shaders'],
    }
  },
  {
    id: 'aqualux',
    title: 'AQUALUX Platform',
    description: 'High-conversion responsive web platform and enrollment system for premier athletic swimming academy.',
    category: 'Architecture',
    tags: ['React 19', 'TypeScript', 'Landing Page', 'SEO Optimization'],
    image: './assets/projects/aqualux.webp',
    link: 'https://github.com/Vinxy-id/Aqualux',
    vibe: 'Fluid Conversion',
    details: {
      problem: 'Athletic training academies face low digital conversions due to cluttered registration forms and poor mobile responsive layouts.',
      solution: 'Designed and implemented a high-performance landing experience with interactive program selectors, seamless WhatsApp direct lead routing, and audited SEO tags.',
      impact: 'Achieved a 98+ Lighthouse performance score and boosted lead inquiries by 60%.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
    }
  },
  {
    id: 'adhigana',
    title: 'Digital Frontier: The Logic Escape',
    description: 'Interactive case-study web minigame designed for freshmen orientation featuring algorithmic problem-solving.',
    category: 'Technical',
    tags: ['JavaScript', 'Logic Puzzles', 'Gamification', 'Freshmen Onboarding'],
    image: './assets/projects/adhigana.png',
    link: 'https://github.com/Vinxy-id/adhigana-studi-kasus',
    vibe: 'Algorithmic Escape',
    details: {
      problem: 'Traditional collegiate orientations convey core computational logic through passive slides, resulting in low comprehension and student fatigue.',
      solution: 'Created an interactive 4-stage logic puzzle minigame where teams decipher algorithmic clues and simulated security gates in real time.',
      impact: 'Successfully onboarded 200+ freshmen with over 94% puzzle completion rate and stellar engagement feedback.',
      tech: ['JavaScript ES6+', 'HTML5 Canvas', 'CSS Glassmorphism'],
    }
  },
  {
    id: 'web-scm',
    title: 'Web SCM Marmer Tulungagung',
    description: 'End-to-end industrial supply chain management system tracking raw stone quarrying through refined marble delivery.',
    category: 'Architecture',
    tags: ['Laravel', 'PostgreSQL', 'SCM', 'Industrial IT'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    link: 'https://github.com/Vinxy-id/web-scm-marmer',
    vibe: 'Industrial Precision',
    details: {
      problem: 'Marble manufacturers operated with siloed paper logs for quarry extraction, cutting, polishing, and multi-tier distributor orders.',
      solution: 'Built a centralized supply chain system with real-time stock balance recalculations, automated dispatch notes, and role-based access control.',
      impact: 'Unified 3 quarrying centers and reduced inventory discrepancy to under 1%.',
      tech: ['PHP', 'Laravel', 'PostgreSQL', 'Tailwind CSS', 'Alpine.js'],
    }
  },
  {
    id: 'creative-motion',
    title: 'Cinematic & Motion Visuals',
    description: 'Dynamic video production, motion graphics, and commercial teasers tailored for digital storytelling.',
    category: 'Creative',
    tags: ['After Effects', 'Premiere Pro', 'Motion Design', 'Color Grading'],
    image: './assets/adobe.jpeg',
    vibe: 'Cinematic Rhythm',
    details: {
      problem: 'Digital content needs immediate visual impact within seconds to maintain viewer retention in high-velocity social environments.',
      solution: 'Produced fast-paced video edits with synced sound design, custom kinetic typography, and calibrated LUTs for commercial and community campaigns.',
      impact: 'Generated tens of thousands of views and reinforced brand recognition for creative and academic events.',
      tech: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Illustrator'],
    }
  }
];

export const SKILLS: Skill[] = [
  { name: 'UI/UX Design & Prototyping', level: 0.95, category: 'Design' },
  { name: 'Visual Identity & Branding', level: 0.92, category: 'Design' },
  { name: 'Motion Design', level: 0.90, category: 'Design' },
  { name: 'Design Systems', level: 0.92, category: 'Design' },
  { name: 'React / Next.js', level: 0.92, category: 'Frontend' },
  { name: 'Flutter Web & Mobile', level: 0.90, category: 'Frontend' },
  { name: 'TypeScript', level: 0.88, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 0.95, category: 'Frontend' },
  { name: 'Java / Informatics', level: 0.85, category: 'Backend' },
  { name: 'PHP / Laravel', level: 0.82, category: 'Backend' },
  { name: 'PostgreSQL & PostGIS', level: 0.84, category: 'Backend' },
  { name: 'Algorithm & Data Structures', level: 0.90, category: 'Logic' },
  { name: 'Geospatial Web-GIS', level: 0.88, category: 'Logic' },
  { name: 'Video Editing & Montages', level: 0.92, category: 'Production' },
  { name: 'Motion Graphics', level: 0.90, category: 'Production' },
  { name: 'Color Grading & Audio Sync', level: 0.86, category: 'Production' },
];

export const RESUME_CONTEXT = `
Alvin Widiantara (Vinxy-ID) is an Informatics student, Creative Technologist, and UI/UX Architect based in Tulungagung, Indonesia.
He is the Winner of Creative Visual Competition II.
His superpower is the intersection of high-fidelity aesthetic sensation and deep technical engineering logic.

Key Featured Projects:
1. SI-MUKTI Rantai Pasok: Multi-stakeholder supply chain platform combining Web-GIS geospatial mapping, AI volumetric analysis, and smart contracts for traditional industries (LKTIN UNIMED 2026).
2. PANTRIX Smart Assistant: Gamified pantry & meal planning assistant app with sub-60ms interaction speed, built in Flutter. Won 1st Place in Creative Visual Competition II.
3. AQUALUX Platform: Premier swimming academy web app with responsive booking flows, modern design, and 98+ Lighthouse SEO.
4. Digital Frontier: The Logic Escape: Interactive puzzle minigame designed for new informatics students' orientation (Adhigana 2026).
5. Web SCM Marmer Tulungagung: Full-scale supply chain management system with real-time inventory tracking for marble quarrying.
6. Cinematic & Motion Visuals: Commercial teasers, short-form reels, and brand identity showreels.

Skills:
- Design: UI/UX, Design Systems, Figma, Wireframing, Motion Design
- Frontend: React, Next.js, Flutter, TypeScript, Tailwind CSS, HTML5/CSS3
- Backend & Data: Java, PHP/Laravel, PostgreSQL, PostGIS, Python AI, REST APIs
- Production: Premiere Pro, After Effects, DaVinci Resolve, Motion Graphics

Contact:
- Email: alvinwdntr@gmail.com
- GitHub: https://github.com/Vinxy-id
- LinkedIn: https://www.linkedin.com/in/alvin-widiantara-041067360/
- Instagram: https://www.instagram.com/vinxy.tsx/
- TikTok: https://www.tiktok.com/@vinxy070
- CV Link: https://drive.google.com/file/d/1vb6B6eImfRekznyv7Lk09GXOaYVk4aG0/view?usp=drive_link
`;
