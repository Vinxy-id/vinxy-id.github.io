/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2, MessageSquare, X } from "lucide-react";
import { chatWithAssistant } from "../services/geminiService";
import { ChatMessage } from "../types";

export default function ContactAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm Alvin's virtual collaborator. How can I help you today? I can answer questions about Alvin's projects, informatics background, or design skills." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithAssistant(messages, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had a connection hiccup. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-500 overflow-hidden relative group ${isOpen ? 'bg-theme-bg text-theme-text border border-theme-border' : 'bg-brand-primary text-black'}`}
        >
          <div className="absolute inset-0 bg-brand-primary/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-500" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <MessageSquare className="w-8 h-8" />
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
            className="fixed bottom-28 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[450px] h-[600px] z-[100] shadow-2xl"
          >
            <div className="w-full h-full glass-panel border border-theme-border rounded-3xl flex flex-col overflow-hidden bg-theme-glass backdrop-blur-3xl">
              {/* Header */}
              <div className="p-6 border-b border-theme-border bg-theme-bg/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                  <Bot className="w-7 h-7 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Alvin's Portfolio Agent</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">Active & Thinking</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-theme-bg/5"
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border ${m.role === 'user' ? 'bg-theme-bg/10 border-theme-border' : 'bg-brand-primary/10 border-brand-primary/20'}`}>
                        {m.role === 'user' ? <User className="w-4 h-4 text-theme-muted" /> : <Bot className="w-4 h-4 text-brand-primary" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-theme-bg/5 text-theme-text rounded-tr-none' : 'bg-brand-primary/5 text-theme-text border border-theme-border rounded-tl-none'}`}>
                        {m.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-brand-primary" />
                      </div>
                      <div className="p-4 rounded-2xl bg-brand-primary/5 border border-theme-border rounded-tl-none flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                        <span className="text-xs font-mono text-theme-muted uppercase tracking-widest">Processing</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-theme-border bg-theme-bg/5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about Alvin's skills..."
                    className="w-full bg-theme-bg/40 border border-theme-border rounded-2xl px-6 py-4 pr-14 text-sm text-theme-text focus:outline-none focus:border-brand-primary/50 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-3 rounded-xl bg-brand-primary text-white disabled:opacity-50 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-4 flex justify-between px-2">
                   <p className="text-[10px] text-theme-muted font-mono uppercase tracking-[0.2em]">Powered by Gemini 3</p>
                   <p className="text-[10px] text-theme-muted font-mono uppercase tracking-[0.2em]">Designer-Developer Agent</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
