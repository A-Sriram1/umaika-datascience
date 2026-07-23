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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden selection:bg-emerald-500 selection:text-white font-sans">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Factory className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <span className="text-3xl font-black text-slate-900 tracking-wide">Factory<span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Mind</span></span>
          </div>
          <p className="text-center text-emerald-800 text-xs font-bold uppercase tracking-wider mb-8">Autonomous Intelligence Platform</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
            </div>

            {/* Role Selector */}
            <div className="relative">
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
              <select value={role} onChange={e => setRole(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer">
                {roles.map(r => <option key={r} value={r} className="bg-white text-slate-900">{r}</option>)}
              </select>
            </div>

            {/* Sign In */}
            <button type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white font-extrabold text-sm hover:shadow-lg hover:shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <LogIn className="w-4.5 h-4.5" /> Sign In to Factory Console
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-bold uppercase">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Demo Mode */}
          <button onClick={handleDemo}
            className="w-full py-3.5 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm font-bold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Enter Live Demo Console
          </button>
        </div>
      </motion.div>
    </div>
  );
}
