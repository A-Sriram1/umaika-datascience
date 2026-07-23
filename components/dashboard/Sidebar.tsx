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
    <div className={cn('fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 bg-white/95 backdrop-blur-2xl border-r border-slate-200 shadow-xl shadow-slate-200/50', collapsed ? 'w-20' : 'w-[280px]')}>
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-slate-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-md shadow-emerald-500/20 flex-shrink-0">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
            <Factory className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className={cn('ml-3 overflow-hidden transition-all duration-300', collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100')}>
          <span className="text-xl font-extrabold text-slate-900 whitespace-nowrap tracking-wide">
            Factory<span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Mind</span>
          </span>
          <span className="block text-[10px] text-emerald-700 font-mono -mt-1 tracking-widest uppercase font-bold">Autonomous AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {NAVIGATION.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn('flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative font-semibold text-sm',
                active
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}>
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-emerald-600 shadow-sm" />
              )}
              <Icon className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110',
                active ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-800'
              )} />
              <span className={cn('whitespace-nowrap transition-all duration-300', collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100')}>
                {item.label}
              </span>
              {item.badge && !collapsed && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold border border-rose-200">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-slate-200 p-4 bg-slate-50/80">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-emerald-700 font-bold text-sm">AU</div>
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-slate-900 truncate">Admin User</div>
              <div className="text-xs text-slate-500 font-medium truncate">Factory Admin</div>
            </div>
          </div>
        )}
        <button onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-all border border-slate-200">
          {collapsed ? <ChevronRight className="w-4 h-4 text-emerald-600" /> : <><ChevronLeft className="w-4 h-4 text-emerald-600" /><span className="text-xs font-semibold">Collapse Menu</span></>}
        </button>
      </div>
    </div>
  );
}
