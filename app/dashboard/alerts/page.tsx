'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Thermometer, Wind, Gauge, Cog, Clock, Package, Zap, Mail, MessageSquare, Smartphone, CheckCircle, X, Filter } from 'lucide-react';
import { generateAlerts } from '@/lib/mock-data';
import { ALERT_TYPE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const severityConfig: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: 'text-rose-800', bg: 'bg-rose-100 border-rose-200', label: 'Critical' },
  warning: { color: 'text-amber-800', bg: 'bg-amber-100 border-amber-200', label: 'Warning' },
  info: { color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-200', label: 'Info' },
};
const typeIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  high_temperature: Thermometer, abnormal_vibration: Wind, low_pressure: Gauge,
  machine_failure_risk: Cog, production_delay: Clock, material_shortage: Package,
  quality_issue: AlertTriangle, energy_spike: Zap,
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(() => generateAlerts(20));
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, whatsapp: false });

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);
  const counts = useMemo(() => ({
    all: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    warning: alerts.filter(a => a.severity === 'warning').length,
    info: alerts.filter(a => a.severity === 'info').length,
  }), [alerts]);

  const acknowledge = (id: string) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  const dismiss = (id: string) => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Real-time Alerts & Notifications</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Telemetry threshold breaches, maintenance warnings, and system notifications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', count: counts.all, color: '#059669', key: 'all' },
          { label: 'Critical Breaches', count: counts.critical, color: '#e11d48', key: 'critical' },
          { label: 'Warning Thresholds', count: counts.warning, color: '#d97706', key: 'warning' },
          { label: 'Informational', count: counts.info, color: '#0284c7', key: 'info' },
        ].map((s, i) => (
          <motion.button key={s.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setFilter(s.key)}
            className={cn('rounded-3xl bg-white border p-5 text-left transition-all hover:shadow-md shadow-sm',
              filter === s.key ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200')}
            style={{ borderLeft: `4px solid ${s.color}` }}>
            <div className="text-3xl font-black text-slate-900">{s.count}</div>
            <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{s.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Alert Feed */}
        <div className="lg:col-span-3 space-y-3">
          <AnimatePresence>
            {filtered.map((alert, i) => {
              const Icon = typeIcons[alert.type] || AlertTriangle;
              const sev = severityConfig[alert.severity];
              return (
                <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.03 }}
                  className={cn('rounded-2xl bg-white border p-4 transition-all shadow-sm',
                    alert.acknowledged ? 'border-slate-200 opacity-60' : alert.severity === 'critical' ? 'border-rose-300' : 'border-slate-200')}>
                  <div className="flex items-start gap-4">
                    <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border', sev.bg)}>
                      <Icon className={cn('w-5 h-5', sev.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-extrabold px-2.5 py-0.5 rounded-full border', sev.bg, sev.color)}>{sev.label}</span>
                        <span className="text-xs font-bold text-slate-500">{ALERT_TYPE_LABELS[alert.type]}</span>
                        {alert.machine && <span className="text-xs font-semibold text-slate-400">· {alert.machine}</span>}
                      </div>
                      <p className="text-sm font-bold text-slate-900">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-slate-500 font-mono font-semibold">{new Date(alert.timestamp).toLocaleString()}</span>
                        {!alert.acknowledged && (
                          <button onClick={() => acknowledge(alert.id)} className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />Acknowledge Alert
                          </button>
                        )}
                      </div>
                    </div>
                    <button onClick={() => dismiss(alert.id)} className="text-slate-400 hover:text-slate-700 transition-colors p-1"><X className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Notification Channels */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm h-fit">
          <h2 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Notification Channels</h2>
          <div className="space-y-3">
            {[
              { key: 'email' as const, label: 'Email', icon: Mail, desc: 'admin@factorymind.ai' },
              { key: 'sms' as const, label: 'SMS', icon: Smartphone, desc: '+1 (555) 0123' },
              { key: 'push' as const, label: 'Push', icon: Bell, desc: 'Browser notifications' },
              { key: 'whatsapp' as const, label: 'WhatsApp', icon: MessageSquare, desc: '+1 (555) 0123' },
            ].map(ch => (
              <div key={ch.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <ch.icon className="w-4 h-4 text-emerald-600" />
                  <div><div className="text-xs font-bold text-slate-900">{ch.label}</div><div className="text-[11px] text-slate-500 font-mono">{ch.desc}</div></div>
                </div>
                <button onClick={() => setNotifications(prev => ({ ...prev, [ch.key]: !prev[ch.key] }))}
                  className={cn('w-10 h-5 rounded-full transition-colors relative',
                    notifications[ch.key] ? 'bg-emerald-600' : 'bg-slate-300')}>
                  <span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-xs',
                    notifications[ch.key] ? 'left-[22px]' : 'left-0.5')} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
