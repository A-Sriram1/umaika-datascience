'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, CheckCircle, Clock, Loader2, Database, Cog, TrendingUp, AlertTriangle, Package, Zap, BarChart3 } from 'lucide-react';
import { generateScenarios } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { sensor_data: Database, breakdown: AlertTriangle, demand: TrendingUp, shortage: Package, optimization: Zap };
const typeColors: Record<string, string> = { sensor_data: '#0ea5e9', breakdown: '#ef4444', demand: '#22c55e', shortage: '#f97316', optimization: '#8b5cf6' };

export default function GenerativePage() {
  const [scenarios, setScenarios] = useState(generateScenarios());
  const [activeId, setActiveId] = useState<string | null>(null);

  const runScenario = (id: string) => {
    setActiveId(id);
    setScenarios(prev => prev.map(s => s.id === id ? { ...s, status: 'generating' as const } : s));
    setTimeout(() => {
      setScenarios(prev => prev.map(s => s.id === id ? {
        ...s, status: 'complete' as const,
        results: { generated: `${Math.floor(Math.random() * 5000 + 1000)} data points`, duration: `${(Math.random() * 3 + 0.5).toFixed(1)}s`, confidence: `${(Math.random() * 10 + 88).toFixed(1)}%`, savings: `$${Math.floor(Math.random() * 50000 + 10000)}/month` }
      } : s));
      setActiveId(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Generative AI</h1><p className="text-slate-500 text-sm mt-1">Simulate scenarios and generate synthetic data</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((s, i) => {
          const Icon = typeIcons[s.type] || Sparkles;
          const color = typeColors[s.type] || '#0ea5e9';
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6 hover:bg-white/[0.06] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div><h3 className="font-semibold text-white">{s.name}</h3><span className="text-xs text-slate-500 capitalize">{s.type.replace('_', ' ')}</span></div>
                </div>
                <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium',
                  s.status === 'complete' ? 'bg-green-500/10 text-green-400' : s.status === 'generating' ? 'bg-orange-500/10 text-orange-400' : 'bg-white/[0.06] text-slate-400')}>
                  {s.status === 'generating' ? <span className="flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Generating</span> :
                    s.status === 'complete' ? <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" />Complete</span> : 'Ready'}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-xs text-slate-500 mb-2">Parameters</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(s.parameters).map(([k, v]) => (
                    <span key={k} className="px-2 py-1 rounded-lg bg-white/[0.04] text-xs text-slate-400"><span className="text-slate-500">{k}:</span> {v}</span>
                  ))}
                </div>
              </div>

              {s.results && (
                <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <h4 className="text-xs text-slate-500 mb-2">Results</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(s.results).map(([k, v]) => (
                      <div key={k}><div className="text-xs text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</div><div className="text-sm font-semibold text-white">{v}</div></div>
                    ))}
                  </div>
                </div>
              )}

              {s.status === 'generating' && (
                <div className="mb-4"><div className="h-2 rounded-full bg-white/[0.06] overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3 }} /></div></div>
              )}

              <button onClick={() => runScenario(s.id)} disabled={s.status === 'generating'}
                className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                <Play className="w-4 h-4" />{s.status === 'complete' ? 'Re-run' : 'Run Simulation'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Simulation Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Generative AI Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Synthetic Data', desc: 'Generate realistic sensor data for model training without compromising real data privacy.', icon: Database, color: '#0ea5e9' },
            { title: 'Scenario Simulation', desc: 'Simulate breakdowns, shortages, and demand spikes to stress-test your factory operations.', icon: Cog, color: '#f97316' },
            { title: 'Optimization Plans', desc: 'AI generates actionable optimization strategies based on current factory state.', icon: BarChart3, color: '#8b5cf6' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-5">
              <c.icon className="w-8 h-8 mb-3" style={{ color: c.color }} />
              <h3 className="font-semibold text-white mb-1">{c.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
