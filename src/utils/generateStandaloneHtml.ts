import { StructuredCrosstabDataset } from '../types';

/**
 * Generates a complete, self-contained, standalone .html file containing:
 * - Tailwind CSS CDN
 * - FontAwesome 6 CDN
 * - Cytoscape.js CDN (with cose layout, bezier curved lines, node pulse animation, edge hover)
 * - Chart.js CDN (for interactive stacked bar charts & comparative graphs)
 * - D3 & D3-Cloud CDN (for interactive word cloud rendering)
 * - Embedded full dataset (Crosstabs, 89 Edges, Informants, Attributes, Themes, Word Frequencies)
 * - Modern 2024 SaaS visual design (rounded corners, soft shadows, profile cards, stat cards)
 */
export function generateStandaloneHtml(dataset: StructuredCrosstabDataset): string {
  const jsonDatasetStr = JSON.stringify(dataset, null, 2);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame</title>
  
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          },
          colors: {
            brand: {
              50: '#eef2ff',
              100: '#e0e7ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              900: '#312e81',
            }
          }
        }
      }
    }
  </script>

  <!-- FontAwesome 6 CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <!-- Cytoscape.js CDN (Network Graph) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.28.1/cytoscape.min.js"></script>

  <!-- Chart.js CDN (Comparative Analytics) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>

  <!-- WordCloud2.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.2.2/wordcloud2.min.js"></script>

  <!-- html2pdf.js CDN for PDF Report Generation -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  <!-- D3 and D3-Cloud for Word Cloud -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.min.js"></script>

  <style>
    /* Custom Scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    #cy-container {
      width: 100%;
      height: 640px;
      background: #f8fafc;
      border-radius: 1rem;
    }
  </style>
</head>
<body class="bg-slate-100 text-slate-800 font-sans antialiased min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">

  <!-- 1. Top Navigation Bar -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs px-6 py-3.5 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm ring-2 ring-indigo-100">
        <i class="fa-solid fa-layer-group"></i>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame</h1>
          <span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
            Standalone HTML
          </span>
        </div>
        <p class="text-xs text-slate-500">Riset Kualitatif Transformasi Komunikasi &bull; Kasus Informan 1-5</p>
      </div>
    </div>

    <!-- Quick Stats & Actions -->
    <div class="flex items-center gap-2.5">
      <span class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-100 shadow-2xs">
        <span class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
        5 Informan &bull; 29 Nodes &bull; 89 Edges
      </span>
      <!-- Dedicated Green Export Button with fa-file-pdf -->
      <button id="btn-export-pdf-standalone" onclick="exportToPDF()" class="px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
        <i class="fa-solid fa-file-pdf text-sm"></i>
        <span>Export PDF</span>
      </button>
      <button onclick="window.print()" class="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition flex items-center gap-1.5">
        <i class="fa-solid fa-print text-xs"></i>
        <span>Print</span>
      </button>
    </div>
  </header>

  <!-- 2. Global Filter Bar -->
  <div class="bg-white border-b border-slate-200/80 px-6 py-3 shadow-2xs">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3">
        <span class="font-bold text-slate-700 flex items-center gap-1.5">
          <i class="fa-solid fa-filter text-indigo-600"></i>
          Global Filter:
        </span>

        <!-- Filter Peran -->
        <select id="filter-peran" onchange="applyGlobalFilters()" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs">
          <option value="ALL">Semua Peran (5)</option>
          <option value="Admin Media Sosial">Admin Media Sosial (INF-01)</option>
          <option value="Kepala Desa Ketapanrame">Kepala Desa (INF-02)</option>
          <option value="Ketua BUMDeS">Ketua BUMDeS (INF-03)</option>
          <option value="Ketua KUB Wahana Taman Ghanjaran">Ketua KUB (INF-04)</option>
          <option value="Tenan Pujasera">Tenan Pujasera (INF-05)</option>
        </select>

        <!-- Filter Pendidikan -->
        <select id="filter-pendidikan" onchange="applyGlobalFilters()" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs">
          <option value="ALL">Semua Pendidikan</option>
          <option value="SMA/SMK">SMA/SMK (1)</option>
          <option value="S1">S1 (3)</option>
          <option value="S2">S2 (1)</option>
        </select>

        <!-- Filter Gender -->
        <select id="filter-gender" onchange="applyGlobalFilters()" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs">
          <option value="ALL">Semua Gender</option>
          <option value="Laki-laki">Laki-laki (4)</option>
          <option value="Perempuan">Perempuan (1)</option>
        </select>

        <!-- Filter Umur -->
        <select id="filter-umur" onchange="applyGlobalFilters()" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs">
          <option value="ALL">Semua Kelompok Umur</option>
          <option value="26-35">26-35 tahun (1)</option>
          <option value="36-45">36-45 tahun (2)</option>
          <option value="46-55">46-55 tahun (2)</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span id="active-informant-badge" class="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
          5 / 5 Kasus Aktif
        </span>
        <button onclick="resetGlobalFilters()" class="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition">
          Reset Filter
        </button>
      </div>
    </div>
  </div>

  <!-- 3. Main Dashboard Body -->
  <main class="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
    
    <!-- 3.1 Stat Cards (Header Summary) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Stat 1: Total Informan -->
      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div class="space-y-1">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Subjek Informan</span>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xl font-extrabold text-slate-900">5</span>
            <span className="text-xs font-semibold text-slate-500">Kasus</span>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>1 Perempuan &bull; 4 Laki-laki</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-xl shadow-2xs shrink-0">
          <i class="fa-solid fa-user-tie"></i>
        </div>
      </div>

      <!-- Stat 2: Total Kata Corpus -->
      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div class="space-y-1">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Kata Corpus</span>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xl font-extrabold text-slate-900">5,420</span>
            <span class="text-xs font-semibold text-slate-500">Kata</span>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>580 Frekuensi Kata Terindeks</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl shadow-2xs shrink-0">
          <i class="fa-solid fa-file-lines"></i>
        </div>
      </div>

      <!-- Stat 3: Tema Kualitatif -->
      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div class="space-y-1">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tema Kualitatif</span>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xl font-extrabold text-slate-900">16</span>
            <span class="text-xs font-semibold text-slate-500">Tema Aktif</span>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span>8 Konsensus Penuh (100%)</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-xl shadow-2xs shrink-0">
          <i class="fa-solid fa-tags"></i>
        </div>
      </div>

      <!-- Stat 4: Relasi Kros-Tabulasi -->
      <div class="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div class="space-y-1">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Relasi Kros-Tabulasi</span>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xl font-extrabold text-slate-900">89</span>
            <span class="text-xs font-semibold text-slate-500">Edges</span>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>69 Codes &bull; 20 Value</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center text-xl shadow-2xs shrink-0">
          <i class="fa-solid fa-network-wired"></i>
        </div>
      </div>
    </div>

    <!-- 3.2 Full-Width Peta Hubungan (Cytoscape Network Map) -->
    <div class="w-full">
      <!-- Cytoscape Network Map Container -->
      <div id="network-graph-card" class="w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all">
        <!-- Toolbar & Search Bar -->
        <div class="p-3.5 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <!-- Search Bar -->
          <div class="relative flex-1 min-w-[200px] max-w-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </div>
            <input
              type="text"
              id="graph-search-input"
              oninput="handleGraphSearch(this.value)"
              placeholder="Cari tema, kata kunci, atau informan..."
              class="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-2xs"
            />
          </div>

          <!-- Edge Filter -->
          <div class="flex items-center gap-1 bg-white border border-slate-200/80 rounded-xl p-1 shadow-2xs text-xs">
            <span class="text-slate-400 px-2 font-medium">Relasi:</span>
            <button onclick="setGraphEdgeFilter('ALL')" id="btn-edge-all" class="px-2.5 py-1 rounded-lg font-semibold bg-indigo-600 text-white shadow-2xs">
              Semua (89)
            </button>
            <button onclick="setGraphEdgeFilter('Codes')" id="btn-edge-codes" class="px-2.5 py-1 rounded-lg font-semibold text-blue-700 hover:bg-blue-50">
              <i class="fa-solid fa-tags mr-1"></i> Codes (69)
            </button>
            <button onclick="setGraphEdgeFilter('Value')" id="btn-edge-value" class="px-2.5 py-1 rounded-lg font-semibold text-purple-700 hover:bg-purple-50">
              <i class="fa-solid fa-id-card mr-1"></i> Value (20)
            </button>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-1 bg-white border border-slate-200/80 rounded-xl p-1 shadow-2xs text-xs">
            <button onclick="toggleProfileDrawer()" class="px-2.5 py-1.5 bg-indigo-50/90 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs transition cursor-pointer" title="Buka Panel Profil Informan">
              <i class="fa-solid fa-id-card text-xs"></i>
              <span class="hidden sm:inline">Profil Informan</span>
            </button>
            <button onclick="cyZoom(1.25)" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Perbesar">
              <i class="fa-solid fa-magnifying-glass-plus text-xs"></i>
            </button>
            <button onclick="cyZoom(0.8)" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Perkecil">
              <i class="fa-solid fa-magnifying-glass-minus text-xs"></i>
            </button>
            <button onclick="cyFit()" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Pusatkan Graf">
              <i class="fa-solid fa-expand text-xs"></i>
            </button>
            <button onclick="resetGraphHighlight()" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Reset Sorotan">
              <i class="fa-solid fa-rotate-left text-xs"></i>
            </button>
            <button onclick="toggleGraphFullscreen()" id="btn-fullscreen-graph" class="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer" title="Tampilkan Peta Layar Penuh">
              <i class="fa-solid fa-up-right-and-down-left-from-center text-xs"></i>
              <span class="hidden sm:inline">Full Screen</span>
            </button>
          </div>
        </div>

        <!-- Interactive Clickable Legend (Pulsing Effect) -->
        <div class="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-700 flex items-center gap-1 mr-1">
              <i class="fa-solid fa-wand-magic-sparkles text-indigo-600 text-xs"></i>
              Legend Interaktif (Klik untuk Berkedip / Pulse):
            </span>

            <button onclick="triggerPulsingLegend('education', 'S1', this)" class="legend-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 bg-white text-slate-700 hover:border-amber-400 transition flex items-center gap-1.5">
              <i class="fa-solid fa-graduation-cap text-amber-600"></i>
              <span>Pendidikan S1 (3)</span>
            </button>

            <button onclick="triggerPulsingLegend('education', 'SMA/SMK', this)" class="legend-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 bg-white text-slate-700 hover:border-amber-400 transition flex items-center gap-1.5">
              <i class="fa-solid fa-graduation-cap text-amber-600"></i>
              <span>SMA/SMK (1)</span>
            </button>

            <button onclick="triggerPulsingLegend('gender', 'Perempuan', this)" class="legend-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 bg-white text-slate-700 hover:border-purple-400 transition flex items-center gap-1.5">
              <i class="fa-solid fa-venus-mars text-purple-600"></i>
              <span>Perempuan (1)</span>
            </button>

            <button onclick="triggerPulsingLegend('gender', 'Laki-laki', this)" class="legend-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 bg-white text-slate-700 hover:border-indigo-400 transition flex items-center gap-1.5">
              <i class="fa-solid fa-venus-mars text-indigo-600"></i>
              <span>Laki-laki (4)</span>
            </button>
          </div>

          <div id="hover-edge-tooltip" class="text-[11px] text-slate-500 font-medium">
            <span class="italic text-slate-400">Arahkan kursor ke garis hubungan untuk melihat detail frekuensi</span>
          </div>
        </div>

        <!-- Canvas Container -->
        <div id="cy-container" class="cursor-grab active:cursor-grabbing"></div>

        <!-- Footer Map Legend -->
        <div class="px-4 py-2 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <div class="flex flex-wrap items-center gap-4">
            <span class="flex items-center gap-1.5">
              <span class="w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 inline-block shadow-2xs"></span>
              <span class="text-slate-700 font-semibold">Informan (Putih / Border Indigo)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-3.5 h-3.5 bg-purple-100 border-2 border-purple-600 rotate-45 inline-block"></span>
              <span class="text-purple-900 font-semibold">Atribut (Soft Purple)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-3.5 h-3.5 rounded-xs bg-blue-100 border-2 border-blue-600 inline-block"></span>
              <span class="text-blue-900 font-semibold">Tema Kualitatif (Soft Blue)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-5 h-0.5 bg-blue-500 inline-block"></span>
              <span>Garis Solid (Koding)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-5 h-0.5 border-t-2 border-dashed border-purple-500 inline-block"></span>
              <span>Garis Putus (Karakteristik)</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide-over Drawer for Informant Profile -->
    <div id="profile-drawer-backdrop" onclick="closeProfileDrawer()" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity hidden" aria-hidden="true"></div>
    <div id="profile-drawer-modal" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 transform translate-x-full transition-transform duration-300 ease-in-out">
      <div class="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
        <div class="flex items-center gap-2.5 text-indigo-600">
          <span class="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-sm text-indigo-700 shadow-2xs">
            <i class="fa-solid fa-id-card"></i>
          </span>
          <div>
            <h3 class="font-bold text-sm text-slate-900 leading-tight">Profil Informan</h3>
            <p class="text-[11px] text-slate-500">Karakteristik & Distribusi Tema Koding</p>
          </div>
        </div>
        <button onclick="closeProfileDrawer()" class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-xl transition cursor-pointer" title="Tutup Panel Profil">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>
      <div id="profile-card-container" class="flex-1 overflow-y-auto p-5">
        <!-- Injected via JS -->
      </div>
    </div>

    <!-- 3.3 Bottom Section: Insights (Stacked Bar Chart & Word Cloud) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Insight 1: Stacked Bar Chart (Comparative Analytics) -->
      <div class="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2 text-indigo-600">
              <i class="fa-solid fa-chart-simple text-base"></i>
              <h3 class="font-bold text-slate-900 text-sm">
                Comparative Analytics (Distribusi Koding 16 Tema)
              </h3>
            </div>
            <span class="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
              Chart.js Stacked
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
            Perbandingan intensitas koding tema kualitatif lintas 5 informan. Menunjukkan 8 tema konsensus 100% dan diferensiasi peran manajerial.
          </p>

          <div class="h-64 w-full">
            <canvas id="stackedBarChart"></canvas>
          </div>
        </div>

        <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span><i class="fa-solid fa-circle-check text-emerald-500 mr-1"></i> 8 tema konsensus penuh (5 kasus)</span>
          <span class="font-semibold text-indigo-600">86.3% Saturasi</span>
        </div>
      </div>

      <!-- Insight 2: Word Cloud & Lexical Analysis -->
      <div class="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2 text-blue-600">
              <i class="fa-solid fa-cloud text-base"></i>
              <h3 class="font-bold text-slate-900 text-sm">
                Lexical Analysis & Semantic Word Cloud
              </h3>
            </div>
            <span class="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100">
              D3 Cloud
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
            Visualisasi frekuensi kata teratas dari total 5,420 kata corpus transkrip. Menyorot pilar tata kelola desa, pariwisata, dan platform digital.
          </p>

          <div id="word-cloud-container" class="h-64 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
            <!-- Word Cloud SVG Injected here -->
          </div>
        </div>

        <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Top keywords: <strong>desa, masyarakat, media, informasi, wisata</strong></span>
          <span class="font-semibold text-blue-600">580 Frekuensi</span>
        </div>
      </div>
    </div>

    <!-- 3.3 Hidden Printable Report Section (Captured by html2pdf.js) -->
    <div id="printable-report-container" class="hidden print:block bg-white text-slate-900 font-sans p-8 max-w-[210mm] mx-auto space-y-6">
      <div class="border-b-2 border-indigo-900 pb-4 flex items-center justify-between">
        <div class="space-y-1">
          <div class="text-[11px] font-bold tracking-widest text-indigo-700 uppercase">
            Laporan Analisis Data Kualitatif &bull; NVivo 14 Matrix & Semantic Query
          </div>
          <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">
            Laporan Penelitian Kualitatif BUMDes Ketapanrame
          </h1>
          <p class="text-xs text-slate-600">
            Kros-Tabulasi Karakteristik 5 Informan, Matriks 29 Nodes Tematik, dan Analisis Frekuensi Kata
          </p>
        </div>
        <div class="text-right text-xs text-slate-500">
          <span class="inline-block px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded font-bold text-[10px]">
            DOKUMEN RESMI
          </span>
          <p class="mt-1 text-[10px] font-mono">
            Format: A4 Report (html2pdf)
          </p>
        </div>
      </div>

      <!-- Ringkasan Eksekutif -->
      <div class="grid grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
        <div class="p-2 border-r border-slate-200">
          <div class="text-lg font-bold text-indigo-700">5</div>
          <div class="text-[10px] font-semibold text-slate-600 uppercase">Subjek Informan</div>
        </div>
        <div class="p-2 border-r border-slate-200">
          <div class="text-lg font-bold text-purple-700">10</div>
          <div class="text-[10px] font-semibold text-slate-600 uppercase">Atribut Demografi</div>
        </div>
        <div class="p-2 border-r border-slate-200">
          <div class="text-lg font-bold text-blue-700">16</div>
          <div class="text-[10px] font-semibold text-slate-600 uppercase">Tema Kualitatif</div>
        </div>
        <div class="p-2">
          <div class="text-lg font-bold text-emerald-700">89</div>
          <div class="text-[10px] font-semibold text-slate-600 uppercase">Total Relasi (Edges)</div>
        </div>
      </div>

      <!-- Struktur 3 Ring Peta Konsentris -->
      <div class="space-y-2 pt-2">
        <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <i class="fa-solid fa-circle-nodes text-indigo-600"></i>
          1. Struktur Peta Relasi Konsentris (Concentric Ring Layout)
        </h2>
        <div class="grid grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-lg">
            <div class="font-bold text-indigo-900 flex items-center gap-1">
              <i class="fa-solid fa-user-circle text-indigo-600"></i>
              Pusat (Ring 1): 5 Informan
            </div>
            <p class="text-[10px] text-slate-600 mt-1">Bentuk Ellipse putih dengan border indigo tebal. Node pusat subjek.</p>
          </div>
          <div class="p-2.5 bg-purple-50/70 border border-purple-200 rounded-lg">
            <div class="font-bold text-purple-900 flex items-center gap-1">
              <i class="fa-solid fa-id-badge text-purple-600"></i>
              Tengah (Ring 2): 10 Atribut
            </div>
            <p class="text-[10px] text-slate-600 mt-1">Bentuk Diamond ungu. Menghubungkan demografi (Gender, Umur, Peran, Pendidikan).</p>
          </div>
          <div class="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg">
            <div class="font-bold text-blue-900 flex items-center gap-1">
              <i class="fa-solid fa-tag text-blue-600"></i>
              Luar (Ring 3): 16 Tema
            </div>
            <p class="text-[10px] text-slate-600 mt-1">Bentuk Rounded-Rectangle biru. Terdiri dari 16 kode kualitatif operasional BUMDes.</p>
          </div>
        </div>
      </div>

      <!-- Temuan Konsensus Mutlak -->
      <div class="space-y-2 pt-2">
        <h2 class="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <i class="fa-solid fa-check-double text-emerald-600"></i>
          2. Temuan Konsensus Mutlak (5 dari 5 Informan - 100% Kasus)
        </h2>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2 bg-emerald-50/60 border border-emerald-200 rounded-lg">
            <div class="font-bold text-emerald-950 text-[11px]">BUMDes &bullet; Pengembangan Produk & Paket Wisata</div>
            <div class="text-[10px] text-slate-600 mt-0.5">Divalidasi oleh seluruh 5 informan (100% kasus).</div>
          </div>
          <div class="p-2 bg-emerald-50/60 border border-emerald-200 rounded-lg">
            <div class="font-bold text-emerald-950 text-[11px]">BUMDes &bullet; Pendapatan & Kontribusi PADes</div>
            <div class="text-[10px] text-slate-600 mt-0.5">Kontribusi dividen PADes menjadi indikator utama keberhasilan.</div>
          </div>
          <div class="p-2 bg-emerald-50/60 border border-emerald-200 rounded-lg">
            <div class="font-bold text-emerald-950 text-[11px]">Digital Media &bullet; Promosi Media Sosial & Website</div>
            <div class="text-[10px] text-slate-600 mt-0.5">Kanal Instagram, TikTok & Web resmi desa sebagai corong informasi.</div>
          </div>
          <div class="p-2 bg-emerald-50/60 border border-emerald-200 rounded-lg">
            <div class="font-bold text-emerald-950 text-[11px]">Wisata &bullet; Pengelolaan Atraksi & Unit Usaha</div>
            <div class="text-[10px] text-slate-600 mt-0.5">Unit Taman Ghanjaran, Sumber Gempong, dan Pujasera.</div>
          </div>
        </div>
      </div>

      <!-- Footer Otorisasi Laporan -->
      <div class="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div>
          <p class="font-bold text-slate-800">Tim Riset & Analisis Kualitatif</p>
          <p className="text-[11px] text-slate-500 mt-0.5">NVivo Crosstab Data Extraction Engine</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-900 underline">Dokumen Sah Penelitian BUMDes</p>
          <p class="text-[10px] text-slate-400 font-mono">ID: NV-CROSSTAB-BUMDES-2024</p>
        </div>
      </div>
    </div>

  </main>

  <!-- 4. Footer -->
  <footer class="h-12 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-xs text-slate-400 font-medium">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>NVivo Qualitative Research Insight System &bull; Kasus Informan 1-5</span>
    </div>
    <div class="font-mono text-[11px] text-slate-400">Qual-Insight Standalone Engine v3.0 (2024 UI)</div>
  </footer>

  <!-- EMBEDDED DATASET SCRIPT -->
  <script>
    const DATASET = ${jsonDatasetStr};
    let cy = null;
    let pulseInterval = null;
    let activePulsingBtn = null;

    // 1. Initialize Cytoscape Network Graph
    function initCytoscape() {
      const elements = [];
      const validNodeIds = new Set();

      // Informants (Layer 1: Pusat / Center - Level 3)
      DATASET.informants.forEach(inf => {
        validNodeIds.add(inf.id);
        elements.push({
          group: 'nodes',
          data: {
            id: inf.id,
            label: inf.name + '\\n[' + inf.code + ']',
            subLabel: inf.role,
            nodeType: 'informant',
            level: 3, // Layer 1 (Pusat)
            gender: inf.gender,
            ageGroup: inf.ageGroup,
            role: inf.role,
            education: inf.education,
            totalCoded: inf.totalCodedThemes,
            bgColor: '#ffffff',
            borderColor: '#4f46e5',
            borderWidth: 3.5,
            color: '#1e1b4b',
            shape: 'ellipse',
            size: 50,
            fontSize: 10
          }
        });
      });

      // Attributes (Layer 2: Lingkaran Tengah / Middle Ring - Level 2)
      const attrCats = [
        { cat: 'gender', label: 'Gender', values: DATASET.attributes_summary.gender },
        { cat: 'umur', label: 'Umur', values: DATASET.attributes_summary.umur },
        { cat: 'peran', label: 'Peran', values: DATASET.attributes_summary.peran },
        { cat: 'pendidikan', label: 'Pendidikan', values: DATASET.attributes_summary.pendidikan }
      ];

      attrCats.forEach(c => {
        c.values.forEach(val => {
          const attrId = 'attr_' + c.cat + '_' + val.toLowerCase().replace(/[^a-z0-9]/g, '_');
          validNodeIds.add(attrId);
          elements.push({
            group: 'nodes',
            data: {
              id: attrId,
              label: c.label + ':\\n' + val,
              subLabel: c.label,
              nodeType: 'attribute',
              level: 2, // Layer 2 (Tengah)
              category: c.label,
              value: val,
              bgColor: '#f3e8ff',
              borderColor: '#7e22ce',
              borderWidth: 2.5,
              color: '#581c87',
              shape: 'diamond',
              size: 40,
              fontSize: 9
            }
          });
        });
      });

      // Themes / Codes (Layer 3: Lingkaran Luar / Outer Ring - Level 1)
      DATASET.qualitative_nodes.forEach(node => {
        const isParent = node.category === 'parent_concept';
        validNodeIds.add(node.id);
        elements.push({
          group: 'nodes',
          data: {
            id: node.id,
            label: node.label,
            subLabel: isParent ? 'Induk Konsep' : node.caseCount + ' Kasus',
            nodeType: isParent ? 'parent_concept' : 'theme',
            level: 1, // Layer 3 (Luar)
            category: node.category,
            caseCount: node.caseCount,
            description: node.description,
            bgColor: isParent ? '#f8fafc' : '#eff6ff',
            borderColor: isParent ? '#94a3b8' : '#2563eb',
            borderWidth: isParent ? 1.5 : 2.5,
            color: isParent ? '#64748b' : '#1e3a8a',
            shape: 'round-rectangle',
            size: isParent ? 30 : Math.max(36, Math.min(52, 32 + node.caseCount * 4)),
            fontSize: isParent ? 8 : 9
          }
        });
      });

      // Edges (Light blue transparent #add8e6, bezier curves, no arrows)
      DATASET.edges.forEach((edge, index) => {
        if (validNodeIds.has(edge.source) && validNodeIds.has(edge.target)) {
          elements.push({
            group: 'edges',
            data: {
              id: 'edge_' + index + '_' + edge.source + '_' + edge.target,
              source: edge.source,
              target: edge.target,
              edgeType: edge.type,
              label: edge.label,
              weight: edge.weight,
              lineColor: '#add8e6',
              lineStyle: edge.type === 'Value' ? 'dashed' : 'solid',
              width: edge.type === 'Value' ? 1.5 : 2
            }
          });
        }
      });

      cy = cytoscape({
        container: document.getElementById('cy-container'),
        elements: elements,
        boxSelectionEnabled: false,
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'font-family': "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
              'font-size': 'data(fontSize)',
              'font-weight': 600,
              'text-wrap': 'wrap',
              'text-max-width': '96px',
              'text-valign': 'bottom',
              'text-margin-y': 6,
              'background-color': 'data(bgColor)',
              'shape': 'data(shape)',
              'width': 'data(size)',
              'height': 'data(size)',
              'color': 'data(color)',
              'text-outline-color': '#ffffff',
              'text-outline-width': 2.5,
              'border-width': 'data(borderWidth)',
              'border-color': 'data(borderColor)',
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 'data(width)',
              'line-color': '#add8e6',
              'line-style': 'data(lineStyle)',
              'curve-style': 'bezier',
              'opacity': 0.7,
              'target-arrow-shape': 'none',
              'source-arrow-shape': 'none'
            }
          },
          {
            selector: '.faded',
            style: {
              'opacity': 0.12
            }
          },
          {
            selector: 'node.highlighted',
            style: {
              'opacity': 1,
              'border-width': 4.5,
              'border-color': '#f59e0b',
              'color': '#0f172a',
              'font-weight': 800,
              'z-index': 999,
              'text-outline-color': '#fef3c7',
              'text-outline-width': 3
            }
          },
          {
            selector: 'edge.highlighted',
            style: {
              'opacity': 1,
              'width': 3.5,
              'line-color': '#4f46e5',
              'z-index': 998
            }
          },
          {
            selector: 'node.pulsing',
            style: {
              'border-width': 5,
              'border-color': '#ec4899',
              'background-color': '#fdf2f8',
              'opacity': 1,
              'z-index': 1000
            }
          },
          {
            selector: 'edge.hovered',
            style: {
              'width': 4,
              'line-color': '#2563eb',
              'opacity': 1,
              'z-index': 997
            }
          }
        ],
        layout: {
          name: 'concentric',
          animate: false,
          concentric: function(node) { return node.data('level') || 1; },
          levelWidth: function() { return 1; },
          padding: 50,
          minNodeSpacing: 80,
          spacingFactor: 1.25,
          avoidOverlap: true,
          equidistant: false,
          startAngle: (3 / 2) * Math.PI
        }
      });

      // Events
      cy.on('tap', 'node', function(evt) {
        const node = evt.target;
        const nodeData = node.data();

        const connectedEdges = node.connectedEdges();
        const connectedNodes = connectedEdges.connectedNodes();

        cy.elements().removeClass('highlighted').addClass('faded');
        node.removeClass('faded').addClass('highlighted');
        connectedNodes.removeClass('faded').addClass('highlighted');
        connectedEdges.removeClass('faded').addClass('highlighted');

        renderProfileCard(nodeData);
        if (nodeData.nodeType === 'informant') {
          openProfileDrawer();
        }
      });

      cy.on('tap', function(evt) {
        if (evt.target === cy) {
          resetGraphHighlight();
        }
      });

      // Edge hover
      cy.on('mouseover', 'edge', function(evt) {
        const edge = evt.target;
        edge.addClass('hovered');
        const d = edge.data();
        document.getElementById('hover-edge-tooltip').innerHTML = '<span class="text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">Relasi [' + d.edgeType + ']: ' + (d.label || 'Koneksi Relasional') + '</span>';
      });

      cy.on('mouseout', 'edge', function(evt) {
        evt.target.removeClass('hovered');
        document.getElementById('hover-edge-tooltip').innerHTML = '<span class="italic text-slate-400">Arahkan kursor ke garis hubungan untuk melihat detail frekuensi</span>';
      });

      // Responsive resize on window resize / orientation change
      window.addEventListener('resize', function() {
        if (cy) {
          cy.resize();
        }
      });
    }

    // 2. Render Sidebar Profile Card
    function renderProfileCard(nodeData) {
      const container = document.getElementById('profile-card-container');
      if (!nodeData) {
        renderDefaultProfileCard();
        return;
      }

      if (nodeData.nodeType === 'informant') {
        const inf = DATASET.informants.find(i => i.id === nodeData.id) || nodeData;
        const connectedEdges = DATASET.edges.filter(e => e.source === inf.id && e.type === 'Codes');
        const themeIds = connectedEdges.map(e => e.target);
        const themes = DATASET.qualitative_nodes.filter(n => themeIds.includes(n.id));

        container.innerHTML = \`
          <div class="space-y-4 overflow-y-auto pr-1">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <i class="fa-solid fa-id-card text-sm"></i>
                <span>Profile Card Informan</span>
              </div>
              <button onclick="renderDefaultProfileCard()" class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <!-- Profile Hero -->
            <div class="bg-gradient-to-br from-indigo-50 via-purple-50/50 to-slate-50 p-4 rounded-2xl border border-indigo-100/80 flex items-center gap-3.5 shadow-2xs">
              <div class="w-13 h-13 rounded-2xl flex items-center justify-center text-xl text-white shadow-md shrink-0 ring-4 ring-white" style="background-color: \${inf.avatarColor || '#4f46e5'}">
                <i class="fa-solid fa-user-tie"></i>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md shadow-2xs">\${inf.code || 'INF'}</span>
                  <span class="text-[11px] font-semibold text-slate-500">\${inf.gender}</span>
                </div>
                <h3 class="font-bold text-base text-slate-900 leading-snug truncate mt-0.5">\${inf.name}</h3>
                <p class="text-xs text-indigo-700 font-medium truncate">\${inf.role}</p>
              </div>
            </div>

            <!-- 4 Demographics Attribute Badges -->
            <div class="grid grid-cols-2 gap-2">
              <div class="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid fa-venus-mars"></i>
                </div>
                <div class="min-w-0">
                  <span class="text-[10px] font-medium text-slate-400 block">Gender</span>
                  <span class="font-semibold text-xs text-slate-800 truncate block">\${inf.gender}</span>
                </div>
              </div>

              <div class="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid fa-calendar-days"></i>
                </div>
                <div class="min-w-0">
                  <span class="text-[10px] font-medium text-slate-400 block">Umur</span>
                  <span class="font-semibold text-xs text-slate-800 truncate block">\${inf.ageGroup} th</span>
                </div>
              </div>

              <div class="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid fa-briefcase"></i>
                </div>
                <div class="min-w-0">
                  <span class="text-[10px] font-medium text-slate-400 block">Peran</span>
                  <span class="font-semibold text-xs text-slate-800 truncate block" title="\${inf.role}">\${inf.role}</span>
                </div>
              </div>

              <div class="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div class="min-w-0">
                  <span class="text-[10px] font-medium text-slate-400 block">Pendidikan</span>
                  <span class="font-semibold text-xs text-slate-800 truncate block">\${inf.education}</span>
                </div>
              </div>
            </div>

            <!-- Connected Themes -->
            <div class="space-y-2 pt-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <i class="fa-solid fa-tags text-blue-600"></i>
                  Tema Terkoding Aktif
                </span>
                <span class="text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                  \${themes.length} / 16 Tema
                </span>
              </div>

              <div class="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                \${themes.map(t => \`
                  <div class="p-2.5 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200/70 transition flex items-start gap-2 text-xs">
                    <span class="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">
                      <i class="fa-solid fa-check"></i>
                    </span>
                    <div class="min-w-0 flex-1">
                      <div class="font-semibold text-slate-800 text-xs">\${t.label}</div>
                      \${t.description ? \`<div class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">\${t.description}</div>\` : ''}
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-[11px] text-slate-500">Saturasi: <strong>\${((themes.length / 16) * 100).toFixed(0)}%</strong></span>
            <button onclick="selectInformantById('\${inf.id}')" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition">
              <span>Fokus di Peta</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        \`;
      }
    }

    function renderDefaultProfileCard() {
      const container = document.getElementById('profile-card-container');
      container.innerHTML = \`
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm shadow-2xs">
                <i class="fa-solid fa-id-card"></i>
              </span>
              <div>
                <h3 class="font-bold text-sm text-slate-900">Sidebar Profil Informan</h3>
                <p class="text-[11px] text-slate-500">Pilih node pada peta hubungan</p>
              </div>
            </div>
            <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">Interactive</span>
          </div>

          <div class="py-8 text-center px-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 text-indigo-500 border border-indigo-100 mx-auto flex items-center justify-center text-2xl mb-4 shadow-2xs">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <h4 class="font-semibold text-slate-800 text-sm mb-1">Belum Ada Node Terpilih</h4>
            <p class="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-6">
              Klik pada salah satu <strong>Node Informan</strong> (lingkaran putih border indigo) pada peta untuk membuka Profile Card lengkap.
            </p>

            <div class="text-left space-y-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pilih Cepat Informan:</span>
              <div class="grid grid-cols-1 gap-1.5" id="quick-informant-list">
                \${DATASET.informants.map(inf => \`
                  <button onclick="selectInformantById('\${inf.id}')" class="w-full p-2.5 rounded-xl border border-slate-200/70 hover:border-indigo-300 bg-slate-50/60 hover:bg-indigo-50/50 flex items-center justify-between transition group text-left">
                    <div class="flex items-center gap-2.5">
                      <div class="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-2xs shrink-0" style="background-color: \${inf.avatarColor || '#4f46e5'}">
                        <i class="fa-solid fa-user-tie text-[10px]"></i>
                      </div>
                      <div class="min-w-0">
                        <div class="font-semibold text-xs text-slate-800 group-hover:text-indigo-700 truncate">\${inf.name}</div>
                        <div class="text-[10px] text-slate-500 truncate">\${inf.role}</div>
                      </div>
                    </div>
                    <span class="text-[10px] font-semibold text-indigo-600 bg-white px-2 py-0.5 rounded-md border border-indigo-100 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition">
                      \${inf.totalCodedThemes} Tema
                    </span>
                  </button>
                \`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span><i class="fa-solid fa-circle-info text-indigo-500 mr-1"></i> Data tervalidasi NVivo</span>
          <span>5 Kasus</span>
        </div>
      \`;
    }

    function selectInformantById(id) {
      if (!cy) return;
      const target = cy.getElementById(id);
      if (target && target.length > 0) {
        const connectedEdges = target.connectedEdges();
        const connectedNodes = connectedEdges.connectedNodes();

        cy.elements().removeClass('highlighted').addClass('faded');
        target.removeClass('faded').addClass('highlighted');
        connectedNodes.removeClass('faded').addClass('highlighted');
        connectedEdges.removeClass('faded').addClass('highlighted');

        cy.animate({ center: { eles: target }, duration: 400 });
        renderProfileCard(target.data());
        openProfileDrawer();
      }
    }

    // Profile Drawer Controls
    function openProfileDrawer() {
      const backdrop = document.getElementById('profile-drawer-backdrop');
      const modal = document.getElementById('profile-drawer-modal');
      if (backdrop) backdrop.classList.remove('hidden');
      if (modal) {
        modal.classList.remove('translate-x-full');
        modal.classList.add('translate-x-0');
      }
    }

    function closeProfileDrawer() {
      const backdrop = document.getElementById('profile-drawer-backdrop');
      const modal = document.getElementById('profile-drawer-modal');
      if (backdrop) backdrop.classList.add('hidden');
      if (modal) {
        modal.classList.remove('translate-x-0');
        modal.classList.add('translate-x-full');
      }
    }

    function toggleProfileDrawer() {
      const modal = document.getElementById('profile-drawer-modal');
      if (modal && modal.classList.contains('translate-x-0')) {
        closeProfileDrawer();
      } else {
        openProfileDrawer();
      }
    }

    // 3. Search Bar Handler
    function handleGraphSearch(query) {
      if (!cy) return;
      if (!query.trim()) {
        cy.elements().removeClass('highlighted').removeClass('faded');
        return;
      }
      const q = query.toLowerCase().trim();
      const matchedNodes = cy.nodes().filter(node => {
        const label = (node.data('label') || '').toLowerCase();
        const subLabel = (node.data('subLabel') || '').toLowerCase();
        return label.includes(q) || subLabel.includes(q);
      });

      if (matchedNodes.length > 0) {
        cy.elements().addClass('faded').removeClass('highlighted');
        matchedNodes.removeClass('faded').addClass('highlighted');
        matchedNodes.connectedEdges().removeClass('faded').addClass('highlighted');
        matchedNodes.connectedEdges().connectedNodes().removeClass('faded');
        cy.animate({ center: { eles: matchedNodes }, duration: 400 });
      }
    }

    // 4. Interactive Legend Pulsing Effect
    function triggerPulsingLegend(type, value, btnElement) {
      if (!cy) return;

      if (activePulsingBtn === btnElement) {
        // Toggle off
        clearInterval(pulseInterval);
        pulseInterval = null;
        cy.nodes().removeClass('pulsing').removeClass('faded');
        btnElement.classList.remove('ring-2', 'ring-indigo-600', 'bg-indigo-50');
        activePulsingBtn = null;
        return;
      }

      if (activePulsingBtn) {
        activePulsingBtn.classList.remove('ring-2', 'ring-indigo-600', 'bg-indigo-50');
      }

      activePulsingBtn = btnElement;
      btnElement.classList.add('ring-2', 'ring-indigo-600', 'bg-indigo-50');

      let targets;
      if (type === 'education') {
        targets = cy.nodes().filter(n => n.data('education') === value);
      } else if (type === 'gender') {
        targets = cy.nodes().filter(n => n.data('gender') === value);
      }

      clearInterval(pulseInterval);
      cy.nodes().removeClass('pulsing');

      let isP = true;
      targets.addClass('pulsing');
      pulseInterval = setInterval(() => {
        if (isP) {
          targets.removeClass('pulsing');
        } else {
          targets.addClass('pulsing');
        }
        isP = !isP;
      }, 600);

      if (targets.length > 0) {
        cy.animate({ center: { eles: targets }, duration: 500 });
      }
    }

    // 5. Controls
    function setGraphEdgeFilter(type) {
      if (!cy) return;
      document.getElementById('btn-edge-all').className = type === 'ALL' ? 'px-2.5 py-1 rounded-lg font-semibold bg-indigo-600 text-white shadow-2xs' : 'px-2.5 py-1 rounded-lg font-semibold text-slate-600 hover:text-slate-900';
      document.getElementById('btn-edge-codes').className = type === 'Codes' ? 'px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-2xs' : 'px-2.5 py-1 rounded-lg font-semibold text-blue-700 hover:bg-blue-50';
      document.getElementById('btn-edge-value').className = type === 'Value' ? 'px-2.5 py-1 rounded-lg font-semibold bg-purple-600 text-white shadow-2xs' : 'px-2.5 py-1 rounded-lg font-semibold text-purple-700 hover:bg-purple-50';

      cy.edges().forEach(e => {
        if (type === 'ALL' || e.data('edgeType') === type) {
          e.show();
        } else {
          e.hide();
        }
      });
    }

    function cyZoom(f) {
      if (!cy) return;
      cy.zoom(cy.zoom() * f);
      cy.center();
    }

    function cyFit() {
      if (!cy) return;
      cy.fit(undefined, 35);
    }

    function resetGraphHighlight() {
      if (!cy) return;
      if (pulseInterval) {
        clearInterval(pulseInterval);
        pulseInterval = null;
      }
      if (activePulsingBtn) {
        activePulsingBtn.classList.remove('ring-2', 'ring-indigo-600', 'bg-indigo-50');
        activePulsingBtn = null;
      }
      document.getElementById('graph-search-input').value = '';
      cy.elements().removeClass('highlighted').removeClass('faded').removeClass('pulsing');
      renderDefaultProfileCard();
    }

    let isGraphFullscreen = false;
    function toggleGraphFullscreen() {
      const card = document.getElementById('network-graph-card');
      const container = document.getElementById('cy-container');
      const btn = document.getElementById('btn-fullscreen-graph');
      isGraphFullscreen = !isGraphFullscreen;

      if (isGraphFullscreen) {
        card.classList.remove('lg:col-span-8');
        card.classList.add('fixed', 'inset-0', 'z-50', 'w-screen', 'h-screen', 'rounded-none', 'border-0', 'shadow-2xl');
        container.style.height = 'calc(100vh - 120px)';
        if (btn) btn.innerHTML = '<i class="fa-solid fa-down-left-and-up-right-to-center text-xs"></i> <span>Tutup Full Screen</span>';
      } else {
        card.classList.remove('fixed', 'inset-0', 'z-50', 'w-screen', 'h-screen', 'rounded-none', 'border-0', 'shadow-2xl');
        card.classList.add('lg:col-span-8');
        container.style.height = '560px';
        if (btn) btn.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center text-xs"></i> <span>Full Screen</span>';
      }

      setTimeout(() => {
        if (cy) {
          cy.resize();
          cy.fit(undefined, 40);
        }
      }, 150);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isGraphFullscreen) {
        toggleGraphFullscreen();
      }
    });

    // 6. Global Filters
    function applyGlobalFilters() {
      const peran = document.getElementById('filter-peran').value;
      const edu = document.getElementById('filter-pendidikan').value;
      const gender = document.getElementById('filter-gender').value;
      const umur = document.getElementById('filter-umur').value;

      let matchCount = 0;
      DATASET.informants.forEach(inf => {
        let match = true;
        if (peran !== 'ALL' && inf.role !== peran) match = false;
        if (edu !== 'ALL' && inf.education !== edu) match = false;
        if (gender !== 'ALL' && inf.gender !== gender) match = false;
        if (umur !== 'ALL' && inf.ageGroup !== umur) match = false;

        const node = cy.getElementById(inf.id);
        if (node && node.length > 0) {
          if (match) {
            node.removeClass('faded');
            matchCount++;
          } else {
            node.addClass('faded');
          }
        }
      });

      document.getElementById('active-informant-badge').innerText = matchCount + ' / 5 Kasus Aktif';
    }

    function resetGlobalFilters() {
      document.getElementById('filter-peran').value = 'ALL';
      document.getElementById('filter-pendidikan').value = 'ALL';
      document.getElementById('filter-gender').value = 'ALL';
      document.getElementById('filter-umur').value = 'ALL';
      applyGlobalFilters();
      resetGraphHighlight();
    }

    // 7. Stacked Bar Chart (Chart.js)
    function initStackedChart() {
      const ctx = document.getElementById('stackedBarChart').getContext('2d');
      const themes = DATASET.qualitative_nodes.filter(n => n.category !== 'parent_concept').slice(0, 8);
      
      const labels = themes.map(t => t.label.length > 20 ? t.label.substring(0, 18) + '...' : t.label);

      const datasets = DATASET.informants.map((inf, i) => {
        const colors = ['#4f46e5', '#0284c7', '#059669', '#d97706', '#dc2626'];
        const data = themes.map(t => {
          const hasCode = DATASET.edges.some(e => e.source === inf.id && e.target === t.id && e.type === 'Codes');
          return hasCode ? 1 : 0;
        });
        return {
          label: inf.name + ' (' + inf.code + ')',
          data: data,
          backgroundColor: colors[i % colors.length],
          borderRadius: 4
        };
      });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                font: { size: 10, family: 'Plus Jakarta Sans' }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              ticks: { font: { size: 10, family: 'Plus Jakarta Sans' } }
            },
            y: {
              stacked: true,
              max: 5,
              ticks: { stepSize: 1, font: { size: 10, family: 'Plus Jakarta Sans' } }
            }
          }
        }
      });
    }

    // 8. Word Cloud (WordCloud2 & D3 fallback)
    function initWordCloud() {
      const container = document.getElementById('word-cloud-container');
      if (!container) return;
      const width = container.clientWidth || 450;
      const height = container.clientHeight || 250;

      const words = DATASET.word_frequency_top.slice(0, 35).map(d => ({
        text: d.word,
        size: Math.max(12, Math.min(36, 10 + d.count * 0.8))
      }));

      // Check WordCloud2.js first
      if (typeof WordCloud !== 'undefined') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        container.innerHTML = '';
        container.appendChild(canvas);

        const list = DATASET.word_frequency_top.slice(0, 40).map(d => [d.word, Math.max(12, Math.min(38, 10 + d.count * 0.9))]);
        WordCloud(canvas, {
          list: list,
          gridSize: 8,
          weightFactor: 1,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          color: function() {
            const colors = ['#4f46e5', '#2563eb', '#7c3aed', '#059669', '#d97706', '#0284c7'];
            return colors[Math.floor(Math.random() * colors.length)];
          },
          backgroundColor: 'transparent',
          rotateRatio: 0.2
        });
      } else if (typeof d3 !== 'undefined' && d3.layout && d3.layout.cloud) {
        d3.layout.cloud()
          .size([width, height])
          .words(words)
          .padding(4)
          .rotate(() => (Math.random() > 0.8 ? 90 : 0))
          .fontSize(d => d.size)
          .on('end', drawWordCloud)
          .start();

        function drawWordCloud(renderedWords) {
          d3.select('#word-cloud-container').html('');
          const colorScale = d3.scaleOrdinal(['#4f46e5', '#2563eb', '#7c3aed', '#059669', '#d97706']);

          const svg = d3.select('#word-cloud-container').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

          svg.selectAll('text')
            .data(renderedWords)
            .enter().append('text')
            .style('font-size', d => d.size + 'px')
            .style('font-family', 'Plus Jakarta Sans, sans-serif')
            .style('font-weight', '600')
            .style('fill', (d, i) => colorScale(i))
            .attr('text-anchor', 'middle')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .text(d => d.text);
        }
      }
    }

    // 9. Export to PDF via html2pdf.js
    async function exportToPDF() {
      const element = document.getElementById('printable-report-container') || document.body;
      const btn = document.getElementById('btn-export-pdf-standalone');
      const originalText = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> <span>Membuat PDF...</span>';
        btn.disabled = true;
      }

      const opt = {
        margin: [10, 10, 10, 10], // 10mm margin
        filename: 'Laporan_Penelitian_BUMDes.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      try {
        if (typeof html2pdf !== 'undefined') {
          await html2pdf().set(opt).from(element).save();
        } else {
          window.print();
        }
      } catch (err) {
        console.error('Error generating PDF report:', err);
        window.print();
      } finally {
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      }
    }

    // Boot
    window.addEventListener('DOMContentLoaded', () => {
      initCytoscape();
      renderDefaultProfileCard();
      initStackedChart();
      initWordCloud();
    });
  </script>
</body>
</html>`;
}
