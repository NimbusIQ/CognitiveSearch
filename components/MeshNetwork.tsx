import React from 'react';
import { motion } from 'motion/react';
import { Network, Cpu, Shield, Database, Cloud, Zap } from 'lucide-react';

const MeshNetwork: React.FC = () => {
  const nodes = [
    { id: 'nimbus-roofing', label: 'Nimbus Roofing', icon: <Zap className="w-5 h-5" />, x: 50, y: 150, color: '#6366f1' },
    { id: 'nimbus-iq', label: 'NimbusIQ.AI', icon: <Cpu className="w-5 h-5" />, x: 250, y: 150, color: '#818cf8' },
    { id: 'gcp', label: 'Google Cloud', icon: <Cloud className="w-5 h-5" />, x: 450, y: 150, color: '#10b981' },
    { id: 'gemini', label: 'Gemini AI', icon: <Shield className="w-5 h-5" />, x: 350, y: 280, color: '#f59e0b' },
    { id: 'firestore', label: 'Firestore', icon: <Database className="w-5 h-5" />, x: 350, y: 20, color: '#f43f5e' },
    { id: 'mcp', label: 'Gmail MCP', icon: <Network className="w-5 h-5" />, x: 150, y: 50, color: '#0ea5e9' },
  ];

  const connections = [
    ['nimbus-roofing', 'nimbus-iq'],
    ['nimbus-iq', 'gcp'],
    ['gcp', 'gemini'],
    ['nimbus-iq', 'gemini'],
    ['nimbus-iq', 'mcp'],
    ['gcp', 'firestore'],
    ['nimbus-iq', 'firestore'],
  ];

  return (
    <div className="relative w-full h-[400px] bg-slate-950/50 rounded-[3rem] border border-white/5 overflow-hidden group">
      <div className="absolute inset-0 electric-wireframe opacity-10 pointer-events-none"></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {connections.map(([from, to], i) => {
          const fromNode = nodes.find(n => n.id === from)!;
          const toNode = nodes.find(n => n.id === to)!;
          
          return (
            <g key={i}>
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#line-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
              />
              <motion.circle
                cx={fromNode.x}
                cy={fromNode.y}
                r="3"
                fill="#818cf8"
                initial={{ offsetDistance: "0%" }}
                animate={{ 
                  cx: [fromNode.x, toNode.x],
                  cy: [fromNode.y, toNode.y],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center gap-2 group/node"
            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, delay: Math.random() * 0.5 }}
          >
            <div 
              className="p-3 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl transition-all duration-500 group-hover/node:scale-110 group-hover/node:border-indigo-500/50"
              style={{ boxShadow: `0 0 20px ${node.color}20` }}
            >
              <div style={{ color: node.color }}>{node.icon}</div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover/node:text-white transition-colors">
              {node.label}
            </span>
            
            {/* Connection Ping */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                style={{ backgroundColor: node.color }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-8 right-10 text-right space-y-1">
        <span className="block text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">Mesh Integrity</span>
        <span className="text-xl font-black text-emerald-400 font-mono tracking-tighter">100% SECURE</span>
      </div>
      
      <div className="absolute top-8 left-10 flex flex-col gap-1">
        <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.4em]">Iron Dome Protocol</span>
        <span className="text-xs font-bold text-white uppercase tracking-tight">Sovereign OS Visualization</span>
      </div>
    </div>
  );
};

export default MeshNetwork;
