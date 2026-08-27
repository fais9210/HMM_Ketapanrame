import React from 'react';
import {
  Network,
  BarChart3,
  Sparkles,
  Table as TableIcon,
  FileCode,
  BookOpen,
  Download,
  Copy,
  Check,
  FileText,
  Layers,
  Users,
  ExternalLink,
  GitFork,
  Share2,
  Sliders,
  TableProperties,
  X,
  UserCheck,
  User,
} from 'lucide-react';
import { Informant } from '../types';
import logoImg from '../assets/images/bumdes_hmm_logo_1787789361564.jpg';

export type MainTabType =
  | 'hmm_flow'
  | 'project_map'
  | 'matrix_editor'
  | 'network'
  | 'comparative'
  | 'lexical'
  | 'crosstab'
  | 'findings'
  | 'json';

interface SidebarNavProps {
  activeTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  informants: Informant[];
  selectedInformantId: string | null;
  onSelectInformant: (id: string | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  informants,
  selectedInformantId,
  onSelectInformant,
  isOpen = false,
  onClose,
}) => {
  const handleTabClick = (tab: MainTabType) => {
    onSelectTab(tab);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 animate-fadeIn"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 lg:w-64 lg:static bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-300 ease-in-out select-none shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-slate-700/80 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={logoImg}
                alt="Logo HMM BUMDes Ketapanrame"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-slate-100 text-xs tracking-tight leading-snug truncate">
                Hybrid Mediatization Mapping
              </h1>
              <p className="text-[10px] text-emerald-400 font-semibold truncate">HMM BUMDes Ketapanrame</p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Tutup Menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Main Core Navigation Tabs */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Section: Model Riset (Gambar 1 & 2) */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-3 mb-2 flex items-center justify-between">
              <span>Model & Peta Relasi</span>
              <span className="bg-indigo-950 text-indigo-300 text-[9px] px-1.5 py-0.5 rounded font-mono">
                Gambar 1 & 2
              </span>
            </div>
            <nav className="space-y-1">
              {/* Tab 1: Model Alur HMM (Gambar 1) */}
              <button
                id="sidebar-tab-hmm-flow"
                onClick={() => handleTabClick('hmm_flow')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  activeTab === 'hmm_flow'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <GitFork className="w-4 h-4 shrink-0 text-amber-400" />
                <div className="truncate">
                  <div className="leading-tight">Model Alur (Gambar 1)</div>
                  <div className="text-[10px] font-normal text-slate-400 truncate">
                    Alur Mediasi HMM & Validasi
                  </div>
                </div>
              </button>

              {/* Tab 2: Peta Relasi Integratif (Gambar 2) */}
              <button
                id="sidebar-tab-project-map"
                onClick={() => handleTabClick('project_map')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  activeTab === 'project_map'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Share2 className="w-4 h-4 shrink-0 text-blue-400" />
                <div className="truncate">
                  <div className="leading-tight">Peta Relasi (Gambar 2)</div>
                  <div className="text-[10px] font-normal text-slate-400 truncate">
                    Project Map Interaktif 5 Aktor
                  </div>
                </div>
              </button>

              {/* Tab 3: Data Input Manual & Editor Matriks */}
              <button
                id="sidebar-tab-matrix-editor"
                onClick={() => handleTabClick('matrix_editor')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                  activeTab === 'matrix_editor'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <TableProperties className="w-4 h-4 shrink-0 text-emerald-400" />
                <div className="truncate">
                  <div className="leading-tight">Input & Matriks Relasi</div>
                  <div className="text-[10px] font-normal text-slate-400 truncate">
                    Editor Garis & Elemen Riset
                  </div>
                </div>
              </button>
            </nav>
          </div>

          {/* Section: Analisis Kualitatif Lanjutan */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Eksplorasi Analisis
            </div>
            <nav className="space-y-1">
              {/* Concentric Network */}
              <button
                id="sidebar-tab-network"
                onClick={() => handleTabClick('network')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'network'
                    ? 'bg-slate-800 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Network className="w-4 h-4 text-center text-indigo-400" />
                <span>Peta Konsentris NVivo</span>
              </button>

              {/* Comparative Analytics */}
              <button
                id="sidebar-tab-comparative"
                onClick={() => handleTabClick('comparative')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'comparative'
                    ? 'bg-slate-800 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-center text-sky-400" />
                <span>Grafik Batang Tumpuk</span>
              </button>

              {/* Lexical Analysis */}
              <button
                id="sidebar-tab-lexical"
                onClick={() => handleTabClick('lexical')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'lexical'
                    ? 'bg-slate-800 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-center text-amber-400" />
                <span>Word Cloud & Frekuensi</span>
              </button>

              {/* Crosstab Matrix */}
              <button
                id="sidebar-tab-crosstab"
                onClick={() => handleTabClick('crosstab')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'crosstab'
                    ? 'bg-slate-800 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <TableProperties className="w-4 h-4 text-center text-emerald-400" />
                <span>Matriks Kros-Tabulasi</span>
              </button>

              {/* Findings */}
              <button
                id="sidebar-tab-findings"
                onClick={() => handleTabClick('findings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'findings'
                    ? 'bg-slate-800 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-center text-purple-400" />
                <span>Temuan & Sintesis</span>
              </button>
            </nav>
          </div>

          {/* Informants Quick Filter List */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                Kasus Informan
              </span>
              {selectedInformantId && (
                <button
                  onClick={() => onSelectInformant(null)}
                  className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-1">
              {informants.map((inf) => {
                const isSelected = selectedInformantId === inf.id;
                return (
                  <button
                    key={inf.id}
                    id={`sidebar-inf-${inf.id}`}
                    onClick={() => onSelectInformant(isSelected ? null : inf.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950 text-white border border-indigo-500/50'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate font-medium">{inf.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                      {inf.totalCodedThemes}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend Quick Reference in Sidebar */}
          <div className="p-3 bg-slate-850/80 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Ikonografi Gambar 2
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shrink-0"></span>
              <span>Aktor Komunitas (5 Kasus)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-3 h-3 rounded-full bg-green-300 inline-block shrink-0"></span>
              <span>Atribut Demografis (9 Atribut)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-3 h-3 rounded-full bg-blue-400 inline-block shrink-0"></span>
              <span>Tema Utama (4 Dimensi)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shrink-0"></span>
              <span>Tema Pendukung (3 Tema)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-4 h-2 rounded bg-purple-400 inline-block shrink-0"></span>
              <span>Hasil/Dampak (2 Luaran)</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

