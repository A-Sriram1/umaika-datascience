'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Database, Palette, Key, Save, CheckCircle, Factory, Mail, Phone, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/lib/user-context';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Profile Form state initialized from UserContext
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '+1 (555) 0123');
  const [role, setRole] = useState(user.role);
  const [factoryName, setFactoryName] = useState(user.factoryName);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone || '+1 (555) 0123');
    setRole(user.role);
    setFactoryName(user.factoryName);
  }, [user]);

  const handleSave = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    updateUser({
      fullName,
      firstName,
      lastName,
      email,
      phone,
      role,
      factoryName,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account & Factory Settings</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage your enterprise user profile, role permissions, and system preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tab Nav */}
        <div className="w-full md:w-60 space-y-1.5 flex-shrink-0">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left',
                activeTab === t.id
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              )}>
              <t.icon className={cn('w-4 h-4', activeTab === t.id ? 'text-emerald-600' : 'text-slate-500')} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">User Profile Information</h2>
                
                {/* Avatar Banner */}
                <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 via-amber-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl font-black text-emerald-700">
                      {user.initials}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{user.fullName}</h3>
                    <p className="text-xs font-semibold text-emerald-700">{user.role} · {user.factoryName}</p>
                    <button className="mt-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-xs">
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">First Name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Last Name</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Work Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Factory Role</label>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Factory Plant / Facility Name</label>
                    <input type="text" value={factoryName} onChange={e => setFactoryName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Notification Preferences</h2>
                {['Critical Alerts', 'Maintenance Reminders', 'Production Updates', 'AI Recommendations', 'Weekly Reports', 'System Updates'].map(n => (
                  <div key={n} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-sm font-bold text-slate-800">{n}</span>
                    <div className="flex gap-4">
                      {['Email', 'Push', 'SMS'].map(ch => (
                        <label key={ch} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 cursor-pointer">
                          <input type="checkbox" defaultChecked={ch !== 'SMS'} className="rounded text-emerald-600 focus:ring-emerald-500" />{ch}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Security & Password</h2>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">System Integrations</h2>
                {[
                  { name: 'MQTT Broker', desc: 'mqtt://factory-iot.local:1883', status: 'Connected', color: '#059669' },
                  { name: 'Kafka Stream', desc: 'kafka://data-pipeline:9092', status: 'Connected', color: '#059669' },
                  { name: 'PostgreSQL', desc: 'factory_db @ db.factorymind.cloud', status: 'Connected', color: '#059669' },
                  { name: 'Redis Cache', desc: 'redis://cache.factorymind.cloud:6379', status: 'Connected', color: '#059669' },
                  { name: 'OpenAI API', desc: 'gpt-4o · Embeddings', status: 'Active', color: '#7c3aed' },
                ].map(int => (
                  <div key={int.name} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{int.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{int.desc}</div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-slate-200" style={{ backgroundColor: `${int.color}15`, color: int.color }}>{int.status}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Appearance & Theme</h2>
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Theme</h3>
                  <div className="flex gap-3">
                    {['Light White', 'Dark Cyber', 'System'].map(t => (
                      <button key={t} className={cn('px-6 py-3 rounded-2xl text-sm font-bold transition-all',
                        t === 'Light White' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm' : 'bg-slate-50 text-slate-600 border border-slate-200')}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
              {saved && (
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle className="w-4 h-4" /> Profile Updated Successfully!
                </span>
              )}
              <button onClick={handleSave} className="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white font-extrabold text-sm hover:shadow-lg hover:shadow-emerald-600/20 hover:scale-105 transition-all flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
