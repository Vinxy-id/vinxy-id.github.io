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
      className="relative z-30 bg-ink text-mist rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-14 px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-36 pb-32 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-mist/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-mist/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-mist/50 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-ember" />
              <span>[ 05 ] Initiate Collaboration</span>
            </div>
            <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-mist">
              Let's Connect.
            </h2>
          </div>
          <p className="text-mist/60 max-w-md font-sans text-xs sm:text-sm leading-relaxed">
            Open for full-stack engineering, high-fidelity UI/UX architectures, or collaborative research. Let's build something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <SpotlightCard className="p-8 bg-ink-soft border border-mist/10 rounded-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Available for New Ventures & Projects</span>
              </div>

              <h3 className="text-2xl font-editorial font-black uppercase text-mist mb-3">
                Reach out directly.
              </h3>
              
              <p className="text-sm text-mist/70 leading-relaxed mb-6 font-normal">
                Based in Tulungagung, East Java, collaborating across time zones. Prefer asynchronous communication or direct email.
              </p>

              <div className="flex items-center gap-2 text-xs text-mist/60 font-mono mb-8">
                <MapPin className="w-4 h-4 text-ember shrink-0" />
                <span>Tulungagung, Jawa Timur, Indonesia</span>
              </div>

              {/* Quick Copy Button */}
              <button
                onClick={copyEmail}
                className="w-full py-3.5 px-4 rounded-xl bg-ink/70 border border-mist/15 flex items-center justify-between text-xs font-mono text-mist hover:border-ember/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-ember" />
                  <span>alvinwdntr@gmail.com</span>
                </div>
                <div className="flex items-center gap-1 text-ember text-[11px]">
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
                    className="p-5 rounded-2xl bg-ink-soft border border-mist/10 hover:border-ember/40 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-5 h-5 text-mist/70 ${social.color} transition-colors`} />
                      <ArrowUpRight className="w-3.5 h-3.5 text-mist/40 group-hover:text-mist group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div>
                      <div className="text-sm font-editorial font-bold text-mist uppercase">{social.name}</div>
                      <div className="text-[11px] font-mono text-mist/50 truncate">{social.handle}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 md:p-10 bg-ink-soft border border-mist/10 rounded-3xl">
              <h3 className="text-2xl font-editorial font-black uppercase text-mist mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-mist/60 mb-8 font-normal">
                Fill out the details below to open a pre-filled direct email message.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-mist/50 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Pratama"
                      className="w-full bg-ink/70 border border-mist/15 rounded-xl px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:outline-none focus:border-ember/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-mist/50 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full bg-ink/70 border border-mist/15 rounded-xl px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:outline-none focus:border-ember/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-mist/50 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Web-GIS Architecture Collaboration"
                    className="w-full bg-ink/70 border border-mist/15 rounded-xl px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:outline-none focus:border-ember/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-mist/50 mb-1.5">
                    Project Brief or Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about what you are looking to create or collaborate on..."
                    className="w-full bg-ink/70 border border-mist/15 rounded-xl px-4 py-3 text-sm text-mist placeholder:text-mist/30 focus:outline-none focus:border-ember/60 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-ember hover:bg-ember-deep text-white font-mono uppercase tracking-wider font-bold text-xs shadow-lg shadow-ember/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
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
