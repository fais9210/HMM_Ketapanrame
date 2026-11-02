import { HmmActorId } from './actorRelationsData';

export type InformantCode = 'INF-01' | 'INF-02' | 'INF-03' | 'INF-04' | 'INF-05';

export interface VerbatimQuoteItem {
  informantCode: InformantCode;
  informantRole: string;
  actorId: HmmActorId;
  verbatim: string;
  nvivoTheme: string;
  contextNote: string;
}

export interface HmmQuoteEvidenceEntry {
  id: string;
  kind: 'node' | 'edge';
  title: string;
  stageBadge: string;
  relationFormula?: string;
  consensusCount: 2 | 3 | 4 | 5;
  synthesis: string;
  quotes: VerbatimQuoteItem[];
}

export const INFORMANT_META: Record<
  InformantCode,
  { role: string; actorId: HmmActorId; profileSummary: string }
> = {
  'INF-01': {
    role: 'Admin Media Sosial',
    actorId: 'actor-admin',
    profileSummary: 'Perempuan · 26–35 thn · S1',
  },
  'INF-02': {
    role: 'Kepala Desa Ketapanrame',
    actorId: 'actor-kades',
    profileSummary: 'Laki-laki · 46–55 thn · S2',
  },
  'INF-03': {
    role: 'Ketua BUMDes',
    actorId: 'actor-ketua-bumdes',
    profileSummary: 'Laki-laki · 46–55 thn · S1',
  },
  'INF-04': {
    role: 'Ketua KUB Wahana Taman Ghanjaran',
    actorId: 'actor-ketua-kub',
    profileSummary: 'Laki-laki · 36–45 thn · S1',
  },
  'INF-05': {
    role: 'Tenan Pujasera',
    actorId: 'actor-tenan',
    profileSummary: 'Laki-laki · 36–45 thn · SMA/SMK',
  },
};

/**
 * Katalog bukti kutipan langsung (verbatim wawancara NVivo) untuk seluruh 29 simpul (node)
 * pada diagram Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame.
 */
export const HMM_NODE_QUOTES: Record<string, HmmQuoteEvidenceEntry> = {
  // ==========================================
  // FEEDBACK LOOP BANNER
  // ==========================================
  'hmm-feedback-banner': {
    id: 'hmm-feedback-banner',
    kind: 'node',
    title: 'Siklus Umpan Balik (Feedback Loop Mediatisasi)',
    stageBadge: 'Tahap 8 → Tahap 3 · Sirkularitas HMM',
    relationFormula: 'Kepercayaan & Pengalaman Nyata → Strategi Komunikasi & Konten Berikutnya',
    consensusCount: 5,
    synthesis:
      'Kepercayaan warga serta ulasan nyata wisatawan di muara ekosistem diproses kembali oleh pengelola menjadi perbaikan fasilitas dan narasi konten periode berikutnya.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Setiap masukan pengunjung di medsos maupun obrolan warga langsung kami bawa ke evaluasi mingguan BUMDes. Setelah dibenahi di lapangan, perubahannya kami kabarkan lagi lewat konten supaya publik tahu kami benar-benar bergerak.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Konversi evaluasi layanan menjadi pembaruan praktik komunikasi kelembagaan.',
      },
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Kalau ada komentar soal parkir, antrean wahana, atau pertanyaan harga di TikTok dan DM, saya rekap lalu teruskan ke grup pengurus. Begitu ada solusi atau wahana baru, itu langsung jadi bahan video respons berikutnya.',
        nvivoTheme: 'saran dan kritik',
        contextNote: 'Peran admin sebagai sensor awal umpan balik digital dari warganet ke manajemen.',
      },
    ],
  },

  // ==========================================
  // TAHAP 1: PERAN AKTOR (5 SIMPUL)
  // ==========================================
  'actor-ketua-bumdes': {
    id: 'actor-ketua-bumdes',
    kind: 'node',
    title: 'Ketua BUMDes',
    stageBadge: 'Tahap 1 · Peran Aktor Kelembagaan',
    consensusCount: 5,
    synthesis:
      'Berfungsi sebagai simpul penghubung (institutional broker) yang mengorkestrasi kebijakan desa, operasional KUB wahana, kurasi informasi admin, dan tata niaga tenan.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Posisi BUMDes ini menjembatani kebijakan Pak Kades dengan teman-teman pelaksana di Taman Ghanjaran, KUB, maupun paguyuban tenan. Koordinasi harian jalan terus di WhatsApp, tapi keputusan penting tetap kami matangkan lewat musyawarah.',
        nvivoTheme: 'Komunikasi tatap muka atau musyawarah',
        contextNote: 'Integrasi kepemimpinan musyawarah desa dengan koordinasi digital lintas unit.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Ketua BUMDes kami beri mandat penuh mengelola ritme usaha dan komunikasi antarunit, dengan syarat laporan ke desa dan ke warga selalu terbuka agar kepercayaan tetap terjaga.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Mandat struktural dan akuntabilitas tata kelola kelembagaan BUMDes.',
      },
    ],
  },

  'actor-kades': {
    id: 'actor-kades',
    kind: 'node',
    title: 'Kepala Desa',
    stageBadge: 'Tahap 1 · Otoritas & Legitimasi Desa',
    consensusCount: 5,
    synthesis:
      'Memegang jangkar legitimasi kebijakan dan pengawasan makro (mencakup 100% tema NVivo) agar transformasi digital BUMDes berpihak pada kesejahteraan kolektif warga.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Pemerintah desa menyiapkan payung regulasi dan memastikan semua warga merasa memiliki. Digitalisasi di BUMDes harus jalan seiring dengan musyawarah desa, supaya kemajuan ekonomi tidak meninggalkan kerukunan sosial.',
        nvivoTheme: 'Komunikasi tatap muka atau musyawarah',
        contextNote: 'Penyelarasan otoritas regulasi desa dengan mediatisasi inklusif berbasis warga.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Dukungan Pak Kades itu krusial ketika kami mengenalkan aturan baru seperti penataan pujasera atau sistem nontunai; warga lebih yakin karena arah kebijakannya satu suara dengan desa.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Penguatan legitimasi program inovasi BUMDes melalui dukungan Kepala Desa.',
      },
    ],
  },

  'actor-ketua-kub': {
    id: 'actor-ketua-kub',
    kind: 'node',
    title: 'Ketua KUB',
    stageBadge: 'Tahap 1 · Pengelola Komunitas Wahana',
    consensusCount: 4,
    synthesis:
      'Menggerakkan ratusan warga penanam saham komunitas pada wahana Taman Ghanjaran sekaligus menginisiasi promosi organik melalui akun TikTok KUB.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Di KUB ini anggotanya warga sendiri yang ikut urunan saham wahana. Jadi lewat grup WA kami atur jadwal jaga dan laporan tiket, sementara lewat TikTok KUB kami kompak bikin video supaya wahana makin ramai.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Kepemimpinan kolektif warga dalam operasional wahana dan promosi akar rumput.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Teman-teman KUB sangat aktif di lapangan; mereka paling tahu momen keramaian wahana sehingga koordinasi dengan manajemen BUMDes selalu hidup setiap akhir pekan.',
        nvivoTheme: 'Partisipasi Aktif',
        contextNote: 'Sinergi horizontal antara manajemen induk BUMDes dan pengurus KUB.',
      },
    ],
  },

  'actor-admin': {
    id: 'actor-admin',
    kind: 'node',
    title: 'Admin Media Sosial',
    stageBadge: 'Tahap 1 · Mediator Digital & Kurator Konten',
    consensusCount: 5,
    synthesis:
      'Bertindak sebagai cultural & digital intermediary yang menerjemahkan aktivitas fisik kawasan wisata dan pengumuman desa menjadi representasi visual bernilai jangkau tinggi.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Tugas saya menangkap suasana asli di Taman Ghanjaran—mulai keseruan wahana, kuliner tenan, sampai acara desa—lalu mengemasnya jadi video pendek yang informatif sekaligus cepat menjawab pertanyaan calon pengunjung.',
        nvivoTheme: 'Peran dalam MESOS dan Media Digital',
        contextNote: 'Spesialisasi produksi konten audio-visual dan pengelolaan interaksi publik.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Anak-anak muda desa yang memegang admin medsos ini menjadi wajah komunikasi Ketapanrame ke luar; kreativitas mereka membuat potensi desa dikenal jauh melampaui wilayah Mojokerto.',
        nvivoTheme: 'Opini terhadap MEDIA DIGITAL',
        contextNote: 'Pemberdayaan talenta muda lokal sebagai penggerak visibilitas digital desa.',
      },
    ],
  },

  'actor-tenan': {
    id: 'actor-tenan',
    kind: 'node',
    title: 'Tenan Pujasera / Food Court',
    stageBadge: 'Tahap 1 · Aktor Ekonomi Mikro Warga',
    consensusCount: 5,
    synthesis:
      'Ujung tombak konversi kunjungan wisata menjadi perputaran ekonomi rumah tangga warga melalui layanan kuliner, interaksi pelanggan, dan adopsi pembayaran QRIS.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Sebagai pedagang warga lokal di pujasera, kami merasakan langsung ramainya pengunjung dari promosi medsos. Sekarang pembeli luar kota juga tinggal scan QRIS di lapak, praktis tidak bingung uang kembalian.',
        nvivoTheme: 'transaksi',
        contextNote: 'Adaptasi literasi pembayaran digital oleh pelaku usaha kuliner mikro desa.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Para tenan bukan sekadar penyewa lapak, tetapi bagian dari wajah pelayanan BUMDes; kepuasan wisatawan makan di pujasera menentukan apakah mereka akan kembali lagi.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Peran tenan dalam menjaga kualitas pengalaman langsung wisatawan.',
      },
    ],
  },

  // ==========================================
  // TAHAP 2: MEDIA / PLATFORM (5 SIMPUL)
  // ==========================================
  'media-tiktok': {
    id: 'media-tiktok',
    kind: 'node',
    title: 'TikTok BUMDes & KUB',
    stageBadge: 'Tahap 2 · Infrastruktur Media Sosial Algoritmik',
    consensusCount: 5,
    synthesis:
      'Kanal utama storytelling visual berdurasi pendek yang mendongkrak eksposur organik wahana Taman Ghanjaran dan suasana pegunungan Ketapanrame.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Untuk menjangkau wisatawan baru, TikTok paling cepat mengangkat views. Begitu satu video suasana malam atau wahana baru naik di FYP, kolom komentar langsung penuh tanya rute dan harga tiket.',
        nvivoTheme: 'platform digital',
        contextNote: 'Efektivitas algoritma video pendek dalam memicu minat kunjung audiens luar daerah.',
      },
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Selain akun resmi BUMDes, kami di KUB juga menggerakkan TikTok KUB untuk menampilkan keseruan pengunjung naik wahana secara real-time saat akhir pekan.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Kolaborasi multi-akun antara BUMDes dan unit komunitas KUB.',
      },
    ],
  },

  'media-wa': {
    id: 'media-wa',
    kind: 'node',
    title: 'WhatsApp',
    stageBadge: 'Tahap 2 · Tulang Punggung Koordinasi Hibrida',
    consensusCount: 5,
    synthesis:
      'Infrastruktur komunikasi harian yang menghubungkan seluruh 5 peran aktor dalam pertukaran instruksi cepat, laporan operasional, dan grup paguyuban.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Semua lini terhubung lewat grup WhatsApp—ada grup pengurus inti bersama Pak Kades, grup operasional KUB, sampai grup paguyuban tenan. Pengumuman mendadak dalam hitungan menit langsung tersampaikan.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Kecepatan distribusi informasi internal lintas struktur organisasi desa.',
      },
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Kalau ada info jadwal event besar, kerja bakti bersih pujasera, atau pesanan nasi kotak rombongan wisata, semuanya diinfokan lewat grup WA tenan walaupun kadang kami menyimak sambil melayani pembeli.',
        nvivoTheme: 'Partisipasi Pasif',
        contextNote: 'Pemanfaatan grup WhatsApp baik untuk respons aktif maupun pemantauan informasi.',
      },
    ],
  },

  'media-fb': {
    id: 'media-fb',
    kind: 'node',
    title: 'Facebook',
    stageBadge: 'Tahap 2 · Jejaring Komunitas & Warga Lintas Usia',
    consensusCount: 4,
    synthesis:
      'Menjangkau segmen keluarga, warga desa sekitar, dan komunitas regional melalui berbagi album kegiatan, poster acara, dan informasi layanan publik.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Facebook tetap kami jaga karena segmen bapak-ibu dan komunitas keluarga di Mojokerto–Sidoarjo banyak yang mencari info acara atau membagikan foto liburan lewat grup dan halaman Facebook.',
        nvivoTheme: 'platform digital',
        contextNote: 'Segmentasi audiens keluarga dan komunitas regional pada platform Facebook.',
      },
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Anggota kelompok yang usianya lebih senior banyak yang aktif di Facebook, jadi ketika kegiatan wahana atau desa diunggah di sana, mereka ikut bangga membagikan ke kerabatnya.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Inklusivitas platform bagi demografi warga dan pengurus lintas generasi.',
      },
    ],
  },

  'media-qris': {
    id: 'media-qris',
    kind: 'node',
    title: 'QRIS',
    stageBadge: 'Tahap 2 · Infrastruktur Pembayaran Digital',
    consensusCount: 4,
    synthesis:
      'Menjembatani mediatisasi komunikasi promosi dengan praktik ekonomi nontunai yang transparan, cepat, dan terstandar di area pujasera serta unit wisata.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Adanya barcode QRIS di tiap stand sangat membantu. Wisatawan anak muda maupun keluarga dari Surabaya jarang bawa uang pas, tinggal scan langsung masuk dan catatannya jelas.',
        nvivoTheme: 'transaksi',
        contextNote: 'Kemudahan transaksi nontunai dan kepastian pencatatan omzet pedagang.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Penerapan QRIS ini bagian dari edukasi literasi keuangan digital warga kami; pedagang kecil di desa jadi terbiasa dengan sistem pembayaran modern yang tertib dan akuntabel.',
        nvivoTheme: 'Opini terhadap MEDIA DIGITAL',
        contextNote: 'Transformasi inklusi finansial masyarakat desa melalui infrastruktur pembayaran digital.',
      },
    ],
  },

  'media-audiovisual': {
    id: 'media-audiovisual',
    kind: 'node',
    title: 'Konten Audio-Visual (Foto/Video)',
    stageBadge: 'Tahap 2 · Medium Produksi Representasi',
    consensusCount: 5,
    synthesis:
      'Basis artefak visual berupa rekaman video pendek, fotografi destinasi, dan infografis yang menghidupkan daya tarik fisik desa di ruang siber.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Orang tertarik datang ke Trawas itu karena melihat visual suasananya—kabut pegunungan, lampu taman malam hari, dan ekspresi senang pengunjung. Jadi kekuatan foto dan video jadi kunci utama meskipun butuh waktu ekstra saat proses editing.',
        nvivoTheme: 'Kendala MEDSOS',
        contextNote: 'Peran sentral estetika audio-visual sekaligus tantangan teknis waktu produksi konten.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Dokumentasi foto dan video tidak hanya untuk iklan wisata, tetapi juga bukti visual kegiatan kelembagaan ketika kami menerima kunjungan studi tiru atau melaporkan progres pembangunan unit usaha.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Fungsi ganda konten audio-visual untuk pemasaran dan akuntabilitas kelembagaan.',
      },
    ],
  },

  // ==========================================
  // TAHAP 3: PRAKTIK KOMUNIKASI (7 SIMPUL)
  // ==========================================
  'comm-info': {
    id: 'comm-info',
    kind: 'node',
    title: 'Praktik Informasi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi',
    consensusCount: 5,
    synthesis:
      'Penyampaian informasi akurat terkait jam operasional, tarif tiket, agenda desa, serta kebijakan tata kelola baik kepada warga internal maupun publik.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Setiap ada perubahan jam operasional libur nasional, tarif paket rombongan, atau penutupan perawatan wahana, hal pertama yang kami pastikan adalah pengumuman informasinya jelas agar pengunjung tidak kecewa.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Kepastian informasi layanan publik bagi calon wisatawan.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Keterbukaan informasi program desa dan perkembangan BUMDes kami sampaikan berlapis, baik lewat forum warga maupun saluran digital supaya tidak muncul salah paham.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Transparansi informasi tata kelola desa untuk menjaga kohesi sosial.',
      },
    ],
  },

  'comm-koordinasi': {
    id: 'comm-koordinasi',
    kind: 'node',
    title: 'Praktik Koordinasi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi',
    consensusCount: 5,
    synthesis:
      'Penyelarasan tindakan antaraktor (Pemdes, BUMDes, KUB, Admin, Tenan) secara hibrida melalui perpaduan grup percakapan instan dan musyawarah tatap muka.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Koordinasi kami sifatnya hibrida: hal-hal taktis lapangan diselesaikan cepat lewat WhatsApp, sedangkan evaluasi bulanan dan kebijakan strategis kami dudukkan bersama dalam rapat tatap muka.',
        nvivoTheme: 'Komunikasi tatap muka atau musyawarah',
        contextNote: 'Komplementaritas komunikasi digital cepat dan musyawarah tatap muka.',
      },
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Pembagian sif operator wahana, kesiapan parkir saat rombongan bus datang, sampai pengecekan keamanan alat semuanya dikoordinasikan berjenjang antar-koordinator lapangan.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Koordinasi operasional harian pada kelompok usaha komunitas.',
      },
    ],
  },

  'comm-promosi': {
    id: 'comm-promosi',
    kind: 'node',
    title: 'Praktik Promosi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi',
    consensusCount: 5,
    synthesis:
      'Aktivitas komunikatif memperkenalkan daya tarik destinasi, event hiburan, wahana permainan, dan ragam kuliner UMKM untuk memperluas pasar pengunjung.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Begitu kami rutin mempromosikan wahana permainan dan suasana sore Taman Ghanjaran di medsos, dampaknya langsung terasa pada antrean tiket akhir pekan.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Dampak langsung promosi digital terhadap peningkatan trafik wahana komunitas.',
      },
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Kami di pujasera juga ikut memfoto menu andalan dan memasang status WA atau dibantu liput admin, supaya pengunjung tahu pilihan makanannya lengkap dan terjangkau.',
        nvivoTheme: 'Partisipasi Aktif',
        contextNote: 'Keterlibatan aktif pelaku UMKM kuliner dalam mempromosikan produk usaha.',
      },
    ],
  },

  'comm-representasi': {
    id: 'comm-representasi',
    kind: 'node',
    title: 'Praktik Representasi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi',
    consensusCount: 5,
    synthesis:
      'Proses mengonversi realitas sosial-fisik desa wisata (keindahan lanskap, keramahan warga, kemeriahan acara) menjadi narasi simbolik digital.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Setiap sudut aktivitas nyata di desa—dari senyum pedagang melayani pembeli sampai kabut turun di area taman—kami ubah menjadi cerita visual agar audiens ikut merasakan pengalamannya lewat layar.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Transformasi pengalaman ruang fisik menjadi narasi audio-visual digital.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Yang ditampilkan di media sosial bukan rekayasa, melainkan wajah asli gotong royong dan kemandirian warga Ketapanrame mengelola potensi desanya sendiri.',
        nvivoTheme: 'Opini terhadap MEDIA DIGITAL',
        contextNote: 'Autentisitas representasi identitas desa mandiri di ruang publik.',
      },
    ],
  },

  'comm-interaksi': {
    id: 'comm-interaksi',
    kind: 'node',
    title: 'Praktik Interaksi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi',
    consensusCount: 5,
    synthesis:
      'Komunikasi dialogis dua arah berupa tanya jawab komentar warganet, pelayanan ramah di lokasi wisata, serta penerimaan saran dan kritik.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Calon pengunjung senang kalau komentarnya cepat dibalas dengan ramah. Dari tanya jalan, jam buka, sampai booking rombongan, interaksi dua arah itu yang membuat mereka mantap berangkat.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Responsivitas komunikasi digital dalam mengonversi minat menjadi kunjungan.',
      },
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Waktu melayani pembeli di pujasera kami sering ngobrol langsung; kalau ada masukan soal rasa atau kebersihan meja langsung kami benahi saat itu juga.',
        nvivoTheme: 'saran dan kritik',
        contextNote: 'Interaksi tatap muka langsung antara pelaku ekonomi mikro dan wisatawan.',
      },
    ],
  },

  'comm-partisipasi': {
    id: 'comm-partisipasi',
    kind: 'node',
    title: 'Praktik Partisipasi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi',
    consensusCount: 4,
    synthesis:
      'Mobilisasi keterlibatan warga, anggota paguyuban KUB/tenan, hingga partisipasi konten pengunjung (user-generated content) dalam menghidupkan ekosistem.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Kunci keberlanjutan BUMDes ini ada pada partisipasi warga—mulai ikut musyawarah, menanam saham komunitas KUB, menjaga kebersihan lingkungan, sampai ikut menyebarkan info positif desa.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Rasa kepemilikan kolektif warga (sense of ownership) terhadap usaha desa.',
      },
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Banyak wisatawan yang mengunggah sendiri video liburan mereka lalu menandai akun kami; konten dari pengunjung itu justru sangat kuat menarik teman-temannya ikut datang.',
        nvivoTheme: 'Partisipasi Aktif',
        contextNote: 'Partisipasi organik pengunjung dalam memperluas testimoni digital destinasi.',
      },
    ],
  },

  'comm-transaksi': {
    id: 'comm-transaksi',
    kind: 'node',
    title: 'Praktik Transaksi',
    stageBadge: 'Tahap 3 · Praktik Komunikasi Ekonomi',
    consensusCount: 4,
    synthesis:
      'Tindakan komunikatif-ekonomi yang menghubungkan informasi produk/tiket dengan kesepakatan jual beli dan pembayaran digital QRIS.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Begitu pembeli cocok dengan menu yang dipajang, proses bayarnya cepat lewat QRIS maupun tunai. Bukti berhasil di layar HP langsung kami cek bersama pelanggan.',
        nvivoTheme: 'transaksi',
        contextNote: 'Praktik verifikasi pembayaran digital instan pada transaksi kuliner.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Dari tiket masuk, wahana KUB, sewa stand, sampai pembayaran QRIS, alur transaksinya terus kami rapikan agar pencatatan bagi hasil ke desa dan kelompok warga makin transparan.',
        nvivoTheme: 'transaksi',
        contextNote: 'Tata kelola transaksi terintegrasi pada ekosistem usaha desa.',
      },
    ],
  },

  // ==========================================
  // TAHAP 4: POLA INTERAKSI (4 SIMPUL)
  // ==========================================
  'pattern-vertikal': {
    id: 'pattern-vertikal',
    kind: 'node',
    title: 'Pola Vertikal-Institusional',
    stageBadge: 'Tahap 4 · Pola Interaksi Struktural',
    relationFormula: 'Kepala Desa ↔ Ketua BUMDes',
    consensusCount: 4,
    synthesis:
      'Relasi tata kelola berbasis mandat regulasi desa, pembinaan kelembagaan, pelaporan akuntabilitas PADes, dan penyelarasan keputusan strategis.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Hubungan Pemdes dan BUMDes berjalan dalam koridor pembinaan dan akuntabilitas: manajemen diberi ruang profesional berinovasi, sementara arah kebijakan tetap selaras dengan RPJMDes dan Musdes.',
        nvivoTheme: 'Komunikasi tatap muka atau musyawarah',
        contextNote: 'Keseimbangan antara otonomi manajerial BUMDes dan pengawasan publik desa.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Setiap perkembangan capaian maupun kendala strategis langsung kami komunikasikan dengan Pak Kades agar langkah operasional di lapangan memiliki payung legitimasi yang kuat.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Sinkronisasi vertikal untuk menjaga kredibilitas kelembagaan.',
      },
    ],
  },

  'pattern-horizontal': {
    id: 'pattern-horizontal',
    kind: 'node',
    title: 'Pola Horizontal-Komunitas',
    stageBadge: 'Tahap 4 · Pola Interaksi Kolektif',
    relationFormula: 'BUMDes ↔ KUB ↔ Admin ↔ Anggota/Komunitas',
    consensusCount: 5,
    synthesis:
      'Jejaring kolaborasi setara antarpengelola unit, kreator konten, dan kelompok warga yang merawat solidaritas gotong royong serta kecepatan koordinasi.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Antara pengurus KUB, tim BUMDes, dan admin medsos itu komunikasinya cair seperti rekan satu tim; saling kirim bahan video dan saling bantu kalau di lapangan sedang padat pengunjung.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Kohesi horizontal lintas tim pengelola dalam keseharian operasional wisata.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Kekuatan Ketapanrame ada pada komunikasi horizontal paguyuban; masalah teknis tidak dibiarkan menumpuk karena dibicarakan setara di grup maupun saat cangkrukan evaluasi.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Modal sosial komunitas yang diperkuat komunikasi hibrida.',
      },
    ],
  },

  'pattern-ekonomi': {
    id: 'pattern-ekonomi',
    kind: 'node',
    title: 'Pola Interaksi Ekonomi',
    stageBadge: 'Tahap 4 · Pola Interaksi Niaga',
    relationFormula: 'BUMDes/KUB → Tenan → Konsumen',
    consensusCount: 4,
    synthesis:
      'Rantai pertukaran nilai komersial yang menghubungkan fasilitasi kawasan wisata dengan transaksi produk UMKM warga dan kepuasan konsumen.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Ketika wahana KUB dan event BUMDes ramai, otomatis pengunjung mengalir ke area food court kami. Jadi antara pengelola kawasan, pedagang tenan, dan pembeli itu saling menghidupi.',
        nvivoTheme: 'transaksi',
        contextNote: 'Simbiosis ekonomi kawasan antara daya tarik wahana dan omzet kuliner warga.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Kami menata standar harga, kebersihan, dan fasilitas QRIS bagi tenan supaya interaksi jual beli dengan wisatawan berlangsung nyaman dan menguntungkan warga lokal.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Tata niaga kawasan wisata yang berorientasi pada pemberdayaan UMKM desa.',
      },
    ],
  },

  'pattern-publik': {
    id: 'pattern-publik',
    kind: 'node',
    title: 'Pola Publik-Digital',
    stageBadge: 'Tahap 4 · Pola Interaksi Terbuka',
    relationFormula: 'Aktor Komunitas/Admin → Platform → Masyarakat Luas',
    consensusCount: 5,
    synthesis:
      'Jalur diseminasi pesan terbuka lintas batas geografis yang menghubungkan ruang lokal desa dengan calon wisatawan dan opini publik warganet.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Di ruang publik digital kami berhadapan langsung dengan ribuan warganet dari berbagai kota; cara kami menyapa dan menyajikan konten membentuk kesan pertama mereka tentang Desa Ketapanrame.',
        nvivoTheme: 'Peran dalam MESOS dan Media Digital',
        contextNote: 'Manajemen impresi dan pembentukan citra destinasi di kanal publik.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Komunikasi publik lewat media digital ini membuat inovasi desa bisa dilihat secara terbuka oleh masyarakat luas, akademisi, maupun desa-desa lain di Indonesia.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Keterbukaan reputasi inovasi desa di tingkat regional dan nasional.',
      },
    ],
  },

  // ==========================================
  // TAHAP 5: REPRESENTASI & INFORMASI DIGITAL (4 SIMPUL)
  // ==========================================
  'rep-konten': {
    id: 'rep-konten',
    kind: 'node',
    title: 'Konten Digital',
    stageBadge: 'Tahap 5 · Representasi Digital',
    consensusCount: 5,
    synthesis:
      'Artefak kreatif berwujud video pendek promosi, liputan event, edukasi desa wisata, dan kompilasi testimoni pengalaman pengunjung.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Konten video pendek yang menampilkan suasana riil pengunjung bersama keluarga terbukti paling banyak disimpan dan dibagikan ulang dibandingkan sekadar poster teks.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Keunggulan format video pendek berbasis pengalaman nyata pengunjung.',
      },
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Setiap ada wahana baru atau keramaian liburan, video pendeknya langsung menjadi etalase utama yang mengundang rasa penasaran masyarakat luar.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Fungsi konten digital sebagai etalase visual wahana wisata komunitas.',
      },
    ],
  },

  'rep-info': {
    id: 'rep-info',
    kind: 'node',
    title: 'Informasi Digital',
    stageBadge: 'Tahap 5 · Representasi Informasi',
    consensusCount: 5,
    synthesis:
      'Pengumuman resmi, panduan layanan wisata, jam operasional, dan keterbukaan informasi kegiatan yang mudah diakses sewaktu-waktu.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Informasi jadwal layanan, aturan kawasan, dan pengumuman kegiatan kami pastikan terdokumentasi rapi di kanal digital supaya warga maupun wisatawan punya rujukan resmi yang sama.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Standarisasi rujukan informasi publik dan internal kelembagaan.',
      },
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Sorotan info jam buka, lokasi parkir, dan daftar fasilitas selalu kami sematkan di profil agar calon wisatawan bisa langsung mengecek sebelum berangkat.',
        nvivoTheme: 'platform digital',
        contextNote: 'Kemudahan akses informasi mandiri bagi calon pengunjung destinasi.',
      },
    ],
  },

  'rep-produk': {
    id: 'rep-produk',
    kind: 'node',
    title: 'Produk Digital',
    stageBadge: 'Tahap 5 · Komodifikasi & Katalog Digital',
    consensusCount: 4,
    synthesis:
      'Pengemasan penawaran ekonomi desa ke dalam katalog paket wisata, informasi tiket terusan wahana, daftar menu kuliner, dan materi promo digital.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Paket kunjungan studi tiru desa wisata, katalog unit usaha, sampai info terusan wahana kami kemas dalam format e-katalog digital agar mudah dikirimkan ke calon rombongan.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Digitalisasi katalog layanan kelembagaan dan paket wisata terpadu.',
      },
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Foto daftar menu beserta harganya mempermudah rombongan keluarga memilih makanan lebih cepat, apalagi saat jam makan siang sedang ramai-ramainya.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Transparansi menu dan harga produk kuliner tenan.',
      },
    ],
  },

  'rep-transaksi': {
    id: 'rep-transaksi',
    kind: 'node',
    title: 'Transaksi Digital',
    stageBadge: 'Tahap 5 · Bukti & Rekaman Finansial Digital',
    consensusCount: 4,
    synthesis:
      'Artefak bukti pembayaran elektronik QRIS dan konfirmasi transaksi digital yang menghadirkan kepastian finansial bagi tenan, pengelola, serta konsumen.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Notifikasi pembayaran QRIS yang langsung muncul jadi bukti sah yang sama-sama menenangkan penjual dan pembeli, sekaligus memudahkan kami menghitung pemasukan harian.',
        nvivoTheme: 'transaksi',
        contextNote: 'Akurasi bukti pembayaran elektronik pada usaha mikro pujasera.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Jejak transaksi digital ini sangat penting untuk membangun budaya tertib administrasi dan memperkuat akuntabilitas perputaran ekonomi di lingkungan BUMDes.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Kontribusi pencatatan transaksi digital terhadap akuntabilitas publik.',
      },
    ],
  },

  // ==========================================
  // TAHAP 6: VISIBILITY & JANGKAUAN (3 SIMPUL)
  // ==========================================
  'vis-publik': {
    id: 'vis-publik',
    kind: 'node',
    title: 'Visibilitas Publik',
    stageBadge: 'Tahap 6 · Reach & Visibility',
    consensusCount: 5,
    synthesis:
      'Meluasnya keterlihatan reputasi dan aktivitas Desa Wisata Ketapanrame melampaui komunitas lokal hingga diakui di tingkat regional dan nasional.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Berkat konsistensi publikasi digital dan bukti tata kelola nyata, nama Ketapanrame kini dikenal luas hingga tingkat nasional dan menjadi tujuan belajar banyak desa lain.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Eskalasi reputasi kelembagaan desa ke panggung nasional.',
      },
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Analitik akun menunjukkan penonton konten kami mayoritas berasal dari luar Kecamatan Trawas dan luar Kabupaten Mojokerto, artinya eksposur publiknya benar-benar menembus batas desa.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Bukti jangkauan audiens lintas wilayah pada kanal media sosial resmi.',
      },
    ],
  },

  'vis-pasar': {
    id: 'vis-pasar',
    kind: 'node',
    title: 'Jangkauan Pasar',
    stageBadge: 'Tahap 6 · Ekspansi Pasar Usaha Desa',
    consensusCount: 5,
    synthesis:
      'Pelebaran cakupan pasar produk UMKM kuliner, wahana permainan, dan paket layanan BUMDes dari skala lokal menuju pasar regional Jawa Timur dan nasional.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Dagangan kami di desa sekarang pembelinya datang dari Surabaya, Sidoarjo, Gresik, Malang, bahkan luar provinsi. Tanpa perlu sewa tempat di kota, pasarnya yang datang ke sini.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Inklusi pasar regional bagi pedagang mikro lokal di kawasan wisata desa.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Jangkauan pemasaran digital menarik segmen rombongan instansi, sekolah, dan wisatawan keluarga lintas kota secara berkelanjutan sepanjang tahun.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Keberlanjutan permintaan pasar terhadap unit-unit usaha BUMDes.',
      },
    ],
  },

  'vis-wisatawan': {
    id: 'vis-wisatawan',
    kind: 'node',
    title: 'Jangkauan Wisatawan',
    stageBadge: 'Tahap 6 · Aksesibilitas Destinasi',
    consensusCount: 5,
    synthesis:
      'Kemudahan calon pengunjung menemukan referensi visual, rute perjalanan, ragam wahana, dan kepastian layanan sebelum berkunjung ke destinasi.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Banyak pengunjung cerita ke petugas wahana bahwa mereka datang karena habis melihat video Taman Ghanjaran lewat di beranda TikTok mereka sehari sebelumnya.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Konversi langsung terpaan konten visual menjadi keputusan kunjungan wisata.',
      },
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Ketika informasi rute, harga tiket, dan gambaran suasana mudah diakses dari ponsel, calon wisatawan keluarga merasa jauh lebih tenang merencanakan liburan ke sini.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Penurunan hambatan informasi bagi wisatawan luar kota.',
      },
    ],
  },

  // ==========================================
  // TAHAP 7 & 8: MUARA HILIR (2 SIMPUL)
  // ==========================================
  'downstream-aktivitas': {
    id: 'downstream-aktivitas',
    kind: 'node',
    title: 'Aktivitas Sosial-Ekonomi',
    stageBadge: 'Tahap 7 · Dampak Hilir Ekonomi & Kohesi Sosial',
    consensusCount: 5,
    synthesis:
      'Muara nyata berupa peningkatan kunjungan wisata, perputaran omzet tenan, bagi hasil saham warga KUB, kontribusi PADes, serta menguatnya gotong royong komunitas.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Dampak paling nyata bukan hanya peningkatan omzet unit usaha dan kontribusi PADes, tetapi terbukanya lapangan kerja bagi warga serta hidupnya kolaborasi antarkelompok di desa.',
        nvivoTheme: 'transaksi',
        contextNote: 'Sinergi pertumbuhan ekonomi lokal dan pemberdayaan sosial masyarakat desa.',
      },
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Alhamdulillah perputaran penjualan di pujasera menopang ekonomi keluarga kami sehari-hari, sekaligus mempererat kerukunan antarpedagang lewat paguyuban.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Manfaat kesejahteraan rumah tangga dan solidaritas sosial paguyuban tenan.',
      },
    ],
  },

  'downstream-legitimasi': {
    id: 'downstream-legitimasi',
    kind: 'node',
    title: 'Kepercayaan & Legitimasi Komunitas',
    stageBadge: 'Tahap 8 · Muara Puncak Mediatisasi Hibrida',
    consensusCount: 4,
    synthesis:
      'Kepercayaan publik dan legitimasi sosial tidak otomatis lahir dari viralitas semata, melainkan terbangun melalui keselarasan informasi digital, bukti manfaat ekonomi, dan transparansi musyawarah.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Kepercayaan warga itu tidak bisa dibeli hanya dengan konten bagus; warga percaya karena apa yang diberitakan di media sejalan dengan laporan terbuka di Musdes dan manfaat ekonominya benar-benar kembali ke masyarakat.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Temuan kunci riset: Trust dibentuk oleh konsistensi informasi, transparansi, dan bukti nyata.',
      },
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Ratusan anggota warga tetap kompak mendukung KUB dan BUMDes karena pembagian hasil usaha serta pengelolaan tiketnya terbuka dan bisa dipertanggungjawabkan bersama.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Legitimasi internal berbasis keterbukaan bagi hasil saham warga komunitas.',
      },
    ],
  },
};

/**
 * Katalog bukti kutipan langsung untuk setiap garis alir (directed edges) antartahap
 * beserta konektor Feedback Loop pada diagram HMM.
 */
export const HMM_EDGE_QUOTES: Record<string, HmmQuoteEvidenceEntry> = {
  // Feedback Loop SVG Edge
  'e-feedback-loop': {
    id: 'e-feedback-loop',
    kind: 'edge',
    title: 'Alur Balik Legitimasi & Evaluasi ke Praktik Komunikasi',
    stageBadge: 'Feedback Loop · Tahap 8 → Tahap 3',
    relationFormula: 'Kepercayaan & Evaluasi Layanan → Praktik Komunikasi & Konten Baru',
    consensusCount: 5,
    synthesis:
      'Ulasan pengunjung, saran tenan, dan tingkat kepercayaan warga pada tahap hilir diumpanbalikkan menjadi pembaruan informasi, koordinasi perbaikan layanan, dan materi konten berikutnya.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Kritik maupun apresiasi pengunjung di kolom komentar langsung kami bahas bersama unit terkait untuk perbaikan lapangan, lalu tindak lanjutnya kami informasikan kembali ke publik.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Mekanisme sirkular evaluasi menuju penyempurnaan komunikasi dan layanan.',
      },
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Ketika masyarakat sudah percaya dan merasakan hasilnya, partisipasi mereka dalam mendukung program komunikasi dan kegiatan desa berikutnya menjadi jauh lebih ringan.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Modal kepercayaan memperkuat keberlanjutan partisipasi tahap selanjutnya.',
      },
    ],
  },

  // ==========================================
  // TAHAP 1 -> TAHAP 2 (17 GARIS ALIR)
  // ==========================================
  'e-bumdes-wa': {
    id: 'e-bumdes-wa',
    kind: 'edge',
    title: 'Koordinasi Kelembagaan Ketua BUMDes via WhatsApp',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua BUMDes → WhatsApp',
    consensusCount: 5,
    synthesis:
      'Ketua BUMDes mengandalkan grup WhatsApp berjenjang sebagai saluran komando taktis dan sinkronisasi harian lintas unit usaha.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Koordinasi tercepat saya dengan pengelola unit, KUB, dan perwakilan tenan setiap pagi sampai malam ya melalui grup WhatsApp masing-masing bidang.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Saluran primer instruksi dan pelaporan cepat manajemen BUMDes.',
      },
    ],
  },
  'e-bumdes-fb': {
    id: 'e-bumdes-fb',
    kind: 'edge',
    title: 'Distribusi Informasi Kelembagaan via Facebook',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua BUMDes → Facebook',
    consensusCount: 4,
    synthesis:
      'Pemanfaatan jejaring Facebook oleh pimpinan BUMDes untuk memantau respons masyarakat sekitar dan menyebarkan kabar kegiatan sosial-ekonomi.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Di Facebook itu warga sekitar dan jejaring komunitas desa banyak berinteraksi, jadi pengumuman kegiatan BUMDes cepat menyebar dari mulut ke mulut maupun bagikan ulang.',
        nvivoTheme: 'platform digital',
        contextNote: 'Jangkauan sosial komunitas lintas kelompok usia di Facebook.',
      },
    ],
  },
  'e-bumdes-av': {
    id: 'e-bumdes-av',
    kind: 'edge',
    title: 'Dokumentasi Visual Program Kelembagaan BUMDes',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua BUMDes → Konten Audio-Visual',
    consensusCount: 4,
    synthesis:
      'Ketua BUMDes memvalidasi dokumentasi foto/video perkembangan unit wisata sebagai bukti akuntabilitas sekaligus materi profil kelembagaan.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Setiap ada kegiatan besar, kunjungan tamu studi banding, atau pembenahan fasilitas baru selalu kami pastikan terdokumentasi foto dan videonya dengan baik.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Dokumentasi visual untuk pelaporan kelembagaan dan publikasi resmi.',
      },
    ],
  },
  'e-bumdes-qris': {
    id: 'e-bumdes-qris',
    kind: 'edge',
    title: 'Fasilitasi Kebijakan Pembayaran QRIS oleh BUMDes',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua BUMDes → QRIS',
    consensusCount: 3,
    synthesis:
      'Manajemen BUMDes mendorong dan mendampingi standarisasi pembayaran nontunai QRIS pada unit layanan wisata dan stand tenan pujasera.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Kami bekerja sama dengan perbankan untuk memfasilitasi pembuatan QRIS bagi unit usaha dan teman-teman tenan supaya pelayanan ke wisatawan makin modern dan rapi.',
        nvivoTheme: 'transaksi',
        contextNote: 'Inisiatif kelembagaan dalam penyediaan infrastruktur pembayaran digital.',
      },
    ],
  },
  'e-kades-wa': {
    id: 'e-kades-wa',
    kind: 'edge',
    title: 'Komunikasi Otoritas & Arahan Kepala Desa via WhatsApp',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Kepala Desa → WhatsApp',
    consensusCount: 5,
    synthesis:
      'Kepala Desa memanfaatkan WhatsApp untuk pemantauan responsif dan penyelarasan kebijakan cepat bersama perangkat desa serta pengurus BUMDes.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Lewat grup WhatsApp koordinasi pimpinan desa dan BUMDes, saya bisa memantau laporan harian kapan saja dan langsung memberi arahan sebelum dibahas lebih lanjut di rapat.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Pemantauan kebijakan secara tangkas oleh pimpinan pemerintah desa.',
      },
    ],
  },
  'e-kades-av': {
    id: 'e-kades-av',
    kind: 'edge',
    title: 'Representasi Legitimasi Desa melalui Konten Audio-Visual',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Kepala Desa → Konten Audio-Visual',
    consensusCount: 3,
    synthesis:
      'Kehadiran Kepala Desa dalam publikasi foto dan video memperkuat kredibilitas resmi program desa wisata di hadapan warga dan mitra eksternal.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Publikasi visual capaian desa wisata kami dorong sebagai sarana edukasi dan keterbukaan bahwa aset desa dikelola produktif untuk kemakmuran bersama.',
        nvivoTheme: 'Opini terhadap MEDIA DIGITAL',
        contextNote: 'Komunikasi simbolik kepemimpinan desa melalui dokumentasi audio-visual.',
      },
    ],
  },
  'e-kub-tiktok': {
    id: 'e-kub-tiktok',
    kind: 'edge',
    title: 'Inisiatif Promosi Wahana melalui TikTok KUB',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua KUB → TikTok BUMDes & KUB',
    consensusCount: 4,
    synthesis:
      'Pengurus KUB secara proaktif mengoperasikan kanal TikTok KUB untuk menampilkan atraksi wahana permainan secara organik dari lapangan.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Kami di KUB punya inisiatif mengunggah video keseruan wahana di TikTok KUB supaya calon pengunjung langsung melihat ramainya suasana permainan di lapangan.',
        nvivoTheme: 'platform digital',
        contextNote: 'Kemandirian promosi digital berbasis kelompok usaha komunitas warga.',
      },
    ],
  },
  'e-kub-wa': {
    id: 'e-kub-wa',
    kind: 'edge',
    title: 'Koordinasi Pengurus & Anggota KUB via WhatsApp',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua KUB → WhatsApp',
    consensusCount: 5,
    synthesis:
      'Grup WhatsApp menjadi ruang pengorganisasian sif jaga operator wahana, perawatan teknis, serta informasi bagi hasil anggota KUB.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Karena anggota KUB jumlahnya banyak dari unsur warga, grup WA sangat vital untuk membagi jadwal jaga wahana, info perawatan alat, dan undangan kumpul kelompok.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Manajemen kolektif anggota komunitas melalui grup percakapan.',
      },
    ],
  },
  'e-kub-fb': {
    id: 'e-kub-fb',
    kind: 'edge',
    title: 'Penyebaran Aktivitas KUB pada Jejaring Facebook',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua KUB → Facebook',
    consensusCount: 4,
    synthesis:
      'Ketua dan anggota KUB memanfaatkan Facebook untuk menyebarkan kabar keramaian wahana kepada jejaring pertemanan keluarga lintas daerah.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Teman-teman pengurus dan anggota sering membagikan postingan kegiatan Taman Ghanjaran di beranda Facebook supaya saudara atau kenalan dari luar kota tertarik mampir.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Amplifikasi organik melalui jejaring sosial anggota komunitas.',
      },
    ],
  },
  'e-kub-av': {
    id: 'e-kub-av',
    kind: 'edge',
    title: 'Perekaman Materi Visual Aktivitas Wahana oleh Tim KUB',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Ketua KUB → Konten Audio-Visual',
    consensusCount: 4,
    synthesis:
      'Operator lapangan KUB mengambil rekaman autentik saat wahana beroperasi penuh untuk disuplai sebagai bahan konten promosi.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Saat momen liburan dan antrean wahana ramai, teman-teman di lapangan langsung merekam video pendek untuk bahan unggahan maupun dikirim ke admin.',
        nvivoTheme: 'Partisipasi Aktif',
        contextNote: 'Kolaborasi suplai rekaman visual langsung dari pengelola wahana.',
      },
    ],
  },
  'e-admin-tiktok': {
    id: 'e-admin-tiktok',
    kind: 'edge',
    title: 'Pengelolaan Utama Akun TikTok Destinasi oleh Admin',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Admin Media Sosial → TikTok BUMDes & KUB',
    consensusCount: 5,
    synthesis:
      'Admin Media Sosial mengelola jadwal unggah, pemilihan tren audio, penulisan takarir, dan moderasi komentar pada kanal TikTok resmi.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Saya mengatur ritme postingan di TikTok menyesuaikan jam aktif audiens dan tren musik yang sedang naik supaya jangkauan videonya optimal.',
        nvivoTheme: 'Peran dalam MESOS dan Media Digital',
        contextNote: 'Manajemen kurasi algoritma dan jadwal publikasi kanal TikTok.',
      },
    ],
  },
  'e-admin-wa': {
    id: 'e-admin-wa',
    kind: 'edge',
    title: 'Koordinasi Bahan Konten & Layanan Admin via WhatsApp',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Admin Media Sosial → WhatsApp',
    consensusCount: 5,
    synthesis:
      'WhatsApp digunakan Admin untuk memverifikasi akurasi bahan pengumuman ke Ketua BUMDes sekaligus melayani pertanyaan reservasi pengunjung.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Sebelum mengunggah info tarif atau event baru, saya selalu konfirmasi dulu via WhatsApp ke pengurus BUMDes supaya informasinya valid dan tidak salah sebut.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Verifikasi editorial cepat antara mediator digital dan manajemen.',
      },
    ],
  },
  'e-admin-fb': {
    id: 'e-admin-fb',
    kind: 'edge',
    title: 'Distribusi Konten Lintas Platform ke Facebook oleh Admin',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Admin Media Sosial → Facebook',
    consensusCount: 4,
    synthesis:
      'Admin menyelaraskan distribusi informasi kegiatan dan visual destinasi ke halaman Facebook untuk menjangkau audiens keluarga.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Materi pengumuman event dan dokumentasi foto tetap kami distribusikan juga ke Facebook agar masyarakat yang tidak memakai TikTok tetap terlayani informasinya.',
        nvivoTheme: 'Peran dalam MESOS dan Media Digital',
        contextNote: 'Strategi distribusi lintas kanal untuk cakupan khalayak yang merata.',
      },
    ],
  },
  'e-admin-av': {
    id: 'e-admin-av',
    kind: 'edge',
    title: 'Produksi & Penyuntingan Konten Foto/Video oleh Admin',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Admin Media Sosial → Konten Audio-Visual',
    consensusCount: 5,
    synthesis:
      'Inti kerja kreatif Admin dalam mengambil gambar lapangan, menyunting video pendek, dan menata kualitas visual identitas destinasi.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Mulai dari ambil footage di lokasi, pilih angle wahana dan kuliner yang menarik, sampai editing video dan teks, semuanya kami kerjakan agar tampilan BUMDes terlihat profesional.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Proses kreatif produksi artefak audio-visual destinasi desa.',
      },
    ],
  },
  'e-tenan-wa': {
    id: 'e-tenan-wa',
    kind: 'edge',
    title: 'Komunikasi Paguyuban Tenan & Pesanan Pelanggan via WhatsApp',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Tenan Pujasera → WhatsApp',
    consensusCount: 5,
    synthesis:
      'Tenan memanfaatkan WhatsApp untuk berkoordinasi dengan pengelola pujasera sekaligus menerima pesanan konsumsi dari pelanggan dan rombongan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Grup WA paguyuban tenan jadi tempat kami terima info dari pengurus BUMDes dan lapor kalau ada kendala air atau lampu, sekalian nomor WA kami dipakai pelanggan pesan makanan.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Fungsi ganda WhatsApp bagi koordinasi paguyuban dan layanan pembeli.',
      },
    ],
  },
  'e-tenan-qris': {
    id: 'e-tenan-qris',
    kind: 'edge',
    title: 'Penerimaan Pembayaran Nontunai QRIS di Lapak Tenan',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Tenan Pujasera → QRIS',
    consensusCount: 3,
    synthesis:
      'Pelaku usaha pujasera mengaplikasikan QRIS secara langsung di meja layanan untuk memfasilitasi transaksi cepat wisatawan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Awalnya sempat belajar dulu cara cek notifikasinya, tapi sekarang justru enak pakai QRIS karena cepat dan uangnya langsung tersimpan rapi di rekening.',
        nvivoTheme: 'transaksi',
        contextNote: 'Pengalaman empiris adaptasi QRIS oleh pedagang kuliner warga.',
      },
    ],
  },
  'e-tenan-av': {
    id: 'e-tenan-av',
    kind: 'edge',
    title: 'Visualisasi Produk Kuliner & Menu oleh Tenan',
    stageBadge: 'Alur Tahap 1 → Tahap 2',
    relationFormula: 'Tenan Pujasera → Konten Audio-Visual',
    consensusCount: 4,
    synthesis:
      'Tenan mendokumentasikan sajian makanan/minuman unggulan mereka baik untuk status pribadi maupun bahan liputan promosi kawasan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Masakan atau minuman yang baru matang sering kami foto dan videokan, lalu dipasang di status atau dikirim waktu admin meliput area food court.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Partisipasi produksi visual produk UMKM dari tingkat lapak.',
      },
    ],
  },

  // ==========================================
  // TAHAP 2 -> TAHAP 3 (13 GARIS ALIR)
  // ==========================================
  'e-tiktok-promosi': {
    id: 'e-tiktok-promosi',
    kind: 'edge',
    title: 'Akselerasi Promosi Destinasi melalui TikTok',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'TikTok BUMDes & KUB → Promosi',
    consensusCount: 5,
    synthesis:
      'Distribusi video pendek di TikTok mempercepat promosi atraksi wisata, wahana baru, dan agenda hiburan akhir pekan.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Promosi event akhir pekan dan wahana favorit paling kencang tarikannya lewat TikTok karena videonya mudah menyebar ke calon pengunjung baru.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Daya ungkit promosi organik pada platform video pendek.',
      },
    ],
  },
  'e-tiktok-rep': {
    id: 'e-tiktok-rep',
    kind: 'edge',
    title: 'Storytelling Audio-Visual Aktivitas Desa di TikTok',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'TikTok BUMDes & KUB → Representasi',
    consensusCount: 5,
    synthesis:
      'Format video vertikal memungkinkan pengemasan suasana sejuk pegunungan dan keramaian aktivitas warga menjadi cerita visual yang hidup.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Lewat video pendek di TikTok, suasana gemerlap lampu wahana dan sejuknya udara Trawas bisa tergambar nyata persis seperti aslinya.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Representasi atmosfer fisik destinasi ke medium digital.',
      },
    ],
  },
  'e-tiktok-interaksi': {
    id: 'e-tiktok-interaksi',
    kind: 'edge',
    title: 'Tanya Jawab & Komentar Calon Wisatawan di TikTok',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'TikTok BUMDes & KUB → Interaksi',
    consensusCount: 4,
    synthesis:
      'Kolom komentar TikTok menjadi ruang dialog langsung tempat calon pengunjung menanyakan tiket, cuaca, fasilitas ramah anak, dan rute jalan.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Di kolom komentar TikTok itu interaksinya hidup sekali—banyak yang tanya harga tiket terusan, akses bus pariwisata, sampai rekomendasi jam terbaik berkunjung.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Dialog pra-kunjungan antara calon wisatawan dan pengelola kanal.',
      },
    ],
  },
  'e-wa-info': {
    id: 'e-wa-info',
    kind: 'edge',
    title: 'Penyebaran Pengumuman Operasional Harian via WhatsApp',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'WhatsApp → Informasi',
    consensusCount: 5,
    synthesis:
      'Grup WhatsApp menyalurkan informasi operasional harian secara serempak dan merata kepada seluruh pengurus serta pelaku usaha kawasan.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Pengumuman jadwal kunjungan tamu, himbauan kebersihan, atau perubahan jam layanan langsung kami bagikan di grup WA supaya semua unit terinformasi di hari yang sama.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Efisiensi transmisi pengumuman operasional internal.',
      },
    ],
  },
  'e-wa-koord': {
    id: 'e-wa-koord',
    kind: 'edge',
    title: 'Koordinasi Lintas Pengurus Pemdes, BUMDes & KUB via WhatsApp',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'WhatsApp → Koordinasi',
    consensusCount: 5,
    synthesis:
      'Sinkronisasi cepat pengambilan tindakan lapangan antar-unit kelembagaan desa dimediasi secara intensif oleh grup WhatsApp.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Koordinasi lintas lembaga antara Pemdes, BUMDes, dan KUB jadi jauh lebih sigap karena komunikasi awal sudah berjalan di grup sebelum kami bertemu tatap muka.',
        nvivoTheme: 'Komunikasi tatap muka atau musyawarah',
        contextNote: 'Pra-koordinasi digital yang mengefisienkan musyawarah kelembagaan.',
      },
    ],
  },
  'e-wa-interaksi': {
    id: 'e-wa-interaksi',
    kind: 'edge',
    title: 'Diskusi Dua Arah & Tindak Lanjut Masukan di WhatsApp',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'WhatsApp → Interaksi',
    consensusCount: 5,
    synthesis:
      'Percakapan timbal balik di grup WhatsApp memfasilitasi penyampaian kendala lapangan dari tenan/operator untuk langsung direspons pengurus.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Kalau ada saran atau keluhan fasilitas di area pujasera, kami sampaikan di grup WA dan pengurus BUMDes cepat menanggapi tindak lanjutnya.',
        nvivoTheme: 'saran dan kritik',
        contextNote: 'Saluran respons cepat atas aspirasi pelaku usaha mikro.',
      },
    ],
  },
  'e-wa-partisipasi': {
    id: 'e-wa-partisipasi',
    kind: 'edge',
    title: 'Mobilisasi Kehadiran Musyawarah & Gotong Royong via WhatsApp',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'WhatsApp → Partisipasi',
    consensusCount: 4,
    synthesis:
      'Undangan dan ajakan di grup WhatsApp menggerakkan kehadiran fisik warga dalam kerja bakti kawasan, evaluasi paguyuban, dan musyawarah desa.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Begitu undangan kerja bakti atau rapat evaluasi kami kirim di grup WA, anggota KUB langsung saling mengingatkan untuk hadir bersama di lokasi.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Pesan digital sebagai pemantik partisipasi kolektif di ruang fisik.',
      },
    ],
  },
  'e-fb-info': {
    id: 'e-fb-info',
    kind: 'edge',
    title: 'Diseminasi Informasi Kegiatan Desa & Layanan di Facebook',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'Facebook → Informasi',
    consensusCount: 4,
    synthesis:
      'Halaman dan grup Facebook menyediakan informasi kegiatan kemasyarakatan serta layanan wisata dalam format teks dan foto yang mudah dibaca warga.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Informasi kegiatan sosial desa dan agenda besar BUMDes yang diunggah di Facebook memudahkan warga luar dusun maupun perantau mengikuti perkembangan desa.',
        nvivoTheme: 'Penggunaan media digital',
        contextNote: 'Keterhubungan informasi publik desa bagi warga dan jejaring luas.',
      },
    ],
  },
  'e-fb-promosi': {
    id: 'e-fb-promosi',
    kind: 'edge',
    title: 'Promosi Acara Komunitas & Paket Wisata melalui Facebook',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'Facebook → Promosi',
    consensusCount: 4,
    synthesis:
      'Poster event hiburan, festival kuliner, dan paket rekreasi keluarga dipromosikan secara efektif ke komunitas pengguna Facebook.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Untuk promosi event panggung hiburan atau paket liburan keluarga, unggahan di Facebook masih sangat efektif menjangkau rombongan orang tua dan komunitas.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Efektivitas promosi segmen keluarga pada platform Facebook.',
      },
    ],
  },
  'e-fb-partisipasi': {
    id: 'e-fb-partisipasi',
    kind: 'edge',
    title: 'Dukungan & Berbagi Unggahan oleh Jejaring Warga di Facebook',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'Facebook → Partisipasi',
    consensusCount: 4,
    synthesis:
      'Fitur bagikan (share) dan komentar positif warga di Facebook memperkuat dukungan moral komunitas terhadap program wisata desa.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Warga senang ikut membagikan unggahan prestasi desa dan keramaian wisata di Facebook mereka; itu wujud kebanggaan dan partisipasi sosial yang tumbuh alami.',
        nvivoTheme: 'Partisipasi Aktif',
        contextNote: 'Kebanggaan kolektif warga yang termanifestasi dalam dukungan digital.',
      },
    ],
  },
  'e-qris-transaksi': {
    id: 'e-qris-transaksi',
    kind: 'edge',
    title: 'Fasilitasi Praktik Pembayaran Nontunai melalui QRIS',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'QRIS → Transaksi',
    consensusCount: 3,
    synthesis:
      'Ketersediaan kode QRIS langsung mengaktifkan praktik transaksi digital yang praktis tanpa hambatan uang tunai di antara tenan dan wisatawan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Dengan QRIS terpasang di depan etalase, transaksi jadi jauh lebih cepat saat antrean ramai karena pembeli tinggal pindai dari aplikasi bank atau dompet digitalnya.',
        nvivoTheme: 'transaksi',
        contextNote: 'Percepatan layanan pembayaran pada jam sibuk kunjungan wisata.',
      },
    ],
  },
  'e-av-promosi': {
    id: 'e-av-promosi',
    kind: 'edge',
    title: 'Kekuatan Visual Foto/Video dalam Memperkuat Promosi',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'Konten Audio-Visual → Promosi',
    consensusCount: 5,
    synthesis:
      'Kualitas sinematik foto dan video pendek memberikan daya pikat emosional yang jauh lebih persuasif dalam promosi destinasi maupun kuliner.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Promosi wisata alam dan wahana itu sangat bergantung pada kekuatan visual; satu video yang menangkap suasana cerah berlatar gunung langsung mengangkat minat kunjung.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Daya persuasi visual dalam komunikasi pemasaran destinasi.',
      },
    ],
  },
  'e-av-rep': {
    id: 'e-av-rep',
    kind: 'edge',
    title: 'Konversi Aktivitas Fisik Desa Menjadi Representasi Audio-Visual',
    stageBadge: 'Alur Tahap 2 → Tahap 3',
    relationFormula: 'Konten Audio-Visual → Representasi',
    consensusCount: 5,
    synthesis:
      'Medium foto dan video menjadi instrumen utama untuk menerjemahkan pengalaman fisik wisata dan budaya desa ke dalam simbol-simbol digital.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Lewat rekaman foto dan video itulah kerja nyata warga, kebersihan kawasan, dan kegembiraan pengunjung direpresentasikan secara utuh kepada masyarakat luas.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Mediasi visual atas kerja kolektif dan kualitas layanan lapangan.',
      },
    ],
  },

  // ==========================================
  // TAHAP 3 -> TAHAP 4 (12 GARIS ALIR)
  // ==========================================
  'e-info-vertikal': {
    id: 'e-info-vertikal',
    kind: 'edge',
    title: 'Aliran Informasi Kebijakan pada Pola Vertikal Pemdes–BUMDes',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Informasi → Vertikal-Institusional',
    consensusCount: 4,
    synthesis:
      'Pertukaran informasi regulasi, laporan kinerja, dan arah pembangunan membentuk struktur komunikasi vertikal yang tertib antara Kepala Desa dan Ketua BUMDes.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Informasi capaian usaha dan kebijakan desa selalu mengalir dua arah antara Pemdes dan pengurus BUMDes sehingga setiap keputusan punya dasar data yang jelas.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Tata aliran informasi akuntabilitas struktural desa.',
      },
    ],
  },
  'e-info-horizontal': {
    id: 'e-info-horizontal',
    kind: 'edge',
    title: 'Berbagi Informasi Setara pada Pola Horizontal-Komunitas',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Informasi → Horizontal-Komunitas',
    consensusCount: 5,
    synthesis:
      'Distribusi kabar operasional yang terbuka antarpengurus KUB, admin, dan kelompok warga memelihara kesetaraan akses informasi di tingkat komunitas.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Semua informasi jadwal ramai, perawatan wahana, maupun hasil kegiatan kami bagikan terbuka ke sesama pengurus dan anggota supaya tidak ada sekat informasi.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Keterbukaan informasi horizontal menjaga kesolidan kelompok warga.',
      },
    ],
  },
  'e-koord-vertikal': {
    id: 'e-koord-vertikal',
    kind: 'edge',
    title: 'Sinkronisasi Keputusan Kelembagaan Pemdes & BUMDes',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Koordinasi → Vertikal-Institusional',
    consensusCount: 5,
    synthesis:
      'Praktik koordinasi intensif menyatukan otoritas regulasi Pemerintah Desa dengan eksekusi manajerial BUMDes.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Untuk kebijakan strategis seperti pengembangan wahana atau penataan kawasan, koordinasi vertikal dengan Pak Kades dan lembaga desa selalu menjadi pijakan utama kami.',
        nvivoTheme: 'Komunikasi tatap muka atau musyawarah',
        contextNote: 'Penyelarasan langkah strategis melalui musyawarah kelembagaan.',
      },
    ],
  },
  'e-koord-horizontal': {
    id: 'e-koord-horizontal',
    kind: 'edge',
    title: 'Koordinasi Operasional Lintas Tim BUMDes–KUB–Admin',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Koordinasi → Horizontal-Komunitas',
    consensusCount: 5,
    synthesis:
      'Koordinasi harian mempertautkan manajemen kawasan, operator wahana KUB, dan tim media sosial dalam satu ritme kerja kolaboratif.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Koordinasi dengan tim lapangan KUB dan pengurus BUMDes itu berlangsung setiap hari, jadi apa yang terjadi di lokasi langsung sinkron dengan yang kami sampaikan di medsos.',
        nvivoTheme: 'Peran dalam MESOS dan Media Digital',
        contextNote: 'Sinkronisasi real-time antara operasional fisik dan komunikasi publik.',
      },
    ],
  },
  'e-promosi-ekonomi': {
    id: 'e-promosi-ekonomi',
    kind: 'edge',
    title: 'Promosi sebagai Penggerak Pola Interaksi Ekonomi',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Promosi → Ekonomi',
    consensusCount: 5,
    synthesis:
      'Aktivitas promosi menggerakkan rantai permintaan ekonomi dari pengelola destinasi menuju lapak tenan dan transaksi wisatawan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Setiap kali promosi kawasan dan kuliner gencar naik menjelang akhir pekan, arus pembeli yang belanja di stand pujasera kami ikut melonjak.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Efek limpahan promosi destinasi terhadap perputaran niaga tenan.',
      },
    ],
  },
  'e-promosi-publik': {
    id: 'e-promosi-publik',
    kind: 'edge',
    title: 'Diseminasi Promosi pada Ruang Publik-Digital',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Promosi → Publik-Digital',
    consensusCount: 5,
    synthesis:
      'Pesan promosi memperluas interaksi terbuka antara ekosistem desa wisata dengan khalayak warganet lintas kota.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Konten promosi yang kami lepas ke ruang publik digital mengundang respons luas dari warganet luar daerah yang sebelumnya belum pernah mendengar nama Ketapanrame.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Perluasan wacana promosi melampaui batas teritorial desa.',
      },
    ],
  },
  'e-rep-publik': {
    id: 'e-rep-publik',
    kind: 'edge',
    title: 'Pembentukan Citra Destinasi pada Pola Publik-Digital',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Representasi → Publik-Digital',
    consensusCount: 5,
    synthesis:
      'Representasi visual yang konsisten membangun persepsi dan citra positif Desa Wisata Ketapanrame di ruang publik siber.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Cara desa merepresentasikan kerapian, keramahan, dan inovasi warganya di media digital membentuk citra kehormatan Ketapanrame di mata masyarakat luas.',
        nvivoTheme: 'Opini terhadap MEDIA DIGITAL',
        contextNote: 'Konstruksi reputasi publik desa melalui representasi digital.',
      },
    ],
  },
  'e-interaksi-horizontal': {
    id: 'e-interaksi-horizontal',
    kind: 'edge',
    title: 'Dialog & Umpan Balik Internal dalam Komunitas',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Interaksi → Horizontal-Komunitas',
    consensusCount: 4,
    synthesis:
      'Kebiasaan berdiskusi dan saling memberi masukan secara terbuka merawat solidaritas horizontal antaranggota paguyuban dan pengurus.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Di internal kelompok kami membiasakan komunikasi dua arah; anggota bebas menyampaikan usulan perbaikan supaya suasana kerja di wahana tetap kompak.',
        nvivoTheme: 'saran dan kritik',
        contextNote: 'Budaya dialog egaliter dalam pengelolaan unit usaha berbasis warga.',
      },
    ],
  },
  'e-interaksi-ekonomi': {
    id: 'e-interaksi-ekonomi',
    kind: 'edge',
    title: 'Pelayanan Responsif Tenan dalam Interaksi Ekonomi',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Interaksi → Ekonomi',
    consensusCount: 4,
    synthesis:
      'Keramahan komunikasi pelayanan dan keterbukaan menerima masukan pelanggan memperkuat kualitas relasi ekonomi antara tenan dan wisatawan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Pelanggan itu kalau disapa ramah, dilayani cepat, dan pesanannya sesuai, mereka tidak segan beli lagi bahkan merekomendasikan stand kami ke rombongannya.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Kualitas interaksi layanan pelanggan dalam mendorong pembelian berulang.',
      },
    ],
  },
  'e-interaksi-publik': {
    id: 'e-interaksi-publik',
    kind: 'edge',
    title: 'Respons Admin terhadap Ulasan & Pertanyaan Warganet',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Interaksi → Publik-Digital',
    consensusCount: 4,
    synthesis:
      'Kecepatan dan kesantunan membalas komentar warganet menghidupkan relasi publik-digital yang dialogis serta kredibel.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Baik komentar pujian maupun kritik di media sosial tetap kami tanggapi dengan sopan dan informatif, karena warganet lain ikut menilai kesigapan pengelola dari kolom komentar.',
        nvivoTheme: 'saran dan kritik',
        contextNote: 'Moderasi interaksi publik yang menjaga kredibilitas layanan destinasi.',
      },
    ],
  },
  'e-partisipasi-horizontal': {
    id: 'e-partisipasi-horizontal',
    kind: 'edge',
    title: 'Gotong Royong & Kolaborasi dalam Pola Horizontal-Komunitas',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Partisipasi → Horizontal-Komunitas',
    consensusCount: 4,
    synthesis:
      'Partisipasi aktif anggota kelompok dan warga memperkuat jejaring kolaborasi horizontal sebagai fondasi sosial BUMDes.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Semangat gotong royong warga dalam paguyuban KUB dan pujasera membuktikan bahwa teknologi digital di desa kami justru memperkuat ikatan kebersamaan, bukan menggerusnya.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Penguatan modal sosial gotong royong di tengah adopsi mediatisasi.',
      },
    ],
  },
  'e-transaksi-ekonomi': {
    id: 'e-transaksi-ekonomi',
    kind: 'edge',
    title: 'Pertukaran Ekonomi Digital Tenan–Konsumen',
    stageBadge: 'Alur Tahap 3 → Tahap 4',
    relationFormula: 'Transaksi → Ekonomi',
    consensusCount: 3,
    synthesis:
      'Praktik pembayaran digital melembagakan pola interaksi ekonomi yang efisien, higienis, dan terdokumentasi di kawasan wisata.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Transaksi jual beli dengan wisatawan sekarang makin lancar karena pilihan bayarnya fleksibel—tunai dilayani, scan QRIS pun langsung beres.',
        nvivoTheme: 'transaksi',
        contextNote: 'Kelancaran pertukaran ekonomi mikro di pujasera wisata.',
      },
    ],
  },

  // ==========================================
  // TAHAP 4 -> TAHAP 5 (7 GARIS ALIR)
  // ==========================================
  'e-vertikal-repinfo': {
    id: 'e-vertikal-repinfo',
    kind: 'edge',
    title: 'Transparansi Pengumuman & Regulasi Resmi Desa–BUMDes',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Vertikal-Institusional → Informasi Digital',
    consensusCount: 4,
    synthesis:
      'Kesepakatan kelembagaan antara Pemerintah Desa dan BUMDes dituangkan menjadi pengumuman serta informasi layanan digital yang resmi dan terverifikasi.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Keputusan bersama antara desa dan BUMDes kami turunkan menjadi pengumuman resmi digital yang jelas agar pelaksana lapangan maupun pengunjung punya pedoman pasti.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Formalisasi keputusan kelembagaan ke dalam informasi digital publik.',
      },
    ],
  },
  'e-horizontal-repkonten': {
    id: 'e-horizontal-repkonten',
    kind: 'edge',
    title: 'Produksi Konten Kolaboratif Kegiatan Komunitas',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Horizontal-Komunitas → Konten Digital',
    consensusCount: 4,
    synthesis:
      'Kerja sama horizontal antara tim lapangan KUB, tenan, dan admin menghasilkan konten video kegiatan komunitas yang autentik.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Karena tim lapangan dan admin kompak bekerja sama, momen kebersamaan warga dan keramaian wahana bisa rutin terangkat menjadi konten video yang menarik.',
        nvivoTheme: 'Partisipasi Aktif',
        contextNote: 'Ko-produksi konten digital berbasis kolaborasi komunitas lapangan.',
      },
    ],
  },
  'e-horizontal-repinfo': {
    id: 'e-horizontal-repinfo',
    kind: 'edge',
    title: 'Aksesibilitas Informasi Jadwal & Layanan Lintas Unit',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Horizontal-Komunitas → Informasi Digital',
    consensusCount: 5,
    synthesis:
      'Pertukaran kabar antarpengelola unit memastikan informasi jadwal operasional dan kesiapan fasilitas tersaji akurat secara digital.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Berkat info cepat dari teman-teman unit wahana dan pujasera, pengumuman jam layanan maupun agenda acara di medsos selalu mutakhir sesuai kondisi riil.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Keakuratan informasi digital yang ditopang koordinasi horizontal.',
      },
    ],
  },
  'e-ekonomi-repproduk': {
    id: 'e-ekonomi-repproduk',
    kind: 'edge',
    title: 'Penyusunan Katalog Produk UMKM, Menu & Paket Wisata',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Ekonomi → Produk Digital',
    consensusCount: 5,
    synthesis:
      'Aktivitas ekonomi kawasan mendorong pengemasan produk kuliner, tiket wahana, dan paket edukasi ke dalam katalog produk digital.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Potensi kuliner warga, wahana permainan, dan paket edukasi desa kami rangkum menjadi produk digital berupa brosur e-katalog dan daftar paket layanan wisata.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Integrasi penawaran unit ekonomi desa dalam format katalog digital.',
      },
    ],
  },
  'e-ekonomi-reptransaksi': {
    id: 'e-ekonomi-reptransaksi',
    kind: 'edge',
    title: 'Pencatatan & Bukti Pembayaran Digital QRIS',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Ekonomi → Transaksi Digital',
    consensusCount: 3,
    synthesis:
      'Interaksi jual beli di pujasera dan unit wisata menghasilkan rekaman bukti transaksi digital yang terverifikasi secara instan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Setiap transaksi lewat scan QRIS otomatis meninggalkan riwayat bukti pembayaran digital di aplikasi merchant kami, jadi tidak takut selisih hitung.',
        nvivoTheme: 'transaksi',
        contextNote: 'Jejak rekaman transaksi elektronik pada usaha kuliner warga.',
      },
    ],
  },
  'e-publik-repkonten': {
    id: 'e-publik-repkonten',
    kind: 'edge',
    title: 'Kurasi Reels Promosi, Edukasi & Testimoni Pengunjung',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Publik-Digital → Konten Digital',
    consensusCount: 5,
    synthesis:
      'Interaksi di ruang publik-digital melahirkan ragam konten kreatif termasuk repost testimoni pengunjung yang memperkaya narasi destinasi.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Selain video produksi tim sendiri, ulasan dan story dari pengunjung yang menandai akun kami turut memperkaya variasi konten digital destinasi setiap minggunya.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Sinergi konten resmi pengelola dan testimoni organik wisatawan.',
      },
    ],
  },
  'e-publik-repinfo': {
    id: 'e-publik-repinfo',
    kind: 'edge',
    title: 'Penyajian Informasi Publik Destinasi yang Mudah Diakses',
    stageBadge: 'Alur Tahap 4 → Tahap 5',
    relationFormula: 'Publik-Digital → Informasi Digital',
    consensusCount: 4,
    synthesis:
      'Pertanyaan berulang dari warganet dirangkum menjadi informasi publik digital (FAQ lokasi, tarif, jam operasional) yang mudah ditemukan siapa saja.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Pertanyaan yang paling sering ditanyakan warganet langsung kami buatkan infografis dan panduan informasi digital supaya mudah diakses kapan pun.',
        nvivoTheme: 'platform digital',
        contextNote: 'Adaptasi kebutuhan informasi publik menjadi panduan digital.',
      },
    ],
  },

  // ==========================================
  // TAHAP 5 -> TAHAP 6 (6 GARIS ALIR)
  // ==========================================
  'e-repkonten-vispublik': {
    id: 'e-repkonten-vispublik',
    kind: 'edge',
    title: 'Eksposur Konten Digital Menembus Luar Komunitas Lokal',
    stageBadge: 'Alur Tahap 5 → Tahap 6',
    relationFormula: 'Konten Digital → Visibilitas Publik',
    consensusCount: 5,
    synthesis:
      'Distribusi video promosi dan edukasi mengangkat keterlihatan (visibilitas) BUMDes Ketapanrame jauh melampaui batas wilayah desa.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Satu konten video yang dikemas tepat bisa ditonton puluhan hingga ratusan ribu kali oleh publik di luar Mojokerto, membuat nama desa makin dikenal luas.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Amplifikasi visibilitas publik melalui konten audio-visual.',
      },
    ],
  },
  'e-repkonten-viswisatawan': {
    id: 'e-repkonten-viswisatawan',
    kind: 'edge',
    title: 'Daya Tarik Visual Konten bagi Calon Wisatawan Luar Daerah',
    stageBadge: 'Alur Tahap 5 → Tahap 6',
    relationFormula: 'Konten Digital → Jangkauan Wisatawan',
    consensusCount: 5,
    synthesis:
      'Visualisasi pengalaman bermain wahana dan bersantai di Taman Ghanjaran menjangkau dan memikat segmen wisatawan keluarga lintas kota.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Calon wisatawan luar kota jadi punya gambaran jelas keseruan wahana kami dari konten video, sehingga mereka tertarik memasukkan Ketapanrame ke agenda liburan.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Daya tarik visual dalam menjangkau wisatawan baru.',
      },
    ],
  },
  'e-repinfo-vispublik': {
    id: 'e-repinfo-vispublik',
    kind: 'edge',
    title: 'Keterbukaan Informasi Digital Meningkatkan Reputasi Publik Desa',
    stageBadge: 'Alur Tahap 5 → Tahap 6',
    relationFormula: 'Informasi Digital → Visibilitas Publik',
    consensusCount: 5,
    synthesis:
      'Konsistensi dan kejelasan informasi publik mengukuhkan reputasi Desa Ketapanrame sebagai rujukan tata kelola desa wisata profesional.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Kemudahan masyarakat mengakses informasi kegiatan dan profil capaian desa ikut mengangkat reputasi Ketapanrame hingga sering menjadi rujukan studi tiru.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Keterbukaan informasi digital sebagai penguat reputasi kelembagaan.',
      },
    ],
  },
  'e-repproduk-vispasar': {
    id: 'e-repproduk-vispasar',
    kind: 'edge',
    title: 'Katalog Produk Digital Memperluas Pasar ke Skala Regional',
    stageBadge: 'Alur Tahap 5 → Tahap 6',
    relationFormula: 'Produk Digital → Jangkauan Pasar',
    consensusCount: 5,
    synthesis:
      'Penyajian paket wisata dan menu UMKM secara digital membuka akses pasar rombongan instansi, sekolah, dan konsumen regional.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Dengan adanya e-katalog paket wisata dan produk usaha desa, pemasaran kami menjangkau instansi, sekolah, dan komunitas dari berbagai kabupaten/kota.',
        nvivoTheme: 'Produk Digital',
        contextNote: 'Perluasan segmen pasar kelembagaan melalui katalog produk digital.',
      },
    ],
  },
  'e-repproduk-viswisatawan': {
    id: 'e-repproduk-viswisatawan',
    kind: 'edge',
    title: 'Kemudahan Akses Informasi Paket Wisata & Menu bagi Wisatawan',
    stageBadge: 'Alur Tahap 5 → Tahap 6',
    relationFormula: 'Produk Digital → Jangkauan Wisatawan',
    consensusCount: 4,
    synthesis:
      'Kejelasan daftar wahana, tarif, dan menu kuliner memudahkan wisatawan merencanakan kunjungan bersama keluarga maupun rombongan.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Wisatawan rombongan merasa terbantu kalau daftar menu dan kisaran harga sudah jelas sejak awal, jadi mereka lebih nyaman memesan untuk keluarga besar.',
        nvivoTheme: 'Kemudahaninformasi dan berkomunikasi',
        contextNote: 'Kepastian informasi produk meningkatkan kenyamanan perencanaan wisata.',
      },
    ],
  },
  'e-reptransaksi-vispasar': {
    id: 'e-reptransaksi-vispasar',
    kind: 'edge',
    title: 'Kesiapan Transaksi Nontunai Memperluas Daya Serap Pasar Modern',
    stageBadge: 'Alur Tahap 5 → Tahap 6',
    relationFormula: 'Transaksi Digital → Jangkauan Pasar',
    consensusCount: 3,
    synthesis:
      'Kemudahan pembayaran digital QRIS menghilangkan hambatan transaksi bagi segmen konsumen perkotaan yang terbiasa bertransaksi nontunai (cashless).',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Banyak pembeli dari kota besar yang terbiasa cashless; begitu tahu di pujasera desa sudah bisa QRIS, mereka justru makin leluasa jajan berbagai menu.',
        nvivoTheme: 'transaksi',
        contextNote: 'Kesiapan pembayaran digital merangkul segmen pasar wisatawan perkotaan.',
      },
    ],
  },

  // ==========================================
  // TAHAP 6 -> TAHAP 7 & 8 (5 GARIS ALIR)
  // ==========================================
  'e-vispublik-aktivitas': {
    id: 'e-vispublik-aktivitas',
    kind: 'edge',
    title: 'Visibilitas Publik Menggerakkan Kolaborasi & Aktivitas Sosial-Ekonomi',
    stageBadge: 'Alur Tahap 6 → Tahap 7',
    relationFormula: 'Visibilitas Publik → Aktivitas Sosial-Ekonomi',
    consensusCount: 4,
    synthesis:
      'Tingginya eksposur publik memicu kebanggaan kolektif warga sekaligus menarik kemitraan dan kunjungan studi tiru yang menggerakkan ekonomi desa.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Semakin dikenal luas Desa Ketapanrame, semakin tinggi pula semangat warga bergotong royong menjaga kualitas kawasan dan menyambut tamu yang datang belajar maupun berwisata.',
        nvivoTheme: 'Partisipasi anggota dan pengurus',
        contextNote: 'Visibilitas eksternal memperkuat kohesi sosial dan produktivitas warga.',
      },
    ],
  },
  'e-vispublik-legitimasi': {
    id: 'e-vispublik-legitimasi',
    kind: 'edge',
    title: 'Pengakuan Publik Memperkuat Legitimasi Kelembagaan BUMDes',
    stageBadge: 'Alur Tahap 6 → Tahap 8',
    relationFormula: 'Visibilitas Publik → Kepercayaan & Legitimasi',
    consensusCount: 4,
    synthesis:
      'Apresiasi eksternal yang selaras dengan tata kelola transparan memperkokoh pengakuan legitimasi atas kepemimpinan BUMDes dan Pemerintah Desa.',
    quotes: [
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Pengakuan publik dari luar daerah ikut menguatkan keyakinan masyarakat bahwa BUMDes milik desa sendiri mampu dikelola secara kredibel dan membanggakan.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Rekognisi publik yang memperteguh legitimasi kelembagaan lokal.',
      },
    ],
  },
  'e-vispasar-aktivitas': {
    id: 'e-vispasar-aktivitas',
    kind: 'edge',
    title: 'Perluasan Pasar Meningkatkan Omzet & Transaksi Ekonomi Warga',
    stageBadge: 'Alur Tahap 6 → Tahap 7',
    relationFormula: 'Jangkauan Pasar → Aktivitas Sosial-Ekonomi',
    consensusCount: 5,
    synthesis:
      'Terbukanya pasar lintas daerah secara langsung mendongkrak volume transaksi harian pujasera, penjualan tiket wahana, dan pendapatan BUMDes.',
    quotes: [
      {
        informantCode: 'INF-05',
        informantRole: 'Tenan Pujasera',
        actorId: 'actor-tenan',
        verbatim:
          'Meluasnya pasar pengunjung dari luar kota langsung terasa pada kenaikan penjualan makanan dan minuman di stand kami setiap akhir pekan dan musim liburan.',
        nvivoTheme: 'transaksi',
        contextNote: 'Konversi perluasan pasar menjadi peningkatan pendapatan UMKM warga.',
      },
    ],
  },
  'e-viswisatawan-aktivitas': {
    id: 'e-viswisatawan-aktivitas',
    kind: 'edge',
    title: 'Arus Kunjungan Wisatawan Menggerakkan Roda Ekonomi Desa',
    stageBadge: 'Alur Tahap 6 → Tahap 7',
    relationFormula: 'Jangkauan Wisatawan → Aktivitas Sosial-Ekonomi',
    consensusCount: 5,
    synthesis:
      'Kedatangan wisatawan mengaktifkan ekosistem ekonomi berantai mulai dari parkir, tiket wahana KUB, kuliner tenan, hingga oleh-oleh warga.',
    quotes: [
      {
        informantCode: 'INF-04',
        informantRole: 'Ketua KUB Wahana Taman Ghanjaran',
        actorId: 'actor-ketua-kub',
        verbatim:
          'Ketika kunjungan wisatawan ramai, efek ekonominya berputar ke semua lini—petugas wahana bekerja, bagi hasil anggota KUB jalan, dan lapak warga ikut laris.',
        nvivoTheme: 'Jangkauan Pemasaran atau Masyarakat',
        contextNote: 'Efek pengganda (multiplier effect) kunjungan wisata pada ekonomi komunitas.',
      },
    ],
  },
  'e-viswisatawan-legitimasi': {
    id: 'e-viswisatawan-legitimasi',
    kind: 'edge',
    title: 'Pengalaman Positif Wisatawan Memperkuat Kredibilitas Destinasi',
    stageBadge: 'Alur Tahap 6 → Tahap 8',
    relationFormula: 'Jangkauan Wisatawan → Kepercayaan & Legitimasi',
    consensusCount: 4,
    synthesis:
      'Kesesuaian antara ekspektasi konten digital dan kenyamanan layanan nyata di lokasi menumbuhkan kepercayaan wisatawan terhadap reputasi destinasi.',
    quotes: [
      {
        informantCode: 'INF-01',
        informantRole: 'Admin Media Sosial',
        actorId: 'actor-admin',
        verbatim:
          'Saat wisatawan datang dan mendapati tempatnya memang bersih, sejuk, serta harganya wajar sesuai info di medsos, mereka meninggalkan ulasan positif karena merasa percaya.',
        nvivoTheme: 'feedback atau tindak lanjut',
        contextNote: 'Kesesuaian realitas lapangan dengan informasi digital melahirkan kredibilitas.',
      },
    ],
  },

  // ==========================================
  // TAHAP 7 -> TAHAP 8 (1 GARIS ALIR)
  // ==========================================
  'e-aktivitas-legitimasi': {
    id: 'e-aktivitas-legitimasi',
    kind: 'edge',
    title: 'Manfaat Nyata Sosial-Ekonomi Memperkokoh Kepercayaan Komunitas',
    stageBadge: 'Alur Tahap 7 → Tahap 8 · Konversi Kunci',
    relationFormula: 'Aktivitas Sosial-Ekonomi → Kepercayaan & Legitimasi',
    consensusCount: 4,
    synthesis:
      'Bukti kesejahteraan ekonomi yang dirasakan langsung oleh keluarga warga dan keterbukaan pembagian hasil usaha menjadi fondasi terkuat legitimasi sosial BUMDes.',
    quotes: [
      {
        informantCode: 'INF-02',
        informantRole: 'Kepala Desa Ketapanrame',
        actorId: 'actor-kades',
        verbatim:
          'Legitimasi tertinggi itu lahir ketika warga melihat dan merasakan sendiri perputaran ekonomi BUMDes menghidupi tetangganya, membuka usaha, dan dikelola secara jujur terbuka.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Pembuktian manfaat sosial-ekonomi sebagai fondasi kepercayaan jangka panjang.',
      },
      {
        informantCode: 'INF-03',
        informantRole: 'Ketua BUMDes',
        actorId: 'actor-ketua-bumdes',
        verbatim:
          'Begitu manfaat ekonomi bagi tenan, anggota KUB, dan desa terbukti nyata serta dilaporkan transparan, kepercayaan masyarakat kepada BUMDes tumbuh sangat kokoh.',
        nvivoTheme: 'Kepercayaan',
        contextNote: 'Keterkaitan kausal antara kinerja sosial-ekonomi dan legitimasi kelembagaan.',
      },
    ],
  },
};

export function getQuoteEvidenceById(
  kind: 'node' | 'edge',
  id: string
): HmmQuoteEvidenceEntry | null {
  if (kind === 'node') {
    return HMM_NODE_QUOTES[id] || null;
  }
  return HMM_EDGE_QUOTES[id] || null;
}
