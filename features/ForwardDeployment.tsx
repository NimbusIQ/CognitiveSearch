import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Database, Send, Zap, Loader2, Braces } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const ForwardDeployment: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentLog, setDeploymentLog] = useState<{msg: string, type: 'info' | 'success' | 'warning' | 'ai'}[]>([]);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!prompt.trim()) return;
    
    setIsDeploying(true);
    setAiOutput(null);
    const newLogs = [...deploymentLog];
    
    const addLog = (msg: string, type: 'info' | 'success' | 'warning' | 'ai' = 'info') => {
      newLogs.push({ msg, type });
      setDeploymentLog([...newLogs]);
    };

    addLog('Initiating Forward Deployment Sequence...', 'info');
    await new Promise(r => setTimeout(r, 600));
    
    addLog('Contacting Vertex AI Studio (Gemini 2.5 Flash)...', 'info');
    
    try {
      // Lazy init to avoid crash if key missing
      const apiKey = (process.env as any).GEMINI_API_KEY || (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured in environment.');
      }
      
      const genAI = new GoogleGenAI({ apiKey });
      
      const systemContext = `
        You are the Forward Deployment Engineer for NimbusIQ Sovereign OS. 
        Your goal is to architectural engineer robust, solid-state AI solutions for the insurance claims sector.
        User request: ${prompt}
        Output should be professional, technical, and focused on sovereignty, ROI, and deterministic logic.
      `;

      const response = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ parts: [{ text: systemContext }] }]
      });
      
      const text = response.text || "Reasoning yielded null result.";
      
      addLog('Reasoning sequence complete.', 'success');
      setAiOutput(text);
      addLog('Injecting logic into Sovereign Mesh...', 'ai');
      
    } catch (error) {
      console.error(error);
      addLog(`Deployment Error: ${error instanceof Error ? error.message : 'Unknown failure'}`, 'warning');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-slate-900/40 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <Braces className="w-64 h-64" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">Forward Deployment</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Gemini Intelligence Injection v2.0</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Compiler: Deterministic</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        <div className="space-y-6">
          <div className="bg-slate-950/50 rounded-[2.5rem] border border-white/5 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engineering Prompt</span>
            </div>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Deploy a new forensic auditor for Texas hail claims..."
              className="w-full h-40 bg-transparent text-white font-mono text-sm resize-none focus:outline-none placeholder:text-slate-700"
            />
            <button 
              onClick={handleDeploy}
              disabled={isDeploying || !prompt.trim()}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                isDeploying ? 'bg-indigo-500/20 text-indigo-400 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl shadow-indigo-500/20 active:scale-[0.98]'
              }`}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Deploying Logic...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Execute Deployment
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950/50 rounded-[2.5rem] border border-white/5 p-8 flex flex-col h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deployment Logs</span>
              </div>
              <span className="text-[9px] font-mono text-slate-700 uppercase">us-central-1_edge</span>
            </div>
            <div className="flex-grow overflow-y-auto font-mono text-[10px] space-y-2 pr-2 custom-scrollbar">
              {deploymentLog.length === 0 && (
                <p className="text-slate-800 uppercase italic">Awaiting deployment instructions...</p>
              )}
              {deploymentLog.map((log, i) => (
                <div key={i} className={`flex gap-3 ${
                  log.type === 'success' ? 'text-emerald-400' : 
                  log.type === 'warning' ? 'text-rose-400' : 
                  log.type === 'ai' ? 'text-indigo-400' : 'text-slate-500'
                }`}>
                  <span className="bg-white/5 px-1.5 rounded h-fit">[{new Date().toLocaleTimeString()}]</span>
                  <p>{log.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 rounded-[3.5rem] border border-white/10 p-10 flex flex-col min-h-[500px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Zap className="w-40 h-40 text-indigo-500" />
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center">
              <img src="https://storage.googleapis.com/aistudio-ux-team-data/demos/nimbus-logo.png" className="h-6 w-6 brightness-0 invert" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white uppercase tracking-tighter">Sovereign Architecture</span>
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em]">Synthesized Reasoning</span>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar text-slate-300">
            <AnimatePresence mode="wait">
              {isDeploying ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-6 text-center"
                >
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                    <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Gemini is Reasoning...</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest leading-relaxed">Synthesizing zero-hallucination nodes <br /> within the FDE framework.</p>
                  </div>
                </motion.div>
              ) : aiOutput ? (
                <motion.div 
                  key="output"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="prose prose-invert prose-sm max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed"
                >
                  <ReactMarkdown>{aiOutput}</ReactMarkdown>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-8 opacity-20 text-center">
                  <Cpu className="w-20 h-20 text-slate-600" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-600 uppercase tracking-tighter">Logic Module Empty</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-700">Initialize Deployment to Inject Reasoning</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwardDeployment;
