import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Zap, Activity, Terminal, Layers, Shield, Cpu, Network, Plus, CheckCircle2, FileText, Send } from 'lucide-react';
import { useShaman } from '../src/context/ShamanContext';
import { MaterialSymbol } from '../components/icons';
import MeshNetwork from '../components/MeshNetwork';
import ForwardDeployment from './ForwardDeployment';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'processing' | 'success' | 'error';
  type: string;
  load: number;
}

const AgentCanvas: React.FC = () => {
  const shaman = useShaman();
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'claim_core', name: 'ClaimCore', status: 'processing', type: 'Forensic Auditor', load: 68 },
    { id: 'sentinel', name: 'Sentinel Vision', status: 'idle', type: 'Computer Vision', load: 12 },
    { id: 'robotic_cv', name: 'Robotic Estimator', status: 'idle', type: 'Deep Learning CV', load: 0 },
    { id: 'pay_guard', name: 'Pay-Guard', status: 'idle', type: 'Financial Agent', load: 5 },
    { id: 'apex_ops', name: 'APEX Ops', status: 'idle', type: 'Logistics', load: 8 },
    { id: 'adjuster_sync', name: 'Adjuster Sync', status: 'idle', type: 'MCP Connector', load: 0 },
    { id: 'skye_intake', name: 'SKYE Intake', status: 'idle', type: 'Lead Egress', load: 5 },
  ]);

  const [activeWorkflow, setActiveWorkflow] = useState<'agents' | 'mesh' | 'deployment' | 'paperwork'>('agents');

  const addAgent = () => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}`,
      name: 'New IQ Node',
      status: 'idle',
      type: 'Synthesized Worker',
      load: 0
    };
    setAgents([...agents, newAgent]);
    shaman.executeAction('cmd_a2a_sync');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'success': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'error': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-white/5 rounded-2xl w-fit">
        {[
          { id: 'agents', label: 'Agent Swarm', icon: <Bot className="w-4 h-4" /> },
          { id: 'mesh', label: 'Mesh Topology', icon: <Network className="w-4 h-4" /> },
          { id: 'deployment', label: 'FDE Deployment', icon: <Zap className="w-4 h-4" /> },
          { id: 'paperwork', label: 'Claim Ops', icon: <FileText className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveWorkflow(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeWorkflow === tab.id ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]">
             <img src="https://storage.googleapis.com/aistudio-ux-team-data/demos/nimbus-logo.png" className="h-10 w-10 brightness-0 invert" alt="Gemma" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-1">
              {shaman.systemIdentity.name} <span className="text-indigo-500">Workspace</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">Iron Dome v3.1</span>
              <div className="h-3 w-px bg-white/10"></div>
              <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.3em] animate-pulse">Sovereign State Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Node Sync: 100%</span>
          </div>
          <button 
            onClick={addAgent}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Deploy Agent
          </button>
        </div>
      </div>

      {activeWorkflow === 'agents' && (
        <>
          {/* Architectural Layers Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Cpu className="w-5 h-5 text-indigo-400" />, label: 'Cognitive Core', value: 'Gemini 2.5 Flash' },
              { icon: <Shield className="w-5 h-5 text-emerald-400" />, label: 'Compute Engine', value: 'GCP Cloud Run (us-central1)' },
              { icon: <Layers className="w-5 h-5 text-amber-400" />, label: 'Database Integrity', value: 'Firestore Sovereign' },
              { icon: <Network className="w-5 h-5 text-sky-400" />, label: 'Edge Delivery', value: 'Firebase CDN' },
            ].map((layer, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                  {layer.icon}
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{layer.label}</p>
                  <p className="text-[10px] font-bold text-white uppercase tracking-tight">{layer.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">{agent.name}</h3>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{agent.type}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">
                        <span>Neural Load</span>
                        <span>{agent.load}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.load}%` }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <button className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-all">
                        <Terminal className="w-3 h-3" /> Logs
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-all">
                        <Zap className="w-3 h-3" /> Config
                      </button>
                    </div>
                  </div>

                  <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <Bot className="w-32 h-32" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button 
              onClick={addAgent}
              className="border-2 border-dashed border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.05]"
            >
              <div className="p-4 rounded-2xl bg-white/5 text-slate-600 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
                <Plus className="w-8 h-8" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white">Synthesize New Node</span>
            </button>
          </div>
        </>
      )}

      {activeWorkflow === 'mesh' && <MeshNetwork />}
      
      {activeWorkflow === 'deployment' && <ForwardDeployment />}

      {activeWorkflow === 'paperwork' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-[3rem] p-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Insurance Submission Engine</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Carrier Paperwork Generation', status: 'ready', icon: <FileText className="w-4 h-4" /> },
                { label: 'Supplement Logic Validation', status: 'ready', icon: <Shield className="w-4 h-4" /> },
                { label: 'E-Sign Link Dispatch', status: 'pending', icon: <Send className="w-4 h-4" /> },
                { label: 'Claim Egress (JobNimbus)', status: 'ready', icon: <Network className="w-4 h-4" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-950/50 border border-white/5 rounded-2xl group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-lg text-slate-500 group-hover:text-indigo-400 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] ${
                    item.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => shaman.executeAction('cmd_claims_reconciliation')}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3"
            >
              Initialize Submission Swarm
            </button>
          </div>

          <div className="bg-slate-950/40 border border-white/10 rounded-[3rem] p-10 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Follow-up Automation</h3>
              </div>
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl space-y-4">
              <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                "Adjuster Sync Agent has identified 3 carrier emails pending forensic follow-up. Initiating autonomous rebuttal sequence utilizing SATCALC V2 geometry."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-indigo-500/10">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                      <MaterialSymbol icon="person" className="text-xs text-slate-500" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest underline cursor-pointer">View Targets (3)</span>
              </div>
            </div>

            <div className="flex-grow space-y-4 overflow-y-auto max-h-[300px] pr-4 custom-scrollbar">
              {[
                { carrier: 'State Farm', ID: 'CLM_9482', time: '2m ago' },
                { carrier: 'Liberty Mutual', ID: 'CLM_1102', time: '14m ago' },
                { carrier: 'Allstate', ID: 'CLM_8831', time: '1h ago' },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-white uppercase tracking-tight">{c.carrier}</span>
                    <span className="text-[9px] font-mono text-slate-600">{c.ID}</span>
                  </div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Governance */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Directive Governance</h3>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {shaman.systemIdentity.primeDirectives.map((directive, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <p className="text-[9px] font-black text-white uppercase tracking-widest mb-1">{directive.label}</p>
                  <p className="text-[8px] text-slate-500 font-medium leading-tight">{directive.description}</p>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10 my-6"></div>
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-4">
                <Shield className={`w-4 h-4 ${shaman.neuroContext.firewallActive ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">System Firewall</span>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${shaman.neuroContext.firewallActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {shaman.neuroContext.firewallActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-4">
                <Cpu className={`w-4 h-4 ${shaman.neuroContext.isEnabled ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">NeuroContext BCI</span>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${shaman.neuroContext.isEnabled ? 'text-indigo-400' : 'text-slate-600'}`}>
                {shaman.neuroContext.isEnabled ? 'LINKED' : 'DISABLED'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Sovereign Logging</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-600">STATE: ENFORCED</span>
          </div>
          <div className="font-mono text-[10px] text-slate-400 space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar">
            <p className="text-indigo-400">[SYSTEM] NimbusIQ Sovereign OS Workspace synchronized.</p>
            <p className="text-indigo-400">[MESH] Toplogy verified across GCP/Gemini/Firestore.</p>
            <p className="text-emerald-400">[SUCCESS] ClaimCore identified $4,201.12 delta in State Farm scope.</p>
            <p className="text-indigo-400">[MCP] Scan complete: Follow-up required for Michael Merkel claim.</p>
            <p className="text-indigo-400">[NEURO] Engagement Level: Optimal for High-Fidelity Reasoning.</p>
            <p className="text-emerald-400">[SUCCESS] Forward Deployment Agent: Injected Python logic for A2A handovers.</p>
            <p>[INFO] Subdomain egress established: portal.nimbusiq.ai</p>
            <p>[INFO] Link active: nimbusroofing.com → iq_egress_node</p>
            <p className="text-emerald-400">[SUCCESS] SATCALC V2: Forensic geometry matches 100% variance lock.</p>
            <p className="text-indigo-400">[SYSTEM] Iron Dome v3.1 Guardrails active.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCanvas;
