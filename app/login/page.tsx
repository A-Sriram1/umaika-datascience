'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Factory, Mail, Lock, ChevronDown, LogIn, Zap, Sparkles } from 'lucide-react';

const roles = ['Factory Admin', 'Production Manager', 'Plant Supervisor', 'Machine Operator', 'Maintenance Engineer', 'Quality Inspector', 'AI Engineer', 'CEO'];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Factory Admin');

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); router.push('/dashboard'); };
  const handleDemo = () => router.push('/dashboard');

  return (
    <div className="min-h-screen bg-[#070913] flex items-center justify-center relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Animated Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-[140px] animate-float-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/18 rounded-full blur-[160px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-[140px] animate-pulse-emerald" />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 backdrop-blur-3xl border border-emerald-500/30 p-8 shadow-2xl shadow-emerald-500/10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-amber-400 to-purple-500 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0f22] rounded-[14px] flex items-center justify-center">
                <Factory className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <span className="text-3xl font-black text-white tracking-wide">Factory<span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">Mind</span></span>
          </div>
          <p className="text-center text-emerald-200/90 text-xs font-semibold uppercase tracking-wider mb-8">Autonomous Intelligence Platform</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-400/80" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/40 transition-all shadow-inner" />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-400/80" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/40 transition-all shadow-inner" />
            </div>

            {/* Role Selector */}
            <div className="relative">
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-400/80 pointer-events-none" />
              <select value={role} onChange={e => setRole(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-white/10 text-sm font-semibold text-slate-200 focus:outline-none focus:border-emerald-400/60 appearance-none cursor-pointer">
                {roles.map(r => <option key={r} value={r} className="bg-slate-900 text-slate-200">{r}</option>)}
              </select>
            </div>

            {/* Sign In */}
            <button type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 text-slate-950 font-extrabold text-sm hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <LogIn className="w-4.5 h-4.5" /> Sign In to Factory Console
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-400 font-semibold uppercase">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Demo Mode */}
          <button onClick={handleDemo}
            className="w-full py-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-bold hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Enter Live Demo Console
          </button>
        </div>
      </motion.div>
    </div>
  );
}
