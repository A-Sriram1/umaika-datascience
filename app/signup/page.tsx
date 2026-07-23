'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Factory, Mail, Lock, User, Building, ChevronDown, UserPlus, Sparkles, CheckCircle } from 'lucide-react';
import { useUser } from '@/lib/user-context';

const roles = [
  'Factory Admin',
  'Production Manager',
  'Plant Supervisor',
  'Machine Operator',
  'Maintenance Engineer',
  'Quality Inspector',
  'AI Engineer',
  'CEO / Executive',
];

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useUser();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [factoryName, setFactoryName] = useState('');
  const [role, setRole] = useState('Factory Admin');
  const [success, setSuccess] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({
      fullName,
      email,
      role,
      factoryName,
    });
    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center py-12 px-4 relative overflow-hidden selection:bg-emerald-500 selection:text-white font-sans">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-10 shadow-2xl shadow-slate-200/60">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Factory className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <span className="text-3xl font-black text-slate-900 tracking-wide">Factory<span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Mind</span></span>
          </div>
          <p className="text-center text-emerald-800 text-xs font-bold uppercase tracking-wider mb-8">Create Enterprise Smart Factory Account</p>

          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Account Created Successfully!</h2>
              <p className="text-sm text-slate-600 font-medium">Initializing FactoryMind Autonomous Console for {fullName}...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input type="text" required placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
              </div>

              {/* Work Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input type="email" required placeholder="Work Email Address" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
              </div>

              {/* Factory / Company Name */}
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input type="text" required placeholder="Factory / Company Name" value={factoryName} onChange={e => setFactoryName(e.target.value)}
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

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input type="password" required placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white font-extrabold text-sm hover:shadow-lg hover:shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-2">
                <UserPlus className="w-4.5 h-4.5" /> Create Free Enterprise Account
              </button>
            </form>
          )}

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-600 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="font-extrabold text-emerald-600 hover:text-emerald-700 underline">
                Sign In
              </Link>
            </p>
            <button onClick={() => router.push('/dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Explore Live Demo Console Without Registering
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
