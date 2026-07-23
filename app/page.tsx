'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Factory, Brain, Cog, BarChart3, Bell, Bot, Sparkles, Workflow, Network, FileText, Zap, Shield, ChevronRight, ArrowRight, Menu, Play, Star, CheckCircle, UserPlus, LogIn, Cpu } from 'lucide-react';

const features = [
  { icon: Factory, title: 'Production Monitoring', desc: 'Live production counts, cycle times, OEE, and line performance in real time.', color: 'emerald', img: '/images/smart_factory.jpg' },
  { icon: Cog, title: 'Machine Intelligence', desc: 'IoT sensor monitoring for temperature, pressure, vibration, torque, and tool wear.', color: 'amber', img: '/images/iot_sensors.jpg' },
  { icon: Brain, title: 'AI Predictions', desc: 'Predict failures, efficiency, downtime, and quality with explainable SHAP AI.', color: 'purple', img: '/images/predictive_maintenance.jpg' },
  { icon: Network, title: 'Deep Learning', desc: 'LSTM, GRU, and Transformer models for time-series forecasting.', color: 'pink', img: '/images/robotics.jpg' },
  { icon: FileText, title: 'NLP Analysis', desc: 'Analyze maintenance reports, extract entities, and summarize incidents.', color: 'emerald', img: '/images/iot_sensors.jpg' },
  { icon: Workflow, title: 'Agentic AI', desc: 'Autonomous agents that monitor, detect, recommend, and act with human-in-the-loop.', color: 'amber', img: '/images/robotics.jpg' },
  { icon: Sparkles, title: 'Generative AI', desc: 'Simulate scenarios, generate synthetic data, and create optimization plans.', color: 'purple', img: '/images/smart_factory.jpg' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'OEE, utilization heatmaps, Pareto charts, and revenue impact analysis.', color: 'lime', img: '/images/predictive_maintenance.jpg' },
  { icon: Bell, title: 'Real-time Alerts', desc: 'Multi-channel alerts via Email, SMS, Push, and WhatsApp.', color: 'rose', img: '/images/iot_sensors.jpg' },
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
      
      {/* Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-white/80 backdrop-blur-md border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-amber-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Factory className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-wide">Factory<span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Mind</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-700">
            <a href="#features" className="hover:text-emerald-700 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How It Works</a>
            <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">Dashboard Console</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5">
              <LogIn className="w-4 h-4" /> Sign In
            </Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-extrabold rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:scale-105 transition-all flex items-center gap-1.5">
              <UserPlus className="w-4 h-4" /> Create Account
            </Link>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-slate-900"><Menu className="w-6 h-6" /></button>
        </div>

        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
            <a href="#features" className="block text-slate-700 font-bold">Features</a>
            <a href="#how-it-works" className="block text-slate-700 font-bold">How It Works</a>
            <Link href="/login" className="block text-slate-700 font-bold">Sign In</Link>
            <Link href="/signup" className="block text-slate-700 font-bold">Sign Up</Link>
            <Link href="/dashboard" className="block px-4 py-2.5 text-center rounded-2xl bg-emerald-600 text-white font-extrabold">Dashboard Console</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-8 shadow-xs">
              <Zap className="w-4 h-4 text-emerald-600 animate-pulse" /> Next-Generation Industrial IoT & Manufacturing Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-slate-900">
              <span>AI That Runs</span><br />
              <span className="bg-gradient-to-r from-emerald-600 via-amber-600 to-purple-600 bg-clip-text text-transparent">Smart Factories</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Autonomous manufacturing process optimization platform competing with Siemens MindSphere, GE Predix, and PTC ThingWorx. Powered by real-time IoT sensors and Deep Learning.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white font-extrabold text-base hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" /> Start Free Account
              </Link>
              <Link href="/login" className="px-8 py-4 rounded-2xl border border-slate-300 bg-white text-slate-800 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" /> Sign In
              </Link>
              <Link href="/dashboard" className="px-8 py-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-extrabold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-emerald-600" /> Explore Live Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent font-mono">{s.value}</div>
                <div className="text-xs font-bold text-slate-500 mt-2">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enterprise Modules Grid */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Enterprise Autonomous Modules</h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto font-medium">End-to-end intelligent automation tailored for smart industrial operations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                    <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-emerald-600 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal mb-4">{f.desc}</p>
                    <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-800">
                      Launch Module <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Four Steps to Autonomous Operations</h2>
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
                <p className="text-slate-600 text-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-amber-500 to-purple-600 p-12 md:p-16 text-center shadow-xl text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Ready to Run Your Factory<br />on Autonomous AI?</h2>
            <p className="text-emerald-50 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">Deploy FactoryMind AI across your manufacturing lines in under 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-base hover:shadow-2xl hover:scale-105 transition-all">
                Create Free Account <ArrowRight className="w-5 h-5 text-emerald-600" />
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-slate-900/40 border border-white/30 text-white font-extrabold text-base hover:bg-slate-900/60 transition-all">
                Launch Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold"><Factory className="w-4 h-4" /></div>
            <span className="font-extrabold text-slate-900 text-lg">Factory<span className="text-emerald-600">Mind</span></span>
          </div>
          <p className="text-slate-500">&copy; 2026 FactoryMind AI Enterprise. All rights reserved.</p>
          <div className="flex gap-4 font-semibold text-slate-600">
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
