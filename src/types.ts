/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link?: string;
  vibe: string;
  details: {
    problem: string;
    solution: string;
    impact: string;
    tech: string[];
  };
}

export interface Skill {
  name: string;
  level: number; // 0 to 1
  category: 'Design' | 'Frontend' | 'Backend' | 'Logic' | 'Production';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
