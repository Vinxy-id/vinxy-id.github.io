/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT, PROJECTS, SKILLS } from "../constants";
import { ChatMessage } from "../types";

let aiInstance: GoogleGenAI | null = null;

export const getGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// Intelligent offline assistant response when API key is unavailable or fails
function getOfflineAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("si-mukti") || q.includes("mukti") || q.includes("gis") || q.includes("genteng") || q.includes("rantai pasok")) {
    return "SI-MUKTI is an integrated multi-stakeholder supply chain platform engineered for the Kebumen tile & Tulungagung marble industries. It integrates Web-GIS geospatial tracking (Leaflet), volumetric AI raw-material analysis, and blockchain-inspired smart contract certification with QR traceability. Built for LKTIN UNIMED 2026!";
  }

  if (q.includes("pantrix") || q.includes("lomba") || q.includes("competition") || q.includes("winner") || q.includes("juara")) {
    return "PANTRIX is a gamified kitchen inventory & meal assistant app built in Flutter. It won 1st Place in Creative Visual Competition II for its fluid interaction design, procedural recipe generation, and sub-60ms response system!";
  }

  if (q.includes("aqualux") || q.includes("renang") || q.includes("swim") || q.includes("landing")) {
    return "AQUALUX is a high-performance modern web platform and booking system for a premier swimming academy. Built with React 19, TypeScript, and Tailwind CSS, it achieved a 98+ Lighthouse performance score and boosted conversions by 60%.";
  }

  if (q.includes("adhigana") || q.includes("game") || q.includes("minigame") || q.includes("logic")) {
    return "Digital Frontier: The Logic Escape is an interactive web minigame built for freshmen informatics orientation (Adhigana 2026), featuring algorithmic problem-solving and simulated security logic checkpoints.";
  }

  if (q.includes("skill") || q.includes("kemampuan") || q.includes("stack") || q.includes("tech")) {
    return "Alvin operates at the sweet spot of design and engineering: UI/UX & Prototyping (Figma, Design Systems), Frontend (React, Next.js, Flutter, TypeScript, Tailwind), Backend (Java, PHP/Laravel, PostgreSQL/PostGIS), and Multimedia (Premiere Pro, After Effects, Motion Graphics).";
  }

  if (q.includes("contact") || q.includes("hubungi") || q.includes("hire") || q.includes("email") || q.includes("cv")) {
    return "You can reach Alvin directly via email at alvinwdntr@gmail.com, on LinkedIn at https://www.linkedin.com/in/alvin-widiantara-041067360/, or download his CV from the button on the top section!";
  }

  if (q.includes("who") || q.includes("siapa") || q.includes("about") || q.includes("tentang") || q.includes("alvin")) {
    return "Alvin Widiantara (Vinxy-ID) is an Informatics student and Creative Technologist based in Tulungagung, Indonesia. He is the winner of Creative Visual Competition II, dedicated to blending deep computational logic with high-fidelity visual aesthetics.";
  }

  return "I'm Alvin's virtual collaborator! I can share details on Alvin's featured projects (SI-MUKTI, PANTRIX, AQUALUX, Digital Frontier), his technical stack (React, Flutter, PostGIS, UI/UX), or connect you directly with him. What would you like to know?";
}

export const chatWithAssistant = async (history: ChatMessage[], message: string) => {
  const ai = getGemini();

  if (!ai) {
    // Provide intelligent offline response
    return getOfflineAnswer(message);
  }
  
  const systemInstruction = `
    You are Alvin Widiantara's Virtual Assistant.
    Your tone is professional, technical, yet creative, confident, and approachable.
    You answer questions about Alvin's work, experience, skills, and projects using the context provided.
    Context: ${RESUME_CONTEXT}
    Never use unicode emojis in your responses. Keep responses clean, concise, and structured.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || getOfflineAnswer(message);
  } catch (error) {
    console.warn("Gemini API fallback to offline logic:", error);
    return getOfflineAnswer(message);
  }
};
