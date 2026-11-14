import React from 'react';
import { PageTitle } from '../components/shared';
import { MaterialSymbol } from '../components/icons';

const About: React.FC = () => {
  return (
    <div className="flex flex-col space-y-24 py-20 animate-fade-in bg-[#020617] px-6 min-h-screen">
      <div className="max-w-6xl mx-auto w-full">
        <PageTitle 
            title="NimbusIQ Sovereign OS" 
            subtitle="The Iron Dome for Insurance Claims. Engineered for B2B PropTech Infrastructure." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-20">
            <div className="space-y-12 text-left">
                <div className="space-y-4">
                    <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em]">The Vision</span>
                    <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                        Google Cloud <br />
                        <span className="text-indigo-500">Tier 3 Native.</span>
                    </h2>
                </div>
                <p className="text-slate-400 text-xl leading-relaxed font-medium">
                    Integrated deeply with the Google Cloud Startup Partner Program, NimbusIQ is built on 
                    serverless microservices designed for 100% variance match and zero-hallucination inference.
                </p>

                <div className="space-y-4">
                    <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em]">The Agent Swarm</span>
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40">
                        <table className="w-full text-left text-[11px] font-bold uppercase tracking-wider">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-4 text-white">Agent</th>
                                    <th className="p-4 text-white">Outcome</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-400">
                                <tr className="border-b border-white/5">
                                    <td className="p-4 text-indigo-400">ClaimCore</td>
                                    <td className="p-4">Forensic scope auditor; identifies missing drip edge/ice shield.</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-4 text-indigo-400">Sentinel</td>
                                    <td className="p-4">Computer vision; identifies hail damage and un-flashed valleys.</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-4 text-indigo-400">Pay-Guard</td>
                                    <td className="p-4">Financial agent; supplemental requests pushing to QuickBooks.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-indigo-400">APEX</td>
                                    <td className="p-4">Logistics; automated material ordering and crew dispatching.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-4">
                    <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em]">Executive Roadmap</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { phase: 'Phase 1', desc: 'Deploy ClaimCore and TCM Wuji via Cloud Run.' },
                            { phase: 'Phase 2', desc: 'Launch Agent Marketplace for specialized licensing.' },
                            { phase: 'Phase 3', desc: 'Scale Global Agent Economy (GGDK) to ledgers.' },
                        ].map((p, idx) => (
                            <div key={idx} className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl">
                                <span className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">{p.phase}</span>
                                <p className="text-xs font-bold text-white leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 bg-slate-900/60 border border-white/10 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <MaterialSymbol icon="format_quote" className="text-5xl text-indigo-500/20 mb-6" />
                    <p className="text-white text-lg font-bold leading-relaxed italic">
                        "We are building the Iron Dome for your insurance claims. Total transparency, absolute geometry."
                    </p>
                    <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-6">— Dustin Moore, Founder (dustin@nimbusroofing.com)</p>
                </div>
            </div>
            
            <div className="relative group">
                <div className="aspect-[4/5] bg-slate-900 border border-white/10 rounded-[4rem] overflow-hidden relative shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                        alt="Infrastructure" 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-left">
                        <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-left">Architectural Core</span>
                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Solid State <br /> Governance</h3>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;