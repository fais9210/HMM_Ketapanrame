import React from 'react';
import { X, User, Calendar, Briefcase, GraduationCap, CheckCircle2, ChevronRight, Hash, Layers } from 'lucide-react';
import { Informant, QualitativeNode, GraphEdge } from '../types';

interface DrillDownCardProps {
  selectedNode: any | null;
  onClose: () => void;
  informants: Informant[];
  qualitativeNodes: QualitativeNode[];
  edges: GraphEdge[];
  onSelectAnotherNode?: (nodeId: string) => void;
}

export const DrillDownCard: React.FC<DrillDownCardProps> = ({
  selectedNode,
  onClose,
  informants,
  qualitativeNodes,
  edges,
  onSelectAnotherNode,
}) => {
  if (!selectedNode) return null;

  const nodeType = selectedNode.nodeType || selectedNode.type;

  // If Informant Node
  if (nodeType === 'informant') {
    const inf = informants.find((i) => i.id === selectedNode.id) || selectedNode;
    // Find all connected thematic nodes
    const connectedEdges = edges.filter((e) => e.source === inf.id && e.type === 'Codes');
    const connectedThematicIds = connectedEdges.map((e) => e.target);
    const connectedThemes = qualitativeNodes.filter((n) => connectedThematicIds.includes(n.id));

    return (
      <div
        id="floating-drilldown-card"
        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-4"
      >
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs text-white shadow-xs"
              style={{ backgroundColor: inf.avatarColor || '#059669' }}
            >
              {inf.code || 'INF'}
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">
                Profil Informan (Kasus)
              </span>
              <h4 className="font-bold text-sm leading-tight text-white">{inf.name}</h4>
            </div>
          </div>
          <button
            id="close-drilldown-card"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demographics */}
        <div className="p-3.5 bg-slate-50/70 border-b border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-white p-2 rounded border border-slate-200/70 shadow-2xs">
            <span className="text-slate-400 block text-[10px]">Gender:</span>
            <span className="font-semibold text-slate-800">{inf.gender}</span>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200/70 shadow-2xs">
            <span className="text-slate-400 block text-[10px]">Kelompok Umur:</span>
            <span className="font-semibold text-slate-800">{inf.ageGroup} tahun</span>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200/70 shadow-2xs">
            <span className="text-slate-400 block text-[10px]">Peran:</span>
            <span className="font-semibold text-slate-800 truncate block" title={inf.role}>
              {inf.role}
            </span>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200/70 shadow-2xs">
            <span className="text-slate-400 block text-[10px]">Pendidikan:</span>
            <span className="font-semibold text-slate-800">{inf.education}</span>
          </div>
        </div>

        {/* Coded Themes List */}
        <div className="p-3.5 max-h-56 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-700">
              Tema Terkoding Aktif ({connectedThemes.length})
            </span>
            <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-semibold">
              Nilai = 1
            </span>
          </div>
          <div className="space-y-1">
            {connectedThemes.map((theme) => (
              <div
                key={theme.id}
                className="p-2 bg-slate-50 rounded border border-slate-100 flex items-start gap-1.5 hover:bg-slate-100 transition text-[11px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 truncate">{theme.label}</div>
                  {theme.description && (
                    <div className="text-[10px] text-slate-400 truncate">{theme.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If Attribute Node
  if (nodeType === 'attribute') {
    return (
      <div
        id="floating-drilldown-card"
        className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-xl shadow-2xl p-4 transition-all duration-300 animate-in slide-in-from-bottom-4"
      >
        <div className="flex items-start justify-between pb-2 border-b border-slate-100 mb-3">
          <div>
            <span className="text-[9px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Atribut Demografis (Value)
            </span>
            <h4 className="font-bold text-sm text-slate-900 mt-1">{selectedNode.label}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-slate-600 space-y-2">
          <div className="bg-purple-50/50 p-2.5 rounded-lg border border-purple-100 text-[11px]">
            <div>
              <span className="text-slate-400">Kategori:</span>{' '}
              <b className="text-slate-800">{selectedNode.category || 'Demografi'}</b>
            </div>
            <div>
              <span className="text-slate-400">Nilai:</span>{' '}
              <b className="text-slate-800">{selectedNode.value || selectedNode.label}</b>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Atribut ini menghubungkan karakteristik personal informan dengan pola koding kualitatif pada matriks kros-tabulasi.
          </p>
        </div>
      </div>
    );
  }

  // If Qualitative Thematic Node or Parent Concept
  const themeNode = qualitativeNodes.find((n) => n.id === selectedNode.id) || selectedNode;
  const isParent = themeNode.category === 'parent_concept';
  const connectedEdges = edges.filter((e) => e.target === themeNode.id && e.type === 'Codes');
  const connectedInfIds = connectedEdges.map((e) => e.source);
  const connectedInfs = informants.filter((i) => connectedInfIds.includes(i.id));

  return (
    <div
      id="floating-drilldown-card"
      className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-4"
    >
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <div>
            <span className="text-[9px] uppercase font-bold text-sky-400 tracking-wider">
              {isParent ? 'Parent Concept' : 'Tema Kualitatif (Node)'}
            </span>
            <h4 className="font-bold text-sm leading-tight text-white">{themeNode.label}</h4>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {themeNode.description && (
          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
            {themeNode.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-500">Frekuensi Kesepakatan Informan:</span>
          <span className="font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
            {connectedInfs.length} / {informants.length} Kasus (
            {Math.round((connectedInfs.length / informants.length) * 100)}%)
          </span>
        </div>

        {connectedInfs.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-700 block">
              Informan yang Menyepakati:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {connectedInfs.map((inf) => (
                <span
                  key={inf.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: inf.avatarColor }}
                  />
                  <span>
                    {inf.name} ({inf.code})
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
