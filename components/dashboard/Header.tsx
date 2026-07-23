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
    <header className="sticky top-0 z-40 h-16 flex items-center px-6 justify-between bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onToggle} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-all">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time Operational Intelligence</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search machines, predictive alerts, reports..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>{time}</span>
        </div>
        <button className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-[10px] text-white flex items-center justify-center font-bold shadow-md shadow-rose-200 border border-white">5</span>
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-sm cursor-pointer hover:scale-105 transition-transform">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-emerald-700 font-bold text-sm">AU</div>
        </div>
      </div>
    </header>
  );
}
