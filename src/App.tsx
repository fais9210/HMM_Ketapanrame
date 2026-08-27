import React, { useState, useMemo, useEffect } from 'react';
import {
  completeStructuredDataset,
  informantsData,
  attributesConfig,
  qualitativeNodesData,
  edgesData,
  crosstabMatrixData,
  wordFrequencyTopData,
} from './data/crosstabData';
import {
  defaultHmmFlowSteps,
  defaultProjectMapNodes,
  defaultProjectMapEdges,
} from './data/hmmDefaultData';
import { HmmFlowStep, ProjectMapNode, ProjectMapEdge } from './types';
import { SidebarNav, MainTabType } from './components/SidebarNav';
import { GlobalFilterBar, GlobalFilterState } from './components/GlobalFilterBar';
import { CytoscapeNetworkGraph } from './components/CytoscapeNetworkGraph';
import { InformantProfileCard } from './components/InformantProfileCard';
import { HeaderStatCards } from './components/HeaderStatCards';
import { ComparativeAnalytics } from './components/ComparativeAnalytics';
import { LexicalAnalysis } from './components/LexicalAnalysis';
import { CrosstabMatrixView } from './components/CrosstabMatrixView';
import { JsonViewer } from './components/JsonViewer';
import { PrintableReportView } from './components/PrintableReportView';
import { HmmFrameworkModel } from './components/HmmFrameworkModel';
import { IntegrativeRelationMap } from './components/IntegrativeRelationMap';
import { DataInputMatrixEditor } from './components/DataInputMatrixEditor';
import { useMobileBackHandler } from './hooks/useMobileBackHandler';
import { generateStandaloneHtml } from './utils/generateStandaloneHtml';
import { exportDashboardToPDF } from './utils/exportPdf';
import logoImg from './assets/images/bumdes_hmm_logo_1787789361564.jpg';
import {
  CheckCircle,
  BarChart3,
  BookOpen,
  Download,
  Copy,
  Check,
  FileCode,
  Sparkles,
  Layers,
  Network,
  Share2,
  FileText,
  ArrowRight,
  ArrowLeft,
  Menu,
  GitFork,
  TableProperties,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabType>('hmm_flow');
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedInformantId, setSelectedInformantId] = useState<string | null>(null);

  // Mobile Back Button and History State Manager Hook
  const {
    showExitToast,
    handleGoBack,
    handleReturnToMainDashboard,
    isAtMainDashboard,
  } = useMobileBackHandler({
    activeTab,
    setActiveTab,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    profileDrawerOpen,
    setProfileDrawerOpen,
    selectedNodeData,
    setSelectedNodeData,
    selectedInformantId,
    setSelectedInformantId,
  });

  // Persistent state for HMM & Project Map Data
  const [hmmSteps, setHmmSteps] = useState<HmmFlowStep[]>(() => {
    const saved = localStorage.getItem('hmm_steps_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultHmmFlowSteps;
  });

  const [projectMapNodes, setProjectMapNodes] = useState<ProjectMapNode[]>(() => {
    const saved = localStorage.getItem('project_map_nodes_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultProjectMapNodes;
  });

  const [projectMapEdges, setProjectMapEdges] = useState<ProjectMapEdge[]>(() => {
    const saved = localStorage.getItem('project_map_edges_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultProjectMapEdges;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('hmm_steps_data', JSON.stringify(hmmSteps));
  }, [hmmSteps]);

  useEffect(() => {
    localStorage.setItem('project_map_nodes_data', JSON.stringify(projectMapNodes));
  }, [projectMapNodes]);

  useEffect(() => {
    localStorage.setItem('project_map_edges_data', JSON.stringify(projectMapEdges));
  }, [projectMapEdges]);

  // Reset to default data
  const handleResetToDefaults = () => {
    setHmmSteps(defaultHmmFlowSteps);
    setProjectMapNodes(defaultProjectMapNodes);
    setProjectMapEdges(defaultProjectMapEdges);
    localStorage.removeItem('hmm_steps_data');
    localStorage.removeItem('project_map_nodes_data');
    localStorage.removeItem('project_map_edges_data');
  };

  // Global Filter State
  const [globalFilters, setGlobalFilters] = useState<GlobalFilterState>({
    role: 'ALL',
    education: 'ALL',
    gender: 'ALL',
    ageGroup: 'ALL',
  });

  // Compute active matching informants
  const activeInformants = useMemo(() => {
    return informantsData.filter((inf) => {
      if (selectedInformantId && inf.id !== selectedInformantId) return false;
      if (globalFilters.role !== 'ALL' && inf.role !== globalFilters.role) return false;
      if (globalFilters.education !== 'ALL' && inf.education !== globalFilters.education) return false;
      if (globalFilters.gender !== 'ALL' && inf.gender !== globalFilters.gender) return false;
      if (globalFilters.ageGroup !== 'ALL' && inf.ageGroup !== globalFilters.ageGroup) return false;
      return true;
    });
  }, [globalFilters, selectedInformantId]);

  const activeInformantIds = useMemo(() => {
    return activeInformants.map((i) => i.id);
  }, [activeInformants]);

  // Handle Export Standalone HTML
  const handleExportStandaloneHtml = () => {
    const htmlContent = generateStandaloneHtml(completeStructuredDataset);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qualitative_research_dashboard_standalone.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Export PDF Report via html2pdf.js
  const handleExportPdf = async () => {
    await exportDashboardToPDF('printable-report-container', 'Laporan_Penelitian_BUMDes.pdf');
  };

  // Handle JSON Copy & Download
  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(completeStructuredDataset, null, 2));
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(completeStructuredDataset, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crosstab_analysis_informan_nvivo.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetFilters = () => {
    setGlobalFilters({
      role: 'ALL',
      education: 'ALL',
      gender: 'ALL',
      ageGroup: 'ALL',
    });
    setSelectedInformantId(null);
  };

  const handleSelectInformantQuick = (id: string) => {
    setSelectedInformantId(id);
    const inf = informantsData.find((i) => i.id === id);
    if (inf) {
      setSelectedNodeData({ ...inf, nodeType: 'informant' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-row antialiased selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* 1. Sidebar Navigation (Responsive Drawer on Mobile, Fixed on Desktop) */}
      <SidebarNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        informants={informantsData}
        selectedInformantId={selectedInformantId}
        onSelectInformant={(id) => {
          setSelectedInformantId(id);
          if (id) {
            const inf = informantsData.find((i) => i.id === id);
            if (inf) {
              setSelectedNodeData({ ...inf, nodeType: 'informant' });
            }
          } else {
            setSelectedNodeData(null);
          }
        }}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="min-h-14 sm:min-h-16 bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 sm:py-0 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-2xs gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Hamburger Button for Mobile / Tablet */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
              title="Buka Menu Navigasi"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Dynamic Mobile/Desktop Back Button when not on main dashboard */}
            {activeTab !== 'hmm_flow' && (
              <button
                onClick={handleGoBack}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 border border-indigo-200 shadow-2xs"
                title="Kembali ke Dashboard Utama / Halaman Sebelumnya"
                aria-label="Kembali"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-700" />
                <span className="hidden sm:inline">Kembali</span>
              </button>
            )}

            <div className="w-9 h-9 rounded-xl bg-white p-0.5 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={logoImg}
                alt="Logo HMM BUMDes Ketapanrame"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-xs sm:text-base text-slate-900 tracking-tight leading-tight truncate">
                {activeTab === 'hmm_flow' && 'Gambar 1: Model Alur Mediasi Hierarkis (HMM)'}
                {activeTab === 'project_map' && 'Gambar 2: Peta Relasi Aktor & Tema (Project Map)'}
                {activeTab === 'matrix_editor' && 'Input Data Manual & Editor Matriks Checklist Relasi'}
                {activeTab === 'network' && 'Dashboard Interaktif & Peta Hubungan Kualitatif'}
                {activeTab === 'comparative' && 'Comparative Analytics (Stacked Charts)'}
                {activeTab === 'lexical' && 'Lexical Analysis (Word Frequency & Cloud)'}
                {activeTab === 'crosstab' && 'Matriks Crosstab 29 Nodes vs Informan'}
                {activeTab === 'findings' && 'Sintesis & Temuan Riset Kualitatif'}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame &bull; Riset Kualitatif Transformasi Komunikasi
              </p>
            </div>
          </div>

          {/* Quick Header Actions & Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick 3-Mode Visualizer Pill Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('hmm_flow')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'hmm_flow'
                    ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Model Alur HMM (Gambar 1)"
              >
                <GitFork className="w-3 h-3 text-indigo-600" />
                <span>Gambar 1</span>
              </button>
              <button
                onClick={() => setActiveTab('project_map')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'project_map'
                    ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Peta Relasi Integratif (Gambar 2)"
              >
                <Share2 className="w-3 h-3 text-emerald-600" />
                <span>Gambar 2</span>
              </button>
              <button
                onClick={() => setActiveTab('matrix_editor')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'matrix_editor'
                    ? 'bg-white text-purple-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Input & Editor Matriks Relasi"
              >
                <TableProperties className="w-3 h-3 text-purple-600" />
                <span>Editor</span>
              </button>
            </div>
          </div>
        </header>

        {/* Global Synchronized Filter Panel (shown on analytical tabs) */}
        {(activeTab === 'network' || activeTab === 'comparative' || activeTab === 'crosstab') && (
          <GlobalFilterBar
            filters={globalFilters}
            onFilterChange={setGlobalFilters}
            onResetFilters={handleResetFilters}
            informants={informantsData}
            activeInformantCount={activeInformants.length}
            totalInformants={informantsData.length}
          />
        )}

        {/* Tab Views Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-7xl w-full mx-auto pb-20 lg:pb-6">
          {/* TAB 1: MODEL ALUR MEDIASI HIERARKIS (GAMBAR 1 - HMM) */}
          {activeTab === 'hmm_flow' && (
            <div className="space-y-6">
              <HmmFrameworkModel
                steps={hmmSteps}
                onSelectStep={(step) => console.log('Selected step:', step)}
              />
            </div>
          )}

          {/* TAB 2: PETA RELASI INTEGRATIF (GAMBAR 2 - PROJECT MAP) */}
          {activeTab === 'project_map' && (
            <div className="space-y-6">
              <IntegrativeRelationMap
                nodes={projectMapNodes}
                edges={projectMapEdges}
                onSelectNode={(node) => setSelectedNodeData(node)}
              />
            </div>
          )}

          {/* TAB 3: INPUT DATA MANUAL & EDITOR MATRIKS RELASI */}
          {activeTab === 'matrix_editor' && (
            <div className="space-y-6">
              <DataInputMatrixEditor
                nodes={projectMapNodes}
                edges={projectMapEdges}
                hmmSteps={hmmSteps}
                onUpdateNodes={setProjectMapNodes}
                onUpdateEdges={setProjectMapEdges}
                onUpdateHmmSteps={setHmmSteps}
                onResetDefaults={handleResetToDefaults}
              />
            </div>
          )}

          {/* TAB 4: CONCENTRIC NETWORK GRAPH DASHBOARD */}
          {activeTab === 'network' && (
            <div className="space-y-6">
              {/* 1. Header Stat Cards */}
              <HeaderStatCards
                totalInformants={informantsData.length}
                totalActiveThemes={16}
                totalEdges={edgesData.length}
                totalWordsCorpus={5420}
              />

              {/* 2. Full-Width Peta Hubungan (Cytoscape Network Graph Canvas) */}
              <div className="w-full space-y-3">
                <CytoscapeNetworkGraph
                  informants={informantsData}
                  qualitativeNodes={qualitativeNodesData}
                  edges={edgesData}
                  attributesConfig={attributesConfig}
                  activeInformantIds={activeInformantIds}
                  selectedNodeId={selectedNodeData ? selectedNodeData.id : null}
                  onSelectNode={(nodeData) => {
                    setSelectedNodeData(nodeData);
                    if (nodeData && nodeData.nodeType === 'informant') {
                      setProfileDrawerOpen(true);
                    }
                  }}
                  onOpenProfileDrawer={() => setProfileDrawerOpen(true)}
                />
              </div>

              {/* 3. Bottom Section: Quick Insight Cards (Stacked Bar Chart & Word Cloud) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insight Card 1: Comparative Analytics Preview */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <BarChart3 className="w-5 h-5" />
                        <h3 className="font-bold text-slate-900 text-sm">
                          Comparative Analytics (Distribusi Koding)
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                        Crosstab
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Bandingkan intensitas tema kualitatif berdasarkan kelompok pendidikan, gender, dan peran organisasi. 8 tema mencapai konsensus mutlak (100%).
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center pt-2">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-lg font-bold text-indigo-600 block">16</span>
                        <span className="text-[10px] text-slate-500 font-medium">Tema Aktif</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-lg font-bold text-emerald-600 block">86.3%</span>
                        <span className="text-[10px] text-slate-500 font-medium">Saturasi Data</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-lg font-bold text-purple-600 block">3 Segmen</span>
                        <span className="text-[10px] text-slate-500 font-medium">Pendidikan</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Lihat grafik stacked bar interaktif</span>
                    <button
                      onClick={() => setActiveTab('comparative')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
                    >
                      <span>Buka Comparative Tab</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>
                </div>

                {/* Insight Card 2: Lexical Analysis Preview */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Sparkles className="w-5 h-5" />
                        <h3 className="font-bold text-slate-900 text-sm">
                          Lexical Analysis & Word Cloud
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                        Word Frequency
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Eksplorasi 580 kata frekuensi tinggi dari seluruh transkrip wawancara. Kata kunci terpopuler: <em>desa, masyarakat, media, informasi, wisata</em>.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {wordFrequencyTopData.slice(0, 8).map((w) => (
                        <span
                          key={w.word}
                          className="px-2.5 py-1 bg-slate-50 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/70"
                        >
                          {w.word} <strong className="text-indigo-600">({w.count})</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Visualisasi Semantic Word Cloud D3</span>
                    <button
                      onClick={() => setActiveTab('lexical')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
                    >
                      <span>Buka Lexical Tab</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPARATIVE ANALYTICS (STACKED CHARTS) */}
          {activeTab === 'comparative' && (
            <ComparativeAnalytics
              informants={informantsData}
              activeInformantIds={activeInformantIds}
              crosstabMatrix={crosstabMatrixData}
              qualitativeNodes={qualitativeNodesData}
            />
          )}

          {/* TAB 3: LEXICAL ANALYSIS (WORD CLOUD & FREQUENCY) */}
          {activeTab === 'lexical' && <LexicalAnalysis wordList={wordFrequencyTopData} />}

          {/* TAB 4: CROSSTAB MATRIX */}
          {activeTab === 'crosstab' && (
            <CrosstabMatrixView
              matrixData={crosstabMatrixData}
              informants={informantsData}
              selectedInformantId={selectedInformantId}
              onSelectInformant={setSelectedInformantId}
            />
          )}

          {/* TAB 5: QUALITATIVE FINDINGS */}
          {activeTab === 'findings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo-600">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-bold text-slate-800 text-sm">
                    Pola Relasi Lintas Informan (100% Konsensus)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Terdapat <strong>8 Tema Kualitatif</strong> yang dikonfirmasi secara mutlak (nilai 1)
                  oleh seluruh 5 informan tanpa terkecuali:
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pl-4 list-disc">
                  <li>
                    <strong>feedback atau tindak lanjut</strong> (respon terhadap pengunjung & keluhan)
                  </li>
                  <li>
                    <strong>Jangkauan Pemasaran atau Masyarakat</strong> (promosi dan penetrasi pasar wisata)
                  </li>
                  <li>
                    <strong>Komunikasi tatap muka atau musyawarah</strong> (rapat berkala & musyawarah desa)
                  </li>
                  <li>
                    <strong>Partisipasi Pasif</strong> (menyimak informasi di grup WhatsApp)
                  </li>
                  <li>
                    <strong>Penggunaan media digital</strong> (adopsi harian WhatsApp & medsos)
                  </li>
                  <li>
                    <strong>Kemudahan informasi dan berkomunikasi</strong> (efisiensi pertukaran data)
                  </li>
                  <li>
                    <strong>saran dan kritik</strong> (keterbukaan masukan warga)
                  </li>
                  <li>
                    <strong>platform digital</strong> (WhatsApp, Instagram @tamanghanjaran, TikTok)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-600">
                  <BarChart3 className="w-5 h-5" />
                  <h3 className="font-bold text-slate-800 text-sm">Diferensiasi Peran & Atribut</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Karakteristik khusus berdasarkan peran institusional dan kelompok usia:
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pl-4 list-disc">
                  <li>
                    <strong>Kepercayaan (3 kasus)</strong>: Coded khusus pada jajaran pimpinan (Kepala Desa,
                    Ketua BUMDeS, dan Ketua KUB Wahana), merefleksikan tanggung jawab tata kelola dana publik.
                  </li>
                  <li>
                    <strong>Transaksi (4 kasus)</strong>: Hadir pada Kepala Desa, Ketua BUMDeS, Ketua KUB,
                    dan Tenan Pujasera, namun tidak menjadi tugas langsung Admin Media Sosial.
                  </li>
                  <li>
                    <strong>Peran dalam MEDSOS (3 kasus)</strong>: Terpusat pada Admin Media Sosial (Informan 1),
                    Kepala Desa (Informan 2), dan Tenan Pujasera (Informan 5).
                  </li>
                  <li>
                    <strong>Partisipasi Aktif vs Pasif</strong>: Seluruh informan berpartisipasi pasif,
                    sedangkan partisipasi aktif didominasi penggerak teknis dan pembuat kebijakan.
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 md:col-span-2">
                <h3 className="font-bold text-slate-800 text-sm">
                  Struktur Data & Validasi Edge Koding
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="font-bold text-indigo-700 mb-1 flex items-center gap-1.5">
                      <FileCode className="w-4 h-4" /> 20 Edges Value / Atribut
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Setiap informan (5) terhubung ke 4 atribut dasar (Gender, Umur, Peran, Pendidikan),
                      membentuk 20 edge relasi demografis.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="font-bold text-blue-700 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> 69 Edges Codes / Tema
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Seluruh nilai angka 1 pada matriks kros-tabulasi dipetakan menjadi edge eksplisit
                      tipe <code>Codes</code>.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                    <div className="font-bold text-emerald-700 mb-1 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" /> 13 Node Parent Konseptual
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Node kategori induk teoretis dipertahankan dengan nilai 0 dan flag{' '}
                      <code>parent_concept</code> dalam skema JSON.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DATASET JSON */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <JsonViewer dataset={completeStructuredDataset} />
            </div>
          )}

          {/* Hidden Off-Screen Report Element Captured by html2pdf.js */}
          <PrintableReportView
            informants={informantsData}
            qualitativeNodes={qualitativeNodesData}
            wordList={wordFrequencyTopData}
            totalEdges={edgesData.length}
          />
        </main>

        {/* Footer */}
        <footer className="h-11 bg-white border-t border-slate-200 px-4 sm:px-6 hidden sm:flex items-center justify-between text-xs text-slate-400 shrink-0 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">NVivo Qualitative Research Engine &bull; 89 Edges Loaded &bull; 5 Informan</span>
          </div>
          <div className="font-mono text-slate-400 text-[11px] shrink-0">Qual-Insight Dashboard v3.0</div>
        </footer>

        {/* Mobile Bottom Navigation Bar (< lg screens) */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-30 px-1.5 py-1.5 flex items-center justify-around text-slate-400 shadow-lg">
          <button
            onClick={() => setActiveTab('hmm_flow')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'hmm_flow' ? 'text-indigo-400 font-bold bg-slate-800' : 'hover:text-white'
            }`}
          >
            <GitFork className="w-4 h-4 mb-0.5" />
            <span>Alur HMM</span>
          </button>
          <button
            onClick={() => setActiveTab('project_map')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'project_map' ? 'text-emerald-400 font-bold bg-slate-800' : 'hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4 mb-0.5" />
            <span>Peta Relasi</span>
          </button>
          <button
            onClick={() => setActiveTab('comparative')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'comparative' ? 'text-sky-400 font-bold bg-slate-800' : 'hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 mb-0.5" />
            <span>Grafik</span>
          </button>
          <button
            onClick={() => setActiveTab('crosstab')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'crosstab' ? 'text-purple-400 font-bold bg-slate-800' : 'hover:text-white'
            }`}
          >
            <TableProperties className="w-4 h-4 mb-0.5" />
            <span>Matriks</span>
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'findings' ? 'text-amber-400 font-bold bg-slate-800' : 'hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Temuan</span>
          </button>
        </div>
      </div>

      {/* Mobile Double-Back Exit Confirmation Toast */}
      {showExitToast && (
        <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none w-auto max-w-[90vw]">
          <div className="bg-slate-900/95 text-white text-xs font-medium px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700 flex items-center gap-2.5 text-center">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>Tekan tombol kembali sekali lagi untuk keluar aplikasi</span>
          </div>
        </div>
      )}

      {/* Slide-Over Drawer for Informant Profile */}
      {profileDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setProfileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-Over Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2.5 text-indigo-600">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-sm text-indigo-700 shadow-2xs">
                  <FileCode className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">Profil Informan</h3>
                  <p className="text-[11px] text-slate-500">Karakteristik & Distribusi Tema Koding</p>
                </div>
              </div>
              <button
                onClick={() => setProfileDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-xl transition cursor-pointer"
                title="Tutup Panel Profil (ESC)"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <InformantProfileCard
                selectedNode={selectedNodeData}
                informants={informantsData}
                qualitativeNodes={qualitativeNodesData}
                edges={edgesData}
                onSelectInformant={(id) => {
                  handleSelectInformantQuick(id);
                }}
                onClearSelection={() => setSelectedNodeData(null)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
