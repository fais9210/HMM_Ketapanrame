import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, EventObject } from 'cytoscape';
import { ProjectMapNode, ProjectMapEdge, ProjectMapNodeType } from '../types';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RefreshCw,
  Search,
  Route,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Filter,
  Printer,
} from 'lucide-react';
import { PublicationExportModal } from './PublicationExportModal';

interface IntegrativeRelationMapProps {
  nodes: ProjectMapNode[];
  edges: ProjectMapEdge[];
  onSelectNode?: (node: ProjectMapNode | null) => void;
  selectedNodeId?: string | null;
}

export const IntegrativeRelationMap: React.FC<IntegrativeRelationMapProps> = ({
  nodes,
  edges,
  onSelectNode,
  selectedNodeId: propSelectedNodeId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const [selectedNode, setSelectedNode] = useState<ProjectMapNode | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<{
    sources: string[];
    selected: string;
    targets: string[];
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | ProjectMapNodeType>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Initialize and Render Cytoscape Graph with precise preset positions
  useEffect(() => {
    if (!containerRef.current) return;

    // Build Cytoscape elements
    const cyNodes = nodes.map((n) => ({
      data: {
        id: n.id,
        label: n.label,
        nodeType: n.type,
        subType: n.subType || '',
        color: n.color,
        description: n.description || '',
      },
      position: {
        x: n.posX || 400,
        y: n.posY || 300,
      },
      classes: `node-${n.type}`,
    }));

    const cyEdges = edges.map((e) => ({
      data: {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label || '',
        style: e.style || 'solid',
        color: e.color || '#1e293b',
        bidirectional: e.bidirectional || false,
      },
      classes: `${e.style === 'dashed' ? 'dashed-edge' : ''} ${
        e.color === '#dc2626' ? 'red-edge' : ''
      }`,
    }));

    // Cytoscape initialization
    const cy = cytoscape({
      container: containerRef.current,
      elements: [...cyNodes, ...cyEdges],
      layout: {
        name: 'preset',
      },
      style: [
        // Default Node Style
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'text-wrap': 'wrap',
            'text-max-width': '85px',
            'font-family': 'Inter, system-ui, sans-serif',
            'font-size': '9.5px',
            'font-weight': 600,
            color: '#0f172a',
            'background-color': '#ffffff',
            'border-width': '2px',
            'border-color': '#64748b',
            width: 68,
            height: 68,
            'text-outline-color': '#ffffff',
            'text-outline-width': '1.5px',
            'transition-property': 'background-color, border-color, border-width, opacity, width, height',
            'transition-duration': 0.25,
          },
        },
        // 1. Aktor Komunitas (Lingkaran Hijau)
        {
          selector: 'node[nodeType = "actor"]',
          style: {
            shape: 'ellipse',
            'background-color': '#dcfce7',
            'border-color': '#22c55e',
            'border-width': '2.5px',
            color: '#14532d',
            width: 72,
            height: 72,
            'font-size': '10px',
          },
        },
        // 2. Atribut Demografis (Lingkaran Hijau Vertikal Kanan)
        {
          selector: 'node[nodeType = "attribute"]',
          style: {
            shape: 'ellipse',
            'background-color': '#f0fdf4',
            'border-color': '#86efac',
            'border-width': '2px',
            color: '#166534',
            width: 58,
            height: 58,
            'font-size': '9px',
          },
        },
        // 3. Tema Utama (Lingkaran Biru)
        {
          selector: 'node[nodeType = "main_theme"]',
          style: {
            shape: 'ellipse',
            'background-color': '#dbeafe',
            'border-color': '#3b82f6',
            'border-width': '3px',
            color: '#1e3a8a',
            width: 86,
            height: 86,
            'font-size': '10.5px',
            'font-weight': 700,
          },
        },
        // 4. Tema Pendukung (Lingkaran Oranye)
        {
          selector: 'node[nodeType = "supporting_theme"]',
          style: {
            shape: 'ellipse',
            'background-color': '#ffedd5',
            'border-color': '#f97316',
            'border-width': '2.5px',
            color: '#7c2d12',
            width: 76,
            height: 76,
            'font-size': '9.5px',
            'font-weight': 700,
          },
        },
        // 5. Hasil / Dampak (Rounded Rectangle Ungu - Paling Bawah)
        {
          selector: 'node[nodeType = "outcome"]',
          style: {
            shape: 'round-rectangle',
            'corner-radius': '14px',
            'background-color': '#f3e8ff',
            'border-color': '#a855f7',
            'border-width': '2.5px',
            color: '#581c87',
            width: 145,
            height: 52,
            'font-size': '10px',
            'font-weight': 700,
            'text-max-width': '130px',
          },
        },
        // Default Edge Style (Panah Hitam Tajam Berarah)
        {
          selector: 'edge',
          style: {
            width: 1.5,
            'line-color': '#334155',
            'target-arrow-color': '#334155',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.1,
            'curve-style': 'bezier',
            opacity: 0.8,
            'transition-property': 'line-color, target-arrow-color, width, opacity',
            'transition-duration': 0.25,
          },
        },
        // Dashed / Red Edges
        {
          selector: 'edge.dashed-edge',
          style: {
            'line-style': 'dashed',
            'line-dash-pattern': [6, 4],
            'line-color': '#dc2626',
            'target-arrow-color': '#dc2626',
            width: 2,
            'source-arrow-shape': 'triangle',
            'source-arrow-color': '#dc2626',
          },
        },
        {
          selector: 'edge.red-edge',
          style: {
            'line-color': '#dc2626',
            'target-arrow-color': '#dc2626',
            width: 2,
          },
        },
        // Highlight & Selection Styles
        {
          selector: 'node:selected, node.highlighted-target',
          style: {
            'border-color': '#4f46e5',
            'border-width': '4px',
            'overlay-color': '#4f46e5',
            'overlay-opacity': 0.15,
            opacity: 1,
          },
        },
        {
          selector: 'node.highlighted-source',
          style: {
            'border-color': '#16a34a',
            'border-width': '3.5px',
            'overlay-color': '#16a34a',
            'overlay-opacity': 0.15,
            opacity: 1,
          },
        },
        {
          selector: 'node.highlighted-downstream',
          style: {
            'border-color': '#9333ea',
            'border-width': '3.5px',
            'overlay-color': '#9333ea',
            'overlay-opacity': 0.15,
            opacity: 1,
          },
        },
        {
          selector: 'edge.highlighted-edge',
          style: {
            width: 3.5,
            'line-color': '#4f46e5',
            'target-arrow-color': '#4f46e5',
            opacity: 1,
            'z-index': 99,
          },
        },
        {
          selector: 'edge.highlighted-upstream-edge',
          style: {
            width: 3,
            'line-color': '#16a34a',
            'target-arrow-color': '#16a34a',
            opacity: 1,
            'z-index': 98,
          },
        },
        {
          selector: 'edge.highlighted-downstream-edge',
          style: {
            width: 3,
            'line-color': '#9333ea',
            'target-arrow-color': '#9333ea',
            opacity: 1,
            'z-index': 98,
          },
        },
        {
          selector: 'node.dimmed',
          style: {
            opacity: 0.18,
          },
        },
        {
          selector: 'edge.dimmed',
          style: {
            opacity: 0.08,
          },
        },
      ],
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
    });

    cyRef.current = cy;

    // Click Node Event -> Compute Full Upstream and Downstream Path
    cy.on('tap', 'node', (evt: EventObject) => {
      const clickedNode = evt.target;
      const nodeId = clickedNode.id();
      const nodeData = nodes.find((n) => n.id === nodeId);

      if (nodeData) {
        setSelectedNode(nodeData);
        if (onSelectNode) onSelectNode(nodeData);

        // Compute Highlight Path:
        // 1. Ingoers (upstream sources: who leads into this theme)
        const incomingEdges = clickedNode.incomers('edge');
        const sourceNodes = clickedNode.incomers('node');

        // 2. Outgoers (downstream targets: where this theme flows to)
        const outgoingEdges = clickedNode.outgoers('edge');
        const targetNodes = clickedNode.outgoers('node');

        // Reset all classes
        cy.elements().removeClass(
          'dimmed highlighted-target highlighted-source highlighted-downstream highlighted-edge highlighted-upstream-edge highlighted-downstream-edge'
        );

        // Dim everything else
        cy.elements().addClass('dimmed');

        // Highlight selected node
        clickedNode.removeClass('dimmed').addClass('highlighted-target');

        // Highlight upstream sources (Green)
        sourceNodes.removeClass('dimmed').addClass('highlighted-source');
        incomingEdges.removeClass('dimmed').addClass('highlighted-upstream-edge');

        // Highlight downstream targets (Purple)
        targetNodes.removeClass('dimmed').addClass('highlighted-downstream');
        outgoingEdges.removeClass('dimmed').addClass('highlighted-downstream-edge');

        setHighlightedPath({
          selected: nodeData.label.replace('\n', ' '),
          sources: sourceNodes.map((n) => n.data('label').replace('\n', ' ')),
          targets: targetNodes.map((n) => n.data('label').replace('\n', ' ')),
        });
      }
    });

    // Tap background -> Clear selection
    cy.on('tap', (evt: EventObject) => {
      if (evt.target === cy) {
        cy.elements().removeClass(
          'dimmed highlighted-target highlighted-source highlighted-downstream highlighted-edge highlighted-upstream-edge highlighted-downstream-edge'
        );
        setSelectedNode(null);
        setHighlightedPath(null);
        if (onSelectNode) onSelectNode(null);
      }
    });

    // Fit on load
    cy.fit(undefined, 35);

    return () => {
      cy.destroy();
    };
  }, [nodes, edges]);

  // Handle Search Filtering
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    if (!searchQuery && filterType === 'all') {
      cy.elements().removeClass('dimmed');
      return;
    }

    cy.elements().addClass('dimmed');

    const matchedNodes = cy.nodes().filter((node) => {
      const label = node.data('label').toLowerCase();
      const type = node.data('nodeType');
      const matchesSearch = searchQuery ? label.includes(searchQuery.toLowerCase()) : true;
      const matchesFilter = filterType !== 'all' ? type === filterType : true;
      return matchesSearch && matchesFilter;
    });

    matchedNodes.removeClass('dimmed');
    matchedNodes.connectedEdges().removeClass('dimmed');
  }, [searchQuery, filterType]);

  // Helper Controls
  const handleZoom = (factor: number) => {
    if (!cyRef.current) return;
    const cy = cyRef.current;
    cy.zoom({
      level: cy.zoom() * factor,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
    });
  };

  const handleFit = () => {
    if (!cyRef.current) return;
    cyRef.current.fit(undefined, 35);
  };

  const handleResetLayout = () => {
    if (!cyRef.current) return;
    cyRef.current.elements().removeClass(
      'dimmed highlighted-target highlighted-source highlighted-downstream highlighted-edge highlighted-upstream-edge highlighted-downstream-edge'
    );
    setSelectedNode(null);
    setHighlightedPath(null);
    if (onSelectNode) onSelectNode(null);
    cyRef.current.layout({ name: 'preset' }).run();
    cyRef.current.fit(undefined, 35);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-4 bg-slate-50' : ''
      }`}
    >
      {/* Top Toolbar */}
      <div className="p-3.5 sm:p-4 bg-slate-50/95 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <i className="fa-solid fa-circle-nodes"></i>
          </span>
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
              Gambar 2. Peta Relasi Aktor dan Tema (Project Map Integratif)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Struktur Relasional Ekosistem Mediasi Digital BUMDes Ketapanrame
            </p>
          </div>
        </div>

        {/* Search & Filter & Zoom Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-32 sm:w-44"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-transparent text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Tipe Node</option>
              <option value="actor">Aktor Komunitas (5)</option>
              <option value="attribute">Atribut Demografis (9)</option>
              <option value="main_theme">Tema Utama (4)</option>
              <option value="supporting_theme">Tema Pendukung (3)</option>
              <option value="outcome">Hasil / Dampak (2)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
            <button
              onClick={() => handleZoom(1.25)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(0.8)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFit}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Fit to Canvas"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetLayout}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Reset Highlight & Posisi"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer shadow-2xs font-semibold text-xs flex items-center gap-1.5"
            title="Ekspor Gambar Resolusi Tinggi 300 DPI (Jurnal/Tesis)"
          >
            <Printer className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Ekspor 300 DPI</span>
          </button>

          <button
            onClick={() => setShowLegend(!showLegend)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              showLegend
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Legenda</span>
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

      {/* Main Canvas & Overlay Panels */}
      <div ref={cardWrapperRef} className="relative flex-1 bg-slate-50/50 min-h-[580px] lg:min-h-[660px]">
        {/* Cytoscape Container */}
        <div ref={containerRef} className="w-full h-[580px] lg:h-[660px] cursor-grab active:cursor-grabbing" />

        {/* Legend Box in Canvas (Top Left Floating) */}
        {showLegend && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl p-3 shadow-md max-w-xs space-y-2 z-10 text-xs animate-in fade-in duration-200">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5 flex items-center justify-between">
              <span>Keterangan Elemen</span>
              <span className="text-slate-400">23 Nodes &bull; 26 Edges</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#dcfce7] border-2 border-[#22c55e] inline-block shrink-0"></span>
                <span><strong>Aktor Komunitas</strong> (Sisi Kiri, 5 Kasus)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#f0fdf4] border-2 border-[#86efac] inline-block shrink-0"></span>
                <span><strong>Atribut Demografis</strong> (Sisi Kanan, 9 Atribut)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#dbeafe] border-2 border-[#3b82f6] inline-block shrink-0"></span>
                <span><strong>Tema Utama</strong> (Tengah, 4 Dimensi)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#ffedd5] border-2 border-[#f97316] inline-block shrink-0"></span>
                <span><strong>Tema Pendukung</strong> (Bawah Tengah, 3 Tema)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-3 rounded-md bg-[#f3e8ff] border-2 border-[#a855f7] inline-block shrink-0"></span>
                <span><strong>Hasil / Dampak</strong> (Paling Bawah, 2 Luaran)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1.5">
              <span className="w-4 border-t-2 border-dashed border-rose-500 inline-block"></span>
              <span>Garis Putus Merah: <strong>Trust != Visibility</strong></span>
            </div>
          </div>
        )}

        {/* Highlight Path Breadcrumb Bar (Bottom Floating) */}
        {highlightedPath ? (
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs border border-indigo-200 rounded-xl p-3.5 shadow-lg z-10 text-xs animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 font-bold text-indigo-950">
                <Route className="w-4 h-4 text-indigo-600" />
                <span>Highlight Path Analisis Relasi:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold">
                  {highlightedPath.selected}
                </span>
              </div>
              <button
                onClick={handleResetLayout}
                className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-2.5 py-1 rounded-lg transition"
              >
                Reset Jalur (Clear)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] pt-2 border-t border-slate-100">
              {/* Upstream Sources */}
              <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                <span className="font-bold text-[10px] uppercase text-emerald-800 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-arrow-down-left-and-up-right-to-center text-emerald-600"></i>
                  Hulu / Sumber Asal (Upstream - {highlightedPath.sources.length}):
                </span>
                {highlightedPath.sources.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {highlightedPath.sources.map((s, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white text-emerald-900 border border-emerald-300 text-[10px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-emerald-700 italic">Merupakan Titik Inisiasi Awal</span>
                )}
              </div>

              {/* Focus Node */}
              <div className="p-2 rounded-lg bg-blue-50/80 border border-blue-200 text-blue-950 flex flex-col justify-center text-center">
                <span className="font-bold text-[10px] uppercase text-blue-800 mb-0.5">
                  Fokus Node Terpilih
                </span>
                <span className="font-bold text-xs text-blue-950">{highlightedPath.selected}</span>
              </div>

              {/* Downstream Targets */}
              <div className="p-2 rounded-lg bg-purple-50/80 border border-purple-200 text-purple-950">
                <span className="font-bold text-[10px] uppercase text-purple-800 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-arrow-up-right-from-square text-purple-600"></i>
                  Hilir / Bermuara Ke (Downstream - {highlightedPath.targets.length}):
                </span>
                {highlightedPath.targets.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {highlightedPath.targets.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white text-purple-900 border border-purple-300 text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-purple-700 italic">Merupakan Muara Akhir / Hasil</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-xl px-3 py-2 shadow-sm text-[11px] text-slate-600 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>
              <strong>Tips Interaktif:</strong> Klik salah satu node pada peta untuk mengaktifkan <em>Highlight Path</em> (melihat dari aktor mana tema berasal dan ke hasil mana tema itu bermuara).
            </span>
          </div>
        )}
      </div>

      {/* Publication High-Res Export Modal */}
      <PublicationExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Gambar 2. Peta Relasi Aktor dan Tema (Project Map Integratif)"
        figureNumber="Gambar 2"
        figureTitle="Peta Relasi Integratif Aktor Komunitas, Platform Digital, dan Tema Mediasi BUMDes Ketapanrame"
        figureCaptionNote="Struktur relasional interaktif yang menghubungkan 5 aktor komunitas kunci (sisi kiri) dengan 9 atribut demografis (sisi kanan), platform komunikasi digital (tengah bawah), dimensi mediasi konten (tengah atas), dan muara legitimasi (puncak). Visualisasi diekstraksi dari matriks kros-tabulasi NVivo."
        defaultFilename="Gambar_2_Peta_Relasi_Integratif_Ketapanrame"
        targetElementRef={cardWrapperRef}
        getCytoscapeInstance={() => cyRef.current}
      />
    </div>
  );
};
