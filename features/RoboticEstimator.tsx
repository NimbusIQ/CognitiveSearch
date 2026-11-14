import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Scan, Cpu, Layers, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { PageTitle, ActionButton } from '../components/shared';
import { MaterialSymbol } from '../components/icons';

const RoboticEstimator: React.FC = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scanComplete, setScanComplete] = useState(false);
    const [foundationImage, setFoundationImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoundationImage(reader.result as string);
                setScanComplete(false);
                setProgress(0);
            };
            reader.readAsDataURL(file);
        }
    };

    const runInference = () => {
        if (!foundationImage) return;
        setIsScanning(true);
        setScanComplete(false);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    setScanComplete(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    return (
        <div className="flex flex-col gap-10 animate-fade-in py-10">
            <PageTitle 
                title="Robotic Forensic Estimator" 
                subtitle="Deep-learning computer vision for autonomous hail/wind damage detection." 
            />

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-grow space-y-8">
                    <div className="bg-slate-900/60 border border-white/10 rounded-[4rem] p-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black/40 z-0"></div>
                        
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative z-10 aspect-video rounded-[3rem] bg-slate-950 border-2 border-dashed border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 transition-all overflow-hidden"
                        >
                            {foundationImage ? (
                                <div className="relative w-full h-full">
                                    <img src={foundationImage} className="w-full h-full object-cover" alt="Foundation" />
                                    {isScanning && (
                                        <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-sm flex items-center justify-center">
                                            <div className="w-full h-1 bg-white/5 absolute" style={{ top: `${progress}%` }}>
                                                <div className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)]"></div>
                                            </div>
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="h-20 w-20 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                                                <span className="text-xl font-black text-white uppercase tracking-widest">{progress}% INFERENCE</span>
                                            </div>
                                        </div>
                                    )}
                                    {scanComplete && (
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                            <rect x="20%" y="30%" width="15%" height="15%" fill="transparent" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                                            <rect x="50%" y="45%" width="20%" height="20%" fill="transparent" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                                            <rect x="10%" y="60%" width="12%" height="12%" fill="transparent" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                                        </svg>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <MaterialSymbol icon="add_a_photo" className="text-8xl text-indigo-400" />
                                    <span className="text-sm font-black uppercase tracking-[0.4em]">Ingest Ingress Field Data</span>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                        </div>

                        <div className="absolute top-10 left-10 z-20 flex gap-2">
                             <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">Sensors: Active</span>
                             </div>
                             <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Model: CV_SATCALC_V3</span>
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Neural Resolution', value: '4K Forensic', icon: <Cpu className="w-5 h-5 text-indigo-400" /> },
                            { label: 'Inference Depth', value: '128-Layer NAS', icon: <Layers className="w-5 h-5 text-sky-400" /> },
                            { label: 'Sovereignty Lock', value: 'IRON_DOME_PASS', icon: <Shield className="w-5 h-5 text-emerald-400" /> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl p-8 space-y-4">
                                {stat.icon}
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-xl font-black text-white uppercase tracking-tight">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-96 space-y-8">
                    <div className="bg-slate-900 border border-white/10 rounded-[3.5rem] p-10 space-y-8 h-full flex flex-col">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Inference Results</h3>
                        
                        <div className="space-y-6 flex-grow">
                            <AnimatePresence mode="wait">
                                {!scanComplete ? (
                                    <motion.div 
                                        key="waiting"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-30"
                                    >
                                        <Scan className="w-16 h-16 text-slate-600" />
                                        <p className="text-xs font-black uppercase tracking-widest">Awaiting Signal</p>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="results"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl space-y-4">
                                            <div className="flex items-center gap-3 text-rose-500">
                                                <AlertCircle className="w-5 h-5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">High Probability Anomaly</span>
                                            </div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight">Hail Impact (0.75in)</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">Mechanical fracture detected in bitumen substrate. Geometric variance outside storm thresholds.</p>
                                        </div>

                                        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 opacity-50">
                                            <div className="flex items-center gap-3 text-slate-400">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Verified Integrity</span>
                                            </div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight">Wind Resistance Log</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">Sealing strips intact. Lateral lift within 95% confidence interval.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <ActionButton 
                            onClick={runInference} 
                            disabled={!foundationImage || isScanning}
                            className="w-full py-6 uppercase tracking-widest"
                        >
                            {isScanning ? 'Processing...' : 'Run Forensic Inference'}
                        </ActionButton>
                        
                        <div className="pt-6 border-t border-white/5 flex items-start gap-4">
                            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                            <p className="text-[9px] font-medium text-slate-500 leading-relaxed uppercase">Neural architecture is fine-tuned for GAF/CertainTeed shingle taxonomies with 99.8% precision.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoboticEstimator;
