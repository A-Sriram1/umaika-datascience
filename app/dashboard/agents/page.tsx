'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Eye, Brain, Cog, Zap, Shield, RefreshCw, CheckCircle, Clock, XCircle, AlertTriangle, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { generateAgentActions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { monitor: Eye, detect: AlertTriangle, recommend: Brain, execute: Zap, learn: RefreshCw };
const typeColors: Record<string, string> = { monitor: '#0ea5e9', detect: '#f97316', recommend: '#8b5cf6', execute: '#22c55e', learn: '#06b6d4' };
const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
  completed: { color: '#22c55e', icon: CheckCircle },
  pending: { color: '#f97316', icon: Clock },
  approved: { color: '#0ea5e9', icon: ThumbsUp },
  rejected: { color: '#ef4444', icon: XCircle },
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
      <div><h1 className="text-2xl font-bold text-white">Agentic AI</h1><p className="text-slate-500 text-sm mt-1">Autonomous factory agents with human-in-the-loop</p></div>

      {/* Agent Pipeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Agent Pipeline</h2>
        <div className="flex items-center justify-between">
          {pipeline.map((step, i) => {
            const Icon = typeIcons[step] || Workflow;
            const color = typeColors[step];
            return (
              <div key={step} className="flex items-center gap-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <span className="text-xs text-slate-400 capitalize font-medium">{step}</span>
                </motion.div>
                {i < pipeline.length - 1 && <ArrowRight className="w-5 h-5 text-slate-600 mx-2" />}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Agents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Active Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeAgents.map((agent, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4 hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white text-sm">{agent.name}</h3>
                  <span className={cn('flex items-center gap-1 text-xs px-2 py-0.5 rounded-full',
                    agent.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400')}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', agent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-slate-400')} />{agent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3">{agent.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Tasks: <span className="text-white">{agent.tasks}</span></span>
                  <span className="text-slate-500">Uptime: <span className="text-green-400">{agent.uptime}</span></span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Approval Queue */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Approval Queue</h2>
          <p className="text-xs text-slate-500 mb-4">{pendingApprovals.length} actions awaiting review</p>
          <div className="space-y-3">
            {pendingApprovals.map(a => (
              <div key={a.id} className="rounded-xl bg-white/[0.03] border border-orange-500/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-orange-400">{a.agent}</span>
                  <span className={cn('text-xs px-1.5 py-0.5 rounded', a.impact === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400')}>{a.impact} impact</span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{a.description}</p>
                <div className="text-xs text-slate-500 mb-3">Confidence: {(a.confidence * 100).toFixed(0)}%</div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(a.id, 'approved')} className="flex-1 py-2 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors flex items-center justify-center gap-1"><ThumbsUp className="w-3 h-3" />Approve</button>
                  <button onClick={() => handleAction(a.id, 'rejected')} className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1"><ThumbsDown className="w-3 h-3" />Reject</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Action Timeline</h2>
        <div className="space-y-1">
          {actions.map((action, i) => {
            const Icon = typeIcons[action.type] || Workflow;
            const color = typeColors[action.type];
            const Status = statusConfig[action.status]?.icon || Clock;
            return (
              <div key={action.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  {i < actions.length - 1 && <div className="absolute top-8 left-1/2 w-px h-6 bg-white/[0.06] -translate-x-1/2" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{action.agent}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded capitalize" style={{ backgroundColor: `${color}15`, color }}>{action.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{action.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Status className="w-4 h-4" style={{ color: statusConfig[action.status]?.color }} />
                  <span className="text-xs text-slate-500">{new Date(action.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Learning Feedback */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Learning Feedback Loop</h2>
        <div className="flex items-center justify-between gap-4">
          {['Observe', 'Analyze', 'Predict', 'Act', 'Learn'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-sky-400">{i + 1}</span>
                </div>
                <span className="text-xs text-slate-400">{step}</span>
              </div>
              {i < 4 && <ArrowRight className="w-4 h-4 text-slate-600" />}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
          <p className="text-xs text-green-400">✓ Latest learning cycle completed: Updated failure prediction model with 847 new maintenance records. Accuracy improved by 1.2%.</p>
        </div>
      </motion.div>
    </div>
  );
}
