import React from 'react';
import { Informant, QualitativeNode, GraphEdge } from '../types';
import {
  IdCard,
  User,
  Users,
  UserCheck,
  FolderOpen,
  Tags,
  Tag,
  Calendar,
  Briefcase,
  GraduationCap,
  Check,
  ArrowRight,
  X,
  Fingerprint,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface InformantProfileCardProps {
  selectedNode: any | null;
  informants: Informant[];
  qualitativeNodes: QualitativeNode[];
  edges: GraphEdge[];
  onSelectInformant: (id: string) => void;
  onClearSelection: () => void;
}

export const InformantProfileCard: React.FC<InformantProfileCardProps> = ({
  selectedNode,
  informants,
  qualitativeNodes,
  edges,
  onSelectInformant,
  onClearSelection,
}) => {
  // If no node is selected, show an attractive, helpful empty state card with quick informant select buttons
  if (!selectedNode) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[540px]">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm shadow-2xs">
                <IdCard className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Sidebar Profil Informan</h3>
                <p className="text-[11px] text-slate-500">Pilih node pada peta hubungan</p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              Interactive
            </span>
          </div>

          <div className="py-8 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 text-indigo-500 border border-indigo-100/80 mx-auto flex items-center justify-center text-2xl mb-4 shadow-2xs">
              <User className="w-8 h-8 text-indigo-500" />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Belum Ada Node Terpilih</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-6">
              Klik pada salah satu <strong>Node Informan</strong> (lingkaran putih border indigo) pada peta untuk membuka Profile Card lengkap.
            </p>

            <div className="text-left space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Pilih Cepat Informan:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {informants.map((inf) => (
                  <button
                    key={inf.id}
                    onClick={() => onSelectInformant(inf.id)}
                    className="w-full p-2.5 rounded-xl border border-slate-200/70 hover:border-indigo-300 bg-slate-50/60 hover:bg-indigo-50/50 flex items-center justify-between transition group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-2xs shrink-0"
                        style={{ backgroundColor: inf.avatarColor || '#4f46e5' }}
                      >
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-slate-800 group-hover:text-indigo-700 truncate">
                          {inf.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{inf.role}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-indigo-600 bg-white px-2 py-0.5 rounded-md border border-indigo-100 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition">
                      {inf.totalCodedThemes} Tema
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5 text-indigo-500" /> Data tervalidasi NVivo</span>
          <span>5 Kasus</span>
        </div>
      </div>
    );
  }

  const nodeType = selectedNode.nodeType || selectedNode.type;

  // Case 1: Informant Node Selected
  if (nodeType === 'informant') {
    const inf = informants.find((i) => i.id === selectedNode.id) || selectedNode;
    const connectedEdges = edges.filter((e) => e.source === inf.id && e.type === 'Codes');
    const connectedThematicIds = connectedEdges.map((e) => e.target);
    const connectedThemes = qualitativeNodes.filter((n) => connectedThematicIds.includes(n.id));

    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between h-full min-h-[540px] animate-in fade-in duration-200">
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <IdCard className="w-4 h-4" />
              <span>Profile Card Informan</span>
            </div>
            <button
              onClick={onClearSelection}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
              title="Tutup profil"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Profile Banner */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50/50 to-slate-50 p-4 rounded-2xl border border-indigo-100/80 flex items-center gap-3.5 shadow-2xs">
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center text-xl text-white shadow-md shrink-0 ring-4 ring-white"
              style={{ backgroundColor: inf.avatarColor || '#4f46e5' }}
            >
              <User className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md shadow-2xs">
                  {inf.code || 'INF'}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">{inf.gender}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 leading-snug truncate mt-0.5">{inf.name}</h3>
              <p className="text-xs text-indigo-700 font-medium truncate">{inf.role}</p>
            </div>
          </div>

          {/* 4 Demographics Attribute Badges */}
          <div className="grid grid-cols-2 gap-2">
            {/* Gender */}
            <div className="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">
                ⚤
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-medium text-slate-400 block">Gender</span>
                <span className="font-semibold text-xs text-slate-800 truncate block">{inf.gender}</span>
              </div>
            </div>

            {/* Age */}
            <div className="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-medium text-slate-400 block">Kelompok Umur</span>
                <span className="font-semibold text-xs text-slate-800 truncate block">{inf.ageGroup} th</span>
              </div>
            </div>

            {/* Role */}
            <div className="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-medium text-slate-400 block">Peran Utama</span>
                <span className="font-semibold text-xs text-slate-800 truncate block" title={inf.role}>
                  {inf.role}
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="p-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-medium text-slate-400 block">Pendidikan</span>
                <span className="font-semibold text-xs text-slate-800 truncate block">{inf.education}</span>
              </div>
            </div>
          </div>

          {/* Connected Thematic Nodes (Nilai = 1) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Tags className="w-3.5 h-3.5 text-blue-600" />
                Tema Terkoding Aktif
              </span>
              <span className="text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                {connectedThemes.length} / 16 Tema
              </span>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
              {connectedThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="p-2.5 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200/70 hover:border-blue-200 transition flex items-start gap-2 text-xs"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-800 text-xs">{theme.label}</div>
                    {theme.description && (
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{theme.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            Saturasi: <strong>{((connectedThemes.length / 16) * 100).toFixed(0)}%</strong> tema
          </span>
          <button
            onClick={() => onSelectInformant(inf.id)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <span>Fokus di Peta</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  // Case 2: Thematic Node Selected
  if (nodeType === 'theme' || nodeType === 'parent_concept') {
    const isParent = nodeType === 'parent_concept';
    const codedEdges = edges.filter((e) => e.target === selectedNode.id && e.type === 'Codes');
    const informantIds = codedEdges.map((e) => e.source);
    const matchedInformants = informants.filter((inf) => informantIds.includes(inf.id));

    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between h-full min-h-[540px] animate-in fade-in duration-200">
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Tags className="w-4 h-4 text-blue-600" />
              <span>Detail Tema Kualitatif</span>
            </div>
            <button
              onClick={onClearSelection}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Banner */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 p-4 rounded-2xl border border-blue-100 flex items-start gap-3 shadow-2xs">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-md shrink-0">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                  {isParent ? 'Parent Concept (0)' : 'Coded Theme (1)'}
                </span>
                <span className="text-[11px] font-bold text-indigo-700">{matchedInformants.length} Kasus</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{selectedNode.label}</h3>
              {selectedNode.description && (
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedNode.description}</p>
              )}
            </div>
          </div>

          {/* Informants with this Theme */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                Informan Terhubung ({matchedInformants.length})
              </span>
              <span className="text-[10px] text-slate-400">
                Konsensus {((matchedInformants.length / 5) * 100).toFixed(0)}%
              </span>
            </div>

            <div className="space-y-1.5">
              {matchedInformants.map((inf) => (
                <button
                  key={inf.id}
                  onClick={() => onSelectInformant(inf.id)}
                  className="w-full p-2.5 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200/70 hover:border-indigo-200 transition flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-2xs"
                      style={{ backgroundColor: inf.avatarColor || '#4f46e5' }}
                    >
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-800 group-hover:text-indigo-700">
                        {inf.name}
                      </div>
                      <div className="text-[10px] text-slate-500">{inf.role}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                </button>
              ))}

              {matchedInformants.length === 0 && (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                  Node ini adalah kategori konsep tingkat atas (induk) tanpa keterhubungan langsung ke data mentah informan.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Kategori: {selectedNode.category || 'Thematic'}</span>
          <button
            onClick={onClearSelection}
            className="text-indigo-600 font-semibold hover:underline text-xs cursor-pointer"
          >
            Reset Pilihan
          </button>
        </div>
      </div>
    );
  }

  // Case 3: Attribute Node Selected
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-md flex flex-col justify-between h-full min-h-[540px] animate-in fade-in duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider">
            <IdCard className="w-4 h-4" />
            <span>Atribut Demografis</span>
          </div>
          <button
            onClick={onClearSelection}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-lg shadow-md shrink-0">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
              {selectedNode.category || 'Demografi'}
            </span>
            <h3 className="font-bold text-sm text-slate-900">{selectedNode.value || selectedNode.label}</h3>
          </div>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          Node atribut menghubungkan kelompok demografis yang sama untuk menganalisis kecenderungan koding kualitatif lintas segmen informan.
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-right">
        <button
          onClick={onClearSelection}
          className="text-xs font-semibold text-purple-700 hover:underline cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
