import React, { useEffect, useState, useCallback, useMemo } from 'react';

export type HmmStageTransition =
  | '1->2'
  | '2->3'
  | '3->4'
  | '4->5'
  | '5->6'
  | '6->7'
  | '7->8';

export type HmmFlowPaletteKey = 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'slate';

export interface HmmDirectedEdge {
  id: string;
  source: string;
  target: string;
  transition: HmmStageTransition;
  /** Konsensus koding informan NVivo (skala 2 s.d. 5 dari total 5 informan kunci) */
  informantCount: 2 | 3 | 4 | 5;
  label: string;
  defaultColor: HmmFlowPaletteKey;
}

/**
 * Daftar relasi terarah antartahap (Stage 1 -> Stage 8) pada Model HMM BUMDes Ketapanrame.
 * Bobot `informantCount` merepresentasikan konsensus koding empiris NVivo (Crosstab & Matrix Coding)
 * dari 5 informan kunci (INF-01 s.d. INF-05).
 */
export const HMM_DIRECTED_EDGES: HmmDirectedEdge[] = [
  // Tahap 1 (Peran Aktor) -> Tahap 2 (Media / Platform)
  {
    id: 'e-bumdes-wa',
    source: 'actor-ketua-bumdes',
    target: 'media-wa',
    transition: '1->2',
    informantCount: 5,
    label: 'Koordinasi kelembagaan via WhatsApp',
    defaultColor: 'blue',
  },
  {
    id: 'e-bumdes-fb',
    source: 'actor-ketua-bumdes',
    target: 'media-fb',
    transition: '1->2',
    informantCount: 4,
    label: 'Distribusi informasi publik via Facebook',
    defaultColor: 'blue',
  },
  {
    id: 'e-bumdes-av',
    source: 'actor-ketua-bumdes',
    target: 'media-audiovisual',
    transition: '1->2',
    informantCount: 4,
    label: 'Dokumentasi program kelembagaan',
    defaultColor: 'blue',
  },
  {
    id: 'e-bumdes-qris',
    source: 'actor-ketua-bumdes',
    target: 'media-qris',
    transition: '1->2',
    informantCount: 3,
    label: 'Kebijakan pembayaran digital unit usaha',
    defaultColor: 'blue',
  },

  {
    id: 'e-kades-wa',
    source: 'actor-kades',
    target: 'media-wa',
    transition: '1->2',
    informantCount: 5,
    label: 'Komunikasi otoritas & musyawarah via WhatsApp',
    defaultColor: 'emerald',
  },
  {
    id: 'e-kades-av',
    source: 'actor-kades',
    target: 'media-audiovisual',
    transition: '1->2',
    informantCount: 3,
    label: 'Representasi legitimasi pemerintahan desa',
    defaultColor: 'emerald',
  },

  {
    id: 'e-kub-tiktok',
    source: 'actor-ketua-kub',
    target: 'media-tiktok',
    transition: '1->2',
    informantCount: 4,
    label: 'Promosi wahana KUB melalui TikTok',
    defaultColor: 'amber',
  },
  {
    id: 'e-kub-wa',
    source: 'actor-ketua-kub',
    target: 'media-wa',
    transition: '1->2',
    informantCount: 5,
    label: 'Koordinasi kelompok usaha & anggota via WhatsApp',
    defaultColor: 'amber',
  },
  {
    id: 'e-kub-fb',
    source: 'actor-ketua-kub',
    target: 'media-fb',
    transition: '1->2',
    informantCount: 4,
    label: 'Jejaring komunitas wisata di Facebook',
    defaultColor: 'amber',
  },
  {
    id: 'e-kub-av',
    source: 'actor-ketua-kub',
    target: 'media-audiovisual',
    transition: '1->2',
    informantCount: 4,
    label: 'Produksi materi visual aktivitas wahana',
    defaultColor: 'amber',
  },

  {
    id: 'e-admin-tiktok',
    source: 'actor-admin',
    target: 'media-tiktok',
    transition: '1->2',
    informantCount: 5,
    label: 'Pengelolaan utama akun TikTok destinasi',
    defaultColor: 'purple',
  },
  {
    id: 'e-admin-wa',
    source: 'actor-admin',
    target: 'media-wa',
    transition: '1->2',
    informantCount: 5,
    label: 'Koordinasi materi konten & respons cepat',
    defaultColor: 'purple',
  },
  {
    id: 'e-admin-fb',
    source: 'actor-admin',
    target: 'media-fb',
    transition: '1->2',
    informantCount: 4,
    label: 'Publikasi lintas platform ke komunitas luas',
    defaultColor: 'purple',
  },
  {
    id: 'e-admin-av',
    source: 'actor-admin',
    target: 'media-audiovisual',
    transition: '1->2',
    informantCount: 5,
    label: 'Produksi & kurasi konten foto/video pendek',
    defaultColor: 'purple',
  },

  {
    id: 'e-tenan-wa',
    source: 'actor-tenan',
    target: 'media-wa',
    transition: '1->2',
    informantCount: 5,
    label: 'Komunikasi paguyuban tenan & pesanan pelanggan',
    defaultColor: 'rose',
  },
  {
    id: 'e-tenan-qris',
    source: 'actor-tenan',
    target: 'media-qris',
    transition: '1->2',
    informantCount: 3,
    label: 'Penerimaan transaksi non-tunai di pujasera',
    defaultColor: 'rose',
  },
  {
    id: 'e-tenan-av',
    source: 'actor-tenan',
    target: 'media-audiovisual',
    transition: '1->2',
    informantCount: 4,
    label: 'Visualisasi produk kuliner & menu usaha',
    defaultColor: 'rose',
  },

  // Tahap 2 (Media / Platform) -> Tahap 3 (Praktik Komunikasi)
  {
    id: 'e-tiktok-promosi',
    source: 'media-tiktok',
    target: 'comm-promosi',
    transition: '2->3',
    informantCount: 5,
    label: 'Promosi viral destinasi & wahana',
    defaultColor: 'purple',
  },
  {
    id: 'e-tiktok-rep',
    source: 'media-tiktok',
    target: 'comm-representasi',
    transition: '2->3',
    informantCount: 5,
    label: 'Storytelling audio-visual aktivitas desa',
    defaultColor: 'purple',
  },
  {
    id: 'e-tiktok-interaksi',
    source: 'media-tiktok',
    target: 'comm-interaksi',
    transition: '2->3',
    informantCount: 4,
    label: 'Komentar & tanya jawab calon wisatawan',
    defaultColor: 'purple',
  },

  {
    id: 'e-wa-info',
    source: 'media-wa',
    target: 'comm-info',
    transition: '2->3',
    informantCount: 5,
    label: 'Penyebaran pengumuman operasional harian',
    defaultColor: 'emerald',
  },
  {
    id: 'e-wa-koord',
    source: 'media-wa',
    target: 'comm-koordinasi',
    transition: '2->3',
    informantCount: 5,
    label: 'Koordinasi lintas pengurus Pemdes, BUMDes & KUB',
    defaultColor: 'emerald',
  },
  {
    id: 'e-wa-interaksi',
    source: 'media-wa',
    target: 'comm-interaksi',
    transition: '2->3',
    informantCount: 5,
    label: 'Tindak lanjut umpan balik & diskusi dua arah',
    defaultColor: 'emerald',
  },
  {
    id: 'e-wa-partisipasi',
    source: 'media-wa',
    target: 'comm-partisipasi',
    transition: '2->3',
    informantCount: 4,
    label: 'Mobilisasi kehadiran musyawarah & kerja bakti',
    defaultColor: 'emerald',
  },

  {
    id: 'e-fb-info',
    source: 'media-fb',
    target: 'comm-info',
    transition: '2->3',
    informantCount: 4,
    label: 'Informasi kegiatan desa & layanan publik',
    defaultColor: 'blue',
  },
  {
    id: 'e-fb-promosi',
    source: 'media-fb',
    target: 'comm-promosi',
    transition: '2->3',
    informantCount: 4,
    label: 'Promosi acara komunitas & paket wisata',
    defaultColor: 'blue',
  },
  {
    id: 'e-fb-partisipasi',
    source: 'media-fb',
    target: 'comm-partisipasi',
    transition: '2->3',
    informantCount: 4,
    label: 'Dukungan & keterlibatan jejaring warga',
    defaultColor: 'blue',
  },

  {
    id: 'e-qris-transaksi',
    source: 'media-qris',
    target: 'comm-transaksi',
    transition: '2->3',
    informantCount: 3,
    label: 'Fasilitasi pembayaran digital terstandar',
    defaultColor: 'rose',
  },

  {
    id: 'e-av-promosi',
    source: 'media-audiovisual',
    target: 'comm-promosi',
    transition: '2->3',
    informantCount: 5,
    label: 'Daya tarik visual promosi produk & wisata',
    defaultColor: 'amber',
  },
  {
    id: 'e-av-rep',
    source: 'media-audiovisual',
    target: 'comm-representasi',
    transition: '2->3',
    informantCount: 5,
    label: 'Alih wujud aktivitas fisik ke konten digital',
    defaultColor: 'amber',
  },

  // Tahap 3 (Praktik Komunikasi) -> Tahap 4 (Pola Interaksi)
  {
    id: 'e-info-vertikal',
    source: 'comm-info',
    target: 'pattern-vertikal',
    transition: '3->4',
    informantCount: 4,
    label: 'Aliran informasi kebijakan Pemdes-BUMDes',
    defaultColor: 'emerald',
  },
  {
    id: 'e-info-horizontal',
    source: 'comm-info',
    target: 'pattern-horizontal',
    transition: '3->4',
    informantCount: 5,
    label: 'Berbagi informasi antarpengurus & komunitas',
    defaultColor: 'blue',
  },
  {
    id: 'e-koord-vertikal',
    source: 'comm-koordinasi',
    target: 'pattern-vertikal',
    transition: '3->4',
    informantCount: 5,
    label: 'Sinkronisasi keputusan kelembagaan desa',
    defaultColor: 'emerald',
  },
  {
    id: 'e-koord-horizontal',
    source: 'comm-koordinasi',
    target: 'pattern-horizontal',
    transition: '3->4',
    informantCount: 5,
    label: 'Koordinasi operasional BUMDes-KUB-Admin',
    defaultColor: 'blue',
  },
  {
    id: 'e-promosi-ekonomi',
    source: 'comm-promosi',
    target: 'pattern-ekonomi',
    transition: '3->4',
    informantCount: 5,
    label: 'Penghubung promosi unit usaha ke konsumen',
    defaultColor: 'amber',
  },
  {
    id: 'e-promosi-publik',
    source: 'comm-promosi',
    target: 'pattern-publik',
    transition: '3->4',
    informantCount: 5,
    label: 'Diseminasi promosi ke khalayak luas',
    defaultColor: 'purple',
  },
  {
    id: 'e-rep-publik',
    source: 'comm-representasi',
    target: 'pattern-publik',
    transition: '3->4',
    informantCount: 5,
    label: 'Pembentukan citra destinasi di ruang digital',
    defaultColor: 'purple',
  },
  {
    id: 'e-interaksi-horizontal',
    source: 'comm-interaksi',
    target: 'pattern-horizontal',
    transition: '3->4',
    informantCount: 4,
    label: 'Diskusi & umpan balik internal komunitas',
    defaultColor: 'blue',
  },
  {
    id: 'e-interaksi-ekonomi',
    source: 'comm-interaksi',
    target: 'pattern-ekonomi',
    transition: '3->4',
    informantCount: 4,
    label: 'Pelayanan responsif tenan terhadap pengunjung',
    defaultColor: 'rose',
  },
  {
    id: 'e-interaksi-publik',
    source: 'comm-interaksi',
    target: 'pattern-publik',
    transition: '3->4',
    informantCount: 4,
    label: 'Respons admin terhadap ulasan warganet',
    defaultColor: 'purple',
  },
  {
    id: 'e-partisipasi-horizontal',
    source: 'comm-partisipasi',
    target: 'pattern-horizontal',
    transition: '3->4',
    informantCount: 4,
    label: 'Kolaborasi & gotong royong paguyuban warga',
    defaultColor: 'amber',
  },
  {
    id: 'e-transaksi-ekonomi',
    source: 'comm-transaksi',
    target: 'pattern-ekonomi',
    transition: '3->4',
    informantCount: 3,
    label: 'Pertukaran ekonomi digital tenan-konsumen',
    defaultColor: 'rose',
  },

  // Tahap 4 (Pola Interaksi) -> Tahap 5 (Representasi & Informasi Digital)
  {
    id: 'e-vertikal-repinfo',
    source: 'pattern-vertikal',
    target: 'rep-info',
    transition: '4->5',
    informantCount: 4,
    label: 'Transparansi pengumuman & regulasi resmi',
    defaultColor: 'emerald',
  },
  {
    id: 'e-horizontal-repkonten',
    source: 'pattern-horizontal',
    target: 'rep-konten',
    transition: '4->5',
    informantCount: 4,
    label: 'Konten kolaboratif kegiatan komunitas',
    defaultColor: 'blue',
  },
  {
    id: 'e-horizontal-repinfo',
    source: 'pattern-horizontal',
    target: 'rep-info',
    transition: '4->5',
    informantCount: 5,
    label: 'Aksesibilitas informasi jadwal & layanan',
    defaultColor: 'blue',
  },
  {
    id: 'e-ekonomi-repproduk',
    source: 'pattern-ekonomi',
    target: 'rep-produk',
    transition: '4->5',
    informantCount: 5,
    label: 'Katalog produk UMKM, menu & paket wisata',
    defaultColor: 'amber',
  },
  {
    id: 'e-ekonomi-reptransaksi',
    source: 'pattern-ekonomi',
    target: 'rep-transaksi',
    transition: '4->5',
    informantCount: 3,
    label: 'Bukti pembayaran & pencatatan QRIS',
    defaultColor: 'rose',
  },
  {
    id: 'e-publik-repkonten',
    source: 'pattern-publik',
    target: 'rep-konten',
    transition: '4->5',
    informantCount: 5,
    label: 'Reels promosi, edukasi & testimoni pengunjung',
    defaultColor: 'purple',
  },
  {
    id: 'e-publik-repinfo',
    source: 'pattern-publik',
    target: 'rep-info',
    transition: '4->5',
    informantCount: 4,
    label: 'Informasi publik destinasi yang mudah diakses',
    defaultColor: 'purple',
  },

  // Tahap 5 (Representasi Digital) -> Tahap 6 (Visibility & Jangkauan)
  {
    id: 'e-repkonten-vispublik',
    source: 'rep-konten',
    target: 'vis-publik',
    transition: '5->6',
    informantCount: 5,
    label: 'Eksposur konten keluar komunitas lokal',
    defaultColor: 'purple',
  },
  {
    id: 'e-repkonten-viswisatawan',
    source: 'rep-konten',
    target: 'vis-wisatawan',
    transition: '5->6',
    informantCount: 5,
    label: 'Daya tarik visual bagi calon wisatawan luar daerah',
    defaultColor: 'purple',
  },
  {
    id: 'e-repinfo-vispublik',
    source: 'rep-info',
    target: 'vis-publik',
    transition: '5->6',
    informantCount: 5,
    label: 'Keterbukaan informasi meningkatkan visibilitas desa',
    defaultColor: 'blue',
  },
  {
    id: 'e-repproduk-vispasar',
    source: 'rep-produk',
    target: 'vis-pasar',
    transition: '5->6',
    informantCount: 5,
    label: 'Perluasan pasar produk lokal ke skala regional',
    defaultColor: 'amber',
  },
  {
    id: 'e-repproduk-viswisatawan',
    source: 'rep-produk',
    target: 'vis-wisatawan',
    transition: '5->6',
    informantCount: 4,
    label: 'Kemudahan reservasi paket wisata & kuliner',
    defaultColor: 'amber',
  },
  {
    id: 'e-reptransaksi-vispasar',
    source: 'rep-transaksi',
    target: 'vis-pasar',
    transition: '5->6',
    informantCount: 3,
    label: 'Kenyamanan transaksi non-tunai bagi pengunjung modern',
    defaultColor: 'rose',
  },

  // Tahap 6 (Visibility & Jangkauan) -> Tahap 7 & 8 (Downstream)
  {
    id: 'e-vispublik-aktivitas',
    source: 'vis-publik',
    target: 'downstream-aktivitas',
    transition: '6->7',
    informantCount: 4,
    label: 'Visibilitas mendorong partisipasi & kolaborasi sosial',
    defaultColor: 'purple',
  },
  {
    id: 'e-vispublik-legitimasi',
    source: 'vis-publik',
    target: 'downstream-legitimasi',
    transition: '6->7',
    informantCount: 4,
    label: 'Pengakuan publik memperkuat legitimasi BUMDes',
    defaultColor: 'emerald',
  },
  {
    id: 'e-vispasar-aktivitas',
    source: 'vis-pasar',
    target: 'downstream-aktivitas',
    transition: '6->7',
    informantCount: 5,
    label: 'Jangkauan pasar meningkatkan omzet & transaksi tenan',
    defaultColor: 'rose',
  },
  {
    id: 'e-viswisatawan-aktivitas',
    source: 'vis-wisatawan',
    target: 'downstream-aktivitas',
    transition: '6->7',
    informantCount: 5,
    label: 'Lonjakan kunjungan wisatawan menggerakkan ekonomi warga',
    defaultColor: 'amber',
  },
  {
    id: 'e-viswisatawan-legitimasi',
    source: 'vis-wisatawan',
    target: 'downstream-legitimasi',
    transition: '6->7',
    informantCount: 4,
    label: 'Pengalaman positif wisatawan memperkuat reputasi desa',
    defaultColor: 'blue',
  },

  // Tahap 7 -> Tahap 8 (Aktivitas Sosial-Ekonomi -> Kepercayaan & Legitimasi)
  {
    id: 'e-aktivitas-legitimasi',
    source: 'downstream-aktivitas',
    target: 'downstream-legitimasi',
    transition: '7->8',
    informantCount: 4,
    label: 'Manfaat nyata sosial-ekonomi memperkokoh kepercayaan komunitas',
    defaultColor: 'rose',
  },
];

const PALETTE_HEX: Record<HmmFlowPaletteKey, { stroke: string; glow: string; dot: string }> = {
  blue: { stroke: '#2563eb', glow: '#93c5fd', dot: '#1d4ed8' },
  emerald: { stroke: '#059669', glow: '#6ee7b7', dot: '#047857' },
  amber: { stroke: '#d97706', glow: '#fcd34d', dot: '#b45309' },
  purple: { stroke: '#7c3aed', glow: '#c4b5fd', dot: '#6d28d9' },
  rose: { stroke: '#e11d48', glow: '#fda4af', dot: '#be123c' },
  slate: { stroke: '#64748b', glow: '#cbd5e1', dot: '#475569' },
};

function resolveFocusPalette(focusNodeId: string | null): HmmFlowPaletteKey | null {
  if (!focusNodeId) return null;
  if (focusNodeId === 'actor-ketua-bumdes' || focusNodeId === 'media-fb' || focusNodeId.startsWith('rep-info')) {
    return 'blue';
  }
  if (focusNodeId === 'actor-kades' || focusNodeId === 'media-wa' || focusNodeId.startsWith('pattern-')) {
    return 'emerald';
  }
  if (focusNodeId === 'actor-ketua-kub' || focusNodeId.startsWith('comm-')) {
    return 'amber';
  }
  if (
    focusNodeId === 'actor-admin' ||
    focusNodeId === 'media-tiktok' ||
    focusNodeId === 'media-audiovisual' ||
    focusNodeId.startsWith('vis-') ||
    focusNodeId === 'rep-konten'
  ) {
    return 'purple';
  }
  if (
    focusNodeId === 'actor-tenan' ||
    focusNodeId === 'media-qris' ||
    focusNodeId === 'rep-transaksi' ||
    focusNodeId.startsWith('downstream-')
  ) {
    return 'rose';
  }
  return 'blue';
}

export function getStrokeWidthByWeight(informantCount: 2 | 3 | 4 | 5, isActive: boolean): number {
  if (isActive) {
    switch (informantCount) {
      case 5:
        return 3.3;
      case 4:
        return 2.5;
      case 3:
        return 1.85;
      case 2:
        return 1.35;
    }
  } else {
    switch (informantCount) {
      case 5:
        return 1.9;
      case 4:
        return 1.45;
      case 3:
        return 1.1;
      case 2:
        return 0.85;
    }
  }
}

export interface ActiveFlowResolution {
  hasFocus: boolean;
  activeEdgeIds: Set<string>;
  showFeedbackHighlight: boolean;
  activeCount: number;
  avgConsensus: number;
}

export function resolveActiveFlowEdges(
  activeFocusId: string | null,
  isTourOpen: boolean,
  tourHighlightedNodes: string[],
  relationMap: Record<string, string[]>
): ActiveFlowResolution {
  if (isTourOpen) {
    if (tourHighlightedNodes.length === 0) {
      const allIds = new Set(HMM_DIRECTED_EDGES.map((e) => e.id));
      const sum = HMM_DIRECTED_EDGES.reduce((acc, e) => acc + e.informantCount, 0);
      return {
        hasFocus: false,
        activeEdgeIds: allIds,
        showFeedbackHighlight: true,
        activeCount: HMM_DIRECTED_EDGES.length,
        avgConsensus: Number((sum / HMM_DIRECTED_EDGES.length).toFixed(1)),
      };
    }

    const tourSet = new Set(tourHighlightedNodes);
    const bothInSet = HMM_DIRECTED_EDGES.filter(
      (e) => tourSet.has(e.source) && tourSet.has(e.target)
    );

    const chosen =
      bothInSet.length > 0
        ? bothInSet
        : HMM_DIRECTED_EDGES.filter((e) => tourSet.has(e.source) || tourSet.has(e.target));

    const hasDownstream =
      tourSet.has('downstream-legitimasi') || tourSet.has('downstream-aktivitas');
    const hasComm = Array.from(tourSet).some((id) => id.startsWith('comm-'));
    const sum = chosen.reduce((acc, e) => acc + e.informantCount, 0);

    return {
      hasFocus: true,
      activeEdgeIds: new Set(chosen.map((e) => e.id)),
      showFeedbackHighlight: hasDownstream && hasComm,
      activeCount: chosen.length,
      avgConsensus: chosen.length > 0 ? Number((sum / chosen.length).toFixed(1)) : 0,
    };
  }

  if (!activeFocusId) {
    const sum = HMM_DIRECTED_EDGES.reduce((acc, e) => acc + e.informantCount, 0);
    return {
      hasFocus: false,
      activeEdgeIds: new Set<string>(),
      showFeedbackHighlight: false,
      activeCount: HMM_DIRECTED_EDGES.length,
      avgConsensus: Number((sum / HMM_DIRECTED_EDGES.length).toFixed(1)),
    };
  }

  const cluster = new Set<string>([activeFocusId, ...(relationMap[activeFocusId] || [])]);
  const activeEdges = HMM_DIRECTED_EDGES.filter(
    (e) => cluster.has(e.source) && cluster.has(e.target)
  );
  const sum = activeEdges.reduce((acc, e) => acc + e.informantCount, 0);
  const showFeedback =
    activeFocusId === 'downstream-legitimasi' ||
    activeFocusId === 'downstream-aktivitas' ||
    cluster.has('downstream-legitimasi');

  return {
    hasFocus: true,
    activeEdgeIds: new Set(activeEdges.map((e) => e.id)),
    showFeedbackHighlight: showFeedback,
    activeCount: activeEdges.length,
    avgConsensus: activeEdges.length > 0 ? Number((sum / activeEdges.length).toFixed(1)) : 0,
  };
}

interface NodeBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
}

interface MeasuredLayout {
  width: number;
  height: number;
  boxes: Record<string, NodeBox>;
}

const ALL_MEASURED_IDS = [
  'hmm-feedback-banner',
  'hmm-col3-header',
  'hmm-col6-header',
  'actor-ketua-bumdes',
  'actor-kades',
  'actor-ketua-kub',
  'actor-admin',
  'actor-tenan',
  'media-tiktok',
  'media-wa',
  'media-fb',
  'media-qris',
  'media-audiovisual',
  'comm-info',
  'comm-koordinasi',
  'comm-promosi',
  'comm-representasi',
  'comm-interaksi',
  'comm-partisipasi',
  'comm-transaksi',
  'pattern-vertikal',
  'pattern-horizontal',
  'pattern-ekonomi',
  'pattern-publik',
  'rep-konten',
  'rep-info',
  'rep-produk',
  'rep-transaksi',
  'vis-publik',
  'vis-pasar',
  'vis-wisatawan',
  'downstream-aktivitas',
  'downstream-legitimasi',
];

export interface HmmAnimatedFlowOverlayProps {
  stageContainerRef: React.RefObject<HTMLDivElement | null>;
  activeFocusId: string | null;
  isTourOpen: boolean;
  tourHighlightedNodes: string[];
  relationMap: Record<string, string[]>;
  showAmbientAll: boolean;
  useEmpiricalWeights: boolean;
  enableEdgeQuotes?: boolean;
  inspectedEdgeId?: string | null;
  onHoverEdge?: (edgeId: string | null, anchorPoint: { x: number; y: number } | null) => void;
  onClickEdge?: (edgeId: string, anchorPoint: { x: number; y: number }) => void;
}

export const HmmAnimatedFlowOverlay: React.FC<HmmAnimatedFlowOverlayProps> = ({
  stageContainerRef,
  activeFocusId,
  isTourOpen,
  tourHighlightedNodes,
  relationMap,
  showAmbientAll,
  useEmpiricalWeights,
  enableEdgeQuotes = true,
  inspectedEdgeId = null,
  onHoverEdge,
  onClickEdge,
}) => {
  const [layout, setLayout] = useState<MeasuredLayout | null>(null);

  const measureLayout = useCallback(() => {
    const container = stageContainerRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    const unscaledW = container.offsetWidth;
    const unscaledH = container.offsetHeight;
    if (unscaledW === 0 || unscaledH === 0) return;

    const scaleX = cRect.width / unscaledW || 1;
    const scaleY = cRect.height / unscaledH || 1;

    const boxes: Record<string, NodeBox> = {};
    for (const id of ALL_MEASURED_IDS) {
      const el = container.querySelector(`[id="${id}"]`);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const left = (r.left - cRect.left) / scaleX;
      const right = (r.right - cRect.left) / scaleX;
      const top = (r.top - cRect.top) / scaleY;
      const bottom = (r.bottom - cRect.top) / scaleY;
      boxes[id] = {
        left,
        right,
        top,
        bottom,
        centerX: (left + right) / 2,
        centerY: (top + bottom) / 2,
      };
    }

    setLayout({
      width: unscaledW,
      height: unscaledH,
      boxes,
    });
  }, [stageContainerRef]);

  useEffect(() => {
    measureLayout();
    const container = stageContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
    });
    resizeObserver.observe(container);

    const handleWindowResize = () => measureLayout();
    window.addEventListener('resize', handleWindowResize);

    const rafId = window.requestAnimationFrame(() => measureLayout());

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [measureLayout, stageContainerRef]);

  const stagePointToViewport = useCallback(
    (sx: number, sy: number): { x: number; y: number } => {
      const container = stageContainerRef.current;
      if (!container || !layout || layout.width === 0 || layout.height === 0) {
        return { x: sx, y: sy };
      }
      const rect = container.getBoundingClientRect();
      return {
        x: rect.left + (sx / layout.width) * rect.width,
        y: rect.top + (sy / layout.height) * rect.height,
      };
    },
    [stageContainerRef, layout]
  );

  const flowState = useMemo(
    () => resolveActiveFlowEdges(activeFocusId, isTourOpen, tourHighlightedNodes, relationMap),
    [activeFocusId, isTourOpen, tourHighlightedNodes, relationMap]
  );

  const focusPaletteKey = useMemo(() => resolveFocusPalette(activeFocusId), [activeFocusId]);

  const renderedPaths = useMemo(() => {
    if (!layout) return { edges: [], ports: [], feedbackPaths: [] };

    const { boxes } = layout;

    // Hitung urutan port keluar & masuk agar kurva paralel tersusun rapi seperti diagram Sankey
    const outgoingByNode: Record<string, HmmDirectedEdge[]> = {};
    const incomingByNode: Record<string, HmmDirectedEdge[]> = {};

    for (const edge of HMM_DIRECTED_EDGES) {
      if (edge.transition === '6->7' || edge.transition === '7->8') continue;
      if (!outgoingByNode[edge.source]) outgoingByNode[edge.source] = [];
      outgoingByNode[edge.source].push(edge);
      if (!incomingByNode[edge.target]) incomingByNode[edge.target] = [];
      incomingByNode[edge.target].push(edge);
    }

    for (const srcId of Object.keys(outgoingByNode)) {
      outgoingByNode[srcId].sort(
        (a, b) => (boxes[a.target]?.centerY ?? 0) - (boxes[b.target]?.centerY ?? 0)
      );
    }
    for (const tgtId of Object.keys(incomingByNode)) {
      incomingByNode[tgtId].sort(
        (a, b) => (boxes[a.source]?.centerY ?? 0) - (boxes[b.source]?.centerY ?? 0)
      );
    }

    const getPortOffset = (list: HmmDirectedEdge[] | undefined, edgeId: string): number => {
      if (!list || list.length <= 1) return 0;
      const idx = list.findIndex((item) => item.id === edgeId);
      if (idx === -1) return 0;
      const mid = (list.length - 1) / 2;
      return (idx - mid) * 3.2;
    };

    const col6CascadeEdges = HMM_DIRECTED_EDGES.filter((e) => e.transition === '6->7');

    const computedEdges: Array<{
      edge: HmmDirectedEdge;
      d: string;
      isActive: boolean;
      isDimmed: boolean;
      isInspected: boolean;
      paletteKey: HmmFlowPaletteKey;
      strokeColor: string;
      glowColor: string;
      strokeWidth: number;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      midX: number;
      midY: number;
    }> = [];

    const activePortMap = new Map<string, { x: number; y: number; color: string }>();

    for (const edge of HMM_DIRECTED_EDGES) {
      const src = boxes[edge.source];
      const tgt = boxes[edge.target];
      if (!src || !tgt) continue;

      const isInspected = inspectedEdgeId === edge.id;
      const isActive = flowState.hasFocus
        ? flowState.activeEdgeIds.has(edge.id)
        : isTourOpen && tourHighlightedNodes.length === 0;

      if (!isActive && !isInspected && !showAmbientAll && !flowState.hasFocus) {
        continue;
      }

      const isDimmed = flowState.hasFocus && !isActive && !isInspected;
      if (isDimmed && !showAmbientAll) {
        continue;
      }

      let d = '';
      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;
      let midX = 0;
      let midY = 0;

      if (edge.transition === '7->8') {
        startX = src.centerX;
        startY = src.bottom;
        endX = tgt.centerX;
        endY = tgt.top;
        midX = (startX + endX) / 2;
        midY = (startY + endY) / 2;
        d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      } else if (edge.transition === '6->7') {
        const cascadeIdx = col6CascadeEdges.findIndex((c) => c.id === edge.id);
        const arcOffset = 9 + Math.max(0, cascadeIdx) * 2.6;
        startX = src.right;
        startY = src.centerY;
        endX = tgt.right;
        endY = tgt.centerY + (edge.source === 'vis-publik' ? -6 : edge.source === 'vis-wisatawan' ? 6 : 0);
        const outerX = Math.max(startX, endX) + arcOffset;
        midX = 0.125 * (startX + endX) + 0.75 * outerX;
        midY = 0.5 * (startY + endY);
        d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${outerX.toFixed(1)} ${startY.toFixed(1)}, ${outerX.toFixed(1)} ${endY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      } else {
        const srcOff = getPortOffset(outgoingByNode[edge.source], edge.id);
        const tgtOff = getPortOffset(incomingByNode[edge.target], edge.id);
        startX = src.right;
        startY = src.centerY + srcOff;
        endX = tgt.left;
        endY = tgt.centerY + tgtOff;
        const dx = Math.max(12, (endX - startX) * 0.54);
        midX = 0.5 * (startX + endX);
        midY = 0.5 * (startY + endY);
        d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${(startX + dx).toFixed(1)} ${startY.toFixed(1)}, ${(endX - dx).toFixed(1)} ${endY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      }

      const paletteKey: HmmFlowPaletteKey = isInspected
        ? edge.defaultColor
        : isActive
          ? focusPaletteKey || edge.defaultColor
          : showAmbientAll && !flowState.hasFocus
            ? edge.defaultColor
            : 'slate';

      const palette = PALETTE_HEX[paletteKey];
      const baseWeight = useEmpiricalWeights ? edge.informantCount : 4;
      const strokeWidth = getStrokeWidthByWeight(baseWeight, isActive || isInspected);

      computedEdges.push({
        edge,
        d,
        isActive,
        isDimmed,
        isInspected,
        paletteKey,
        strokeColor: palette.stroke,
        glowColor: palette.glow,
        strokeWidth,
        startX,
        startY,
        endX,
        endY,
        midX,
        midY,
      });

      if (isActive || isInspected) {
        activePortMap.set(`${edge.source}-out-${startY.toFixed(0)}`, {
          x: startX,
          y: startY,
          color: palette.dot,
        });
        activePortMap.set(`${edge.target}-in-${endY.toFixed(0)}`, {
          x: endX,
          y: endY,
          color: palette.dot,
        });
      }
    }

    // Urutkan agar jalur tidak aktif digambar di bawah, jalur aktif di tengah, dan jalur terinspeksi paling atas
    computedEdges.sort((a, b) => {
      const scoreA = (a.isInspected ? 2 : 0) + (a.isActive ? 1 : 0);
      const scoreB = (b.isInspected ? 2 : 0) + (b.isActive ? 1 : 0);
      return scoreA - scoreB;
    });

    // Konektor Feedback Loop vertikal pada celah kosong antara Banner Feedback & Header Kolom 6 -> Kolom 3
    const feedbackPaths: Array<{
      id: string;
      d: string;
      isHighlighted: boolean;
      withArrow: boolean;
      midX: number;
      midY: number;
    }> = [];
    const bannerBox = boxes['hmm-feedback-banner'];
    const col3Box = boxes['hmm-col3-header'];
    const col6Box = boxes['hmm-col6-header'];

    if (bannerBox && col3Box && col6Box) {
      const riseD = `M ${col6Box.centerX.toFixed(1)} ${col6Box.top.toFixed(1)} L ${col6Box.centerX.toFixed(1)} ${bannerBox.bottom.toFixed(1)}`;
      const dropD = `M ${col3Box.centerX.toFixed(1)} ${bannerBox.bottom.toFixed(1)} L ${col3Box.centerX.toFixed(1)} ${(col3Box.top - 2).toFixed(1)}`;
      const fbActive =
        inspectedEdgeId === 'e-feedback-loop' ||
        flowState.showFeedbackHighlight ||
        (!flowState.hasFocus && showAmbientAll);
      feedbackPaths.push(
        {
          id: 'fb-rise',
          d: riseD,
          isHighlighted: fbActive,
          withArrow: false,
          midX: col6Box.centerX,
          midY: (col6Box.top + bannerBox.bottom) / 2,
        },
        {
          id: 'fb-drop',
          d: dropD,
          isHighlighted: fbActive,
          withArrow: true,
          midX: col3Box.centerX,
          midY: (bannerBox.bottom + col3Box.top) / 2,
        }
      );
    }

    return {
      edges: computedEdges,
      ports: Array.from(activePortMap.values()),
      feedbackPaths,
    };
  }, [
    layout,
    flowState,
    isTourOpen,
    tourHighlightedNodes.length,
    showAmbientAll,
    focusPaletteKey,
    useEmpiricalWeights,
    inspectedEdgeId,
  ]);

  if (!layout) return null;

  const canInteractEdges = enableEdgeQuotes && !isTourOpen;

  return (
    <svg
      width={layout.width}
      height={layout.height}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className="absolute inset-0 pointer-events-none z-20 overflow-visible"
      aria-label="Visualisasi jalur alir dan kutipan empiris HMM"
    >
      <defs>
        <marker
          id="hmm-feedback-arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
        </marker>
        <marker
          id="hmm-active-arrow-blue"
          viewBox="0 0 10 10"
          refX="7.5"
          refY="5"
          markerWidth="4.2"
          markerHeight="4.2"
          orient="auto"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#2563eb" />
        </marker>
        <marker
          id="hmm-active-arrow-emerald"
          viewBox="0 0 10 10"
          refX="7.5"
          refY="5"
          markerWidth="4.2"
          markerHeight="4.2"
          orient="auto"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#059669" />
        </marker>
        <marker
          id="hmm-active-arrow-amber"
          viewBox="0 0 10 10"
          refX="7.5"
          refY="5"
          markerWidth="4.2"
          markerHeight="4.2"
          orient="auto"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#d97706" />
        </marker>
        <marker
          id="hmm-active-arrow-purple"
          viewBox="0 0 10 10"
          refX="7.5"
          refY="5"
          markerWidth="4.2"
          markerHeight="4.2"
          orient="auto"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#7c3aed" />
        </marker>
        <marker
          id="hmm-active-arrow-rose"
          viewBox="0 0 10 10"
          refX="7.5"
          refY="5"
          markerWidth="4.2"
          markerHeight="4.2"
          orient="auto"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#e11d48" />
        </marker>
      </defs>

      {/* Konektor vertikal Feedback Loop (Tahap 8 -> Banner -> Tahap 3) */}
      {renderedPaths.feedbackPaths.map((fb) => (
        <g key={fb.id}>
          <path
            d={fb.d}
            fill="none"
            stroke="#2563eb"
            strokeWidth={
              inspectedEdgeId === 'e-feedback-loop' ? 2.8 : fb.isHighlighted ? 2 : 1.25
            }
            strokeDasharray="4 4"
            opacity={inspectedEdgeId === 'e-feedback-loop' ? 1 : fb.isHighlighted ? 0.85 : 0.25}
            markerEnd={fb.withArrow ? 'url(#hmm-feedback-arrow)' : undefined}
            className={fb.isHighlighted ? 'hmm-feedback-animated' : ''}
          />
          {canInteractEdges && (
            <path
              d={fb.d}
              fill="none"
              stroke="transparent"
              strokeWidth={12}
              strokeLinecap="butt"
              data-interactive="true"
              data-quote-trigger="true"
              className="no-export pointer-events-auto cursor-pointer"
              onMouseEnter={() =>
                onHoverEdge?.('e-feedback-loop', stagePointToViewport(fb.midX, fb.midY))
              }
              onMouseLeave={() => onHoverEdge?.(null, null)}
              onClick={(e) => {
                e.stopPropagation();
                onClickEdge?.('e-feedback-loop', stagePointToViewport(fb.midX, fb.midY));
              }}
            />
          )}
        </g>
      ))}

      {/* Kurva Bezier Alur Utama Antartahap (Tahap 1 -> Tahap 8) */}
      {renderedPaths.edges.map((item) => {
        const {
          edge,
          d,
          isActive,
          isDimmed,
          isInspected,
          paletteKey,
          strokeColor,
          glowColor,
          strokeWidth,
          midX,
          midY,
        } = item;

        const renderHitTarget = canInteractEdges ? (
          <path
            d={d}
            fill="none"
            stroke="transparent"
            strokeWidth={11}
            strokeLinecap="butt"
            data-interactive="true"
            data-quote-trigger="true"
            className="no-export pointer-events-auto cursor-pointer"
            onMouseEnter={() => onHoverEdge?.(edge.id, stagePointToViewport(midX, midY))}
            onMouseLeave={() => onHoverEdge?.(null, null)}
            onClick={(e) => {
              e.stopPropagation();
              onClickEdge?.(edge.id, stagePointToViewport(midX, midY));
            }}
          />
        ) : null;

        if (isActive || isInspected) {
          const arrowKey = paletteKey === 'slate' ? 'blue' : paletteKey;
          const markerUrl = `url(#hmm-active-arrow-${arrowKey})`;
          const effectiveWidth = isInspected ? strokeWidth + 0.85 : strokeWidth;

          return (
            <g key={edge.id}>
              {/* Lapisan pendaran lembut di bawah jalur aktif */}
              <path
                d={d}
                fill="none"
                stroke={glowColor}
                strokeWidth={effectiveWidth + (isInspected ? 4.8 : 3.2)}
                strokeLinecap="round"
                opacity={isInspected ? 0.62 : 0.38}
              />
              {/* Lapisan dasar solid dengan ketebalan berbobot konsensus informan */}
              <path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={effectiveWidth}
                strokeLinecap="round"
                opacity={isInspected ? 0.65 : 0.42}
                markerEnd={markerUrl}
              />
              {/* Lapisan aliran dinamis bergerak dari hulu ke hilir */}
              <path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={effectiveWidth}
                strokeLinecap="round"
                strokeDasharray="6 6"
                opacity={0.98}
                className="hmm-flow-animated"
              />
              {/* Penanda titik tengah saat garis diinspeksi untuk bukti kutipan */}
              {isInspected && (
                <g className="no-export pointer-events-none">
                  <circle
                    cx={midX}
                    cy={midY}
                    r={6.5}
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth={2}
                  />
                  <circle cx={midX} cy={midY} r={2.3} fill={strokeColor} />
                </g>
              )}
              {renderHitTarget}
            </g>
          );
        }

        // Jalur latar (ambient) atau jalur meredup saat node lain disorot
        const ambientOpacity = isDimmed ? 0.08 : 0.26;
        return (
          <g key={edge.id}>
            <path
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              opacity={ambientOpacity}
            />
            {!isDimmed && (
              <path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={Math.max(0.9, strokeWidth * 0.85)}
                strokeLinecap="round"
                strokeDasharray="4 8"
                opacity={0.32}
                className="hmm-flow-ambient"
              />
            )}
            {renderHitTarget}
          </g>
        );
      })}

      {/* Titik simpul (port anchor) pada tepi kartu yang aktif */}
      {renderedPaths.ports.map((port, idx) => (
        <circle
          key={`port-${idx}`}
          cx={port.x}
          cy={port.y}
          r={2.4}
          fill="#ffffff"
          stroke={port.color}
          strokeWidth={1.6}
        />
      ))}
    </svg>
  );
};
