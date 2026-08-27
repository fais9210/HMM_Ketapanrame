import React from 'react';
import { Informant, QualitativeNode, WordFrequencyItem } from '../types';
import logoImg from '../assets/images/bumdes_hmm_logo_1787789361564.jpg';

interface PrintableReportViewProps {
  informants: Informant[];
  qualitativeNodes: QualitativeNode[];
  wordList: WordFrequencyItem[];
  totalEdges: number;
}

export const PrintableReportView: React.FC<PrintableReportViewProps> = ({
  informants,
  qualitativeNodes,
  wordList,
  totalEdges,
}) => {
  return (
    <div
      id="printable-report-container"
      className="hidden print:block bg-white text-slate-900 font-sans p-8 max-w-[210mm] mx-auto space-y-6"
      style={{ minHeight: '297mm' }}
    >
      {/* 1. Header Laporan Resmi */}
      <div className="border-b-2 border-indigo-900 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white border border-slate-300 p-1 flex items-center justify-center shrink-0">
            <img
              src={logoImg}
              alt="Logo HMM BUMDes Ketapanrame"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase">
              Laporan Riset Kualitatif &bull; Dokumen Resmi
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame
            </h1>
            <p className="text-xs text-slate-600">
              Kros-Tabulasi Karakteristik 5 Informan, Matriks 29 Nodes Tematik, dan Analisis Frekuensi Kata
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-slate-500 shrink-0">
          <span className="inline-block px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded font-bold text-[10px]">
            DOKUMEN RESMI
          </span>
          <p className="mt-1 text-[10px] font-mono">
            Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* 2. Ringkasan Eksekutif & Statistik Kasus */}
      <div className="grid grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
        <div className="p-2 border-r border-slate-200">
          <div className="text-lg font-bold text-indigo-700">{informants.length}</div>
          <div className="text-[10px] font-semibold text-slate-600 uppercase">Subjek Informan</div>
        </div>
        <div className="p-2 border-r border-slate-200">
          <div className="text-lg font-bold text-purple-700">10</div>
          <div className="text-[10px] font-semibold text-slate-600 uppercase">Atribut Profil</div>
        </div>
        <div className="p-2 border-r border-slate-200">
          <div className="text-lg font-bold text-blue-700">16</div>
          <div className="text-[10px] font-semibold text-slate-600 uppercase">Tema Kualitatif</div>
        </div>
        <div className="p-2">
          <div className="text-lg font-bold text-emerald-700">{totalEdges}</div>
          <div className="text-[10px] font-semibold text-slate-600 uppercase">Total Relasi (Edges)</div>
        </div>
      </div>

      {/* 3. Profil 5 Informan Kunci */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <i className="fa-solid fa-user-circle text-indigo-600"></i>
          1. Profil Informan Kunci (Subjek Penelitian)
        </h2>
        <table className="w-full text-left text-xs border border-slate-200 border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <th className="p-2 border-r border-slate-200">Kode</th>
              <th className="p-2 border-r border-slate-200">Nama Informan</th>
              <th className="p-2 border-r border-slate-200">Peran / Jabatan</th>
              <th className="p-2 border-r border-slate-200">Pendidikan</th>
              <th className="p-2 border-r border-slate-200">Gender</th>
              <th className="p-2">Kelompok Umur</th>
            </tr>
          </thead>
          <tbody>
            {informants.map((inf, idx) => (
              <tr key={inf.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                <td className="p-1.5 font-mono font-bold text-indigo-700 border-r border-slate-200 text-[11px]">
                  {inf.code}
                </td>
                <td className="p-1.5 font-semibold text-slate-900 border-r border-slate-200">
                  {inf.name}
                </td>
                <td className="p-1.5 text-slate-700 border-r border-slate-200">{inf.role}</td>
                <td className="p-1.5 text-slate-700 border-r border-slate-200">{inf.education}</td>
                <td className="p-1.5 text-slate-700 border-r border-slate-200">{inf.gender}</td>
                <td className="p-1.5 text-slate-700">{inf.ageGroup} tahun</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Peta Relasi Konsentris (Concentric Structure Description) */}
      <div className="space-y-2 pt-2 page-break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <i className="fa-solid fa-circle-nodes text-indigo-600"></i>
          2. Struktur Peta Relasi Konsentris (3 Ring Zonasi)
        </h2>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-lg">
            <div className="font-bold text-indigo-900 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
              Pusat: 5 Informan
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Bentuk Ellipse putih dengan border indigo tebal. Node utama subjek penelitian.
            </p>
          </div>
          <div className="p-2.5 bg-purple-50/70 border border-purple-200 rounded-lg">
            <div className="font-bold text-purple-900 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rotate-45 bg-purple-600 inline-block"></span>
              Tengah: 10 Atribut
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Bentuk Diamond ungu. Menghubungkan demografi (Gender, Umur, Peran, Pendidikan).
            </p>
          </div>
          <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg">
            <div className="font-bold text-blue-900 flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-blue-600 inline-block"></span>
              Luar: 16 Tema Kualitatif
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Bentuk Rounded-Rectangle biru. Terdiri dari tema inti operasional BUMDes.
            </p>
          </div>
        </div>
      </div>

      {/* 5. 8 Tema Konsensus Mutlak (100% Validitas Silang) */}
      <div className="space-y-2 pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <i className="fa-solid fa-check-double text-emerald-600"></i>
          3. Temuan Konsensus Mutlak (5 dari 5 Informan - 100% Kasus)
        </h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {qualitativeNodes
            .filter((n) => n.caseCount === 5)
            .map((node) => (
              <div
                key={node.id}
                className="p-2 bg-emerald-50/60 border border-emerald-200 rounded-lg flex items-start justify-between"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-emerald-950 text-[11px]">{node.label}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5 line-clamp-1">
                    {node.description}
                  </div>
                </div>
                <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold shrink-0">
                  5/5 Kasus (100%)
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* 6. Analisis Lexical (Top 15 Frekuensi Kata Kunci) */}
      <div className="space-y-2 pt-2 page-break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 border-b border-slate-200 pb-1">
          <i className="fa-solid fa-font text-amber-600"></i>
          4. Analisis Leksikal & Frekuensi Kata (Word Frequency Query)
        </h2>
        <div className="grid grid-cols-5 gap-1.5 text-xs">
          {wordList.slice(0, 15).map((w, idx) => (
            <div
              key={w.word}
              className="p-1.5 bg-slate-50 border border-slate-200 rounded flex items-center justify-between"
            >
              <div className="truncate">
                <span className="text-[10px] text-slate-400 font-mono mr-1">#{idx + 1}</span>
                <span className="font-semibold text-slate-800 text-[11px]">{w.word}</span>
              </div>
              <span className="font-mono font-bold text-indigo-700 text-[10px] ml-1">
                {w.count}x
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Footer Tanda Tangan & Otorisasi */}
      <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 page-break-inside-avoid">
        <div>
          <p className="font-bold text-slate-800">Tim Peneliti Kualitatif</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Laboratorium Data Riset Sosial & Kelembagaan</p>
        </div>
        <div className="text-right">
          <div className="h-10"></div>
          <p className="font-bold text-slate-900 underline">Koordinator Riset & Analisis</p>
          <p className="text-[10px] text-slate-400 font-mono">ID Validasi: NV-CROSSTAB-2024-BUMDES</p>
        </div>
      </div>
    </div>
  );
};
