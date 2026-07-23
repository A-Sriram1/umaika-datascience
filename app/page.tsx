'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Factory, Brain, Cog, BarChart3, Bell, Bot, Sparkles, Workflow, Network, FileText, Zap, Shield, ChevronRight, ArrowRight, Menu, X, Play, Star, CheckCircle } from 'lucide-react';

const features = [
  { icon: Factory, title: 'Production Monitoring', desc: 'Live production counts, cycle times, OEE, and line performance in real time.', color: 'emerald' },
  { icon: Cog, title: 'Machine Intelligence', desc: 'IoT sensor monitoring for temperature, pressure, vibration, torque, and tool wear.', color: 'amber' },
  { icon: Brain, title: 'AI Predictions', desc: 'Predict failures, efficiency, downtime, and quality with explainable SHAP AI.', color: 'purple' },
  { icon: Network, title: 'Deep Learning', desc: 'LSTM, GRU, and Transformer models for time-series forecasting.', color: 'pink' },
  { icon: FileText, title: 'NLP Analysis', desc: 'Analyze maintenance reports, extract entities, and summarize incidents.', color: 'emerald' },
  { icon: Workflow, title: 'Agentic AI', desc: 'Autonomous agents that monitor, detect, recommend, and act with human-in-the-loop.', color: 'amber' },
  { icon: Sparkles, title: 'Generative AI', desc: 'Simulate scenarios, generate synthetic data, and create optimization plans.', color: 'purple' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'OEE, utilization heatmaps, Pareto charts, and revenue impact analysis.', color: 'lime' },
  { icon: Bell, title: 'Real-time Alerts', desc: 'Multi-channel alerts via Email, SMS, Push, and WhatsApp.', color: 'rose' },
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
  emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  amber: 'text-amber-700 bg-amber-50 border-amber-200',
  purple: 'text-purple-700 bg-purple-50 border-purple-200',
  pink: 'text-pink-700 bg-pink-50 border-pink-200',
  lime: 'text-lime-800 bg-lime-50 border-lime-200',
  rose: 'text-rose-700 bg-rose-50 border-rose-200',
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Factory className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-wide">Factory<span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Mind</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#features" className="hover:text-emerald-700 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-emerald-700 transition-colors">Testimonials</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors px-4 py-2">Sign In</Link>
            <Link href="/login" className="px-6 py-2.5 text-sm font-extrabold rounded-xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:scale-105 transition-all">Launch Platform</Link>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-slate-900"><Menu className="w-6 h-6" /></button>
        </div>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
            <a href="#features" className="block text-slate-700 font-semibold">Features</a>
            <a href="#how-it-works" className="block text-slate-700 font-semibold">How It Works</a>
            <Link href="/login" className="block text-slate-700 font-semibold">Sign In</Link>
            <Link href="/login" className="block px-4 py-2.5 text-center rounded-xl bg-gradient-to-r from-emerald-600 to-amber-500 text-white font-extrabold">Launch Platform</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <Zap className="w-4 h-4 text-emerald-600" /> Next-Generation Industrial IoT & Manufacturing Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-slate-900">
              <span>AI That Runs</span><br />
              <span className="bg-gradient-to-r from-emerald-600 via-amber-600 to-purple-600 bg-clip-text text-transparent">Smart Factories</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Autonomous manufacturing process optimization platform competing with Siemens MindSphere, GE Predix, and PTC ThingWorx. Powered by real-time IoT sensors and Deep Learning.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/login" className="px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white font-extrabold text-base hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/dashboard" className="px-9 py-4 rounded-2xl border border-slate-300 bg-slate-50 text-slate-800 font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-emerald-600" /> Explore Live Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent font-mono">{s.value}</div>
                <div className="text-xs font-bold text-slate-500 mt-2">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Enterprise Autonomous Modules</h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto font-medium">End-to-end intelligent automation tailored for smart industrial operations.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              const style = colorMap[f.color] || 'text-emerald-700 bg-emerald-50 border-emerald-200';
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl ${style} border flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Four Steps to Autonomous Operations</h2>
            <p className="mt-4 text-slate-600 text-lg font-medium">Seamless integration from raw sensor stream to automated action.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} className="text-center relative">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-2xl font-black text-emerald-700 font-mono">{s.num}</span>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-slate-200" />}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-amber-500 to-purple-600 p-12 md:p-16 text-center shadow-xl text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Ready to Run Your Factory<br />on Autonomous AI?</h2>
            <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto font-medium">Deploy FactoryMind AI across your manufacturing lines in under 24 hours.</p>
            <Link href="/login" className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Get Started Free <ArrowRight className="w-5 h-5 text-emerald-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center"><Factory className="w-4 h-4 text-white" /></div>
              <span className="font-extrabold text-slate-900 text-lg">Factory<span className="text-emerald-600">Mind</span></span>
            </div>
            <p className="text-xs text-slate-500 font-medium">&copy; 2026 FactoryMind AI Enterprise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
