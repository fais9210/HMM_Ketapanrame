import React, { useState } from 'react';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import {
  Download,
  Copy,
  Check,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Settings2,
  X,
  Printer,
  FileCode2,
  Info,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { exportFigureToPDF } from '../utils/exportPdf';

export interface PublicationExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  figureNumber: string; // e.g. "Gambar 1" or "Gambar 2"
  figureTitle: string;
  figureCaptionNote: string;
  defaultFilename: string;
  targetElementRef?: React.RefObject<HTMLElement | null>;
  getCytoscapeInstance?: () => any; // In case cytoscape canvas is available
}

export const PublicationExportModal: React.FC<PublicationExportModalProps> = ({
  isOpen,
  onClose,
  title,
  figureNumber,
  figureTitle,
  figureCaptionNote,
  defaultFilename,
  targetElementRef,
  getCytoscapeInstance,
}) => {
  const [resolution, setResolution] = useState<'300dpi' | '600dpi' | '150dpi'>('300dpi');
  const [format, setFormat] = useState<'png' | 'pdf' | 'svg' | 'jpeg'>('png');
  const [bgColor, setBgColor] = useState<'white' | 'transparent' | 'soft'>('white');
  const [includeCaptionInImage, setIncludeCaptionInImage] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  // APA 7th Edition Caption
  const apa7Caption = `${figureNumber}\n${figureTitle}\nCatatan. ${figureCaptionNote}`;

  // LaTeX Figure Code
  const latexCode = `\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=\\linewidth]{${defaultFilename}.png}
  \\caption{${figureTitle}}
  \\label{fig:${defaultFilename.toLowerCase().replace(/[^a-z0-9]/g, '_')}}
  \\vspace{2mm}
  {\\footnotesize \\textit{Catatan.} ${figureCaptionNote}}
\\end{figure}`;

  // Markdown format
  const markdownCode = `![${figureTitle}](${defaultFilename}.png)\n*${figureNumber}. ${figureTitle}*\n\n> *Catatan*: ${figureCaptionNote}`;

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(type);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  // Perform High-Resolution Export
  const handleExportDownload = async () => {
    setIsExporting(true);

    try {
      // Direct PDF Export for Figure
      if (format === 'pdf') {
        const cy = getCytoscapeInstance ? getCytoscapeInstance() : null;
        await exportFigureToPDF({
          figureNumber,
          figureTitle,
          figureCaptionNote,
          targetElement: targetElementRef?.current,
          filename: `${defaultFilename}_APA7`,
          cyInstance: cy,
        });
        setIsExporting(false);
        return;
      }

      // 1. Check if Cytoscape instance is available for direct high-res canvas dump
      const cy = getCytoscapeInstance ? getCytoscapeInstance() : null;

      if (cy && !includeCaptionInImage && format === 'png') {
        const scale = resolution === '600dpi' ? 4.5 : resolution === '300dpi' ? 3.0 : 1.5;
        const bg = bgColor === 'white' ? '#ffffff' : bgColor === 'soft' ? '#f8fafc' : undefined;
        const dataUrl = cy.png({
          full: true,
          scale: scale,
          bg: bg,
          quality: 1.0,
        });

        const link = document.createElement('a');
        link.download = `${defaultFilename}_${resolution}.${format}`;
        link.href = dataUrl;
        link.click();
        setIsExporting(false);
        return;
      }

      // 2. DOM-based export via html-to-image
      if (!targetElementRef || !targetElementRef.current) {
        alert('Elemen diagram tidak ditemukan.');
        setIsExporting(false);
        return;
      }

      const node = targetElementRef.current;
      const pixelRatio = resolution === '600dpi' ? 4.0 : resolution === '300dpi' ? 2.8 : 1.5;
      const background =
        bgColor === 'white' ? '#ffffff' : bgColor === 'soft' ? '#f8fafc' : undefined;

      const exportOptions = {
        backgroundColor: background,
        skipFonts: true,
        fontEmbedCSS: '',
        cacheBust: true,
        filter: (domNode: HTMLElement) => {
          // filter out buttons, toolbars, or modal overlays
          if (domNode.classList && domNode.classList.contains('no-export')) return false;
          return true;
        },
      };

      let dataUrl = '';

      if (format === 'svg') {
        dataUrl = await toSvg(node, exportOptions);
      } else if (format === 'jpeg') {
        dataUrl = await toJpeg(node, {
          ...exportOptions,
          quality: 0.95,
          pixelRatio: pixelRatio,
          backgroundColor: background || '#ffffff',
        });
      } else {
        dataUrl = await toPng(node, {
          ...exportOptions,
          pixelRatio: pixelRatio,
        });
      }

      const link = document.createElement('a');
      link.download = `${defaultFilename}_${resolution}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export error:', err);
      alert('Terjadi kesalahan saat memproses ekspor. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base shadow-sm">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white leading-tight">
                Ekspor Gambar Siap Publikasi Jurnal &amp; Tesis
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Standar Resolusi Tinggi 300 DPI &bull; Format Takarir APA 7th Edition &bull; PDF / PNG / SVG
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs">
          {/* Section 1: Konfigurasi Resolusi & Format */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Settings2 className="w-3.5 h-3.5 text-indigo-600" />
              1. Format Berkas &amp; Resolusi (DPI)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Option: PNG 300 DPI */}
              <button
                type="button"
                onClick={() => {
                  setFormat('png');
                  setResolution('300dpi');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'png' && resolution === '300dpi'
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-emerald-950">PNG 300 DPI</span>
                  <span className="text-[9.5px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-semibold">
                    Utama
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Optimal naskah Jurnal Sinta/Scopus &amp; Tesis.
                </p>
              </button>

              {/* Option: PDF Document */}
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'pdf'
                    ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-blue-950">PDF Dokumen</span>
                  <span className="text-[9.5px] bg-blue-100 text-blue-800 px-1 py-0.2 rounded font-semibold">
                    A4 Cetak
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Dokumen A4 rapi lengkap dengan judul &amp; takarir APA 7.
                </p>
              </button>

              {/* Option: PNG 600 DPI */}
              <button
                type="button"
                onClick={() => {
                  setFormat('png');
                  setResolution('600dpi');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'png' && resolution === '600dpi'
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">PNG 600 DPI</span>
                  <span className="text-[9.5px] bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-semibold">
                    Ultra
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Kerapatan piksel sangat tinggi untuk poster akademik.
                </p>
              </button>

              {/* Option: SVG Vector */}
              <button
                type="button"
                onClick={() => setFormat('svg')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'svg'
                    ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-purple-950">SVG Vektor</span>
                  <span className="text-[9.5px] bg-purple-100 text-purple-800 px-1 py-0.2 rounded font-semibold">
                    Vector
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  Vektor murni tanpa pecah pada perbesaran apapun.
                </p>
              </button>
            </div>

            {/* Background & Sub-options (only if not PDF) */}
            {format !== 'pdf' && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Latar Belakang:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBgColor('white')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                        bgColor === 'white'
                          ? 'bg-white text-slate-900 border-indigo-500 shadow-2xs'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      Putih Bersih (#FFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBgColor('transparent')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                        bgColor === 'transparent'
                          ? 'bg-white text-slate-900 border-indigo-500 shadow-2xs'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      Transparan (PNG)
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={includeCaptionInImage}
                    onChange={(e) => setIncludeCaptionInImage(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Sertakan Header Judul Gambar dalam File</span>
                </label>
              </div>
            )}
          </div>

          {/* Section 2: Takarir & Sitasi Otomatis (APA 7th Edition & LaTeX) */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                2. Generator Takarir Gambar (Format APA 7th / Naskah)
              </h4>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopyText(apa7Caption, 'apa7')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedFormat === 'apa7' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin Format APA 7</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyText(latexCode, 'latex')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedFormat === 'latex' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <FileCode2 className="w-3 h-3 text-purple-600" />
                      <span>Salin LaTeX</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* APA 7 Preview Box */}
            <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1.5 text-slate-900 font-serif">
              <div className="font-bold text-xs text-slate-900">{figureNumber}</div>
              <div className="italic text-xs font-semibold text-slate-800">{figureTitle}</div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-amber-200/60 font-sans leading-relaxed">
                <strong className="italic">Catatan.</strong> {figureCaptionNote}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Info className="w-4 h-4 text-slate-400" />
            <span>
              Format berkas:{' '}
              <strong className="text-slate-700 uppercase">
                {format === 'pdf' ? 'DOKUMEN PDF (A4 LANDSCAPE)' : `${format} (${resolution})`}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExportDownload}
              className={`px-5 py-2 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition cursor-pointer disabled:opacity-50 ${
                format === 'pdf'
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-700/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-700/20'
              }`}
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses Berkas...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    Unduh {format === 'pdf' ? 'PDF Dokumen' : `Gambar (${format.toUpperCase()})`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
