/**
 * PDF Export Utility using html2pdf.js
 * Generates high-quality A4 PDF reports for Qualitative Research Analysis
 */

export async function exportDashboardToPDF(
  elementId: string = 'printable-report-container',
  customFilename: string = 'Laporan_Penelitian_BUMDes.pdf'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found for PDF export.`);
    return;
  }

  // Ensure html2pdf is available
  const html2pdf = (window as any).html2pdf;
  if (!html2pdf) {
    console.error('html2pdf library is not loaded on window.');
    alert('Library html2pdf.js sedang dimuat. Silakan coba kembali dalam 2 detik.');
    return;
  }

  const opt = {
    margin: [10, 10, 10, 10], // 10mm margin
    filename: customFilename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      allowTaint: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    // Show temporary loading indicator
    const btn = document.getElementById('btn-export-pdf-main');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<span class="inline-block animate-spin mr-1.5">⏳</span> Membuat PDF...';
      btn.setAttribute('disabled', 'true');
    }

    await html2pdf().set(opt).from(element).save();

    if (btn) {
      btn.innerHTML = originalText;
      btn.removeAttribute('disabled');
    }
  } catch (error) {
    console.error('Error generating PDF report:', error);
    alert('Terjadi kesalahan saat memproses PDF. Silakan coba lagi.');
  }
}
