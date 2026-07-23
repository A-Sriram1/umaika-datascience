'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Gauge, Clock, AlertTriangle, Zap, DollarSign, Server, Bell, Activity, Download, Calendar, Brain, ArrowUpRight, Factory, CheckCircle, Sparkles } from 'lucide-react';
import { generateKPIs, generateMachines, generateProductionLines, generateAlerts, generateTimeSeries, generateOEE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { Gauge, TrendingUp, Clock, AlertTriangle, Zap, DollarSign, Server, Bell };

const tooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '14px',
  color: '#0f172a',
  fontSize: '12px',
  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.1)',
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

  const statusColors: Record<string, string> = { running: 'bg-emerald-500', idle: 'bg-amber-500', maintenance: 'bg-purple-500', error: 'bg-rose-500' };
  
  const oeeData = [
    { name: 'Availability', value: oee.availability, fill: '#059669' },
    { name: 'Performance', value: oee.performance, fill: '#d97706' },
    { name: 'Quality', value: oee.quality, fill: '#7c3aed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Factory Overview</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">LIVE</span>
          </div>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time autonomous manufacturing telemetry & AI performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 hover:scale-105 transition-all">
            <Download className="w-4 h-4" /> Export Executive Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = iconMap[kpi.icon] || Activity;
          const isPositive = kpi.changeType === 'increase';
          const cardColor = i % 3 === 0 ? '#059669' : i % 3 === 1 ? '#d97706' : '#7c3aed';
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 p-5 transition-all duration-200 hover:shadow-lg shadow-sm relative overflow-hidden"
              style={{ borderTop: `3px solid ${cardColor}` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-inner" style={{ backgroundColor: `${cardColor}15`, border: `1px solid ${cardColor}30` }}>
                  <Icon className="w-5.5 h-5.5" style={{ color: cardColor }} />
                </div>
                {kpi.change !== 0 && (
                  <div className={cn('flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border shadow-sm', isPositive ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200')}>
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {Math.abs(kpi.change)}%
                  </div>
                )}
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{kpi.value}</div>
              <div className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                <span>{kpi.label}</span>
                {kpi.unit && <span className="text-emerald-700 font-mono font-bold">· {kpi.unit}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Production Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Production Output Stream</h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time throughput comparison over the last 24 hours</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" /> Actual Output
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
              <span className="w-2.5 h-2.5 bg-amber-600 rounded-full opacity-60" /> AI Forecast
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={production}>
            <defs>
              <linearGradient id="colorValWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPredWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="timestamp" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} fill="url(#colorValWhite)" />
            <Area type="monotone" dataKey="predicted" stroke="#d97706" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorPredWhite)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* OEE + Machine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OEE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">OEE Performance Index</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Target: 85.0%</span>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="text-center bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-inner">
              <div className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-amber-600 to-purple-600 bg-clip-text text-transparent">{oee.overall}%</div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">Overall Plant Efficiency</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {oeeData.map(d => (
              <div key={d.name} className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
                <ResponsiveContainer width="100%" height={110}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[d]} startAngle={180} endAngle={0}>
                    <RadialBar background={{ fill: '#e2e8f0' }} dataKey="value" fill={d.fill} cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-xl font-extrabold text-slate-900 -mt-3">{d.value}%</div>
                <div className="text-xs font-semibold text-slate-500">{d.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Machine Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">Machine Fleet Status</h2>
          <div className="space-y-3 mb-5">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className={cn('w-3 h-3 rounded-full', statusColors[status])} />
                  <span className="text-xs font-bold text-slate-700 capitalize">{status}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 font-mono">{count}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-2 pt-2 border-t border-slate-200">
            {machines.map(m => (
              <div key={m.id} className={cn('aspect-square rounded-lg transition-all cursor-pointer hover:scale-125 hover:z-10', statusColors[m.status])} title={`${m.name} — ${m.status}`} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts + AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="rounded-3xl bg-white border border-rose-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Critical Alerts</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">Real-time Stream</span>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 6).map(a => (
              <div key={a.id} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-all">
                <span className={cn('w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-sm', a.severity === 'critical' ? 'bg-rose-600' : a.severity === 'warning' ? 'bg-amber-500' : 'bg-emerald-600')} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{a.message}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">{new Date(a.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="rounded-3xl bg-white border border-purple-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Autonomous AI Recommendations</h2>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            {[
              { text: 'Schedule maintenance for CNC Lathe Alpha within 48 hours to prevent bearing failure.', type: 'Maintenance', color: 'bg-amber-50 border-amber-200 text-amber-900' },
              { text: 'Reduce Line C speed by 4% to lower defect rate from 3.2% to target 2.0%.', type: 'Optimization', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
              { text: 'Shift peak energy loads to off-peak hours — projected savings $2,400/day.', type: 'Energy', color: 'bg-teal-50 border-teal-200 text-teal-900' },
              { text: 'Allocate Assembly Bot A2 from Line B to Line A to clear bottleneck.', type: 'Allocation', color: 'bg-purple-50 border-purple-200 text-purple-900' },
            ].map((rec, i) => (
              <div key={i} className={cn('flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all', rec.color)}>
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Brain className="w-4.5 h-4.5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">{rec.text}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white text-purple-800 border border-purple-200">{rec.type}</span>
                    <button className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors">Apply Action →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Production Lines */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">Production Line Status</h2>
        <div className="space-y-3">
          {lines.map(line => {
            const pct = Math.round((line.currentOutput / line.targetOutput) * 100);
            return (
              <div key={line.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
                <div className="w-44">
                  <div className="text-sm font-bold text-slate-900">{line.name}</div>
                  <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold mt-1 px-2.5 py-0.5 rounded-full border',
                    line.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200')}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', line.status === 'active' ? 'bg-emerald-600' : 'bg-amber-600')} />
                    {line.status}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span>Target Progress ({line.currentOutput} / {line.targetOutput})</span>
                    <span className="text-emerald-700 font-mono font-bold">{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden p-0.5">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-600 transition-all duration-500 shadow-sm" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-center w-20"><div className="text-lg font-extrabold text-slate-900">{line.efficiency}%</div><div className="text-[10px] font-bold text-slate-500">Efficiency</div></div>
                  <div className="text-center w-16"><div className="text-lg font-extrabold text-emerald-700">{line.oee}%</div><div className="text-[10px] font-bold text-slate-500">OEE</div></div>
                  <div className="text-center w-20"><div className="text-sm font-extrabold text-amber-700">{line.defectRate}%</div><div className="text-[10px] font-bold text-slate-500">Defects</div></div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
