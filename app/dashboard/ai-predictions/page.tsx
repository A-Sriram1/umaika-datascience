'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Brain, TrendingUp, TrendingDown, Minus, Target, Shield, Zap, AlertTriangle, ChevronDown, ChevronUp, Activity, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { generatePredictions, generateTimeSeries } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const tooltipStyle = {
  backgroundColor: 'rgba(13, 19, 36, 0.96)',
  border: '1px solid rgba(16, 185, 129, 0.35)',
  borderRadius: '14px',
  color: '#f8fafc',
  fontSize: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
};
const predColors = ['#10b981', '#f43f5e', '#f59e0b', '#a855f7', '#84cc16', '#34d399', '#fbbf24', '#ec4899'];

export default function AIPredictionsPage() {
  const predictions = useMemo(() => generatePredictions(), []);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = predictions[selectedIdx];
  const trendData = useMemo(() => generateTimeSeries(24, 88, 5, 0.1), []);

  const trendIcon = (t: string) => t === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : t === 'down' ? <TrendingDown className="w-4 h-4 text-rose-400" /> : <Minus className="w-4 h-4 text-slate-400" />;

  const modelMetrics = [
    { label: 'Model Accuracy (AI4I 2020)', value: '94.2%', color: '#34d399' },
    { label: 'Precision Rate', value: '92.8%', color: '#f59e0b' },
    { label: 'Recall Rate', value: '91.5%', color: '#a855f7' },
    { label: 'F1 Score Benchmark', value: '92.1%', color: '#84cc16' },
  ];

  const riskMatrix = [
    ['', '', 'Mill Station 2'],
    ['', 'Press Brake X1', 'CNC Lathe Alpha'],
    ['Conveyor C1', '', ''],
  ];
  const riskColors = [
    ['bg-emerald-500/20 text-emerald-300 border-emerald-500/30', 'bg-amber-500/20 text-amber-300 border-amber-500/30', 'bg-orange-500/20 text-orange-300 border-orange-500/30'],
    ['bg-amber-500/20 text-amber-300 border-amber-500/30', 'bg-orange-500/20 text-orange-300 border-orange-500/30', 'bg-rose-500/30 text-rose-300 border-rose-500/40'],
    ['bg-orange-500/20 text-orange-300 border-orange-500/30', 'bg-rose-500/30 text-rose-300 border-rose-500/40', 'bg-rose-600/40 text-rose-200 border-rose-500/50'],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/15 via-amber-500/10 to-purple-500/15 p-6 rounded-3xl border border-emerald-500/30 backdrop-blur-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Prediction & Forecasting Engine</h1>
          <p className="text-emerald-200/90 text-sm mt-1 font-medium">Explainable Machine Learning predictions grounded in industrial benchmark datasets</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-md shadow-emerald-500/20">
          <CheckCircle className="w-4 h-4" />
          <span>94.2% AI Model Accuracy</span>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictions.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedIdx(i)}
            className={cn('rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl p-5 cursor-pointer transition-all hover:scale-102 border shadow-xl',
              selectedIdx === i ? 'border-emerald-400/60 ring-2 ring-emerald-400/30 shadow-emerald-500/20' : 'border-white/10 hover:border-emerald-500/30')}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.title}</span>
              {trendIcon(p.trend)}
            </div>
            <div className="text-3xl font-black text-white tracking-tight mb-3 font-mono">{p.value}</div>
            <div className="flex items-center justify-between">
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mr-3">
                <div className="h-full rounded-full" style={{ width: `${p.confidence * 100}%`, backgroundColor: predColors[i] }} />
              </div>
              <span className="text-xs font-bold text-emerald-300 font-mono">{(p.confidence * 100).toFixed(0)}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explainable AI */}
      <AnimatePresence mode="wait">
        <motion.div key={selectedIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/30 p-6 shadow-2xl">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <Brain className="w-5.5 h-5.5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Explainable AI (XAI) — {selected.title}</h2>
              <p className="text-xs font-semibold text-emerald-300">SHAP Feature Importance & Attribution Score: {(selected.confidence * 100).toFixed(1)}%</p>
            </div>
          </div>
          <p className="text-sm text-slate-200 mb-6 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5">{selected.explanation}</p>
          <h3 className="text-sm font-bold text-white mb-3">Feature Importance Hierarchy</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={selected.features} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} tickLine={false} width={150} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                {selected.features.map((f, i) => <Cell key={i} fill={f.direction === 'positive' ? '#10b981' : '#f59e0b'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      {/* Prediction vs Actual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">Prediction vs Actual Benchmark Stream</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="predActGradEmerald" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              <linearGradient id="confBandAmber" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#confBandAmber)" />
            <Area type="monotone" dataKey="lower" stroke="transparent" fill="transparent" />
            <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#predActGradEmerald)" name="Actual Value" />
            <Area type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="AI Forecast" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
