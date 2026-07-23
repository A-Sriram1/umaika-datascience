'use client';
import React from 'react';
import { RefreshCw, AlertOctagon } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full rounded-3xl bg-[#0e1222] border border-rose-500/30 p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-6">
            <AlertOctagon className="w-7 h-7 text-rose-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Critical Platform Error</h1>
          <p className="text-xs text-slate-400 mb-6 font-mono text-left bg-black/40 p-3.5 rounded-2xl border border-white/5 text-rose-300">
            {error?.message || 'A global error occurred.'}
          </p>
          <button onClick={() => reset()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-amber-400 text-slate-950 font-extrabold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
            <RefreshCw className="w-4 h-4" /> Reload System Console
          </button>
        </div>
      </body>
    </html>
  );
}
