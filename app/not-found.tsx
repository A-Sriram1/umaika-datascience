'use client';
import React from 'react';
import Link from 'next/link';
import { Factory, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-6 selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-md w-full rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 backdrop-blur-3xl border border-emerald-500/30 p-8 shadow-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
          <Factory className="w-7 h-7 text-emerald-400" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-amber-300 to-purple-300 bg-clip-text text-transparent font-mono mb-2">404</h1>
        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Route Unreachable</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">The requested operational page or telemetry endpoint could not be found.</p>
        <Link href="/dashboard"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 text-slate-950 font-extrabold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
          <Home className="w-4.5 h-4.5" /> Return to Dashboard Console
        </Link>
      </div>
    </div>
  );
}
