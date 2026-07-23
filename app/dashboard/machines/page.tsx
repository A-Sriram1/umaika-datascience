'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cog, Thermometer, Gauge, Zap, Activity, Wind, Droplets, Fuel, Cpu, AlertTriangle, CheckCircle, Wrench, Server, Sparkles } from 'lucide-react';
import { generateMachines, generateTimeSeries } from '@/lib/mock-data';
import { SENSOR_THRESHOLDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  border: '1px solid rgba(56, 189, 248, 0.3)',
  borderRadius: '14px',
  color: '#f8fafc',
  fontSize: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

const sensorIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  temperature: Thermometer, airTemperature: Thermometer, processTemperature: Thermometer,
  pressure: Gauge, voltage: Zap, current: Activity, power: Zap,
  rpm: Cog, torque: Wrench, vibration: Wind, humidity: Droplets,
  oilLevel: Fuel, toolWear: Wrench, energyConsumption: Cpu, failureProbability: AlertTriangle,
};
const sensorLabels: Record<string, string> = {
  temperature: 'Temp (°C)', airTemperature: 'Air Temp (°C)', processTemperature: 'Process Temp (°C)',
  pressure: 'Pressure (bar)', voltage: 'Voltage (V)', current: 'Current (A)', power: 'Power (kW)',
  rpm: 'RPM', torque: 'Torque (Nm)', vibration: 'Vibration (mm/s)', humidity: 'Humidity (%)',
  oilLevel: 'Oil Level (%)', toolWear: 'Tool Wear (min)', energyConsumption: 'Energy (kWh)', failureProbability: 'Failure Risk (%)',
};

function getSensorStatus(key: string, value: number): 'normal' | 'warning' | 'critical' {
  const t = SENSOR_THRESHOLDS[key as keyof typeof SENSOR_THRESHOLDS];
  if (!t) return 'normal';
  if (key === 'oilLevel') return value < t.critical ? 'critical' : value < t.min ? 'warning' : 'normal';
  return value > t.critical ? 'critical' : value > t.max ? 'warning' : 'normal';
}

export default function MachinesPage() {
  const [machines, setMachines] = useState(() => generateMachines(30));
  const [selectedId, setSelectedId] = useState('machine-1');
  const [selectedSensor, setSelectedSensor] = useState('temperature');
  const sensorTrend = useMemo(() => generateTimeSeries(24, 65, 8), [selectedId, selectedSensor]);

  const selected = machines.find(m => m.id === selectedId) || machines[0];
  const statusCounts = useMemo(() => {
    const c = { total: machines.length, online: 0, maintenance: 0, alerts: 0 };
    machines.forEach(m => { if (m.status === 'running' || m.status === 'idle') c.online++; if (m.status === 'maintenance') c.maintenance++; if (m.status === 'error') c.alerts++; });
    return c;
  }, [machines]);

  useEffect(() => {
    const id = setInterval(() => {
      setMachines(prev => prev.map(m => ({
        ...m,
        sensors: {
          ...m.sensors,
          temperature: parseFloat((m.sensors.temperature + (Math.random() - 0.5) * 2).toFixed(1)),
          vibration: parseFloat((m.sensors.vibration + (Math.random() - 0.5) * 0.3).toFixed(2)),
          energyConsumption: parseFloat((m.sensors.energyConsumption + (Math.random() - 0.5) * 1).toFixed(1)),
        },
        healthScore: Math.max(10, Math.min(99, m.healthScore + Math.floor((Math.random() - 0.5) * 3))),
      })));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const summaryCards = [
    { label: 'Total Fleet Machines', value: statusCounts.total, icon: Server, color: '#38bdf8' },
    { label: 'Operational Online', value: statusCounts.online, icon: CheckCircle, color: '#34d399' },
    { label: 'Scheduled Maintenance', value: statusCounts.maintenance, icon: Wrench, color: '#fb923c' },
    { label: 'Critical Failure Risk', value: statusCounts.alerts, icon: AlertTriangle, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-purple-500/10 p-6 rounded-3xl border border-sky-500/20 backdrop-blur-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Machine Intelligence & IoT Stream</h1>
          <p className="text-cyan-200/80 text-sm mt-1 font-medium">Real-time telemetry grounded in UCI AI4I 2020 & NASA CMAPSS Datasets</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> 18 Live Sensor Channels
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/10 p-5 shadow-xl hover:border-cyan-500/30 transition-all" style={{ borderLeft: `4px solid ${s.color}` }}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                <s.icon className="w-5.5 h-5.5" style={{ color: s.color }} />
              </div>
              <div><div className="text-3xl font-extrabold text-white">{s.value}</div><div className="text-xs font-semibold text-slate-400">{s.label}</div></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Machine List + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Machine List */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-white/10 p-4 max-h-[650px] overflow-y-auto shadow-2xl">
          <h2 className="text-xs font-bold text-cyan-300 uppercase tracking-widest mb-3 px-2">Fleet Inspector</h2>
          <div className="space-y-1.5">
            {machines.map(m => (
              <button key={m.id} onClick={() => setSelectedId(m.id)}
                className={cn('w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left transition-all border',
                  selectedId === m.id ? 'bg-cyan-500/15 border-cyan-400/40 text-white shadow-md shadow-cyan-500/10' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] text-slate-300')}>
                <span className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm', m.status === 'running' ? 'bg-emerald-400 shadow-emerald-400' : m.status === 'idle' ? 'bg-amber-400 shadow-amber-400' : m.status === 'maintenance' ? 'bg-sky-400 shadow-sky-400' : 'bg-rose-500 shadow-rose-500')} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{m.name}</div>
                  <div className="text-[11px] text-slate-400">{m.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-cyan-300">{m.healthScore}%</div>
                  <div className="w-12 h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.healthScore}%`, backgroundColor: m.healthScore > 75 ? '#34d399' : m.healthScore > 50 ? '#fb923c' : '#f43f5e' }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 space-y-6">
          {/* Machine Header */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-cyan-500/20 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">{selected.name}</h2>
                <p className="text-cyan-200/80 text-xs font-semibold mt-0.5">{selected.type} · Operational Line: {selected.line}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn('px-3.5 py-1 rounded-full text-xs font-extrabold border',
                  selected.status === 'running' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : selected.status === 'idle' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : selected.status === 'maintenance' ? 'bg-sky-500/15 text-sky-300 border-sky-500/30' : 'bg-rose-500/15 text-rose-300 border-rose-500/30')}>
                  {selected.status.toUpperCase()}
                </span>
                <div className="text-center px-4 py-1.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 shadow-inner">
                  <div className="text-xl font-extrabold text-cyan-300 font-mono">{selected.rulCycles}</div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase">RUL Cycles (NASA CMAPSS)</div>
                </div>
                <div className="text-center px-4 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-2xl font-extrabold font-mono" style={{ color: selected.healthScore > 75 ? '#34d399' : selected.healthScore > 50 ? '#fb923c' : '#f43f5e' }}>{selected.healthScore}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Health Score</div>
                </div>
              </div>
            </div>

            {/* Sensor Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(selected.sensors).map(([key, value]) => {
                const Icon = sensorIcons[key] || Activity;
                const status = getSensorStatus(key, value as number);
                const threshold = SENSOR_THRESHOLDS[key as keyof typeof SENSOR_THRESHOLDS];
                return (
                  <div key={key} onClick={() => setSelectedSensor(key)}
                    className={cn('rounded-2xl p-4 border transition-all cursor-pointer',
                      selectedSensor === key ? 'bg-gradient-to-br from-sky-500/20 to-cyan-500/10 border-cyan-400/50 shadow-lg shadow-cyan-500/10' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]')}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-semibold text-slate-300">{sensorLabels[key] || key}</span>
                      </div>
                      <span className={cn('w-2 h-2 rounded-full shadow-sm', status === 'normal' ? 'bg-emerald-400 shadow-emerald-400' : status === 'warning' ? 'bg-amber-400 shadow-amber-400' : 'bg-rose-500 shadow-rose-500')} />
                    </div>
                    <div className="text-2xl font-extrabold text-white font-mono">{value}<span className="text-xs text-cyan-300 font-medium ml-1.5">{threshold?.unit}</span></div>
                    <div className="h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${Math.min(((value as number) / (threshold?.critical || 100)) * 100, 100)}%`,
                        backgroundColor: status === 'normal' ? '#34d399' : status === 'warning' ? '#fb923c' : '#f43f5e'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sensor Trend */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-2xl border border-sky-500/20 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white tracking-tight">Sensor Telemetry Trend — {sensorLabels[selectedSensor]}</h2>
              <select value={selectedSensor} onChange={e => setSelectedSensor(e.target.value)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-cyan-300 appearance-none cursor-pointer">
                {Object.keys(sensorLabels).map(k => <option key={k} value={k} className="bg-slate-900">{sensorLabels[k]}</option>)}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={sensorTrend}>
                <defs><linearGradient id="sensorGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} /><stop offset="95%" stopColor="#38bdf8" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} fill="url(#sensorGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
