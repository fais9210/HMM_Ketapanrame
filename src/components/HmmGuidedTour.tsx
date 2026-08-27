import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Layers,
  RotateCcw,
  Presentation,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export interface TourStep {
  stepNumber: number;
  phaseTitle: string;
  title: string;
  targetNodeIds: string[];
  academicNarration: string;
  keyInsights: string[];
  nvivoEvidence: string;
  accentColor: string; // 'blue' | 'emerald' | 'amber' | 'purple' | 'rose'
}

export const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    phaseTitle: 'Pengantar Model Riset',
    title: 'Model Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame',
    targetNodeIds: [],
    academicNarration:
      'Model HMM ini memetakan bagaimana transformasi digital tidak sekadar diposisikan sebagai alat bantu pemasaran teknis, melainkan telah melebur secara mendalam (deep mediatization) dalam struktur kelembagaan, interaksi antaraktor desa, dan aktivitas ekonomi BUMDes Ketapanrame.',
    keyInsights: [
      'Memetakan 6 pilar proses mediatisasi dari hulu (aktor) hingga hilir (legitimasi).',
      'Diperkuat triangulasi data kualitatif NVivo: Crosstab, Word Similarity, dan Matrix Coding.',
      'Menjelaskan terbentuknya infrastruktur sosial digital yang berkelanjutan di desa wisata.',
    ],
    nvivoEvidence: 'Integrasi koding 5 informan kunci, 17 tema koding, dan 4 kategori peran kelembagaan desa.',
    accentColor: 'blue',
  },
  {
    stepNumber: 2,
    phaseTitle: 'Tahap 1: Peran Aktor',
    title: 'Diferensiasi Peran Berbasis Struktur (Role-Based Actors)',
    targetNodeIds: [
      'actor-ketua-bumdes',
      'actor-kades',
      'actor-ketua-kub',
      'actor-admin',
      'actor-tenan',
      'emp-crosstab',
    ],
    academicNarration:
      'Temuan Crosstab membuktikan bahwa variasi praktik komunikasi di desa tidak ditentukan oleh usia, jenis kelamin, atau latar pendidikan, melainkan oleh peran fungsional aktor (role-based). Setiap aktor memiliki lokus tanggung jawab yang spesifik dalam ekosistem.',
    keyInsights: [
      'Kepala Desa: Memberikan payung legitimasi, otoritas regulatif, dan dukungan kelembagaan.',
      'Ketua BUMDes: Pengendali tata kelola kelembagaan, koordinasi operasional, dan arah kebijakan unit usaha.',
      'Ketua KUB & Tenan: Motor penggerak ekonomi komunitas di lapangan dan interaksi langsung dengan konsumen.',
      'Admin Medsos: Mediator digital yang memproduksi representasi dan mendistribusikan wacana publik.',
    ],
    nvivoEvidence: 'Hasil Crosstab Query NVivo: Nilai Pearson Correlation antarkategori peran menunjukkan konvergensi fungsi yang terkoordinasi.',
    accentColor: 'blue',
  },
  {
    stepNumber: 3,
    phaseTitle: 'Tahap 2: Media / Platform',
    title: 'Infrastruktur Digital & Ekologi Media Hibrida',
    targetNodeIds: [
      'media-tiktok',
      'media-wa',
      'media-fb',
      'media-qris',
      'media-audiovisual',
      'emp-evidence',
    ],
    academicNarration:
      'BUMDes Ketapanrame mengadopsi ekologi media hibrida (hybrid media ecology). WhatsApp menjadi tulang punggung koordinasi internal, TikTok dan Facebook sebagai saluran storytelling & diseminasi publik, sementara QRIS menjadi infrastruktur transaksi finansial tanpa uang tunai.',
    keyInsights: [
      'WhatsApp: Koordinasi vertikal (Pemdes-BUMDes) dan horizontal (BUMDes-KUB-Tenan).',
      'TikTok & Facebook: Media ekspresi identitas desa wisata dan daya tarik promosi audio-visual.',
      'QRIS: Menjembatani komunikasi promosi produk langsung ke transaksi ekonomi digital.',
    ],
    nvivoEvidence: 'Evidence Coding: Ditemukan 20+ jejak dokumentasi digital konten audio-visual dan penggunaan barcode QRIS di pujasera.',
    accentColor: 'emerald',
  },
  {
    stepNumber: 4,
    phaseTitle: 'Tahap 3: Praktik Komunikasi',
    title: '7 Dimensi Praktik Komunikasi Berkelanjutan',
    targetNodeIds: [
      'comm-info',
      'comm-koordinasi',
      'comm-promosi',
      'comm-representasi',
      'comm-interaksi',
      'comm-partisipasi',
      'comm-transaksi',
    ],
    academicNarration:
      'Aktivitas komunikasi terbagi menjadi 7 tindakan terstruktur: pemberian informasi, koordinasi kelembagaan, promosi destinasi, representasi digital, interaksi dialogis, mobilisasi partisipasi warga, hingga fasilitasi transaksi komersial.',
    keyInsights: [
      'Bukan sekadar pesan satu arah, melainkan komunikasi interaktif yang membangun keterlibatan audiens.',
      'Praktik representasi mengubah keindahan alam dan budaya desa menjadi modal simbolik digital.',
      'Partisipasi warga digalang melalui gotong royong yang dikomunikasikan secara digital.',
    ],
    nvivoEvidence: 'Matrix Coding Query: Tema Informasi (100%), Koordinasi (100%), dan Promosi (100%) muncul pada semua transkrip informan.',
    accentColor: 'amber',
  },
  {
    stepNumber: 5,
    phaseTitle: 'Tahap 4: Pola Interaksi',
    title: 'Struktur Jaringan Komunikasi Multi-Arah',
    targetNodeIds: [
      'pattern-vertikal',
      'pattern-horizontal',
      'pattern-ekonomi',
      'pattern-publik',
      'emp-projectmap',
    ],
    academicNarration:
      'Interaksi di Ketapanrame bergerak dalam 4 pola terintegrasi: Vertikal-Institusional (pemerintahan), Horizontal-Komunitas (paguyuban & kelompok usaha), Ekonomi (tenan dan konsumen), serta Publik-Digital (admin dan warganet lintas daerah).',
    keyInsights: [
      'Pola Vertikal menjamin kepatuhan regulasi dan legalitas tanah kas desa.',
      'Pola Horizontal memelihara modal sosial, rasa saling percaya, dan solidaritas paguyuban.',
      'Pola Publik-Digital memperluas jangkauan informasi menembus batas geografis desa.',
    ],
    nvivoEvidence: 'Project Map NVivo: Visualisasi relasi simpul menunjukkan keterikatan simetris antara aktor pemdes, BUMDes, dan tenan.',
    accentColor: 'emerald',
  },
  {
    stepNumber: 6,
    phaseTitle: 'Tahap 5: Representasi & Informasi Digital',
    title: 'Transformasi Modal Fisik Menjadi Aset Digital',
    targetNodeIds: [
      'rep-konten',
      'rep-info',
      'rep-produk',
      'rep-transaksi',
      'emp-wordcloud',
    ],
    academicNarration:
      'Desa mentransformasikan objek fisik dan kegiatan sosial menjadi artefak digital: paket wisata digital, katalog produk UMKM, pengumuman layanan publik, hingga pencatatan transaksi elektronik yang transparan.',
    keyInsights: [
      'Video edukasi dan reels memvisualisasikan daya tarik sumber mata air Dlundung dan kebun kopi.',
      'Menu digital dan sistem kasir QRIS mendemokratisasi pencatatan keuangan pedagang kecil.',
    ],
    nvivoEvidence: 'Word Cloud NVivo: Frekuensi kata "digital", "konten", "informasi", dan "produk" mendominasi 40 kata teratas.',
    accentColor: 'blue',
  },
  {
    stepNumber: 7,
    phaseTitle: 'Tahap 6: Visibility & Jangkauan',
    title: 'Eskalasi Jangkauan dari Komunitas Lokal ke Skala Nasional',
    targetNodeIds: [
      'vis-publik',
      'vis-pasar',
      'vis-wisatawan',
      'emp-similarity',
    ],
    academicNarration:
      'Mediatisasi melipatgandakan visibilitas desa wisata. Aksesibilitas informasi yang mudah di media sosial mendorong konversi minat calon wisatawan dari level lokal Mojokerto-Surabaya hingga skala nasional.',
    keyInsights: [
      'Visibilitas Publik: Membangun citra desa mandiri dan berprestasi di tingkat nasional.',
      'Jangkauan Pasar: Meningkatkan volume pemesanan homestay, tiket wahana, dan oleh-oleh UMKM.',
    ],
    nvivoEvidence: 'Word Similarity Pearson (0.746): Menunjukkan wacana promosi dan daya jangkau selaras di seluruh narasi informan.',
    accentColor: 'purple',
  },
  {
    stepNumber: 8,
    phaseTitle: 'Tahap 7 & 8: Dampak & Legitimasi',
    title: 'Penguatan Ekonomi, Modal Sosial, dan Kepercayaan Komunitas',
    targetNodeIds: [
      'downstream-aktivitas',
      'downstream-legitimasi',
      'emp-matrix',
    ],
    academicNarration:
      'Muara dari proses mediatisasi adalah peningkatan nyata pada aktivitas ekonomi (omzet tenan, deviden desa) dan penguatan legitimasi sosial. Kredibilitas yang tinggi menciptakan iklim gotong royong yang semakin solid.',
    keyInsights: [
      'Dampak Ekonomi: Pendapatan BUMDes menembus miliaran rupiah dan mengentaskan pengangguran lokal.',
      'Dampak Sosial: Warga memiliki rasa memiliki (sense of ownership) yang tinggi terhadap program desa.',
      'Legitimasi: Transparansi media digital meminimalisir kecurigaan dan konflik horizontal.',
    ],
    nvivoEvidence: 'Coding Tema Kepercayaan & Gotong Royong: Tingkat konsensus tinggi pada keandalan tata kelola BUMDes.',
    accentColor: 'rose',
  },
  {
    stepNumber: 9,
    phaseTitle: 'Siklus Umpan Balik',
    title: 'Feedback Loop: Keberlanjutan Ekosistem Mediatisasi',
    targetNodeIds: [
      'downstream-legitimasi',
      'downstream-aktivitas',
      'comm-info',
      'comm-koordinasi',
      'comm-promosi',
      'comm-representasi',
    ],
    academicNarration:
      'Model HMM bersifat sirkular dan dinamis (non-linier). Tingkat kepercayaan yang tinggi dan pengalaman positif wisatawan menjadi modal reputasi yang kembali menyuplai konten, menyempurnakan strategi komunikasi, dan memperkuat koordinasi tahap berikutnya.',
    keyInsights: [
      'Testimoni dan ulasan positif pengunjung menjadi bahan baku representasi digital baru.',
      'Keberhasilan ekonomi memotivasi partisipasi warga untuk terus berinovasi dalam konten media.',
    ],
    nvivoEvidence: 'Garis putus-putus biru di bagian atas diagram merefleksikan feedback loop teoretis mediatisasi hibrida.',
    accentColor: 'blue',
  },
  {
    stepNumber: 10,
    phaseTitle: 'Sintesis & Rekomendasi',
    title: 'Infrastruktur Sosial Digital BUMDes Ketapanrame',
    targetNodeIds: [
      'emp-wordcloud',
      'emp-matrix',
      'emp-evidence',
      'emp-similarity',
      'emp-projectmap',
      'emp-crosstab',
    ],
    academicNarration:
      'Secara teoretis, HMM membuktikan konsep Deep Mediatization di pedesaan Indonesia: teknologi digital bukan instrumen eksternal yang pasif, melainkan fondasi infrastruktur sosial baru yang mengintegrasikan aspek kultural, ekonomi, dan kelembagaan secara harmonis.',
    keyInsights: [
      'Dapat direplikasi sebagai model tata kelola komunikasi digital untuk 80.000+ BUMDes di Indonesia.',
      'Menekankan pentingnya literasi digital yang selaras dengan nilai kearifan lokal.',
    ],
    nvivoEvidence: 'Enam bukti empiris NVivo secara koheren memvalidasi kerangka kerja konseptual HMM.',
    accentColor: 'emerald',
  },
];

export interface HmmGuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNodeIds: (nodeIds: string[]) => void;
  onResetNodes: () => void;
}

export const HmmGuidedTour: React.FC<HmmGuidedTourProps> = ({
  isOpen,
  onClose,
  onSelectNodeIds,
  onResetNodes,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Apply highlight whenever step changes
  useEffect(() => {
    if (isOpen) {
      onSelectNodeIds(currentStep.targetNodeIds);

      // Optional Browser Text-To-Speech
      if (speechEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          `${currentStep.title}. ${currentStep.academicNarration}`
        );
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [currentStepIndex, isOpen, speechEnabled]);

  // Auto-play interval handling (5 seconds per slide)
  useEffect(() => {
    if (isPlaying && isOpen) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < TOUR_STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 7000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  const handleClose = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    onResetNodes();
    onClose();
  };

  const goToNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const restartTour = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 pointer-events-none">
      <div
        className={`pointer-events-auto bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-xl transition-all duration-300 w-full max-w-3xl overflow-hidden ${
          isMinimized ? 'max-h-16' : 'max-h-[85vh] sm:max-h-[520px]'
        }`}
      >
        {/* Top Header & Progress Bar */}
        <div className="bg-slate-800/80 px-4 py-2.5 flex items-center justify-between border-b border-slate-700/70">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              <Presentation className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-1.5 py-0.2 rounded">
                  {currentStep.phaseTitle}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Langkah {currentStep.stepNumber} dari {TOUR_STEPS.length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio narration toggle */}
            <button
              onClick={() => {
                if (speechEnabled && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setSpeechEnabled(!speechEnabled);
              }}
              className={`p-1.5 rounded-lg text-xs transition ${
                speechEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title={speechEnabled ? 'Matikan Suara Narasi' : 'Aktifkan Suara Narasi (TTS)'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Minimize/Maximize */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title={isMinimized ? 'Perluas Penjelasan' : 'Kecilkan Panel'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-rose-600/80 rounded-lg transition"
              title="Tutup Tur Presentasi (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content Body (When not minimized) */}
        {!isMinimized && (
          <div className="p-4 sm:p-5 overflow-y-auto max-h-[360px] space-y-3.5">
            {/* Title & Accent */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{currentStep.title}</span>
              </h3>
            </div>

            {/* Academic Narration Box (Spoken Script) */}
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-100 text-xs sm:text-[13px] leading-relaxed">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Narasi Akademik untuk Sidang / Presentasi:</span>
              </div>
              <p>{currentStep.academicNarration}</p>
            </div>

            {/* Key Insights & NVivo Evidence Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                <div className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Poin Kunci Temuan:</span>
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px] leading-tight">
                  {currentStep.keyInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>Bukti Triangulasi NVivo:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-snug">
                    {currentStep.nvivoEvidence}
                  </p>
                </div>
                <div className="pt-1.5 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Elemen Disorot:</span>
                  <span className="text-indigo-300 font-bold">
                    {currentStep.targetNodeIds.length > 0
                      ? `${currentStep.targetNodeIds.length} Simpul Aktif`
                      : 'Overview Lengkap'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="bg-slate-800/90 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/70">
          <div className="flex items-center gap-2">
            <button
              onClick={restartTour}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg text-xs transition flex items-center gap-1"
              title="Mulai Ulang dari Langkah 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ulangi</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda Otomatis</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar Otomatis</span>
                </>
              )}
            </button>
          </div>

          {/* Step Pill Indicators */}
          <div className="hidden md:flex items-center gap-1">
            {TOUR_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-5 h-5 rounded-full text-[9.5px] font-bold transition flex items-center justify-center ${
                  idx === currentStepIndex
                    ? 'bg-indigo-500 text-white scale-110 shadow-sm'
                    : idx < currentStepIndex
                    ? 'bg-indigo-950 text-indigo-300 hover:bg-indigo-900'
                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300'
                }`}
                title={`Lompat ke: ${step.title}`}
              >
                {step.stepNumber}
              </button>
            ))}
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={goToPrev}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            {currentStepIndex < TOUR_STEPS.length - 1 ? (
              <button
                onClick={goToNext}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-sm"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Selesai Tur</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
