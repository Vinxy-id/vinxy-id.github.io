/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'wattpulse',
    title: 'WattPulse AI',
    description: 'Indonesian B2B SaaS platform for automatic industrial electricity tariff audits, Permen ESDM No. 28/2016 compliance, multimodal Gemini 3.8 Flash bill OCR, and 24h peak-load shifting simulation.',
    category: 'Energy AI & SaaS',
    tags: ['Next.js 15', 'Gemini 3.8 Flash', 'B2B SaaS', 'Permen ESDM 28/2016'],
    image: './assets/projects/wattpulse-dashboard.png',
    link: 'https://wattpulse-ai.vercel.app',
    vibe: 'Industrial Decarbonization',
    details: {
      problem: 'Indonesian heavy manufacturing, cold storage, and metal workshops suffer from massive kVARh penalty surcharges (up to Rp 48M+/mo) and 1.5x WBP peak-hour electricity tariffs without automated schedule optimization.',
      solution: 'Engineered WattPulse AI with Gemini 3.8 Flash multimodal OCR bill ingestion, 24-hour load shifting simulation, and automated capacitor bank ROI payback modeling.',
      impact: 'Production SaaS deployed on Vercel; successfully models 15-25% electricity bill reductions and 100% compliance with Permen ESDM No. 28/2016.',
      tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Gemini 3.8 Flash', 'Chart.js', 'Vercel'],
    }
  },
  {
    id: 'ecokiln',
    title: 'EcoKiln Venturi Tiudan',
    description: 'Digital Twin 3D CAD & Smart CleanTech IoT system reducing pottery kiln particulate emissions with real-time DLH geospatial monitoring.',
    category: 'Digital Twin & CleanTech',
    tags: ['Digital Twin 3D', 'IoT Telemetry', 'CleanTech', 'LKTIN 2026'],
    image: './assets/projects/ecokiln-live-hero.png',
    link: 'https://eco-kiln-web3d.vercel.app',
    vibe: 'Environmental Precision',
    details: {
      problem: 'Traditional wood-fired pottery kilns in Tiudan, Tulungagung produce heavy particulate emissions (PM2.5/PM10) that exceed national ambient air standards and degrade local air quality.',
      solution: 'Developed an innovative eco-kiln integrated with a Venturi wet scrubber, a 3D Digital Twin exploded CAD assembly, and a real-time DLH geospatial emission telemetry dashboard.',
      impact: 'Authored for LKTIN Bamedan 2026; validated 65%+ particulate reduction efficiency and automated real-time emission compliance for traditional artisans.',
      tech: ['Three.js 3D', 'Digital Twin', 'IoT ESP32', 'React SCADA', 'Tailwind CSS'],
    }
  },
  {
    id: 'si-mukti',
    title: 'SI-MUKTI Rantai Pasok',
    description: 'Integrated multi-stakeholder supply chain platform with Web-GIS mapping, volumetric AI analysis, and smart contracts for quarry minerals.',
    category: 'Spatial Logistics & Web-GIS',
    tags: ['Leaflet Web-GIS', 'PostGIS', 'Smart Contract', 'QR Manifest'],
    image: './assets/projects/simukti-live-map.png',
    link: 'https://si-mukti.vercel.app',
    vibe: 'Geospatial & Traceability',
    details: {
      problem: 'In the Kebumen & Tulungagung traditional tile and marble industries, supply chain transactions were opaque, quality control lacked digital certification, and logistics tracking was entirely manual.',
      solution: 'Architected an integrated platform combining Leaflet Web-GIS spatial monitoring, volumetric AI raw-material analysis, and blockchain-inspired smart contract certification with QR traceability.',
      impact: 'Created for LKTIN UNIMED 2026; established end-to-end transparent supply chain tracking and reduced manual verification overhead by 45%.',
      tech: ['React 19', 'Leaflet Web-GIS', 'PostgreSQL PostGIS', 'Python AI', 'Tailwind CSS'],
    }
  },
  {
    id: 'pantrix',
    title: 'PANTRIX Smart Kitchen Assistant',
    description: 'Winner (Juara 2) Creative Visual Competition II. Gamified kitchen inventory management and procedural recipe assistant with expiry alert pipelines.',
    category: 'Winner CVC II & Mobile UX',
    tags: ['Flutter', 'Mobile UX', 'Gamification', 'Winner CVC II'],
    image: './assets/projects/pantrix-live-hero.png',
    link: 'https://vinxy-id.github.io/Pantrix/',
    vibe: 'Gamified Utility',
    details: {
      problem: 'Household food waste accounts for substantial financial loss, while standard grocery and meal tracking apps suffer from tedious manual data entry, clinical interfaces, and quick user drop-off.',
      solution: 'Engineered a high-fidelity interaction system featuring dynamic pantry gamification, expiry alert pipelines, and smart recipe generation with a live interactive web app.',
      impact: 'Won 2nd Place (Juara 2) in Creative Visual Competition II for innovative UI/UX architecture and fluid interaction design.',
      tech: ['Flutter', 'Dart', 'HTML5/CSS3', 'Figma', 'Mobile UX Design'],
    }
  },
  {
    id: 'peerstack',
    title: 'PeerStack GDGOC ITB',
    description: 'Asynchronous code-review and structured peer-mentoring platform resolving off-class debugging deadlocks for engineering students.',
    category: 'Hackathon & DevTools',
    tags: ['React', 'WebRTC', 'Monaco Editor', 'STACK 2026 GDGOC ITB'],
    image: './assets/projects/peerstack-preview.png',
    link: 'https://github.com/Vinxy-id',
    vibe: 'Collaborative Developer EdTech',
    details: {
      problem: 'Computer science students face insurmountable deadlocks during late-night off-class debugging, where asynchronous communication lacks context and immediate mentoring is unavailable.',
      solution: 'Engineered PeerStack for STACK 2026 Hackathon (GDGOC ITB), featuring interactive code-diff annotations, live syntax diagnostic triage, and peer-mentoring scheduling.',
      impact: 'Submitted for STACK 2026 Case 1 (Smarter Campus and Learning); streamlined student debugging turnaround by over 60%.',
      tech: ['React', 'TypeScript', 'Node.js', 'Monaco Editor', 'Tailwind CSS'],
    }
  },
  {
    id: 'eduboard',
    title: 'EduBoard AI',
    description: 'Adaptive institutional learning management system integrating automated cohort performance analytics and personalized curriculum delivery.',
    category: 'EdTech & Adaptive AI',
    tags: ['React', 'AI Analytics', 'LMS Architecture', 'INOVEST 2026'],
    image: './assets/projects/eduboard-mockup.png',
    link: 'https://github.com/Vinxy-id',
    vibe: 'Adaptive Intelligence',
    details: {
      problem: 'Educational institutions struggle with fragmented academic reporting and delayed intervention for at-risk students across vocational and university programs.',
      solution: 'Created EduBoard AI for INOVEST 2026, delivering unified cohort analytics, proactive academic anomaly alerts, and dynamic modular assessments.',
      impact: 'Presented at INOVEST 2026; validated multi-tenant classroom orchestration and reduced administrative reporting latency by 70%.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Chart.js'],
    }
  },
  {
    id: 'aqualux',
    title: 'AQUALUX Platform',
    description: 'High-conversion responsive web platform and enrollment system for premier athletic swimming academy with interactive curriculum selectors and 98+ Google Lighthouse score.',
    category: 'Production Web',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lighthouse 98+'],
    image: './assets/projects/aqualux-live-hero.png',
    link: 'https://aqualux-delta.vercel.app',
    vibe: 'Fluid Conversion',
    details: {
      problem: 'Athletic training academies face low digital conversions due to cluttered registration forms and poor mobile responsive layouts.',
      solution: 'Designed and implemented a high-performance landing experience with interactive program selectors, seamless WhatsApp direct lead routing, and audited SEO tags.',
      impact: 'Achieved a 98+ Lighthouse performance score, deployed to Vercel production, and boosted lead inquiries by 60%.',
      tech: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Framer Motion', 'Vercel'],
    }
  },
  {
    id: 'adhigana',
    title: 'Digital Frontier: The Logic Escape',
    description: 'Interactive case-study web minigame designed for freshmen orientation featuring algorithmic problem-solving.',
    category: 'Technical Game',
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
    title: 'E-SCM Marmer Tulungagung',
    description: 'Sistem informasi rantai pasok digital terpadu klaster IKM Marmer & Onyx Tulungagung dengan integrasi forecasting ARIMA, katalog multi-filter, dan manajemen SPK produksi.',
    category: 'Enterprise SCM & Cloud',
    tags: ['Laravel 11', 'PostgreSQL', 'Python ARIMA', 'Live VPS'],
    image: './assets/projects/scm-live-hero.png',
    link: 'https://onyxtulungagung.id',
    vibe: 'Industrial E-Supply Chain',
    details: {
      problem: 'Sentra IKM Marmer & Onix Campurdarat menghadapi ketidakpastian stok bahan baku, pencatatan SPK manual, limbah residu yang tidak terukur, dan fluktuasi permintaan musiman tanpa prediksi analitik.',
      solution: 'Membangun arsitektur E-SCM berbasis Laravel 11, integrasi REST API microservice Python ARIMA untuk peramalan permintaan, pelacakan WIP SPK Kanban, dan katalog e-commerce publik.',
      impact: 'Diterapkan secara nyata di sentra IKM Tulungagung (UD Cahaya Onix & UD Putra Abadi); live di VPS DomaiNesia dengan sertifikasi SSL HTTPS di https://onyxtulungagung.id.',
      tech: ['Laravel 11', 'PostgreSQL', 'Python FastAPI', 'ARIMA AI', 'Nginx VPS', 'Tailwind CSS'],
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
