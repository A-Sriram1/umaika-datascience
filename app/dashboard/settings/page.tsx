'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Key, Database, Palette, Globe, Monitor, Save, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/constants';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Settings</h1><p className="text-slate-500 text-sm mt-1">Manage your account and preferences</p></div>

      <div className="flex gap-6">
        {/* Tab Nav */}
        <div className="w-56 space-y-1 flex-shrink-0">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={cn('w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all text-left',
                activeTab === t.id ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200')}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">AU</div>
                  <div><button className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.08]">Change Avatar</button>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG up to 5MB</p></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ l: 'First Name', v: 'Admin', t: 'text' }, { l: 'Last Name', v: 'User', t: 'text' }, { l: 'Email', v: 'admin@factorymind.ai', t: 'email' }, { l: 'Phone', v: '+1 (555) 0123', t: 'tel' }].map(f => (
                    <div key={f.l}><label className="text-sm text-slate-400 mb-1 block">{f.l}</label>
                      <input type={f.t} defaultValue={f.v} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 focus:outline-none focus:border-sky-500/30" /></div>
                  ))}
                </div>
                <div><label className="text-sm text-slate-400 mb-1 block">Role</label>
                  <div className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300">Factory Admin<span className="text-xs text-slate-500 ml-2">(Contact admin to change)</span></div></div>
                <div><label className="text-sm text-slate-400 mb-1 block">Factory</label>
                  <input defaultValue="Main Manufacturing Plant — Building A" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 focus:outline-none focus:border-sky-500/30" /></div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
                {['Critical Alerts', 'Maintenance Reminders', 'Production Updates', 'AI Recommendations', 'Weekly Reports', 'System Updates'].map(n => (
                  <div key={n} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                    <span className="text-sm text-slate-300">{n}</span>
                    <div className="flex gap-4">
                      {['Email', 'Push', 'SMS'].map(ch => (
                        <label key={ch} className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                          <input type="checkbox" defaultChecked={ch !== 'SMS'} className="rounded bg-white/[0.1] border-white/[0.2]" />{ch}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Security Settings</h2>
                <div><label className="text-sm text-slate-400 mb-1 block">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 focus:outline-none focus:border-sky-500/30" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm text-slate-400 mb-1 block">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 focus:outline-none focus:border-sky-500/30" /></div>
                  <div><label className="text-sm text-slate-400 mb-1 block">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 focus:outline-none focus:border-sky-500/30" /></div>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Active Sessions</h3>
                  {[{ device: 'Chrome — Windows 11', location: 'San Francisco, CA', time: 'Current session' }, { device: 'Safari — macOS', location: 'New York, NY', time: '2 hours ago' }].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <div><div className="text-sm text-slate-300">{s.device}</div><div className="text-xs text-slate-500">{s.location}</div></div>
                      <span className="text-xs text-slate-500">{s.time}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Audit Log</h3>
                  {['Login from 192.168.1.100 at 14:30', 'Settings updated at 13:15', 'Alert acknowledged at 12:45', 'Report exported at 11:00'].map((l, i) => (
                    <div key={i} className="text-xs text-slate-400 py-1.5 border-b border-white/[0.03] last:border-0">{l}</div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Integrations</h2>
                {[
                  { name: 'MQTT Broker', desc: 'mqtt://factory-iot.local:1883', status: 'Connected', color: '#22c55e' },
                  { name: 'Kafka Stream', desc: 'kafka://data-pipeline:9092', status: 'Connected', color: '#22c55e' },
                  { name: 'PostgreSQL', desc: 'factory_db @ db.factorymind.cloud', status: 'Connected', color: '#22c55e' },
                  { name: 'Redis Cache', desc: 'redis://cache.factorymind.cloud:6379', status: 'Connected', color: '#22c55e' },
                  { name: 'OpenAI API', desc: 'gpt-4o · Embeddings', status: 'Active', color: '#0ea5e9' },
                  { name: 'Slack Webhook', desc: '#factory-alerts channel', status: 'Disconnected', color: '#ef4444' },
                ].map(int => (
                  <div key={int.name} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]">
                    <div><div className="text-sm font-medium text-white">{int.name}</div><div className="text-xs text-slate-500">{int.desc}</div></div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: `${int.color}15`, color: int.color }}>{int.status}</span>
                  </div>
                ))}
                <div><label className="text-sm text-slate-400 mb-1 block">API Key</label>
                  <div className="flex gap-2"><input type="password" value="fm_sk_live_xxxxxxxxxxxxxxxxxxxx" readOnly className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 font-mono" />
                    <button className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300"><Key className="w-4 h-4" /></button></div></div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Appearance</h2>
                <div><h3 className="text-sm text-slate-400 mb-3">Theme</h3>
                  <div className="flex gap-3">
                    {['Dark', 'Light', 'System'].map(t => (
                      <button key={t} className={cn('px-6 py-3 rounded-xl text-sm font-medium transition-all',
                        t === 'Dark' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]')}>{t}</button>
                    ))}
                  </div>
                </div>
                <div><h3 className="text-sm text-slate-400 mb-3">Accent Color</h3>
                  <div className="flex gap-3">
                    {[{ name: 'Sky', color: '#0ea5e9' }, { name: 'Cyan', color: '#06b6d4' }, { name: 'Violet', color: '#8b5cf6' }, { name: 'Green', color: '#22c55e' }, { name: 'Orange', color: '#f97316' }].map(c => (
                      <button key={c.name} className={cn('w-10 h-10 rounded-xl border-2 transition-all', c.name === 'Sky' ? 'border-white' : 'border-transparent')} style={{ backgroundColor: c.color }} title={c.name} />
                    ))}
                  </div>
                </div>
                <div><h3 className="text-sm text-slate-400 mb-3">Dashboard Density</h3>
                  <div className="flex gap-3">
                    {['Compact', 'Comfortable', 'Spacious'].map(d => (
                      <button key={d} className={cn('px-5 py-2 rounded-xl text-sm', d === 'Comfortable' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]')}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-white/[0.06]">
              {saved && <span className="text-sm text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" />Saved!</span>}
              <button className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-sm text-white font-medium flex items-center gap-2"><Save className="w-4 h-4" />Save Changes</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
