import React, { useState, useMemo } from 'react';
import { Sparkles, Search, TrendingUp, Download, ArrowUpDown, Filter, HelpCircle } from 'lucide-react';
import { WordFrequencyItem } from '../types';

interface LexicalAnalysisProps {
  wordList: WordFrequencyItem[];
}

export const LexicalAnalysis: React.FC<LexicalAnalysisProps> = ({ wordList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minLength, setMinLength] = useState<number>(3);
  const [sortBy, setSortBy] = useState<'count' | 'word' | 'length'>('count');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const maxCount = useMemo(() => {
    return Math.max(...wordList.map((w) => w.count), 1);
  }, [wordList]);

  const filteredWords = useMemo(() => {
    return wordList
      .filter((item) => {
        if (item.length < minLength) return false;
        if (searchTerm.trim() && !item.word.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'count') {
          return sortOrder === 'desc' ? b.count - a.count : a.count - b.count;
        }
        if (sortBy === 'length') {
          return sortOrder === 'desc' ? b.length - a.length : a.length - b.length;
        }
        return sortOrder === 'desc'
          ? b.word.localeCompare(a.word)
          : a.word.localeCompare(b.word);
      });
  }, [wordList, searchTerm, minLength, sortBy, sortOrder]);

  const toggleSort = (type: 'count' | 'word' | 'length') => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  const handleExportCsv = () => {
    const headers = ['No', 'Word', 'Length', 'Count', 'WeightedPercentage'];
    const rows = filteredWords.map((w, idx) => [
      idx + 1,
      `"${w.word}"`,
      w.length,
      w.count,
      `"${w.weightedPercentage}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'nvivo_word_frequency_lexical.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Visual Word Cloud Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-medium text-sm tracking-tight">
              Visualisasi Word Cloud Semantik (NVivo Word Frequency Query)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              {wordList.length} Kata Kunci Substansial
            </span>
            <span className="text-[10px] font-mono bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded">
              Stop-words Filtered
            </span>
          </div>
        </div>

        {/* Word Cloud layout */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 py-4 px-4 max-w-4xl mx-auto select-none min-h-[220px]">
          {wordList.slice(0, 50).map((item, index) => {
            const sizeWeight = Math.max(
              12,
              Math.min(46, Math.round((item.count / maxCount) * 42 + 12))
            );
            const colorPalette = [
              'text-white font-semibold',
              'text-sky-300 font-medium',
              'text-emerald-400 font-medium',
              'text-amber-300 font-normal',
              'text-indigo-300 font-normal',
              'text-cyan-200 font-light',
            ];
            const color = colorPalette[index % colorPalette.length];
            const isSelected = selectedWord === item.word;

            return (
              <button
                key={item.word}
                onClick={() => {
                  setSelectedWord(isSelected ? null : item.word);
                  setSearchTerm(isSelected ? '' : item.word);
                }}
                style={{ fontSize: `${sizeWeight}px` }}
                className={`${color} hover:text-amber-300 transition-all cursor-pointer tracking-tight ${
                  isSelected ? 'ring-2 ring-amber-400 px-2 py-0.5 rounded-md bg-slate-800' : ''
                }`}
                title={`${item.word}: ${item.count} hits (${item.weightedPercentage})`}
              >
                {item.word}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>*Ukuran teks proporsional dengan frekuensi kemunculan dalam transkrip wawancara.</span>
          {selectedWord && (
            <button
              onClick={() => {
                setSelectedWord(null);
                setSearchTerm('');
              }}
              className="text-amber-400 hover:underline"
            >
              Hapus Sorotan Kata "{selectedWord}"
            </button>
          )}
        </div>
      </div>

      {/* Word Frequency Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <h4 className="font-semibold text-slate-800 text-sm">
              Tabel Frekuensi Kata (Lexical Frequency Matrix)
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
              <input
                id="lexical-search-input"
                type="text"
                placeholder="Cari kata kunci..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            {/* Min Length Filter */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Min Panjang:</span>
              <select
                id="lexical-min-length"
                value={minLength}
                onChange={(e) => setMinLength(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs"
              >
                <option value={3}>3 huruf</option>
                <option value={5}>5 huruf</option>
                <option value={7}>7 huruf</option>
              </select>
            </div>

            {/* Export CSV */}
            <button
              id="export-lexical-csv"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/70 sticky top-0 z-10 text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-4 w-12">No.</th>
                <th
                  onClick={() => toggleSort('word')}
                  className="py-2.5 px-4 cursor-pointer hover:text-slate-700"
                >
                  <div className="flex items-center gap-1">
                    <span>Kata (Word)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('length')}
                  className="py-2.5 px-4 text-center cursor-pointer hover:text-slate-700"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Panjang</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('count')}
                  className="py-2.5 px-4 text-center cursor-pointer hover:text-slate-700"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Jumlah (Hits)</span>
                    <ArrowUpDown className="w-3 h-3 text-indigo-600" />
                  </div>
                </th>
                <th className="py-2.5 px-4">Distribusi Bobot Semantik</th>
                <th className="py-2.5 px-4 text-right">Weighted %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredWords.map((item, idx) => {
                const percentBar = Math.min(100, Math.round((item.count / maxCount) * 100));
                return (
                  <tr key={item.word} className="hover:bg-slate-50/60">
                    <td className="py-2 px-4 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2 px-4 font-medium text-slate-800">{item.word}</td>
                    <td className="py-2 px-4 text-center text-slate-500 font-mono">{item.length}</td>
                    <td className="py-2 px-4 text-center font-semibold font-mono text-indigo-700">
                      {item.count}
                    </td>
                    <td className="py-2 px-4 w-48">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percentBar}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 text-right font-mono text-slate-500 font-medium">
                      {item.weightedPercentage}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
