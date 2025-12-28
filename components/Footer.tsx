
import React from 'react';
import { 
  Facebook, Linkedin, Instagram, Twitter, Mail, Phone, 
  MapPin, Heart, ChevronRight, Star, ArrowUpRight, 
  ShieldCheck, Globe, Zap, Users, Trophy, Cpu, 
  Activity, Database, Network, Terminal, Sparkles,
  Command, Layers, Fingerprint, Code2
} from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onRate: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onRate }) => {
  
  const handleNavigation = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020617] text-slate-400 pt-1 border-t border-emerald-500/20 overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. TOP STATUS BAR: THE "SYSTEM PULSE" */}
      <div className="bg-slate-900/40 backdrop-blur-md border-b border-white/5 py-3 px-6 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
              <span className="text-emerald-500">Node Status: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={12} className="text-slate-600" />
              <span className="text-slate-500">Sync: 100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-slate-600" />
              <span className="text-slate-500">Engine: AI-V3.2-Stable</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-slate-300">Avg Rating: 4.9/5.0</span>
             </div>
             <span className="text-slate-600">Region: Africa/Lagos</span>
          </div>
        </div>
      </div>

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Module 1: Brand & Identity */}
          <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between group hover:border-emerald-500/30 transition-all duration-500">
            <div>
              <div className="cursor-pointer mb-6 block transform origin-left hover:scale-105 transition-transform" onClick={(e) => handleNavigation(e, ViewState.HOME)}>
                <Logo variant="full" size={54} id="footer-bento-logo" />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                The intelligence layer connecting Africa's engineering elite with global opportunity. 
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
              {[Twitter, Linkedin, Instagram, Facebook].map((Social, i) => (
                <a key={i} href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-white transition-all text-slate-500">
                  <Social size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Module 2: Arranged Navigation Matrix */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-500">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
                <Layers size={14} className="text-emerald-500" /> Ecosystem
              </h4>
              <nav className="flex flex-col gap-4">
                {[
                  { label: 'Intelligence Hub', view: ViewState.HOME },
                  { label: 'Scholarship Scout', view: ViewState.SCHOLARSHIPS },
                  { label: 'Internship Portal', view: ViewState.INTERNSHIPS },
                  { label: 'Partner Gateway', view: ViewState.SPONSORS }
                ].map((item) => (
                  <a key={item.label} href="#" onClick={(e) => handleNavigation(e, item.view)} className="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-2 group">
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-orange-500/30 transition-all duration-500">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
                <Fingerprint size={14} className="text-orange-500" /> Account Node
              </h4>
              <nav className="flex flex-col gap-4">
                {[
                  { label: 'Personal Tracker', view: ViewState.DASHBOARD },
                  { label: 'Verified Profile', view: ViewState.PROFILE },
                  { label: 'System Settings', view: ViewState.SETTINGS },
                  { label: 'Alert Center', view: ViewState.NOTIFICATIONS }
                ].map((item) => (
                  <a key={item.label} href="#" onClick={(e) => handleNavigation(e, item.view)} className="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-2 group">
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Module 3: Engagement & Sync */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-emerald-600 p-8 rounded-[2rem] text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group">
              <Zap size={40} className="absolute -right-2 -top-2 opacity-10 group-hover:scale-125 transition-transform" />
              <h4 className="text-lg font-black mb-2">Intel Sync</h4>
              <p className="text-[11px] text-emerald-100 mb-6 leading-relaxed">Join the weekly broadcast of top-tier opportunities.</p>
              <form onSubmit={e => e.preventDefault()} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="name@university.edu" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-xs placeholder:text-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="w-full bg-white text-emerald-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Initialize Sync
                </button>
              </form>
            </div>

            {/* User Sentiment Component */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] flex flex-col justify-center items-center gap-4 group cursor-pointer hover:bg-white/[0.04] transition-all" onClick={onRate}>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className={i <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-400/30"} />
                  ))}
               </div>
               <div className="text-center">
                  <p className="text-white text-xs font-black uppercase tracking-widest leading-none mb-1">Highly Trusted</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Based on 2.4k Students</p>
               </div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR: COMPLIANCE & CREDITS */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      © {new Date().getFullYear()} NUESA INTEL UNIT
                   </p>
                </div>
                <div className="flex gap-8">
                    <a href="#" onClick={(e) => handleNavigation(e, ViewState.LEGAL)} className="text-[9px] font-bold text-slate-600 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors">Security Ethics</a>
                    <a href="#" onClick={(e) => handleNavigation(e, ViewState.LEGAL)} className="text-[9px] font-bold text-slate-600 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors">Access Policy</a>
                    <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors">Chapter Node</a>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-widest">Verified SSO</span>
                </div>
                <div className="flex items-center gap-2 group cursor-help">
                    <Code2 size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">v2.5.0 Stable</span>
                </div>
            </div>
        </div>

        {/* TERMINAL FOOTER LINE */}
        <div className="mt-12 text-center">
            <p className="text-[8px] font-mono text-slate-800 tracking-[0.8em] opacity-40">SYSTEM_EXIT_0x00_FOOTER_RENDER_COMPLETE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
