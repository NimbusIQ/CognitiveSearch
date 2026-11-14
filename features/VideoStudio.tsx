import React, { useState, useEffect, useRef } from 'react';
import { PageTitle, ActionButton, LoadingState, ErrorState, EmptyState, TabGroup, Tab } from '../components/shared';
import { MaterialSymbol } from '../components/icons';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import { fileToBase64 } from '../utils/media';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ActiveTab = 'generate' | 'animate' | 'forensics';
type Resolution = '720p' | '1080p';
type AspectRatio = '16:9' | '9:16';

const VideoStudio: React.FC = () => {
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [isDemoSandbox, setIsDemoSandbox] = useState(false);
    const [isCheckingKey, setIsCheckingKey] = useState(true);
    const [activeTab, setActiveTab] = useState<ActiveTab>('generate');
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [resolution, setResolution] = useState<Resolution>('1080p');
    
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const pollingIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        const checkKey = async () => {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            setApiKeySelected(hasKey);
            setIsCheckingKey(false);
        };
        checkKey();
        return () => { if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current); };
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMediaFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setAnalysisResult(null);
            setVideoUrl(null);
        }
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);

        if (isDemoSandbox) {
            setLoadingMessage("Synchronizing Temporal Buffers via Sandbox Model...");
            setTimeout(() => {
                setLoadingMessage("Calibrating: 45%");
                setTimeout(() => {
                    setLoadingMessage("Rendering: 89%");
                    setTimeout(() => {
                        setIsLoading(false);
                        // Mock cinematic render url or sandbox logo callback
                        setVideoUrl("https://storage.googleapis.com/aistudio-ux-team-data/demos/nimbus-logo.png");
                    }, 1000);
                }, 1000);
            }, 1000);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            setLoadingMessage("Synchronizing Temporal Buffers...");
            
            let operation: GenerateVideosOperation;
            if (activeTab === 'animate') {
                if (!mediaFile) throw new Error("Source photo required for animation.");
                const base64 = await fileToBase64(mediaFile);
                operation = await ai.models.generateVideos({
                    model: 'veo-3.1-fast-generate-preview',
                    prompt: prompt || 'Cinematic movement, high fidelity.',
                    image: { imageBytes: base64, mimeType: mediaFile.type },
                    config: { numberOfVideos: 1, resolution, aspectRatio }
                });
            } else {
                operation = await ai.models.generateVideos({
                    model: 'veo-3.1-fast-generate-preview',
                    prompt: prompt || 'Aerial cinematic sweep of industrial architecture.',
                    config: { numberOfVideos: 1, resolution, aspectRatio }
                });
            }
            pollOperation(operation);
        } catch (err) { setError(err instanceof Error ? err.message : 'Motion synthesis failure.'); setIsLoading(false); }
    };

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        if (isDemoSandbox) {
            setLoadingMessage("Running Multi-modal Temporal Audit on Drone Footage...");
            setTimeout(() => {
                setLoadingMessage("Decomposing Video Frame Vectors (Veo 3)...");
                setTimeout(() => {
                    setIsLoading(false);
                    setAnalysisResult(`# Veo 3 Real-time Temporal Audit

**Analysis Target:** McKinney_Drone_Inference_75071.mp4  
**Confidence Score:** 99.85% Probability (GAF/CertainTeed Taxonomies Verified)  

### 📊 Temporal Anomaly Log
* **[Frame 034 - 052] Fracture Propagation:** Lateral bitumen hairline crack observed propagating under storm pressure vectors.
* **[Frame 082] Granule Displacement:** High-velocity shear detected on weathered modified bitumen substrate.
* **[Frame 149] Metal Lift:** Standing seam roofing metal segment shows lateral displacement of 1.2 inches.

### 🤖 Evolutionary Forensic Action Recommendations
1. **Automated Submission:** Pipe these verified high-fidelity proof points to the **Sovereign Paperwork Engine** in the B2B Portal.
2. **CRM Sync:** Create local storm-matched qualified leads on JobNimbus automatically.
3. **Transmission Egress:** Direct egress to State Farm Adjuster Sync router.`);
                }, 1200);
            }, 1200);
            return;
        }

        if (!mediaFile) return;
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const data = await fileToBase64(mediaFile);
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-preview',
                contents: [{ parts: [{ inlineData: { data, mimeType: mediaFile.type } }, { text: prompt || "Perform full forensic audit of this visual evidence." }] }]
            });
            setAnalysisResult(response.text);
        } catch (err) { setError(err instanceof Error ? err.message : 'Forensic failure.'); } finally { setIsLoading(false); }
    };

    const pollOperation = (operation: GenerateVideosOperation) => {
        pollingIntervalRef.current = window.setInterval(async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const updated = await ai.operations.getVideosOperation({ operation });
                if (updated.done) {
                    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
                    if (updated.error) { 
                        setError(typeof updated.error === 'object' && updated.error !== null && 'message' in updated.error ? String(updated.error.message) : 'Operation failed'); 
                        setIsLoading(false); 
                        return; 
                    }
                    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
                    if (uri) {
                        const res = await fetch(`${uri}&key=${process.env.API_KEY}`);
                        const blob = await res.blob();
                        setVideoUrl(URL.createObjectURL(blob));
                    }
                    setIsLoading(false);
                } else { setLoadingMessage(`Calibration: ${updated.metadata?.progressPercent || 0}%`); }
            } catch (e) { if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current); setIsLoading(false); }
        }, 10000);
    };

    if (isCheckingKey) return <LoadingState message="Neural Clearance" />;
    if (!apiKeySelected) return (
        <div className="flex flex-col items-center justify-center py-32 text-center max-w-2xl mx-auto space-y-12">
            <div className="p-12 bg-indigo-500/10 rounded-full border border-indigo-500/20 shadow-2xl animate-pulse"><MaterialSymbol icon="video_lock" className="text-8xl text-indigo-400" /></div>
            <h2 className="text-5xl font-black text-white uppercase liquid-chrome">Authorize Veo Studio</h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-wider">
               Connect your Google Gemini/Veo developer keys for live synthesis, or proceed to the high-fidelity v3.5 simulation suite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <ActionButton onClick={() => window.aistudio.openSelectKey()} variant="primary" className="px-10 py-6 text-sm uppercase tracking-widest" icon={<MaterialSymbol icon="vpn_key" />}>Connect Veo Engine</ActionButton>
                <ActionButton onClick={() => { setApiKeySelected(true); setIsDemoSandbox(true); }} variant="secondary" className="px-10 py-6 text-sm uppercase tracking-widest border-white/10" icon={<MaterialSymbol icon="biotech" />}>Run Sandbox Demo</ActionButton>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full animate-fade-in space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <PageTitle title="Motion Intelligence" subtitle="Cinematic synthesis via Veo 3 engine." />
                <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-white/5 mb-10">
                    <select value={resolution} onChange={e => setResolution(e.target.value as Resolution)} className="bg-transparent text-[10px] font-black uppercase text-indigo-400 outline-none px-4">
                        <option value="720p">720p</option><option value="1080p">1080p</option>
                    </select>
                    <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as AspectRatio)} className="bg-transparent text-[10px] font-black uppercase text-indigo-400 outline-none px-4 border-l border-white/10">
                        <option value="16:9">16:9</option><option value="9:16">9:16</option>
                    </select>
                </div>
            </div>
            
            <TabGroup>
                <Tab label="Text-to-Video" icon="movie_edit" isActive={activeTab === 'generate'} onClick={() => setActiveTab('generate')} />
                <Tab label="Animate Image" icon="auto_videocam" isActive={activeTab === 'animate'} onClick={() => setActiveTab('animate')} />
                <Tab label="Visual Forensics" icon="biotech" isActive={activeTab === 'forensics'} onClick={() => setActiveTab('forensics')} />
            </TabGroup>

            <div className="flex flex-col lg:flex-row gap-12 flex-grow">
                <div className="lg:w-[450px] shrink-0 space-y-10">
                    <div className="glass-panel rounded-[3.5rem] p-10 space-y-10 shadow-2xl">
                        {(activeTab === 'animate' || activeTab === 'forensics') && (
                            <div onClick={() => fileInputRef.current?.click()} className="relative h-64 bg-slate-950/50 border-2 border-dashed border-white/10 rounded-[2.5rem] overflow-hidden group cursor-pointer flex flex-col items-center justify-center">
                                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <>
                                    <MaterialSymbol icon="cloud_upload" className="text-6xl text-slate-700 mb-4 group-hover:text-indigo-400" />
                                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Ingest Asset</span>
                                </>}
                                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                            </div>
                        )}
                        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Define temporal vectors..." className="w-full bg-slate-950/50 border border-white/10 rounded-3xl p-6 text-sm text-white outline-none focus:border-indigo-500/50 min-h-[140px] resize-none shadow-inner" />
                        <ActionButton onClick={activeTab === 'forensics' ? handleAnalyze : handleGenerate} isLoading={isLoading} className="w-full py-8 text-xl" icon={<MaterialSymbol icon="auto_videocam" />}>Execute Synthesis</ActionButton>
                    </div>
                </div>

                <div className="flex-grow bg-slate-950 border border-white/5 rounded-[4rem] p-12 relative overflow-hidden flex flex-col justify-center items-center">
                    {isLoading ? <LoadingState message={loadingMessage} details="Utilizing Sovereign Cloud cluster nodes for motion inference." /> : error ? <ErrorState error={error} /> : videoUrl ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-pop-in">
                            <video src={videoUrl} controls autoPlay loop className="max-h-[80%] rounded-[2.5rem] shadow-2xl border border-white/10" />
                            <div className="mt-12 flex gap-8"><ActionButton variant="secondary" className="px-10 h-16" icon={<MaterialSymbol icon="download" />} onClick={() => window.open(videoUrl)}>Export Asset</ActionButton></div>
                        </div>
                    ) : analysisResult ? (
                        <div className="w-full h-full prose prose-invert prose-indigo p-12 overflow-y-auto"><ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisResult}</ReactMarkdown></div>
                    ) : <EmptyState title="Motion Buffer Standby" message="Awaiting source telemetry or defined vectors." icon={<MaterialSymbol icon="movie" className="text-[140px] opacity-5" />} />}
                </div>
            </div>
        </div>
    );
};

export default VideoStudio;