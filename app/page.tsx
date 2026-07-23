'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Share2, MessageCircle, ArrowRight, CheckCircle, Factory, Brain, Cog, Zap, UserPlus, Globe, Send, Mail, ChevronRight, ChevronLeft, Menu, X, Smartphone, Monitor } from 'lucide-react';

const carouselItems = [
  { id: '1', title: 'Robotics', img: '/images/robotics.jpg', route: '/dashboard/agents' },
  { id: '2', title: 'IoT Telemetry', img: '/images/iot_sensors.jpg', route: '/dashboard/machines' },
  { id: '3', title: 'Predictive AI', img: '/images/predictive_maintenance.jpg', route: '/dashboard/ai-predictions' },
  { id: '4', title: 'Autonomous Ops', img: '/images/smart_factory.jpg', route: '/dashboard' },
];

const categoryCircles = [
  { id: '1', title: 'Robotics', img: '/images/robotics.jpg' },
  { id: '2', title: 'IoT Sensors', img: '/images/iot_sensors.jpg' },
  { id: '3', title: 'Predictive AI', img: '/images/predictive_maintenance.jpg' },
  { id: '4', title: 'Deep Learning', img: '/images/smart_factory.jpg' },
  { id: '5', title: 'Process Control', img: '/images/robotics.jpg' },
  { id: '6', title: 'OEE Analytics', img: '/images/predictive_maintenance.jpg' },
];

export default function MagazineTemplatePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#1b4d3e] selection:text-white">
      
      {/* 1. Header Navigation (Responsive Android & PC) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Cursive Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-serif italic text-[#1b4d3e] font-extrabold tracking-tight">FactoryMind <span className="text-[#c48b71]">Journal</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-[#1b4d3e] border-b-2 border-[#1b4d3e] pb-1 font-bold">Home</Link>
            <a href="#about" className="hover:text-[#1b4d3e] transition-colors">About</a>
            <a href="#features" className="hover:text-[#1b4d3e] transition-colors">Features</a>
            <a href="#categories" className="hover:text-[#1b4d3e] transition-colors">Categories</a>
            <Link href="/dashboard" className="hover:text-[#1b4d3e] transition-colors">Console</Link>
          </div>

          {/* Search Input & Action Buttons (PC & Tablet) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search..."
                className="pl-9 pr-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b4d3e] w-40 focus:w-48 transition-all" />
            </div>
            <Link href="/login" className="px-4 py-1.5 text-xs font-bold rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all">
              Sign In
            </Link>
            <Link href="/signup" className="px-5 py-1.5 text-xs font-bold rounded-full bg-[#1b4d3e] text-white hover:bg-[#143c30] transition-all shadow-sm">
              Sign Up
            </Link>
          </div>

          {/* Mobile / Android Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/signup" className="px-3 py-1 text-xs font-bold rounded-full bg-[#1b4d3e] text-white">
              Sign Up
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile / Android Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 font-semibold text-sm">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#1b4d3e] font-bold">Home</Link>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Features</a>
              <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Categories</a>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Console Dashboard</Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700">Sign In</Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2.5 rounded-full bg-[#1b4d3e] text-white font-bold">Create Account</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Featured Banner Carousel (Responsive Android Grid) */}
      <section className="relative bg-[#1b4d3e] py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/smart_factory.jpg" alt="Smart Factory Background" fill className="object-cover" />
        </div>

        {/* Header Text */}
        <div className="relative max-w-5xl mx-auto text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-[10px] sm:text-xs font-bold mb-3 border border-white/20">
            <Smartphone className="w-3.5 h-3.5" /> Android & Mobile Optimized · <Monitor className="w-3.5 h-3.5 ml-1" /> PC Ready
          </div>
          <h1 className="text-2.5xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            AI Smart Manufacturing Journal
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-medium px-2">
            Autonomous process optimization, machine failure prediction, and IoT digital twin intelligence.
          </p>
        </div>

        {/* 4 Overlapping Circular Cards Grid (2x2 on Mobile Android, 4x1 on PC) */}
        <div className="relative max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {carouselItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center group cursor-pointer">
              <Link href={item.route} className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-white p-1 shadow-2xl bg-white overflow-hidden group-hover:scale-105 transition-transform duration-300 relative">
                  <Image src={item.img} alt={item.title} fill className="object-cover rounded-full" />
                </div>
                <span className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-extrabold text-white bg-slate-950/80 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 group-hover:bg-[#1b4d3e] transition-colors text-center">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Main Content Grid (1 Column on Android, 3 Columns on PC) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Left Column (Features Section - 2/3 width on PC) */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            
            {/* Features Header */}
            <div id="features" className="border-b-2 border-[#1b4d3e] pb-2 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1b4d3e]">Features</h2>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Smart Factory Intelligence</span>
            </div>

            {/* Feature 1: Stacked on Android, 2-Cols on PC */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs items-center">
              <div className="relative aspect-16/10 sm:aspect-4/3 rounded-xl overflow-hidden shadow-sm">
                <Image src="/images/predictive_maintenance.jpg" alt="Predictive Maintenance" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-between h-full py-1">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1b4d3e] mb-2">Predictive Maintenance & Failure Risk</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Machine learning algorithms monitor rotational speed, torque, air temperature, and tool wear to predict failure probability 72 hours before breakdown occurs.
                  </p>
                </div>
                <div>
                  <Link href="/dashboard/ai-predictions" className="inline-block px-4 py-1.5 text-xs font-bold rounded-md bg-[#e5cfc3] text-[#5c3e31] hover:bg-[#1b4d3e] hover:text-white transition-colors mb-3">
                    Read more
                  </Link>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5 text-slate-400" /> 1</span>
                    <div className="flex items-center gap-3">
                      <span>Share</span>
                      <a href="#" className="hover:text-[#1b4d3e]">f</a>
                      <a href="#" className="hover:text-[#1b4d3e]">tw</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Stacked on Android, 2-Cols on PC */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs items-center">
              <div className="order-2 md:order-1 flex flex-col justify-between h-full py-1">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1b4d3e] mb-2">Real-time IoT Sensor Telemetry Stream</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Streams 18 live sensor parameters including vibration, pressure, voltage, oil level, and temperature with automated threshold alerting and SHAP diagnostics.
                  </p>
                </div>
                <div>
                  <Link href="/dashboard/machines" className="inline-block px-4 py-1.5 text-xs font-bold rounded-md bg-[#e5cfc3] text-[#5c3e31] hover:bg-[#1b4d3e] hover:text-white transition-colors mb-3">
                    Read more
                  </Link>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5 text-slate-400" /> 4</span>
                    <div className="flex items-center gap-3">
                      <span>Share</span>
                      <a href="#" className="hover:text-[#1b4d3e]">f</a>
                      <a href="#" className="hover:text-[#1b4d3e]">tw</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative aspect-16/10 sm:aspect-4/3 rounded-xl overflow-hidden shadow-sm">
                <Image src="/images/iot_sensors.jpg" alt="IoT Sensor Stream" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </motion.div>

            {/* 2-Card Sub-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Bottom Card 1 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3.5 shadow-sm">
                    <Image src="/images/robotics.jpg" alt="Autonomous Robotics Control" fill className="object-cover" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-1.5">Autonomous Robotics Control</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Autonomous agents adjust assembly speeds and load balance across robotic production lines in real time.
                  </p>
                </div>
                <div>
                  <Link href="/dashboard/agents" className="inline-block px-4 py-1.5 text-xs font-bold rounded-md bg-[#e5cfc3] text-[#5c3e31] hover:bg-[#1b4d3e] hover:text-white transition-colors mb-3">
                    Read more
                  </Link>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 font-medium">
                    <span>Share</span>
                    <div className="flex gap-2">
                      <a href="#" className="hover:text-[#1b4d3e]">f</a>
                      <a href="#" className="hover:text-[#1b4d3e]">tw</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Card 2 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3.5 shadow-sm">
                    <Image src="/images/smart_factory.jpg" alt="OEE Plant Analytics" fill className="object-cover" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-1.5">OEE & Plant Analytics</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Track overall equipment effectiveness, downtime pareto breakdown, and revenue impact across facility lines.
                  </p>
                </div>
                <div>
                  <Link href="/dashboard/analytics" className="inline-block px-4 py-1.5 text-xs font-bold rounded-md bg-[#e5cfc3] text-[#5c3e31] hover:bg-[#1b4d3e] hover:text-white transition-colors mb-3">
                    Read more
                  </Link>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 font-medium">
                    <span>Share</span>
                    <div className="flex gap-2">
                      <a href="#" className="hover:text-[#1b4d3e]">f</a>
                      <a href="#" className="hover:text-[#1b4d3e]">tw</a>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-6 sm:space-y-8">
            
            {/* 1. News Letter Box */}
            <div className="bg-[#f5ebe6] p-5 sm:p-6 rounded-2xl border border-[#e8d5cb] text-center shadow-xs">
              <h3 className="text-lg font-serif font-bold text-[#1b4d3e] mb-1.5 border-b border-[#e5cfc3] pb-1">News Letter</h3>
              <p className="text-xs text-slate-600 mb-4 mt-2">Get the latest AI manufacturing insights, predictive maintenance reports, and IoT updates.</p>
              
              <form onSubmit={handleSubscribe}>
                <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-full bg-white border border-[#e2cfc3] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b4d3e] mb-3 text-center" />
                <button type="submit" className="w-full py-2.5 rounded-full bg-[#1b4d3e] text-white text-xs font-extrabold hover:bg-[#143c30] transition-colors shadow-sm">
                  {subscribed ? 'Subscribed!' : 'Sign Up'}
                </button>
              </form>
            </div>

            {/* 2. Categories Circular Grid Box */}
            <div id="categories" className="bg-[#fdfaf7] p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-serif font-bold text-[#1b4d3e] mb-4 border-b-2 border-[#1b4d3e] pb-1">Categories</h3>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {categoryCircles.map(cat => (
                  <div key={cat.id} className="flex flex-col items-center text-center cursor-pointer group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#1b4d3e] p-0.5 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform bg-white">
                      <Image src={cat.img} alt={cat.title} fill className="object-cover rounded-full" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 mt-2">{cat.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Follow Us Social Box */}
            <div className="bg-[#1b4d3e] p-5 sm:p-6 rounded-2xl text-white text-center shadow-md">
              <h3 className="text-lg font-serif font-bold mb-4">Follow</h3>
              
              <div className="flex items-center justify-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white text-[#1b4d3e] hover:bg-slate-100 flex items-center justify-center font-bold text-sm shadow-sm transition-all hover:scale-110">f</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white text-[#1b4d3e] hover:bg-slate-100 flex items-center justify-center font-bold text-sm shadow-sm transition-all hover:scale-110">ig</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white text-[#1b4d3e] hover:bg-slate-100 flex items-center justify-center font-bold text-sm shadow-sm transition-all hover:scale-110">p</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white text-[#1b4d3e] hover:bg-slate-100 flex items-center justify-center font-bold text-sm shadow-sm transition-all hover:scale-110">tw</a>
              </div>
            </div>

          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-serif italic text-base text-[#1b4d3e] font-bold">FactoryMind Journal</span>
          <span>&copy; 2026 FactoryMind Enterprise. All rights reserved.</span>
          <div className="flex gap-4 text-slate-600 font-semibold">
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
