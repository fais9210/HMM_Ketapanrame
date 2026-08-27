import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, EventObject } from 'cytoscape';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  Layers,
  Info,
  Circle,
  Square,
  Compass,
  PanelRightClose,
  PanelRightOpen,
  Expand,
  Shrink,
} from 'lucide-react';
import { Informant, QualitativeNode, GraphEdge } from '../types';
import { getAttributeNodeId } from '../data/crosstabData';

interface CytoscapeNetworkGraphProps {
  informants: Informant[];
  qualitativeNodes: QualitativeNode[];
  edges: GraphEdge[];
  attributesConfig: {
    gender: string[];
    umur: string[];
    peran: string[];
    pendidikan: string[];
  };
  activeInformantIds: string[];
  selectedNodeId: string | null;
  onSelectNode: (nodeData: any | null) => void;
  onOpenProfileDrawer?: () => void;
}

export const CytoscapeNetworkGraph: React.FC<CytoscapeNetworkGraphProps> = ({
  informants,
  qualitativeNodes,
  edges,
  attributesConfig,
  activeInformantIds,
  selectedNodeId,
  onSelectNode,
  onOpenProfileDrawer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const activeLayoutRef = useRef<cytoscape.Layouts | null>(null);
  const pulseTimerRef = useRef<number | null>(null);
  const onSelectNodeRef = useRef(onSelectNode);
  onSelectNodeRef.current = onSelectNode;

  const [edgeFilter, setEdgeFilter] = useState<'ALL' | 'Codes' | 'Value'>('ALL');
  const [showParentNodes, setShowParentNodes] = useState<boolean>(false);
  const [layoutName, setLayoutName] = useState<'concentric' | 'cose' | 'circle'>('concentric');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const [activeLegendFilter, setActiveLegendFilter] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showLegendPanel, setShowLegendPanel] = useState<boolean>(false);

  // Resize and fit graph when Fullscreen or Legend toggle changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cyRef.current && !cyRef.current.destroyed()) {
        cyRef.current.resize();
        cyRef.current.fit(undefined, 60);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullscreen, showLegendPanel]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Initialize Cytoscape Instance
  useEffect(() => {
    if (!containerRef.current) return;

    // Teardown previous instance cleanly
    if (pulseTimerRef.current) {
      clearInterval(pulseTimerRef.current);
      pulseTimerRef.current = null;
    }
    if (activeLayoutRef.current) {
      try {
        activeLayoutRef.current.stop();
      } catch (e) {}
      activeLayoutRef.current = null;
    }
    if (cyRef.current && !cyRef.current.destroyed()) {
      try {
        cyRef.current.stop();
        cyRef.current.removeAllListeners();
        cyRef.current.destroy();
      } catch (e) {}
      cyRef.current = null;
    }

    const elements: cytoscape.ElementDefinition[] = [];
    const validNodeIds = new Set<string>();

    // 1. LAYER 1 (Pusat / Center - Level 3): Informant Nodes (Ellipse, White with thick Indigo border)
    informants.forEach((inf) => {
      validNodeIds.add(inf.id);
      elements.push({
        group: 'nodes',
        data: {
          id: inf.id,
          label: `${inf.name}\n[${inf.code}]`,
          subLabel: inf.role,
          nodeType: 'informant',
          level: 3, // Layer 1 (Center)
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
          fontSize: 10,
        },
      });
    });

    // 2. LAYER 2 (Lingkaran Tengah / Middle Ring - Level 2): Attribute Nodes (Diamond, Purple border & text)
    const attrCategories = [
      { cat: 'gender', label: 'Gender', values: attributesConfig.gender },
      { cat: 'umur', label: 'Umur', values: attributesConfig.umur },
      { cat: 'peran', label: 'Peran', values: attributesConfig.peran },
      { cat: 'pendidikan', label: 'Pendidikan', values: attributesConfig.pendidikan },
    ];

    attrCategories.forEach((c) => {
      c.values.forEach((val) => {
        const attrId = getAttributeNodeId(c.cat, val);
        validNodeIds.add(attrId);
        elements.push({
          group: 'nodes',
          data: {
            id: attrId,
            label: `${c.label}:\n${val}`,
            subLabel: c.label,
            nodeType: 'attribute',
            level: 2, // Layer 2 (Middle ring)
            category: c.label,
            value: val,
            bgColor: '#f3e8ff',
            borderColor: '#7e22ce',
            borderWidth: 2.5,
            color: '#581c87',
            shape: 'diamond',
            size: 40,
            fontSize: 9,
          },
        });
      });
    });

    // 3. LAYER 3 (Lingkaran Luar / Outer Ring - Level 1): Qualitative Nodes / Themes (Round Rectangle, Blue border & text)
    qualitativeNodes.forEach((node) => {
      const isParent = node.category === 'parent_concept';
      validNodeIds.add(node.id);
      elements.push({
        group: 'nodes',
        data: {
          id: node.id,
          label: node.label,
          subLabel: isParent ? 'Induk Konsep' : `${node.caseCount} Kasus`,
          nodeType: isParent ? 'parent_concept' : 'theme',
          level: 1, // Layer 3 (Outer ring)
          category: node.category,
          caseCount: node.caseCount,
          description: node.description,
          bgColor: isParent ? '#f8fafc' : '#eff6ff',
          borderColor: isParent ? '#94a3b8' : '#2563eb',
          borderWidth: isParent ? 1.5 : 2.5,
          color: isParent ? '#64748b' : '#1e3a8a',
          shape: 'round-rectangle',
          size: isParent ? 30 : Math.max(36, Math.min(52, 32 + node.caseCount * 4)),
          fontSize: isParent ? 8 : 9,
        },
      });
    });

    // 4. EDGES: Light blue transparent (#add8e6), bezier curve, no arrows
    edges.forEach((edge, index) => {
      if (validNodeIds.has(edge.source) && validNodeIds.has(edge.target)) {
        elements.push({
          group: 'edges',
          data: {
            id: `edge_${index}_${edge.source}_${edge.target}`,
            source: edge.source,
            target: edge.target,
            edgeType: edge.type,
            label: edge.label,
            weight: edge.weight,
            lineColor: '#add8e6', // Biru muda transparan
            lineStyle: edge.type === 'Value' ? 'dashed' : 'solid',
            width: edge.type === 'Value' ? 1.5 : 2,
          },
        });
      }
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      boxSelectionEnabled: false,
      autounselectify: false,
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
            'shape': 'data(shape)' as any,
            'width': 'data(size)',
            'height': 'data(size)',
            'color': 'data(color)',
            'text-outline-color': '#ffffff',
            'text-outline-width': 2.5,
            'border-width': 'data(borderWidth)',
            'border-color': 'data(borderColor)',
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(width)',
            'line-color': '#add8e6',
            'line-style': 'data(lineStyle)' as any,
            'curve-style': 'bezier',
            'opacity': 0.7,
            'target-arrow-shape': 'none',
            'source-arrow-shape': 'none',
          },
        },
        {
          selector: '.faded',
          style: {
            'opacity': 0.12,
          },
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
            'text-outline-width': 3,
          },
        },
        {
          selector: 'edge.highlighted',
          style: {
            'opacity': 1,
            'width': 3.5,
            'line-color': '#4f46e5',
            'z-index': 998,
          },
        },
        {
          selector: 'node.pulsing',
          style: {
            'border-width': 5,
            'border-color': '#ec4899',
            'background-color': '#fdf2f8',
            'opacity': 1,
            'z-index': 1000,
          },
        },
        {
          selector: 'edge.hovered',
          style: {
            'width': 4,
            'line-color': '#2563eb',
            'opacity': 1,
            'z-index': 997,
          },
        },
      ],
      layout: {
        name: 'null',
      },
    });

    cyRef.current = cy;

    // Run default Concentric Ring layout (Layer 1=Informan, Layer 2=Atribut, Layer 3=Tema)
    const concentricLayout = cy.layout({
      name: 'concentric',
      animate: false,
      concentric: (node: any) => node.data('level') || 1,
      levelWidth: () => 1,
      padding: 40,
      minNodeSpacing: 95,
      spacingFactor: 1.35,
      avoidOverlap: true,
      equidistant: false,
      startAngle: (3 / 2) * Math.PI,
    });
    activeLayoutRef.current = concentricLayout;
    concentricLayout.run();

    // Node click handler (Focus Mode)
    cy.on('tap', 'node', (evt: EventObject) => {
      if (!cyRef.current || cyRef.current.destroyed()) return;
      const node = evt.target;
      const nodeData = node.data();

      const connectedEdges = node.connectedEdges();
      const connectedNodes = connectedEdges.connectedNodes();

      // Focus Mode: Fade unrelated elements, highlight connected
      cy.elements().removeClass('highlighted').addClass('faded');
      node.removeClass('faded').addClass('highlighted');
      connectedNodes.removeClass('faded').addClass('highlighted');
      connectedEdges.removeClass('faded').addClass('highlighted');

      onSelectNodeRef.current(nodeData);
    });

    // Background canvas click (Reset Focus Mode)
    cy.on('tap', (evt: EventObject) => {
      if (!cyRef.current || cyRef.current.destroyed()) return;
      if (evt.target === cy) {
        cy.elements().removeClass('highlighted').removeClass('faded').removeClass('pulsing');
        onSelectNodeRef.current(null);
        setActiveLegendFilter(null);
      }
    });

    // Node hover tooltip
    cy.on('mouseover', 'node', (evt: EventObject) => {
      if (!cyRef.current || cyRef.current.destroyed()) return;
      const data = evt.target.data();
      setHoveredInfo(`Node: ${data.label.replace('\n', ' ')} (${data.subLabel || data.nodeType})`);
    });

    cy.on('mouseout', 'node', () => {
      setHoveredInfo(null);
    });

    // Edge hover effect
    cy.on('mouseover', 'edge', (evt: EventObject) => {
      if (!cyRef.current || cyRef.current.destroyed()) return;
      const edge = evt.target;
      edge.addClass('hovered');
      const data = edge.data();
      setHoveredInfo(`Relasi [${data.edgeType}]: ${data.label || 'Koneksi Relasional'}`);
    });

    cy.on('mouseout', 'edge', (evt: EventObject) => {
      if (!cyRef.current || cyRef.current.destroyed()) return;
      evt.target.removeClass('hovered');
      setHoveredInfo(null);
    });

    // ResizeObserver to handle container size changes smoothly on any screen / orientation
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (cyRef.current && !cyRef.current.destroyed()) {
          cyRef.current.resize();
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      try {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        if (pulseTimerRef.current) {
          clearInterval(pulseTimerRef.current);
          pulseTimerRef.current = null;
        }
        if (activeLayoutRef.current) {
          activeLayoutRef.current.stop();
          activeLayoutRef.current = null;
        }
        if (cyRef.current) {
          const instance = cyRef.current;
          cyRef.current = null;
          if (!instance.destroyed()) {
            instance.stop();
            instance.removeAllListeners();
            instance.destroy();
          }
        }
      } catch (err) {}
    };
  }, [informants, qualitativeNodes, edges, attributesConfig]);

  // Edge Filter Effect
  useEffect(() => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    cy.edges().forEach((edge) => {
      const type = edge.data('edgeType');
      if (edgeFilter === 'ALL' || edgeFilter === type) {
        edge.show();
      } else {
        edge.hide();
      }
    });
  }, [edgeFilter]);

  // Show/Hide Parent Nodes
  useEffect(() => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    cy.nodes().forEach((node) => {
      if (node.data('nodeType') === 'parent_concept') {
        if (showParentNodes) {
          node.show();
        } else {
          node.hide();
        }
      }
    });
  }, [showParentNodes]);

  // Active Informant Filtering
  useEffect(() => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    cy.nodes().forEach((node) => {
      if (node.data('nodeType') === 'informant') {
        const infId = node.data('id');
        if (activeInformantIds.includes(infId)) {
          node.removeClass('faded');
        } else {
          node.addClass('faded');
        }
      }
    });
  }, [activeInformantIds]);

  // Handle External Node Selection Sync
  useEffect(() => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    if (!selectedNodeId) {
      cy.elements().removeClass('highlighted').removeClass('faded');
      return;
    }

    const targetNode = cy.getElementById(selectedNodeId);
    if (targetNode && targetNode.length > 0) {
      const connectedEdges = targetNode.connectedEdges();
      const connectedNodes = connectedEdges.connectedNodes();

      cy.elements().removeClass('highlighted').addClass('faded');
      targetNode.removeClass('faded').addClass('highlighted');
      connectedNodes.removeClass('faded').addClass('highlighted');
      connectedEdges.removeClass('faded').addClass('highlighted');
    }
  }, [selectedNodeId]);

  // Search Filter Handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    if (!query.trim()) {
      cy.elements().removeClass('highlighted').removeClass('faded');
      return;
    }

    const q = query.toLowerCase().trim();
    const matchedNodes = cy.nodes().filter((node) => {
      const label = (node.data('label') || '').toLowerCase();
      const subLabel = (node.data('subLabel') || '').toLowerCase();
      return label.includes(q) || subLabel.includes(q);
    });

    if (matchedNodes.length > 0) {
      cy.elements().addClass('faded').removeClass('highlighted');
      matchedNodes.removeClass('faded').addClass('highlighted');
      matchedNodes.connectedEdges().removeClass('faded').addClass('highlighted');
      matchedNodes.connectedEdges().connectedNodes().removeClass('faded');

      // Center around matches
      cy.animate({
        center: { eles: matchedNodes },
        duration: 400,
      });
    }
  };

  // Interactive Legend Pulsing Effect
  const handleLegendClick = (type: 'education' | 'gender' | 'role' | 'shape', value: string) => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    const filterKey = `${type}:${value}`;
    if (activeLegendFilter === filterKey) {
      // Toggle off
      setActiveLegendFilter(null);
      cy.nodes().removeClass('pulsing').removeClass('faded');
      if (pulseTimerRef.current) {
        clearInterval(pulseTimerRef.current);
        pulseTimerRef.current = null;
      }
      return;
    }

    setActiveLegendFilter(filterKey);
    let targetNodes: cytoscape.NodeCollection;

    if (type === 'education') {
      targetNodes = cy.nodes().filter((n) => n.data('education') === value);
    } else if (type === 'gender') {
      targetNodes = cy.nodes().filter((n) => n.data('gender') === value);
    } else if (type === 'role') {
      targetNodes = cy.nodes().filter((n) => n.data('role') === value);
    } else if (type === 'shape') {
      if (value === 'informant') {
        targetNodes = cy.nodes().filter((n) => n.data('nodeType') === 'informant');
      } else if (value === 'attribute') {
        targetNodes = cy.nodes().filter((n) => n.data('nodeType') === 'attribute');
      } else {
        targetNodes = cy.nodes().filter((n) => n.data('nodeType') === 'theme');
      }
    } else {
      targetNodes = cy.nodes().filter((n) => n.data('label')?.toLowerCase().includes(value.toLowerCase()));
    }

    // Apply Pulsing Blinking Animation to target nodes
    cy.nodes().removeClass('pulsing');
    if (pulseTimerRef.current) {
      clearInterval(pulseTimerRef.current);
    }

    let isPulsing = true;
    targetNodes.addClass('pulsing');

    pulseTimerRef.current = window.setInterval(() => {
      if (!cyRef.current || cyRef.current.destroyed()) return;
      if (isPulsing) {
        targetNodes.removeClass('pulsing');
      } else {
        targetNodes.addClass('pulsing');
      }
      isPulsing = !isPulsing;
    }, 600);

    // Zoom/Fit to matching nodes
    if (targetNodes.length > 0) {
      cy.animate({
        center: { eles: targetNodes },
        duration: 500,
      });
    }
  };

  // Layout Switcher
  const handleLayoutChange = (name: 'concentric' | 'cose' | 'circle') => {
    setLayoutName(name);
    if (!cyRef.current || cyRef.current.destroyed()) return;
    const cy = cyRef.current;

    if (activeLayoutRef.current) {
      try {
        activeLayoutRef.current.stop();
      } catch (e) {}
      activeLayoutRef.current = null;
    }

    let layoutOpts: any;
    if (name === 'concentric') {
      layoutOpts = {
        name: 'concentric',
        animate: false,
        concentric: (node: any) => node.data('level') || 1,
        levelWidth: () => 1,
        padding: 50,
        minNodeSpacing: 80,
        spacingFactor: 1.25,
        avoidOverlap: true,
        equidistant: false,
        startAngle: (3 / 2) * Math.PI,
      };
    } else if (name === 'cose') {
      layoutOpts = {
        name: 'cose',
        animate: false,
        componentSpacing: 85,
        nodeRepulsion: 480000,
        idealEdgeLength: 95,
      };
    } else {
      layoutOpts = {
        name: 'circle',
        animate: false,
        spacingFactor: 1.1,
      };
    }

    const newLayout = cy.layout(layoutOpts);
    activeLayoutRef.current = newLayout;
    newLayout.run();
  };

  const handleZoom = (factor: number) => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    cyRef.current.zoom(cyRef.current.zoom() * factor);
    cyRef.current.center();
  };

  const handleFit = () => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    cyRef.current.fit(undefined, 35);
  };

  const handleResetHighlight = () => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
    if (pulseTimerRef.current) {
      clearInterval(pulseTimerRef.current);
      pulseTimerRef.current = null;
    }
    setActiveLegendFilter(null);
    setSearchQuery('');
    cyRef.current.elements().removeClass('highlighted').removeClass('faded').removeClass('pulsing');
    onSelectNodeRef.current(null);
  };

  return (
    <div
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-white flex flex-col w-screen h-screen overflow-hidden shadow-2xl animate-in fade-in duration-150'
          : 'bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col'
      }`}
    >
      {/* 1. Header Toolbar & Search Bar */}
      <div className="p-2.5 sm:p-3.5 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shrink-0">
        {/* Left: Search Bar with Icon */}
        <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari tema, atribut, atau informan..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          )}
        </div>

        {/* Center: Edge Filter */}
        <div className="flex flex-wrap items-center gap-1 bg-white border border-slate-200/80 rounded-xl p-1 shadow-2xs text-xs">
          <span className="text-slate-400 px-1.5 font-medium hidden sm:inline">Relasi:</span>
          <button
            onClick={() => setEdgeFilter('ALL')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-xs ${
              edgeFilter === 'ALL'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({edges.length})
          </button>
          <button
            onClick={() => setEdgeFilter('Codes')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-xs ${
              edgeFilter === 'Codes'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-blue-700 hover:bg-blue-50'
            }`}
          >
            <i className="fa-solid fa-tags mr-1"></i> Codes (69)
          </button>
          <button
            onClick={() => setEdgeFilter('Value')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-xs ${
              edgeFilter === 'Value'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'text-purple-700 hover:bg-purple-50'
            }`}
          >
            <i className="fa-solid fa-id-card mr-1"></i> Value (20)
          </button>
        </div>

        {/* Right: Layout Switcher, Zoom, Legend Toggle, and Fullscreen Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          {/* Layout Mode */}
          <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => handleLayoutChange('concentric')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 cursor-pointer ${
                layoutName === 'concentric'
                  ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Struktur Konsentris 3 Lapisan (Layer 1=Informan, Layer 2=Atribut, Layer 3=Tema)"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Konsentris</span>
            </button>
            <button
              onClick={() => handleLayoutChange('cose')}
              className={`px-2 py-1 rounded-lg font-medium transition cursor-pointer ${
                layoutName === 'cose'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Force-Directed Organic Layout"
            >
              Organik
            </button>
          </div>

          {/* Zoom & Fit Tools */}
          <div className="flex items-center gap-0.5 bg-white border border-slate-200/80 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => handleZoom(1.25)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(0.8)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFit}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Pusatkan Peta (Fit Screen)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetHighlight}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Reset Pilihan / Focus Mode"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Informant Profile Drawer Toggle */}
          {onOpenProfileDrawer && (
            <button
              onClick={onOpenProfileDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/90 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
              title="Buka Panel Profil Informan"
            >
              <i className="fa-solid fa-id-card text-xs"></i>
              <span className="hidden md:inline">Profil Informan</span>
            </button>
          )}

          {/* Side Legend Toggle */}
          <button
            onClick={() => setShowLegendPanel(!showLegendPanel)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition cursor-pointer ${
              showLegendPanel
                ? 'bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
            title={showLegendPanel ? 'Sembunyikan Panel Legenda' : 'Tampilkan Panel Legenda'}
          >
            {showLegendPanel ? (
              <PanelRightClose className="w-3.5 h-3.5 text-indigo-600" />
            ) : (
              <PanelRightOpen className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Legenda</span>
          </button>

          {/* Dedicated Fullscreen Toggle Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              isFullscreen
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border border-amber-400'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
            }`}
            title={isFullscreen ? 'Keluar dari Tampilan Full Screen (ESC)' : 'Tampilkan Peta Layar Penuh (Full Screen)'}
          >
            {isFullscreen ? (
              <>
                <Shrink className="w-3.5 h-3.5" />
                <span>Tutup Full Screen</span>
              </>
            ) : (
              <>
                <Expand className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Top Interactive Legend & Structure Indicator */}
      <div className="px-3 sm:px-4 py-2 bg-slate-100/70 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1 mr-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Struktur 3 Lapisan:</span>
          </span>

          {/* Layer 1: Informan */}
          <button
            onClick={() => handleLegendClick('shape', 'informant')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
              activeLegendFilter === 'shape:informant'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                : 'bg-white text-slate-800 border-indigo-200 hover:border-indigo-500'
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-white border-2 border-indigo-600 inline-block"></span>
            <span>Layer 1 (Pusat): Informan (5)</span>
          </button>

          {/* Layer 2: Atribut */}
          <button
            onClick={() => handleLegendClick('shape', 'attribute')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
              activeLegendFilter === 'shape:attribute'
                ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                : 'bg-white text-purple-900 border-purple-200 hover:border-purple-500'
            }`}
          >
            <span className="w-2.5 h-2.5 bg-purple-100 border-2 border-purple-600 rotate-45 inline-block"></span>
            <span>Layer 2 (Tengah): Atribut (10)</span>
          </button>

          {/* Layer 3: Tema */}
          <button
            onClick={() => handleLegendClick('shape', 'theme')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
              activeLegendFilter === 'shape:theme'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : 'bg-white text-blue-900 border-blue-200 hover:border-blue-500'
            }`}
          >
            <span className="w-3 h-3 rounded-xs bg-blue-100 border-2 border-blue-600 inline-block"></span>
            <span>Layer 3 (Luar): Tema / Nodes (16)</span>
          </button>
        </div>

        {/* Live Hover Info */}
        <div className="text-[11px] text-slate-500 font-medium">
          {hoveredInfo ? (
            <span className="text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
              {hoveredInfo}
            </span>
          ) : (
            <span className="italic text-slate-400 hidden sm:inline">
              Klik node untuk <strong>Focus Mode</strong> &bull; Garis bezier biru muda transparan
            </span>
          )}
        </div>
      </div>

      {/* 3. Main Split View: Canvas (Left) + Detailed Right-Side Legend Panel (Right) */}
      <div className={`flex-1 grid grid-cols-1 ${showLegendPanel ? 'xl:grid-cols-12' : 'grid-cols-1'} gap-0 min-h-0 overflow-hidden`}>
        {/* Cytoscape Canvas */}
        <div
          ref={containerRef}
          className={`${
            showLegendPanel ? 'xl:col-span-9' : 'col-span-12'
          } w-full ${
            isFullscreen ? 'h-full min-h-[350px]' : 'h-[500px] sm:h-[600px] md:h-[680px] lg:h-[760px]'
          } bg-slate-50/60 cursor-grab active:cursor-grabbing border-b xl:border-b-0 ${
            showLegendPanel ? 'xl:border-r border-slate-200/80' : ''
          }`}
        />

        {/* Dedicated Right-Side Legend & Structure Explainer Card */}
        {showLegendPanel && (
          <div
            className={`xl:col-span-3 p-4 bg-white flex flex-col justify-between space-y-4 overflow-y-auto ${
              isFullscreen ? 'h-full' : 'max-h-[620px]'
            }`}
          >
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>Legenda Bentuk & Layer</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Struktur konsentris 3 cincin hierarkis:
                  </p>
                </div>
                <button
                  onClick={() => setShowLegendPanel(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                  title="Tutup Panel Legenda"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              </div>

              {/* Shape 1: Informan (Center) */}
              <div
                onClick={() => handleLegendClick('shape', 'informant')}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  activeLegendFilter === 'shape:informant'
                    ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20'
                    : 'bg-slate-50/80 border-slate-200/70 hover:border-indigo-300 hover:bg-indigo-50/40'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border-[3px] border-indigo-600 flex items-center justify-center text-indigo-600 text-xs shadow-2xs shrink-0 mt-0.5">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Bulat (Ellipse)</span>
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                      Layer 1 (Pusat)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                    Subjek Informan 1-5
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Lingkaran putih dengan border tebal indigo. Inti data kualitatif.
                  </p>
                </div>
              </div>

              {/* Shape 2: Diamond Ungu (Middle Ring) */}
              <div
                onClick={() => handleLegendClick('shape', 'attribute')}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  activeLegendFilter === 'shape:attribute'
                    ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-500/20'
                    : 'bg-slate-50/80 border-slate-200/70 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="w-8 h-8 rounded-md bg-purple-100 border-[2.5px] border-purple-600 rotate-45 flex items-center justify-center text-purple-700 text-xs shrink-0 mt-0.5 shadow-2xs">
                  <div className="-rotate-45">
                    <i className="fa-solid fa-id-card"></i>
                  </div>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">Diamond Ungu</span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                      Layer 2 (Tengah)
                    </span>
                  </div>
                  <div className="text-[11px] text-purple-800 font-medium mt-0.5">
                    Atribut / Karakteristik
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Gender, Kelompok Umur, Peran, dan Pendidikan subjek.
                  </p>
                </div>
              </div>

              {/* Shape 3: Kotak Biru (Outer Ring) */}
              <div
                onClick={() => handleLegendClick('shape', 'theme')}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  activeLegendFilter === 'shape:theme'
                    ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-slate-50/80 border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/40'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 border-[2.5px] border-blue-600 flex items-center justify-center text-blue-700 text-xs shrink-0 mt-0.5 shadow-2xs">
                  <i className="fa-solid fa-tags"></i>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-950">Kotak Biru</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                      Layer 3 (Luar)
                    </span>
                  </div>
                  <div className="text-[11px] text-blue-800 font-medium mt-0.5">
                    Tema Kualitatif / Nodes
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Tema hasil koding kros-tabulasi NVivo dengan 8 konsensus mutlak.
                  </p>
                </div>
              </div>

              {/* Edge Styling Legend */}
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/60 space-y-2 text-xs">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Styling Garis (Edges)
                </span>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.75 bg-[#add8e6] border-t border-blue-300 inline-block"></span>
                    <span className="text-slate-600">Garis Bezier (Kurva)</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">#add8e6</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.75 border-t border-dashed border-purple-400 inline-block"></span>
                    <span className="text-slate-600">Garis Putus (Demografi)</span>
                  </div>
                  <span className="text-[10px] text-purple-600 font-semibold">20 Relasi</span>
                </div>
              </div>
            </div>

            {/* Focus Mode Tip */}
            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong>Mode Interaktif Focus</strong>: Klik node mana saja untuk meredupkan elemen yang tidak terkait dan menyorot relasi aktif secara tajam.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Canvas Footer Legend Indicators */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-medium shrink-0">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 inline-block shadow-2xs" />
            <span className="text-slate-700 font-semibold">Layer 1: Informan 1-5</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-purple-100 border-2 border-purple-600 rotate-45 inline-block" />
            <span className="text-purple-900 font-semibold">Layer 2: Atribut Profil</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-blue-100 border-2 border-blue-600 inline-block" />
            <span className="text-blue-900 font-semibold">Layer 3: Tema Kualitatif</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-0.75 bg-[#add8e6] inline-block border-t border-blue-300" />
            <span>Garis Bezier Biru Muda Transparan (Tanpa Panah)</span>
          </span>
        </div>

        <button
          onClick={() => setShowParentNodes(!showParentNodes)}
          className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
        >
          {showParentNodes ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showParentNodes ? 'Sembunyikan Parent Concepts' : 'Tampilkan Parent Concepts (0)'}</span>
        </button>
      </div>
    </div>
  );
};

