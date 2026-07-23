'use client';
import React from 'react';
import Link from 'next/link';
import { Factory, Home, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-6 selection:bg-[#1b4d3e] selection:text-white font-sans">
      <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200 p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
          <Factory className="w-8 h-8 text-[#1b4d3e]" />
        </div>
        
        <div>
          <h1 className="text-6xl font-extrabold text-[#1b4d3e] font-serif tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-900 mt-2">Page Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">The requested page or URL path could not be located on the FactoryMind server.</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link href="/"
            className="w-full py-3 rounded-2xl bg-[#1b4d3e] text-white font-extrabold text-xs hover:bg-[#143c30] transition-all flex items-center justify-center gap-2 shadow-sm">
            <Home className="w-4 h-4" /> Return to Home Page
          </Link>
          <Link href="/dashboard"
            className="w-full py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-emerald-700" /> Go to Dashboard Console
          </Link>
        </div>
      </div>
    </div>
  );
}
