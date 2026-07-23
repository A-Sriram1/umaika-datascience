'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Thermometer, Wind, Gauge, Cog, Clock, Package, Zap, Mail, MessageSquare, Smartphone, CheckCircle, X, Filter } from 'lucide-react';
import { generateAlerts } from '@/lib/mock-data';
import { ALERT_TYPE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const severityConfig: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', label: 'Critical' },
  warning: { color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Warning' },
  info: { color: 'text-sky-400', bg: 'bg-sky-500/10', label: 'Info' },
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
      <div><h1 className="text-2xl font-bold text-white">Alerts & Notifications</h1><p className="text-slate-500 text-sm mt-1">Real-time monitoring alerts across all systems</p></div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', count: counts.all, color: '#0ea5e9', key: 'all' },
          { label: 'Critical', count: counts.critical, color: '#ef4444', key: 'critical' },
          { label: 'Warning', count: counts.warning, color: '#f97316', key: 'warning' },
          { label: 'Info', count: counts.info, color: '#0ea5e9', key: 'info' },
        ].map((s, i) => (
          <motion.button key={s.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setFilter(s.key)}
            className={cn('rounded-2xl bg-white/[0.04] backdrop-blur-xl border p-5 text-left transition-all hover:bg-white/[0.06]',
              filter === s.key ? 'border-sky-500/30 ring-1 ring-sky-500/20' : 'border-white/[0.06]')}
            style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="text-3xl font-bold text-white">{s.count}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
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
                  className={cn('rounded-xl bg-white/[0.04] border p-4 transition-all',
                    alert.acknowledged ? 'border-white/[0.04] opacity-60' : alert.severity === 'critical' ? 'border-red-500/20' : 'border-white/[0.06]')}>
                  <div className="flex items-start gap-4">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', sev.bg)}>
                      <Icon className={cn('w-5 h-5', sev.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', sev.bg, sev.color)}>{sev.label}</span>
                        <span className="text-xs text-slate-500">{ALERT_TYPE_LABELS[alert.type]}</span>
                        {alert.machine && <span className="text-xs text-slate-600">· {alert.machine}</span>}
                      </div>
                      <p className="text-sm text-slate-300">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleString()}</span>
                        {!alert.acknowledged && (
                          <button onClick={() => acknowledge(alert.id)} className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                    <button onClick={() => dismiss(alert.id)} className="text-slate-600 hover:text-slate-400 transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Notification Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6 h-fit">
          <h2 className="text-sm font-semibold text-white mb-4">Notification Channels</h2>
          <div className="space-y-3">
            {[
              { key: 'email' as const, label: 'Email', icon: Mail, desc: 'admin@factory.com' },
              { key: 'sms' as const, label: 'SMS', icon: Smartphone, desc: '+1 (555) 0123' },
              { key: 'push' as const, label: 'Push', icon: Bell, desc: 'Browser notifications' },
              { key: 'whatsapp' as const, label: 'WhatsApp', icon: MessageSquare, desc: '+1 (555) 0123' },
            ].map(ch => (
              <div key={ch.key} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <ch.icon className="w-4 h-4 text-slate-400" />
                  <div><div className="text-sm text-white">{ch.label}</div><div className="text-xs text-slate-500">{ch.desc}</div></div>
                </div>
                <button onClick={() => setNotifications(prev => ({ ...prev, [ch.key]: !prev[ch.key] }))}
                  className={cn('w-10 h-5 rounded-full transition-colors relative',
                    notifications[ch.key] ? 'bg-sky-500' : 'bg-white/[0.1]')}>
                  <span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all',
                    notifications[ch.key] ? 'left-[22px]' : 'left-0.5')} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white mb-3">Alert Rules</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2 rounded-lg bg-white/[0.03]">Temperature &gt; 90°C → Critical</div>
              <div className="p-2 rounded-lg bg-white/[0.03]">Vibration &gt; 5.0 mm/s → Warning</div>
              <div className="p-2 rounded-lg bg-white/[0.03]">Failure Risk &gt; 80% → Critical</div>
              <div className="p-2 rounded-lg bg-white/[0.03]">OEE &lt; 75% → Warning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
