import React from 'react';
import { Users, FileText, Sparkles, Network } from 'lucide-react';

interface HeaderStatCardsProps {
  totalInformants: number;
  totalActiveThemes: number;
  totalEdges: number;
  totalWordsCorpus: number;
}

export const HeaderStatCards: React.FC<HeaderStatCardsProps> = ({
  totalInformants = 5,
  totalActiveThemes = 16,
  totalEdges = 89,
  totalWordsCorpus = 5420,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Informan Stat Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Subjek Informan
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{totalInformants}</span>
            <span className="text-xs font-semibold text-slate-500">Kasus</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>1 Perempuan &bull; 4 Laki-laki</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-2xs shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Total Kata (Corpus) Stat Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Kata Corpus
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{totalWordsCorpus.toLocaleString()}</span>
            <span className="text-xs font-semibold text-slate-500">Kata</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>580 Frekuensi Kata Terindeks</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-2xs shrink-0">
          <FileText className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Tema / Nodes Stat Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Tema Kualitatif
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{totalActiveThemes}</span>
            <span className="text-xs font-semibold text-slate-500">Tema Aktif</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>8 Konsensus Penuh (100%)</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shadow-2xs shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* 4. Total Relasi / Edges Stat Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Relasi Kros-Tabulasi
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{totalEdges}</span>
            <span className="text-xs font-semibold text-slate-500">Edges</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>69 Codes &bull; 20 Value</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-2xs shrink-0">
          <Network className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
