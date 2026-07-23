'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Share2, MessageCircle, ArrowRight, CheckCircle, Factory, Brain, Cog, Zap, UserPlus, Globe, Send, Mail } from 'lucide-react';

const categories = [
  { id: '1', title: 'Robotics', img: '/images/robotics.jpg' },
  { id: '2', title: 'IoT Telemetry', img: '/images/iot_sensors.jpg' },
  { id: '3', title: 'Predictive AI', img: '/images/predictive_maintenance.jpg' },
  { id: '4', title: 'Autonomous Ops', img: '/images/smart_factory.jpg' },
  { id: '5', title: 'Deep Learning', img: '/images/robotics.jpg' },
  { id: '6', title: 'Process Control', img: '/images/iot_sensors.jpg' },
];

export default function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-slate-800 font-sans selection:bg-[#1b4d3e] selection:text-white">
      
      {/* 1. Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-serif italic text-[#1b4d3e] font-extrabold tracking-tight">FactoryMind</span>
            <span className="text-xs font-mono font-bold bg-[#1b4d3e] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-[#1b4d3e] border-b-2 border-[#1b4d3e] pb-1 font-bold">Home</Link>
            <a href="#features" className="hover:text-[#1b4d3e] transition-colors">Features</a>
            <a href="#categories" className="hover:text-[#1b4d3e] transition-colors">Categories</a>
            <Link href="/dashboard" className="hover:text-[#1b4d3e] transition-colors">Dashboard Console</Link>
            <Link href="/login" className="hover:text-[#1b4d3e] transition-colors">Sign In</Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search..."
                className="pl-9 pr-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b4d3e]" />
            </div>
            <Link href="/signup" className="px-5 py-2 text-xs font-bold rounded-full bg-[#1b4d3e] text-white hover:bg-[#143c30] transition-all shadow-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Top Carousel Banner */}
      <section className="relative bg-[#1b4d3e] py-10 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/smart_factory.jpg" alt="Background" fill className="object-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-white font-extrabold tracking-tight">AI-Powered Smart Manufacturing Platform</h1>
          <p className="text-emerald-100 text-sm md:text-base mt-2 max-w-2xl mx-auto font-medium">
            Autonomous process optimization, machine failure prediction, and IoT digital twin intelligence.
          </p>
        </div>

        {/* 4 Circle Cards */}
        <div className="relative max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white p-1 shadow-xl bg-white overflow-hidden group-hover:scale-105 transition-transform duration-300 relative">
                <Image src={c.img} alt={c.title} fill className="object-cover rounded-full" />
              </div>
              <span className="mt-3 text-xs md:text-sm font-bold text-white bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-md">{c.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Main Content (Features + Sidebar) */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column (2 Columns in Grid) */}
          <div className="lg:col-span-2 space-y-12">
            
            <div id="features" className="border-b-2 border-[#1b4d3e] pb-2 mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-extrabold text-[#1b4d3e]">Features</h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Smart Factory Intelligence</span>
            </div>

            {/* Feature 1: Image Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm items-center">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md">
                <Image src="/images/predictive_maintenance.jpg" alt="Predictive AI" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Predictive Maintenance & Failure Risk</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Machine learning algorithms monitor rotational speed, torque, air temperature, and tool wear to predict failure probability 72 hours before breakdown.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link href="/dashboard/ai-predictions" className="px-4 py-1.5 text-xs font-bold rounded-md bg-[#e3ebe7] text-[#1b4d3e] hover:bg-[#1b4d3e] hover:text-white transition-colors">
                    Explore Predictions
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 1</span>
                    <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Share</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Image Right */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Real-time IoT Sensor Stream</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Streams 18 live sensor parameters including vibration, pressure, voltage, oil level, and temperature with automated threshold alerting.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link href="/dashboard/machines" className="px-4 py-1.5 text-xs font-bold rounded-md bg-[#e3ebe7] text-[#1b4d3e] hover:bg-[#1b4d3e] hover:text-white transition-colors">
                    Monitor Fleet
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 4</span>
                    <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Share</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative aspect-4/3 rounded-xl overflow-hidden shadow-md">
                <Image src="/images/iot_sensors.jpg" alt="IoT Sensors" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </motion.div>

            {/* 2 Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4 shadow-sm">
                    <Image src="/images/robotics.jpg" alt="Robotics Automation" fill className="object-cover" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-1">Autonomous Robotics Control</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Autonomous agents adjust assembly speeds and load balance across robotic production lines.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link href="/dashboard/agents" className="px-3.5 py-1.5 text-xs font-bold rounded-md bg-[#e3ebe7] text-[#1b4d3e] hover:bg-[#1b4d3e] hover:text-white transition-colors">
                    View Agents
                  </Link>
                  <span className="text-xs text-slate-500">Share</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4 shadow-sm">
                    <Image src="/images/smart_factory.jpg" alt="Smart Factory Optimization" fill className="object-cover" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-1">OEE & Analytics Intelligence</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Track overall equipment effectiveness, downtime pareto breakdown, and revenue impact.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <Link href="/dashboard/analytics" className="px-3.5 py-1.5 text-xs font-bold rounded-md bg-[#e3ebe7] text-[#1b4d3e] hover:bg-[#1b4d3e] hover:text-white transition-colors">
                    View Analytics
                  </Link>
                  <span className="text-xs text-slate-500">Share</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-8">
            
            {/* Newsletter Box */}
            <div className="bg-[#f5ebe6] p-6 rounded-2xl border border-[#e8d5cb] text-center shadow-xs">
              <h3 className="text-lg font-serif font-bold text-[#1b4d3e] mb-2">News Letter</h3>
              <p className="text-xs text-slate-600 mb-4">Get the latest AI manufacturing insights and predictive maintenance reports.</p>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#e2cfc3] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b4d3e] mb-3 text-center" />
              <button className="w-full py-2.5 rounded-full bg-[#1b4d3e] text-white text-xs font-extrabold hover:bg-[#143c30] transition-colors shadow-sm">
                Sign Up
              </button>
            </div>

            {/* Categories / Modules Circle Grid */}
            <div id="categories" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-[#1b4d3e] mb-4 border-b-2 border-[#1b4d3e] pb-1">Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-600 p-0.5 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform">
                      <Image src={cat.img} alt={cat.title} fill className="object-cover rounded-full" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 mt-1.5">{cat.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Us Box */}
            <div className="bg-[#1b4d3e] p-6 rounded-2xl text-white text-center shadow-md">
              <h3 className="text-lg font-serif font-bold mb-4">Follow Us</h3>
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Globe className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Send className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Mail className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><Share2 className="w-4 h-4" /></a>
              </div>
            </div>

          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-serif italic text-base text-[#1b4d3e] font-bold">FactoryMind AI</span>
          <span>&copy; 2026 FactoryMind Enterprise. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-800">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-800">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
