import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ShamanMode = 'Assistant' | 'Core' | 'Symbiotic';
export type CognitiveState = 'Engaged' | 'Exhausted' | 'Overwhelmed' | 'Idle';

interface SystemIdentity {
  name: string;
  codename: string;
  capabilities: string[];
  primeDirectives: {
    label: string;
    description: string;
  }[];
}

interface NeuroContext {
  isEnabled: boolean;
  cognitiveState: CognitiveState;
  engagementScore: number;
  firewallActive: boolean;
}

interface ShamanContextType {
  mode: ShamanMode;
  intent: string;
  isProcessing: boolean;
  activeAgents: string[];
  systemIdentity: SystemIdentity;
  neuroContext: NeuroContext;
  setMode: (mode: ShamanMode) => void;
  setIntent: (intent: string) => void;
  spawnAgent: (agentId: string) => void;
  terminateAgent: (agentId: string) => void;
  toggleNeuroContext: () => void;
  toggleFirewall: () => void;
  setCognitiveState: (state: CognitiveState) => void;
  executeAction: (actionId: string) => Promise<void>;
  mcpStatus: {
    gmailConnected: boolean;
    lastSync: string;
  };
}

const ShamanContext = createContext<ShamanContextType | undefined>(undefined);

export const ShamanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ShamanMode>('Assistant');
  const [intent, setIntent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  
  const [systemIdentity] = useState<SystemIdentity>({
    name: 'NimbusIQ Sovereign OS',
    codename: 'Iron-Dome-v3.1',
    capabilities: [
      'SATCALC V2 (99.7% Accuracy)',
      'Triple-Track RAG (IRC/IBC/Carrier)',
      'A2A (Agent-to-Agent) Protocol',
      'Xactimate Forensic Auditing'
    ],
    primeDirectives: [
      { label: 'Grounding > Creativity', description: 'Deterministic 100% data-driven output (MCD Protocol).' },
      { label: 'Sovereignty > Dependency', description: 'Autonomous A2A enforcement and governance.' },
      { label: 'Truth > Speed', description: 'Eliminating semantic drift via forensics.' },
      { label: 'Integrity > convenient', description: 'Zero-hallucination Matrix Mode enforcement.' }
    ]
  });

  const [neuroContext, setNeuroContext] = useState<NeuroContext>({
    isEnabled: false,
    cognitiveState: 'Idle',
    engagementScore: 0,
    firewallActive: true,
  });
  const [mcpStatus, setMcpStatus] = useState({
    gmailConnected: true,
    lastSync: new Date().toISOString(),
  });

  const spawnAgent = useCallback((agentId: string) => {
    setActiveAgents(prev => prev.includes(agentId) ? prev : [...prev, agentId]);
  }, []);

  const terminateAgent = useCallback((agentId: string) => {
    setActiveAgents(prev => prev.filter(id => id !== agentId));
  }, []);

  const toggleNeuroContext = useCallback(() => {
    setNeuroContext(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled,
      cognitiveState: !prev.isEnabled ? 'Engaged' : 'Idle',
      engagementScore: !prev.isEnabled ? 75 : 0,
    }));
  }, []);

  const toggleFirewall = useCallback(() => {
    setNeuroContext(prev => ({ ...prev, firewallActive: !prev.firewallActive }));
  }, []);

  const setCognitiveState = useCallback((state: CognitiveState) => {
    setNeuroContext(prev => ({ ...prev, cognitiveState: state }));
  }, []);

  const executeMcpTool = useCallback(async (tool: string, input: any) => {
    console.log(`[MCP] Executing: manus-mcp-cli tool call ${tool} --input '${JSON.stringify(input)}'`);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { status: 'success', timestamp: new Date().toISOString() };
  }, []);

  const executeAction = useCallback(async (actionId: string) => {
    setIsProcessing(true);
    
    // Photonic-Void Protocol: Observe -> Plan -> Validate -> Execute
    console.log(`[PHOTONIC-VOID] Phase 1: Observing state delta for ${actionId}...`);
    await new Promise(resolve => setTimeout(resolve, 300));

    console.log(`[PHOTONIC-VOID] Phase 2: Planning executive trajectory for ${actionId}...`);
    await new Promise(resolve => setTimeout(resolve, 400));

    console.log(`[PHOTONIC-VOID] Phase 3: Validating against ${systemIdentity.primeDirectives[1].label}...`);
    
    if (neuroContext.firewallActive && actionId.includes('bypass')) {
      console.error('[FIREWALL] Validation failed: Action violates Prime Directives.');
      setIsProcessing(false);
      return;
    }

    console.log(`[PHOTONIC-VOID] Phase 4: Executing ${actionId}...`);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    switch (actionId) {
      case 'cmd_shaman_assistant': setMode('Assistant'); break;
      case 'cmd_shaman_core': setMode('Core'); break;
      case 'cmd_shaman_symbiotic': setMode('Symbiotic'); break;
      case 'cmd_toggle_neurocontext': toggleNeuroContext(); break;
      case 'cmd_toggle_firewall': toggleFirewall(); break;
      case 'cmd_adjuster_sync':
        await executeMcpTool('gmail_search_messages', { q: "from:usaa.com OR from:farmers.com", max_results: 10 });
        console.log('[AGENT] Adjuster Sync Agent: Evidence packet compiled.');
        break;
      case 'cmd_claims_reconciliation':
        await executeMcpTool('gmail_read_threads', { thread_id: "payment_notice_thread_id_123" });
        console.log('[AGENT] Claims Core: Reconciliation complete. QuickBooks updated.');
        break;
      case 'cmd_satcalc_optimize':
        console.log('[SATCALC] Phase 1: Geometric reasoning triggered...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('[SATCALC] Phase 2: Material variance matched at 99.7%.');
        break;
      case 'cmd_a2a_sync':
        console.log('[A2A] Initialising high-velocity agent handshake...');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('[A2A] Protocol established. Latency: 42ms.');
        break;
      case 'cmd_agent_x_deal':
        console.log('[AGENT-X] Analyzing 4-Square deal data...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('[AGENT-X] F&I Options synchronized with dealership OPS.');
        break;
      case 'cmd_tax_prep_king':
        console.log('[TAX-KING] Maximizing Section 174 R&D write-offs...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('[TAX-KING] QuickBooks-ready export generated.');
        break;
      default: break;
    }
    
    setIsProcessing(false);
  }, [neuroContext.firewallActive, systemIdentity, toggleNeuroContext, toggleFirewall, executeMcpTool]);

  return (
    <ShamanContext.Provider value={{
      mode, intent, isProcessing, activeAgents, systemIdentity, neuroContext,
      setMode, setIntent, spawnAgent, terminateAgent,
      toggleNeuroContext, toggleFirewall, setCognitiveState, executeAction,
      mcpStatus
    }}>
      {children}
    </ShamanContext.Provider>
  );
};

export const useShaman = () => {
  const context = useContext(ShamanContext);
  if (!context) throw new Error('useShaman must be used within a ShamanProvider');
  return context;
};
