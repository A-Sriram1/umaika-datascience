'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Factory, Activity, Target, Clock, AlertTriangle, TrendingUp, Layers, Settings2, Sparkles } from 'lucide-react';
import { generateProductionLines, generateTimeSeries, generateOEE, generateMachines } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const tooltipStyle = {
  backgroundColor: 'rgba(13, 19, 36, 0.96)',
  border: '1px solid rgba(16, 185, 129, 0.35)',
  borderRadius: '14px',
  color: '#f8fafc',
  fontSize: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
};

export default function ProductionPage() {
  const [counter, setCounter] = useState(12450);
  const target = 15000;
  const oee = useMemo(() => generateOEE(), []);
  const lines = useMemo(() => generateProductionLines(), []);
  const machines = useMemo(() => generateMachines(30), []);
  const cycleData = useMemo(() => generateTimeSeries(24, 15, 2), []);
  const efficiencyData = useMemo(() => lines.map(l => ({ name: l.name.split(' ').slice(-1)[0], efficiency: l.efficiency, fill: '#10b981' })), [lines]);

  const downtimeData = [
    { reason: 'Planned Maintenance', hours: 14.2, fill: '#10b981' },
    { reason: 'Mechanical Failure', hours: 11.5, fill: '#f43f5e' },
    { reason: 'Setup/Changeover', hours: 8.3, fill: '#f59e0b' },
    { reason: 'Material Shortage', hours: 6.8, fill: '#fb923c' },
    { reason: 'Operator Error', hours: 4.2, fill: '#a855f7' },
    { reason: 'Quality Hold', hours: 3.5, fill: '#84cc16' },
    { reason: 'Power Outage', hours: 1.8, fill: '#94a3b8' },
  ];

  const statusCounts = useMemo(() => {
    const c = { running: 0, idle: 0, maintenance: 0, error: 0 };
    machines.forEach(m => { if (m.status in c) c[m.status as keyof typeof c]++; });
    return c;
  }, [machines]);

  useEffect(() => { const id = setInterval(() => setCounter(p => p + Math.floor(Math.random() * 5)), 3000); return () => clearInterval(id); }, []);

  const oeeGauges = [
    { name: 'Availability', value: oee.availability, fill: '#10b981' },
    { name: 'Performance', value: oee.performance, fill: '#f59e0b' },
    { name: 'Quality', value: oee.quality, fill: '#a855f7' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/15 via-amber-500/10 to-purple-500/15 p-6 rounded-3xl border border-emerald-500/30 backdrop-blur-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Production Monitoring</h1>
          <p className="text-emerald-200/90 text-sm mt-1 font-medium">Live production line analytics and throughput metrics</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-md shadow-emerald-500/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-time Production Feed</span>
        </div>
      </div>

      {/* Live Counter */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Live Cumulative Production Count</h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/35">
            <Sparkles className="w-3.5 h-3.5" /> Target: {target.toLocaleString()} units
          </div>
        </div>
        <div className="flex items-end gap-6 mb-4">
          <div className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-amber-300 to-purple-300 bg-clip-text text-transparent font-mono tracking-tight">{counter.toLocaleString()}</div>
          <div className="text-sm font-semibold text-slate-400 pb-2">/ {target.toLocaleString()} target units</div>
        </div>
        <div className="h-3.5 rounded-full bg-white/10 overflow-hidden p-0.5 shadow-inner">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-400 shadow-md shadow-emerald-400/50" initial={{ width: 0 }} animate={{ width: `${Math.min((counter / target) * 100, 100)}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2.5">
          <span>0 units</span>
          <span className="text-emerald-300 font-bold">{Math.round((counter / target) * 100)}% Shift Target Complete</span>
          <span>{target.toLocaleString()} units</span>
        </div>
      </motion.div>

      {/* OEE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 text-center shadow-xl">
          <div className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent mb-1">{oee.overall}%</div>
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Overall Plant OEE</div>
        </motion.div>
        {oeeGauges.map((g, i) => (
          <motion.div key={g.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
            className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/10 p-4 text-center hover:border-emerald-500/30 transition-all shadow-xl">
            <ResponsiveContainer width="100%" height={100}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[g]} startAngle={180} endAngle={0}>
                <RadialBar background={{ fill: 'rgba(255,255,255,0.06)' }} dataKey="value" fill={g.fill} cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-xl font-extrabold text-white -mt-2">{g.value}%</div>
            <div className="text-xs font-medium text-slate-400">{g.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Cycle Time Trend (sec)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={cycleData}>
              <defs><linearGradient id="cycleGradEmerald" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#cycleGradEmerald)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-amber-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Line Efficiency Comparison</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="efficiency" radius={[8, 8, 0, 0]} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Production Lines */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">Assembly & Machining Lines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lines.map(line => {
            const pct = Math.round((line.currentOutput / line.targetOutput) * 100);
            return (
              <div key={line.id} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 hover:border-emerald-500/40 transition-all shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white text-sm">{line.name}</h3>
                  <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border', line.status === 'active' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border-amber-500/30')}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', line.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400')} />{line.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex justify-between text-slate-400"><span>Target Progress</span><span className="text-white font-mono">{line.currentOutput}/{line.targetOutput}</span></div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" style={{ width: `${Math.min(pct, 100)}%` }} /></div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div><div className="text-slate-400 text-[10px]">Efficiency</div><div className="text-white font-bold">{line.efficiency}%</div></div>
                    <div><div className="text-slate-400 text-[10px]">OEE</div><div className="text-emerald-300 font-bold">{line.oee}%</div></div>
                    <div><div className="text-slate-400 text-[10px]">Defects</div><div className="text-amber-400 font-bold">{line.defectRate}%</div></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
