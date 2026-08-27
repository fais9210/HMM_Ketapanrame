import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Building2,
  Users,
  Smartphone,
  Store,
  Camera,
  Info,
  PenTool,
  Megaphone,
  MonitorPlay,
  MessageCircle,
  UserCheck,
  ShoppingCart,
  ShoppingBag,
  Globe,
  Film,
  FileText,
  Box,
  QrCode,
  Eye,
  TrendingUp,
  MapPin,
  BarChart3,
  HeartHandshake,
  ShieldCheck,
  Award,
  Cloud,
  LayoutGrid,
  Share2,
  BookOpen,
  Maximize2,
  Minimize2,
  Printer,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Presentation,
} from 'lucide-react';
import { PublicationExportModal } from './PublicationExportModal';
import { HmmGuidedTour } from './HmmGuidedTour';
import { ZoomPanWrapper } from './ZoomPanWrapper';

export interface NodeItem {
  id: string;
  category: 'actor' | 'media' | 'comm' | 'pattern' | 'rep' | 'vis' | 'activity' | 'legitimacy' | 'evidence';
  title: string;
  subtitle?: string;
  desc?: string;
  badge?: string;
  tags?: string[];
  relatedIds: string[];
}

import { HmmFlowStep } from '../types';

export interface HmmFrameworkModelProps {
  steps?: HmmFlowStep[];
  onSelectStep?: (step: HmmFlowStep) => void;
  selectedStepId?: string | null;
}

export const HmmFrameworkModel: React.FC<HmmFrameworkModelProps> = ({
  steps,
  onSelectStep,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourHighlightedNodes, setTourHighlightedNodes] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramCaptureRef = useRef<HTMLDivElement>(null);

  // Close modals or fullscreen on ESC key or back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTourOpen) setIsTourOpen(false);
        else if (isExportModalOpen) setIsExportModalOpen(false);
        else if (isFullscreen) setIsFullscreen(false);
        else if (selectedNodeId) setSelectedNodeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, isExportModalOpen, isFullscreen, selectedNodeId]);

  // Mapping of related nodes for interactive data binding
  const relationMap: Record<string, string[]> = {
    // 1. Aktor
    'actor-ketua-bumdes': [
      'media-wa',
      'media-fb',
      'media-audiovisual',
      'comm-info',
      'comm-koordinasi',
      'comm-promosi',
      'pattern-vertikal',
      'pattern-horizontal',
      'pattern-ekonomi',
      'rep-konten',
      'rep-info',
      'rep-produk',
      'vis-publik',
      'vis-pasar',
      'vis-wisatawan',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-matrix',
      'emp-projectmap',
      'emp-crosstab',
      'emp-similarity',
    ],
    'actor-kades': [
      'media-wa',
      'media-audiovisual',
      'comm-info',
      'comm-koordinasi',
      'comm-partisipasi',
      'pattern-vertikal',
      'rep-info',
      'rep-konten',
      'vis-publik',
      'downstream-legitimasi',
      'downstream-aktivitas',
      'emp-matrix',
      'emp-evidence',
      'emp-crosstab',
    ],
    'actor-ketua-kub': [
      'media-tiktok',
      'media-wa',
      'media-fb',
      'media-audiovisual',
      'comm-promosi',
      'comm-koordinasi',
      'comm-partisipasi',
      'comm-interaksi',
      'pattern-horizontal',
      'pattern-ekonomi',
      'rep-konten',
      'rep-produk',
      'vis-publik',
      'vis-pasar',
      'vis-wisatawan',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-wordcloud',
      'emp-projectmap',
      'emp-evidence',
    ],
    'actor-admin': [
      'media-tiktok',
      'media-wa',
      'media-fb',
      'media-audiovisual',
      'comm-representasi',
      'comm-promosi',
      'comm-info',
      'comm-interaksi',
      'comm-partisipasi',
      'pattern-publik',
      'pattern-horizontal',
      'rep-konten',
      'rep-info',
      'rep-produk',
      'vis-publik',
      'vis-pasar',
      'vis-wisatawan',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-wordcloud',
      'emp-matrix',
      'emp-evidence',
      'emp-similarity',
      'emp-projectmap',
    ],
    'actor-tenan': [
      'media-qris',
      'media-wa',
      'media-audiovisual',
      'comm-transaksi',
      'comm-promosi',
      'comm-interaksi',
      'pattern-ekonomi',
      'rep-produk',
      'rep-transaksi',
      'vis-pasar',
      'vis-wisatawan',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-evidence',
      'emp-matrix',
      'emp-crosstab',
    ],

    // 2. Media / Platform
    'media-tiktok': [
      'actor-ketua-kub',
      'actor-admin',
      'comm-representasi',
      'comm-promosi',
      'comm-interaksi',
      'pattern-publik',
      'pattern-horizontal',
      'rep-konten',
      'rep-produk',
      'vis-publik',
      'vis-pasar',
      'vis-wisatawan',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-wordcloud',
      'emp-evidence',
      'emp-projectmap',
    ],
    'media-wa': [
      'actor-ketua-bumdes',
      'actor-kades',
      'actor-ketua-kub',
      'actor-admin',
      'actor-tenan',
      'comm-koordinasi',
      'comm-info',
      'comm-interaksi',
      'pattern-vertikal',
      'pattern-horizontal',
      'pattern-ekonomi',
      'rep-info',
      'rep-produk',
      'vis-publik',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-matrix',
      'emp-similarity',
      'emp-projectmap',
    ],
    'media-fb': [
      'actor-ketua-bumdes',
      'actor-ketua-kub',
      'actor-admin',
      'comm-info',
      'comm-promosi',
      'comm-partisipasi',
      'pattern-horizontal',
      'pattern-publik',
      'rep-info',
      'rep-konten',
      'vis-publik',
      'vis-pasar',
      'downstream-aktivitas',
      'emp-evidence',
      'emp-matrix',
    ],
    'media-qris': [
      'actor-tenan',
      'actor-ketua-bumdes',
      'comm-transaksi',
      'pattern-ekonomi',
      'rep-transaksi',
      'vis-pasar',
      'vis-wisatawan',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-evidence',
      'emp-matrix',
      'emp-crosstab',
    ],
    'media-audiovisual': [
      'actor-admin',
      'actor-ketua-bumdes',
      'actor-ketua-kub',
      'actor-kades',
      'actor-tenan',
      'comm-representasi',
      'comm-promosi',
      'pattern-publik',
      'rep-konten',
      'rep-produk',
      'vis-publik',
      'vis-wisatawan',
      'vis-pasar',
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-wordcloud',
      'emp-evidence',
    ],

    // 3. Praktik Komunikasi
    'comm-info': ['actor-ketua-bumdes', 'actor-kades', 'actor-admin', 'media-wa', 'media-fb', 'pattern-vertikal', 'pattern-horizontal', 'rep-info', 'vis-publik', 'downstream-legitimasi', 'emp-wordcloud', 'emp-matrix'],
    'comm-koordinasi': ['actor-ketua-bumdes', 'actor-kades', 'actor-ketua-kub', 'media-wa', 'pattern-vertikal', 'pattern-horizontal', 'rep-info', 'vis-publik', 'downstream-legitimasi', 'emp-matrix', 'emp-crosstab'],
    'comm-promosi': ['actor-ketua-bumdes', 'actor-ketua-kub', 'actor-admin', 'actor-tenan', 'media-tiktok', 'media-fb', 'media-audiovisual', 'pattern-ekonomi', 'pattern-publik', 'rep-konten', 'rep-produk', 'vis-pasar', 'vis-wisatawan', 'vis-publik', 'downstream-aktivitas', 'emp-wordcloud', 'emp-evidence'],
    'comm-representasi': ['actor-admin', 'actor-ketua-kub', 'media-tiktok', 'media-audiovisual', 'pattern-publik', 'rep-konten', 'vis-publik', 'vis-wisatawan', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-evidence', 'emp-projectmap'],
    'comm-interaksi': ['actor-admin', 'actor-ketua-kub', 'actor-tenan', 'media-tiktok', 'media-wa', 'pattern-horizontal', 'pattern-ekonomi', 'pattern-publik', 'rep-konten', 'vis-publik', 'downstream-aktivitas', 'emp-similarity'],
    'comm-partisipasi': ['actor-kades', 'actor-ketua-kub', 'actor-admin', 'media-fb', 'media-wa', 'pattern-horizontal', 'rep-konten', 'rep-info', 'vis-publik', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-matrix', 'emp-projectmap'],
    'comm-transaksi': ['actor-tenan', 'media-qris', 'pattern-ekonomi', 'rep-transaksi', 'rep-produk', 'vis-pasar', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-evidence', 'emp-crosstab'],

    // 4. Pola Interaksi
    'pattern-vertikal': ['actor-kades', 'actor-ketua-bumdes', 'media-wa', 'comm-info', 'comm-koordinasi', 'rep-info', 'vis-publik', 'downstream-legitimasi', 'emp-crosstab', 'emp-matrix'],
    'pattern-horizontal': ['actor-ketua-bumdes', 'actor-ketua-kub', 'actor-admin', 'media-wa', 'media-fb', 'comm-koordinasi', 'comm-partisipasi', 'comm-interaksi', 'rep-info', 'rep-konten', 'vis-publik', 'downstream-aktivitas', 'emp-similarity', 'emp-projectmap'],
    'pattern-ekonomi': ['actor-ketua-bumdes', 'actor-ketua-kub', 'actor-tenan', 'media-qris', 'media-wa', 'comm-promosi', 'comm-transaksi', 'rep-produk', 'rep-transaksi', 'vis-pasar', 'vis-wisatawan', 'downstream-aktivitas', 'emp-evidence', 'emp-matrix'],
    'pattern-publik': ['actor-admin', 'actor-ketua-kub', 'media-tiktok', 'media-fb', 'media-audiovisual', 'comm-representasi', 'comm-promosi', 'comm-interaksi', 'rep-konten', 'rep-info', 'vis-publik', 'vis-pasar', 'vis-wisatawan', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-wordcloud', 'emp-evidence', 'emp-projectmap'],

    // 5. Representasi
    'rep-konten': ['actor-admin', 'actor-ketua-kub', 'media-tiktok', 'media-audiovisual', 'comm-representasi', 'comm-promosi', 'pattern-publik', 'vis-publik', 'vis-wisatawan', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-wordcloud', 'emp-evidence'],
    'rep-info': ['actor-ketua-bumdes', 'actor-kades', 'actor-admin', 'media-wa', 'media-fb', 'comm-info', 'comm-koordinasi', 'pattern-vertikal', 'pattern-horizontal', 'vis-publik', 'downstream-legitimasi', 'emp-matrix'],
    'rep-produk': ['actor-tenan', 'actor-ketua-kub', 'actor-ketua-bumdes', 'media-tiktok', 'media-fb', 'comm-promosi', 'pattern-ekonomi', 'vis-pasar', 'vis-wisatawan', 'downstream-aktivitas', 'emp-evidence'],
    'rep-transaksi': ['actor-tenan', 'media-qris', 'comm-transaksi', 'pattern-ekonomi', 'vis-pasar', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-evidence', 'emp-crosstab'],

    // 6. Visibility
    'vis-publik': ['actor-admin', 'actor-ketua-bumdes', 'actor-kades', 'actor-ketua-kub', 'media-tiktok', 'media-fb', 'media-audiovisual', 'comm-representasi', 'comm-promosi', 'pattern-publik', 'rep-konten', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-wordcloud', 'emp-projectmap'],
    'vis-pasar': ['actor-tenan', 'actor-ketua-kub', 'actor-ketua-bumdes', 'media-tiktok', 'media-qris', 'comm-promosi', 'comm-transaksi', 'pattern-ekonomi', 'rep-produk', 'rep-transaksi', 'downstream-aktivitas', 'emp-evidence', 'emp-matrix'],
    'vis-wisatawan': ['actor-ketua-kub', 'actor-admin', 'actor-tenan', 'media-tiktok', 'media-audiovisual', 'comm-promosi', 'pattern-publik', 'rep-konten', 'rep-produk', 'downstream-aktivitas', 'downstream-legitimasi', 'emp-wordcloud', 'emp-evidence'],

    // 7. Downstream
    'downstream-aktivitas': ['actor-tenan', 'actor-ketua-kub', 'actor-admin', 'actor-ketua-bumdes', 'media-qris', 'media-tiktok', 'comm-promosi', 'comm-transaksi', 'comm-partisipasi', 'pattern-ekonomi', 'pattern-horizontal', 'vis-pasar', 'vis-wisatawan', 'downstream-legitimasi', 'emp-evidence', 'emp-matrix'],
    'downstream-legitimasi': ['actor-kades', 'actor-ketua-bumdes', 'actor-admin', 'media-wa', 'comm-info', 'comm-koordinasi', 'pattern-vertikal', 'rep-info', 'vis-publik', 'downstream-aktivitas', 'emp-matrix', 'emp-crosstab', 'emp-similarity'],
  };

  const activeFocusId = selectedNodeId || hoveredNodeId;

  const isHighlighted = (nodeId: string) => {
    // If Guided Tour is active
    if (isTourOpen) {
      if (tourHighlightedNodes.length === 0) return true;
      return tourHighlightedNodes.includes(nodeId);
    }

    if (!activeFocusId) return true;
    if (activeFocusId === nodeId) return true;
    const related = relationMap[activeFocusId];
    return related ? related.includes(nodeId) : false;
  };

  const handleNodeClick = (nodeId: string) => {
    if (isTourOpen) return;
    setSelectedNodeId(selectedNodeId === nodeId ? null : nodeId);
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-2 sm:p-4 bg-slate-50 overflow-y-auto' : ''
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="p-3 sm:p-4 bg-slate-50/95 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-xs sm:text-base leading-tight">
              Model Hybrid Mediatization Mapping (HMM)
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
              Ekosistem Riset Kualitatif BUMDes Ketapanrame
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Interactive Guided Tour for Sidang/Presentasi */}
          <button
            onClick={() => {
              setSelectedNodeId(null);
              setIsTourOpen(true);
            }}
            className={`px-3 py-1.5 rounded-xl border transition cursor-pointer shadow-2xs font-bold text-xs flex items-center gap-1.5 ${
              isTourOpen
                ? 'bg-indigo-600 border-indigo-700 text-white ring-2 ring-indigo-300'
                : 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-400'
            }`}
            title="Mulai Tur Langkah Interaktif untuk Sidang/Presentasi"
          >
            <Presentation className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tur Presentasi Riset</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
          </button>

          {selectedNodeId && (
            <button
              onClick={() => setSelectedNodeId(null)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition cursor-pointer text-xs font-semibold flex items-center gap-1 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sorotan</span>
            </button>
          )}

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer shadow-2xs font-semibold text-xs flex items-center gap-1.5"
            title="Ekspor Gambar Publikasi 300 DPI"
          >
            <Printer className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Ekspor 300 DPI</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 sm:p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition cursor-pointer shadow-2xs"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Infographic Canvas Container with Pinch-to-Zoom, Pan, and Horizontal Scroll */}
      <ZoomPanWrapper
        className="bg-slate-100/70"
        contentClassName="p-3 sm:p-5"
        minZoom={0.5}
        maxZoom={2.5}
        initialZoom={1}
      >
        <div
          ref={diagramCaptureRef}
          className="min-w-[1180px] max-w-[1360px] mx-auto bg-white p-5 sm:p-7 rounded-2xl border border-slate-300 shadow-md space-y-4 font-sans select-none"
        >
          {/* 1. Header Section */}
          <div className="text-center pb-2 border-b border-slate-200">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hybrid Mediatization Mapping (HMM)
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-700 mt-0.5">
              Ekosistem BUMDes Ketapanrame
            </p>
          </div>

          {/* 2. Top Feedback Loop Banner & Dashed Line */}
          <div className="relative py-2">
            <div className="flex items-center justify-between border-2 border-dashed border-blue-500 bg-blue-50/90 rounded-xl px-4 py-2 text-xs font-semibold text-blue-900 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded tracking-wider">
                  FEEDBACK LOOP
                </span>
                <span>
                  <strong>FEEDBACK:</strong> Trust, legitimasi, dan pengalaman sosial-ekonomi kembali memengaruhi praktik komunikasi dan konten berikutnya
                </span>
              </div>
              <div className="flex items-center text-blue-700 font-bold text-xs gap-1">
                <span>Tahap 8 &rarr; Tahap 3</span>
              </div>
            </div>
          </div>

          {/* 3. Main Grid Section (6 Columns + Downstream on right side) */}
          <div className="grid grid-cols-12 gap-3 items-start">
            {/* Kolom 1: Peran Aktor (grid 2 cols) */}
            <div className="col-span-2 space-y-2">
              <div className="bg-sky-50 border border-sky-300 rounded-xl p-2 text-center">
                <h3 className="font-extrabold text-xs text-sky-950 uppercase tracking-tight">
                  1. PERAN AKTOR
                </h3>
                <p className="text-[10px] text-sky-800 font-medium">(Role-Based Actors)</p>
              </div>

              <div className="border-2 border-sky-200 rounded-2xl p-2.5 bg-sky-50/40 space-y-2.5">
                {/* 1.1 Ketua BUMDes */}
                <div
                  id="actor-ketua-bumdes"
                  onClick={() => handleNodeClick('actor-ketua-bumdes')}
                  onMouseEnter={() => setHoveredNodeId('actor-ketua-bumdes')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('actor-ketua-bumdes')
                      ? 'bg-white border-blue-300 hover:border-blue-500 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'actor-ketua-bumdes' ? 'ring-2 ring-blue-600 bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Ketua BUMDes</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Pengelola kelembagaan</p>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug border-t border-slate-100 pt-1.5">
                    <strong>Fungsi:</strong> koordinasi, pengambilan keputusan, informasi, promosi
                  </p>
                </div>

                {/* 1.2 Kepala Desa */}
                <div
                  id="actor-kades"
                  onClick={() => handleNodeClick('actor-kades')}
                  onMouseEnter={() => setHoveredNodeId('actor-kades')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('actor-kades')
                      ? 'bg-white border-emerald-300 hover:border-emerald-500 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'actor-kades' ? 'ring-2 ring-emerald-600 bg-emerald-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Kepala Desa</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Otoritas & legitimasi</p>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug border-t border-slate-100 pt-1.5">
                    <strong>Fungsi:</strong> legitimasi, dukungan kelembagaan, koordinasi
                  </p>
                </div>

                {/* 1.3 Ketua KUB */}
                <div
                  id="actor-ketua-kub"
                  onClick={() => handleNodeClick('actor-ketua-kub')}
                  onMouseEnter={() => setHoveredNodeId('actor-ketua-kub')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('actor-ketua-kub')
                      ? 'bg-white border-amber-300 hover:border-amber-500 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'actor-ketua-kub' ? 'ring-2 ring-amber-600 bg-amber-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Ketua KUB</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Pengelola kelompok komunitas</p>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug border-t border-slate-100 pt-1.5">
                    <strong>Fungsi:</strong> koordinasi kelompok, promosi, partisipasi
                  </p>
                </div>

                {/* 1.4 Admin Media Sosial */}
                <div
                  id="actor-admin"
                  onClick={() => handleNodeClick('actor-admin')}
                  onMouseEnter={() => setHoveredNodeId('actor-admin')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('actor-admin')
                      ? 'bg-white border-purple-300 hover:border-purple-500 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'actor-admin' ? 'ring-2 ring-purple-600 bg-purple-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Admin Media Sosial</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Mediator digital</p>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug border-t border-slate-100 pt-1.5">
                    <strong>Fungsi:</strong> produksi konten, distribusi informasi, pengelolaan platform
                  </p>
                </div>

                {/* 1.5 Tenan Pujasera */}
                <div
                  id="actor-tenan"
                  onClick={() => handleNodeClick('actor-tenan')}
                  onMouseEnter={() => setHoveredNodeId('actor-tenan')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('actor-tenan')
                      ? 'bg-white border-rose-300 hover:border-rose-500 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'actor-tenan' ? 'ring-2 ring-rose-600 bg-rose-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <Store className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Tenan Pujasera/Food Court</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Aktor ekonomi</p>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug border-t border-slate-100 pt-1.5">
                    <strong>Fungsi:</strong> promosi produk, transaksi, interaksi pelanggan
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 2: Media / Platform (grid 2 cols) */}
            <div className="col-span-2 space-y-2">
              <div className="bg-sky-50 border border-sky-300 rounded-xl p-2 text-center">
                <h3 className="font-extrabold text-xs text-sky-950 uppercase tracking-tight">
                  2. MEDIA / PLATFORM
                </h3>
                <p className="text-[10px] text-sky-800 font-medium">(Infrastruktur Digital)</p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-2.5 bg-white space-y-2.5">
                {/* 2.1 TikTok BUMDes & TikTok KUB */}
                <div
                  id="media-tiktok"
                  onClick={() => handleNodeClick('media-tiktok')}
                  onMouseEnter={() => setHoveredNodeId('media-tiktok')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('media-tiktok')
                      ? 'bg-white border-slate-300 hover:border-slate-800 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'media-tiktok' ? 'ring-2 ring-slate-900 bg-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs">
                      <span className="font-black text-cyan-400">d</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">TikTok BUMDes & KUB</h4>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    <strong>Fungsi:</strong> representasi, storytelling, promosi aktivitas & produk
                  </p>
                </div>

                {/* 2.2 WhatsApp */}
                <div
                  id="media-wa"
                  onClick={() => handleNodeClick('media-wa')}
                  onMouseEnter={() => setHoveredNodeId('media-wa')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('media-wa')
                      ? 'bg-white border-emerald-300 hover:border-emerald-600 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'media-wa' ? 'ring-2 ring-emerald-600 bg-emerald-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">WhatsApp</h4>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    <strong>Fungsi:</strong> koordinasi, komunikasi interpersonal dan kelompok
                  </p>
                </div>

                {/* 2.3 Facebook */}
                <div
                  id="media-fb"
                  onClick={() => handleNodeClick('media-fb')}
                  onMouseEnter={() => setHoveredNodeId('media-fb')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('media-fb')
                      ? 'bg-white border-blue-300 hover:border-blue-600 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'media-fb' ? 'ring-2 ring-blue-600 bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      f
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Facebook</h4>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    <strong>Fungsi:</strong> distribusi informasi, jejaring komunitas
                  </p>
                </div>

                {/* 2.4 QRIS */}
                <div
                  id="media-qris"
                  onClick={() => handleNodeClick('media-qris')}
                  onMouseEnter={() => setHoveredNodeId('media-qris')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('media-qris')
                      ? 'bg-white border-slate-400 hover:border-slate-800 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'media-qris' ? 'ring-2 ring-slate-900 bg-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
                      QRIS
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">QRIS</h4>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    <strong>Fungsi:</strong> pembayaran digital, mendukung transaksi ekonomi
                  </p>
                </div>

                {/* 2.5 Konten Audio-Visual */}
                <div
                  id="media-audiovisual"
                  onClick={() => handleNodeClick('media-audiovisual')}
                  onMouseEnter={() => setHoveredNodeId('media-audiovisual')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('media-audiovisual')
                      ? 'bg-white border-sky-300 hover:border-sky-600 hover:shadow-md'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'media-audiovisual' ? 'ring-2 ring-sky-600 bg-sky-50/50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">Konten Audio-Visual</h4>
                      <p className="text-[9.5px] text-slate-500 font-medium">(Foto/Video)</p>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    <strong>Fungsi:</strong> produksi representasi digital aktivitas & destinasi
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 3: Praktik Komunikasi (grid 2 cols) */}
            <div className="col-span-2 space-y-2">
              <div className="bg-sky-50 border border-sky-300 rounded-xl p-2 text-center">
                <h3 className="font-extrabold text-xs text-sky-950 uppercase tracking-tight">
                  3. PRAKTIK KOMUNIKASI
                </h3>
                <p className="text-[10px] text-sky-800 font-medium">(Communicative Practices)</p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-2.5 bg-white space-y-2">
                {/* 3.1 Informasi */}
                <div
                  id="comm-info"
                  onClick={() => handleNodeClick('comm-info')}
                  onMouseEnter={() => setHoveredNodeId('comm-info')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-info')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-info' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <Info className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Informasi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Menginformasikan kegiatan, layanan, produk, kebijakan, edukasi masyarakat
                  </p>
                </div>

                {/* 3.2 Koordinasi */}
                <div
                  id="comm-koordinasi"
                  onClick={() => handleNodeClick('comm-koordinasi')}
                  onMouseEnter={() => setHoveredNodeId('comm-koordinasi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-koordinasi')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-koordinasi' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <PenTool className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Koordinasi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Mengatur kegiatan, menyampaikan keputusan, koordinasi antaraktor dan kelompok
                  </p>
                </div>

                {/* 3.3 Promosi */}
                <div
                  id="comm-promosi"
                  onClick={() => handleNodeClick('comm-promosi')}
                  onMouseEnter={() => setHoveredNodeId('comm-promosi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-promosi')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-promosi' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <Megaphone className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Promosi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Mempromosikan destinasi, produk, acara, program komunitas
                  </p>
                </div>

                {/* 3.4 Representasi */}
                <div
                  id="comm-representasi"
                  onClick={() => handleNodeClick('comm-representasi')}
                  onMouseEnter={() => setHoveredNodeId('comm-representasi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-representasi')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-representasi' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <MonitorPlay className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Representasi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Mengubah aktivitas nyata menjadi konten digital (foto, video, cerita, testimoni)
                  </p>
                </div>

                {/* 3.5 Interaksi */}
                <div
                  id="comm-interaksi"
                  onClick={() => handleNodeClick('comm-interaksi')}
                  onMouseEnter={() => setHoveredNodeId('comm-interaksi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-interaksi')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-interaksi' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <MessageCircle className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Interaksi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Merespons, berkomentar, diskusi, memberi feedback, membangun komunikasi dua arah
                  </p>
                </div>

                {/* 3.6 Partisipasi */}
                <div
                  id="comm-partisipasi"
                  onClick={() => handleNodeClick('comm-partisipasi')}
                  onMouseEnter={() => setHoveredNodeId('comm-partisipasi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-partisipasi')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-partisipasi' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <UserCheck className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Partisipasi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Mengajak masyarakat terlibat, relawan, dukungan, kolaborasi
                  </p>
                </div>

                {/* 3.7 Transaksi */}
                <div
                  id="comm-transaksi"
                  onClick={() => handleNodeClick('comm-transaksi')}
                  onMouseEnter={() => setHoveredNodeId('comm-transaksi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('comm-transaksi')
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-500'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'comm-transaksi' ? 'ring-2 ring-amber-600 bg-amber-50' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <ShoppingCart className="w-3 h-3" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">Transaksi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                    Menghubungkan komunikasi produk dengan pembayaran digital (QRIS)
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 4: Pola Interaksi (grid 2 cols) */}
            <div className="col-span-2 space-y-2">
              <div className="bg-sky-50 border border-sky-300 rounded-xl p-2 text-center">
                <h3 className="font-extrabold text-xs text-sky-950 uppercase tracking-tight">
                  4. POLA INTERAKSI
                </h3>
                <p className="text-[10px] text-sky-800 font-medium">(Interaction Patterns)</p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-2.5 bg-white space-y-2.5">
                {/* 4.1 Vertikal-Institusional */}
                <div
                  id="pattern-vertikal"
                  onClick={() => handleNodeClick('pattern-vertikal')}
                  onMouseEnter={() => setHoveredNodeId('pattern-vertikal')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('pattern-vertikal')
                      ? 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-600'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'pattern-vertikal' ? 'ring-2 ring-emerald-600 bg-emerald-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Vertikal-Institusional</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-700 mt-1.5 leading-snug font-medium">
                    Kepala Desa &larr;&rarr; Ketua BUMDes
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    (kebijakan, dukungan, legitimasi, koordinasi kelembagaan)
                  </p>
                </div>

                {/* 4.2 Horizontal-Komunitas */}
                <div
                  id="pattern-horizontal"
                  onClick={() => handleNodeClick('pattern-horizontal')}
                  onMouseEnter={() => setHoveredNodeId('pattern-horizontal')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('pattern-horizontal')
                      ? 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-600'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'pattern-horizontal' ? 'ring-2 ring-emerald-600 bg-emerald-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Horizontal-Komunitas</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-700 mt-1.5 leading-snug font-medium">
                    BUMDes &larr;&rarr; KUB &larr;&rarr; Admin &larr;&rarr; Anggota/Komunitas
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    (koordinasi, berbagi informasi, dukungan, partisipasi)
                  </p>
                </div>

                {/* 4.3 Ekonomi */}
                <div
                  id="pattern-ekonomi"
                  onClick={() => handleNodeClick('pattern-ekonomi')}
                  onMouseEnter={() => setHoveredNodeId('pattern-ekonomi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('pattern-ekonomi')
                      ? 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-600'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'pattern-ekonomi' ? 'ring-2 ring-emerald-600 bg-emerald-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Ekonomi</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-700 mt-1.5 leading-snug font-medium">
                    BUMDes/KUB &rarr; Tenan &rarr; Konsumen
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    (promosi, informasi produk, transaksi, layanan)
                  </p>
                </div>

                {/* 4.4 Publik-Digital */}
                <div
                  id="pattern-publik"
                  onClick={() => handleNodeClick('pattern-publik')}
                  onMouseEnter={() => setHoveredNodeId('pattern-publik')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('pattern-publik')
                      ? 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-600'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'pattern-publik' ? 'ring-2 ring-emerald-600 bg-emerald-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Publik-Digital</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-700 mt-1.5 leading-snug font-medium">
                    Aktor komunitas/Admin &rarr; Platform &rarr; Masyarakat luas
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    (konten, distribusi, respons publik, citra)
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 5: Representasi & Informasi Digital (grid 2 cols) */}
            <div className="col-span-2 space-y-2">
              <div className="bg-sky-50 border border-sky-300 rounded-xl p-2 text-center">
                <h3 className="font-extrabold text-[11px] text-sky-950 uppercase tracking-tight leading-tight">
                  5. REPRESENTASI & INFORMASI DIGITAL
                </h3>
                <p className="text-[10px] text-sky-800 font-medium">(Digital Representation)</p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-2.5 bg-white space-y-2.5">
                {/* 5.1 Konten Digital */}
                <div
                  id="rep-konten"
                  onClick={() => handleNodeClick('rep-konten')}
                  onMouseEnter={() => setHoveredNodeId('rep-konten')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('rep-konten')
                      ? 'bg-slate-50/90 border-slate-300 hover:border-slate-700'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'rep-konten' ? 'ring-2 ring-slate-800 bg-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                      <Film className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Konten Digital</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    Video promosi, kegiatan, edukasi, testimoni
                  </p>
                </div>

                {/* 5.2 Informasi Digital */}
                <div
                  id="rep-info"
                  onClick={() => handleNodeClick('rep-info')}
                  onMouseEnter={() => setHoveredNodeId('rep-info')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('rep-info')
                      ? 'bg-slate-50/90 border-slate-300 hover:border-slate-700'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'rep-info' ? 'ring-2 ring-slate-800 bg-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Informasi Digital</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    Pengumuman, layanan, aksesibilitas informasi
                  </p>
                </div>

                {/* 5.3 Produk Digital */}
                <div
                  id="rep-produk"
                  onClick={() => handleNodeClick('rep-produk')}
                  onMouseEnter={() => setHoveredNodeId('rep-produk')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('rep-produk')
                      ? 'bg-slate-50/90 border-slate-300 hover:border-slate-700'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'rep-produk' ? 'ring-2 ring-slate-800 bg-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                      <Box className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Produk Digital</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    Katalog produk, paket wisata, menu, promo digital
                  </p>
                </div>

                {/* 5.4 Transaksi Digital */}
                <div
                  id="rep-transaksi"
                  onClick={() => handleNodeClick('rep-transaksi')}
                  onMouseEnter={() => setHoveredNodeId('rep-transaksi')}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                    isHighlighted('rep-transaksi')
                      ? 'bg-slate-50/90 border-slate-300 hover:border-slate-700'
                      : 'opacity-30 bg-slate-50 border-slate-200'
                  } ${selectedNodeId === 'rep-transaksi' ? 'ring-2 ring-slate-800 bg-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                      <QrCode className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">Transaksi Digital</h4>
                  </div>
                  <p className="text-[9.5px] text-slate-600 mt-1.5 leading-snug">
                    Pembayaran digital (QRIS), bukti pembayaran, konfirmasi
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 6 & Downstream (grid 2 cols) */}
            <div className="col-span-2 space-y-3">
              {/* Kolom 6: Visibility & Jangkauan */}
              <div className="space-y-2">
                <div className="bg-sky-50 border border-sky-300 rounded-xl p-2 text-center">
                  <h3 className="font-extrabold text-[11px] text-sky-950 uppercase tracking-tight leading-tight">
                    6. VISIBILITY & JANGKAUAN
                  </h3>
                  <p className="text-[10px] text-sky-800 font-medium">(Reach & Visibility)</p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-2.5 bg-white space-y-2">
                  {/* 6.1 Visibilitas Publik */}
                  <div
                    id="vis-publik"
                    onClick={() => handleNodeClick('vis-publik')}
                    onMouseEnter={() => setHoveredNodeId('vis-publik')}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                      isHighlighted('vis-publik')
                        ? 'bg-purple-50/50 border-purple-200 hover:border-purple-500'
                        : 'opacity-30 bg-slate-50 border-slate-200'
                    } ${selectedNodeId === 'vis-publik' ? 'ring-2 ring-purple-600 bg-purple-50' : ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <Users className="w-3 h-3" />
                      </div>
                      <h4 className="font-bold text-xs text-slate-900">Visibilitas Publik</h4>
                    </div>
                    <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                      Konten dilihat lebih luas di luar komunitas lokal
                    </p>
                  </div>

                  {/* 6.2 Jangkauan Pasar */}
                  <div
                    id="vis-pasar"
                    onClick={() => handleNodeClick('vis-pasar')}
                    onMouseEnter={() => setHoveredNodeId('vis-pasar')}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                      isHighlighted('vis-pasar')
                        ? 'bg-purple-50/50 border-purple-200 hover:border-purple-500'
                        : 'opacity-30 bg-slate-50 border-slate-200'
                    } ${selectedNodeId === 'vis-pasar' ? 'ring-2 ring-purple-600 bg-purple-50' : ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <h4 className="font-bold text-xs text-slate-900">Jangkauan Pasar</h4>
                    </div>
                    <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                      Pasar lokal &rarr; regional &rarr; potensial nasional
                    </p>
                  </div>

                  {/* 6.3 Jangkauan Wisatawan */}
                  <div
                    id="vis-wisatawan"
                    onClick={() => handleNodeClick('vis-wisatawan')}
                    onMouseEnter={() => setHoveredNodeId('vis-wisatawan')}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                      isHighlighted('vis-wisatawan')
                        ? 'bg-purple-50/50 border-purple-200 hover:border-purple-500'
                        : 'opacity-30 bg-slate-50 border-slate-200'
                    } ${selectedNodeId === 'vis-wisatawan' ? 'ring-2 ring-purple-600 bg-purple-50' : ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <h4 className="font-bold text-xs text-slate-900">Jangkauan Wisatawan</h4>
                    </div>
                    <p className="text-[9.5px] text-slate-600 mt-1 leading-snug">
                      Informasi destinasi lebih mudah diakses
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. AKTIVITAS SOSIAL-EKONOMI */}
              <div
                id="downstream-aktivitas"
                onClick={() => handleNodeClick('downstream-aktivitas')}
                onMouseEnter={() => setHoveredNodeId('downstream-aktivitas')}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`p-2.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('downstream-aktivitas')
                    ? 'bg-pink-50/90 border-pink-300 hover:border-pink-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'downstream-aktivitas' ? 'ring-2 ring-pink-600' : ''}`}
              >
                <h3 className="font-extrabold text-[10px] text-pink-950 uppercase tracking-tight text-center">
                  7. AKTIVITAS SOSIAL-EKONOMI
                </h3>
                <p className="text-[9px] text-pink-800 text-center font-medium mb-1.5">
                  (Social-Economic Activities)
                </p>

                <div className="space-y-1.5 text-[9px]">
                  <div className="p-1.5 bg-white/90 rounded-lg border border-pink-200">
                    <div className="font-bold text-pink-900 flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-rose-600" />
                      <span>Aktivitas Ekonomi</span>
                    </div>
                    <p className="text-slate-600 text-[8.5px] mt-0.5 leading-tight">
                      Peningkatan kunjungan, penjualan, transaksi, pendapatan tenan
                    </p>
                  </div>
                  <div className="p-1.5 bg-white/90 rounded-lg border border-pink-200">
                    <div className="font-bold text-pink-900 flex items-center gap-1">
                      <HeartHandshake className="w-3 h-3 text-rose-600" />
                      <span>Aktivitas Sosial</span>
                    </div>
                    <p className="text-slate-600 text-[8.5px] mt-0.5 leading-tight">
                      Kolaborasi, gotong royong, partisipasi komunitas, penguatan jaringan sosial
                    </p>
                  </div>
                </div>
              </div>

              {/* 8. KEPERCAYAAN & LEGITIMASI */}
              <div
                id="downstream-legitimasi"
                onClick={() => handleNodeClick('downstream-legitimasi')}
                onMouseEnter={() => setHoveredNodeId('downstream-legitimasi')}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`p-2.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('downstream-legitimasi')
                    ? 'bg-rose-50/90 border-rose-300 hover:border-rose-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'downstream-legitimasi' ? 'ring-2 ring-rose-600' : ''}`}
              >
                <h3 className="font-extrabold text-[10px] text-rose-950 uppercase tracking-tight text-center">
                  8. KEPERCAYAAN & LEGITIMASI
                </h3>
                <p className="text-[9px] text-rose-800 text-center font-medium mb-1.5">
                  (Trust & Legitimacy)
                </p>

                <div className="space-y-1.5 text-[9px]">
                  <div className="p-1.5 bg-white/90 rounded-lg border border-rose-200">
                    <div className="font-bold text-rose-900 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-red-600" />
                      <span>Kepercayaan</span>
                    </div>
                    <p className="text-slate-600 text-[8.5px] mt-0.5 leading-tight">
                      Kredibilitas informasi, pengalaman positif, keandalan layanan
                    </p>
                  </div>
                  <div className="p-1.5 bg-white/90 rounded-lg border border-rose-200">
                    <div className="font-bold text-rose-900 flex items-center gap-1">
                      <Award className="w-3 h-3 text-red-600" />
                      <span>Legitimasi Komunitas</span>
                    </div>
                    <p className="text-slate-600 text-[8.5px] mt-0.5 leading-tight">
                      Pengakuan publik, kepercayaan terhadap BUMDes & kegiatan desa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Empirical Evidence Section */}
          <div className="border-2 border-blue-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
            <div className="text-center">
              <h3 className="font-extrabold text-xs sm:text-sm text-blue-900 uppercase tracking-wider">
                BUKTI EMPIRIS DARI HASIL ANALISIS
              </h3>
            </div>

            <div className="grid grid-cols-6 gap-2.5">
              {/* 1. Word Cloud */}
              <div
                id="emp-wordcloud"
                onClick={() => handleNodeClick('emp-wordcloud')}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('emp-wordcloud')
                    ? 'bg-white border-blue-200 hover:border-blue-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'emp-wordcloud' ? 'ring-2 ring-blue-600' : ''}`}
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs mb-1.5">
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span>Word Cloud</span>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug">
                  &bull; <strong>Kata dominan:</strong> digital, media, komunikasi, informasi, platform, usaha, masyarakat, pemasaran, produk, jangkauan, kepercayaan.
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  &bull; Menunjukkan lanskap wacana digital sangat kuat.
                </p>
              </div>

              {/* 2. Matrix Coding Query */}
              <div
                id="emp-matrix"
                onClick={() => handleNodeClick('emp-matrix')}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('emp-matrix')
                    ? 'bg-white border-emerald-200 hover:border-emerald-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'emp-matrix' ? 'ring-2 ring-emerald-600' : ''}`}
              >
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1.5">
                  <LayoutGrid className="w-4 h-4 text-emerald-600" />
                  <span>Matrix Coding</span>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug">
                  &bull; <strong>Tema utama:</strong> penggunaan media digital, informasi, promosi, partisipasi, pemasaran, produk digital, kepercayaan.
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  &bull; Menunjukkan keterhubungan tema dan aktor.
                </p>
              </div>

              {/* 3. Evidence Coding */}
              <div
                id="emp-evidence"
                onClick={() => handleNodeClick('emp-evidence')}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('emp-evidence')
                    ? 'bg-white border-amber-200 hover:border-amber-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'emp-evidence' ? 'ring-2 ring-amber-600' : ''}`}
              >
                <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs mb-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Evidence Coding</span>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug">
                  &bull; <strong>Bukti nyata:</strong> TikTok BUMDes, TikTok KUB, konten audio-visual, QRIS, promosi, produk digital.
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  &bull; Praktik komunikasi berjalan di berbagai level aktivitas.
                </p>
              </div>

              {/* 4. Word Similarity */}
              <div
                id="emp-similarity"
                onClick={() => handleNodeClick('emp-similarity')}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('emp-similarity')
                    ? 'bg-white border-emerald-200 hover:border-emerald-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'emp-similarity' ? 'ring-2 ring-emerald-600' : ''}`}
              >
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1.5">
                  <Share2 className="w-4 h-4 text-emerald-600" />
                  <span>Word Similarity</span>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug">
                  &bull; <strong>Pearson:</strong> 0,679–0,845 (rata-rata 0,746).
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  &bull; Konvergensi wacana tinggi antaraktor meski peran berbeda.
                </p>
              </div>

              {/* 5. Project Map */}
              <div
                id="emp-projectmap"
                onClick={() => handleNodeClick('emp-projectmap')}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('emp-projectmap')
                    ? 'bg-white border-blue-200 hover:border-blue-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'emp-projectmap' ? 'ring-2 ring-blue-600' : ''}`}
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs mb-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Project Map</span>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug">
                  &bull; <strong>Relasi:</strong> aktor, platform, penggunaan media, produk digital, informasi, partisipasi, kepercayaan.
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  &bull; Ekosistem komunikasi digital saling terkait.
                </p>
              </div>

              {/* 6. Crosstab */}
              <div
                id="emp-crosstab"
                onClick={() => handleNodeClick('emp-crosstab')}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isHighlighted('emp-crosstab')
                    ? 'bg-white border-purple-200 hover:border-purple-500'
                    : 'opacity-30 bg-slate-50 border-slate-200'
                } ${selectedNodeId === 'emp-crosstab' ? 'ring-2 ring-purple-600' : ''}`}
              >
                <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs mb-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Crosstab</span>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug">
                  &bull; <strong>Pembeda utama:</strong> Peran aktor (bukan umur, gender, atau pendidikan).
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  &bull; Posisi dan fungsi menentukan praktik komunikasi.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Footer Section (Keterangan, Inti Deep Mediatization, Kontribusi Teoretis, Output Akhir) */}
          <div className="grid grid-cols-12 gap-3 items-center pt-2">
            {/* Keterangan */}
            <div className="col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] space-y-1.5">
              <span className="font-bold text-slate-900 block">Keterangan:</span>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-4 h-0.5 bg-slate-900 inline-block"></span>
                <span>Alur utama mediatization</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <span className="w-4 h-0.5 border-b-2 border-dashed border-blue-600 inline-block"></span>
                <span>Umpan balik (feedback)</span>
              </div>
            </div>

            {/* Inti Deep Mediatization */}
            <div className="col-span-4 p-3 bg-amber-50/90 border border-amber-200 rounded-xl">
              <span className="font-extrabold text-[11px] text-amber-950 block mb-0.5">
                Inti Deep Mediatization
              </span>
              <p className="text-[10px] text-amber-900 leading-relaxed">
                Media digital tidak hanya menjadi alat komunikasi, tetapi telah terintegrasi dalam praktik sosial, ekonomi, dan kelembagaan komunitas secara berulang.
              </p>
            </div>

            {/* Kontribusi Teoretis */}
            <div className="col-span-4 p-3 bg-blue-50/90 border border-blue-200 rounded-xl">
              <span className="font-extrabold text-[11px] text-blue-950 block mb-0.5">
                Kontribusi Teoretis
              </span>
              <p className="text-[10px] text-blue-900 leading-relaxed">
                HMM memetakan bagaimana peran aktor, platform, dan praktik komunikasi saling membentuk infrastruktur sosial digital yang berdampak pada legitimasi, kepercayaan, serta keberlanjutan ekosistem BUMDes.
              </p>
            </div>

            {/* Output Akhir */}
            <div className="col-span-2 p-3 bg-white border-2 border-blue-400 rounded-xl text-center shadow-xs">
              <span className="font-extrabold text-[10px] text-blue-900 uppercase tracking-tight block">
                Output Akhir
              </span>
              <p className="text-[10.5px] font-bold text-slate-900 leading-tight mt-1">
                Infrastruktur Sosial Digital BUMDes Ketapanrame
              </p>
            </div>
          </div>
        </div>
      </ZoomPanWrapper>

      {/* High-Resolution Publication Export Modal */}
      <PublicationExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Gambar 1. Model Hybrid Mediatization Mapping (HMM)"
        figureNumber="Gambar 1"
        figureTitle="Model Hybrid Mediatization Mapping (HMM) Ekosistem BUMDes Ketapanrame"
        figureCaptionNote="Model alur 6 kolom mediatisasi hibrida yang menghubungkan peran aktor, infrastruktur digital media/platform, praktik komunikasi, pola interaksi, representasi digital, visibility/jangkauan, aktivitas sosial-ekonomi, dan muara legitimasi/kepercayaan. Didukung oleh 6 klaster bukti empiris (Word Cloud, Matrix Coding, Evidence Coding, Word Similarity, Project Map, Crosstab)."
        defaultFilename="Gambar_1_Model_Hybrid_Mediatization_Mapping_HMM"
        targetElementRef={diagramCaptureRef}
      />

      {/* Interactive Guided Tour for Sidang/Presentasi */}
      <HmmGuidedTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onSelectNodeIds={(ids) => setTourHighlightedNodes(ids)}
        onResetNodes={() => setTourHighlightedNodes([])}
      />
    </div>
  );
};
