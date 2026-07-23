'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Gauge, Clock, AlertTriangle, Zap, DollarSign, Server, Bell, Activity, Download, Calendar, Brain, ArrowUpRight, Factory, CheckCircle, Sparkles } from 'lucide-react';
import { generateKPIs, generateMachines, generateProductionLines, generateAlerts, generateTimeSeries, generateOEE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { Gauge, TrendingUp, Clock, AlertTriangle, Zap, DollarSign, Server, Bell };

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  border: '1px solid rgba(56, 189, 248, 0.3)',
  borderRadius: '14px',
  color: '#f8fafc',
  fontSize: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

export default function DashboardOverview() {
  const [kpis, setKpis] = useState(generateKPIs());
  const production = useMemo(() => generateTimeSeries(24, 4500, 300, 5), []);
  const oee = useMemo(() => generateOEE(), []);
  const machines = useMemo(() => generateMachines(30), []);
  const alerts = useMemo(() => generateAlerts(6), []);
  const lines = useMemo(() => generateProductionLines(), []);

  useEffect(() => { const id = setInterval(() => setKpis(generateKPIs()), 5000); return () => clearInterval(id); }, []);

  const statusCounts = useMemo(() => {
    const counts = { running: 0, idle: 0, maintenance: 0, error: 0 };
    machines.forEach(m => { if (m.status in counts) counts[m.status as keyof typeof counts]++; });
    return counts;
  }, [machines]);

  const statusColors: Record<string, string> = { running: 'bg-emerald-400 shadow-sm shadow-emerald-400/50', idle: 'bg-amber-400 shadow-sm shadow-amber-400/50', maintenance: 'bg-sky-400 shadow-sm shadow-sky-400/50', error: 'bg-rose-500 shadow-sm shadow-rose-500/50' };
  
  const oeeData = [
    { name: 'Availability', value: oee.availability, fill: '#38bdf8' },
    { name: 'Performance', value: oee.performance, fill: '#22d3ee' },
    { name: 'Quality', value: oee.quality, fill: '#34d399' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-purple-500/10 p-6 rounded-3xl border border-sky-500/20 backdrop-blur-xl shadow-xl shadow-sky-950/20">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Factory Overview</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/30">LIVE</span>
          </div>
          <p className="text-cyan-200/80 text-sm mt-1 font-medium">Real-time autonomous manufacturing intelligence stream</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = iconMap[kpi.icon] || Activity;
          const isPositive = kpi.changeType === 'increase';
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="group rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden"
              style={{ borderTop: `3px solid ${kpi.color}` }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: `${kpi.color}20`, border: `1px solid ${kpi.color}40` }}>
                  <Icon className="w-5.5 h-5.5" style={{ color: kpi.color }} />
                </div>
                {kpi.change !== 0 && (
                  <div className={cn('flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border shadow-sm', isPositive ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' : 'text-rose-400 bg-rose-500/15 border-rose-500/30')}>
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {Math.abs(kpi.change)}%
                  </div>
                )}
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">{kpi.value}</div>
              <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
                <span>{kpi.label}</span>
                {kpi.unit && <span className="text-cyan-400/90 font-mono">· {kpi.unit}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Production Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-sky-500/20 p-6 shadow-2xl shadow-sky-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Production Output Stream</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time throughput comparison over the last 24 hours</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
              <span className="w-2.5 h-2.5 bg-sky-400 rounded-full shadow-sm shadow-sky-400" /> Actual Output
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400 opacity-60" /> AI Forecast
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={production}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} fill="url(#colorVal)" />
            <Area type="monotone" dataKey="predicted" stroke="#22d3ee" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorPred)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* OEE + Machine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OEE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-cyan-500/20 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">OEE Performance Index</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Target: 85.0%</span>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="text-center bg-gradient-to-b from-sky-500/10 to-transparent p-6 rounded-3xl border border-sky-500/20 shadow-inner">
              <div className="text-6xl font-black bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">{oee.overall}%</div>
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-widest mt-1">Overall Plant Efficiency</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {oeeData.map(d => (
              <div key={d.name} className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all">
                <ResponsiveContainer width="100%" height={110}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[d]} startAngle={180} endAngle={0}>
                    <RadialBar background={{ fill: 'rgba(255,255,255,0.06)' }} dataKey="value" fill={d.fill} cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-xl font-extrabold text-white -mt-3">{d.value}%</div>
                <div className="text-xs font-medium text-slate-400">{d.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Machine Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Machine Fleet Status</h2>
          <div className="space-y-3 mb-5">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className={cn('w-3 h-3 rounded-full', statusColors[status])} />
                  <span className="text-xs font-semibold text-slate-300 capitalize">{status}</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">{count}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-2 pt-2 border-t border-white/10">
            {machines.map(m => (
              <div key={m.id} className={cn('aspect-square rounded-lg transition-all cursor-pointer hover:scale-125 hover:z-10', statusColors[m.status])} title={`${m.name} — ${m.status}`} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts + AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-rose-500/20 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Active Critical Alerts</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/30">Real-time Stream</span>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 6).map(a => (
              <div key={a.id} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-all">
                <span className={cn('w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-sm', a.severity === 'critical' ? 'bg-rose-500 shadow-rose-500' : a.severity === 'warning' ? 'bg-amber-400 shadow-amber-400' : 'bg-sky-400 shadow-sky-400')} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{a.message}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{new Date(a.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-purple-500/20 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Autonomous AI Recommendations</h2>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div className="space-y-3">
            {[
              { text: 'Schedule maintenance for CNC Lathe Alpha within 48 hours to prevent bearing failure.', type: 'Maintenance', color: 'from-amber-500/20 to-rose-500/10' },
              { text: 'Reduce Line C speed by 4% to lower defect rate from 3.2% to target 2.0%.', type: 'Optimization', color: 'from-sky-500/20 to-cyan-500/10' },
              { text: 'Shift peak energy loads to off-peak hours — projected savings $2,400/day.', type: 'Energy', color: 'from-emerald-500/20 to-teal-500/10' },
              { text: 'Allocate Assembly Bot A2 from Line B to Line A to clear bottleneck.', type: 'Allocation', color: 'from-purple-500/20 to-indigo-500/10' },
            ].map((rec, i) => (
              <div key={i} className={cn('flex items-start gap-3.5 p-3.5 rounded-2xl bg-gradient-to-r border border-white/10 hover:border-purple-400/40 transition-all', rec.color)}>
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4.5 h-4.5 text-purple-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-100">{rec.text}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30">{rec.type}</span>
                    <button className="text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors">Apply Action →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Production Lines */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-sky-500/20 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">Production Line Status</h2>
        <div className="space-y-3">
          {lines.map(line => {
            const pct = Math.round((line.currentOutput / line.targetOutput) * 100);
            return (
              <div key={line.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="w-44">
                  <div className="text-sm font-bold text-white">{line.name}</div>
                  <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold mt-1 px-2.5 py-0.5 rounded-full border',
                    line.status === 'active' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border-amber-500/30')}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', line.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400')} />
                    {line.status}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                    <span>Target Progress ({line.currentOutput} / {line.targetOutput})</span>
                    <span className="text-cyan-300 font-mono">{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all duration-500 shadow-sm" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-center w-20"><div className="text-lg font-extrabold text-white">{line.efficiency}%</div><div className="text-[10px] font-semibold text-slate-400">Efficiency</div></div>
                  <div className="text-center w-16"><div className="text-lg font-extrabold text-cyan-300">{line.oee}%</div><div className="text-[10px] font-semibold text-slate-400">OEE</div></div>
                  <div className="text-center w-20"><div className="text-sm font-extrabold text-amber-400">{line.defectRate}%</div><div className="text-[10px] font-semibold text-slate-400">Defects</div></div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
