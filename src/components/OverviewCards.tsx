import React from 'react';
import { Users, Layers, Sparkles, Network, Activity } from 'lucide-react';
import { Informant } from '../types';

interface OverviewCardsProps {
  informants: Informant[];
  selectedInformantId: string | null;
  onSelectInformant: (id: string | null) => void;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  informants,
  selectedInformantId,
  onSelectInformant,
}) => {
  return (
    <div className="space-y-4">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Informants Stat */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Subjek Informan</span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-600">
              Crosstab
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-light text-slate-900">5 <span className="text-sm font-normal text-slate-500">Kasus</span></span>
            <span className="text-xs text-slate-400 font-normal">(1 P, 4 L)</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>100% data demografis tervalidasi</span>
          </div>
        </div>

        {/* Qualitative Nodes */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tema & Node Koding</span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-600">
              NVivo
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-light text-slate-900">16 <span className="text-sm font-normal text-slate-500">Tema Aktif</span></span>
            <span className="text-xs text-slate-400 font-normal">/ 29 Total</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span>13 Node Induk Konseptual</span>
          </div>
        </div>

        {/* Deep Indigo Graph Analytics Card */}
        <div className="bg-indigo-900 rounded-xl p-4 text-white flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-indigo-200 text-[10px] uppercase font-bold tracking-widest">Graph Analytics</span>
            <span className="text-[10px] bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded font-mono">
              69+20
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-light">89 <span className="text-xs text-indigo-300">Active Edges</span></p>
            </div>
            {/* Minimalist sparkline bars */}
            <div className="h-8 flex items-end gap-1 w-24">
              <div className="w-full bg-indigo-500/30 h-3 rounded-t-xs" title="INF 4: 10"></div>
              <div className="w-full bg-indigo-500/50 h-5 rounded-t-xs" title="INF 1: 13"></div>
              <div className="w-full bg-indigo-400 h-6 rounded-t-xs" title="INF 3: 15"></div>
              <div className="w-full bg-indigo-300 h-6 rounded-t-xs" title="INF 5: 15"></div>
              <div className="w-full bg-white h-8 rounded-t-xs" title="INF 2: 16"></div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-800/80 text-[11px] text-indigo-200 flex items-center justify-between">
            <span>69 Codes Relasi</span>
            <span className="text-indigo-300 font-mono">20 Value Atribut</span>
          </div>
        </div>

        {/* Word Frequency Highlight */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Top Word Frequency</span>
            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">
              148 hits
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-light text-slate-900 tracking-tight">"digital"</span>
            <span className="text-xs text-slate-400 font-normal">(1.44%)</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>"bumdes" (126x), "informan" (84x)</span>
          </div>
        </div>
      </div>

      {/* Informants Minimalist Attribute Quick-Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Filter Kasus Informan:</span>
          <button
            id="clear-informant-filter"
            onClick={() => onSelectInformant(null)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedInformantId === null
                ? 'bg-slate-800 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua (5)
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {informants.map((inf) => {
            const isSelected = selectedInformantId === inf.id;
            return (
              <button
                key={inf.id}
                id={`filter-inf-${inf.id}`}
                onClick={() => onSelectInformant(isSelected ? null : inf.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-1 ring-indigo-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: inf.avatarColor }}
                />
                <span className="font-semibold">{inf.name}</span>
                <span className="text-[11px] text-slate-400 font-normal">({inf.role})</span>
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono text-[10px] font-medium">
                  {inf.totalCodedThemes}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
