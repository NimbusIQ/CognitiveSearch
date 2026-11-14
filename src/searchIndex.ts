export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'Feature' | 'Documentation' | 'Page' | 'System';
  path: string;
  keywords: string[];
  type?: 'navigation' | 'action';
}

export const searchIndex: SearchItem[] = [
  // Pages
  { id: 'landing', title: 'Home', description: 'The main landing page of Sovereign AI Tools.', category: 'Page', path: 'landing', keywords: ['home', 'start', 'nimbus'], type: 'navigation' },
  { id: 'about', title: 'About Us', description: 'Learn about Nimbus IQ and our mission.', category: 'Page', path: 'about', keywords: ['about', 'mission', 'company', 'team'], type: 'navigation' },
  { id: 'mission_control', title: 'Mission Control', description: 'Access all AI agents and developer tools.', category: 'Page', path: 'mission_control', keywords: ['dashboard', 'grid', 'tools', 'agents'], type: 'navigation' },
  { id: 'the_brain', title: 'The Brain', description: 'The central cognitive hub of the ecosystem.', category: 'Page', path: 'the_brain', keywords: ['brain', 'core', 'intelligence'], type: 'navigation' },
  { id: 'investor_codex', title: 'Investor Codex', description: 'Financial data and investor relations.', category: 'Page', path: 'investor_codex', keywords: ['investor', 'finance', 'stocks', 'equity'], type: 'navigation' },
  { id: 'contact', title: 'Contact', description: 'Get in touch with the Nimbus IQ team.', category: 'Page', path: 'contact', keywords: ['contact', 'support', 'email', 'help'], type: 'navigation' },

  // Features
  { id: 'claim_core', title: 'ClaimCore Agent', description: 'Forensic insurance scope auditor. Identifies missing revenue with 99.7% accuracy.', category: 'Feature', path: 'claim_core', keywords: ['insurance', 'claim', 'forensic', 'audit'], type: 'navigation' },
  { id: 'sentinel', title: 'Sentinel Vision', description: 'Computer vision-based perception. Hail damage and un-flashed valley detection.', category: 'Feature', path: 'sentinel', keywords: ['vision', 'damage', 'hail', 'sentinel'], type: 'navigation' },
  { id: 'pay_guard', title: 'Pay-Guard Agent', description: 'Financial execution agent. Supplemental requests and QuickBooks synchronization.', category: 'Feature', path: 'pay_guard', keywords: ['finance', 'payment', 'quickbooks', 'supplement'], type: 'navigation' },
  { id: 'apex_ops', title: 'APEX Logistics', description: 'Operational project management. Material ordering and crew dispatching.', category: 'Feature', path: 'apex_ops', keywords: ['logistics', 'ops', 'crew', 'dispatch'], type: 'navigation' },
  { id: 'satcalc_v2', title: 'SATCALC V2', description: 'Proprietary geometric reasoning engine for exact material calculations.', category: 'Feature', path: 'satcalc', keywords: ['geometry', 'calculation', 'math', 'satcalc'], type: 'navigation' },
  { id: 'triple_track_rag', title: 'Triple-Track RAG', description: 'Knowledge cluster for IRC/IBC codes, manuals, and carrier data.', category: 'Feature', path: 'rag', keywords: ['rag', 'knowledge', 'legal', 'code'], type: 'navigation' },
  { id: 'icon_factory', title: 'Icon Factory', description: 'Generate custom sovereign-styled icons and UI assets.', category: 'Feature', path: 'icon_factory', keywords: ['icon', 'logo', 'design', 'assets'], type: 'navigation' },
  { id: 'nancye_assistant', title: 'AI Admin Nancye', description: 'Sovereign voice assistant for dispatch, billing, and scheduling.', category: 'Feature', path: 'nancye_assistant', keywords: ['admin', 'assistant', 'voice', 'scheduling', 'billing'], type: 'navigation' },
  { id: 'video_studio', title: 'Motion Lab', description: 'Cinematic temporal synthesis via Veo 3 engine.', category: 'Feature', path: 'video_studio', keywords: ['video', 'movie', 'motion', 'veo'], type: 'navigation' },
  { id: 'audio_studio', title: 'Vocal Studio', description: 'Ultra-low latency live sensory interaction.', category: 'Feature', path: 'audio_studio', keywords: ['audio', 'voice', 'sound', 'music'], type: 'navigation' },
  { id: 'architecture_studio', title: 'AAMA Architect', description: 'Brainstorm infrastructure via voice and render 4K blueprints.', category: 'Feature', path: 'architecture_studio', keywords: ['architecture', 'blueprint', 'design', 'build'], type: 'navigation' },
  { id: 'neural_memory', title: 'Neural Memory', description: 'Multimodal embedding generation for text, vision, and acoustic data.', category: 'Feature', path: 'neural_memory', keywords: ['memory', 'embeddings', 'neural', 'data'], type: 'navigation' },
  { id: 'knowledge_base', title: 'Neural Library', description: 'Technical documentation and system logic specs.', category: 'Feature', path: 'knowledge_base', keywords: ['docs', 'documentation', 'help', 'library'], type: 'navigation' },
  { id: 'chatbot', title: 'Prime Chatbot', description: 'Direct interface with the Sovereign Prime AI.', category: 'Feature', path: 'chatbot', keywords: ['chat', 'ai', 'prime', 'assistant'], type: 'navigation' },
  { id: 'b2b_portal', title: 'B2B Sovereign Portal', description: 'Enterprise backend for claims, leads, and carrier sync.', category: 'Feature', path: 'b2b_portal', keywords: ['portal', 'enterprise', 'leads', 'claims', 'insurance'], type: 'navigation' },
  { id: 'saas_factory', title: 'SaaS Factory Hub', description: 'Multi-tenant distribution architecture and Cloud Run sovereign computing plane.', category: 'Feature', path: 'saas_factory', keywords: ['saas', 'factory', 'hub', 'spoke', 'tenant', 'architecture'], type: 'navigation' },
  { id: 'portfolio_registry', title: 'Sovereign Portfolio Registry (54 Apps)', description: 'Unified matrix of 54 AI Studio & Replit Sovereign Apps across 6 verticals.', category: 'Feature', path: 'portfolio_registry', keywords: ['portfolio', 'registry', 'apps', 'matrix', 'replit', '54', '33', 'inspiration'], type: 'navigation' },
  { id: 'robotic_estimator', title: 'Robotic CV Estimator', description: 'Deep-learning computer vision for autonomous damage detection.', category: 'Feature', path: 'robotic_estimator', keywords: ['robotics', 'vision', 'estimates', 'hail', 'damage'], type: 'navigation' },
  { id: 'agent_marketplace', title: 'Agent Marketplace', description: 'Browse and deploy specialized AI agents.', category: 'Feature', path: 'agent_marketplace', keywords: ['marketplace', 'store', 'agents', 'deploy'], type: 'navigation' },
  { id: 'agent_canvas', title: 'Live Agent Canvas', description: 'Real-time orchestration and visualization of multi-agent swarms.', category: 'Feature', path: 'agent_canvas', keywords: ['canvas', 'swarm', 'orchestration', 'live'], type: 'navigation' },

  // System Commands
  { id: 'cmd_shaman_assistant', title: 'Activate Assistant Mode', description: 'Switch Shaman Kernel to reactive Assistant mode.', category: 'System', path: 'shaman:assistant', keywords: ['shaman', 'mode', 'assistant'], type: 'action' },
  { id: 'cmd_shaman_core', title: 'Activate Core Mode', description: 'Switch Shaman Kernel to proactive Core mode.', category: 'System', path: 'shaman:core', keywords: ['shaman', 'mode', 'core'], type: 'action' },
  { id: 'cmd_shaman_symbiotic', title: 'Activate Symbiotic Mode', description: 'Switch Shaman Kernel to autonomous Symbiotic mode.', category: 'System', path: 'shaman:symbiotic', keywords: ['shaman', 'mode', 'symbiotic'], type: 'action' },
  { id: 'cmd_toggle_neurocontext', title: 'Toggle NeuroContext BCI', description: 'Enable/Disable brain-driven cognitive state interpretation.', category: 'System', path: 'shaman:neurocontext', keywords: ['neuro', 'context', 'bci', 'brain'], type: 'action' },
  { id: 'cmd_toggle_firewall', title: 'Toggle System Firewall', description: 'Enable/Disable the security guardrails and firewall.', category: 'System', path: 'shaman:firewall', keywords: ['firewall', 'security', 'guardrails'], type: 'action' },
  { id: 'cmd_adjuster_sync', title: 'Sync Adjuster Data', description: 'Scan carrier emails and prepare damage evidence packets.', category: 'System', path: 'agent:adjuster_sync', keywords: ['adjuster', 'sync', 'gmail', 'carrier'], type: 'action' },
  { id: 'cmd_satcalc_optimize', title: 'Run SATCALC Optimization', description: 'Execute geometric reasoning for current scope.', category: 'System', path: 'agent:satcalc', keywords: ['satcalc', 'optimize', 'geometry'], type: 'action' },
  { id: 'cmd_a2a_sync', title: 'A2A Protocol Sync', description: 'Synchronize agent-to-agent high-velocity task handovers.', category: 'System', path: 'agent:a2a', keywords: ['a2a', 'protocol', 'sync'], type: 'action' },
  { id: 'cmd_agent_x_deal', title: 'Agent-X Deal Analysis', description: 'Manage F&I options and 4-Square dealership analytics.', category: 'System', path: 'agent:agent_x', keywords: ['agent-x', 'sales', 'dealership', 'f&i'], type: 'action' },
  { id: 'cmd_tax_prep_king', title: 'Tax Prep King', description: 'Maximize Section 174 AI R&D tax write-offs.', category: 'System', path: 'agent:tax_king', keywords: ['tax', 'finance', 'write-off', 'r&d'], type: 'action' },
  { id: 'cmd_roofing_insurance', title: 'Roofing Insurance Agent', description: 'Build claim packets and manage crew routing.', category: 'System', path: 'agent:roofing_insurance', keywords: ['roofing', 'insurance', 'claims', 'estimating'], type: 'action' },
  { id: 'cmd_claims_reconciliation', title: 'Reconcile Payments', description: 'Automate financial reconciliation and secure RD.', category: 'System', path: 'agent:claims_reconciliation', keywords: ['claims', 'payment', 'reconcile', 'rd'], type: 'action' },
  { id: 'cmd_clear_cache', title: 'Clear Neural Cache', description: 'Flush local embedding cache and refresh state.', category: 'System', path: 'system:clear_cache', keywords: ['clear', 'cache', 'reset'], type: 'action' },
  { id: 'cmd_toggle_theme', title: 'Toggle UltraVert Theme', description: 'Switch between Light and Dark sovereign aesthetics.', category: 'System', path: 'system:toggle_theme', keywords: ['theme', 'dark', 'light'], type: 'action' },

  // Documentation Sections
  { id: 'os-curriculum', title: 'OS Curriculum', description: 'Pedagogical framework for PropTech administrative intelligence.', category: 'Documentation', path: 'knowledge_base', keywords: ['curriculum', 'learning', 'training', 'os'], type: 'navigation' },
  { id: 'agentic-pedagogy', title: 'Agentic Pedagogy', description: 'AG2AG logic and self-refining pedagogical loops.', category: 'Documentation', path: 'knowledge_base', keywords: ['pedagogy', 'teaching', 'logic', 'ag2ag'], type: 'navigation' },
  { id: 'safety-foundation', title: 'Safety Foundation', description: 'Security pillars and cryptographic verification signatures.', category: 'Documentation', path: 'knowledge_base', keywords: ['safety', 'security', 'hardening', 'verification'], type: 'navigation' },
  { id: 'python-quantum-logic', title: 'Quantum Logic', description: 'Python-centric backend stack and quantum state machines.', category: 'Documentation', path: 'knowledge_base', keywords: ['python', 'quantum', 'backend', 'logic'], type: 'navigation' },
];
