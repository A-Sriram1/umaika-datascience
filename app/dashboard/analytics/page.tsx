'use client';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Zap, Factory, AlertTriangle, Sparkles } from 'lucide-react';
import { generateAnalyticsData, generateOEE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const tooltipStyle = {
  backgroundColor: 'rgba(13, 19, 36, 0.96)',
  border: '1px solid rgba(16, 185, 129, 0.35)',
  borderRadius: '14px',
  color: '#f8fafc',
  fontSize: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
};
const VIBRANT_COLORS = ['#10b981', '#f59e0b', '#a855f7', '#84cc16', '#f43f5e', '#fb923c', '#eab308'];

export default function AnalyticsPage() {
  const data = useMemo(() => generateAnalyticsData(), []);
  const oee = useMemo(() => generateOEE(), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/15 via-amber-500/10 to-purple-500/15 p-6 rounded-3xl border border-emerald-500/30 backdrop-blur-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Executive Analytics Dashboard</h1>
          <p className="text-emerald-200/90 text-sm mt-1 font-medium">Comprehensive manufacturing intelligence across all production lines</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-colors">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 text-xs font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-105 transition-transform">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* OEE Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Weekly OEE Trend Stream</h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/35">Target: 85.0%</span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data.weeklyOEE}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12, fontWeight: 600 }} />
            <Line type="monotone" dataKey="oee" stroke="#10b981" strokeWidth={4} name="Overall OEE" dot={{ fill: '#10b981', r: 5 }} />
            <Line type="monotone" dataKey="availability" stroke="#f59e0b" strokeWidth={2} name="Availability" dot={false} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="performance" stroke="#a855f7" strokeWidth={2} name="Performance" dot={false} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="quality" stroke="#84cc16" strokeWidth={2} name="Quality" dot={false} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 2-col charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Downtime Pareto */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-rose-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Downtime Pareto Analysis</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.downtimeReasons}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="reason" tick={{ fill: '#cbd5e1', fontSize: 10 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                {data.downtimeReasons.map((_, i) => <Cell key={i} fill={VIBRANT_COLORS[i % VIBRANT_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Machine Utilization */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Machine Fleet Utilization (%)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.machineUtilization} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="machine" tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="utilization" radius={[0, 8, 8, 0]} fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Production by Shift + Defects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Production Throughput by Shift</h2>
          <div className="space-y-4">
            {data.productionByShift.map(s => (
              <div key={s.shift} className="rounded-2xl bg-white/[0.03] p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-200">{s.shift}</span>
                  <span className="text-sm font-bold text-white font-mono">{s.output.toLocaleString()} / {s.target.toLocaleString()}</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" style={{ width: `${(s.output / s.target) * 100}%` }} />
                </div>
                <div className="text-xs font-bold text-emerald-300 mt-1.5 text-right">{s.efficiency}% Efficiency</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-purple-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Defects by Category (SECOM)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.defectsByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4}>
                {data.defectsByCategory.map((_, i) => <Cell key={i} fill={VIBRANT_COLORS[i % VIBRANT_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12, fontWeight: 600 }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Revenue + Energy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-emerald-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Revenue Impact vs Production Cost</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.monthlyRevenue}>
              <defs>
                <linearGradient id="revGradEmerald" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                <linearGradient id="costGradRose" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} /><stop offset="95%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => `$${(Number(v || 0) / 1000000).toFixed(2)}M`} />
              <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12, fontWeight: 600 }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revGradEmerald)" name="Revenue Generated" />
              <Area type="monotone" dataKey="cost" stroke="#f43f5e" strokeWidth={3} fill="url(#costGradRose)" name="Production Cost" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-amber-500/25 p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Material Waste & Scrap Tracking</h2>
          <div className="space-y-3">
            {data.materialWaste.map(m => {
              const overTarget = m.waste > m.target;
              return (
                <div key={m.material} className="rounded-2xl bg-white/[0.03] p-3.5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-200">{m.material}</span>
                    <span className={cn('text-sm font-bold font-mono', overTarget ? 'text-rose-400' : 'text-emerald-400')}>{m.waste}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 relative overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(m.waste / 8) * 100}%`, backgroundColor: overTarget ? '#f43f5e' : '#10b981' }} />
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Target Limit: {m.target}%</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
