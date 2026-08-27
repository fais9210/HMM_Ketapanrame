import React, { useState, useMemo } from 'react';
import { CrosstabMatrixRow, Informant } from '../types';
import { Search, CheckCircle2, XCircle, Table as TableIcon, Filter, Layers } from 'lucide-react';

interface CrosstabMatrixViewProps {
  matrixData: CrosstabMatrixRow[];
  informants: Informant[];
  selectedInformantId: string | null;
  onSelectInformant: (id: string | null) => void;
}

export const CrosstabMatrixView: React.FC<CrosstabMatrixViewProps> = ({
  matrixData,
  informants,
  selectedInformantId,
  onSelectInformant,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryTab, setCategoryTab] = useState<'informants' | 'gender' | 'umur' | 'peran' | 'pendidikan'>('informants');
  const [filterType, setFilterType] = useState<'all' | 'active_only' | 'zero_only'>('active_only');

  // Filtered rows
  const filteredRows = useMemo(() => {
    return matrixData.filter((row) => {
      // Search filter
      const matchesSearch =
        row.nodeLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.nodeId.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Filter type
      if (filterType === 'active_only') return row.category === 'theme';
      if (filterType === 'zero_only') return row.category === 'parent_concept';
      return true;
    });
  }, [matrixData, searchTerm, filterType]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
      {/* Control Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-50 border border-indigo-100 rounded-md flex items-center justify-center text-indigo-600">
            <TableIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-sm tracking-tight text-slate-800">Node Relationship Matrix</h2>
            <p className="text-[11px] text-slate-400">NVivo Crosstab Query &bull; Informan 1-5 vs Tema Kualitatif</p>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-mono font-medium px-2 py-0.5 rounded">
            {filteredRows.length} Nodes
          </span>
        </div>

        {/* View Dimension Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80 text-xs">
          <button
            id="tab-informants"
            onClick={() => setCategoryTab('informants')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              categoryTab === 'informants'
                ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Per Informan (1-5)
          </button>
          <button
            id="tab-gender"
            onClick={() => setCategoryTab('gender')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              categoryTab === 'gender'
                ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Gender
          </button>
          <button
            id="tab-umur"
            onClick={() => setCategoryTab('umur')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              categoryTab === 'umur'
                ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Umur
          </button>
          <button
            id="tab-peran"
            onClick={() => setCategoryTab('peran')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              categoryTab === 'peran'
                ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Peran
          </button>
          <button
            id="tab-pendidikan"
            onClick={() => setCategoryTab('pendidikan')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              categoryTab === 'pendidikan'
                ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Pendidikan
          </button>
        </div>
      </div>

      {/* Secondary Search & Filter Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-nodes-input"
            type="text"
            placeholder="Filter nama node kualitatif..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Filter Kategori:</span>
          <select
            id="filter-node-type-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            <option value="active_only">Hanya Tema Aktif Terkoding (16)</option>
            <option value="all">Semua Node Termasuk Konseptual (29)</option>
            <option value="zero_only">Hanya Node Konseptual Induk (13)</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/70 text-slate-400 border-b border-slate-100 text-[10px] uppercase font-medium tracking-wider">
              <th className="py-3 px-4 min-w-[240px] sticky left-0 bg-slate-50/90 z-10">Thematic Node</th>

              {categoryTab === 'informants' &&
                informants.map((inf) => (
                  <th
                    key={inf.id}
                    className={`py-3 px-3 text-center cursor-pointer transition-colors ${
                      selectedInformantId === inf.id ? 'bg-indigo-50 text-indigo-900 font-bold' : 'hover:bg-slate-100'
                    }`}
                    onClick={() => onSelectInformant(selectedInformantId === inf.id ? null : inf.id)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-slate-900">{inf.name}</span>
                      <span className="text-[9px] font-normal text-slate-400 capitalize">{inf.role}</span>
                    </div>
                  </th>
                ))}

              {categoryTab === 'gender' && (
                <>
                  <th className="py-3 px-3 text-center">Gender = Laki-laki (4)</th>
                  <th className="py-3 px-3 text-center">Gender = Perempuan (1)</th>
                </>
              )}

              {categoryTab === 'umur' && (
                <>
                  <th className="py-3 px-3 text-center">Umur = 26-35 (1)</th>
                  <th className="py-3 px-3 text-center">Umur = 36-45 (2)</th>
                  <th className="py-3 px-3 text-center">Umur = 46-55 (2)</th>
                  <th className="py-3 px-3 text-center">Umur = 56-65 (0)</th>
                </>
              )}

              {categoryTab === 'peran' && (
                <>
                  <th className="py-3 px-3 text-center min-w-[140px]">Ketua BUMDeS (1)</th>
                  <th className="py-3 px-3 text-center min-w-[150px]">Kepala Desa Ketapanrame (1)</th>
                  <th className="py-3 px-3 text-center min-w-[170px]">Ketua KUB Wahana (1)</th>
                  <th className="py-3 px-3 text-center min-w-[140px]">Admin Media Sosial (1)</th>
                  <th className="py-3 px-3 text-center min-w-[130px]">Tenan Pujasera (1)</th>
                </>
              )}

              {categoryTab === 'pendidikan' && (
                <>
                  <th className="py-3 px-3 text-center">Jenjang SMA/SMK (1)</th>
                  <th className="py-3 px-3 text-center">Jenjang S1 (3)</th>
                  <th className="py-3 px-3 text-center">Jenjang S2 (1)</th>
                </>
              )}

              <th className="py-3 px-3 text-center font-bold text-slate-600 bg-slate-100/60">Total Cases</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700">
            {filteredRows.map((row) => {
              const isTheoretical = row.category === 'parent_concept';
              return (
                <tr
                  key={row.nodeId}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    isTheoretical ? 'bg-slate-50/30 text-slate-400' : ''
                  }`}
                >
                  {/* Node Label */}
                  <td className="py-2.5 px-4 font-medium sticky left-0 bg-white z-10 flex items-center gap-2 border-r border-slate-100">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isTheoretical ? 'bg-slate-300' : row.totalCases === 5 ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                    />
                    <span className={isTheoretical ? 'italic text-slate-400' : 'text-slate-700'}>{row.nodeLabel}</span>
                  </td>

                  {/* Informants View */}
                  {categoryTab === 'informants' &&
                    informants.map((inf) => {
                      const val = row.informants[inf.id] ?? 0;
                      const isConnected = val === 1;
                      return (
                        <td
                          key={inf.id}
                          className={`py-2.5 px-3 text-center font-mono text-xs ${
                            selectedInformantId === inf.id ? 'bg-indigo-50/40' : ''
                          }`}
                        >
                          {isConnected ? (
                            <span className="inline-block px-2 py-0.5 bg-indigo-50/70 text-indigo-600 font-bold rounded">
                              1
                            </span>
                          ) : (
                            <span className="text-slate-300 font-normal">
                              0
                            </span>
                          )}
                        </td>
                      );
                    })}

                  {/* Gender View */}
                  {categoryTab === 'gender' && (
                    <>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-medium ${
                            row.genderBreakdown['Laki-laki'] > 0
                              ? 'bg-indigo-50/80 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.genderBreakdown['Laki-laki']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-medium ${
                            row.genderBreakdown['Perempuan'] > 0
                              ? 'bg-indigo-50/80 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.genderBreakdown['Perempuan']}
                        </span>
                      </td>
                    </>
                  )}

                  {/* Umur View */}
                  {categoryTab === 'umur' && (
                    <>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.ageBreakdown['26-35'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.ageBreakdown['26-35']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.ageBreakdown['36-45'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.ageBreakdown['36-45']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.ageBreakdown['46-55'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.ageBreakdown['46-55']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-300">0</td>
                    </>
                  )}

                  {/* Peran View */}
                  {categoryTab === 'peran' && (
                    <>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.roleBreakdown['Ketua BUMDeS'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.roleBreakdown['Ketua BUMDeS']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.roleBreakdown['Kepala Desa Ketapanrame'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.roleBreakdown['Kepala Desa Ketapanrame']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.roleBreakdown['Ketua KUB Wahana Taman Ghanjaran'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.roleBreakdown['Ketua KUB Wahana Taman Ghanjaran']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.roleBreakdown['Admin Media Sosial'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.roleBreakdown['Admin Media Sosial']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.roleBreakdown['Tenan Pujasera'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.roleBreakdown['Tenan Pujasera']}
                        </span>
                      </td>
                    </>
                  )}

                  {/* Pendidikan View */}
                  {categoryTab === 'pendidikan' && (
                    <>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.educationBreakdown['SMA/SMK'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.educationBreakdown['SMA/SMK']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.educationBreakdown['S1'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.educationBreakdown['S1']}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            row.educationBreakdown['S2'] > 0
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {row.educationBreakdown['S2']}
                        </span>
                      </td>
                    </>
                  )}

                  {/* Total Cases */}
                  <td className="py-2.5 px-3 text-center font-mono">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        row.totalCases === 5
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : row.totalCases > 0
                          ? 'bg-slate-100 text-slate-700'
                          : 'text-slate-300'
                      }`}
                    >
                      {row.totalCases}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 font-semibold text-slate-700 border-t border-slate-200 text-xs">
              <td className="py-3 px-4 sticky left-0 bg-slate-50 border-r border-slate-200">Total Tema Terkait</td>
              {categoryTab === 'informants' &&
                informants.map((inf) => (
                  <td key={inf.id} className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                    {inf.totalCodedThemes}
                  </td>
                ))}

              {categoryTab === 'gender' && (
                <>
                  <td className="py-3 px-3 text-center font-mono">4 Inf</td>
                  <td className="py-3 px-3 text-center font-mono">1 Inf</td>
                </>
              )}

              {categoryTab === 'umur' && (
                <>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                  <td className="py-3 px-3 text-center font-mono">2</td>
                  <td className="py-3 px-3 text-center font-mono">2</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-300">0</td>
                </>
              )}

              {categoryTab === 'peran' && (
                <>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                </>
              )}

              {categoryTab === 'pendidikan' && (
                <>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                  <td className="py-3 px-3 text-center font-mono">3</td>
                  <td className="py-3 px-3 text-center font-mono">1</td>
                </>
              )}

              <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700 bg-slate-100">5 Kasus</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
