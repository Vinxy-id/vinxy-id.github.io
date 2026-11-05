/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUpRight, Instagram, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('alvinwdntr@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:alvinwdntr@gmail.com?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Alvin,\n\nMy name is ${formState.name} (${formState.email}).\n\n${formState.message}`)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socials = [
    {
      name: 'LinkedIn',
      handle: 'Alvin Widiantara',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/alvin-widiantara-041067360/',
      color: 'hover:text-blue-400',
    },
    {
      name: 'GitHub',
      handle: '@Vinxy-id',
      icon: Github,
      href: 'https://github.com/Vinxy-id',
      color: 'hover:text-white',
    },
    {
      name: 'Instagram',
      handle: '@vinxy.tsx',
      icon: Instagram,
      href: 'https://www.instagram.com/vinxy.tsx/',
      color: 'hover:text-pink-400',
    },
    {
      name: 'Direct Email',
      handle: 'alvinwdntr@gmail.com',
      icon: Mail,
      href: 'mailto:alvinwdntr@gmail.com',
      color: 'hover:text-brand-primary',
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-30 bg-[#09090b] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-14 px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-36 pb-32 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>[ 05 ] Initiate Collaboration</span>
            </div>
            <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white">
              Let's Connect.
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-xs sm:text-sm leading-relaxed">
            Open for full-stack engineering, high-fidelity UI/UX architectures, or collaborative research. Let's build something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <SpotlightCard className="p-8 bg-[#141416] border-white/10 rounded-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Available for New Ventures & Projects</span>
              </div>

              <h3 className="text-2xl font-editorial font-black uppercase text-white mb-3">
                Reach out directly.
              </h3>
              
              <p className="text-sm text-white/70 leading-relaxed mb-6 font-normal">
                Based in Tulungagung, East Java, collaborating across time zones. Prefer asynchronous communication or direct email.
              </p>

              <div className="flex items-center gap-2 text-xs text-white/60 font-mono mb-8">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Tulungagung, Jawa Timur, Indonesia</span>
              </div>

              {/* Quick Copy Button */}
              <button
                onClick={copyEmail}
                className="w-full py-3.5 px-4 rounded-xl bg-black/50 border border-white/15 flex items-center justify-between text-xs font-mono text-white hover:border-brand-primary/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-primary" />
                  <span>alvinwdntr@gmail.com</span>
                </div>
                <div className="flex items-center gap-1 text-brand-secondary text-[11px]">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </div>
              </button>
            </SpotlightCard>

            {/* Social Channels Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#141416] border border-white/10 hover:border-brand-primary/40 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-5 h-5 text-white/70 ${social.color} transition-colors`} />
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div>
                      <div className="text-sm font-editorial font-bold text-white uppercase">{social.name}</div>
                      <div className="text-[11px] font-mono text-white/50 truncate">{social.handle}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 md:p-10 bg-[#141416] border-white/10 rounded-3xl">
              <h3 className="text-2xl font-editorial font-black uppercase text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mb-8 font-normal">
                Fill out the details below to open a pre-filled direct email message.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Pratama"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Web-GIS Architecture Collaboration"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1.5">
                    Project Brief or Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about what you are looking to create or collaborate on..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/60 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-mono uppercase tracking-wider font-bold text-xs shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <span>Send via Direct Email</span>
                  <Send className="w-4 h-4" />
                </motion.button>

                {submitted && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono text-center">
                    Opening your default mail client with prefilled details...
                  </div>
                )}
              </form>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
}
