'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Eye, Brain, Cog, Zap, Shield, RefreshCw, CheckCircle, Clock, XCircle, AlertTriangle, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { generateAgentActions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { monitor: Eye, detect: AlertTriangle, recommend: Brain, execute: Zap, learn: RefreshCw };
const typeColors: Record<string, string> = { monitor: '#059669', detect: '#d97706', recommend: '#7c3aed', execute: '#059669', learn: '#0284c7' };
const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
  completed: { color: '#059669', icon: CheckCircle },
  pending: { color: '#d97706', icon: Clock },
  approved: { color: '#0284c7', icon: ThumbsUp },
  rejected: { color: '#e11d48', icon: XCircle },
};

export default function AgentsPage() {
  const [actions, setActions] = useState(generateAgentActions());

  const handleAction = (id: string, decision: 'approved' | 'rejected') => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: decision } : a));
  };

  const activeAgents = [
    { name: 'Sensor Monitor', status: 'active', description: 'Scanning 156 sensors across 5 lines', tasks: 24, uptime: '99.7%' },
    { name: 'Anomaly Detector', status: 'active', description: 'ML-based anomaly detection on all machines', tasks: 8, uptime: '99.9%' },
    { name: 'Maintenance Planner', status: 'active', description: 'Predictive maintenance scheduling', tasks: 3, uptime: '98.5%' },
    { name: 'Production Optimizer', status: 'active', description: 'Real-time production speed optimization', tasks: 5, uptime: '99.2%' },
    { name: 'Energy Manager', status: 'active', description: 'Load balancing and energy optimization', tasks: 2, uptime: '99.8%' },
    { name: 'Quality Controller', status: 'idle', description: 'Automated quality inspection analysis', tasks: 0, uptime: '97.3%' },
  ];

  const pendingApprovals = actions.filter(a => a.status === 'pending');
  const pipeline = ['monitor', 'detect', 'recommend', 'execute', 'learn'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Agentic AI</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Autonomous factory agents with human-in-the-loop governance</p>
      </div>

      {/* Agent Pipeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Autonomous Agent Pipeline</h2>
        <div className="flex items-center justify-between">
          {pipeline.map((step, i) => {
            const Icon = typeIcons[step] || Workflow;
            const color = typeColors[step];
            return (
              <div key={step} className="flex items-center gap-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs" style={{ backgroundColor: `${color}15`, borderColor: `${color}40` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <span className="text-xs text-slate-700 capitalize font-bold">{step}</span>
                </motion.div>
                {i < pipeline.length - 1 && <ArrowRight className="w-5 h-5 text-slate-400 mx-2" />}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Agents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Active Autonomous Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeAgents.map((agent, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-4 hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
                  <span className={cn('flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border',
                    agent.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200')}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', agent.status === 'active' ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400')} />{agent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 font-medium">{agent.description}</p>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Tasks: <span className="text-slate-900 font-bold font-mono">{agent.tasks}</span></span>
                  <span className="text-slate-600">Uptime: <span className="text-emerald-700 font-bold font-mono">{agent.uptime}</span></span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Approval Queue */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-3xl bg-white border border-amber-200 p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-1 tracking-tight">Human Approval Queue</h2>
          <p className="text-xs text-slate-500 mb-4 font-medium">{pendingApprovals.length} actions awaiting supervisor review</p>
          <div className="space-y-3">
            {pendingApprovals.map(a => (
              <div key={a.id} className="rounded-2xl bg-amber-50/50 border border-amber-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-800">{a.agent}</span>
                  <span className={cn('text-xs font-bold px-2 py-0.5 rounded-md border', a.impact === 'high' ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-amber-100 text-amber-800 border-amber-200')}>{a.impact} impact</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mb-2">{a.description}</p>
                <div className="text-xs text-slate-600 font-medium mb-3">Confidence Score: <span className="font-bold text-slate-900 font-mono">{(a.confidence * 100).toFixed(0)}%</span></div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(a.id, 'approved')} className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1 shadow-xs"><ThumbsUp className="w-3.5 h-3.5" />Approve</button>
                  <button onClick={() => handleAction(a.id, 'rejected')} className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"><ThumbsDown className="w-3.5 h-3.5" />Reject</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Agent Action Audit Timeline</h2>
        <div className="space-y-2">
          {actions.map((action, i) => {
            const Icon = typeIcons[action.type] || Workflow;
            const color = typeColors[action.type];
            const Status = statusConfig[action.status]?.icon || Clock;
            return (
              <div key={action.id} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{action.agent}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider" style={{ backgroundColor: `${color}15`, color }}>{action.type}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{action.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Status className="w-4 h-4" style={{ color: statusConfig[action.status]?.color }} />
                  <span className="text-xs text-slate-500 font-mono font-semibold">{new Date(action.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Learning Feedback Loop */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Continuous Learning Feedback Loop</h2>
        <div className="flex items-center justify-between gap-4">
          {['Observe', 'Analyze', 'Predict', 'Act', 'Learn'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <span className="text-sm font-black text-emerald-700 font-mono">{i + 1}</span>
                </div>
                <span className="text-xs font-bold text-slate-700">{step}</span>
              </div>
              {i < 4 && <ArrowRight className="w-4 h-4 text-slate-400" />}
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Latest learning cycle completed: Model retrained with 847 new telemetry records. Predictive accuracy improved by +1.2%.</span>
        </div>
      </motion.div>
    </div>
  );
}
