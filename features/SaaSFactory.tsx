import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Server, Users, Database, ShieldCheck, Activity, BarChart3, Code, FileCode2, Terminal, ArrowRight, Bot, Target } from 'lucide-react';
import { PageTitle, ActionButton } from '../components/shared';
import { MaterialSymbol } from '../components/icons';

const SaaSFactory: React.FC = () => {
    const [activeSpoke, setActiveSpoke] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Telemetry states for isolation
    const [telemetry, setTelemetry] = useState({
        tenant_id: 'NIMBUS-A01-ROOF',
        trueSquares: 0,
        varianceDelta: 0,
        domeVerified: false,
        alerts: [] as string[]
    });

    const [processLog, setProcessLog] = useState<string[]>([
        "AETHER_SWARM: Hub-and-Spoke Topology ONLINE",
        "AWAITING_INGRESS: Sovereign Control Plane listening on port 8080..."
    ]);

    const addLog = (msg: string) => {
        setProcessLog(prev => [...prev.slice(-4), msg]);
    }

    const simulateSovereignProcessing = () => {
        setIsProcessing(true);
        addLog(`INGRESS_DETECTED: Tenant ${telemetry.tenant_id} payload received`);
        
        setTimeout(() => {
            addLog("SATCALC V2: Engaging multi-facet pitch grids (N ≥ 13 )");
            setTelemetry(prev => ({...prev, trueSquares: 54.2}));
            
            setTimeout(() => {
                addLog("CLAIMCORE: Evaluating Material Truth vs Carrier Allowances");
                setTelemetry(prev => ({...prev, varianceDelta: 16.5, domeVerified: true, alerts: ["IRC R905.2.8.2 Eave Omission"]}));
                
                setTimeout(() => {
                    addLog("LEDGER_SYNC: Cryptographic hash stored in Cloud Spanner.");
                    addLog("STATUS: A2A_SYNC_READY");
                    setIsProcessing(false);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    const resetEngine = () => {
        setTelemetry({
            tenant_id: 'NIMBUS-A01-ROOF',
            trueSquares: 0,
            varianceDelta: 0,
            domeVerified: false,
            alerts: []
        });
        setProcessLog([
             "AETHER_SWARM: Core cache flushed.",
             "AWAITING_INGRESS: Ready for next payload."
        ]);
        setActiveSpoke(null);
    }

    return (
        <div className="flex flex-col h-full max-w-7xl mx-auto px-4 w-full animate-fade-in py-10 space-y-12">
            <PageTitle 
                title="SaaS Factory Architecture" 
                subtitle="The Hub-and-Spoke Distribution Model for Multi-Tenant Micro-SaaS. Strict A2A isolation and Cloud Run Sovereign Computing."
            />

            {/* Architecture Diagram Visualization */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/[0.03] to-transparent pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-8">
                    <Network className="text-indigo-400 w-6 h-6" />
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Sovereign Control Plane (The Hub)</h3>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                    {/* INGRESS */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                        <div className="p-4 bg-slate-950 border border-white/10 rounded-2xl flex flex-col items-center shadow-lg relative group">
                            <div className="absolute -inset-1 bg-sky-500/20 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <ShieldCheck className="text-sky-400 w-8 h-8 mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-center">API Gateway / IAP<br/><span className="text-white">Tenant Auth</span></span>
                        </div>
                    </div>

                    <MaterialSymbol icon="arrow_forward" className="text-white/20 text-3xl shrink-0 hidden lg:block" />

                    {/* THE HUB (Orchestrator) */}
                    <div className="bg-indigo-950/30 border border-indigo-500/30 p-6 rounded-[2rem] flex flex-col items-center gap-6 flex-[2] relative shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                        <div className="absolute -top-3 px-4 py-1 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">Router / Cloud Run</div>
                        
                        <div className="flex w-full justify-around mt-4">
                            <div className="flex flex-col items-center gap-2 group">
                                <Database className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="text-[9px] font-mono text-slate-400 text-center">GraphDB<br/>Neo4j 77 Cities</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group">
                                <Activity className="text-emerald-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="text-[9px] font-mono text-slate-400 text-center">MathEngine<br/>SATCALC V2</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group">
                                <Target className="text-rose-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="text-[9px] font-mono text-slate-400 text-center">ClaimsCore<br/>Forensics</span>
                            </div>
                        </div>
                    </div>

                    <MaterialSymbol icon="arrow_forward" className="text-white/20 text-3xl shrink-0 hidden lg:block" />

                    {/* SPOKES (Multi-Tenant Egress) */}
                    <div className="flex flex-col gap-3 flex-1 w-full">
                        <div className="text-[9px] font-black uppercase text-center tracking-[0.2em] text-slate-500 mb-2">Dynamic Spokes</div>
                        <button onClick={() => setActiveSpoke('ROOFING')} className={`p-3 rounded-xl border transition-all text-left group ${activeSpoke === 'ROOFING' ? 'bg-indigo-500/20 border-indigo-500/40 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'}`}>
                            <div className="flex items-center gap-2">
                                <Bot className={`w-4 h-4 ${activeSpoke === 'ROOFING' ? 'text-indigo-400' : ''}`} />
                                <span className="text-[10px] font-black uppercase tracking-wider">RoofAI Pro</span>
                            </div>
                        </button>
                        <button onClick={() => setActiveSpoke('AUTO')} className={`p-3 rounded-xl border transition-all text-left group ${activeSpoke === 'AUTO' ? 'bg-amber-500/20 border-amber-500/40 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'}`}>
                            <div className="flex items-center gap-2">
                                <Bot className={`w-4 h-4 ${activeSpoke === 'AUTO' ? 'text-amber-400' : ''}`} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Agent-X F&I</span>
                            </div>
                        </button>
                        <button onClick={() => setActiveSpoke('EVIDENCE')} className={`p-3 rounded-xl border transition-all text-left group ${activeSpoke === 'EVIDENCE' ? 'bg-emerald-500/20 border-emerald-500/40 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'}`}>
                            <div className="flex items-center gap-2">
                                <Bot className={`w-4 h-4 ${activeSpoke === 'EVIDENCE' ? 'text-emerald-400' : ''}`} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Aether OS</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard / Telemetry HUD */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Visualizer & Command Console */}
                <div className="space-y-6">
                    <div className="bg-[#050B14] p-6 rounded-[2.5rem] border border-white/5 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Terminal className="w-4 h-4" /> Command Console
                            </h4>
                            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500">
                                <span className={`${isProcessing ? 'text-amber-400 animate-pulse' : 'text-emerald-500'}`}>
                                    ● {isProcessing ? 'COMPUTING' : telemetry.domeVerified ? 'A2A_SYNC_READY' : 'STANDBY'}
                                </span>
                            </div>
                        </div>
                        <div className="font-mono text-[10px] text-slate-300 space-y-2 pb-2 h-40 overflow-y-auto">
                            {processLog.map((log, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="text-slate-600">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
                                    <span className={`${log.includes('A2A_SYNC_READY') ? 'text-emerald-400 font-bold' : log.includes('AETHER_SWARM') ? 'text-indigo-400' : 'text-slate-300'}`}>{log}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-white/5 flex gap-4">
                            <ActionButton onClick={simulateSovereignProcessing} isLoading={isProcessing} className="flex-1 py-3 text-[10px]" variant="primary">
                                Execute Forensics Loop
                            </ActionButton>
                            <button onClick={resetEngine} disabled={isProcessing} className="px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase hover:bg-white/5 disabled:opacity-50 transition-colors">
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-white/5 space-y-4 shadow-xl">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                            <FileCode2 className="w-4 h-4 text-emerald-400" /> TDI Form Matrix (Class 4)
                        </h4>
                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-white/5">
                            <span className="text-[10px] font-mono uppercase text-slate-400">Iron Dome V2 Status</span>
                            {telemetry.domeVerified ? (
                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">VERIFIED</span>
                            ) : (
                                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">UNVERIFIED DATA</span>
                            )}
                        </div>
                        {telemetry.alerts.length > 0 && (
                            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-[10px] font-mono text-indigo-300">
                                <strong>COMPLIANCE ALERTS:</strong>
                                <ul className="list-disc pl-4 mt-2 space-y-1">
                                    {telemetry.alerts.map((a,i) => <li key={i}>{a}</li>)}
                                </ul>
                            </div>
                        )}
                        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium text-center">Signature Pad automatically unlocked upon successful state variance verification.</p>
                    </div>
                </div>

                {/* Radar / Financial Variance Visualizer */}
                <div className="bg-slate-900/40 p-8 rounded-[3rem] border border-white/5 shadow-2xl relative flex flex-col justify-center min-h-[400px]">
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <BarChart3 className="text-amber-400 w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Financial Delta Radar</span>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-8 z-10 w-full mt-6">
                        
                        {/* KPI Display */}
                        <div className="flex gap-8 w-full justify-center">
                            <div className="text-center p-6 bg-slate-950 rounded-3xl border border-white/5 shadow-inner w-40 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent"></div>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Calculated Squares</span>
                                <span className="text-3xl font-black text-white font-mono z-10 relative">{telemetry.trueSquares ? telemetry.trueSquares.toFixed(1) : '---'}</span>
                            </div>
                            <div className="text-center p-6 bg-slate-950 rounded-3xl border border-white/5 shadow-inner w-40 relative overflow-hidden group">
                                <div className={`absolute inset-0 bg-gradient-to-b ${telemetry.varianceDelta > 0 ? 'from-indigo-500/20' : 'from-slate-800/20'} to-transparent transition-colors duration-1000`}></div>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Variance Delta</span>
                                <span className={`text-3xl font-black font-mono z-10 relative transition-all duration-1000 ${telemetry.varianceDelta > 0 ? 'text-indigo-400 liquid-chrome' : 'text-slate-600'}`}>
                                    {telemetry.varianceDelta ? `+${telemetry.varianceDelta.toFixed(1)}` : '---'}
                                </span>
                            </div>
                        </div>

                        <div className="text-center max-w-sm">
                            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">Cryptographic Isolation Protocol</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                Strict Multi-Tenant Isolation using Cloud Firestore schemas guarantees operational metrics for <strong>{telemetry.tenant_id}</strong> are cryptographically sealed. GraphDB queries prevent cross-contamination across enterprise nodes.
                            </p>
                        </div>
                    </div>
                    
                    {/* Background Radar Animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full z-0 flex items-center justify-center opacity-30">
                        <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center">
                            <div className={`w-32 h-32 border ${isProcessing ? 'border-indigo-500/40 animate-[spin_4s_linear_infinite]' : 'border-white/5'} rounded-full`}></div>
                        </div>
                        {isProcessing && <div className="absolute top-1/2 left-1/2 w-[120px] h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-400 origin-left animate-[spin_2s_linear_infinite]"></div>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SaaSFactory;
