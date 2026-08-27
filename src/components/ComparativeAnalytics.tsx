import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Users, BookOpen, Layers, Award, TrendingUp, Filter } from 'lucide-react';
import { Informant, CrosstabMatrixRow, QualitativeNode } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ComparativeAnalyticsProps {
  informants: Informant[];
  activeInformantIds: string[];
  crosstabMatrix: CrosstabMatrixRow[];
  qualitativeNodes: QualitativeNode[];
}

export const ComparativeAnalytics: React.FC<ComparativeAnalyticsProps> = ({
  informants,
  activeInformantIds,
  crosstabMatrix,
  qualitativeNodes,
}) => {
  const filteredInformants = useMemo(() => {
    return informants.filter((inf) => activeInformantIds.includes(inf.id));
  }, [informants, activeInformantIds]);

  const activeThematicRows = useMemo(() => {
    return crosstabMatrix.filter((row) => row.category === 'theme');
  }, [crosstabMatrix]);

  // Chart 1: Informant vs Thematic Coverage
  const informantBarData = {
    labels: filteredInformants.map((inf) => `${inf.name} (${inf.code})`),
    datasets: [
      {
        label: 'Total Tema Terkoding (Nilai = 1)',
        data: filteredInformants.map((inf) => inf.totalCodedThemes),
        backgroundColor: filteredInformants.map(
          (inf) => inf.avatarColor || 'rgba(99, 102, 241, 0.8)'
        ),
        borderRadius: 6,
      },
    ],
  };

  // Chart 2: Gender Comparison
  const genderData = useMemo(() => {
    const maleInfs = filteredInformants.filter((i) => i.gender === 'Laki-laki');
    const femaleInfs = filteredInformants.filter((i) => i.gender === 'Perempuan');

    const maleAvg =
      maleInfs.length > 0
        ? maleInfs.reduce((acc, curr) => acc + curr.totalCodedThemes, 0) / maleInfs.length
        : 0;
    const femaleAvg =
      femaleInfs.length > 0
        ? femaleInfs.reduce((acc, curr) => acc + curr.totalCodedThemes, 0) / femaleInfs.length
        : 0;

    return {
      labels: [`Laki-laki (${maleInfs.length} Kasus)`, `Perempuan (${femaleInfs.length} Kasus)`],
      datasets: [
        {
          label: 'Rata-rata Tema Terkoding',
          data: [Number(maleAvg.toFixed(1)), Number(femaleAvg.toFixed(1))],
          backgroundColor: ['rgba(59, 130, 246, 0.85)', 'rgba(236, 72, 153, 0.85)'],
          borderRadius: 6,
        },
      ],
    };
  }, [filteredInformants]);

  // Chart 3: Age Group Distribution
  const ageGroupData = useMemo(() => {
    const groups = ['26-35', '36-45', '46-55'];
    const counts = groups.map((grp) => {
      const matched = filteredInformants.filter((i) => i.ageGroup === grp);
      return matched.reduce((sum, i) => sum + i.totalCodedThemes, 0);
    });

    return {
      labels: ['26-35 tahun (1 Kasus)', '36-45 tahun (2 Kasus)', '46-55 tahun (2 Kasus)'],
      datasets: [
        {
          label: 'Total Kumulatif Tema Terkoding',
          data: counts,
          backgroundColor: [
            'rgba(99, 102, 241, 0.85)',
            'rgba(139, 92, 246, 0.85)',
            'rgba(168, 85, 247, 0.85)',
          ],
          borderRadius: 6,
        },
      ],
    };
  }, [filteredInformants]);

  // Chart 4: Education Comparison
  const educationData = useMemo(() => {
    const levels = ['SMA/SMK', 'S1', 'S2'];
    const counts = levels.map((lvl) => {
      const matched = filteredInformants.filter((i) => i.education === lvl);
      return matched.reduce((sum, i) => sum + i.totalCodedThemes, 0);
    });

    return {
      labels: ['SMA/SMK (1 Kasus)', 'S1 (3 Kasus)', 'S2 (1 Kasus)'],
      datasets: [
        {
          label: 'Total Tema Terkoding',
          data: counts,
          backgroundColor: [
            'rgba(245, 158, 11, 0.85)',
            'rgba(16, 185, 129, 0.85)',
            'rgba(59, 130, 246, 0.85)',
          ],
          borderRadius: 6,
        },
      ],
    };
  }, [filteredInformants]);

  // Chart 5: Top Consensus Themes (Highest Case Count across Informants)
  const topConsensusThemes = useMemo(() => {
    const sorted = [...activeThematicRows].sort((a, b) => b.totalCases - a.totalCases);
    return sorted.slice(0, 8);
  }, [activeThematicRows]);

  const consensusChartData = {
    labels: topConsensusThemes.map((t) => t.nodeLabel.substring(0, 24) + '...'),
    datasets: [
      {
        label: 'Jumlah Informan yang Menyepakati (Kasus)',
        data: topConsensusThemes.map((t) => t.totalCases),
        backgroundColor: 'rgba(79, 70, 229, 0.85)',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: 'ui-sans-serif, system-ui', size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2, font: { size: 10 } },
        grid: { color: '#f1f5f9' },
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Kasus Informan Aktif</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{filteredInformants.length} Kasus</div>
          <p className="text-[11px] text-slate-400 mt-1">100% data kualitatif terpetakan</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tema Koding Aktif</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">16 Tema</div>
          <p className="text-[11px] text-slate-400 mt-1">13 Konsep Teoretis / Induk</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Rerata Koding per Informan</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">13.8 Tema</div>
          <p className="text-[11px] text-slate-400 mt-1">Tingkat saturasi tema 86.25%</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Konsensus Tertinggi</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 truncate">5/5 Informan</div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            Medsos, BUMDes, Edukasi Masyarakat
          </p>
        </div>
      </div>

      {/* Grid of Stacked & Comparative Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Informants Thematic Coverage */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">
                1. Distribusi Tema Koding per Informan
              </h3>
              <p className="text-xs text-slate-500">
                Jumlah tema aktif yang disetujui (Nilai = 1) oleh masing-masing informan.
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <Bar data={informantBarData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 2: Gender Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">
                2. Perbandingan Tema Berdasarkan Gender
              </h3>
              <p className="text-xs text-slate-500">
                Laki-laki (4 Kasus: Kades, BUMDes, KUB, Tenan) vs Perempuan (1 Kasus: Admin Medsos).
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <Bar data={genderData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 3: Age Group Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">
                3. Distribusi Tema Berdasarkan Kelompok Usia
              </h3>
              <p className="text-xs text-slate-500">
                Distribusi kumulatif adopsi teknologi dan digitalisasi lintas generasi informan.
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <Bar data={ageGroupData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 4: Education Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">
                4. Distribusi Tema Berdasarkan Jenjang Pendidikan
              </h3>
              <p className="text-xs text-slate-500">
                SMA/SMK (Tenan), S1 (Admin, BUMDes, KUB), dan S2 (Kepala Desa).
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <Bar data={educationData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Chart 5: Top Thematic Consensus Full Width */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-semibold text-sm text-slate-800">
              5. Peringkat Tema Berdasarkan Konsensus Informan (Kasus Terbanyak)
            </h3>
            <p className="text-xs text-slate-500">
              Tema-tema yang paling banyak disetujui bersama oleh informan dalam penelitian kualitatif.
            </p>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-md font-semibold">
            Konsensus Mayoritas &gt;= 4 Kasus
          </span>
        </div>
        <div className="h-64 w-full">
          <Bar data={consensusChartData} options={chartOptions} />
        </div>
      </div>

      {/* Qualitative Research Insights Box */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-sm text-white">
            Sintesis Temuan Crosstab & Rekomendasi Akademik
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-800/70 p-3.5 rounded-lg border border-slate-700/60 space-y-1">
            <span className="font-bold text-amber-400 block">Tingkat Kejenuhan (Saturation):</span>
            <p className="leading-relaxed">
              Informan 2 (Kepala Desa) menguasai 16/16 tema aktif (100%), diikuti Informan 3 (Ketua BUMDes) dan Informan 5 (Tenan) dengan 15/16 tema (93.75%).
            </p>
          </div>
          <div className="bg-slate-800/70 p-3.5 rounded-lg border border-slate-700/60 space-y-1">
            <span className="font-bold text-emerald-400 block">Homogenitas Peran Strategis:</span>
            <p className="leading-relaxed">
              Seluruh jenjang pendidikan (SMA hingga S2) telah mengadopsi transaksi QRIS dan media sosial promosi sebagai pilar digitalisasi BUMDes.
            </p>
          </div>
          <div className="bg-slate-800/70 p-3.5 rounded-lg border border-slate-700/60 space-y-1">
            <span className="font-bold text-sky-400 block">Relevansi Teoretis:</span>
            <p className="leading-relaxed">
              13 Parent/Theoretical Concepts berfungsi sebagai payung epistemologis yang menghubungkan praktik ekonomi digital dengan tata kelola desa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
