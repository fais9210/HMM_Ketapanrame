# Hybrid Mediatization Mapping (HMM) — BUMDes Ketapanrame

Aplikasi web interaktif untuk visualisasi dan eksplorasi riset kualitatif **Hybrid Mediatization Mapping (HMM)** pada ekosistem komunikasi digital dan tata kelola usaha desa **BUMDes Ketapanrame**. Aplikasi ini memetakan alur mediatisasi hibrida dari peran aktor desa hingga legitimasi sosial-ekonomi, lengkap dengan peta relasi jaringan aktor, analisis leksikal, dan editor data interaktif.

---

## Fitur Utama

### 1. Model & Peta Relasi Inti
- **Hybrid Mediatization Mapping (HMM)**:
  - Visualisasi diagram alur 6 tahap mediatisasi hibrida (*Peran Aktor* $\rightarrow$ *Infrastruktur Digital Media/Platform* $\rightarrow$ *Praktik Komunikasi* $\rightarrow$ *Pola Interaksi* $\rightarrow$ *Representasi Digital & Visibilitas/Jangkauan* $\rightarrow$ *Muara Aktivitas Sosial-Ekonomi & Legitimasi/Kepercayaan*).
  - **Sorotan Jalur Relasi (*Highlight Path*)**: Klik atau arahkan kursor (*hover*) pada simpul untuk menyoroti keterhubungan lintas kolom secara langsung.
  - **Halaman Detail Peran Aktor**: Memilih salah satu dari 5 peran aktor utama (*Ketua BUMDes, Kepala Desa, Ketua KUB, Pengelola Unit Wisata, Admin Media Sosial*) membuka halaman khusus yang menguraikan profil peran, rantai mediatisasi 6 tahap, peta ego-relasi lintas pemangku kepentingan, matriks validasi tema kualitatif, serta kutipan empiris wawancara.
  - **Tur Terpandu (*Guided Tour*) & Mode Layar Penuh**: Panduan bertahap untuk mempresentasikan alur model secara sistematis beserta kontrol *zoom & pan*.
- **Peta Relasi Aktor**:
  - Visualisasi *Project Map* interaktif yang memetakan keterhubungan 5 aktor kunci dengan tema dan simpul kualitatif ekosistem BUMDes.
- **Input Data Manual**:
  - Editor interaktif untuk menambah, mengubah, atau menyesuaikan tahapan alur HMM, simpul (*nodes*), dan garis relasi (*edges*) secara langsung dengan penyimpanan otomatis di peramban (`localStorage`) serta fitur ekspor/impor JSON dan reset ke data bawaan.

### 2. Eksplorasi Analisis Kualitatif
- **Peta Konsentris NVivo**: Visualisasi jaringan konsentris berbasis Cytoscape untuk mengeksplorasi sentralitas aktor dan tema koding kualitatif.
- **Grafik Batang Tumpuk (*Comparative Analytics*)**: Perbandingan distribusi tema koding lintas peran dan atribut informan menggunakan grafik interaktif.
- **Word Cloud & Frekuensi Kata**: Analisis leksikal kata dominan dan frekuensi kemunculan konsep utama dalam korpus wawancara.
- **Filter Global Multi-Atribut**: Penyaringan dinamis berdasarkan peran di BUMDes, tingkat pendidikan, jenis kelamin, dan kelompok usia.

### 3. Ekspor Siap Publikasi & Dokumentasi
- **Ekspor Gambar Resolusi Tinggi**: Unduh visualisasi diagram dalam format **PNG (300 DPI / 600 DPI)**, **SVG Vektor**, maupun **Dokumen PDF (A4 Landscape)** dengan pilihan latar belakang putih bersih atau transparan.
- **Ekspor HTML Mandiri (*Standalone*)**: Simpan salinan laporan interaktif mandiri untuk kebutuhan arsip atau presentasi luring.

---

## Teknologi yang Digunakan

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Visualisasi Jaringan & Data**:
  - `Cytoscape.js` (Peta jaringan & relasi konsentris)
  - `D3.js` & `d3-cloud` (Visualisasi kata & tata letak data)
  - `Chart.js` & `react-chartjs-2` (Grafik komparatif)
- **Utilitas Ekspor**: `html-to-image` & `jsPDF`

---

## Struktur Direktori Utama

```text
├── public/                 # Aset statis publik
├── src/
│   ├── assets/             # Logo dan aset visual aplikasi
│   ├── components/         # Komponen UI & modul visualisasi
│   │   ├── HmmFrameworkModel.tsx       # Diagram alur utama HMM
│   │   ├── ActorRelationPage.tsx       # Halaman eksplorasi mendalam per peran aktor
│   │   ├── IntegrativeRelationMap.tsx  # Peta Relasi Aktor (Project Map)
│   │   ├── DataInputMatrixEditor.tsx   # Editor Input Data Manual (simpul & relasi)
│   │   ├── CytoscapeNetworkGraph.tsx   # Grafik jaringan konsentris NVivo
│   │   ├── ComparativeAnalytics.tsx    # Grafik komparatif distribusi koding
│   │   ├── LexicalAnalysis.tsx         # Word Cloud & tabel frekuensi kata
│   │   ├── PublicationExportModal.tsx  # Modal ekspor PNG/SVG/PDF resolusi tinggi
│   │   └── SidebarNav.tsx              # Navigasi utama aplikasi
│   ├── data/               # Dataset terstruktur riset kualitatif & relasi aktor
│   ├── hooks/              # Custom React hooks (termasuk navigasi mobile)
│   ├── utils/              # Utilitas ekspor dokumen & HTML mandiri
│   ├── types.ts            # Definisi tipe TypeScript
│   ├── App.tsx             # Pengelola state utama & tata letak dashboard
│   └── main.tsx            # Titik masuk aplikasi React
├── index.html              # Template HTML utama
├── package.json            # Konfigurasi dependensi & skrip proyek
└── tsconfig.json           # Konfigurasi TypeScript
```

---

## Cara Menjalankan Proyek Secara Lokal

### Prasyarat
- **Node.js** versi 18 atau lebih baru
- **npm** atau **bun**

### Langkah Instalasi

1. **Instal dependensi proyek**:
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan (*development server*)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

3. **Pemeriksaan tipe TypeScript (*linting*)**:
   ```bash
   npm run lint
   ```

4. **Membangun aplikasi untuk produksi (*production build*)**:
   ```bash
   npm run build
   ```

5. **Pratinjau hasil *build* produksi**:
   ```bash
   npm run preview
   ```

---

## Penyimpanan Data Kustom

Perubahan yang dilakukan melalui menu **Input Data Manual** tersimpan secara otomatis di penyimpanan lokal peramban (`localStorage` pada kunci `hmm_steps_data`, `project_map_nodes_data`, dan `project_map_edges_data`). Pengguna dapat mengembalikan seluruh konfigurasi ke dataset riset awal kapan saja menggunakan tombol **Reset Default** pada editor data.
