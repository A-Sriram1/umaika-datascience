'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Factory, Brain, Cog, BarChart3, Bell, Bot, Sparkles, Workflow, Network, FileText, Zap, Shield, ChevronRight, ArrowRight, Menu, X, Play, Star, CheckCircle } from 'lucide-react';

const features = [
  { icon: Factory, title: 'Production Monitoring', desc: 'Live production counts, cycle times, OEE, and line performance in real time.', color: 'sky' },
  { icon: Cog, title: 'Machine Intelligence', desc: 'IoT sensor monitoring for temperature, pressure, vibration, torque, and tool wear.', color: 'cyan' },
  { icon: Brain, title: 'AI Predictions', desc: 'Predict failures, efficiency, downtime, and quality with explainable SHAP AI.', color: 'violet' },
  { icon: Network, title: 'Deep Learning', desc: 'LSTM, GRU, and Transformer models for time-series forecasting.', color: 'pink' },
  { icon: FileText, title: 'NLP Analysis', desc: 'Analyze maintenance reports, extract entities, and summarize incidents.', color: 'emerald' },
  { icon: Workflow, title: 'Agentic AI', desc: 'Autonomous agents that monitor, detect, recommend, and act with human-in-the-loop.', color: 'orange' },
  { icon: Sparkles, title: 'Generative AI', desc: 'Simulate scenarios, generate synthetic data, and create optimization plans.', color: 'purple' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'OEE, utilization heatmaps, Pareto charts, and revenue impact analysis.', color: 'teal' },
  { icon: Bell, title: 'Real-time Alerts', desc: 'Multi-channel alerts via Email, SMS, Push, and WhatsApp.', color: 'amber' },
];

const stats = [
  { value: '500+', label: 'Factories Powered' },
  { value: '2M+', label: 'Predictions Generated' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '$1.2B', label: 'Manufacturing Value Optimized' },
];

const steps = [
  { num: '01', title: 'Connect IoT Sensors', desc: 'Plug in MQTT, Kafka, ESP32, or industrial sensors seamlessly.' },
  { num: '02', title: 'AI Analyzes Data', desc: 'Our ML models process telemetry streams in real time.' },
  { num: '03', title: 'Predict & Optimize', desc: 'Get actionable predictions on failures, efficiency, and quality.' },
  { num: '04', title: 'Autonomous Ops', desc: 'Agents auto-schedule maintenance and optimize production speed.' },
];

const colorMap: Record<string, string> = {
  sky: 'text-sky-300 bg-sky-500/20 border-sky-500/30',
  cyan: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/30',
  violet: 'text-violet-300 bg-violet-500/20 border-violet-500/30',
  pink: 'text-pink-300 bg-pink-500/20 border-pink-500/30',
  emerald: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30',
  orange: 'text-orange-300 bg-orange-500/20 border-orange-500/30',
  purple: 'text-purple-300 bg-purple-500/20 border-purple-500/30',
  teal: 'text-teal-300 bg-teal-500/20 border-teal-500/30',
  amber: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
};

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#070b19]/90 backdrop-blur-2xl border-b border-sky-500/20 shadow-lg shadow-sky-950/20' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d1f] rounded-[10px] flex items-center justify-center">
                <Factory className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-2xl font-black text-white tracking-wide">Factory<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Mind</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-300 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-cyan-300 transition-colors">Testimonials</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2">Sign In</Link>
            <Link href="/login" className="px-6 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all">Launch Platform</Link>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white"><Menu className="w-6 h-6" /></button>
        </div>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-[#090d1f] border-b border-sky-500/20 px-6 py-4 space-y-3">
            <a href="#features" className="block text-slate-300 font-medium">Features</a>
            <a href="#how-it-works" className="block text-slate-300 font-medium">How It Works</a>
            <Link href="/login" className="block text-slate-300 font-medium">Sign In</Link>
            <Link href="/login" className="block px-4 py-2.5 text-center rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold">Launch Platform</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[140px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] animate-float" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-8 shadow-inner">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" /> Next-Generation Industrial IoT & Manufacturing Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              <span className="text-white">AI That Runs</span><br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">Smart Factories</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Autonomous manufacturing process optimization platform competing with Siemens MindSphere, GE Predix, and PTC ThingWorx. Powered by real-time IoT sensors and Deep Learning.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/login" className="px-9 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-base hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/dashboard" className="px-9 py-4 rounded-2xl border border-sky-500/30 bg-slate-900/60 backdrop-blur-xl text-cyan-300 font-bold hover:bg-sky-500/10 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-cyan-400" /> Explore Live Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 border border-white/10 shadow-xl text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent font-mono">{s.value}</div>
                <div className="text-xs font-semibold text-slate-400 mt-2">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Enterprise Autonomous Modules</h2>
            <p className="mt-4 text-cyan-200/80 text-lg max-w-2xl mx-auto">End-to-end intelligent automation tailored for smart industrial operations.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              const style = colorMap[f.color] || 'text-cyan-300 bg-cyan-500/20 border-cyan-500/30';
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl ${style} border flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-normal">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-transparent via-sky-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Four Steps to Autonomous Operations</h2>
            <p className="mt-4 text-cyan-200/80 text-lg">Seamless integration from raw sensor stream to automated action.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} className="text-center relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400/20 via-cyan-400/20 to-emerald-400/20 border border-cyan-400/40 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/10">
                  <span className="text-2xl font-black text-cyan-300 font-mono">{s.num}</span>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cyan-400/40 to-transparent" />}
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-sky-500/20 via-cyan-500/15 to-purple-500/20 border border-cyan-400/40 p-12 md:p-16 text-center shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Ready to Run Your Factory<br />on Autonomous AI?</h2>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">Deploy FactoryMind AI across your manufacturing lines in under 24 hours.</p>
            <Link href="/login" className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 transition-all">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#03050e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center"><Factory className="w-4 h-4 text-slate-950" /></div>
              <span className="font-extrabold text-white text-lg">Factory<span className="text-cyan-400">Mind</span></span>
            </div>
            <p className="text-xs text-slate-500">&copy; 2026 FactoryMind AI Enterprise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
