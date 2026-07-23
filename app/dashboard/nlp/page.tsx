'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FileText, Search, Sparkles, Tag, User, AlertTriangle, CheckCircle, MessageSquare, BookOpen } from 'lucide-react';
import { generateNLPAnalysis } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const tooltipStyle = { backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' };

const sampleTexts = [
  'CNC Lathe Alpha experienced increased vibration in the bearing assembly during the morning shift. Temperature readings on the spindle motor reached 87°C, which is above the normal operating range. The operator reported unusual noise patterns starting at 10:30 AM. Recommend immediate inspection of bearing assembly and possible replacement within 48 hours.',
  'Packaging Line D had 3 unplanned stops due to conveyor belt misalignment. Each stop lasted approximately 12 minutes. The maintenance team adjusted tension and alignment. Production was below target by 8%. Material waste increased by 2.3% during restart cycles.',
  'Weekly quality audit for Assembly Line B shows dimensional accuracy within spec for 97.2% of units. Surface finish defects detected in batch B-2847, traced to worn tooling on Mill Station 2. Tooling replacement completed. Post-replacement quality improved to 99.1%.',
];

export default function NLPPage() {
  const [text, setText] = useState(sampleTexts[0]);
  const [analysis, setAnalysis] = useState(() => generateNLPAnalysis(sampleTexts[0]));
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalysis(generateNLPAnalysis(text)); setAnalyzing(false); }, 1200);
  };

  const sentimentColor = analysis.sentiment.score > 0.2 ? '#22c55e' : analysis.sentiment.score < -0.2 ? '#ef4444' : '#f97316';
  const entityColors: Record<string, string> = { MACHINE: '#0ea5e9', COMPONENT: '#8b5cf6', PRODUCTION_LINE: '#06b6d4', TIME: '#f97316' };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">NLP Analysis</h1><p className="text-slate-500 text-sm mt-1">Natural language processing for manufacturing reports</p></div>

      {/* Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Input Text</h2>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
            className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-sky-500/30" />
          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleAnalyze} disabled={analyzing}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-sky-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
              {analyzing ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyzing...</> : <><Search className="w-4 h-4" />Analyze</>}
            </button>
            <div className="flex gap-2">
              {sampleTexts.map((s, i) => (
                <button key={i} onClick={() => { setText(s); setAnalysis(generateNLPAnalysis(s)); }}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-slate-400 hover:text-white transition-colors">Sample {i + 1}</button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sentiment + Entities */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-4">
          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Sentiment Analysis</h2>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold" style={{ color: sentimentColor }}>{analysis.sentiment.label}</div>
              <div className="flex-1">
                <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${((analysis.sentiment.score + 1) / 2) * 100}%`, backgroundColor: sentimentColor }} /></div>
                <div className="flex justify-between text-xs text-slate-500 mt-1"><span>Negative</span><span>Neutral</span><span>Positive</span></div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Named Entities</h2>
            <div className="flex flex-wrap gap-2">
              {analysis.entities.map((e, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: `${entityColors[e.type] || '#64748b'}15`, color: entityColors[e.type] || '#94a3b8' }}>
                  <Tag className="w-3 h-3" />{e.text}<span className="opacity-60">({e.type})</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keywords + Summary + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Keywords</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analysis.keywords} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 1]} />
              <YAxis type="category" dataKey="word" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300 leading-relaxed">{analysis.summary}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Recommendations</h2>
          <div className="space-y-3">
            {analysis.recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">{r}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
