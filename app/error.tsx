'use client';
import React, { useEffect } from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => {
    console.error('Runtime Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-6 selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-md w-full rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 backdrop-blur-3xl border border-rose-500/30 p-8 shadow-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/20">
          <AlertTriangle className="w-7 h-7 text-rose-400" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2 tracking-tight">System Exception Detected</h1>
        <p className="text-sm text-slate-300 mb-6 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5 font-mono text-left overflow-x-auto text-xs text-rose-300">
          {error?.message || 'An unexpected runtime error occurred.'}
        </p>
        <div className="flex gap-3">
          <button onClick={() => reset()}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 text-slate-950 font-extrabold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
            <RefreshCw className="w-4 h-4" /> Reset Application
          </button>
          <Link href="/dashboard"
            className="px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 font-bold text-sm hover:bg-white/[0.08] transition-all flex items-center justify-center">
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
