import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Terminal, 
  Radio, 
  Server, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Lock, 
  Unlock, 
  Wifi, 
  Database, 
  Sparkles, 
  X,
  Play,
  Pause,
  RefreshCw,
  Bell,
  Gauge,
  Sliders,
  Send,
  Workflow
} from 'lucide-react';
import { useShaman } from '../src/context/ShamanContext';

export interface WorkflowItem {
  id: string;
  name: string;
  domain: 'ROOFING' | 'AUTOMOTIVE' | 'FINANCE' | 'COMMUNICATIONS' | 'CORE_OS';
  agent: string;
  status: 'EXECUTING' | 'OBSERVING' | 'PLANNING' | 'VALIDATING' | 'IDLE' | 'COMPLETED' | 'ERROR';
  currentPhase: 'OBSERVE' | 'PLAN' | 'VALIDATE' | 'SIMULATE';
  progress: number;
  tokensUsed: number;
  latencyMs: number;
  lastUpdated: string;
  details: string;
}

export interface SystemAlert {
  id: string;
  severity: 'CRITICAL' | 'WARN' | 'INFO' | 'SUCCESS';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  resolved: boolean;
}

interface CommandHUDProps {
  onNavigate?: (page: string) => void;
}

export const CommandHUD: React.FC<CommandHUDProps> = ({ onNavigate }) => {
  const shaman = useShaman();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'workflows' | 'tokens' | 'health' | 'terminal'>('workflows');
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'info' | 'warn' | 'success' | 'cmd'; time: string }>>([
    { text: 'NimbusIQ Sovereign OS Central Orchestrator Initialized.', type: 'info', time: '00:00:01' },
    { text: 'Photonic-Void protocol online. MCD Determinism: 100%.', type: 'success', time: '00:00:02' },
    { text: 'A2A Swarm Mesh linked: 54 Sovereign Nodes verified.', type: 'info', time: '00:00:03' },
  ]);

  // Token Metrics State
  const [tokenMetrics, setTokenMetrics] = useState({
    inputTokens: 384520,
    outputTokens: 92430,
    cachedTokens: 112000,
    totalTokens: 476950,
    contextLimit: 2097152, // 2M context window
    velocityTokPerSec: 142,
    burnRatePerHour: 0.18, // $ per hour
    avgLatencyMs: 38.4,
    cacheHitRate: 84.2,
  });

  // Active Workflows State
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: 'WF-01',
      name: 'SATCALC V2 Drone Geometric Parse',
      domain: 'ROOFING',
      agent: 'ClaimCore Sentinel',
      status: 'EXECUTING',
      currentPhase: 'VALIDATE',
      progress: 78,
      tokensUsed: 14280,
      latencyMs: 34,
      lastUpdated: '2s ago',
      details: 'Cross-validating 32-facet roof scan against IRC 2021 municipal pitch limits at $171.17/sq spend.'
    },
    {
      id: 'WF-02',
      name: 'F&I 4-Square Deal Matrix Ingestion',
      domain: 'AUTOMOTIVE',
      agent: 'Agent-X Desking Engine',
      status: 'OBSERVING',
      currentPhase: 'OBSERVE',
      progress: 45,
      tokensUsed: 6890,
      latencyMs: 28,
      lastUpdated: '4s ago',
      details: 'Streaming sub-50ms APR Tier 1-3 amortization curves to dealership POS.'
    },
    {
      id: 'WF-03',
      name: 'IRC Sec. 174 Software R&D Audit',
      domain: 'FINANCE',
      agent: 'Tax Prep King',
      status: 'COMPLETED',
      currentPhase: 'SIMULATE',
      progress: 100,
      tokensUsed: 24500,
      latencyMs: 52,
      lastUpdated: '12s ago',
      details: 'Extracted Chase & Stripe API labor ledgers into QuickBooks-validated forensic CSV.'
    },
    {
      id: 'WF-04',
      name: 'Twilio/ElevenLabs Voice Stream Triage',
      domain: 'COMMUNICATIONS',
      agent: 'Nancye Ingestion Matrix',
      status: 'EXECUTING',
      currentPhase: 'PLAN',
      progress: 62,
      tokensUsed: 8400,
      latencyMs: 41,
      lastUpdated: '1s ago',
      details: 'Grading incoming lead urgency (Grade: 9.4/10) - Auto-syncing with Monday.com.'
    },
    {
      id: 'WF-05',
      name: 'Geo-Hail Radar Crawler (>=1.0" Threshold)',
      domain: 'ROOFING',
      agent: 'Storm Glass Auto-Worm',
      status: 'OBSERVING',
      currentPhase: 'OBSERVE',
      progress: 90,
      tokensUsed: 11200,
      latencyMs: 19,
      lastUpdated: 'Just now',
      details: 'Polling NOAA & OpenWeatherMap radar returns for DFW/Lubbock metroplex.'
    }
  ]);

  // System Health Alerts
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: 'ALT-101',
      severity: 'WARN',
      title: 'Texas HB 2102 Deductible Audit Rule',
      message: 'Insured deductible verification required before final carrier release authorization.',
      source: 'ClaimCore Sentinel',
      timestamp: '2 mins ago',
      resolved: false,
    },
    {
      id: 'ALT-102',
      severity: 'INFO',
      title: 'A2A Sovereign Handshake Complete',
      message: 'Node-to-Node cryptographic checksum verified for 54 portfolio applications.',
      source: 'Mesh Orchestrator',
      timestamp: '5 mins ago',
      resolved: false,
    },
    {
      id: 'ALT-103',
      severity: 'SUCCESS',
      title: 'Photonic-Void Zero-Drift Anchor',
      message: 'AlloyDB ledger synced with zero token divergence across active swarms.',
      source: 'Security Kernel',
      timestamp: '8 mins ago',
      resolved: true,
    }
  ]);

  // Keyboard shortcut listener: Cmd/Ctrl + H toggles HUD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        setIsExpanded(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live simulation ticker for tokens and workflow progress
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // Dynamic token usage fluctuation
      const tokenDelta = Math.floor(Math.random() * 85) + 15;
      setTokenMetrics(prev => {
        const nextInput = prev.inputTokens + tokenDelta;
        const nextOutput = prev.outputTokens + Math.floor(tokenDelta * 0.35);
        return {
          ...prev,
          inputTokens: nextInput,
          outputTokens: nextOutput,
          totalTokens: nextInput + nextOutput,
          velocityTokPerSec: Math.floor(Math.random() * 40) + 120,
          avgLatencyMs: Number((35 + Math.random() * 8).toFixed(1)),
        };
      });

      // Advance active workflows slightly
      setWorkflows(prev => prev.map(wf => {
        if (wf.status === 'EXECUTING' || wf.status === 'PLANNING' || wf.status === 'OBSERVING') {
          const nextProg = wf.progress >= 98 ? 15 : wf.progress + Math.floor(Math.random() * 4) + 1;
          const phases: Array<'OBSERVE' | 'PLAN' | 'VALIDATE' | 'SIMULATE'> = ['OBSERVE', 'PLAN', 'VALIDATE', 'SIMULATE'];
          const phaseIdx = Math.min(3, Math.floor(nextProg / 25));
          return {
            ...wf,
            progress: nextProg,
            currentPhase: phases[phaseIdx],
            tokensUsed: wf.tokensUsed + Math.floor(Math.random() * 20),
            latencyMs: Math.floor(Math.random() * 20) + 25,
            lastUpdated: 'Just now'
          };
        }
        return wf;
      }));
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const activeWorkflowsCount = useMemo(() => {
    return workflows.filter(w => w.status === 'EXECUTING' || w.status === 'OBSERVING' || w.status === 'PLANNING').length;
  }, [workflows]);

  const unresolvedAlertsCount = useMemo(() => {
    return alerts.filter(a => !a.resolved).length;
  }, [alerts]);

  const contextPercent = useMemo(() => {
    return ((tokenMetrics.totalTokens / tokenMetrics.contextLimit) * 100).toFixed(1);
  }, [tokenMetrics]);

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    setTerminalLogs(prev => [
      { text: `System alert [${id}] marked as resolved by operator.`, type: 'info', time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19)
    ]);
  };

  const handleTriggerAction = async (actionName: string, actionId?: string) => {
    setTerminalLogs(prev => [
      { text: `[DISPATCH] Triggering ${actionName}...`, type: 'cmd', time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19)
    ]);

    if (actionId) {
      await shaman.executeAction(actionId);
    } else {
      await new Promise(r => setTimeout(r, 600));
    }

    setTerminalLogs(prev => [
      { text: `[COMPLETED] ${actionName} executed successfully within Photonic-Void sandbox.`, type: 'success', time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19)
    ]);
  };

  const handleSendTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    setTerminalLogs(prev => [
      { text: `$ ${cmd}`, type: 'cmd', time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19)
    ]);
    setTerminalInput('');

    // Process sample commands
    setTimeout(() => {
      if (cmd.toLowerCase().includes('help')) {
        setTerminalLogs(prev => [
          { text: 'Available commands: sync, satcalc, audit, clear, status, ping, bci', type: 'info', time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 19)
        ]);
      } else if (cmd.toLowerCase().includes('status')) {
        setTerminalLogs(prev => [
          { text: `Swarm Status: ONLINE (${activeWorkflowsCount} active). MCD Grounding: 100%. Latency: ${tokenMetrics.avgLatencyMs}ms`, type: 'success', time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 19)
        ]);
      } else if (cmd.toLowerCase().includes('clear')) {
        setTerminalLogs([]);
      } else if (cmd.toLowerCase().includes('satcalc')) {
        handleTriggerAction('SATCALC V2 Geometry Engine', 'cmd_satcalc_optimize');
      } else if (cmd.toLowerCase().includes('sync')) {
        handleTriggerAction('A2A Mesh Handshake', 'cmd_a2a_sync');
      } else {
        setTerminalLogs(prev => [
          { text: `Executed custom command '${cmd}' via Gemini Agentic Kernel. State hash 0x7F9A verified.`, type: 'info', time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 19)
        ]);
      }
    }, 400);
  };

  return (
    <>
      {/* 1. FLOATING PERSISTENT HUD TOP-BAR / PILL */}
      <div className="fixed top-3 right-4 sm:right-6 z-[60] flex items-center gap-2 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950/85 backdrop-blur-2xl border border-white/10 hover:border-indigo-500/40 rounded-2xl p-1.5 shadow-2xl flex items-center gap-2.5 transition-all group"
        >
          {/* Main Status Capsule */}
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            id="command-hud-toggle-btn"
            className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 transition-all border border-white/5"
            title="Toggle Command HUD (Cmd+H / Ctrl+H)"
          >
            {/* Live radar pulse icon */}
            <div className="relative flex items-center justify-center">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-black tracking-wider uppercase text-white font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">HUD</span>
              </span>
              <span className="h-3 w-px bg-white/10 hidden sm:inline"></span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <Workflow className="w-3 h-3 text-emerald-400" />
                <span>{activeWorkflowsCount} Swarms</span>
              </span>
              <span className="h-3 w-px bg-white/10 hidden md:inline"></span>
              <span className="text-[11px] font-mono text-cyan-300 font-semibold hidden md:flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>{(tokenMetrics.totalTokens / 1000).toFixed(0)}k Tok</span>
              </span>
              {unresolvedAlertsCount > 0 && (
                <>
                  <span className="h-3 w-px bg-white/10"></span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    <span>{unresolvedAlertsCount}</span>
                  </span>
                </>
              )}
            </div>

            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            )}
          </button>

          {/* Quick Simulation Pause / Play */}
          <button
            onClick={() => setIsLiveSimulating(p => !p)}
            className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-white/5"
            title={isLiveSimulating ? 'Pause Live Telemetry Stream' : 'Resume Live Telemetry Stream'}
          >
            {isLiveSimulating ? <Pause className="w-3.5 h-3.5 text-indigo-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </motion.div>
      </div>

      {/* 2. EXPANDED HIGH-DENSITY COMMAND HUD MODAL / DRAWER */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 right-4 sm:right-6 z-[60] w-[95vw] sm:w-[580px] lg:w-[680px] max-h-[85vh] bg-slate-950/95 backdrop-blur-3xl border border-indigo-500/30 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header / Top Bar */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
                  <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-black uppercase tracking-wider text-white">
                      Command HUD
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      LIVE v2.5.0
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    NimbusIQ Sovereign OS • High-Density Swarm Telemetry
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-all"
                  title="Close HUD"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-4 gap-2 p-3 bg-slate-900/50 border-b border-white/5 text-center">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Swarms Active</span>
                <span className="text-xs font-black font-mono text-emerald-400">{activeWorkflowsCount} of {workflows.length}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Token Velocity</span>
                <span className="text-xs font-black font-mono text-cyan-400">{tokenMetrics.velocityTokPerSec} tok/s</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Avg Latency</span>
                <span className="text-xs font-black font-mono text-indigo-400">{tokenMetrics.avgLatencyMs} ms</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Photonic Void</span>
                <span className="text-xs font-black font-mono text-amber-400">Deterministic</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-white/10 bg-slate-950/80 px-4 pt-2 gap-2">
              <button
                onClick={() => setActiveTab('workflows')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'workflows'
                    ? 'border-indigo-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                <span>Workflows ({activeWorkflowsCount})</span>
              </button>

              <button
                onClick={() => setActiveTab('tokens')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'tokens'
                    ? 'border-indigo-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tokens & Latency</span>
              </button>

              <button
                onClick={() => setActiveTab('health')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'health'
                    ? 'border-indigo-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Health & Alerts ({unresolvedAlertsCount})</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'terminal'
                    ? 'border-indigo-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-pink-400" />
                <span>Executive Terminal</span>
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-4 sm:p-5 overflow-y-auto max-h-[52vh] space-y-4 custom-scrollbar">
              
              {/* TAB 1: WORKFLOWS */}
              {activeTab === 'workflows' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Active Sovereign Swarm Routines
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTriggerAction('All Swarm Resync', 'cmd_a2a_sync')}
                        className="text-[10px] font-mono font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Resync Swarm</span>
                      </button>
                    </div>
                  </div>

                  {workflows.map((wf) => (
                    <div
                      key={wf.id}
                      className="p-3.5 bg-slate-900/70 hover:bg-slate-900 border border-white/5 hover:border-white/15 rounded-2xl transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white tracking-tight">
                              {wf.name}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                              {wf.id}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                            Agent: <strong className="text-indigo-300">{wf.agent}</strong> • {wf.lastUpdated}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                            wf.status === 'EXECUTING' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                            wf.status === 'OBSERVING' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                            wf.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            'bg-slate-800 text-slate-400 border-white/10'
                          }`}>
                            {wf.currentPhase}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {wf.details}
                      </p>

                      {/* Progress Bar & Phase Stepper */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <span className="text-white font-bold">{wf.progress}%</span>
                            <span className="text-slate-600">|</span>
                            <span>{wf.tokensUsed.toLocaleString()} tokens</span>
                          </span>
                          <span className="text-emerald-400 font-bold">{wf.latencyMs}ms</span>
                        </div>

                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                            style={{ width: `${wf.progress}%` }}
                          ></div>
                        </div>

                        {/* Photonic Void Execution Chain Indicators */}
                        <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-wider text-slate-500 pt-0.5">
                          <span className={wf.currentPhase === 'OBSERVE' ? 'text-cyan-400 font-bold' : ''}>1. Observe</span>
                          <span>→</span>
                          <span className={wf.currentPhase === 'PLAN' ? 'text-indigo-400 font-bold' : ''}>2. Plan</span>
                          <span>→</span>
                          <span className={wf.currentPhase === 'VALIDATE' ? 'text-amber-400 font-bold' : ''}>3. Validate</span>
                          <span>→</span>
                          <span className={wf.currentPhase === 'SIMULATE' ? 'text-emerald-400 font-bold' : ''}>4. Execute</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: TOKENS & LATENCY */}
              {activeTab === 'tokens' && (
                <div className="space-y-4">
                  {/* Context Window Gauge */}
                  <div className="p-4 bg-slate-900/70 border border-white/10 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-cyan-400" />
                        Gemini 2.0M Context Utilization
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {contextPercent}% Occupied
                      </span>
                    </div>

                    <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Number(contextPercent))}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Active: <strong>{tokenMetrics.totalTokens.toLocaleString()}</strong> tokens</span>
                      <span>Max: <strong>2,097,152</strong> tokens</span>
                    </div>
                  </div>

                  {/* Token breakdown grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900/60 border border-white/5 rounded-2xl">
                      <span className="text-[10px] font-mono text-slate-400 block">Input Prompt Tokens</span>
                      <span className="text-base font-black font-mono text-white block mt-1">
                        {tokenMetrics.inputTokens.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400">Prompt Caching: {tokenMetrics.cacheHitRate}%</span>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-white/5 rounded-2xl">
                      <span className="text-[10px] font-mono text-slate-400 block">Output Generation Tokens</span>
                      <span className="text-base font-black font-mono text-indigo-300 block mt-1">
                        {tokenMetrics.outputTokens.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">Velocity: ~{tokenMetrics.velocityTokPerSec} tok/s</span>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-white/5 rounded-2xl">
                      <span className="text-[10px] font-mono text-slate-400 block">Automotive Desking Latency</span>
                      <span className="text-base font-black font-mono text-emerald-400 block mt-1">
                        {tokenMetrics.avgLatencyMs} ms
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">&lt; 50ms Hard Constraint Met</span>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-white/5 rounded-2xl">
                      <span className="text-[10px] font-mono text-slate-400 block">Estimated Compute Burn</span>
                      <span className="text-base font-black font-mono text-amber-300 block mt-1">
                        ${tokenMetrics.burnRatePerHour}/hr
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">Sec 174 R&D Eligible</span>
                    </div>
                  </div>

                  {/* Quick trigger actions */}
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Optimize Context Cache</span>
                      <span className="text-[10px] font-mono text-indigo-300">Purge redundant vectors and preserve anchor states</span>
                    </div>
                    <button
                      onClick={() => handleTriggerAction('Context Optimization', 'cmd_satcalc_optimize')}
                      className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                    >
                      Compress
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: HEALTH & ALERTS */}
              {activeTab === 'health' && (
                <div className="space-y-4">
                  {/* System Core Diagnostics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div className="p-2.5 bg-slate-900/70 border border-white/5 rounded-xl flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 block">AlloyDB Ledger</span>
                        <span className="text-xs font-bold text-white">SYNCED (0.997)</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900/70 border border-white/5 rounded-xl flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 block">Texas SB 458 Penalty</span>
                        <span className="text-xs font-bold text-white">ACTIVE (18%)</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900/70 border border-white/5 rounded-xl flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 block">NOAA Hail Radar</span>
                        <span className="text-xs font-bold text-white">POLLING (1.0")</span>
                      </div>
                    </div>
                  </div>

                  {/* Alert Feed */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Real-Time System & Compliance Feed
                    </span>

                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          alert.resolved 
                            ? 'bg-slate-950/50 border-white/5 opacity-60' 
                            : alert.severity === 'WARN'
                            ? 'bg-amber-500/10 border-amber-500/30'
                            : alert.severity === 'CRITICAL'
                            ? 'bg-rose-500/10 border-rose-500/30'
                            : 'bg-indigo-500/10 border-indigo-500/30'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {alert.severity === 'WARN' ? (
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          ) : alert.severity === 'CRITICAL' ? (
                            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{alert.title}</span>
                              <span className="text-[9px] font-mono text-slate-400">({alert.source})</span>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                              {alert.message}
                            </p>
                            <span className="text-[9px] font-mono text-slate-500 mt-1 block">
                              {alert.timestamp} {alert.resolved && '• Resolved'}
                            </span>
                          </div>
                        </div>

                        {!alert.resolved && (
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="text-[10px] font-mono px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg whitespace-nowrap transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EXECUTIVE TERMINAL */}
              {activeTab === 'terminal' && (
                <div className="space-y-3">
                  <div className="bg-black/80 border border-white/10 rounded-2xl p-3 font-mono text-xs max-h-[220px] overflow-y-auto space-y-1.5 custom-scrollbar">
                    {terminalLogs.length === 0 && (
                      <span className="text-slate-600">Terminal idle. Type 'help' for available commands.</span>
                    )}
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="leading-relaxed">
                        <span className="text-slate-600">[{log.time}]</span>{' '}
                        <span className={
                          log.type === 'success' ? 'text-emerald-400' :
                          log.type === 'warn' ? 'text-amber-400' :
                          log.type === 'cmd' ? 'text-indigo-400 font-bold' :
                          'text-slate-300'
                        }>
                          {log.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendTerminalCommand} className="flex gap-2">
                    <div className="relative flex-grow">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-indigo-400 text-xs">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="Type executive command (e.g. status, satcalc, sync)..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl pl-7 pr-3 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Quick Action Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      onClick={() => handleTriggerAction('SATCALC V2 Geometry', 'cmd_satcalc_optimize')}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 rounded-lg border border-white/5 transition-all"
                    >
                      Run SATCALC V2
                    </button>
                    <button
                      onClick={() => handleTriggerAction('Tax Prep King Export', 'cmd_tax_prep_king')}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 rounded-lg border border-white/5 transition-all"
                    >
                      Sec 174 Tax Export
                    </button>
                    <button
                      onClick={() => handleTriggerAction('Agent-X 4-Square Deal Sync', 'cmd_agent_x_deal')}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 rounded-lg border border-white/5 transition-all"
                    >
                      Sync 4-Square F&I
                    </button>
                    {onNavigate && (
                      <button
                        onClick={() => {
                          onNavigate('portfolio_registry');
                          setIsExpanded(false);
                        }}
                        className="px-2.5 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-[10px] font-mono text-indigo-300 rounded-lg border border-indigo-500/30 transition-all"
                      >
                        54-App Registry Matrix →
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Dustin Moore Cryptographic Session Active</span>
              </span>
              <span>Press <strong>Cmd+H</strong> to Toggle</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandHUD;
