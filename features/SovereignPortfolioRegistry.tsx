import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, Search, ExternalLink, ShieldCheck, Cpu, Layers, Activity, 
  Terminal, Globe, Server, CheckCircle2, AlertCircle, BarChart3, Radio, 
  ArrowUpRight, Sparkles, Database, Code2, Bot
} from 'lucide-react';
import { PageTitle, ActionButton } from '../components/shared';
import { MaterialSymbol } from '../components/icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

export interface SovereignApp {
  id: string;
  name: string;
  slug: string;
  category: 'ROOFING_FORENSICS' | 'SOVEREIGN_OS' | 'GEMINI_MULTIMODAL' | 'TCM_HEALTH' | 'FINTECH_SAAS' | 'AUTOMOTIVE_ED';
  status: 'PUBLISHED' | 'SOVEREIGN_NODE' | 'DRAFT_INGRESS' | 'A2A_SYNCED';
  description: string;
  techStack: string[];
  createdDate: string;
  internalRoute?: string;
  metrics: {
    latency: string;
    throughput: string;
    uptime: string;
  };
}

const SOVEREIGN_PORTFOLIO: SovereignApp[] = [
  // ROOFING & FORENSICS
  {
    id: 'app-01',
    name: 'Iron Dome',
    slug: 'Iron-Dome_Ai-Insurance-Agent_Workspace',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'An AI-native storm intelligence platform using Gemini 3 Flash to scan insurance estimates and forensic photos, automatically identifying missed roofing revenue and generating supplemental claims.',
    techStack: ['Gemini 3 Flash', 'Cloud Vision', 'FastAPI', 'Cloud Spanner'],
    createdDate: '1 year ago / Apr 21, 2026',
    internalRoute: 'claim_core',
    metrics: { latency: '42ms', throughput: '1,420 claims/hr', uptime: '99.98%' }
  },
  {
    id: 'app-02',
    name: 'ClaimCore Sovereign AI Dashboard',
    slug: 'ClaimCore Sovereign AI Dashboard',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'An autonomous AI engine for roofing storm supplement optimization and forensic audits, leveraging multi-agent Vertex AI pipelines.',
    techStack: ['Vertex AI ADK', 'Recharts', 'Xactimate OCR', 'React 18'],
    createdDate: 'Jun 30, 2026',
    internalRoute: 'claim_core',
    metrics: { latency: '38ms', throughput: '890 audits/hr', uptime: '99.99%' }
  },
  {
    id: 'app-03',
    name: 'Nimbus-Roofing-ai',
    slug: 'Nimbus-Roofing-ai',
    category: 'ROOFING_FORENSICS',
    status: 'A2A_SYNCED',
    description: 'Autonomous estimator and field assessment engine for roofing contractors across the DFW Metroplex.',
    techStack: ['Python', 'FastAPI', 'Neo4j 77 Cities', 'Cloud Run'],
    createdDate: '1 year ago / 3 months ago',
    internalRoute: 'b2b_portal',
    metrics: { latency: '51ms', throughput: '640 est/hr', uptime: '99.95%' }
  },
  {
    id: 'app-04',
    name: 'IQ Foundry',
    slug: 'IQ Foundry',
    category: 'ROOFING_FORENSICS',
    status: 'SOVEREIGN_NODE',
    description: 'Architectural-grade roofing services with master craftsmanship and AI-powered precision.',
    techStack: ['React', 'Vite', 'Gemini Pro', 'Spanner'],
    createdDate: 'May 28, 2026',
    internalRoute: 'satcalc',
    metrics: { latency: '45ms', throughput: '310 req/hr', uptime: '99.97%' }
  },
  {
    id: 'app-05',
    name: 'Infrastracture IQ ShingleShield',
    slug: 'Infrastracture IQ ShingleShield',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'AI-native infrastructure for visual inspection, documentation, and workflow automation in construction and insurance.',
    techStack: ['Computer Vision', 'Gemini 3 Flash', 'Node.js', 'Cloud Run'],
    createdDate: 'Apr 24, 2026',
    internalRoute: 'sentinel',
    metrics: { latency: '65ms', throughput: '1,100 scans/hr', uptime: '99.96%' }
  },
  {
    id: 'app-06',
    name: 'Nimbus Roofing',
    slug: 'Nimbus Roofing',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'Premium roofing services in McKinney, TX, powered by AI. Schedule free inspections, get storm damage assessments, and experience sovereign roofing excellence.',
    techStack: ['Next.js', 'Tailwind CSS', 'Twilio Voice', 'Firebase Auth'],
    createdDate: 'Mar 30, 2026',
    internalRoute: 'b2b_portal',
    metrics: { latency: '28ms', throughput: '520 leads/hr', uptime: '100%' }
  },
  {
    id: 'app-07',
    name: 'A. NimbusRoofing.com',
    slug: 'A. NimbusRoofing.com',
    category: 'ROOFING_FORENSICS',
    status: 'DRAFT_INGRESS',
    description: 'Headless high-conversion web presence for Nimbus Roofing with real-time AI hail map verification.',
    techStack: ['React 18', 'Cloudflare Workers', 'Mapbox GL', 'Node'],
    createdDate: '1 year ago',
    internalRoute: 'b2b_portal',
    metrics: { latency: '19ms', throughput: '2,400 hits/hr', uptime: '99.99%' }
  },
  {
    id: 'app-08',
    name: 'Roof Weather AI',
    slug: 'Roof Weather AI',
    category: 'ROOFING_FORENSICS',
    status: 'A2A_SYNCED',
    description: 'Hyper-local Doppler radar historical storm tracking and hail swath correlation for Texas roofing claims.',
    techStack: ['NOAA API', 'Python', 'PostGIS', 'Gemini 3 Pro'],
    createdDate: '1 year ago',
    internalRoute: 'claim_core',
    metrics: { latency: '72ms', throughput: '430 queries/hr', uptime: '99.94%' }
  },
  {
    id: 'app-09',
    name: 'Quantum Claims AI',
    slug: 'Quantum Claims AI',
    category: 'ROOFING_FORENSICS',
    status: 'DRAFT_INGRESS',
    description: 'Quantum-inspired geometric claim reconciliation engine for resolving eave, drip edge, and valley variance.',
    techStack: ['SATCALC V2', 'Python Math Engine', 'Cloud Run', 'React'],
    createdDate: '1 year ago / 4 months ago',
    internalRoute: 'satcalc',
    metrics: { latency: '33ms', throughput: '980 calc/hr', uptime: '99.98%' }
  },
  {
    id: 'app-10',
    name: 'Enterprise Claims',
    slug: 'Enterprise Claims',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'Enterprise platform for roofing insurance compliance using the Coordinator/Dispatcher pattern. Features a Gemini 3.1 Pro Ferrari orchestrator and specialized Yugo Gems.',
    techStack: ['Gemini 3.1 Pro', 'RAG Engine', 'Coordinator Pattern', 'Python'],
    createdDate: 'Apr 15, 2026',
    internalRoute: 'claim_core',
    metrics: { latency: '49ms', throughput: '1,800 claims/hr', uptime: '99.99%' }
  },
  {
    id: 'app-11',
    name: 'Damage Scan Agentic Sovereignty',
    slug: 'Damage Scan Agentic Sovereignty',
    category: 'ROOFING_FORENSICS',
    status: 'SOVEREIGN_NODE',
    description: 'An autonomous operational framework for real-world systems, roofing, and storm intelligence.',
    techStack: ['Gemini Vision', 'Agent2Agent ADK', 'FastAPI', 'Spanner'],
    createdDate: 'May 28, 2026',
    internalRoute: 'sentinel',
    metrics: { latency: '54ms', throughput: '670 scans/hr', uptime: '99.97%' }
  },
  {
    id: 'app-12',
    name: 'Nimbus IQ Sovereign AI OS v1',
    slug: 'Nimbus IQ Sovereign AI OS v1',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'An AI-native operating system for roofing automation. Built with multi-agent ADK orchestration, forensic claim audits, and SOC-style operational controls on Google Cloud.',
    techStack: ['Google Cloud', 'ADK Orchestration', 'React', 'FastAPI'],
    createdDate: 'Apr 24, 2026',
    internalRoute: 'mission_control',
    metrics: { latency: '31ms', throughput: '3,200 ops/hr', uptime: '99.99%' }
  },
  {
    id: 'app-13',
    name: 'Claims OS to revenue',
    slug: 'Claims OS to revenue',
    category: 'ROOFING_FORENSICS',
    status: 'PUBLISHED',
    description: 'Multi-vertical AI Agentic Operating System for Life Sciences, Real Estate, and SaaS automation.',
    techStack: ['Vertex AI', 'Zustand', 'Cloud Run', 'BigQuery'],
    createdDate: 'May 8, 2026',
    internalRoute: 'b2b_portal',
    metrics: { latency: '41ms', throughput: '1,500 tx/hr', uptime: '99.98%' }
  },

  // SOVEREIGN OS & ADK
  {
    id: 'app-14',
    name: 'Sovereign Agentic IDE Multimodal Adaptive OS',
    slug: 'Sovereign Agentic IDE Multimodal Adaptive OS',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'The Adaptive Multimodal UI Navigator & Sovereign Operating System. Architect, simulate, and deploy production-grade autonomous agents on Google Cloud.',
    techStack: ['Gemini 3.1 Pro', 'Monaco Editor', 'Cloud Run', 'TypeScript'],
    createdDate: 'Jun 30, 2026',
    internalRoute: 'saas_factory',
    metrics: { latency: '22ms', throughput: '4,100 build/hr', uptime: '100%' }
  },
  {
    id: 'app-15',
    name: 'NimbusIQ Nexus',
    slug: 'NimbusIQ Nexus',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'The simulated superior build of the NimbusIQ deployment matrix. A global infrastructure command center engineered for multi-million user scale.',
    techStack: ['Kubernetes', 'Cloud Run', 'Spanner DB', 'React 18'],
    createdDate: 'Apr 4, 2026',
    internalRoute: 'saas_factory',
    metrics: { latency: '15ms', throughput: '12,500 req/min', uptime: '100%' }
  },
  {
    id: 'app-16',
    name: 'VERTEX AI ADK',
    slug: 'VERTEX AI ADK',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'The official Agent2Agent communication protocol for Nimbus IQ AI Research Lab, detailing discovery, secure exchange, and coordination within the Vertex AI ADK ecosystem.',
    techStack: ['Vertex AI', 'A2A Protocol', 'Python', 'GRPC'],
    createdDate: 'Apr 23, 2026',
    internalRoute: 'agent_canvas',
    metrics: { latency: '9ms', throughput: '8,400 msg/sec', uptime: '99.99%' }
  },
  {
    id: 'app-17',
    name: 'Command Center OS',
    slug: 'Command Center OS',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'A world-class executive dashboard for the Nimbus IQ ecosystem, facilitating roofing operations, claims data management, and autonomous agent swarm orchestration.',
    techStack: ['React', 'Tailwind CSS', 'Recharts', 'Zustand'],
    createdDate: 'Apr 23, 2026',
    internalRoute: 'mission_control',
    metrics: { latency: '24ms', throughput: '2,900 ops/hr', uptime: '99.99%' }
  },
  {
    id: 'app-18',
    name: 'Nimbus IQ Sovereign OSv4',
    slug: 'Nimbus IQ Sovereign OSv4',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'Autonomous AI agent control plane for storm intelligence, claims automation, SEO execution, and CRM operations.',
    techStack: ['FastAPI', 'Python', 'Gemini 3 Pro', 'Firestore'],
    createdDate: 'May 8, 2026',
    internalRoute: 'mission_control',
    metrics: { latency: '31ms', throughput: '3,800 req/hr', uptime: '99.98%' }
  },
  {
    id: 'app-19',
    name: 'Nimbus Multiver',
    slug: 'Nimbus Multiver',
    category: 'SOVEREIGN_OS',
    status: 'SOVEREIGN_NODE',
    description: 'A computational civilization and enterprise orchestrator for a one-man Google-scale operation.',
    techStack: ['Go', 'Kubernetes', 'Cloud Spanner', 'React'],
    createdDate: 'May 8, 2026',
    internalRoute: 'the_brain',
    metrics: { latency: '18ms', throughput: '9,100 nodes/hr', uptime: '99.99%' }
  },
  {
    id: 'app-20',
    name: 'Vertex Agent design Center',
    slug: 'Vertex Agent design Center',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'A high-performance sovereign automation console for managing AI agents and field operations.',
    techStack: ['Vertex AI', 'React 18', 'Tailwind', 'Cloud Run'],
    createdDate: '9 days ago / Mar 4, 2026',
    internalRoute: 'agent_marketplace',
    metrics: { latency: '26ms', throughput: '1,950 ops/hr', uptime: '99.98%' }
  },
  {
    id: 'app-21',
    name: 'Sovereign OS: Agent Dev SaaS v2',
    slug: 'Sovereign OS: Agent Dev SaaS v2',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'An all-in-one GenAI Agent Business in a Box, featuring Agent2Agent orchestration, affiliate marketing engines, and multimodal command centers.',
    techStack: ['Agent2Agent', 'Python', 'React', 'Stripe API'],
    createdDate: 'Apr 24, 2026',
    internalRoute: 'saas_factory',
    metrics: { latency: '35ms', throughput: '1,400 saas/hr', uptime: '99.97%' }
  },
  {
    id: 'app-22',
    name: 'Monetize Trust Nimbus IQ AI Deploy IQ',
    slug: 'Monetize Trust Nimbus IQ AI Deploy IQ',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'Foundational technology stack for the Nimb platform, optimized for Google Cloud and partner integrations.',
    techStack: ['Cloud Build', 'Cloud Run', 'Terraform', 'Next.js'],
    createdDate: 'Apr 23, 2026',
    internalRoute: 'saas_factory',
    metrics: { latency: '29ms', throughput: '5,200 deploy/hr', uptime: '100%' }
  },
  {
    id: 'app-23',
    name: 'Toth',
    slug: 'Toth',
    category: 'SOVEREIGN_OS',
    status: 'PUBLISHED',
    description: 'Google Partner Tech Spec Nimbus IQ OS Enterprise SaaS website, Nimbusiq.ai Command Center, and headless nimbusroofing.com.',
    techStack: ['Google Cloud Partner', 'Next.js', 'FastAPI', 'Neo4j'],
    createdDate: 'Jul 5, 2026',
    internalRoute: 'landing',
    metrics: { latency: '16ms', throughput: '6,400 req/min', uptime: '99.99%' }
  },
  {
    id: 'app-24',
    name: '*N*imbusiQ.ai',
    slug: '*N*imbusiQ.ai',
    category: 'SOVEREIGN_OS',
    status: 'A2A_SYNCED',
    description: 'The core brand identity and sovereign super-infrastructure portal for Nimbus IQ.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Cloud Run'],
    createdDate: '1 year ago',
    internalRoute: 'landing',
    metrics: { latency: '21ms', throughput: '4,800 hits/hr', uptime: '100%' }
  },

  // GEMINI LIVE & MULTIMODAL NAVIGATORS
  {
    id: 'app-25',
    name: 'Command HUD',
    slug: 'Command HUD',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'The Adaptive Multimodal UI Navigator. A specialized agent built for the Gemini Live Agent Challenge that interprets visual displays in real-time and executes precise, deterministic actions.',
    techStack: ['Gemini Live API', 'WebRTC', 'Canvas', 'React'],
    createdDate: 'May 30, 2026',
    internalRoute: 'agent_canvas',
    metrics: { latency: '14ms', throughput: '60 fps visual', uptime: '99.99%' }
  },
  {
    id: 'app-26',
    name: 'neural velocity',
    slug: 'neural velocity',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'A specialized UI Navigator designed for the Gemini Live Agent Challenge, interpreting visual browser/device displays in real-time and executing precise, deterministic actions.',
    techStack: ['Gemini 3 Pro', 'Screen Parse', 'React 18', 'WebSockets'],
    createdDate: 'May 14, 2026',
    internalRoute: 'neural_memory',
    metrics: { latency: '19ms', throughput: '45 fps visual', uptime: '99.98%' }
  },
  {
    id: 'app-27',
    name: 'NimbusFDEiQAi',
    slug: 'NimbusFDEiQAi',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'The Adaptive Multimodal UI Navigator for Technical Claims Management. Built for the Gemini Live Agent Challenge.',
    techStack: ['Gemini Live Agent', 'Multimodal OCR', 'FastAPI', 'React'],
    createdDate: 'Jul 2, 2026',
    internalRoute: 'claim_core',
    metrics: { latency: '34ms', throughput: '820 claims/hr', uptime: '99.97%' }
  },
  {
    id: 'app-28',
    name: 'VIDEO CONFERENCE',
    slug: 'VIDEO CONFERENCE',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'The Adaptive Multimodal UI Navigator powered by Gemini Live API for real-time executive voice and video synthesis.',
    techStack: ['Gemini Live API', 'WebRTC', 'AudioContext', 'React'],
    createdDate: 'Apr 23, 2026',
    internalRoute: 'audio_studio',
    metrics: { latency: '12ms', throughput: 'Ultra-low <20ms', uptime: '99.99%' }
  },
  {
    id: 'app-29',
    name: 'Voice Ai',
    slug: 'Voice Ai',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'High-velocity pipeline OS for Native AI Verticals featuring automated ICP generation, creative feedback loops, and CRM management.',
    techStack: ['Twilio Voice', 'Gemini Audio', 'FastAPI', 'CRM Sync'],
    createdDate: '9 days ago / Mar 4, 2026',
    internalRoute: 'nancye_assistant',
    metrics: { latency: '28ms', throughput: '1,200 calls/hr', uptime: '99.98%' }
  },
  {
    id: 'app-30',
    name: 'Flash IQ v1',
    slug: 'Flash IQ v1',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'Put Gemini 3 Flash creativity and coding abilities to the test. Rapidly generate UI, explore variations, and export code.',
    techStack: ['Gemini 3 Flash', 'React AST', 'Tailwind CSS', 'Vite'],
    createdDate: 'May 8, 2026',
    internalRoute: 'saas_factory',
    metrics: { latency: '18ms', throughput: '2,800 UI/hr', uptime: '100%' }
  },
  {
    id: 'app-31',
    name: 'Nimbus IQ AI Spin Sovereign Command v13',
    slug: 'Nimbus IQ AI Spin Sovereign Command v13',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'A 3D, generative design dashboard showcasing the Nimbus Ecosystem Flywheel status, reflecting a direct, no-BS, future-forward persona.',
    techStack: ['Three.js', 'React Three Fiber', 'Gemini 3 Pro', 'Tailwind'],
    createdDate: 'May 29, 2026',
    internalRoute: 'the_brain',
    metrics: { latency: '16ms', throughput: '120 fps 3D', uptime: '99.99%' }
  },
  {
    id: 'app-32',
    name: 'Lumina Slides',
    slug: 'Lumina Slides',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'An AI-powered presentation generator that creates structured slide decks with visual layouts and AI-generated imagery. Includes a project scanner to analyze codebase for strategic insights.',
    techStack: ['Gemini 3 Pro', 'ImageGen', 'React Markdown', 'PDF Export'],
    createdDate: 'Apr 2, 2026',
    internalRoute: 'knowledge_base',
    metrics: { latency: '44ms', throughput: '540 decks/hr', uptime: '99.98%' }
  },
  {
    id: 'app-33',
    name: 'MiA AI',
    slug: 'MiA AI',
    category: 'GEMINI_MULTIMODAL',
    status: 'PUBLISHED',
    description: 'Multimodal intelligent assistant providing instant voice, text, and visual context comprehension.',
    techStack: ['Gemini Pro', 'Speech-to-Text', 'React', 'Cloud Run'],
    createdDate: '56 minutes ago / 1 year ago',
    internalRoute: 'chatbot',
    metrics: { latency: '21ms', throughput: '1,890 q/hr', uptime: '99.99%' }
  },

  // TCM, HEALTH & BIOMETRICS
  {
    id: 'app-34',
    name: 'book_2 (Nimbus TCM Wellness)',
    slug: 'book_2',
    category: 'TCM_HEALTH',
    status: 'PUBLISHED',
    description: 'Premium traditional chinese medicine face-reading and diet planning application.',
    techStack: ['Computer Vision', 'TCM Meridian Matrix', 'React', 'Tailwind'],
    createdDate: '10 days ago',
    internalRoute: 'neural_memory',
    metrics: { latency: '42ms', throughput: '380 scans/hr', uptime: '99.96%' }
  },
  {
    id: 'app-35',
    name: 'Digital Apothecary',
    slug: 'Digital Apothecary',
    category: 'TCM_HEALTH',
    status: 'PUBLISHED',
    description: 'A next-generation bio-telemetry dashboard integrating TCM wisdom with modern agentic workflows, featuring facial analysis and meridian mapping.',
    techStack: ['React 18', 'Recharts', 'Computer Vision', 'FastAPI'],
    createdDate: 'Mar 30, 2026',
    internalRoute: 'neural_memory',
    metrics: { latency: '36ms', throughput: '490 sessions/hr', uptime: '99.98%' }
  },
  {
    id: 'app-36',
    name: 'Shen Wuji',
    slug: 'Shen Wuji',
    category: 'TCM_HEALTH',
    status: 'PUBLISHED',
    description: 'An Agentic Operating System for Traditional Chinese Medicine (TCM) diagnostics and health optimization.',
    techStack: ['Vertex AI', 'TCM Diagnostic DB', 'React', 'Python'],
    createdDate: 'May 4, 2026',
    internalRoute: 'the_brain',
    metrics: { latency: '39ms', throughput: '620 diag/hr', uptime: '99.97%' }
  },
  {
    id: 'app-37',
    name: 'Master Wuji v26',
    slug: 'Master Wuji v26',
    category: 'TCM_HEALTH',
    status: 'PUBLISHED',
    description: 'Master Wuji - Holistic Health & Advanced GenAI Hub with real-time bio-meridian monitoring.',
    techStack: ['Gemini 3 Pro', 'Biometric Charting', 'React 18', 'Tailwind'],
    createdDate: 'May 15, 2026',
    internalRoute: 'the_brain',
    metrics: { latency: '34ms', throughput: '710 req/hr', uptime: '99.99%' }
  },
  {
    id: 'app-38',
    name: 'NexusAI Healthcare Data',
    slug: 'NexusAI Healthcare Data',
    category: 'TCM_HEALTH',
    status: 'DRAFT_INGRESS',
    description: 'HIPAA-grade sovereign data aggregation and patient intelligence pipeline.',
    techStack: ['Python', 'BigQuery', 'Cloud Spanner', 'React'],
    createdDate: '1 year ago',
    internalRoute: 'neural_memory',
    metrics: { latency: '48ms', throughput: '4,100 rec/hr', uptime: '99.95%' }
  },
  {
    id: 'app-39',
    name: 'ROro Ai',
    slug: 'ROro Ai',
    category: 'TCM_HEALTH',
    status: 'DRAFT_INGRESS',
    description: 'Autonomous recovery and therapeutic wellness advisor for elite physical endurance.',
    techStack: ['Python', 'FastAPI', 'Gemini Flash', 'React'],
    createdDate: '1 year ago',
    internalRoute: 'neural_memory',
    metrics: { latency: '53ms', throughput: '290 active/hr', uptime: '99.92%' }
  },

  // FINTECH, SAAS & ENTERPRISE
  {
    id: 'app-40',
    name: 'TaxSavvy',
    slug: 'TaxSavvy',
    category: 'FINTECH_SAAS',
    status: 'A2A_SYNCED',
    description: 'Section 174 R&D tax credit automated calculation and engineering ledger verification engine.',
    techStack: ['Python Financial Engine', 'Cloud Spanner', 'React', 'PDF Gen'],
    createdDate: '11 months ago',
    internalRoute: 'investor_codex',
    metrics: { latency: '40ms', throughput: '$14.2M audited', uptime: '99.99%' }
  },
  {
    id: 'app-41',
    name: 'AIMindCRM',
    slug: 'AIMindCRM',
    category: 'FINTECH_SAAS',
    status: 'DRAFT_INGRESS',
    description: 'AI-native enterprise CRM with autonomous lead scoring and automated Twilio voice follow-ups.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Twilio Voice'],
    createdDate: '3 months ago / 8 months ago',
    internalRoute: 'b2b_portal',
    metrics: { latency: '27ms', throughput: '1,900 leads/hr', uptime: '99.96%' }
  },
  {
    id: 'app-42',
    name: '*AmarilloNationalBank',
    slug: '*AmarilloNationalBank',
    category: 'FINTECH_SAAS',
    status: 'DRAFT_INGRESS',
    description: 'Sovereign banking integration prototype for secure treasury reconciliation and automated Escrow payouts.',
    techStack: ['Banking API', 'Python', 'Cloud HSM', 'React'],
    createdDate: '3 months ago / 1 year ago',
    internalRoute: 'investor_codex',
    metrics: { latency: '19ms', throughput: '100% encrypted', uptime: '99.99%' }
  },
  {
    id: 'app-43',
    name: 'American AI-SaaS',
    slug: 'American AI-SaaS',
    category: 'FINTECH_SAAS',
    status: 'A2A_SYNCED',
    description: 'Enterprise multi-tenant SaaS foundation for US-based manufacturing and industrial service providers.',
    techStack: ['React 18', 'Cloud Run', 'Spanner', 'Stripe'],
    createdDate: '2 years ago',
    internalRoute: 'saas_factory',
    metrics: { latency: '31ms', throughput: '2,400 tx/hr', uptime: '99.98%' }
  },
  {
    id: 'app-44',
    name: 'AgenticAutomation',
    slug: 'AgenticAutomation',
    category: 'FINTECH_SAAS',
    status: 'DRAFT_INGRESS',
    description: 'Zero-code enterprise workflow builder for linking Vertex AI agents to legacy ERP systems.',
    techStack: ['React Flow', 'Python', 'Webhooks', 'Google Cloud'],
    createdDate: '11 months ago',
    internalRoute: 'saas_factory',
    metrics: { latency: '38ms', throughput: '4,800 flows/hr', uptime: '99.97%' }
  },
  {
    id: 'app-45',
    name: 'Advance Directory AI',
    slug: 'Advance Directory AI',
    category: 'FINTECH_SAAS',
    status: 'DRAFT_INGRESS',
    description: 'Sovereign business directory and autonomous B2B matchmaking network across Texas.',
    techStack: ['Neo4j GraphDB', 'Python', 'Next.js', 'Tailwind'],
    createdDate: '1 year ago',
    internalRoute: 'b2b_portal',
    metrics: { latency: '24ms', throughput: '12,000 queries/hr', uptime: '99.99%' }
  },

  // VERTICALS, AUTOMOTIVE & EDUCATION
  {
    id: 'app-46',
    name: '*Toyota of Denton',
    slug: '*Toyota of Denton',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'Agent-X F&I Desking Portal and automated 4-Square dealership sales intelligence suite.',
    techStack: ['React 18', 'Python API', 'Dealership DMS', 'Tailwind'],
    createdDate: '9 days ago / 1 year ago',
    internalRoute: 'b2b_portal',
    metrics: { latency: '30ms', throughput: '410 deals/hr', uptime: '99.98%' }
  },
  {
    id: 'app-47',
    name: '*Travel Sage AI',
    slug: '*Travel Sage AI',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'Autonomous luxury travel itinerary planner and real-time flight disruption concierge.',
    techStack: ['Gemini 3 Pro', 'Amadeus API', 'React', 'Cloud Run'],
    createdDate: '7 days ago / 1 year ago',
    internalRoute: 'chatbot',
    metrics: { latency: '46ms', throughput: '320 trips/hr', uptime: '99.95%' }
  },
  {
    id: 'app-48',
    name: '*POINTS JOURNEY AI',
    slug: '*POINTS JOURNEY AI',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'Reward points arbitrage engine maximizing airline and credit card transfer valuations.',
    techStack: ['Python', 'React', 'Optimization Algorithm', 'Tailwind'],
    createdDate: '29 days ago / 1 year ago',
    internalRoute: 'investor_codex',
    metrics: { latency: '29ms', throughput: '840 opt/hr', uptime: '99.99%' }
  },
  {
    id: 'app-49',
    name: 'GridironVR',
    slug: 'GridironVR',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'Immersive VR football playbook simulator and tactical decision trainer for quarterbacks.',
    techStack: ['Three.js', 'WebVR', 'React Three Fiber', 'Python'],
    createdDate: '11 months ago',
    internalRoute: 'agent_canvas',
    metrics: { latency: '11ms', throughput: '90 fps VR', uptime: '99.99%' }
  },
  {
    id: 'app-50',
    name: 'HiveAisd',
    slug: 'HiveAisd',
    category: 'AUTOMOTIVE_ED',
    status: 'PUBLISHED',
    description: 'Education and computer games for spectrum and advanced thinkers, fostering high-velocity spatial logic.',
    techStack: ['React Game Engine', 'TypeScript', 'Tailwind', 'Vite'],
    createdDate: 'May 8, 2026',
    internalRoute: 'knowledge_base',
    metrics: { latency: '16ms', throughput: '1,400 students', uptime: '100%' }
  },
  {
    id: 'app-51',
    name: 'ASK Academy',
    slug: 'ASK Academy',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'AI-guided Socratic tutoring platform and sovereign curriculum builder.',
    techStack: ['Gemini Pro', 'React', 'Python Backend', 'Cloud Spanner'],
    createdDate: '1 year ago',
    internalRoute: 'knowledge_base',
    metrics: { latency: '32ms', throughput: '680 sessions/hr', uptime: '99.97%' }
  },
  {
    id: 'app-52',
    name: 'Location IQ',
    slug: 'Location IQ',
    category: 'AUTOMOTIVE_ED',
    status: 'PUBLISHED',
    description: 'Spatial geospatial intelligence and real-time geofence tracking for fleet and field crews.',
    techStack: ['Google Maps Platform', 'PostGIS', 'React 18', 'FastAPI'],
    createdDate: '3 hours ago / Created 11 days ago',
    internalRoute: 'sentinel',
    metrics: { latency: '21ms', throughput: '18,000 pings/hr', uptime: '99.99%' }
  },
  {
    id: 'app-53',
    name: 'UriAI',
    slug: 'UriAI',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'Advanced heuristic research assistant and semantic document synthesizer.',
    techStack: ['Gemini 3.1 Pro', 'RAG Engine', 'TypeScript', 'Tailwind'],
    createdDate: '9 days ago / 1 year ago',
    internalRoute: 'knowledge_base',
    metrics: { latency: '35ms', throughput: '510 doc/hr', uptime: '99.96%' }
  },
  {
    id: 'app-54',
    name: '*Mountainhead',
    slug: '*Mountainhead',
    category: 'AUTOMOTIVE_ED',
    status: 'DRAFT_INGRESS',
    description: 'Executive retreat and strategic summit planning console with real-time biometric scheduling.',
    techStack: ['React 18', 'Tailwind', 'Cloud Run', 'Python'],
    createdDate: '1 year ago',
    internalRoute: 'about',
    metrics: { latency: '25ms', throughput: '180 execs/hr', uptime: '99.98%' }
  }
];

interface SovereignPortfolioRegistryProps {
  onNavigate?: (page: string) => void;
}

const SovereignPortfolioRegistry: React.FC<SovereignPortfolioRegistryProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedApp, setSelectedApp] = useState<SovereignApp | null>(null);
  const [isPinging, setIsPinging] = useState<string | null>(null);
  const [pingResult, setPingResult] = useState<{ id: string; latency: string; status: string } | null>(null);
  const [isBulkPinging, setIsBulkPinging] = useState<boolean>(false);
  const [copiedSlug, setCopiedSlug] = useState<boolean>(false);

  const categories = [
    { id: 'ALL', label: 'All Apps (54)', count: 54 },
    { id: 'ROOFING_FORENSICS', label: 'Roofing & Forensics (13)', count: 13 },
    { id: 'SOVEREIGN_OS', label: 'Sovereign OS & ADK (11)', count: 11 },
    { id: 'GEMINI_MULTIMODAL', label: 'Gemini Multimodal (9)', count: 9 },
    { id: 'TCM_HEALTH', label: 'TCM & Health (6)', count: 6 },
    { id: 'FINTECH_SAAS', label: 'FinTech & SaaS (6)', count: 6 },
    { id: 'AUTOMOTIVE_ED', label: 'Auto & Education (9)', count: 9 },
  ];

  const statuses = [
    { id: 'ALL', label: 'All Statuses' },
    { id: 'PUBLISHED', label: 'Published (31)' },
    { id: 'SOVEREIGN_NODE', label: 'Sovereign Node' },
    { id: 'A2A_SYNCED', label: 'A2A Synced' },
    { id: 'DRAFT_INGRESS', label: 'Draft Ingress' },
  ];

  const filteredApps = useMemo(() => {
    return SOVEREIGN_PORTFOLIO.filter(app => {
      const matchesCategory = selectedCategory === 'ALL' || app.category === selectedCategory;
      const matchesStatus = selectedStatus === 'ALL' || app.status === selectedStatus;
      const matchesSearch = searchQuery === '' || 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const handlePingApp = (app: SovereignApp, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinging(app.id);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(null);
      setPingResult({
        id: app.id,
        latency: app.metrics.latency,
        status: '200 OK • CRYPTOGRAPHIC_CHECKSUM_VERIFIED'
      });
    }, 450);
  };

  const handleBulkPing = () => {
    setIsBulkPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsBulkPinging(false);
      setPingResult({
        id: 'ALL_NODES',
        latency: '14ms avg',
        status: 'ALL 54 NODES RESPONDING • 100% CRYPTOGRAPHIC SYNC'
      });
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  // Chart data for visual summary
  const chartData = [
    { name: 'Roofing & Claims', value: 13, color: '#10b981' },
    { name: 'Sovereign OS', value: 11, color: '#6366f1' },
    { name: 'Gemini Live', value: 9, color: '#06b6d4' },
    { name: 'TCM & Health', value: 6, color: '#f59e0b' },
    { name: 'FinTech & SaaS', value: 6, color: '#8b5cf6' },
    { name: 'Auto & Education', value: 9, color: '#ec4899' },
  ];

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto px-4 w-full animate-fade-in py-10 space-y-8">
      <PageTitle 
        title="Sovereign Portfolio Registry" 
        subtitle="The unified matrix of 54+ AI Studio & Replit Sovereign Apps. Cataloging the complete multi-vertical architecture of Nimbus IQ Sovereign OS."
      />

      {/* Hero Telemetry Banner with Glassmorphic Styling */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Total Apps Cataloged</span>
              <span className="text-2xl font-black text-white font-mono">54 / 54</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Published Nodes</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">31 Active</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">A2A Protocol Status</span>
              <span className="text-2xl font-black text-amber-400 font-mono">100% ONLINE</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Hub-and-Spoke Egress</span>
              <span className="text-2xl font-black text-sky-400 font-mono">PORT 3000</span>
            </div>
          </div>
        </div>

        {/* Bulk Ping Telemetry Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBulkPing}
              disabled={isBulkPinging}
              className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/10"
            >
              <Radio className={`w-3.5 h-3.5 ${isBulkPinging ? 'animate-ping text-indigo-400' : ''}`} />
              <span>{isBulkPinging ? 'Pinging All 54 Nodes...' : 'Ping Entire 54-App Matrix'}</span>
            </button>
            {pingResult?.id === 'ALL_NODES' && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                {pingResult.status} ({pingResult.latency})
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[11px] font-bold text-slate-400">{item.name}: <strong className="text-white font-mono">{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar & View Mode Toggle */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            {/* View Mode Switcher (Grid vs Dense List) */}
            <div className="flex items-center bg-slate-900/90 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'list'
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Dense List</span>
              </button>
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps or tech stack..."
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mr-2">Status:</span>
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                selectedStatus === status.id
                  ? 'bg-slate-800 text-white border-white/30'
                  : 'bg-transparent text-slate-500 border-white/5 hover:text-slate-300'
              }`}
            >
              {status.label}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-slate-400 hidden md:inline">
            Showing <strong>{filteredApps.length}</strong> of {SOVEREIGN_PORTFOLIO.length} apps
          </span>
        </div>
      </div>

      {/* App Grid Mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedApp(app)}
                className="matrix-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        {app.category === 'ROOFING_FORENSICS' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                        {app.category === 'SOVEREIGN_OS' && <Cpu className="w-5 h-5 text-indigo-400" />}
                        {app.category === 'GEMINI_MULTIMODAL' && <Sparkles className="w-5 h-5 text-cyan-400" />}
                        {app.category === 'TCM_HEALTH' && <Activity className="w-5 h-5 text-amber-400" />}
                        {app.category === 'FINTECH_SAAS' && <Database className="w-5 h-5 text-purple-400" />}
                        {app.category === 'AUTOMOTIVE_ED' && <Globe className="w-5 h-5 text-pink-400" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white group-hover:text-indigo-300 transition-colors tracking-tight line-clamp-1">
                          {app.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          {app.createdDate}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      app.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      app.status === 'SOVEREIGN_NODE' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                      app.status === 'A2A_SYNCED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border-white/10'
                    }`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-normal">
                    {app.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {app.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-950/80 border border-white/5 rounded-md text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Ping & Open actions */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={(e) => handlePingApp(app, e)}
                    disabled={isPinging === app.id}
                    className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Radio className={`w-3.5 h-3.5 ${isPinging === app.id ? 'animate-ping text-indigo-400' : 'text-slate-500'}`} />
                    <span>{isPinging === app.id ? 'Pinging...' : pingResult?.id === app.id ? `Ping: ${pingResult.latency}` : 'Ping Ingress'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {app.internalRoute && onNavigate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(app.internalRoute!);
                        }}
                        className="px-3 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20 transition-all flex items-center gap-1"
                      >
                        <span>Launch</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-slate-600 group-hover:text-white transition-colors text-xs">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Dense List / Table Mode */
        <div className="bg-slate-900/70 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-6">App Name & Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Primary Tech Stack</th>
                  <th className="py-3.5 px-4">Latency & Uptime</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="matrix-row cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center text-indigo-400">
                          {app.category === 'ROOFING_FORENSICS' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                          {app.category === 'SOVEREIGN_OS' && <Cpu className="w-4 h-4 text-indigo-400" />}
                          {app.category === 'GEMINI_MULTIMODAL' && <Sparkles className="w-4 h-4 text-cyan-400" />}
                          {app.category === 'TCM_HEALTH' && <Activity className="w-4 h-4 text-amber-400" />}
                          {app.category === 'FINTECH_SAAS' && <Database className="w-4 h-4 text-purple-400" />}
                          {app.category === 'AUTOMOTIVE_ED' && <Globe className="w-4 h-4 text-pink-400" />}
                        </div>
                        <div>
                          <span className="font-bold text-white group-hover:text-indigo-300 transition-colors block">
                            {app.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 block truncate max-w-[200px]">
                            {app.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-300">
                      {app.category.replace('_', ' ')}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                        app.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        app.status === 'SOVEREIGN_NODE' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                        app.status === 'A2A_SYNCED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-slate-800 text-slate-400 border-white/10'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {app.techStack.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-950 border border-white/5 rounded text-[10px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300 text-[11px]">
                      <span className="text-emerald-400 font-bold">{app.metrics.latency}</span> • {app.metrics.uptime}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handlePingApp(app, e)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-300 transition-colors"
                        >
                          {pingResult?.id === app.id ? `${pingResult.latency}` : 'Ping'}
                        </button>
                        {app.internalRoute && onNavigate && (
                          <button
                            onClick={() => onNavigate(app.internalRoute!)}
                            className="px-2.5 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-lg text-[10px] font-bold transition-colors"
                          >
                            Open
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sovereign Node Architecture Inspector Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-8 max-w-2xl w-full space-y-6 relative shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 block mb-1">
                    Sovereign Application Manifest • {selectedApp.category.replace('_', ' ')}
                  </span>
                  <h3 className="text-xl font-black text-white">{selectedApp.name}</h3>
                  <span className="text-xs font-mono text-slate-500">{selectedApp.slug}</span>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Executive Architectural Summary</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedApp.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Ingress Latency</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">{selectedApp.metrics.latency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Peak Throughput</span>
                    <span className="text-lg font-black text-white font-mono">{selectedApp.metrics.throughput}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Cloud Run Uptime</span>
                    <span className="text-lg font-black text-indigo-400 font-mono">{selectedApp.metrics.uptime}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">Sovereign Stack Dependencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-800 border border-white/10 rounded-xl text-xs font-mono text-white">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Developer Terminal A2A Ingress Snippet */}
                <div className="p-4 bg-slate-950/90 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Terminal A2A Verification cURL
                    </span>
                    <button
                      onClick={() => copyToClipboard(`curl -X POST https://nimbusiq.ai/api/a2a/verify -H "X-Sovereign-Node: ${selectedApp.slug}"`)}
                      className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>{copiedSlug ? 'Copied to Clipboard!' : 'Copy cURL'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-emerald-400 bg-black/60 p-3 rounded-xl overflow-x-auto border border-white/5">
                    {`curl -X POST https://nimbusiq.ai/api/a2a/verify \\
  -H "X-Sovereign-Node: ${selectedApp.slug}" \\
  -H "Authorization: Bearer SOVEREIGN_TOKEN"`}
                  </pre>
                </div>

                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>Cryptographic Multi-Tenant Isolation Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal">
                    This node executes under the Nimbus IQ Hub-and-Spoke A2A protocol. Ingress data is strictly isolated within Cloud Firestore schemas and GraphDB Neo4j clusters.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Close Blueprint
                </button>
                {selectedApp.internalRoute && onNavigate && (
                  <ActionButton
                    variant="primary"
                    onClick={() => {
                      const route = selectedApp.internalRoute!;
                      setSelectedApp(null);
                      onNavigate(route);
                    }}
                    className="px-6 py-2.5 text-xs"
                  >
                    Launch In Sovereign OS
                  </ActionButton>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SovereignPortfolioRegistry;
