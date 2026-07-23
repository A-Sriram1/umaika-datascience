'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Network, Brain, Cpu, Activity, Play, RotateCw, Upload, CheckCircle, Clock, Zap } from 'lucide-react';
import { generateDLModels, generateTimeSeries } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const tooltipStyle = { backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' };

export default function DeepLearningPage() {
  const models = useMemo(() => generateDLModels(), []);
  const [activeTab, setActiveTab] = useState('all');
  const tabs = ['all', 'lstm', 'gru', 'transformer'];
  const filtered = activeTab === 'all' ? models : models.filter(m => m.type === activeTab);

  const lossData = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    epoch: i + 1,
    training: parseFloat((0.8 * Math.exp(-0.05 * i) + 0.03 + Math.random() * 0.01).toFixed(4)),
    validation: parseFloat((0.85 * Math.exp(-0.045 * i) + 0.05 + Math.random() * 0.015).toFixed(4)),
  })), []);

  const forecastData = useMemo(() => {
    const historical = generateTimeSeries(18, 4500, 200, 10);
    const forecast = generateTimeSeries(8, 4800, 250, 15);
    return [...historical.map(d => ({ ...d, type: 'historical' })), ...forecast.map(d => ({ ...d, type: 'forecast', forecast: d.value, value: undefined }))];
  }, []);

  const typeColors: Record<string, string> = { lstm: '#0ea5e9', gru: '#22c55e', transformer: '#8b5cf6' };
  const statusIcons: Record<string, React.ReactElement> = {
    training: <span className="flex items-center gap-1 text-orange-400"><span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />Training</span>,
    ready: <span className="flex items-center gap-1 text-sky-400"><Clock className="w-3 h-3" />Ready</span>,
    deployed: <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-3 h-3" />Deployed</span>,
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Deep Learning Models</h1><p className="text-slate-500 text-sm mt-1">Neural network powered predictions</p></div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize',
              activeTab === t ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:bg-white/[0.04]')}>
            {t === 'all' ? 'All Models' : t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-5 hover:bg-white/[0.06] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase" style={{ backgroundColor: `${typeColors[m.type]}15`, color: typeColors[m.type] }}>{m.type}</span>
              <div className="text-xs">{statusIcons[m.status]}</div>
            </div>
            <h3 className="text-base font-semibold text-white mb-3">{m.name}</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><div className="text-lg font-bold text-white">{(m.accuracy * 100).toFixed(1)}%</div><div className="text-xs text-slate-500">Accuracy</div></div>
              <div><div className="text-lg font-bold text-white">{m.loss.toFixed(4)}</div><div className="text-xs text-slate-500">Loss</div></div>
              <div><div className="text-lg font-bold text-white">{m.epochs}</div><div className="text-xs text-slate-500">Epochs</div></div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
              <span className="text-xs text-slate-500">Trained {new Date(m.lastTrained).toLocaleDateString()}</span>
              <button className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"><RotateCw className="w-3 h-3" />Retrain</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Training Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Training Progress — Anomaly Detector</h2>
          <span className="flex items-center gap-1.5 text-orange-400 text-xs"><span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />Training in Progress</span>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[{ l: 'Epoch', v: '187/250' }, { l: 'Loss', v: '0.0312' }, { l: 'LR', v: '0.0001' }, { l: 'ETA', v: '~14 min' }].map(m => (
            <div key={m.l} className="rounded-xl bg-white/[0.03] p-3 text-center"><div className="text-sm font-bold text-white">{m.v}</div><div className="text-xs text-slate-500">{m.l}</div></div>
          ))}
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500" initial={{ width: 0 }} animate={{ width: '74.8%' }} transition={{ duration: 2 }} /></div>
      </motion.div>

      {/* Loss Curves */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Training & Validation Loss</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lossData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="epoch" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Epoch', fill: '#64748b', fontSize: 12, position: 'insideBottom', offset: -5 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Line type="monotone" dataKey="training" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Training Loss" />
            <Line type="monotone" dataKey="validation" stroke="#f97316" strokeWidth={2} dot={false} name="Validation Loss" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Forecasting */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Time-Series Forecasting</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient>
              <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="timestamp" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} fill="url(#histGrad)" name="Historical" />
            <Area type="monotone" dataKey="forecast" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" fill="url(#foreGrad)" name="Forecast" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Architecture Diagram */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Model Architecture</h2>
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-4">
          {['Input Layer\n(Sensor Data)', 'Embedding\n+ Positional', 'Transformer\nEncoder ×6', 'Multi-Head\nAttention', 'Feed Forward\nNetwork', 'Dense\n(256 → 128)', 'Output\n(Prediction)'].map((layer, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="min-w-[100px] rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 text-center">
                <div className="text-xs text-slate-300 whitespace-pre-line">{layer}</div>
              </div>
              {i < 6 && <div className="text-sky-500/50">→</div>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
