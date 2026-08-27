import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Informant, QualitativeNode, GraphEdge } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Filter, Eye, Layers } from 'lucide-react';

interface NetworkGraphProps {
  informants: Informant[];
  nodes: QualitativeNode[];
  edges: GraphEdge[];
  selectedInformantId: string | null;
  onSelectInformant: (id: string | null) => void;
  selectedThemeId: string | null;
  onSelectTheme: (id: string | null) => void;
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'informant' | 'attribute' | 'theme' | 'parent';
  subType?: string;
  color?: string;
  radius: number;
  val: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  id: string;
  source: string | D3Node;
  target: string | D3Node;
  type: 'Codes' | 'Value';
  label: string;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  informants,
  nodes,
  edges,
  selectedInformantId,
  onSelectInformant,
  selectedThemeId,
  onSelectTheme,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [edgeFilter, setEdgeFilter] = useState<'ALL' | 'Codes' | 'Value'>('ALL');
  const [layoutMode, setLayoutMode] = useState<'force' | 'nvivo_clustered'>('nvivo_clustered');
  const [showTheoreticalNodes, setShowTheoreticalNodes] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<D3Node | null>(null);

  // Prepare graph dataset
  const graphData = useMemo(() => {
    const d3Nodes: D3Node[] = [];
    const d3Links: D3Link[] = [];
    const nodeMap = new Set<string>();

    // 1. Informant nodes
    informants.forEach((inf) => {
      d3Nodes.push({
        id: inf.id,
        label: inf.name,
        type: 'informant',
        color: inf.avatarColor,
        radius: 26,
        val: inf.totalCodedThemes,
      });
      nodeMap.add(inf.id);
    });

    // 2. Attribute nodes
    const attributeDefs = [
      { id: 'attr_gender_Perempuan', label: 'Gender = Perempuan (1)', subType: 'gender', color: '#9333ea' },
      { id: 'attr_gender_Laki-laki', label: 'Gender = Laki-laki (4)', subType: 'gender', color: '#9333ea' },
      { id: 'attr_umur_26-35', label: 'Umur = 26-35 (1)', subType: 'umur', color: '#8b5cf6' },
      { id: 'attr_umur_36-45', label: 'Umur = 36-45 (2)', subType: 'umur', color: '#8b5cf6' },
      { id: 'attr_umur_46-55', label: 'Umur = 46-55 (2)', subType: 'umur', color: '#8b5cf6' },
      { id: 'attr_peran_Admin_Media_Sosial', label: 'Peran = Admin Media Sosial', subType: 'peran', color: '#a855f7' },
      { id: 'attr_peran_Kepala_Desa_Ketapanrame', label: 'Peran = Kepala Desa Ketapanrame', subType: 'peran', color: '#a855f7' },
      { id: 'attr_peran_Ketua_BUMDeS', label: 'Peran = Ketua BUMDeS', subType: 'peran', color: '#a855f7' },
      { id: 'attr_peran_Ketua_KUB_Wahana_Taman_Ghanjaran', label: 'Peran = Ketua KUB Wahana Taman Ghanjaran', subType: 'peran', color: '#a855f7' },
      { id: 'attr_peran_Tenan_Pujasera', label: 'Peran = Tenan Pujasera', subType: 'peran', color: '#a855f7' },
      { id: 'attr_pendidikan_SMA_SMK', label: 'Pendidikan = SMA/SMK', subType: 'pendidikan', color: '#c084fc' },
      { id: 'attr_pendidikan_S1', label: 'Pendidikan = S1', subType: 'pendidikan', color: '#c084fc' },
      { id: 'attr_pendidikan_S2', label: 'Pendidikan = S2', subType: 'pendidikan', color: '#c084fc' },
    ];

    attributeDefs.forEach((attr) => {
      d3Nodes.push({
        id: attr.id,
        label: attr.label,
        type: 'attribute',
        subType: attr.subType,
        color: attr.color,
        radius: 18,
        val: 1,
      });
      nodeMap.add(attr.id);
    });

    // 3. Theme/Node codes
    nodes.forEach((n) => {
      if (n.category === 'theme' || showTheoreticalNodes) {
        d3Nodes.push({
          id: n.id,
          label: n.label,
          type: n.category === 'theme' ? 'theme' : 'parent',
          color: n.category === 'theme' ? '#0284c7' : '#94a3b8',
          radius: n.category === 'theme' ? 20 + n.caseCount * 2 : 14,
          val: n.caseCount,
        });
        nodeMap.add(n.id);
      }
    });

    // 4. Filter and add links
    edges.forEach((edge) => {
      if (edgeFilter !== 'ALL' && edge.type !== edgeFilter) return;
      if (nodeMap.has(edge.source) && nodeMap.has(edge.target)) {
        d3Links.push({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
          label: edge.label,
        });
      }
    });

    return { nodes: d3Nodes, links: d3Links };
  }, [informants, nodes, edges, edgeFilter, showTheoreticalNodes]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 900;
    const height = Math.max(container.clientHeight, 640);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main zoomable group
    const g = svg.append('g').attr('class', 'main-group');

    // Setup zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Initial positioning based on layout mode
    const nodesCopy: D3Node[] = graphData.nodes.map((d) => ({ ...d }));
    const linksCopy: D3Link[] = graphData.links.map((d) => ({ ...d }));

    if (layoutMode === 'nvivo_clustered') {
      // NVivo style: Attributes placed in an arc/top-left, Informants along a right arc, Themes along bottom
      const centerX = width / 2;
      const centerY = height / 2;

      // Group informants in a vertical right line/arc
      const informantsNodes = nodesCopy.filter((n) => n.type === 'informant');
      informantsNodes.forEach((n, i) => {
        const angle = -Math.PI / 4 + (i / Math.max(1, informantsNodes.length - 1)) * (Math.PI / 2);
        n.fx = width * 0.78 + Math.cos(angle) * 30;
        n.fy = centerY + Math.sin(angle) * 220;
      });

      // Group attributes in top-left arc
      const attrNodes = nodesCopy.filter((n) => n.type === 'attribute');
      attrNodes.forEach((n, i) => {
        const count = attrNodes.length;
        const angle = Math.PI + (i / Math.max(1, count - 1)) * (Math.PI * 0.7);
        const radius = Math.min(width, height) * 0.42;
        n.fx = centerX - 80 + Math.cos(angle) * radius;
        n.fy = centerY - 60 + Math.sin(angle) * radius;
      });

      // Group themes in bottom left/center
      const themeNodes = nodesCopy.filter((n) => n.type === 'theme' || n.type === 'parent');
      themeNodes.forEach((n, i) => {
        const count = themeNodes.length;
        const cols = 4;
        const row = Math.floor(i / cols);
        const col = i % cols;
        n.fx = width * 0.15 + col * 120 + (row % 2) * 40;
        n.fy = height * 0.62 + row * 65;
      });
    }

    // Force simulation
    const simulation = d3
      .forceSimulation<D3Node>(nodesCopy)
      .force(
        'link',
        d3
          .forceLink<D3Node, D3Link>(linksCopy)
          .id((d) => d.id)
          .distance((d) => (d.type === 'Value' ? 120 : 150))
      )
      .force('charge', d3.forceManyBody().strength(layoutMode === 'force' ? -260 : -80))
      .force('collide', d3.forceCollide().radius((d: any) => d.radius + 14))
      .force('center', layoutMode === 'force' ? d3.forceCenter(width / 2, height / 2) : null);

    // Arrow markers
    const defs = svg.append('defs');

    defs
      .append('marker')
      .attr('id', 'arrow-codes')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 26)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#38bdf8');

    defs
      .append('marker')
      .attr('id', 'arrow-value')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 22)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#c084fc');

    // Draw Links
    const linkGroup = g.append('g').attr('class', 'links');
    const link = linkGroup
      .selectAll('line')
      .data(linksCopy)
      .enter()
      .append('line')
      .attr('stroke', (d) => (d.type === 'Codes' ? '#38bdf8' : '#a855f7'))
      .attr('stroke-opacity', (d) => {
        const sId = typeof d.source === 'object' ? d.source.id : d.source;
        const tId = typeof d.target === 'object' ? d.target.id : d.target;
        if (selectedInformantId && sId !== selectedInformantId && tId !== selectedInformantId) {
          return 0.1;
        }
        if (selectedThemeId && sId !== selectedThemeId && tId !== selectedThemeId) {
          return 0.1;
        }
        return d.type === 'Codes' ? 0.65 : 0.55;
      })
      .attr('stroke-width', (d) => (d.type === 'Codes' ? 1.8 : 1.4))
      .attr('stroke-dasharray', (d) => (d.type === 'Value' ? '3,3' : 'none'))
      .attr('marker-end', (d) => (d.type === 'Codes' ? 'url(#arrow-codes)' : 'url(#arrow-value)'));

    // Link Labels ("Codes" / "Value")
    const linkLabel = linkGroup
      .selectAll('text')
      .data(linksCopy)
      .enter()
      .append('text')
      .attr('font-size', '9px')
      .attr('fill', (d) => (d.type === 'Codes' ? '#0369a1' : '#7e22ce'))
      .attr('font-weight', '600')
      .attr('text-anchor', 'middle')
      .attr('opacity', (d) => {
        const sId = typeof d.source === 'object' ? d.source.id : d.source;
        const tId = typeof d.target === 'object' ? d.target.id : d.target;
        if (selectedInformantId && sId !== selectedInformantId && tId !== selectedInformantId) return 0.05;
        if (selectedThemeId && sId !== selectedThemeId && tId !== selectedThemeId) return 0.05;
        return 0.7;
      })
      .text((d) => d.label);

    // Draw Nodes
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const node = nodeGroup
      .selectAll('g')
      .data(nodesCopy)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<SVGGElement, D3Node>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            if (layoutMode === 'force') {
              d.fx = null;
              d.fy = null;
            }
          })
      );

    // Node shapes
    node.each(function (d) {
      const el = d3.select(this);
      const isSelected =
        (d.type === 'informant' && d.id === selectedInformantId) ||
        ((d.type === 'theme' || d.type === 'parent') && d.id === selectedThemeId);

      if (d.type === 'informant') {
        // Multi-colored pie ring representing NVivo case icon
        el.append('circle')
          .attr('r', d.radius + 3)
          .attr('fill', '#ffffff')
          .attr('stroke', isSelected ? '#2563eb' : '#0284c7')
          .attr('stroke-width', isSelected ? 4 : 2.5);

        // Quad color sectors inside informant circle (NVivo Case circle style)
        const colors = ['#818cf8', '#a78bfa', '#34d399', '#fbbf24'];
        const pieArc = d3.arc().innerRadius(0).outerRadius(d.radius);
        const pie = d3.pie<number>().value(1);
        const pieData = pie([1, 1, 1, 1]);

        pieData.forEach((slice, i) => {
          el.append('path')
            .attr('d', pieArc(slice as any))
            .attr('fill', colors[i])
            .attr('opacity', 0.85);
        });

        // Center white circle for text legibility
        el.append('circle').attr('r', d.radius - 8).attr('fill', '#ffffff').attr('opacity', 0.95);

        el.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', '11px')
          .attr('font-weight', '700')
          .attr('fill', '#0f172a')
          .text(d.label.replace('Informan ', 'INF-'));
      } else if (d.type === 'attribute') {
        // NVivo attribute square with 4 mini-squares
        const size = d.radius * 1.6;
        el.append('rect')
          .attr('x', -size / 2)
          .attr('y', -size / 2)
          .attr('width', size)
          .attr('height', size)
          .attr('rx', 4)
          .attr('fill', '#f5f3ff')
          .attr('stroke', '#a855f7')
          .attr('stroke-width', 2);

        // Mini square icons inside
        const miniSize = size / 2.6;
        el.append('rect')
          .attr('x', -size / 2 + 3)
          .attr('y', -size / 2 + 3)
          .attr('width', miniSize)
          .attr('height', miniSize)
          .attr('fill', '#9333ea');

        el.append('rect')
          .attr('x', 2)
          .attr('y', -size / 2 + 3)
          .attr('width', miniSize)
          .attr('height', miniSize)
          .attr('fill', '#94a3b8');

        el.append('rect')
          .attr('x', 2)
          .attr('y', 2)
          .attr('width', miniSize)
          .attr('height', miniSize)
          .attr('fill', '#94a3b8');
      } else {
        // Theme / Node circle (blue circular icon)
        el.append('circle')
          .attr('r', d.radius)
          .attr('fill', isSelected ? '#0284c7' : '#e0f2fe')
          .attr('stroke', isSelected ? '#0369a1' : '#38bdf8')
          .attr('stroke-width', isSelected ? 3.5 : 2);

        // Inner circle
        el.append('circle')
          .attr('r', d.radius - 5)
          .attr('fill', isSelected ? '#ffffff' : '#bae6fd')
          .attr('opacity', 0.85);

        // Reference count badge inside
        el.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', '10px')
          .attr('font-weight', '700')
          .attr('fill', isSelected ? '#0369a1' : '#0369a1')
          .text(d.val > 0 ? `${d.val} inf` : '0');
      }
    });

    // Node Labels
    node
      .append('text')
      .attr('dy', (d) => (d.type === 'informant' ? d.radius + 14 : d.radius + 12))
      .attr('text-anchor', 'middle')
      .attr('font-size', (d) => (d.type === 'informant' ? '12px' : '10.5px'))
      .attr('font-weight', (d) => (d.type === 'informant' ? '700' : '500'))
      .attr('fill', '#1e293b')
      .style('pointer-events', 'none')
      .text((d) => {
        if (d.label.length > 28) {
          return d.label.substring(0, 26) + '...';
        }
        return d.label;
      });

    // Hover & Click Interactions
    node
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget).select('circle, rect').attr('stroke-width', 4);
      })
      .on('mouseleave', (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget).select('circle, rect').attr('stroke-width', 2);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        if (d.type === 'informant') {
          onSelectInformant(selectedInformantId === d.id ? null : d.id);
          onSelectTheme(null);
        } else if (d.type === 'theme' || d.type === 'parent') {
          onSelectTheme(selectedThemeId === d.id ? null : d.id);
          onSelectInformant(null);
        }
      });

    // Canvas click clears selection
    svg.on('click', () => {
      onSelectInformant(null);
      onSelectTheme(null);
    });

    // Simulation Tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkLabel
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2 - 4);

      node.attr('transform', (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [graphData, layoutMode, selectedInformantId, selectedThemeId, onSelectInformant, onSelectTheme]);

  const handleZoom = (factor: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy as any, factor);
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(400).call(d3.zoom<SVGSVGElement, unknown>().transform as any, d3.zoomIdentity);
  };

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-50/50 border-b border-slate-100 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-slate-800">Visualisasi Graf Jaringan (Network)</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-mono font-medium">
            {graphData.nodes.length} Nodes &bull; {graphData.links.length} Edges
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Edge Filter */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200/80 rounded-md p-0.5">
            <span className="text-[11px] text-slate-400 px-1.5 font-medium">Edge:</span>
            <button
              id="filter-edge-all"
              onClick={() => setEdgeFilter('ALL')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                edgeFilter === 'ALL'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({edges.length})
            </button>
            <button
              id="filter-edge-codes"
              onClick={() => setEdgeFilter('Codes')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                edgeFilter === 'Codes'
                  ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Codes (69)
            </button>
            <button
              id="filter-edge-value"
              onClick={() => setEdgeFilter('Value')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                edgeFilter === 'Value'
                  ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Value (20)
            </button>
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-0.5 bg-slate-100 border border-slate-200/80 rounded-md p-0.5">
            <button
              id="layout-nvivo"
              onClick={() => setLayoutMode('nvivo_clustered')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                layoutMode === 'nvivo_clustered'
                  ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Layout Bipartit Terstruktur NVivo"
            >
              Format NVivo
            </button>
            <button
              id="layout-force"
              onClick={() => setLayoutMode('force')}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                layoutMode === 'force'
                  ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Force-Directed Organic Layout"
            >
              Organik
            </button>
          </div>

          {/* Theoretical Nodes Toggle */}
          <button
            id="toggle-theoretical-nodes"
            onClick={() => setShowTheoreticalNodes(!showTheoreticalNodes)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
              showTheoreticalNodes
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3 h-3" />
            {showTheoreticalNodes ? 'Hide Parent Nodes' : 'Show Parent Nodes (0)'}
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-md p-0.5">
            <button
              id="zoom-in-btn"
              onClick={() => handleZoom(1.25)}
              className="p-1 text-slate-600 hover:bg-slate-100 rounded"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              id="zoom-out-btn"
              onClick={() => handleZoom(0.8)}
              className="p-1 text-slate-600 hover:bg-slate-100 rounded"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              id="zoom-reset-btn"
              onClick={handleResetZoom}
              className="p-1 text-slate-600 hover:bg-slate-100 rounded"
              title="Reset Tampilan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div ref={containerRef} className="relative w-full h-[620px] bg-slate-900/5 overflow-hidden">
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-sm text-xs space-y-2 pointer-events-auto max-w-xs">
          <div className="font-semibold text-slate-700 border-b border-slate-100 pb-1 flex items-center justify-between">
            <span>Legenda Node & Hubungan</span>
          </div>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-sky-500 bg-linear-to-tr from-amber-400 via-indigo-400 to-emerald-400 inline-block" />
              <span>
                <strong>Informan (1-5)</strong> - Kasus Responden
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-sm border border-purple-500 bg-purple-100 inline-block" />
              <span>
                <strong>Atribut Demografis</strong> (Gender, Umur, Peran, Pendidikan)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-sky-500 bg-sky-100 inline-block" />
              <span>
                <strong>Tema Kualitatif (Node)</strong> - Coded 1-5 Informan
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <span className="w-4 h-0.5 bg-sky-500 inline-block" />
              <span>
                <strong>Codes Edge</strong>: Hubungan Koding (Nilai = 1)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-purple-500 border-t border-dashed inline-block" />
              <span>
                <strong>Value Edge</strong>: Relasi Nilai Atribut
              </span>
            </div>
          </div>
        </div>

        {/* Hovered details tooltip */}
        {hoveredNode && (
          <div className="absolute top-3 right-3 bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-lg shadow-lg max-w-xs border border-slate-700 pointer-events-none transition-all">
            <div className="font-bold text-sky-300">{hoveredNode.label}</div>
            <div className="text-slate-300 mt-1 capitalize">
              Tipe: <span className="text-white font-medium">{hoveredNode.type}</span>
            </div>
            {hoveredNode.type === 'informant' && (
              <div className="text-slate-300">
                Total Tema Dikodekan:{' '}
                <span className="text-emerald-400 font-semibold">{hoveredNode.val} tema</span>
              </div>
            )}
            {(hoveredNode.type === 'theme' || hoveredNode.type === 'parent') && (
              <div className="text-slate-300">
                Jumlah Informan Terkait:{' '}
                <span className="text-sky-400 font-semibold">{hoveredNode.val} informan</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
