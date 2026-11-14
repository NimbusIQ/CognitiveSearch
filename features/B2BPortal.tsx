import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, FileBarChart, Globe, ExternalLink, ShieldCheck, Mail, Calculator, PhoneCall, PieChart as PieIcon, Info } from 'lucide-react';
import { PageTitle, ActionButton } from '../components/shared';
import { MaterialSymbol } from '../components/icons';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const B2BPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'claims' | 'adjusters' | 'paperwork' | 'voice_agents'>('claims');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const RECHARTS_CLAIM_DATA = [
    { name: 'Approved Supplements', value: 18, amount: '$112,450', color: '#10b981', desc: 'Forensic supplements verified and settled by carriers.' },
    { name: 'Pending Forensic Audit', value: 8, amount: '$48,320', color: '#6366f1', desc: 'Roofing claim scopes currently processing under automatic audits.' },
    { name: 'Reviewed / Rebuttal', value: 12, amount: '$72,150', color: '#f59e0b', desc: 'Supplement estimates currently awaiting carrier rebuttal or arbitration.' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-fade-in py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="h-20 w-20 rounded-3xl bg-indigo-500 flex items-center justify-center shadow-2xl">
             <img src="https://storage.googleapis.com/aistudio-ux-team-data/demos/nimbus-logo.png" className="h-12 w-12 brightness-0 invert" alt="Logo" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Subdomain: portal.nimbusiq.ai</span>
              <div className="h-3 w-px bg-white/10"></div>
              <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SSL_SECURED
              </span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">B2B Sovereign Portal</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
           <a href="https://nimbusroofing.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
              <Globe className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Connect Egress</span>
                <span className="text-xs font-bold text-white uppercase tracking-tight">NimbusRoofing.com</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-600 ml-2" />
           </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-80 space-y-4 text-left">
          {[
            { id: 'claims', label: 'Forensic Claims', icon: <FileBarChart className="w-5 h-5" />, count: 12 },
            { id: 'paperwork', label: 'Paperwork Engine', icon: <ShieldCheck className="w-5 h-5" />, count: 5 },
            { id: 'leads', label: 'Roofing Ingress', icon: <Calculator className="w-5 h-5" />, count: 48 },
            { id: 'voice_agents', label: 'Voice AI Console', icon: <PhoneCall className="w-5 h-5" />, count: 1 },
            { id: 'adjusters', label: 'Adjuster Sync', icon: <Users className="w-5 h-5" />, count: 3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between p-6 rounded-3xl border border-white/5 transition-all group ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-indigo-400'}`}>
                  {tab.icon}
                </div>
                <span className="text-sm font-black uppercase tracking-tight">{tab.label}</span>
              </div>
              {tab.count > 0 && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                  activeTab === tab.id ? 'bg-white text-indigo-600' : 'bg-white/5 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
          
          <div className="p-8 bg-slate-950/50 border border-white/5 rounded-[2.5rem] mt-10 space-y-6">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Cloud Statistics</h4>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
                    <span>API Egress</span>
                    <span className="text-white">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[94%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
                    <span>Carrier Approval</span>
                    <span className="text-white">72%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[72%]" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {activeTab === 'paperwork' && (
              <motion.div
                key="paperwork"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Insurance Submission Engine</h3>
                       <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Sovereign Document Synthesis & Egress</p>
                    </div>
                    <div className="flex gap-2">
                       <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase rounded-full border border-emerald-500/20">Validator: Active</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { name: 'Xactimate Scope', status: 'Ready', icon: 'description' },
                      { name: 'EagleView Ingress', status: 'Verified', icon: 'landscape' },
                      { name: 'Forensic Photo Pack', status: 'Ready', icon: 'photo_library' },
                    ].map((doc, i) => (
                      <div key={i} className="p-6 bg-slate-950/50 border border-white/5 rounded-3xl space-y-4">
                        <MaterialSymbol icon={doc.icon as any} className="text-3xl text-indigo-400" />
                        <div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">{doc.name}</h4>
                          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{doc.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center">
                        <MaterialSymbol icon="send" className="text-white text-2xl" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-white uppercase tracking-tight">Execute Carrier Transmission</span>
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Target: State Farm Claims Egress</span>
                      </div>
                    </div>
                    <ActionButton className="px-10 py-5 uppercase tracking-widest text-xs">Initialize Submission</ActionButton>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-6">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Submission Timeline</h4>
                   <div className="relative pl-10 space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                      {[
                        { title: 'Semantic Drift Check', time: '04:12:01', status: 'COMPLETE', color: 'bg-emerald-500' },
                        { title: 'Identity Logic Mapping', time: '04:12:30', status: 'COMPLETE', color: 'bg-emerald-500' },
                        { title: 'Xactimate Verification', time: '04:13:02', status: 'ACTIVE', color: 'bg-indigo-500' },
                        { title: 'Egress Handoff', time: '--:--:--', status: 'PENDING', color: 'bg-slate-700' },
                      ].map((step, i) => (
                        <div key={i} className="relative">
                          <div className={`absolute -left-10 top-1.5 h-2 w-2 rounded-full ring-4 ring-slate-950 ${step.color}`}></div>
                          <div className="flex justify-between items-center">
                            <div>
                               <h5 className="text-xs font-black text-white uppercase tracking-tight">{step.title}</h5>
                               <span className="text-[8px] font-mono text-slate-500">{step.time}</span>
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-widest ${step.status === 'COMPLETE' ? 'text-emerald-500' : step.status === 'ACTIVE' ? 'text-indigo-400' : 'text-slate-600'}`}>{step.status}</span>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'claims' && (
              <motion.div
                key="claims"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Left Column: Claims list */}
                  <div className="xl:col-span-2 space-y-6">
                    {[
                      { name: 'Michael Merkel', carrier: 'Liberty Mutual', delta: '$4,201.12', status: 'Audit Found', color: 'text-indigo-400 border-indigo-400/20 bg-indigo-500/5' },
                      { name: 'John Hope', carrier: 'State Farm', delta: '$5,982.44', status: 'Drafting Rebuttal', color: 'text-amber-400 border-amber-400/20 bg-amber-500/5' },
                      { name: 'Sarah Finch', carrier: 'Allstate', delta: '$2,104.90', status: 'Carrier Response', color: 'text-sky-400 border-sky-400/20 bg-sky-500/5' },
                    ].map((c, i) => (
                      <div key={i} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-white/10 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 font-black text-lg">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{c.name}</h3>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.carrier} Insurance</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Missed Revenue Found</span>
                          <span className="text-2xl font-black text-emerald-400">{c.delta}</span>
                        </div>

                        <div className="flex items-center gap-4">
                           <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${c.color}`}>
                            {c.status}
                           </div>
                           <ActionButton variant="secondary" className="px-5 py-3 text-[9px] font-black uppercase tracking-widest border-white/5 group-hover:border-indigo-500/30">
                            Open Scope
                           </ActionButton>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-10 border-2 border-dashed border-white/5 rounded-[3rem] text-center space-y-4 opacity-50 group hover:opacity-100 transition-opacity">
                       <Calculator className="w-12 h-12 text-slate-600 mx-auto" />
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Ingest New Xactimate Scope for Forensic Analysis</p>
                    </div>
                  </div>

                  {/* Right Column: Recharts Claim Status doughnut chart */}
                  <div className="space-y-6">
                    <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-8 space-y-6 relative overflow-hidden flex flex-col h-full justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-indigo-400">
                          <PieIcon className="w-5 h-5 text-indigo-400" />
                          <h4 className="text-xs font-black uppercase tracking-widest">Real-time status metrics</h4>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Claims Forensic Index Allocation</p>
                      </div>

                      {/* Doughnut Chart */}
                      <div className="relative w-full h-56 flex items-center justify-center my-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={RECHARTS_CLAIM_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={65}
                              outerRadius={85}
                              paddingAngle={4}
                              dataKey="value"
                              onMouseEnter={(_, index) => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            >
                              {RECHARTS_CLAIM_DATA.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.color} 
                                  stroke="#0f172a" 
                                  strokeWidth={2}
                                  className="transition-all duration-300 outline-none focus:outline-none cursor-pointer"
                                  style={{
                                    filter: hoveredIndex === index ? `drop-shadow(0px 0px 8px ${entry.color}80)` : 'none',
                                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6
                                  }}
                                />
                              ))}
                            </Pie>
                            <Tooltip 
                              cursor={false}
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-slate-950 border border-white/10 px-3 py-2 rounded-xl text-[10px] font-mono shadow-2xl">
                                      <p className="font-bold text-white uppercase">{data.name}</p>
                                      <p className="text-slate-400">Claims: <span className="text-white font-bold">{data.value}</span></p>
                                      <p className="text-slate-400">RCV Volume: <span className="text-emerald-400 font-bold">{data.amount}</span></p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>

                        {/* Center Labels */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-3xl font-black text-white font-mono tracking-tighter">
                            {hoveredIndex !== null ? RECHARTS_CLAIM_DATA[hoveredIndex].value : 38}
                          </span>
                          <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase leading-none mt-1">
                            {hoveredIndex !== null ? 'In Status' : 'Total Claims'}
                          </span>
                        </div>
                      </div>

                      {/* Legends */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                          {RECHARTS_CLAIM_DATA.map((item, index) => (
                            <button
                              key={index}
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                                hoveredIndex === index ? 'bg-white/5 border-white/20 shadow-md' : 'bg-slate-950/40 border-white/5'
                              }`}
                            >
                              <span className="h-2 w-2 rounded-full mb-1 animate-pulse" style={{ backgroundColor: item.color }}></span>
                              <span className="text-[9px] font-bold text-white tracking-tight leading-none block">{item.name.split(' ')[0]}</span>
                              <span className="text-[10px] font-mono text-slate-400 font-black mt-1">{item.value}</span>
                            </button>
                          ))}
                        </div>

                        {/* Description Panel */}
                        <div className="min-h-[76px] p-4 bg-slate-950 border border-white/5 rounded-2xl flex items-start gap-3 transition-all">
                          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                          <div className="space-y-1">
                            <h5 className="text-[10px] font-black text-white uppercase tracking-wider">
                              {hoveredIndex !== null ? RECHARTS_CLAIM_DATA[hoveredIndex].name : 'Claims distribution index'}
                            </h5>
                            <p className="text-[9px] text-slate-400 font-medium leading-normal uppercase">
                              {hoveredIndex !== null ? RECHARTS_CLAIM_DATA[hoveredIndex].desc : 'Hover sections of the doughnut chart to visualize detailed claims allocation metrics & cumulative volume.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'adjusters' && (
              <motion.div
                key="adjusters"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-slate-900 border border-white/10 rounded-[3.5rem] p-10 space-y-8 flex flex-col relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Mail className="w-32 h-32 text-indigo-500" />
                   </div>
                   
                   <div className="flex flex-col gap-2 relative z-10">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Unified Egress</h3>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Sovereign Adjuster Communications</p>
                   </div>

                   <div className="space-y-4 flex-grow relative z-10">
                      {[
                        { from: 'State Farm Catastrophe', claim: 'CLM_948', subject: 'Supplement Evaluation Phase 2', time: '12m ago' },
                        { from: 'Liberty Mutual Tech', claim: 'CLM_112', subject: 'Forensic Proof Received', time: '1h ago' },
                      ].map((m, i) => (
                        <div key={i} className="p-6 bg-slate-950/50 border border-white/5 rounded-3xl hover:border-indigo-500/50 transition-all cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                             <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-tight">{m.from}</span>
                             <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{m.time}</span>
                           </div>
                           <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">{m.subject}</h4>
                           <span className="text-[9px] font-mono text-slate-500 uppercase">Target: {m.claim}</span>
                        </div>
                      ))}
                   </div>

                   <ActionButton className="w-full py-6 text-sm uppercase tracking-[0.2em] relative z-10">
                    Sovereign Rebuttal Sync
                   </ActionButton>
                </div>

                <div className="bg-slate-950/50 border border-white/10 rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center gap-8 group">
                   <div className="relative">
                      <MaterialSymbol icon="voice_chat" className="text-[120px] text-slate-800 group-hover:text-indigo-500/20 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight">Real-time Adjuster Bridge</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">Autonomous voice-synthesis bridge for high-friction carrier conflict resolution.</p>
                   </div>
                   <ActionButton variant="secondary" className="px-10 py-5 text-[10px] font-black uppercase tracking-widest border-white/10 group-hover:border-indigo-500/40">
                    Initialize Bridge →
                   </ActionButton>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-900/60 border border-white/10 rounded-[3rem] p-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">Ingestion Ingress</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-widest">Target: NimbusRoofing.com Lead Egress Synchronization.</p>
                    <div className="space-y-4">
                       {[
                         { label: 'Weather Trigger (hail_lock_v2)', status: 'ACTIVE' },
                         { label: 'Semantic Lead Qualification', status: 'SYNCHRONIZED' },
                         { label: 'G-Calendar Egress (FDE)', status: 'WAITING' },
                       ].map((l, i) => (
                         <div key={i} className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{l.label}</span>
                           <span className={`text-[9px] font-black uppercase tracking-widest ${l.status === 'ACTIVE' ? 'text-indigo-400' : 'text-slate-600'}`}>
                            {l.status}
                           </span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-[3rem] p-10 space-y-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.1)_0%,transparent_70%)]"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">Product Goal alignment</h3>
                    </div>
                    <div className="relative z-10 space-y-4">
                       <p className="text-sm font-medium text-indigo-300 leading-relaxed">
                        "The primary product goal is the elimination of semantic drift in insurance restoration workflows by enforcing a deterministic, sovereign architecture."
                       </p>
                       <div className="pt-4 border-t border-indigo-500/10 flex flex-col gap-2">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Current Moat Status:</span>
                          <span className="text-xl font-black text-white uppercase tracking-tighter">IRON_DOME_ACTIVE</span>
                       </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                      <Calculator className="w-48 h-48 text-indigo-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-white/5 rounded-[3rem] p-10 flex flex-col md:flex-row justify-between items-center gap-10">
                   <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Forward Deployment Readiness</h4>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">System is optimized for forward deployment on nimbusroofing.com ingress nodes.</p>
                   </div>
                   <ActionButton onClick={() => setActiveTab('claims')} className="px-10 h-16 uppercase tracking-widest">Execute Full Sync</ActionButton>
                </div>
              </motion.div>
            )}

            {activeTab === 'voice_agents' && (
              <motion.div
                key="voice_agents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 text-left"
              >
                <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Voice AI Command Console</h3>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Grok API + LiveKit Full-Duplex WebRTC (Lat: ~680ms)</p>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Voice Core: Online</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { name: 'STT Pipeline', value: 'Google Cloud / Deepgram', desc: 'Auto Endpointing', color: 'text-indigo-400' },
                      { name: 'Reasoning Brain', value: 'Grok Voice Agent API', desc: 'Hybrid Gemini Fallback', color: 'text-emerald-400' },
                      { name: 'TTS Stream', value: 'Cartesia / ElevenLabs', desc: '24kHz Expressive Audio', color: 'text-sky-400' },
                      { name: 'CRM Sync', value: 'JobNimbus API Gateway', desc: 'Autonomous Booking', color: 'text-amber-400' }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 bg-slate-950/60 border border-white/5 rounded-3xl space-y-2">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.name}</span>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight leading-tight">{stat.value}</h4>
                        <p className={`text-[8px] font-mono leading-none ${stat.color}`}>{stat.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Active call waveform and simulator */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                    <div className="lg:col-span-2 bg-slate-950/40 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <PhoneCall className="w-5 h-5 text-indigo-400 animate-bounce" />
                          <span className="text-xs font-black text-white uppercase tracking-widest">Live Call Stream Simulation</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">Mckinney, TX (75071)</span>
                      </div>

                      {/* Waveform graphic */}
                      <div className="h-32 bg-slate-950 rounded-3xl flex items-center justify-center p-6 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent animate-pulse"></div>
                        <div className="flex items-center justify-center gap-1.5 h-16 relative z-10 w-full">
                          {[20, 40, 15, 60, 80, 45, 90, 30, 75, 40, 20, 50, 70, 30, 85, 40, 95, 20, 60, 40, 10, 30, 85, 55, 70, 25, 40, 80, 35, 10].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 10 }}
                              animate={{ height: [10, h, 10] }}
                              transition={{ repeat: Infinity, duration: 1.2 + (i % 3) * 0.2, delay: i * 0.02 }}
                              className="w-1.5 bg-gradient-to-t from-indigo-600 to-sky-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Script live transcript */}
                      <div className="space-y-4">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Direct Caller Transcript</span>
                        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2 text-xs">
                          <div className="p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/5 space-y-1">
                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Blake (Nimbus iQ AI)</span>
                            <p className="text-slate-200">"Thanks for calling Nimbus Roofing in McKinney, Texas. I understand you're calling about potential storm damage from the high winds yesterday. May I get your address so we can check the historic radar overlay?"</p>
                          </div>
                          <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl rounded-tr-none space-y-1 ml-auto max-w-[85%]">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Caller (Dustin M.)</span>
                            <p className="text-slate-300">"Yeah, I am at McKinney, TX 75071. We had some hail last week and I think our asphalt modified bitumen roof has asphalt granule loss. Needs an inspection."</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/5 space-y-1">
                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Blake (Nimbus iQ AI)</span>
                            <p className="text-slate-200">"Got it, McKinney 75071. Grounding logic shows hail lock triggers active there. I can book our forensic estimator to visit on Friday, May 15 at 2:00 PM CST. Would that fit your calendar?"</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Left Column: Actions / Stats */}
                    <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between space-y-6">
                      <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-widest">MVP Policy Enforcement</h4>
                        
                        <div className="space-y-3 text-[10px] uppercase font-bold text-slate-400 leading-tight">
                          <div className="p-3 bg-slate-900/50 border border-indigo-500/10 rounded-2xl flex items-center justify-between">
                            <span>Never Quote Unit Prices</span>
                            <span className="text-emerald-500">Active</span>
                          </div>
                          <div className="p-3 bg-slate-900/50 border border-indigo-500/10 rounded-2xl flex items-center justify-between">
                            <span>TCPA Disclosure Compliant</span>
                            <span className="text-emerald-500">Active</span>
                          </div>
                          <div className="p-3 bg-slate-900/50 border border-indigo-500/10 rounded-2xl flex items-center justify-between">
                            <span>Autonomous JobNimbus Sync</span>
                            <span className="text-emerald-500">Active</span>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl space-y-2 text-left">
                          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Vertex AI SAIF Guardrail</span>
                          </div>
                          <p className="text-[9px] text-slate-500 font-medium leading-relaxed uppercase">RAG database locks in custom metal fabrication specifications instantly with zero-loss data preservation.</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <ActionButton className="w-full py-5 text-xs uppercase tracking-wider" variant="primary">
                          LiveKit Telephony Override
                        </ActionButton>
                        <ActionButton className="w-full py-5 text-xs uppercase tracking-wider border-white/10" variant="secondary">
                          Inspect JobNimbus Lead payload
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-[3rem] p-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">Google for Startups MVP Strategy</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-2xl">
                      Synchronized on G-Cloud Memorystore for session context locks and low latency. Handover triggers successfully connect incoming residential lines directly to professional storm estimators based on regional radar variance.
                    </p>
                  </div>
                  <ActionButton className="px-10 h-16 uppercase tracking-widest text-xs shrink-0" onClick={() => setActiveTab('leads')}>
                    Configure Radar Triggers
                  </ActionButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default B2BPortal;
