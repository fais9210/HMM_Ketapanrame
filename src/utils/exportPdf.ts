/**
 * High-Quality Academic PDF Export Engine
 * Generates publication-ready A4 PDF reports and Figure documents using jsPDF & jspdf-autotable
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toPng } from 'html-to-image';
import {
  informantsData,
  crosstabMatrixData,
  wordFrequencyTopData,
} from '../data/crosstabData';

/**
 * Generate Comprehensive Research PDF Report
 */
export async function exportDashboardToPDF(
  _elementId: string = 'printable-report-container',
  customFilename: string = 'Laporan_Penelitian_BUMDes_Ketapanrame.pdf'
): Promise<void> {
  const btn = document.getElementById('btn-export-pdf-main');
  const originalText = btn ? btn.innerHTML : '';

  try {
    if (btn) {
      btn.innerHTML = '<span class="inline-block animate-spin mr-1.5">⏳</span> Membuat PDF...';
      btn.setAttribute('disabled', 'true');
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;

    // Helper for page headers & footers
    const addHeaderFooter = (pageNo: number, totalPages: number) => {
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(
        'Laporan Riset Kualitatif • Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame',
        margin,
        9
      );
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, 11, pageWidth - margin, 11);

      // Footer
      doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);
      doc.text(
        `Dicetak pada: ${new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}`,
        margin,
        pageHeight - 7
      );
      doc.text(`Halaman ${pageNo} dari ${totalPages}`, pageWidth - margin - 22, pageHeight - 7);
    };

    // ==========================================
    // PAGE 1: COVER & EXECUTIVE SUMMARY
    // ==========================================
    // Top banner color
    doc.setFillColor(30, 41, 59); // slate-800
    doc.roundedRect(margin, 15, pageWidth - margin * 2, 34, 3, 3, 'F');

    doc.setTextColor(241, 245, 249);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DOKUMEN HASIL RISET KUALITATIF NVIVO & PEMODELAN HMM', margin + 6, 23);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('Hybrid Mediatization Mapping (HMM) BUMDes Ketapanrame', margin + 6, 31);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text(
      'Analisis Kros-Tabulasi Peran Informan, Matriks Koding Tematik, dan Ekologi Media Hibrida',
      margin + 6,
      38
    );
    doc.text(
      'Lokasi Penelitian: Desa Ketapanrame, Kec. Trawas, Kab. Mojokerto, Jawa Timur',
      margin + 6,
      43
    );

    // Summary Stat Boxes
    let currentY = 54;
    const boxWidth = (pageWidth - margin * 2 - 9) / 4;

    const stats = [
      { label: 'Subjek Informan', val: '5 Kasus', color: [79, 70, 229] },
      { label: 'Kategori Atribut', val: '4 Variabel', color: [147, 51, 234] },
      { label: 'Tema Kualitatif', val: '17 Nodes', color: [37, 99, 235] },
      { label: 'Konsensus Koding', val: '8 Tema 100%', color: [16, 185, 129] },
    ];

    stats.forEach((st, idx) => {
      const x = margin + idx * (boxWidth + 3);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, currentY, boxWidth, 18, 2, 2, 'FD');

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(st.color[0], st.color[1], st.color[2]);
      doc.text(st.val, x + 4, currentY + 7);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(st.label, x + 4, currentY + 13);
    });

    currentY += 24;

    // SECTION 1: PROFIL INFORMAN KUNCI
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('1. Profil Informan Kunci Penelitian (NVivo Cases)', margin, currentY);
    currentY += 3;

    const informantRows = informantsData.map((inf) => [
      inf.code,
      inf.name,
      inf.role,
      inf.education,
      inf.gender,
      inf.ageGroup,
      `${inf.totalCodedThemes} Tema`,
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Kode', 'Nama Kasus', 'Peran / Jabatan Kelembagaan', 'Pendidikan', 'Gender', 'Usia', 'Koding']],
      body: informantRows,
      margin: { left: margin, right: margin },
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
        halign: 'center',
      },
      styles: {
        fontSize: 8,
        cellPadding: 2.2,
        textColor: [51, 65, 85],
      },
      columnStyles: {
        0: { halign: 'center', fontStyle: 'bold', textColor: [79, 70, 229] },
        3: { halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'center' },
        6: { halign: 'center', fontStyle: 'bold', textColor: [16, 185, 129] },
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 8;

    // SECTION 2: RINGKASAN TEMUAN UTAMA
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('2. Sintesis Temuan Utama Model HMM', margin, currentY);
    currentY += 5;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    const findingsText = [
      '• Diferensiasi Peran Berbasis Struktur: Variasi koding ditentukan oleh peran institusional informan (Kepala Desa, Ketua BUMDes, KUB, Admin Medsos, Tenan), bukan oleh faktor demografi seperti usia atau pendidikan.',
      '• 8 Tema Konsensus 100%: Seluruh informan mengonfirmasi praktik Komunikasi Tatap Muka, Media Digital, Koordinasi, Promosi, Informasi, Partisipasi Pasif, Feedback, dan Kemudahan Akses.',
      '• Deep Mediatization Pedesaan: Media digital telah terintegrasi sebagai infrastruktur sosial yang memperkuat koordinasi kelembagaan, transaksi QRIS, dan legitimasi publik BUMDes.',
      '• Triangulasi NVivo: Didukung oleh Matriks Kros-Tabulasi, Pearson Word Similarity (0.679 - 0.845), dan Project Map 25 simpul relasi.',
    ];

    findingsText.forEach((txt) => {
      const splitText = doc.splitTextToSize(txt, pageWidth - margin * 2);
      doc.text(splitText, margin, currentY);
      currentY += splitText.length * 4.2;
    });

    // ==========================================
    // PAGE 2: MATRIKS KROS-TABULASI NVIVO
    // ==========================================
    doc.addPage();
    currentY = 18;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('3. Matriks Kros-Tabulasi NVivo: 17 Tema Koding vs 5 Informan', margin, currentY);
    currentY += 4;

    const matrixRows = crosstabMatrixData.map((row) => {
      const inf1 = row.informants['informan_1'] ? '1' : '0';
      const inf2 = row.informants['informan_2'] ? '1' : '0';
      const inf3 = row.informants['informan_3'] ? '1' : '0';
      const inf4 = row.informants['informan_4'] ? '1' : '0';
      const inf5 = row.informants['informan_5'] ? '1' : '0';
      const percentage = Math.round((row.totalCases / 5) * 100);

      return [
        row.nodeId,
        row.nodeLabel,
        row.category === 'parent_concept' ? 'Konsep Induk' : 'Dimensi/Tema',
        inf1,
        inf2,
        inf3,
        inf4,
        inf5,
        `${row.totalCases}/5 (${percentage}%)`,
      ];
    });

    autoTable(doc, {
      startY: currentY,
      head: [
        [
          'Node ID',
          'Nama Tema Kualitatif',
          'Kategori',
          'INF-1\n(Admin)',
          'INF-2\n(Kades)',
          'INF-3\n(BUMDes)',
          'INF-4\n(KUB)',
          'INF-5\n(Tenan)',
          'Total\nKasus',
        ],
      ],
      body: matrixRows,
      margin: { left: margin, right: margin },
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold',
        halign: 'center',
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 1.8,
        textColor: [51, 65, 85],
      },
      columnStyles: {
        0: { halign: 'center', fontStyle: 'bold', textColor: [79, 70, 229], cellWidth: 20 },
        1: { cellWidth: 44 },
        2: { cellWidth: 28, fontSize: 7, textColor: [100, 116, 139] },
        3: { halign: 'center', cellWidth: 14 },
        4: { halign: 'center', cellWidth: 14 },
        5: { halign: 'center', cellWidth: 14 },
        6: { halign: 'center', cellWidth: 14 },
        7: { halign: 'center', cellWidth: 14 },
        8: { halign: 'center', fontStyle: 'bold', textColor: [16, 185, 129], cellWidth: 20 },
      },
      didParseCell: function (data) {
        if (data.section === 'body' && data.column.index >= 3 && data.column.index <= 7) {
          if (data.cell.raw === '1') {
            data.cell.styles.fillColor = [236, 253, 245]; // emerald-50
            data.cell.styles.textColor = [5, 150, 105]; // emerald-600
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = [203, 213, 225]; // slate-300
          }
        }
      },
    });

    // ==========================================
    // PAGE 3: ANALISIS LEKSIKAL (TOP 40 KATA) & CATATAN METODOLOGI
    // ==========================================
    doc.addPage();
    currentY = 18;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('4. Analisis Frekuensi Kata (Lexical Query Top 40 NVivo)', margin, currentY);
    currentY += 4;

    // Create 2-column layout for top 40 words
    const half = Math.ceil(wordFrequencyTopData.length / 2);
    const col1 = wordFrequencyTopData.slice(0, half);
    const col2 = wordFrequencyTopData.slice(half);

    const combinedWordRows = col1.map((item, idx) => {
      const item2 = col2[idx];
      return [
        `#${idx + 1}`,
        item.word,
        item.count.toString(),
        item.weightedPercentage,
        item2 ? `#${idx + 1 + half}` : '',
        item2 ? item2.word : '',
        item2 ? item2.count.toString() : '',
        item2 ? item2.weightedPercentage : '',
      ];
    });

    autoTable(doc, {
      startY: currentY,
      head: [
        [
          'No',
          'Kata Kunci',
          'Count',
          'Bobot (%)',
          'No',
          'Kata Kunci',
          'Count',
          'Bobot (%)',
        ],
      ],
      body: combinedWordRows,
      margin: { left: margin, right: margin },
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold',
        halign: 'center',
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 1.6,
        textColor: [51, 65, 85],
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10, textColor: [100, 116, 139] },
        1: { fontStyle: 'bold', textColor: [30, 41, 59] },
        2: { halign: 'center', cellWidth: 14 },
        3: { halign: 'center', cellWidth: 18, textColor: [79, 70, 229] },
        4: { halign: 'center', cellWidth: 10, textColor: [100, 116, 139] },
        5: { fontStyle: 'bold', textColor: [30, 41, 59] },
        6: { halign: 'center', cellWidth: 14 },
        7: { halign: 'center', cellWidth: 18, textColor: [79, 70, 229] },
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 8;

    // SECTION 5: CATATAN SITASI & METODOLOGI
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('5. Informasi Sitasi & Lisensi Data', margin, currentY);
    currentY += 4.5;

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);

    const citationBoxText =
      'Format Sitasi APA 7th Edition:\n' +
      'Peneliti BUMDes Ketapanrame. (2026). Hybrid Mediatization Mapping (HMM): Analisis Ekologi Komunikasi Digital dan Kelembagaan BUMDes Ketapanrame Berbasis Kros-Tabulasi NVivo. Research Dashboard & Open Data Repository.';

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 22, 2, 2, 'FD');
    doc.text(doc.splitTextToSize(citationBoxText, pageWidth - margin * 2 - 6), margin + 3, currentY + 5);

    // Apply header & footer across all 3 pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addHeaderFooter(i, totalPages);
    }

    // Save and trigger browser download
    doc.save(customFilename);

    if (btn) {
      btn.innerHTML = originalText;
      btn.removeAttribute('disabled');
    }
  } catch (err) {
    console.error('Error generating PDF report:', err);
    alert('Terjadi kesalahan saat memproses laporan PDF. Silakan coba kembali.');
    if (btn) {
      btn.innerHTML = originalText;
      btn.removeAttribute('disabled');
    }
  }
}

/**
 * Generate Standalone Figure PDF (Publication-Ready Figure Sheet)
 */
export async function exportFigureToPDF({
  figureNumber,
  figureTitle,
  figureCaptionNote,
  targetElement,
  filename,
  cyInstance,
}: {
  figureNumber: string;
  figureTitle: string;
  figureCaptionNote: string;
  targetElement?: HTMLElement | null;
  filename: string;
  cyInstance?: any;
}): Promise<void> {
  try {
    let imgDataUrl = '';

    if (cyInstance) {
      imgDataUrl = cyInstance.png({
        full: true,
        scale: 2.5,
        bg: '#ffffff',
        quality: 1.0,
      });
    } else if (targetElement) {
      imgDataUrl = await toPng(targetElement, {
        pixelRatio: 2.2,
        backgroundColor: '#ffffff',
        filter: (domNode: HTMLElement) => {
          if (domNode.classList && domNode.classList.contains('no-export')) return false;
          return true;
        },
      });
    } else {
      throw new Error('Target element for figure export not found.');
    }

    // Create Landscape A4 for wide diagram figures
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 12;

    // APA 7th Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(figureNumber, margin, 14);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(figureTitle, margin, 19);

    // Calculate image dimensions to fit page nicely
    const maxImgWidth = pageWidth - margin * 2;
    const maxImgHeight = pageHeight - 48; // reserve space for caption and note

    // Add Diagram Image
    doc.addImage(
      imgDataUrl,
      'PNG',
      margin,
      22,
      maxImgWidth,
      maxImgHeight,
      undefined,
      'FAST'
    );

    // APA 7th Note below diagram
    const noteY = pageHeight - 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('Catatan. ', margin, noteY);

    const noteWidth = doc.getTextWidth('Catatan. ');
    doc.setFont('helvetica', 'normal');
    const splitNote = doc.splitTextToSize(figureCaptionNote, pageWidth - margin * 2 - noteWidth);
    doc.text(splitNote, margin + noteWidth, noteY);

    // Save Figure PDF
    doc.save(`${filename}.pdf`);
  } catch (err) {
    console.error('Error exporting Figure PDF:', err);
    throw err;
  }
}
