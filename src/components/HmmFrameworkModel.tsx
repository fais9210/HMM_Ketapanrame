import React, { useState, useEffect, useRef } from 'react';
import { HmmFlowStep } from '../types';
import mermaid from 'mermaid';
import {
  Info,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Code2,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Printer,
} from 'lucide-react';
import { PublicationExportModal } from './PublicationExportModal';

interface HmmFrameworkModelProps {
  steps: HmmFlowStep[];
  onSelectStep?: (step: HmmFlowStep) => void;
  selectedStepId?: string | null;
}

export const HmmFrameworkModel: React.FC<HmmFrameworkModelProps> = ({
  steps,
  onSelectStep,
  selectedStepId,
}) => {
  const [activeView, setActiveView] = useState<'diagram' | 'mermaid' | 'insights'>('diagram');
  const [hoveredStep, setHoveredStep] = useState<HmmFlowStep | null>(null);
  const [activeStep, setActiveStep] = useState<HmmFlowStep | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramCaptureRef = useRef<HTMLDivElement>(null);

  // Split steps into sequential and 3 parallel columns
  const actorStep = steps.find((s) => s.id === 'actor') || steps[0];
  const commStep = steps.find((s) => s.id === 'comm_practice') || steps[1];
  const platformStep = steps.find((s) => s.id === 'platform') || steps[2];
  const prodStep = steps.find((s) => s.id === 'prod_digital') || steps[3];
  const infoStep = steps.find((s) => s.id === 'info') || steps[4];
  const interactionStep = steps.find((s) => s.id === 'interaction') || steps[5];
  const visibilityStep = steps.find((s) => s.id === 'visibility') || steps[6];
  const activityStep = steps.find((s) => s.id === 'activity') || steps[7];
  const legitimacyStep = steps.find((s) => s.id === 'legitimacy') || steps[8];

  // Mermaid.js code generation
  const generateMermaidCode = () => {
    return `flowchart TD
    %% Model HMM Ekosistem BUMDes Ketapanrame
    classDef actorStyle fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724;
    classDef commStyle fill:#e2eafc,stroke:#4a6fa5,stroke-width:2px,color:#162a45;
    classDef platformStyle fill:#f3e8ff,stroke:#9333ea,stroke-width:2px,color:#581c87;
    classDef orangeStyle fill:#ffedd5,stroke:#ea580c,stroke-width:2px,color:#7c2d12;
    classDef visStyle fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81;
    classDef actStyle fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#713f12;
    classDef legStyle fill:#ffe4e6,stroke:#e11d48,stroke-width:2px,color:#881337;

    A["<b>AKTOR KOMUNITAS</b><br/><small>(Ketua BUMDes, Kades, Ketua KUB, Admin Medsos, Tenan)</small>"]:::actorStyle
    B["<b>PRAKTIK KOMUNIKASI KOMUNITAS</b><br/><small>(Informasi, koordinasi, promosi, interaksi, feedback)</small>"]:::commStyle
    C["<b>PLATFORM DIGITAL</b><br/><small>(TikTok BUMDes, TikTok KUB, WhatsApp, Facebook, QRIS)</small>"]:::platformStyle
    
    subgraph ParallelGroup [" "]
      direction LR
      D1["<b>PRODUK DIGITAL</b><br/><small>Konten, video, foto, QRIS, katalog</small>"]:::orangeStyle
      D2["<b>INFORMASI</b><br/><small>Pengumuman, edukasi, layanan publik</small>"]:::orangeStyle
      D3["<b>INTERAKSI & PARTISIPASI</b><br/><small>Feedback, komentar, dukungan</small>"]:::orangeStyle
    end

    E["<b>VISIBILITY & JANGKAUAN</b><br/><small>(Promosi, distribusi informasi, eksposur, pasar/wisatawan)</small>"]:::visStyle
    F["<b>AKTIVITAS EKONOMI & SOSIAL</b><br/><small>(Penjualan, wisata, transaksi digital, kolaborasi)</small>"]:::actStyle
    G["<b>LEGITIMASI & KEPERCAYAAN KOMUNITAS</b><br/><small>(Konsistensi informasi, kredibilitas, legitimasi sosial)</small>"]:::legStyle

    A --> B
    B --> C
    C --> D1
    C --> D2
    C --> D3
    D1 --> E
    D2 --> E
    D3 --> E
    E --> F
    F --> G
    
    %% Feedback and Critical Disconnect Path
    G -. Feedback Loop .-> B
    E -. "Trust ≠ Visibility" .-> G
`;
  };

  useEffect(() => {
    if (activeView === 'mermaid' && mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          curve: 'basis',
          htmlLabels: true,
        },
      });
      mermaidRef.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [activeView]);

  const handleStepClick = (step: HmmFlowStep) => {
    setActiveStep(step === activeStep ? null : step);
    if (onSelectStep) {
      onSelectStep(step);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-4 bg-slate-50' : ''
      }`}
    >
      {/* Header Toolbar */}
      <div className="p-4 bg-slate-50/95 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <i className="fa-solid fa-diagram-project"></i>
          </span>
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
              Gambar 1. Model Hybrid Mediatization Mapping (HMM)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Ekosistem Komunikasi Mediasi BUMDes Ketapanrame
            </p>
          </div>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveView('diagram')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeView === 'diagram'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Diagram Flow (Visual)</span>
            </button>
            <button
              onClick={() => setActiveView('mermaid')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeView === 'mermaid'
                  ? 'bg-white text-indigo-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Mermaid.js Flowchart</span>
            </button>
            <button
              onClick={() => setActiveView('insights')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeView === 'insights'
                  ? 'bg-white text-purple-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sintesis Teoretis</span>
            </button>
          </div>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition cursor-pointer shadow-2xs font-semibold text-xs flex items-center gap-1.5"
            title="Ekspor Gambar Resolusi Tinggi 300 DPI (Jurnal/Tesis)"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Ekspor 300 DPI</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition cursor-pointer shadow-2xs"
            title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-140px)] bg-slate-50/40">
        {activeView === 'diagram' && (
          <div ref={diagramCaptureRef} className="max-w-4xl mx-auto space-y-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Figure Header for Publication */}
            <div className="border-b border-slate-200 pb-3">
              <div className="font-bold text-slate-900 text-sm sm:text-base font-serif">
                Gambar 1. Model Hybrid Mediatization Mapping (HMM) Praktik Digital Komunitas
              </div>
              <div className="text-xs text-slate-500 font-sans mt-0.5">
                Studi Kasus Transformasi Komunikasi & Legitimasi BUMDes Ketapanrame (N = 5 Kasus Informan)
              </div>
            </div>

            {/* Info Banner */}
            <div className="p-3.5 bg-indigo-50/80 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-start gap-2.5 shadow-2xs">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong>Diagram Alir Hierarkis HMM:</strong> Menjelaskan transformasi mediatisasi dari inisiatif Aktor (Hijau) ➔ Praktik Komunikasi (Biru Muda) ➔ Saluran Platform (Ungu) ➔ 3 Dimensi Konten (Oranye) ➔ Visibilitas (Biru) ➔ Aktivitas (Kuning) ➔ hingga bermuara pada Legitimasi Komunitas (Merah Muda).
                <span className="block mt-1 font-semibold text-rose-700">
                  <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                  Catatan Kunci: Garis putus-putus merah sisi kiri membuktikan bahwa peningkatan visibilitas digital tidak serta-merta menjamin legitimasi sosial tanpa adanya kredibilitas nyata.
                </span>
              </div>
            </div>

            {/* Hierarchical Flowchart Wrapper */}
            <div className="relative py-4 px-2 sm:px-6">
              {/* Left Stepped/Curved Disconnect Arrow: Visibility -> Legitimacy */}
              <div className="hidden md:block absolute left-0 top-[490px] bottom-[30px] w-28 pointer-events-none z-10">
                <svg className="w-full h-full" viewBox="0 0 110 320" fill="none">
                  <path
                    d="M 100 15 C 10 20, 10 280, 100 295"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />
                  {/* Top arrow */}
                  <polygon points="98,11 106,15 98,19" fill="#dc2626" />
                  {/* Bottom arrow */}
                  <polygon points="98,291 106,295 98,299" fill="#dc2626" />
                </svg>
                <div className="absolute top-[35%] -left-2 transform -translate-y-1/2 w-28 bg-rose-50 border border-rose-300 rounded-lg p-1.5 text-[10px] text-rose-700 font-bold text-center leading-tight shadow-xs">
                  <i className="fa-solid fa-triangle-exclamation text-rose-500 block mb-0.5"></i>
                  Trust tidak otomatis mengikuti peningkatan visibility
                </div>
              </div>

              {/* Right Feedback Arrow: Legitimacy -> Praktik Komunikasi */}
              <div className="hidden md:block absolute right-0 top-[110px] bottom-[30px] w-24 pointer-events-none z-10">
                <svg className="w-full h-full" viewBox="0 0 90 680" fill="none">
                  <path
                    d="M 5 660 C 80 640, 80 40, 10 20"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Arrowhead pointing to Box 2 */}
                  <polygon points="12,16 4,20 12,24" fill="#475569" />
                </svg>
                <div className="absolute top-[48%] -right-1 transform -translate-y-1/2 w-24 bg-slate-100 border border-slate-300 rounded-lg p-1 text-[10px] text-slate-700 font-bold text-center leading-tight shadow-xs">
                  <i className="fa-solid fa-arrows-rotate text-indigo-500 block mb-0.5"></i>
                  Feedback Loop & Legitimasi Sosial
                </div>
              </div>

              {/* Main Box Sequence */}
              <div className="space-y-4 max-w-2xl mx-auto">
                {/* 1. AKTOR KOMUNITAS (Hijau) */}
                <div
                  onClick={() => handleStepClick(actorStep)}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                    actorStep.bgClass
                  } ${
                    activeStep?.id === actorStep.id ? 'ring-3 ring-emerald-500 shadow-md scale-[1.01]' : ''
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Tahap 1
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-emerald-950 tracking-tight">
                      {actorStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1">
                      {actorStep.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-emerald-300/70">
                    {actorStep.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 border border-emerald-300 shadow-2xs"
                      >
                        <i className="fa-solid fa-user-check mr-1.5 text-emerald-600 text-[10px]"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center text-slate-400 py-0.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-arrow-down text-xs"></i>
                  </div>
                </div>

                {/* 2. PRAKTIK KOMUNIKASI KOMUNITAS (Biru Muda) */}
                <div
                  onClick={() => handleStepClick(commStep)}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                    commStep.bgClass
                  } ${
                    activeStep?.id === commStep.id ? 'ring-3 ring-sky-500 shadow-md scale-[1.01]' : ''
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-800 bg-sky-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Tahap 2
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-sky-950 tracking-tight">
                      {commStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-800 font-medium mt-1">
                      {commStep.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-sky-300/70">
                    {commStep.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-100/90 text-sky-900 border border-sky-300 shadow-2xs"
                      >
                        <i className="fa-solid fa-comments mr-1.5 text-sky-600 text-[10px]"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center text-slate-400 py-0.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-arrow-down text-xs"></i>
                  </div>
                </div>

                {/* 3. PLATFORM DIGITAL (Ungu) */}
                <div
                  onClick={() => handleStepClick(platformStep)}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                    platformStep.bgClass
                  } ${
                    activeStep?.id === platformStep.id ? 'ring-3 ring-purple-500 shadow-md scale-[1.01]' : ''
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-800 bg-purple-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Tahap 3
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-purple-950 tracking-tight">
                      {platformStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-800 font-medium mt-1">
                      {platformStep.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-purple-300/70">
                    {platformStep.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-100/90 text-purple-900 border border-purple-300 shadow-2xs"
                      >
                        <i className="fa-solid fa-mobile-screen-button mr-1.5 text-purple-600 text-[10px]"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow Down Branching to 3 Columns */}
                <div className="flex justify-center text-slate-400 py-0.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-arrows-split-up-and-left rotate-180 text-xs"></i>
                  </div>
                </div>

                {/* 4. 3 Kolom Sejajar Oranye: PRODUK DIGITAL | INFORMASI | INTERAKSI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* 4a. Produk Digital */}
                  <div
                    onClick={() => handleStepClick(prodStep)}
                    className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      prodStep.bgClass
                    } ${
                      activeStep?.id === prodStep.id ? 'ring-3 ring-amber-500 shadow-md scale-[1.02]' : ''
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block mb-1">
                        Sub-Dimensi 1
                      </span>
                      <h4 className="font-bold text-sm text-amber-950 tracking-tight">
                        {prodStep.title}
                      </h4>
                      <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                        {prodStep.subtitle}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-amber-300/70 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
                      <i className="fa-solid fa-photo-film text-amber-600"></i>
                      <span>Artefak Multimedia & QRIS</span>
                    </div>
                  </div>

                  {/* 4b. Informasi */}
                  <div
                    onClick={() => handleStepClick(infoStep)}
                    className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      infoStep.bgClass
                    } ${
                      activeStep?.id === infoStep.id ? 'ring-3 ring-amber-500 shadow-md scale-[1.02]' : ''
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block mb-1">
                        Sub-Dimensi 2
                      </span>
                      <h4 className="font-bold text-sm text-amber-950 tracking-tight">
                        {infoStep.title}
                      </h4>
                      <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                        {infoStep.subtitle}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-amber-300/70 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
                      <i className="fa-solid fa-bullhorn text-amber-600"></i>
                      <span>Pengumuman & Edukasi</span>
                    </div>
                  </div>

                  {/* 4c. Interaksi dan Partisipasi */}
                  <div
                    onClick={() => handleStepClick(interactionStep)}
                    className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      interactionStep.bgClass
                    } ${
                      activeStep?.id === interactionStep.id ? 'ring-3 ring-amber-500 shadow-md scale-[1.02]' : ''
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block mb-1">
                        Sub-Dimensi 3
                      </span>
                      <h4 className="font-bold text-sm text-amber-950 tracking-tight">
                        {interactionStep.title}
                      </h4>
                      <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                        {interactionStep.subtitle}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-amber-300/70 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
                      <i className="fa-solid fa-users text-amber-600"></i>
                      <span>Feedback & Keterlibatan</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Down Converging */}
                <div className="flex justify-center text-slate-400 py-0.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-arrow-down text-xs"></i>
                  </div>
                </div>

                {/* 5. VISIBILITY & JANGKAUAN (Biru) */}
                <div
                  onClick={() => handleStepClick(visibilityStep)}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs relative ${
                    visibilityStep.bgClass
                  } ${
                    activeStep?.id === visibilityStep.id ? 'ring-3 ring-blue-500 shadow-md scale-[1.01]' : ''
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-800 bg-blue-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Tahap 5
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-blue-950 tracking-tight">
                      {visibilityStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-800 font-medium mt-1">
                      {visibilityStep.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-blue-300/70">
                    {visibilityStep.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-100/90 text-blue-900 border border-blue-300 shadow-2xs"
                      >
                        <i className="fa-solid fa-eye mr-1.5 text-blue-600 text-[10px]"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Fallback Warning */}
                <div className="block md:hidden p-2.5 bg-rose-50 border border-rose-300 rounded-xl text-[11px] text-rose-700 font-semibold text-center">
                  <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                  Trust tidak otomatis mengikuti peningkatan visibility (Hubungan Putus-Putus Merah)
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center text-slate-400 py-0.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-arrow-down text-xs"></i>
                  </div>
                </div>

                {/* 6. AKTIVITAS EKONOMI & SOSIAL (Kuning) */}
                <div
                  onClick={() => handleStepClick(activityStep)}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                    activityStep.bgClass
                  } ${
                    activeStep?.id === activityStep.id ? 'ring-3 ring-yellow-500 shadow-md scale-[1.01]' : ''
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-yellow-800 bg-yellow-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Tahap 6
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-yellow-950 tracking-tight">
                      {activityStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-yellow-800 font-medium mt-1">
                      {activityStep.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-yellow-300/70">
                    {activityStep.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-yellow-100/90 text-yellow-900 border border-yellow-300 shadow-2xs"
                      >
                        <i className="fa-solid fa-chart-line mr-1.5 text-yellow-600 text-[10px]"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center text-slate-400 py-0.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-2xs flex items-center justify-center text-slate-700">
                    <i className="fa-solid fa-arrow-down text-xs"></i>
                  </div>
                </div>

                {/* 7. LEGITIMASI & KEPERCAYAAN KOMUNITAS (Merah Muda) */}
                <div
                  onClick={() => handleStepClick(legitimacyStep)}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                    legitimacyStep.bgClass
                  } ${
                    activeStep?.id === legitimacyStep.id ? 'ring-3 ring-rose-500 shadow-md scale-[1.01]' : ''
                  }`}
                >
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-800 bg-rose-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      Tahap 7 (Muara Akhir)
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-rose-950 tracking-tight">
                      {legitimacyStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-800 font-medium mt-1">
                      {legitimacyStep.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-rose-300/70">
                    {legitimacyStep.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-100/90 text-rose-900 border border-rose-300 shadow-2xs"
                      >
                        <i className="fa-solid fa-shield-halved mr-1.5 text-rose-600 text-[10px]"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Step Detail Inspector */}
            {activeStep && (
              <div className="mt-6 p-4 sm:p-5 bg-white border border-slate-300 rounded-2xl shadow-md animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                      {activeStep.order}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{activeStep.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{activeStep.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveStep(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{activeStep.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Mermaid.js Live Diagram & Raw Definition */}
        {activeView === 'mermaid' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-code text-indigo-600"></i>
                  Rendered Mermaid.js Flowchart
                </h3>
                <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                  Valid Syntax
                </span>
              </div>
              <div className="mermaid overflow-x-auto py-4 text-center" ref={mermaidRef}>
                {generateMermaidCode()}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-bold text-indigo-400">Mermaid Definition Code</span>
                <span className="text-[10px] text-slate-400">Single File & Documentation Compatible</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre leading-relaxed text-slate-300">
                {generateMermaidCode()}
              </pre>
            </div>
          </div>
        )}

        {/* Theoretical Insights */}
        {activeView === 'insights' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-indigo-700">
                <span className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center font-bold text-sm">
                  <i className="fa-solid fa-brain"></i>
                </span>
                <h3 className="font-bold text-sm text-slate-900">Paradigma Mediatisasi Hibrida</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Model HMM membuktikan bahwa transformasi digital desa tidak sekadar peralihan alat komunikasi teknis, melainkan pembentukan ekosistem institusional baru yang mempertemukan logika media digital (algoritma, kecepatan, viralitas) dengan logika tradisi musyawarah desa.
              </p>
            </div>

            <div className="p-5 bg-white border border-rose-200 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-rose-700">
                <span className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center font-bold text-sm text-rose-600">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </span>
                <h3 className="font-bold text-sm text-slate-900">Diskoneksi Visibilitas vs Trust</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Garis putus-putus merah sisi kiri menandaskan bahwa peningkatan <em>visibility</em> (jumlah penonton konten TikTok atau jangkauan promosi) tidak berkorelasi otomatis dengan <em>legitimacy & trust</em> jika tidak ditopang transparansi dana, kualitas layanan fisik wisata, dan konsistensi kepemimpinan.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Publication High-Res Export Modal */}
      <PublicationExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Gambar 1. Model Hybrid Mediatization Mapping (HMM)"
        figureNumber="Gambar 1"
        figureTitle="Model Hybrid Mediatization Mapping (HMM) Praktik Digital Komunitas BUMDes Ketapanrame"
        figureCaptionNote="Model alur mediasi hierarkis (HMM) yang mengintegrasikan aktor komunitas, praktik komunikasi, platform digital, tiga dimensi mediasi konten (Produk, Informasi, Interaksi), visibilitas, aktivitas ekonomi-sosial, dan legitimasi. Garis putus-putus merah menyoroti anomali di mana visibilitas digital tinggi tidak otomatis menghasilkan legitimasi dan trust tanpa transparansi kredibel."
        defaultFilename="Gambar_1_Model_Mediasi_HMM_Ketapanrame"
        targetElementRef={diagramCaptureRef}
      />
    </div>
  );
};
