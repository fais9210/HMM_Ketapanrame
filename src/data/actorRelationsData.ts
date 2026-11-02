export type HmmActorId =
  | 'actor-ketua-bumdes'
  | 'actor-kades'
  | 'actor-ketua-kub'
  | 'actor-admin'
  | 'actor-tenan';

export interface StageRelationItem {
  id: string;
  label: string;
  mechanism: string;
}

export interface InterActorLink {
  targetActorId: HmmActorId;
  targetName: string;
  targetRoleSubtitle: string;
  patternType: 'Vertikal-Institusional' | 'Horizontal-Komunitas' | 'Ekonomi' | 'Publik-Digital';
  directionLabel: string;
  relationshipSummary: string;
  concretePractices: string[];
}

export interface ActorRelationProfile {
  actorId: HmmActorId;
  informantId: string; // matches informantsData id e.g. 'informan_3'
  projectMapNodeId: string; // matches defaultProjectMapNodes id e.g. 'actor_bumdes'
  shortTitle: string;
  structuralTitle: string;
  roleClassification: string;
  executiveSummary: string;
  theoreticalPosition: string;
  feedbackLoopRole: string;
  nonCodedExplanation: string;
  stages: {
    mediaPlatforms: StageRelationItem[];
    commPractices: StageRelationItem[];
    interactionPatterns: StageRelationItem[];
    digitalRepresentations: StageRelationItem[];
    visibilityReach: StageRelationItem[];
    downstreamOutcomes: StageRelationItem[];
    empiricalClusters: StageRelationItem[];
  };
  interActorRelations: InterActorLink[];
}

export const hmmActorOrder: HmmActorId[] = [
  'actor-ketua-bumdes',
  'actor-kades',
  'actor-ketua-kub',
  'actor-admin',
  'actor-tenan',
];

export const actorRelationsCatalog: Record<HmmActorId, ActorRelationProfile> = {
  'actor-ketua-bumdes': {
    actorId: 'actor-ketua-bumdes',
    informantId: 'informan_3',
    projectMapNodeId: 'actor_bumdes',
    shortTitle: 'Ketua BUMDes',
    structuralTitle: 'Pengelola Kelembagaan & Penghubung Ekosistem Usaha Desa',
    roleClassification: 'Hub Manajerial & Orkestrator Lintas Unit',
    executiveSummary:
      'Ketua BUMDes menempati posisi sentral sebagai simpul penghubung (institutional broker) yang menjembatani otoritas kebijakan Pemerintah Desa dengan unit operasional wisata (KUB Taman Ghanjaran), pengelola konten digital (Admin Medsos), serta pelaku ekonomi mikro (Tenan Pujasera).',
    theoreticalPosition:
      'Dalam kerangka Hybrid Mediatization Mapping (HMM), Ketua BUMDes mengintegrasikan musyawarah tatap muka dengan koordinasi berbasis grup WhatsApp untuk menjaga keselarasan keputusan manajerial, transparansi tata kelola keuangan, dan arah promosi kelembagaan.',
    feedbackLoopRole:
      'Menerima laporan evaluasi layanan, saran/kritik wisatawan, serta performa transaksi unit usaha dari tahap muara (Tahap 7–8) untuk dirumuskan kembali menjadi instruksi perbaikan operasional dan strategi komunikasi berikutnya (Tahap 3).',
    nonCodedExplanation:
      'Mengonfirmasi 15 dari 16 tema aktif NVivo (93,8%). Satu-satunya tema yang tidak dikoding secara langsung adalah teknis operasional harian "Peran dalam MEDSOS dan Media Digital" karena eksekusi produksi konten didelegasikan secara terstruktur kepada Admin Media Sosial.',
    stages: {
      mediaPlatforms: [
        {
          id: 'media-wa',
          label: 'WhatsApp (Grup Koordinasi & Lintas Unit)',
          mechanism:
            'Saluran primer untuk instruksi harian, sinkronisasi kebijakan bersama Kepala Desa, serta koordinasi cepat dengan Ketua KUB dan perwakilan tenan.',
        },
        {
          id: 'media-fb',
          label: 'Facebook Komunitas & Halaman Desa',
          mechanism:
            'Digunakan untuk memantau respons warga sekitar dan menyebarkan pengumuman kegiatan sosial-ekonomi BUMDes kepada jejaring masyarakat lintas usia.',
        },
        {
          id: 'media-audiovisual',
          label: 'Konten Audio-Visual (Foto & Video Dokumentasi)',
          mechanism:
            'Memvalidasi materi dokumentasi perkembangan unit wisata dan laporan visual akuntabilitas kegiatan kelembagaan.',
        },
      ],
      commPractices: [
        {
          id: 'comm-koordinasi',
          label: 'Koordinasi Antaraktor & Kelembagaan',
          mechanism:
            'Mengatur pembagian peran antarunit usaha, jadwal operasional kawasan wisata, serta tindak lanjut kendala lapangan secara hibrida (rapat rutin dan grup digital).',
        },
        {
          id: 'comm-info',
          label: 'Distribusi Informasi & Kebijakan Operasional',
          mechanism:
            'Menyampaikan regulasi sewa stand, standar pelayanan pengunjung, serta keterbukaan informasi program pemberdayaan ekonomi warga.',
        },
        {
          id: 'comm-promosi',
          label: 'Promosi Kelembagaan & Jejaring Kemitraan',
          mechanism:
            'Memperkenalkan profil inovasi BUMDes Ketapanrame kepada mitra eksternal, studi tiru desa lain, dan pemangku kepentingan regional.',
        },
      ],
      interactionPatterns: [
        {
          id: 'pattern-vertikal',
          label: 'Vertikal-Institusional (Kepala Desa ↔ Ketua BUMDes)',
          mechanism:
            'Pertukaran laporan pertanggungjawaban, penyelarasan visi pembangunan desa, dan penguatan payung legitimasi regulasi.',
        },
        {
          id: 'pattern-horizontal',
          label: 'Horizontal-Komunitas (BUMDes ↔ KUB ↔ Admin ↔ Warga)',
          mechanism:
            'Kolaborasi setara dalam pengelolaan event destinasi, penyampaian aspirasi pengurus, dan penjagaan kohesi sosial kelompok.',
        },
        {
          id: 'pattern-ekonomi',
          label: 'Ekonomi (BUMDes → Tenan → Wisatawan)',
          mechanism:
            'Pengelolaan tata niaga kawasan Pujasera, fasilitasi infrastruktur pembayaran nontunai QRIS, dan perluasan pasar usaha warga.',
        },
      ],
      digitalRepresentations: [
        {
          id: 'rep-info',
          label: 'Informasi Digital Terstruktur',
          mechanism:
            'Pengumuman resmi kelembagaan, tata tertib kawasan wisata, dan edaran digital internal pengurus.',
        },
        {
          id: 'rep-konten',
          label: 'Konten Digital Profil & Aktivitas',
          mechanism:
            'Representasi kemajuan tata kelola BUMDes yang memperkuat citra profesionalisme usaha milik desa.',
        },
        {
          id: 'rep-produk',
          label: 'Produk Digital & Paket Layanan Wisata',
          mechanism:
            'Penyusunan paket kunjungan edukasi/studi banding desa wisata serta integrasi katalog layanan unit usaha.',
        },
      ],
      visibilityReach: [
        {
          id: 'vis-publik',
          label: 'Visibilitas Publik Lintas Wilayah',
          mechanism:
            'Meningkatkan reputasi BUMDes Ketapanrame sebagai rujukan pengelolaan desa wisata berbasis komunitas.',
        },
        {
          id: 'vis-pasar',
          label: 'Jangkauan Pasar Regional & Nasional',
          mechanism:
            'Membuka akses pasar yang lebih luas bagi seluruh unit usaha dan pelaku UMKM di bawah naungan BUMDes.',
        },
        {
          id: 'vis-wisatawan',
          label: 'Kemudahan Akses Informasi Wisatawan',
          mechanism:
            'Memastikan calon pengunjung memperoleh kepastian informasi layanan, tarif, dan fasilitas destinasi.',
        },
      ],
      downstreamOutcomes: [
        {
          id: 'downstream-aktivitas',
          label: 'Aktivitas Sosial-Ekonomi Berkelanjutan',
          mechanism:
            'Mendorong pertumbuhan Pendapatan Asli Desa (PADes), perputaran omzet tenan warga, dan partisipasi kerja lokal.',
        },
        {
          id: 'downstream-legitimasi',
          label: 'Kepercayaan & Legitimasi Komunitas',
          mechanism:
            'Membangun kepercayaan warga dan pemerintah desa melalui konsistensi informasi, transparansi hasil usaha, dan responsivitas keluhan.',
        },
      ],
      empiricalClusters: [
        {
          id: 'emp-matrix',
          label: 'Matrix Coding (15/16 Tema Terkonfirmasi)',
          mechanism:
            'Menunjukkan cakupan keterlibatan manajerial yang sangat komprehensif pada dimensi tata kelola, transaksi, dan kepercayaan.',
        },
        {
          id: 'emp-crosstab',
          label: 'Crosstab Peran Institusional',
          mechanism:
            'Membuktikan bahwa intensitas koordinasi dan tema kepercayaan berakar pada tanggung jawab struktural pimpinan BUMDes.',
        },
        {
          id: 'emp-similarity',
          label: 'Word Similarity (Pearson 0,679–0,845)',
          mechanism:
            'Memperlihatkan keselarasan kosakata strategis antara Ketua BUMDes, Kepala Desa, dan pengelola teknis di lapangan.',
        },
        {
          id: 'emp-projectmap',
          label: 'Project Map (Simpul Penghubung Utama)',
          mechanism:
            'Terhubung langsung ke tema Penggunaan Media Digital dan Platform Digital yang memediasi dampak ekonomi serta legitimasi.',
        },
      ],
    },
    interActorRelations: [
      {
        targetActorId: 'actor-kades',
        targetName: 'Kepala Desa',
        targetRoleSubtitle: 'Otoritas & Legitimasi Kebijakan Desa',
        patternType: 'Vertikal-Institusional',
        directionLabel: 'Ketua BUMDes ↔ Kepala Desa',
        relationshipSummary:
          'Hubungan akuntabilitas kelembagaan dan penyelarasan kebijakan strategis desa.',
        concretePractices: [
          'Pelaporan berkala kinerja unit usaha dan kontribusi PADes melalui musyawarah desa maupun koordinasi WhatsApp.',
          'Konsultasi pengambilan keputusan strategis terkait pengembangan kawasan wisata Taman Ghanjaran.',
        ],
      },
      {
        targetActorId: 'actor-ketua-kub',
        targetName: 'Ketua KUB',
        targetRoleSubtitle: 'Pengelola Kelompok Usaha Bersama Wahana',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Ketua BUMDes ↔ Ketua KUB',
        relationshipSummary:
          'Sinergi operasional pengelolaan wahana wisata dan pengorganisasian partisipasi kelompok warga.',
        concretePractices: [
          'Sinkronisasi jadwal pemeliharaan wahana, kesiapan petugas lapangan, dan keamanan pengunjung.',
          'Penyelarasan agenda event wisata agar promosi KUB dan BUMDes berjalan terpadu.',
        ],
      },
      {
        targetActorId: 'actor-admin',
        targetName: 'Admin Media Sosial',
        targetRoleSubtitle: 'Mediator Digital & Produsen Konten',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Ketua BUMDes → Admin Media Sosial',
        relationshipSummary:
          'Pemberian arahan informasi resmi, kurasi pesan kelembagaan, dan penerusan umpan balik audiens.',
        concretePractices: [
          'Menyuplai informasi kebijakan baru, tarif, atau pengumuman resmi untuk dikemas menjadi konten visual publik.',
          'Menerima laporan tren komentar, pertanyaan, dan kritik netizen dari Admin untuk ditindaklanjuti manajemen.',
        ],
      },
      {
        targetActorId: 'actor-tenan',
        targetName: 'Tenan Pujasera/Food Court',
        targetRoleSubtitle: 'Aktor Ekonomi Mikro & Kuliner Warga',
        patternType: 'Ekonomi',
        directionLabel: 'Ketua BUMDes ↔ Tenan Pujasera',
        relationshipSummary:
          'Fasilitasi ruang usaha kuliner, pendampingan adopsi QRIS, dan pengelolaan standar layanan pengunjung.',
        concretePractices: [
          'Koordinasi ketertiban lapak, kebersihan, dan standarisasi harga melalui paguyuban dan grup WhatsApp tenan.',
          'Pendampingan implementasi pembayaran digital QRIS guna mempermudah transaksi wisatawan.',
        ],
      },
    ],
  },

  'actor-kades': {
    actorId: 'actor-kades',
    informantId: 'informan_2',
    projectMapNodeId: 'actor_kades',
    shortTitle: 'Kepala Desa',
    structuralTitle: 'Pemegang Otoritas Kebijakan & Penjamin Legitimasi Publik',
    roleClassification: 'Jangkar Legitimasi & Pengarah Kebijakan Desa',
    executiveSummary:
      'Kepala Desa berperan sebagai penjamin legitimasi sosial-politik dan pengarah visi transformasi digital Desa Ketapanrame, memastikan pengelolaan BUMDes tetap berpihak pada kesejahteraan warga serta tata kelola yang transparan.',
    theoreticalPosition:
      'Dalam model HMM, Kepala Desa memperkuat dimensi mediatisasi kelembagaan: kehadiran komunikasi tatap muka (musyawarah desa/cangkrukan warga) dipadukan dengan pemantauan aktif saluran digital untuk merawat kepercayaan kolektif masyarakat.',
    feedbackLoopRole:
      'Menjadikan tingkat kepercayaan masyarakat dan legitimasi publik (Tahap 8) sebagai tolok ukur evaluasi kebijakan desa serta penguatan dukungan regulasi bagi inovasi komunikasi BUMDes berikutnya.',
    nonCodedExplanation:
      'Mengonfirmasi penuh 16 dari 16 tema aktif NVivo (100% cakupan tema). Hal ini mencerminkan perspektif makro Kepala Desa yang memantau seluruh aspek mulai dari kebijakan, musyawarah, kendala medsos, transaksi QRIS, hingga kepercayaan warga.',
    stages: {
      mediaPlatforms: [
        {
          id: 'media-wa',
          label: 'WhatsApp (Koordinasi Pimpinan & Perangkat/BUMDes)',
          mechanism:
            'Instrumen pemantauan cepat, penyampaian arahan kebijakan, serta jalur aspirasi langsung antara pimpinan desa dan pengelola BUMDes.',
        },
        {
          id: 'media-audiovisual',
          label: 'Konten Audio-Visual (Publikasi Capaian & Edukasi)',
          mechanism:
            'Representasi keterbukaan program pemerintah desa dan pencapaian kolektif masyarakat Ketapanrame di ruang publik.',
        },
      ],
      commPractices: [
        {
          id: 'comm-info',
          label: 'Informasi Kebijakan & Transparansi Publik',
          mechanism:
            'Menyosialisasikan arah pembangunan desa wisata, alokasi manfaat sosial-ekonomi, dan keterbukaan tata kelola kepada warga.',
        },
        {
          id: 'comm-koordinasi',
          label: 'Koordinasi Kelembagaan Lintas Sektor',
          mechanism:
            'Menyelaraskan langkah antara Pemerintah Desa, pengurus BUMDes, BPD, lembaga kemasyarakatan, dan kelompok usaha warga.',
        },
        {
          id: 'comm-partisipasi',
          label: 'Mobilisasi Partisipasi & Kepemilikan Warga',
          mechanism:
            'Mendorong keterlibatan aktif warga dalam menjaga ekosistem wisata desa melalui kombinasi musyawarah dan komunikasi digital.',
        },
      ],
      interactionPatterns: [
        {
          id: 'pattern-vertikal',
          label: 'Vertikal-Institusional (Kepala Desa ↔ Ketua BUMDes)',
          mechanism:
            'Pola relasi struktural berbasis mandat regulasi desa, pembinaan kelembagaan, pengawasan akuntabilitas, dan dukungan otoritas.',
        },
      ],
      digitalRepresentations: [
        {
          id: 'rep-info',
          label: 'Informasi Digital Tata Kelola & Layanan',
          mechanism:
            'Penyebaran maklumat kegiatan desa, capaian penghargaan desa wisata, serta keterbukaan informasi publik.',
        },
        {
          id: 'rep-konten',
          label: 'Konten Digital Narasi Kemandirian Desa',
          mechanism:
            'Penguatan identitas Ketapanrame sebagai desa mandiri yang adaptif terhadap inovasi digital tanpa meninggalkan nilai musyawarah.',
        },
      ],
      visibilityReach: [
        {
          id: 'vis-publik',
          label: 'Visibilitas Publik & Reputasi Kelembagaan',
          mechanism:
            'Memperluas pengakuan eksternal dari pemerintah daerah/pusat dan masyarakat luas terhadap kredibilitas tata kelola desa.',
        },
      ],
      downstreamOutcomes: [
        {
          id: 'downstream-legitimasi',
          label: 'Kepercayaan & Legitimasi Komunitas (Muara Utama)',
          mechanism:
            'Terbentuknya dukungan sosial yang kokoh karena warga merasakan kesesuaian antara narasi digital dan manfaat ekonomi nyata.',
        },
        {
          id: 'downstream-aktivitas',
          label: 'Penguatan Aktivitas Sosial-Ekonomi Desa',
          mechanism:
            'Iklim usaha desa yang kondusif mendorong tumbuhnya lapangan kerja lokal, investasi warga (skema saham warga/KUB), dan perputaran ekonomi.',
        },
      ],
      empiricalClusters: [
        {
          id: 'emp-matrix',
          label: 'Matrix Coding (16/16 Tema Aktif — 100%)',
          mechanism:
            'Satu-satunya informan dengan cakupan koding penuh di seluruh 16 tema kualitatif, menegaskan penguasaan visi menyeluruh.',
        },
        {
          id: 'emp-crosstab',
          label: 'Crosstab Otoritas & Kepercayaan',
          mechanism:
            'Mengonfirmasi irisan kuat antara kepemimpinan struktural dengan tema Kepercayaan, Musyawarah Tatap Muka, dan Transaksi.',
        },
        {
          id: 'emp-evidence',
          label: 'Evidence Coding Kebijakan Digital',
          mechanism:
            'Dukungan nyata terhadap modernisasi pembayaran digital (QRIS) dan penguatan kapasitas SDM media sosial desa.',
        },
      ],
    },
    interActorRelations: [
      {
        targetActorId: 'actor-ketua-bumdes',
        targetName: 'Ketua BUMDes',
        targetRoleSubtitle: 'Pengelola Eksekutif BUMDes',
        patternType: 'Vertikal-Institusional',
        directionLabel: 'Kepala Desa ↔ Ketua BUMDes',
        relationshipSummary:
          'Relasi pembinaan, mandat operasional, dan evaluasi akuntabilitas pengelolaan aset ekonomi desa.',
        concretePractices: [
          'Memberikan payung kebijakan dan dukungan fasilitas bagi pengembangan unit usaha BUMDes.',
          'Menerima laporan evaluasi berkala serta membahas solusi strategis melalui rapat koordinasi dan WhatsApp.',
        ],
      },
      {
        targetActorId: 'actor-ketua-kub',
        targetName: 'Ketua KUB',
        targetRoleSubtitle: 'Pengelola Kelompok Komunitas Wahana',
        patternType: 'Vertikal-Institusional',
        directionLabel: 'Kepala Desa → Ketua KUB',
        relationshipSummary:
          'Penguatan skema pemberdayaan komunitas agar warga terlibat sebagai subjek pemilik manfaat wisata.',
        concretePractices: [
          'Menjaga semangat gotong royong dan keadilan distribusi manfaat ekonomi bagi anggota kelompok warga.',
          'Memfasilitasi ruang musyawarah apabila muncul dinamika antar-kelompok pengelola di lapangan.',
        ],
      },
      {
        targetActorId: 'actor-admin',
        targetName: 'Admin Media Sosial',
        targetRoleSubtitle: 'Mediator Digital Desa & BUMDes',
        patternType: 'Publik-Digital',
        directionLabel: 'Kepala Desa ↔ Admin Media Sosial',
        relationshipSummary:
          'Dukungan penguatan kapasitas kreatif generasi muda desa sebagai wajah komunikasi publik.',
        concretePractices: [
          'Memberikan apresiasi dan ruang kreasi bagi pemuda desa dalam memproduksi konten promosi destinasi.',
          'Memantau keselarasan etika komunikasi publik pada kanal resmi dengan nilai sosial masyarakat desa.',
        ],
      },
      {
        targetActorId: 'actor-tenan',
        targetName: 'Tenan Pujasera/Food Court',
        targetRoleSubtitle: 'Pelaku UMKM Kuliner Warga',
        patternType: 'Ekonomi',
        directionLabel: 'Kepala Desa → Tenan Pujasera',
        relationshipSummary:
          'Perlindungan kesempatan berusaha bagi warga lokal dan dorongan inklusi literasi keuangan digital.',
        concretePractices: [
          'Memastikan kuota lapak pujasera memprioritaskan pemberdayaan ekonomi keluarga warga Desa Ketapanrame.',
          'Mendukung adopsi pembayaran nontunai (QRIS) untuk kemudahan pencatatan dan pelayanan wisatawan.',
        ],
      },
    ],
  },

  'actor-ketua-kub': {
    actorId: 'actor-ketua-kub',
    informantId: 'informan_4',
    projectMapNodeId: 'actor_kub',
    shortTitle: 'Ketua KUB',
    structuralTitle: 'Penggerak Kelompok Usaha Bersama & Operasional Wahana Komunitas',
    roleClassification: 'Koordinator Komunitas & Penggerak Partisipasi Lapangan',
    executiveSummary:
      'Ketua KUB (Kelompok Usaha Bersama Wahana Taman Ghanjaran) merepresentasikan kepemimpinan komunitas berbasis warga yang mengorganisir operasional wahana wisata sekaligus memobilisasi promosi organik dari akar rumput.',
    theoreticalPosition:
      'Pada model HMM, Ketua KUB memperlihatkan bagaimana kelompok usaha warga mengadopsi TikTok KUB, WhatsApp, dan Facebook untuk mengubah aktivitas fisik wahana menjadi daya tarik visual yang memicu kunjungan wisatawan.',
    feedbackLoopRole:
      'Merasakan langsung dampak peningkatan kunjungan wisatawan dan kepercayaan anggota kelompok (Tahap 7–8), lalu menerjemahkannya menjadi inovasi layanan wahana serta ide konten promosi bersama berikutnya.',
    nonCodedExplanation:
      'Mengonfirmasi 10 dari 16 tema aktif NVivo (62,5%) yang terfokus tajam pada inti koordinasi kelompok, promosi pemasaran, komunikasi musyawarah, transaksi wahana, dan kepercayaan anggota KUB.',
    stages: {
      mediaPlatforms: [
        {
          id: 'media-tiktok',
          label: 'TikTok KUB & BUMDes',
          mechanism:
            'Kanal unggulan untuk menampilkan keseruan wahana permainan secara audio-visual guna menjangkau segmen wisatawan keluarga dan pemuda.',
        },
        {
          id: 'media-wa',
          label: 'WhatsApp Grup Pengurus & Anggota KUB',
          mechanism:
            'Media koordinasi harian pembagian sif jaga wahana, perawatan teknis, serta pelaporan jumlah kunjungan.',
        },
        {
          id: 'media-fb',
          label: 'Facebook Jejaring Komunitas',
          mechanism:
            'Menjangkau komunitas warga sekitar Mojokerto–Pasuruan–Sidoarjo melalui berbagi unggahan aktivitas Taman Ghanjaran.',
        },
        {
          id: 'media-audiovisual',
          label: 'Konten Audio-Visual Aktivitas Wahana',
          mechanism:
            'Pengambilan rekaman video suasana keramaian pengunjung dan uji coba wahana sebagai bukti daya tarik wisata.',
        },
      ],
      commPractices: [
        {
          id: 'comm-koordinasi',
          label: 'Koordinasi Kelompok & Sif Operasional',
          mechanism:
            'Mengatur kesiapan SDM operator wahana, standar keselamatan, dan rapat evaluasi kelompok KUB.',
        },
        {
          id: 'comm-promosi',
          label: 'Promosi Wahana & Daya Tarik Destinasi',
          mechanism:
            'Memperkenalkan wahana unggulan dan suasana sejuk pegunungan Trawas melalui video pendek yang menarik.',
        },
        {
          id: 'comm-partisipasi',
          label: 'Partisipasi Anggota & Gotong Royong',
          mechanism:
            'Merawat rasa memiliki (sense of belonging) ratusan warga anggota KUB yang berinvestasi dan bekerja di kawasan wisata.',
        },
        {
          id: 'comm-interaksi',
          label: 'Interaksi Pengunjung & Respons Lapangan',
          mechanism:
            'Menanggapi pertanyaan serta masukan langsung dari wisatawan saat beraktivitas di area wahana.',
        },
      ],
      interactionPatterns: [
        {
          id: 'pattern-horizontal',
          label: 'Horizontal-Komunitas (BUMDes ↔ KUB ↔ Admin ↔ Anggota)',
          mechanism:
            'Pertukaran informasi setara antar-pengelola lapangan, kolaborasi pembuatan konten, dan musyawarah internal anggota.',
        },
        {
          id: 'pattern-ekonomi',
          label: 'Ekonomi (KUB → Wisatawan & Bagi Hasil Anggota)',
          mechanism:
            'Pengelolaan tiket wahana dan skema bagi hasil kolektif yang transparan bagi kesejahteraan anggota komunitas.',
        },
      ],
      digitalRepresentations: [
        {
          id: 'rep-konten',
          label: 'Konten Digital Pengalaman Wisata',
          mechanism:
            'Cuplikan video pengalaman menaiki wahana dan testimoni kebahagiaan pengunjung di Taman Ghanjaran.',
        },
        {
          id: 'rep-produk',
          label: 'Produk Digital Informasi Wahana & Tiket',
          mechanism:
            'Penyajian informasi daftar wahana, jam operasional malam/akhir pekan, dan tarif terusan secara jelas.',
        },
      ],
      visibilityReach: [
        {
          id: 'vis-wisatawan',
          label: 'Jangkauan Wisatawan Keluarga & Regional',
          mechanism:
            'Memudahkan calon wisatawan mengenali variasi wahana sebelum berkunjung ke Desa Ketapanrame.',
        },
        {
          id: 'vis-publik',
          label: 'Visibilitas Publik Aktivitas Komunitas',
          mechanism:
            'Memperlihatkan keberhasilan kolaborasi ekonomi warga desa kepada khalayak luas di media sosial.',
        },
        {
          id: 'vis-pasar',
          label: 'Perluasan Pasar Destinasi Wisata',
          mechanism:
            'Menarik kunjungan rombongan sekolah, keluarga, dan wisatawan luar kota secara konsisten.',
        },
      ],
      downstreamOutcomes: [
        {
          id: 'downstream-aktivitas',
          label: 'Aktivitas Ekonomi & Kohesi Sosial Anggota',
          mechanism:
            'Meningkatkan pendapatan bagi hasil anggota KUB sekaligus mempererat solidaritas sosial warga desa.',
        },
        {
          id: 'downstream-legitimasi',
          label: 'Kepercayaan Internal Anggota & Publik',
          mechanism:
            'Keterbukaan pengelolaan tiket dan pembagian manfaat memperkuat kepercayaan anggota terhadap pengurus KUB dan BUMDes.',
        },
      ],
      empiricalClusters: [
        {
          id: 'emp-wordcloud',
          label: 'Word Cloud (Wacana Wisata, Usaha & Masyarakat)',
          mechanism:
            'Menyumbang frekuensi tinggi pada kata kunci operasional wisata, kebersamaan masyarakat, dan jangkauan pengunjung.',
        },
        {
          id: 'emp-evidence',
          label: 'Evidence Coding (TikTok KUB & Promosi Wahana)',
          mechanism:
            'Bukti empiris inisiatif unit komunitas yang aktif mengelola akun TikTok KUB untuk mendongkrak visibilitas wahana.',
        },
        {
          id: 'emp-projectmap',
          label: 'Project Map (Jembatan Komunitas–Platform)',
          mechanism:
            'Memperlihatkan keterhubungan langsung aktor KUB ke Penggunaan Media Digital, Platform Digital, dan tema Kepercayaan.',
        },
      ],
    },
    interActorRelations: [
      {
        targetActorId: 'actor-ketua-bumdes',
        targetName: 'Ketua BUMDes',
        targetRoleSubtitle: 'Koordinator Induk Unit Usaha Desa',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Ketua KUB ↔ Ketua BUMDes',
        relationshipSummary:
          'Kemitraan pengelolaan kawasan Taman Ghanjaran, sinkronisasi tiket/bagi hasil, dan pemeliharaan fasilitas.',
        concretePractices: [
          'Koordinasi rutin melalui grup WhatsApp dan rapat tatap muka terkait operasional harian dan ketertiban kawasan.',
          'Pelaporan transparan pendapatan wahana serta perencanaan pengembangan fasilitas baru.',
        ],
      },
      {
        targetActorId: 'actor-admin',
        targetName: 'Admin Media Sosial',
        targetRoleSubtitle: 'Produsen Konten & Pengelola Kanal Resmi',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Ketua KUB ↔ Admin Media Sosial',
        relationshipSummary:
          'Kolaborasi produksi video promosi wahana dan penyelarasan jadwal publikasi event destinasi.',
        concretePractices: [
          'Berbagi rekaman momen keramaian pengunjung di wahana untuk diunggah pada akun TikTok dan Instagram resmi.',
          'Saling mendukung jangkauan promosi antara akun TikTok KUB dan kanal utama BUMDes.',
        ],
      },
      {
        targetActorId: 'actor-tenan',
        targetName: 'Tenan Pujasera/Food Court',
        targetRoleSubtitle: 'Mitra Ekosistem Kawasan Wisata',
        patternType: 'Ekonomi',
        directionLabel: 'Ketua KUB ↔ Tenan Pujasera',
        relationshipSummary:
          'Simbiosis ekonomi dalam satu kawasan: daya tarik wahana mendatangkan pengunjung ke area kuliner Pujasera.',
        concretePractices: [
          'Lonjakan wisatawan hasil promosi wahana secara langsung meningkatkan trafik pembeli pada stand kuliner tenan.',
          'Saling menjaga kenyamanan, kebersihan, dan keramahan layanan di lingkungan Taman Ghanjaran.',
        ],
      },
      {
        targetActorId: 'actor-kades',
        targetName: 'Kepala Desa',
        targetRoleSubtitle: 'Pembina Komunitas & Otoritas Desa',
        patternType: 'Vertikal-Institusional',
        directionLabel: 'Ketua KUB ↔ Kepala Desa',
        relationshipSummary:
          'Dukungan pembinaan kelembagaan warga dan penjagaan akuntabilitas kepemilikan kolektif.',
        concretePractices: [
          'Mengikuti musyawarah desa dalam menyelaraskan tata kelola KUB dengan regulasi pemberdayaan warga.',
          'Menjaga kepercayaan ratusan warga penanam modal komunitas melalui pelaporan yang terbuka.',
        ],
      },
    ],
  },

  'actor-admin': {
    actorId: 'actor-admin',
    informantId: 'informan_1',
    projectMapNodeId: 'actor_admin',
    shortTitle: 'Admin Media Sosial',
    structuralTitle: 'Mediator Digital, Kurator Visual & Pengelola Interaksi Publik',
    roleClassification: 'Garda Depan Mediatisasi & Produksi Representasi Digital',
    executiveSummary:
      'Admin Media Sosial berfungsi sebagai mediator digital utama (cultural & digital intermediary) yang menerjemahkan aktivitas fisik, keindahan destinasi, serta informasi kelembagaan BUMDes menjadi konten audio-visual yang komunikatif di ruang publik digital.',
    theoreticalPosition:
      'Dalam arsitektur HMM, Admin Media Sosial merupakan motor penggerak Tahap 3 hingga Tahap 6: mengonversi peristiwa lapangan menjadi representasi digital (Reels, TikTok, cerita visual) yang memperluas visibilitas melampaui batas geografis desa.',
    feedbackLoopRole:
      'Menjadi sensor paling awal dalam menangkap komentar, pesan langsung (DM), ulasan, serta kritik warganet untuk diteruskan kepada Ketua BUMDes dan unit terkait guna perbaikan layanan nyata.',
    nonCodedExplanation:
      'Mengonfirmasi 13 dari 16 tema aktif NVivo (81,3%), dengan kekuatan menonjol pada Peran dalam Medsos, Produk Digital, Opini Media Digital, dan Kendala Medsos. Tiga tema di luar ranah teknisnya (Transaksi kasir langsung, Kepercayaan struktural dana desa, dan Partisipasi pengurus paguyuban) berada pada domain pimpinan dan pelaku transaksi.',
    stages: {
      mediaPlatforms: [
        {
          id: 'media-tiktok',
          label: 'TikTok BUMDes & KUB',
          mechanism:
            'Platform utama distribusi video pendek vertikal, tren audio populer, dan visual storytelling suasana destinasi.',
        },
        {
          id: 'media-audiovisual',
          label: 'Konten Audio-Visual (Produksi Foto/Video & Editing)',
          mechanism:
            'Proses pengambilan gambar lapangan, penyuntingan video promosi, desain grafis pengumuman, dan kurasi estetika visual.',
        },
        {
          id: 'media-wa',
          label: 'WhatsApp (Koordinasi Bahan Konten & Layanan Informasi)',
          mechanism:
            'Jalur penerimaan bahan pengumuman dari pengurus BUMDes sekaligus saluran respons cepat pertanyaan reservasi pengunjung.',
        },
        {
          id: 'media-fb',
          label: 'Facebook & Lintas Platform Sosial',
          mechanism:
            'Perluasan distribusi poster kegiatan, album dokumentasi, dan informasi layanan kepada segmen audiens keluarga.',
        },
      ],
      commPractices: [
        {
          id: 'comm-representasi',
          label: 'Representasi Digital Aktivitas Nyata',
          mechanism:
            'Mengemas suasana wahana, kuliner pujasera, dan kegiatan warga menjadi narasi visual yang menggugah minat kunjung.',
        },
        {
          id: 'comm-promosi',
          label: 'Promosi Kreatif & Kampanye Event',
          mechanism:
            'Menjalankan publikasi terjadwal untuk promo liburan, wahana baru, pertunjukan musik, dan paket wisata desa.',
        },
        {
          id: 'comm-interaksi',
          label: 'Interaksi Dua Arah & Manajemen Komentar',
          mechanism:
            'Membalas pertanyaan jam buka, harga tiket, rute lokasi, serta mengelola impresi audiens di kolom komentar.',
        },
        {
          id: 'comm-info',
          label: 'Layanan Informasi Operasional Publik',
          mechanism:
            'Menyampaikan update cuaca, jadwal operasional, serta fasilitas pendukung secara akurat kepada calon wisatawan.',
        },
        {
          id: 'comm-partisipasi',
          label: 'Stimulasi Partisipasi Konten Pengunjung (UGC)',
          mechanism:
            'Mengajak pengunjung menandai (mention/tag) akun resmi dan membagikan ulang (repost) testimoni pengalaman mereka.',
        },
      ],
      interactionPatterns: [
        {
          id: 'pattern-publik',
          label: 'Publik-Digital (Admin → Platform → Masyarakat Luas)',
          mechanism:
            'Pola distribusi pesan terbuka yang menjembatani identitas lokal Desa Ketapanrame dengan audiens regional dan nasional.',
        },
        {
          id: 'pattern-horizontal',
          label: 'Horizontal-Komunitas (Admin ↔ BUMDes ↔ KUB ↔ Tenan)',
          mechanism:
            'Koordinasi kolaboratif dalam pengumpulan bahan liputan produk kuliner, wahana, dan agenda komunitas.',
        },
      ],
      digitalRepresentations: [
        {
          id: 'rep-konten',
          label: 'Konten Digital Kreatif (Video, Reels, Testimoni)',
          mechanism:
            'Artefak utama berupa video promosi sinematik, liputan acara langsung, dan konten edukasi wisata.',
        },
        {
          id: 'rep-info',
          label: 'Informasi Digital Aksesibel',
          mechanism:
            'Infografis jam layanan, panduan akses lokasi, dan pengumuman resmi yang mudah dipahami publik.',
        },
        {
          id: 'rep-produk',
          label: 'Eksposur Katalog Produk & Menu Wisata',
          mechanism:
            'Sorotan visual terhadap ragam jajanan pujasera, spot foto, dan paket layanan unggulan BUMDes.',
        },
      ],
      visibilityReach: [
        {
          id: 'vis-publik',
          label: 'Visibilitas Publik Algoritmik',
          mechanism:
            'Memanfaatkan jangkauan organik algoritma video pendek agar destinasi dikenal luas di luar Kabupaten Mojokerto.',
        },
        {
          id: 'vis-wisatawan',
          label: 'Jangkauan Wisatawan Baru',
          mechanism:
            'Menurunkan hambatan pencarian informasi bagi calon pengunjung yang merencanakan rekreasi keluarga.',
        },
        {
          id: 'vis-pasar',
          label: 'Penguatan Daya Tarik Pasar Kawasan',
          mechanism:
            'Menciptakan efek domino eksposur digital yang menggerakkan minat beli pada wahana dan stand kuliner.',
        },
      ],
      downstreamOutcomes: [
        {
          id: 'downstream-aktivitas',
          label: 'Stimulasi Kunjungan & Aktivitas Ekonomi',
          mechanism:
            'Tingginya eksposur konten berkonversi menjadi arus kedatangan pengunjung fisik di akhir pekan dan musim liburan.',
        },
        {
          id: 'downstream-legitimasi',
          label: 'Kredibilitas Komunikasi & Citra Profesional',
          mechanism:
            'Konsistensi kualitas informasi digital memperkuat persepsi publik bahwa destinasi dikelola secara serius dan responsif.',
        },
      ],
      empiricalClusters: [
        {
          id: 'emp-wordcloud',
          label: 'Word Cloud (Dominasi Leksikal Digital & Konten)',
          mechanism:
            'Kontributor kuat pada kemunculan kata media, digital, informasi, promosi, platform, dan jangkauan.',
        },
        {
          id: 'emp-evidence',
          label: 'Evidence Coding (Produksi Audio-Visual & TikTok)',
          mechanism:
            'Bukti konkret praktik produksi konten harian beserta identifikasi kendala teknis pengelolaan medsos.',
        },
        {
          id: 'emp-similarity',
          label: 'Word Similarity (Konvergensi Narasi Promosi)',
          mechanism:
            'Kemiripan wacana tinggi dengan Ketua BUMDes dan Tenan dalam menempatkan media digital sebagai penggerak promosi.',
        },
        {
          id: 'emp-matrix',
          label: 'Matrix Coding (Spesialisasi Mediator Digital)',
          mechanism:
            'Menegaskan diferensiasi tugas teknis komunikasi publik yang terpisah dari fungsi kasir/transaksi langsung.',
        },
        {
          id: 'emp-projectmap',
          label: 'Project Map (Simpul Penggerak Produk Digital)',
          mechanism:
            'Terhubung erat dengan simpul Platform Digital, Produk Digital, serta Partisipasi & Interaksi audiens.',
        },
      ],
    },
    interActorRelations: [
      {
        targetActorId: 'actor-ketua-bumdes',
        targetName: 'Ketua BUMDes',
        targetRoleSubtitle: 'Pengarah Kebijakan Operasional & Publikasi',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Admin Media Sosial ↔ Ketua BUMDes',
        relationshipSummary:
          'Koordinasi editorial konten resmi dan pelaporan umpan balik warganet kepada manajemen.',
        concretePractices: [
          'Mengonfirmasi kebenaran informasi tarif, jadwal event, dan pengumuman sebelum dipublikasikan ke media sosial.',
          'Meneruskan keluhan atau saran pengunjung yang masuk melalui kolom komentar/DM untuk segera ditindaklanjuti.',
        ],
      },
      {
        targetActorId: 'actor-ketua-kub',
        targetName: 'Ketua KUB',
        targetRoleSubtitle: 'Pengelola Wahana Lapangan',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Admin Media Sosial ↔ Ketua KUB',
        relationshipSummary:
          'Sinergi peliputan aktivitas wahana permainan dan amplifikasi konten lintas akun.',
        concretePractices: [
          'Mengambil gambar visual wahana terbaru atau suasana ramai pengunjung bersama tim lapangan KUB.',
          'Menyelaraskan pesan promosi agar informasi wahana tersampaikan akurat dan menarik.',
        ],
      },
      {
        targetActorId: 'actor-tenan',
        targetName: 'Tenan Pujasera/Food Court',
        targetRoleSubtitle: 'Pelaku Usaha Kuliner Kawasan',
        patternType: 'Horizontal-Komunitas',
        directionLabel: 'Admin Media Sosial → Tenan Pujasera',
        relationshipSummary:
          'Dukungan eksposur visual menu kuliner dan promosi suasana pujasera kepada wisatawan.',
        concretePractices: [
          'Menampilkan ragam kuliner dan kenyamanan fasilitas food court dalam konten video liputan kawasan.',
          'Membantu meningkatkan visibilitas produk tenan melalui unggahan cerita dan katalog visual.',
        ],
      },
      {
        targetActorId: 'actor-kades',
        targetName: 'Kepala Desa',
        targetRoleSubtitle: 'Pemegang Visi Desa Wisata',
        patternType: 'Publik-Digital',
        directionLabel: 'Admin Media Sosial ↔ Kepala Desa',
        relationshipSummary:
          'Penyelarasan citra digital destinasi dengan identitas budaya dan reputasi Pemerintah Desa Ketapanrame.',
        concretePractices: [
          'Mendokumentasikan kunjungan tamu resmi, penghargaan desa, dan kegiatan besar kemasyarakatan.',
          'Menjaga standar kesantunan dan kredibilitas komunikasi publik atas nama ekosistem desa.',
        ],
      },
    ],
  },

  'actor-tenan': {
    actorId: 'actor-tenan',
    informantId: 'informan_5',
    projectMapNodeId: 'actor_tenan',
    shortTitle: 'Tenan Pujasera/Food Court',
    structuralTitle: 'Aktor Ekonomi Mikro, Pelaku Transaksi QRIS & Layanan Pelanggan',
    roleClassification: 'Ujung Tombak Konversi Ekonomi & Pengalaman Wisatawan',
    executiveSummary:
      'Tenan Pujasera/Food Court merupakan aktor ekonomi akar rumput yang berinteraksi langsung secara tatap muka maupun digital dengan wisatawan, sekaligus mengonversi visibilitas promosi destinasi menjadi transaksi ekonomi riil melalui adopsi pembayaran QRIS.',
    theoreticalPosition:
      'Dalam kerangka HMM, Tenan Pujasera membuktikan bahwa mediatisasi di Desa Ketapanrame tidak berhenti pada pencitraan konten, melainkan meresap hingga praktik transaksi mikro (financial mediatization) dan pelayanan pelanggan harian.',
    feedbackLoopRole:
      'Pengalaman langsung wisatawan saat mencicipi kuliner, kemudahan membayar dengan QRIS, serta keramahan layanan tenan membentuk kepuasan nyata yang menentukan apakah pengunjung akan memberi ulasan positif dan kembali berkunjung.',
    nonCodedExplanation:
      'Mengonfirmasi 15 dari 16 tema aktif NVivo (93,8%), termasuk Transaksi, Produk Digital, Peran dalam Medsos, dan Partisipasi Aktif. Satu-satunya tema yang tidak dikoding adalah "Kepercayaan" dalam konteks tata kelola dana kelembagaan tingkat pimpinan.',
    stages: {
      mediaPlatforms: [
        {
          id: 'media-qris',
          label: 'QRIS (Standar Pembayaran Digital Nontunai)',
          mechanism:
            'Instrumen vital di meja kasir/lapak untuk melayani pembayaran cepat, higienis, dan tercatat bagi wisatawan luar kota.',
        },
        {
          id: 'media-wa',
          label: 'WhatsApp (Grup Paguyuban Tenan & Pesanan Pelanggan)',
          mechanism:
            'Digunakan untuk menerima informasi operasional dari BUMDes, menyampaikan saran/keluhan fasilitas, serta melayani pesanan rombongan.',
        },
        {
          id: 'media-audiovisual',
          label: 'Konten Audio-Visual Produk Kuliner',
          mechanism:
            'Foto menu makanan/minuman dan suasana pujasera yang dibagikan melalui status WhatsApp maupun media sosial untuk menarik pembeli.',
        },
      ],
      commPractices: [
        {
          id: 'comm-transaksi',
          label: 'Transaksi Ekonomi Terintegrasi Digital',
          mechanism:
            'Menghubungkan penawaran produk fisik kuliner dengan konfirmasi pembayaran digital QRIS secara instan.',
        },
        {
          id: 'comm-promosi',
          label: 'Promosi Produk & Menu Unggulan',
          mechanism:
            'Memperkenalkan variasi menu kuliner khas dan paket makan rombongan kepada pengunjung kawasan Taman Ghanjaran.',
        },
        {
          id: 'comm-interaksi',
          label: 'Interaksi Pelanggan & Penerimaan Masukan',
          mechanism:
            'Komunikasi langsung melayani pembeli sekaligus menampung kesan/masukan pengunjung terkait harga, rasa, dan fasilitas pujasera.',
        },
      ],
      interactionPatterns: [
        {
          id: 'pattern-ekonomi',
          label: 'Ekonomi (BUMDes/KUB → Tenan → Konsumen/Wisatawan)',
          mechanism:
            'Rantai nilai ekonomi langsung tempat arus kunjungan destinasi bertransformasi menjadi pendapatan rumah tangga pelaku UMKM desa.',
        },
      ],
      digitalRepresentations: [
        {
          id: 'rep-transaksi',
          label: 'Transaksi Digital & Bukti Pembayaran QRIS',
          mechanism:
            'Notifikasi dan bukti pembayaran nontunai yang memberikan kepastian transaksi baik bagi pedagang maupun pembeli.',
        },
        {
          id: 'rep-produk',
          label: 'Produk Digital Daftar Menu & Katalog Promo',
          mechanism:
            'Informasi visual menu dan harga transparan yang memudahkan wisatawan memilih kuliner.',
        },
      ],
      visibilityReach: [
        {
          id: 'vis-pasar',
          label: 'Jangkauan Pasar Konsumen Lintas Daerah',
          mechanism:
            'Mempertemukan produk UMKM lokal warga desa dengan ribuan wisatawan dari berbagai kota tanpa harus membuka cabang di luar desa.',
        },
        {
          id: 'vis-wisatawan',
          label: 'Kenyamanan Akses Layanan Wisatawan',
          mechanism:
            'Ketersediaan informasi kuliner dan opsi pembayaran nontunai meningkatkan daya saing destinasi di mata wisatawan modern.',
        },
      ],
      downstreamOutcomes: [
        {
          id: 'downstream-aktivitas',
          label: 'Peningkatan Omzet & Kesejahteraan Ekonomi Warga',
          mechanism:
            'Dampak langsung berupa peningkatan volume penjualan harian/akhir pekan dan keberlanjutan usaha keluarga tenan.',
        },
        {
          id: 'downstream-legitimasi',
          label: 'Kepuasan Pengalaman & Kepercayaan Konsumen',
          mechanism:
            'Kejujuran harga, kualitas sajian, dan kemudahan transaksi memperkuat reputasi positif BUMDes Ketapanrame secara keseluruhan.',
        },
      ],
      empiricalClusters: [
        {
          id: 'emp-evidence',
          label: 'Evidence Coding (Implementasi QRIS & Promosi Menu)',
          mechanism:
            'Bukti empiris adopsi teknologi finansial oleh pelaku usaha mikro desa dalam keseharian berdagang.',
        },
        {
          id: 'emp-matrix',
          label: 'Matrix Coding (15/16 Tema Terkonfirmasi)',
          mechanism:
            'Memperlihatkan keterlibatan tinggi pelaku usaha akar rumput dalam ekosistem komunikasi hibrida BUMDes.',
        },
        {
          id: 'emp-crosstab',
          label: 'Crosstab Diferensiasi Peran Ekonomi',
          mechanism:
            'Menunjukkan bahwa meskipun berlatar pendidikan SMA/SMK, tuntutan peran usaha mendorong adaptasi digital yang sangat aktif.',
        },
      ],
    },
    interActorRelations: [
      {
        targetActorId: 'actor-ketua-bumdes',
        targetName: 'Ketua BUMDes',
        targetRoleSubtitle: 'Pengelola Kawasan & Fasilitator Usaha',
        patternType: 'Ekonomi',
        directionLabel: 'Tenan Pujasera ↔ Ketua BUMDes',
        relationshipSummary:
          'Hubungan kemitraan penyewaan/pengelolaan lapak, koordinasi fasilitas pujasera, dan pendampingan QRIS.',
        concretePractices: [
          'Menyampaikan aspirasi, saran perbaikan fasilitas air/kebersihan, dan dinamika penjualan melalui musyawarah paguyuban maupun grup WhatsApp.',
          'Mengikuti kebijakan tata tertib layanan demi menjaga nama baik destinasi wisata desa.',
        ],
      },
      {
        targetActorId: 'actor-ketua-kub',
        targetName: 'Ketua KUB',
        targetRoleSubtitle: 'Pengelola Wahana Taman Ghanjaran',
        patternType: 'Ekonomi',
        directionLabel: 'Tenan Pujasera ↔ Ketua KUB',
        relationshipSummary:
          'Keterkaitan arus pengunjung antara zona wahana permainan dan zona kuliner food court.',
        concretePractices: [
          'Mempersiapkan stok bahan baku lebih banyak ketika KUB dan BUMDes menjadwalkan event besar atau libur panjang.',
          'Saling mengarahkan pengunjung untuk menikmati wahana sekaligus bersantai di area pujasera.',
        ],
      },
      {
        targetActorId: 'actor-admin',
        targetName: 'Admin Media Sosial',
        targetRoleSubtitle: 'Mediator Promosi Kawasan',
        patternType: 'Publik-Digital',
        directionLabel: 'Tenan Pujasera ↔ Admin Media Sosial',
        relationshipSummary:
          'Kolaborasi promosi visual produk kuliner untuk memikat calon pengunjung di media sosial.',
        concretePractices: [
          'Menyediakan sajian menu unggulan untuk difoto/divideokan sebagai materi konten promosi kawasan.',
          'Membagikan ulang unggahan promosi destinasi pada status WhatsApp dan akun media sosial pribadi tenan.',
        ],
      },
      {
        targetActorId: 'actor-kades',
        targetName: 'Kepala Desa',
        targetRoleSubtitle: 'Pelindung Kebijakan Ekonomi Warga',
        patternType: 'Vertikal-Institusional',
        directionLabel: 'Tenan Pujasera ↔ Kepala Desa',
        relationshipSummary:
          'Penerima manfaat kebijakan pemberdayaan UMKM desa dan partisipan musyawarah warga.',
        concretePractices: [
          'Meraskan dampak kebijakan desa yang memprioritaskan warga lokal sebagai pelaku usaha di kawasan wisata.',
          'Berpartisipasi menjaga kerukunan antarpedagang dan citra ramah masyarakat Desa Ketapanrame.',
        ],
      },
    ],
  },
};
