import React, { useState } from 'react';
import { ProjectMapNode, ProjectMapEdge, ProjectMapNodeType, HmmFlowStep } from '../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  Save,
  Link as LinkIcon,
  Unlink,
  Layers,
  Sparkles,
  Info,
  ShieldAlert,
  Search,
} from 'lucide-react';

interface DataInputMatrixEditorProps {
  nodes: ProjectMapNode[];
  edges: ProjectMapEdge[];
  hmmSteps: HmmFlowStep[];
  onUpdateNodes: (nodes: ProjectMapNode[]) => void;
  onUpdateEdges: (edges: ProjectMapEdge[]) => void;
  onUpdateHmmSteps: (steps: HmmFlowStep[]) => void;
  onResetDefaults: () => void;
}

export const DataInputMatrixEditor: React.FC<DataInputMatrixEditorProps> = ({
  nodes,
  edges,
  hmmSteps,
  onUpdateNodes,
  onUpdateEdges,
  onUpdateHmmSteps,
  onResetDefaults,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'elements' | 'hmm_steps'>('matrix');
  const [matrixFilterSource, setMatrixFilterSource] = useState<string>('all');
  const [matrixFilterTarget, setMatrixFilterTarget] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // New Element Form State
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState<ProjectMapNodeType>('main_theme');
  const [newSubType, setNewSubType] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Toggle or add/remove an edge connection in the matrix
  const handleToggleEdge = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    const existingEdgeIndex = edges.findIndex(
      (e) => (e.source === sourceId && e.target === targetId) || (e.source === targetId && e.target === sourceId)
    );

    if (existingEdgeIndex !== -1) {
      // Remove edge
      const updated = edges.filter((_, i) => i !== existingEdgeIndex);
      onUpdateEdges(updated);
    } else {
      // Add new edge
      const newEdge: ProjectMapEdge = {
        id: `e_${sourceId}_${targetId}_${Date.now()}`,
        source: sourceId,
        target: targetId,
        style: 'solid',
        color: '#1e293b',
      };
      onUpdateEdges([...edges, newEdge]);
    }
  };

  // Add new node element
  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    let color = '#dcfce7';
    let shape: 'ellipse' | 'round-rectangle' = 'ellipse';
    let posX = 400;
    let posY = 400;

    if (newType === 'actor') {
      color = '#dcfce7';
      posX = 150;
      posY = 300 + nodes.filter((n) => n.type === 'actor').length * 70;
    } else if (newType === 'attribute') {
      color = '#f0fdf4';
      posX = 760;
      posY = 50 + nodes.filter((n) => n.type === 'attribute').length * 50;
    } else if (newType === 'main_theme') {
      color = '#dbeafe';
      posX = 450;
      posY = 350;
    } else if (newType === 'supporting_theme') {
      color = '#ffedd5';
      posX = 350;
      posY = 650;
    } else if (newType === 'outcome') {
      color = '#f3e8ff';
      shape = 'round-rectangle';
      posX = 450;
      posY = 830;
    }

    const newNode: ProjectMapNode = {
      id: `custom_${Date.now()}`,
      label: newLabel.trim(),
      type: newType,
      subType: newSubType.trim() || undefined,
      color,
      shape,
      posX,
      posY,
      description: newDesc.trim() || 'Elemen tambahan hasil koding kualitatif.',
    };

    onUpdateNodes([...nodes, newNode]);
    setNewLabel('');
    setNewDesc('');
  };

  // Delete node and its connected edges
  const handleDeleteNode = (nodeId: string) => {
    const updatedNodes = nodes.filter((n) => n.id !== nodeId);
    const updatedEdges = edges.filter((e) => e.source !== nodeId && e.target !== nodeId);
    onUpdateNodes(updatedNodes);
    onUpdateEdges(updatedEdges);
  };

  // Check if edge exists between two nodes
  const isConnected = (idA: string, idB: string) => {
    return edges.some(
      (e) => (e.source === idA && e.target === idB) || (e.source === idB && e.target === idA)
    );
  };

  // Filter nodes for matrix
  const sourceNodes = nodes.filter((n) => {
    if (matrixFilterSource === 'all') return true;
    return n.type === matrixFilterSource;
  });

  const targetNodes = nodes.filter((n) => {
    if (matrixFilterTarget === 'all') return true;
    return n.type === matrixFilterTarget;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header & Sub-navigation */}
      <div className="p-4 sm:p-5 bg-slate-50/95 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <i className="fa-solid fa-table-cells"></i>
          </span>
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
              Input Data Manual & Editor Matriks Relasi
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Kustomisasi elemen Aktor, Atribut, Tema, serta checklist relasi garis (Auto-sync ke Tab 1 & Tab 2)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-tab Pills */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'matrix'
                  ? 'bg-white text-purple-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Matriks Checklist Relasi</span>
            </button>
            <button
              onClick={() => setActiveSubTab('elements')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'elements'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Kelola Elemen Node ({nodes.length})</span>
            </button>
          </div>

          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer"
            title="Kembalikan semua data ke Gambar 1 & Gambar 2 asli"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-160px)]">
        {/* SUBTAB 1: MATRIX CHECKLIST */}
        {activeSubTab === 'matrix' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Filter Baris (Sumber):</span>
                  <select
                    value={matrixFilterSource}
                    onChange={(e) => setMatrixFilterSource(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="all">Semua Tipe ({nodes.length})</option>
                    <option value="actor">Aktor Komunitas</option>
                    <option value="attribute">Atribut Demografis</option>
                    <option value="main_theme">Tema Utama</option>
                    <option value="supporting_theme">Tema Pendukung</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Filter Kolom (Target):</span>
                  <select
                    value={matrixFilterTarget}
                    onChange={(e) => setMatrixFilterTarget(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="all">Semua Tipe ({nodes.length})</option>
                    <option value="main_theme">Tema Utama</option>
                    <option value="supporting_theme">Tema Pendukung</option>
                    <option value="outcome">Hasil / Dampak</option>
                  </select>
                </div>
              </div>

              <span className="text-[11px] text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                <i className="fa-solid fa-circle-check text-purple-500"></i>
                Total {edges.length} Hubungan Garis Aktif
              </span>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-bold sticky left-0 bg-slate-100 z-10 min-w-[170px] border-r border-slate-200">
                      Sumber (Origin) \ Target (Destination)
                    </th>
                    {targetNodes.map((target) => (
                      <th
                        key={target.id}
                        className="p-2.5 font-semibold text-center min-w-[120px] max-w-[140px] border-r border-slate-200"
                      >
                        <div className="truncate" title={target.label.replace('\n', ' ')}>
                          {target.label.replace('\n', ' ')}
                        </div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">
                          {target.type.replace('_', ' ')}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sourceNodes.map((source) => (
                    <tr key={source.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-semibold text-slate-900 sticky left-0 bg-white hover:bg-slate-50 z-10 border-r border-slate-200 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <span
                            className={`w-2.5 h-2.5 rounded-full inline-block mr-1.5 ${
                              source.type === 'actor'
                                ? 'bg-emerald-500'
                                : source.type === 'attribute'
                                ? 'bg-green-400'
                                : source.type === 'main_theme'
                                ? 'bg-blue-500'
                                : source.type === 'supporting_theme'
                                ? 'bg-orange-500'
                                : 'bg-purple-500'
                            }`}
                          ></span>
                          {source.label.replace('\n', ' ')}
                        </div>
                        <span className="text-[9px] text-slate-400 uppercase font-mono shrink-0">
                          {source.type === 'actor' ? 'Aktor' : source.type === 'attribute' ? 'Atribut' : 'Tema'}
                        </span>
                      </td>

                      {targetNodes.map((target) => {
                        const active = isConnected(source.id, target.id);
                        const isSelf = source.id === target.id;

                        return (
                          <td
                            key={target.id}
                            className={`p-2 text-center border-r border-slate-200 ${
                              isSelf ? 'bg-slate-100/60' : active ? 'bg-indigo-50/50' : ''
                            }`}
                          >
                            {isSelf ? (
                              <span className="text-slate-300 font-mono">-</span>
                            ) : (
                              <button
                                onClick={() => handleToggleEdge(source.id, target.id)}
                                className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all cursor-pointer ${
                                  active
                                    ? 'bg-indigo-600 text-white shadow-2xs hover:bg-indigo-700'
                                    : 'bg-slate-100 text-slate-300 hover:bg-slate-200 hover:text-slate-600'
                                }`}
                                title={`${active ? 'Putuskan' : 'Hubungkan'} ${source.label.replace(
                                  '\n',
                                  ' '
                                )} ➔ ${target.label.replace('\n', ' ')}`}
                              >
                                {active ? (
                                  <Check className="w-4 h-4 stroke-[3]" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                                )}
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 2: ELEMENTS MANAGER & ADD NEW ELEMENT */}
        {activeSubTab === 'elements' && (
          <div className="space-y-6">
            {/* Add Node Form Card */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50/70 to-indigo-50/70 border border-purple-200 rounded-2xl shadow-xs">
              <h3 className="font-bold text-sm text-purple-950 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-600" />
                Tambah Elemen / Node Baru ke Riset
              </h3>

              <form onSubmit={handleAddNode} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Label Node (Nama Elemen) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Media Instagram BUMDes"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Kategori Tipe Node *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as ProjectMapNodeType)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="actor">Aktor Komunitas (Lingkaran Hijau Kiri)</option>
                    <option value="attribute">Atribut Demografis (Lingkaran Hijau Kanan)</option>
                    <option value="main_theme">Tema Utama (Lingkaran Biru Tengah)</option>
                    <option value="supporting_theme">Tema Pendukung (Lingkaran Oranye Bawah)</option>
                    <option value="outcome">Hasil / Dampak (Rounded Rectangle Ungu)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Sub-Tipe / Asal Atribut
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Gender, Umur, Peran, Kanal"
                    value={newSubType}
                    onChange={(e) => setNewSubType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Deskripsi Singkat
                  </label>
                  <input
                    type="text"
                    placeholder="Deskripsi peran atau makna koding..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambahkan ke Database Peta</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Existing Elements */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-600" />
                  Daftar Elemen Terdaftar ({nodes.length} Nodes)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {nodes.map((node) => {
                  const connectedCount = edges.filter(
                    (e) => e.source === node.id || e.target === node.id
                  ).length;

                  return (
                    <div
                      key={node.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              node.type === 'actor'
                                ? 'bg-emerald-100 text-emerald-800'
                                : node.type === 'attribute'
                                ? 'bg-green-100 text-green-800'
                                : node.type === 'main_theme'
                                ? 'bg-blue-100 text-blue-800'
                                : node.type === 'supporting_theme'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {node.type.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {connectedCount} Edges
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 leading-snug">
                          {node.label.replace('\n', ' ')}
                        </h4>
                        {node.description && (
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {node.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>ID: {node.id}</span>
                        <button
                          onClick={() => handleDeleteNode(node.id)}
                          className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1 rounded transition cursor-pointer"
                          title="Hapus Elemen & Semua Relasinya"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
