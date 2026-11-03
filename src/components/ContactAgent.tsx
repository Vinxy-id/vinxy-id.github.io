/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, MessageSquare, X, Sparkles } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

export default function ContactAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Alvin's virtual collaborator. How can I help you explore Alvin's work, tech stack, or competition awards today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Tell me about SI-MUKTI',
    'How did Alvin win CVC II?',
    'What tech stack does Alvin use?',
    'How can I contact Alvin?',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg = queryText.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithAssistant(messages, userMsg);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'You can reach Alvin directly via email at alvinwdntr@gmail.com or on LinkedIn!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendQuery(input);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 overflow-hidden relative cursor-pointer ${
            isOpen
              ? 'bg-theme-surface text-theme-text border border-brand-primary/40'
              : 'shimmer-btn text-black'
          }`}
          aria-label="Toggle Virtual Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
              >
                <X className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[440px] h-[580px] z-[100] shadow-2xl"
          >
            <div className="w-full h-full glass-panel border border-brand-primary/30 rounded-3xl flex flex-col overflow-hidden bg-theme-surface/95 backdrop-blur-3xl shadow-2xl">
              {/* Header */}
              <div className="p-5 border-b border-theme-border bg-theme-bg/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-theme-text">
                      Alvin's Portfolio Agent
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                        Virtual Collaborator
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Body */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-transparent to-theme-bg/20"
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[85%] ${
                        m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border text-xs ${
                          m.role === 'user'
                            ? 'bg-theme-bg/20 border-theme-border text-theme-muted'
                            : 'bg-brand-primary/10 border-brand-primary/25 text-brand-primary'
                        }`}
                      >
                        {m.role === 'user' ? (
                          <User className="w-3.5 h-3.5" />
                        ) : (
                          <Bot className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-brand-primary text-black font-medium rounded-tr-none'
                            : 'bg-theme-bg/80 text-theme-text border border-theme-border rounded-tl-none font-normal'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex gap-2.5 max-w-[85%]">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-brand-primary" />
                      </div>
                      <div className="p-3.5 rounded-2xl bg-theme-bg/80 border border-theme-border rounded-tl-none flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-primary" />
                        <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider">
                          Formulating insight...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Suggested Prompt Chips */}
              <div className="px-4 py-2 border-t border-theme-border/60 bg-theme-bg/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0 mr-1" />
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendQuery(prompt)}
                    disabled={isLoading}
                    className="shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full bg-theme-surface border border-theme-border hover:border-brand-primary/40 text-theme-dim hover:text-brand-primary transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-theme-border bg-theme-bg/50">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about Alvin's projects or skills..."
                    className="w-full bg-theme-surface border border-theme-border rounded-xl px-4 py-3 pr-12 text-xs sm:text-sm text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-brand-primary/60 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 p-2 rounded-lg bg-brand-primary text-black disabled:opacity-40 hover:bg-brand-secondary transition-colors cursor-pointer"
                    aria-label="Send query"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
