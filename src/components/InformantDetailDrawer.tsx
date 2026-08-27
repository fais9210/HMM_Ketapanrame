import React from 'react';
import { Informant, QualitativeNode, GraphEdge } from '../types';
import { User, Briefcase, GraduationCap, Calendar, Tag, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface InformantDetailProps {
  informant: Informant | null;
  allNodes: QualitativeNode[];
  edges: GraphEdge[];
  onClose: () => void;
  onSelectTheme: (themeId: string) => void;
}

export const InformantDetailDrawer: React.FC<InformantDetailProps> = ({
  informant,
  allNodes,
  edges,
  onClose,
  onSelectTheme,
}) => {
  if (!informant) return null;

  // Find all coded themes for this informant
  const codedThemeEdges = edges.filter((e) => e.source === informant.id && e.type === 'Codes');
  const codedThemeIds = new Set(codedThemeEdges.map((e) => e.target));
  const codedThemes = allNodes.filter((n) => codedThemeIds.has(n.id));

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 bg-white border-b border-slate-200 text-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center font-bold text-xs text-white shadow-2xs"
            style={{ backgroundColor: informant.avatarColor }}
          >
            {informant.code}
          </div>
          <div>
            <h3 className="font-semibold text-base leading-tight text-slate-900">{informant.name}</h3>
            <p className="text-xs text-indigo-600 font-medium">{informant.role}</p>
          </div>
        </div>

        <button
          id="close-drawer-btn"
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Demographic Attributes Grid */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Atribut Demografis (Value Edges)</h4>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Gender</span>
            </div>
            <div className="font-semibold text-slate-800">{informant.gender}</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>Kelompok Umur</span>
            </div>
            <div className="font-semibold text-slate-800">{informant.ageGroup} tahun</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
              <span>Peran</span>
            </div>
            <div className="font-semibold text-slate-800 leading-tight">{informant.role}</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Pendidikan</span>
            </div>
            <div className="font-semibold text-slate-800">{informant.education}</div>
          </div>
        </div>
      </div>

      {/* Coded Qualitative Themes */}
      <div className="flex-1 p-5 overflow-y-auto space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Node & Tema Terkoneksi ({codedThemes.length})
          </h4>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-medium">
            Nilai = 1 (Active)
          </span>
        </div>

        <div className="space-y-2">
          {codedThemes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-800 group-hover:text-indigo-600">
                    {theme.label}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-0.5" />
              </div>
              {theme.description && (
                <p className="text-[11px] text-slate-400 mt-1 pl-3.5 leading-relaxed">{theme.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
