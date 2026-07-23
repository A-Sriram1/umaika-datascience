'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, FileText, Wrench, BarChart3, User, Copy, ThumbsUp } from 'lucide-react';
import { generateChatHistory } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const responses: Record<string, string> = {
  default: "Based on current factory data, I can see that **OEE is at 87.3%** with availability at 93.2%, performance at 91.5%, and quality at 97.8%.\n\n**Key observations:**\n- Production output is **4,521 units/hr**, 6% above yesterday\n- CNC Lathe Alpha shows elevated vibration (4.2 mm/s) — maintenance recommended within 48 hours\n- Energy consumption is down 8% due to off-peak load shifting\n- Line C has a developing bottleneck at Mill Station 2\n\nWould you like me to generate a detailed report or investigate any specific area?",
  production: "## Daily Production Report — " + new Date().toLocaleDateString() + "\n\n**Total Output:** 12,450 units (83% of target)\n**Active Lines:** 4 of 5\n**Average OEE:** 87.3%\n\n| Line | Output | Target | Efficiency | Defect Rate |\n|------|--------|--------|-----------|-------------|\n| Line A | 1,050 | 1,000 | 92.4% | 1.2% |\n| Line B | 870 | 900 | 88.1% | 2.1% |\n| Line C | 720 | 750 | 85.6% | 3.4% |\n| Line D | 1,380 | 1,500 | 94.7% | 0.8% |\n| Line E | — | — | Paused | — |\n\n**Top Issues:**\n1. Line C bottleneck at Mill Station 2\n2. Material shortage alert for aluminum 6061\n3. Planned maintenance for 3 machines tomorrow",
  maintenance: "## Maintenance Report\n\n**Upcoming Maintenance:**\n- **CNC Lathe Alpha** — Bearing replacement (Priority: HIGH, Due: 2 days)\n- **Welding Robot R1** — Calibration check (Priority: MEDIUM, Due: 5 days)\n- **Press Brake X2** — Hydraulic seal inspection (Priority: LOW, Due: 12 days)\n\n**Completed This Week:**\n- Assembly Bot A1: Motor replacement ✓\n- Conveyor C2: Belt tension adjustment ✓\n- Paint Booth PB1: Filter replacement ✓\n\n**Predictive Alerts:**\n- AI predicts 87% failure probability for CNC Lathe Alpha within 48 hours\n- Vibration trending upward on Grinding Machine G1",
  quality: "## Quality Report\n\n**Overall Quality Score:** 97.8%\n**Defective Units Today:** 147 out of 12,450 (1.18%)\n\n**Defects by Type:**\n- Dimensional: 52 (35.4%)\n- Surface Finish: 38 (25.9%)\n- Material: 22 (15.0%)\n- Assembly: 18 (12.2%)\n- Other: 17 (11.6%)\n\n**Batch Alerts:**\n- Batch B-2847: Surface defect spike (4.8%) — traced to worn tooling on Mill Station 2\n- Batch B-2851: Dimensional variance detected — investigating\n\n**Recommendation:** Replace tooling on Mill Station 2 and increase inspection frequency on Line B to every 30 minutes.",
};

const quickActions = [
  { label: 'Production Report', icon: BarChart3, key: 'production' },
  { label: 'Maintenance Report', icon: Wrench, key: 'maintenance' },
  { label: 'Quality Report', icon: FileText, key: 'quality' },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState(generateChatHistory());
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text: string, responseKey?: string) => {
    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = responseKey ? responses[responseKey] : responses.default;
      const botMsg = { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (input.trim()) sendMessage(input); };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      <div className="mb-4"><h1 className="text-2xl font-bold text-white">AI Assistant</h1><p className="text-slate-500 text-sm mt-1">Natural language interface for factory intelligence</p></div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat */}
        <div className="flex-1 flex flex-col rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(msg => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : '')}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>
                )}
                <div className={cn('max-w-[75%] rounded-2xl px-5 py-3 text-sm',
                  msg.role === 'user' ? 'bg-sky-500/20 text-white' : 'bg-white/[0.04] text-slate-300')}>
                  <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br/>').replace(/## (.*?)(<br\/>)/g, '<h3 class="text-lg font-semibold text-white mt-2 mb-1">$1</h3>').replace(/\|(.*?)\|/g, '<span class="font-mono text-xs">|$1|</span>') }} />
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/[0.04]">
                      <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"><Copy className="w-3 h-3" />Copy</button>
                      <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"><ThumbsUp className="w-3 h-3" />Helpful</button>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-violet-400" /></div>}
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                <div className="bg-white/[0.04] rounded-2xl px-5 py-3"><div className="flex gap-1">{[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}</div></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/[0.06]">
            <div className="flex gap-3">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about production, machines, quality..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/30" />
              <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-sky-500/20 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="w-72 space-y-4 hidden lg:block">
          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Generate Reports</h3>
            <div className="space-y-2">
              {quickActions.map(a => (
                <button key={a.key} onClick={() => sendMessage(`Generate ${a.label.toLowerCase()}`, a.key)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm text-slate-300 hover:bg-white/[0.06] transition-colors text-left">
                  <a.icon className="w-4 h-4 text-sky-400" />{a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Questions</h3>
            <div className="space-y-2">
              {['What is today\'s OEE?', 'Which machines need maintenance?', 'Show defect rate trends', 'Energy usage summary'].map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors">{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
