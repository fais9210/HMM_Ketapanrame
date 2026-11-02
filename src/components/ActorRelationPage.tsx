import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  User,
  Building2,
  Users,
  Smartphone,
  Store,
  RefreshCw,
  Share2,
  TableProperties,
  GitFork,
} from 'lucide-react';
import {
  HmmActorId,
  hmmActorOrder,
  actorRelationsCatalog,
  StageRelationItem,
} from '../data/actorRelationsData';
import {
  informantsData,
  crosstabMatrixData,
  qualitativeNodesData,
} from '../data/crosstabData';

export interface ActorRelationPageProps {
  selectedActorId: HmmActorId;
  onSelectActor: (actorId: HmmActorId) => void;
  onBackToHmmFlow: () => void;
  onOpenProjectMap: (projectMapNodeId: string) => void;
  onOpenCrosstab: (informantId: string) => void;
}

const actorIcons: Record<HmmActorId, React.FC<{ className?: string }>> = {
  'actor-ketua-bumdes': User,
  'actor-kades': Building2,
  'actor-ketua-kub': Users,
  'actor-admin': Smartphone,
  'actor-tenan': Store,
};

export const ActorRelationPage: React.FC<ActorRelationPageProps> = ({
  selectedActorId,
  onSelectActor,
  onBackToHmmFlow,
  onOpenProjectMap,
  onOpenCrosstab,
}) => {
  const [themeFilter, setThemeFilter] = useState<'all' | 'coded' | 'uncoded'>('all');

  const profile = actorRelationsCatalog[selectedActorId] || actorRelationsCatalog['actor-ketua-bumdes'];

  const informant = useMemo(() => {
    return informantsData.find((inf) => inf.id === profile.informantId) || informantsData[0];
  }, [profile.informantId]);

  const activeThemeRows = useMemo(() => {
    const onlyThemes = crosstabMatrixData.filter((row) => row.category === 'theme');
    return onlyThemes.map((row) => {
      const nodeMeta = qualitativeNodesData.find((n) => n.id === row.nodeId);
      const isCoded = row.informants[profile.informantId] === 1;
      return {
        nodeId: row.nodeId,
        label: row.nodeLabel,
        description: nodeMeta?.description || '',
        isCoded,
        totalCases: row.totalCases,
        isFullConsensus: row.totalCases === 5,
      };
    });
  }, [profile.informantId]);

  const codedCount = useMemo(
    () => activeThemeRows.filter((r) => r.isCoded).length,
    [activeThemeRows]
  );

  const uncodedCount = activeThemeRows.length - codedCount;

  const filteredThemeRows = useMemo(() => {
    if (themeFilter === 'coded') return activeThemeRows.filter((r) => r.isCoded);
    if (themeFilter === 'uncoded') return activeThemeRows.filter((r) => !r.isCoded);
    return activeThemeRows;
  }, [activeThemeRows, themeFilter]);

  const totalHmmConnectedNodes =
    profile.stages.mediaPlatforms.length +
    profile.stages.commPractices.length +
    profile.stages.interactionPatterns.length +
    profile.stages.digitalRepresentations.length +
    profile.stages.visibilityReach.length +
    profile.stages.downstreamOutcomes.length +
    profile.stages.empiricalClusters.length;

  const ActiveActorIcon = actorIcons[profile.actorId];

  const renderStageColumn = (
    stepNum: string,
    title: string,
    subtitle: string,
    items: StageRelationItem[]
  ) => (
    <div className="py-5 border-b border-slate-200 last:border-b-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
      <div className="lg:col-span-4 space-y-1">
        <div className="text-xs font-mono text-indigo-700 font-semibold">Tahap {stepNum}</div>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          {subtitle} <span aria-hidden="true">·</span> {items.length} simpul terhubung
        </p>
      </div>

      <div className="lg:col-span-8 divide-y divide-slate-100">
        {items.map((item) => (
          <div key={item.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
            <div className="text-sm font-semibold text-slate-900">{item.label}</div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.mechanism}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Top Navigation & Segmented Actor Role Selector */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToHmmFlow}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>Kembali ke Hybrid Mediatization Mapping (HMM)</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenProjectMap(profile.projectMapNodeId)}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lihat di Peta Relasi Aktor</span>
            </button>
            {false && (
              <button
                type="button"
                onClick={() => onOpenCrosstab(profile.informantId)}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                <TableProperties className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buka Matriks Crosstab</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Actor Switcher */}
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-slate-500">
            Pilih Peran Aktor pada Ekosistem BUMDes Ketapanrame:
          </div>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl w-fit max-w-full">
            {hmmActorOrder.map((actorId) => {
              const item = actorRelationsCatalog[actorId];
              const IconComp = actorIcons[actorId];
              const isActive = actorId === selectedActorId;
              return (
                <button
                  key={actorId}
                  type="button"
                  onClick={() => onSelectActor(actorId)}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <IconComp
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  />
                  <span>{item.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Section: Actor Identity, Structural Role & Key Metrics */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
              <span className="text-indigo-700 font-semibold">{informant.code}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.roleClassification}</span>
              <span aria-hidden="true">·</span>
              <span>Gender: {informant.gender}</span>
              <span aria-hidden="true">·</span>
              <span>Usia: {informant.ageGroup} thn</span>
              <span aria-hidden="true">·</span>
              <span>Pendidikan: {informant.education}</span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <ActiveActorIcon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {profile.shortTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                  {profile.structuralTitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed pt-1">
              {profile.executiveSummary}
            </p>
          </div>

          {/* Clean Tabular Summary Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-8 shrink-0">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 tabular-nums">
                {totalHmmConnectedNodes}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">
                Simpul Relasi
                <br />
                Alur HMM
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-700 tabular-nums">
                {codedCount}/16
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">
                Tema Aktif
                <br />
                NVivo
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700 tabular-nums">
                {profile.interActorRelations.length}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">
                Jalur Relasi
                <br />
                Antar-Aktor
              </div>
            </div>
          </div>
        </div>

        {/* Theoretical Context & Feedback Loop */}
        <div className="pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
              <GitFork className="w-3.5 h-3.5 text-indigo-600" />
              <span>Posisi Teoretis dalam Deep Mediatization</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {profile.theoreticalPosition}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Mekanisme Umpan Balik (Feedback Loop Tahap 8 → Tahap 3)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {profile.feedbackLoopRole}
            </p>
          </div>
        </div>
      </section>

      {/* Section 01: Alur Relasi Lintas Tahap HMM (Gambar 1) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-2">
        <div className="pb-4 border-b border-slate-200 space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            01. Peta Alur Relasi Lintas Tahap HMM (Tahap 2 hingga Tahap 8)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Penjelasan rinci bagaimana peran <strong>{profile.shortTitle}</strong> membentuk rantai mediatisasi dari adopsi platform hingga muara kepercayaan komunitas pada Gambar 1.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {renderStageColumn(
            '02',
            'Infrastruktur Media & Platform Digital',
            'Kanal komunikasi dan instrumen teknologi yang digunakan secara langsung',
            profile.stages.mediaPlatforms
          )}
          {renderStageColumn(
            '03',
            'Praktik Komunikasi Komunitas',
            'Tindakan pertukaran pesan, koordinasi, dan artikulasi kepentingan',
            profile.stages.commPractices
          )}
          {renderStageColumn(
            '04',
            'Pola Interaksi Sosial-Kelembagaan',
            'Struktur arah komunikasi vertikal, horizontal, ekonomi, maupun publik',
            profile.stages.interactionPatterns
          )}
          {renderStageColumn(
            '05',
            'Representasi & Artefak Informasi Digital',
            'Wujud produk informasi, konten visual, dan bukti transaksi yang dihasilkan',
            profile.stages.digitalRepresentations
          )}
          {renderStageColumn(
            '06',
            'Visibilitas & Perluasan Jangkauan',
            'Dampak keterlihatan informasi di ruang publik, pasar, dan calon wisatawan',
            profile.stages.visibilityReach
          )}
          {renderStageColumn(
            '07–08',
            'Muara Aktivitas Sosial-Ekonomi & Legitimasi',
            'Konsekuensi riil terhadap kesejahteraan ekonomi warga dan kepercayaan publik',
            profile.stages.downstreamOutcomes
          )}
          {renderStageColumn(
            'Validasi',
            'Klaster Pembuktian Empiris Riset',
            'Triangulasi metode analisis kualitatif NVivo yang memvalidasi relasi aktor ini',
            profile.stages.empiricalClusters
          )}
        </div>
      </section>

      {/* Section 02: Relasi Antar-Aktor dalam Ekosistem BUMDes */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
        <div className="pb-4 border-b border-slate-200 space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            02. Jejaring Relasi Timbal Balik Antar-Aktor Komunitas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Bagaimana <strong>{profile.shortTitle}</strong> berinteraksi, berbagi informasi, dan berkoordinasi dengan keempat aktor lainnya di Desa Ketapanrame. Klik pada aktor mitra untuk menelusuri perspektif relasinya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profile.interActorRelations.map((rel) => {
            const TargetIcon = actorIcons[rel.targetActorId];
            return (
              <div
                key={rel.targetActorId}
                className="rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                        <TargetIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {rel.targetName}
                        </h3>
                        <p className="text-xs text-slate-500">{rel.targetRoleSubtitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap pt-1 border-t border-slate-100">
                    <span className="font-semibold text-indigo-700">{rel.patternType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px] text-slate-600">{rel.directionLabel}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {rel.relationshipSummary}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
                    {rel.concretePractices.map((prac, idx) => (
                      <li key={idx}>{prac}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectActor(rel.targetActorId);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition cursor-pointer"
                  >
                    <span>Buka Relasi {rel.targetName}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 03: Bukti Koding Tema Kualitatif NVivo */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1 max-w-2xl">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              03. Matriks Validasi Koding Empiris NVivo ({informant.code})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {profile.nonCodedExplanation}
            </p>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setThemeFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                themeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({activeThemeRows.length})
            </button>
            <button
              type="button"
              onClick={() => setThemeFilter('coded')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                themeFilter === 'coded'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terkonfirmasi ({codedCount})
            </button>
            {uncodedCount > 0 && (
              <button
                type="button"
                onClick={() => setThemeFilter('uncoded')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                  themeFilter === 'uncoded'
                    ? 'bg-white text-slate-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Luar Fokus ({uncodedCount})
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500">
                <th className="py-3 pr-4 font-semibold">Tema Kualitatif NVivo</th>
                <th className="py-3 px-4 font-semibold">Deskripsi & Konteks Relasi</th>
                <th className="py-3 pl-4 font-semibold text-right whitespace-nowrap">
                  Konsensus Riset
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredThemeRows.map((row) => (
                <tr key={row.nodeId} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 align-top">
                    {row.label}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 align-top leading-relaxed">
                    {row.description}
                  </td>
                  <td className="py-3.5 pl-4 text-right font-mono text-xs text-slate-600 tabular-nums align-top whitespace-nowrap">
                    {row.totalCases}/5 informan
                    {row.isFullConsensus ? ' · 100%' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
