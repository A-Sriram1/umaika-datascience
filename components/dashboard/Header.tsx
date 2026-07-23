'use client';
import { useState, useEffect } from 'react';
import { Menu, Search, Bell, Clock, Sparkles } from 'lucide-react';

interface HeaderProps { collapsed: boolean; onToggle: () => void; }

export default function Header({ collapsed, onToggle }: HeaderProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center px-6 justify-between bg-[#080b18]/85 backdrop-blur-2xl border-b border-emerald-500/20 shadow-lg shadow-emerald-950/20">
      <div className="flex items-center gap-4">
        <button onClick={onToggle} className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-emerald-300 border border-white/10 transition-all">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-time Operational Intelligence</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/80" />
          <input type="text" placeholder="Search machines, predictive alerts, reports..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/40 transition-all shadow-inner" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/25 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{time}</span>
        </div>
        <button className="relative p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-emerald-300 border border-white/10 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-[10px] text-white flex items-center justify-center font-bold shadow-md shadow-rose-500/40 border border-slate-900">5</span>
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 via-amber-400 to-purple-500 p-0.5 shadow-md shadow-emerald-500/30 cursor-pointer hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0f22] rounded-[10px] flex items-center justify-center text-emerald-300 font-bold text-sm">AU</div>
        </div>
      </div>
    </header>
  );
}
