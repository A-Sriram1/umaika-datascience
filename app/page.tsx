'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, LayoutGrid, Cpu, Brain, Network, FileText, Bot, 
  Sparkles, Workflow, BarChart3, Bell, Settings, Search, 
  CheckCircle, ArrowRight, Layers, Eye, Play, Sparkle, UserPlus, LogIn
} from 'lucide-react';

const topCategories = [
  { id: 'all', label: 'All' },
  { id: 'production', label: 'Production' },
  { id: 'machines', label: 'IoT Sensors' },
  { id: 'predictions', label: 'AI Predictions' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'agents', label: 'Agentic AI' },
];

const sidebarCategories = [
  { id: 'all', label: 'All Templates', icon: LayoutGrid, count: 12 },
  { id: 'production', label: 'Production Line', icon: Factory, count: 2 },
  { id: 'machines', label: 'Machine IoT Fleet', icon: Cpu, count: 2 },
  { id: 'predictions', label: 'AI Risk Predictions', icon: Brain, count: 1 },
  { id: 'deep-learning', label: 'Deep Learning LSTM', icon: Network, count: 1 },
  { id: 'nlp', label: 'NLP Maintenance', icon: FileText, count: 1 },
  { id: 'assistant', label: 'Copilot Assistant', icon: Bot, count: 1 },
  { id: 'generative', label: 'Generative Digital Twin', icon: Sparkles, count: 1 },
  { id: 'agents', label: 'Agentic Autonomous', icon: Workflow, count: 1 },
  { id: 'analytics', label: 'OEE Analytics', icon: BarChart3, count: 1 },
];

const templates = [
  {
    id: 'base-dashboard',
    title: 'Executive CEO Overview',
    category: 'all',
    tags: ['production', 'analytics'],
    author: 'FactoryMind Core',
    route: '/dashboard',
    img: '/images/smart_factory.jpg',
    desc: 'Real-time OEE gauges, production output streams, 24h forecast, and fleet status matrix.',
  },
  {
    id: 'production-monitoring',
    title: 'Production Line Telemetry',
    category: 'production',
    tags: ['production'],
    author: 'Process Optim',
    route: '/dashboard/production',
    img: '/images/robotics.jpg',
    desc: 'Cycle time tracking, target progress bars, hourly throughput heatmaps, and line efficiency.',
  },
  {
    id: 'machine-fleet',
    title: '18-Sensor Machine IoT',
    category: 'machines',
    tags: ['machines'],
    author: 'IoT Architect',
    route: '/dashboard/machines',
    img: '/images/iot_sensors.jpg',
    desc: 'Live telemetry cards for temperature, pressure, vibration, torque, RUL cycles, and tool wear.',
  },
  {
    id: 'ai-predictions',
    title: 'SHAP Predictive Diagnostics',
    category: 'predictions',
    tags: ['predictions'],
    author: 'ML Engine',
    route: '/dashboard/ai-predictions',
    img: '/images/predictive_maintenance.jpg',
    desc: '72-hour failure probability forecast, SHAP feature importance rankings, and confidence bands.',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic Autonomous Pipeline',
    category: 'agents',
    tags: ['agents', 'robotics'],
    author: 'Autonomous AI',
    route: '/dashboard/agents',
    img: '/images/robotics.jpg',
    desc: 'Monitor → Detect → Recommend → Execute → Learn pipeline with human approval queue.',
  },
  {
    id: 'executive-analytics',
    title: 'Executive OEE & Revenue Analytics',
    category: 'analytics',
    tags: ['analytics'],
    author: 'BI Suite',
    route: '/dashboard/analytics',
    img: '/images/smart_factory.jpg',
    desc: 'Downtime pareto charts, machine fleet utilization, defect breakdown, and cost impact.',
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Time-Series',
    category: 'deep-learning',
    tags: ['predictions'],
    author: 'DeepML',
    route: '/dashboard/deep-learning',
    img: '/images/predictive_maintenance.jpg',
    desc: 'LSTM, GRU, and Transformer neural network models for sensor sequence predictions.',
  },
  {
    id: 'nlp-analysis',
    title: 'NLP Maintenance Log Analyzer',
    category: 'nlp',
    tags: ['analytics'],
    author: 'NLP Suite',
    route: '/dashboard/nlp',
    img: '/images/iot_sensors.jpg',
    desc: 'Extract entities, summarize incident logs, and perform sentiment analysis on reports.',
  },
  {
    id: 'ai-assistant',
    title: 'Industrial Copilot Assistant',
    category: 'assistant',
    tags: ['agents'],
    author: 'Copilot AI',
    route: '/dashboard/assistant',
    img: '/images/smart_factory.jpg',
    desc: 'Interactive LLM assistant to query machine status, troubleshoot errors, and run commands.',
  },
  {
    id: 'generative-ai',
    title: 'Generative Factory Digital Twin',
    category: 'generative',
    tags: ['analytics'],
    author: 'GenAI Studio',
    route: '/dashboard/generative',
    img: '/images/robotics.jpg',
    desc: 'Simulate scenario outcomes, generate synthetic sensor datasets, and test line speed changes.',
  },
  {
    id: 'realtime-alerts',
    title: 'Real-time Alerts & Rules',
    category: 'alerts',
    tags: ['machines'],
    author: 'Alert Engine',
    route: '/dashboard/alerts',
    img: '/images/iot_sensors.jpg',
    desc: 'Multi-channel notifications via Email, SMS, Push, WhatsApp with customizable rule triggers.',
  },
  {
    id: 'user-settings',
    title: 'Account & Factory Settings',
    category: 'settings',
    tags: ['analytics'],
    author: 'User Core',
    route: '/dashboard/settings',
    img: '/images/predictive_maintenance.jpg',
    desc: 'Manage user profile, role permissions, factory plant parameters, and API integration keys.',
  },
];

export default function TemplatePickerPage() {
  const [activeTab, setActiveTab] = useState<'predesigned' | 'blank'>('predesigned');
  const [selectedTopCategory, setSelectedTopCategory] = useState('all');
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t => {
    const matchesTop = selectedTopCategory === 'all' || t.category === selectedTopCategory || t.tags.includes(selectedTopCategory);
    const matchesSidebar = selectedSidebarCategory === 'all' || t.category === selectedSidebarCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTop && matchesSidebar && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* 1. Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">FactoryMind <span className="text-sky-600">Templates</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search templates..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-48 sm:w-64" />
            </div>
            <Link href="/login" className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </Link>
            <Link href="/signup" className="px-4 py-2 text-xs font-extrabold rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-sm flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" /> Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Page Title & Main Tabs (Predesigned vs Blank) */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Pick your template</h1>
          
          {/* Tabs */}
          <div className="inline-flex items-center gap-8 border-b border-slate-200 px-4">
            <button onClick={() => setActiveTab('predesigned')}
              className={`pb-3 text-sm md:text-base font-extrabold transition-all relative ${activeTab === 'predesigned' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'}`}>
              Predesigned templates
              {activeTab === 'predesigned' && <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />}
            </button>
            <button onClick={() => setActiveTab('blank')}
              className={`pb-3 text-sm md:text-base font-extrabold transition-all relative ${activeTab === 'blank' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'}`}>
              Blank templates
              {activeTab === 'blank' && <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />}
            </button>
          </div>
        </div>

        {/* Top Filter Pills Row */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {topCategories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedTopCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                selectedTopCategory === cat.id
                  ? 'bg-sky-500 text-white border border-sky-500 shadow-md shadow-sky-500/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. Main Grid (Left Sidebar + Template Cards Gallery) */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Vertical Sidebar Menu */}
          <div className="md:col-span-1 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">Categories</div>
            {sidebarCategories.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedSidebarCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setSelectedSidebarCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    isSelected
                      ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-sky-200 text-sky-800' : 'bg-slate-100 text-slate-500'}`}>{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* Right Template Cards Gallery */}
          <div className="md:col-span-3 lg:col-span-4">
            
            {activeTab === 'blank' ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-xs">
                <Layers className="w-12 h-12 text-sky-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">Start from a Blank Canvas</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">Build your own custom manufacturing layout from scratch using our drag-and-drop widget library.</p>
                <Link href="/dashboard" className="px-6 py-3 rounded-2xl bg-sky-600 text-white text-xs font-extrabold hover:bg-sky-700 transition-all inline-flex items-center gap-2 shadow-md">
                  Create Blank Template <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredTemplates.map((t, i) => (
                    <motion.div key={t.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                      className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between">
                      
                      {/* Image Preview Box */}
                      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                        <Image src={t.img} alt={t.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Link href={t.route} className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                            <Eye className="w-4 h-4 text-sky-600" /> Preview Template
                          </Link>
                        </div>
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800 border border-slate-200">
                          {t.category.toUpperCase()}
                        </div>
                      </div>

                      {/* Info & Title */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors mb-1.5">{t.title}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{t.desc}</p>
                        </div>

                        {/* Author & Action Button */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-slate-700 block">{t.title}</span>
                            <span className="text-[10px] text-slate-400 font-medium">By {t.author}</span>
                          </div>
                          <Link href={t.route} className="px-4 py-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-extrabold hover:bg-sky-600 hover:text-white transition-all flex items-center gap-1 shadow-2xs">
                            <Play className="w-3.5 h-3.5" /> Use
                          </Link>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-sky-600 flex items-center justify-center text-white font-bold text-xs">F</div>
            <span className="font-bold text-slate-900 text-sm">FactoryMind AI Template Library</span>
          </div>
          <span>&copy; 2026 FactoryMind AI Enterprise. All rights reserved.</span>
          <div className="flex gap-4 font-semibold text-slate-600">
            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
