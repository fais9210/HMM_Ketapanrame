import React, { useState, useMemo } from 'react';
import { WordFrequencyItem } from '../types';
import { Search, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

interface WordFrequencyViewProps {
  wordList: WordFrequencyItem[];
}

export const WordFrequencyView: React.FC<WordFrequencyViewProps> = ({ wordList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minLength, setMinLength] = useState<number>(3);

  const filteredWords = useMemo(() => {
    return wordList.filter((item) => {
      const matchSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLen = item.length >= minLength;
      return matchSearch && matchLen;
    });
  }, [wordList, searchTerm, minLength]);

  const maxCount = wordList[0]?.count || 148;

  return (
    <div className="space-y-6">
      {/* Top Visual Word Cloud Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-medium text-sm tracking-tight">Visualisasi Word Cloud (NVivo Frequency Query)</h3>
          </div>
          <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
            {wordList.length} Kata Kunci
          </span>
        </div>

        {/* Word Cloud layout simulating the NVivo Word Cloud */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 py-4 px-4 max-w-4xl mx-auto select-none">
          {wordList.slice(0, 48).map((item, index) => {
            // Scale font size based on frequency count
            const sizeWeight = Math.max(12, Math.min(44, Math.round((item.count / maxCount) * 40 + 11)));
            const colorPalette = [
              'text-white font-semibold',
              'text-sky-300 font-medium',
              'text-emerald-400 font-medium',
              'text-amber-300 font-normal',
              'text-indigo-300 font-normal',
              'text-slate-300 font-light',
            ];
            const color = colorPalette[index % colorPalette.length];

            return (
              <span
                key={item.word}
                style={{ fontSize: `${sizeWeight}px` }}
                className={`${color} hover:text-indigo-300 transition-colors cursor-pointer tracking-tight`}
                title={`${item.word}: ${item.count} hits`}
              >
                {item.word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Word Frequency Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <h4 className="font-semibold text-slate-800 text-sm">Tabel Frekuensi Kata</h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-word-freq"
                type="text"
                placeholder="Cari kata..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Min Panjang:</span>
              <select
                id="min-length-select"
                value={minLength}
                onChange={(e) => setMinLength(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs"
              >
                <option value={3}>3 huruf</option>
                <option value={5}>5 huruf</option>
                <option value={7}>7 huruf</option>
                <option value={9}>9 huruf</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/70 sticky top-0 z-10 text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-4">No.</th>
                <th className="py-2.5 px-4">Kata (Word)</th>
                <th className="py-2.5 px-4 text-center">Panjang</th>
                <th className="py-2.5 px-4 text-center">Jumlah (Hits)</th>
                <th className="py-2.5 px-4">Distribusi Bobot</th>
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
                    <td className="py-2 px-4 text-center font-semibold font-mono text-indigo-700">{item.count}</td>
                    <td className="py-2 px-4 w-48">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percentBar}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 text-right font-mono text-slate-500">{item.weightedPercentage}%</td>
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
