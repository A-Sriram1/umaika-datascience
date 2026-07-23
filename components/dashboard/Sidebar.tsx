'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/lib/constants';
import { LayoutDashboard, Factory, Cog, Brain, Network, FileText, Bot, Sparkles, Workflow, BarChart3, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Factory, Cog, Brain, Network, FileText, Bot, Sparkles, Workflow, BarChart3, Bell, Settings,
};

interface SidebarProps { collapsed: boolean; onToggle: () => void; }

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className={cn('fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 bg-[#070b19]/95 backdrop-blur-3xl border-r border-sky-500/15 shadow-2xl shadow-sky-500/5', collapsed ? 'w-20' : 'w-[280px]')}>
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30 flex-shrink-0">
          <div className="w-full h-full bg-[#090d1f] rounded-[10px] flex items-center justify-center">
            <Factory className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div className={cn('ml-3 overflow-hidden transition-all duration-300', collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100')}>
          <span className="text-xl font-extrabold text-white whitespace-nowrap tracking-wide">
            Factory<span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Mind</span>
          </span>
          <span className="block text-[10px] text-cyan-400/80 font-mono -mt-1 tracking-widest uppercase">AI Enterprise</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {NAVIGATION.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn('flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 group relative font-medium text-sm',
                active
                  ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100'
              )}>
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-sky-400 to-cyan-400 shadow-sm shadow-cyan-400" />
              )}
              <Icon className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
                active ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-400 group-hover:text-cyan-400'
              )} />
              <span className={cn('whitespace-nowrap transition-all duration-300', collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100')}>
                {item.label}
              </span>
              {item.badge && !collapsed && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold shadow-sm shadow-pink-500/30">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-4 bg-gradient-to-b from-transparent to-[#050814]/80">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 p-0.5 shadow-md shadow-sky-500/20">
              <div className="w-full h-full bg-[#0c1228] rounded-[10px] flex items-center justify-center text-cyan-300 font-bold text-sm">AU</div>
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">Admin User</div>
              <div className="text-xs text-cyan-400/90 font-medium truncate">Factory Admin</div>
            </div>
          </div>
        )}
        <button onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
          {collapsed ? <ChevronRight className="w-4 h-4 text-cyan-400" /> : <><ChevronLeft className="w-4 h-4 text-cyan-400" /><span className="text-xs font-medium">Collapse Menu</span></>}
        </button>
      </div>
    </div>
  );
}
