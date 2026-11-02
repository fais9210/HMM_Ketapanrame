import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Quote, X, Copy, Check, ArrowUpRight, Pin } from 'lucide-react';
import { HmmQuoteEvidenceEntry } from '../data/hmmQuotesData';
import { HmmActorId } from '../data/actorRelationsData';

export interface HmmQuotePopoverProps {
  evidence: HmmQuoteEvidenceEntry | null;
  anchorPoint: { x: number; y: number } | null;
  isPinned: boolean;
  onClose: () => void;
  onOpenActorRole?: (actorId: HmmActorId) => void;
}

export const HmmQuotePopover: React.FC<HmmQuotePopoverProps> = ({
  evidence,
  anchorPoint,
  isPinned,
  onClose,
  onOpenActorRole,
}) => {
  const [quoteIdx, setQuoteIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Reset indeks kutipan ketika berpindah simpul atau garis alir
  useEffect(() => {
    setQuoteIdx(0);
    setCopied(false);
  }, [evidence?.id, evidence?.kind]);

  // Penempatan koordinat adaptif berbasis viewport tanpa atribut style inline JSX
  useLayoutEffect(() => {
    const el = popoverRef.current;
    if (!el || !anchorPoint || !evidence) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const popW = rect.width || 384;
    const popH = rect.height || 290;
    const margin = 14;
    const offset = 20;

    let left =
      anchorPoint.x <= vw * 0.56
        ? anchorPoint.x + offset
        : anchorPoint.x - popW - offset;

    if (left + popW > vw - margin) {
      left = vw - popW - margin;
    }
    if (left < margin) {
      left = margin;
    }

    let top = anchorPoint.y - Math.min(72, popH * 0.28);
    if (top + popH > vh - margin) {
      top = vh - popH - margin;
    }
    if (top < margin) {
      top = margin;
    }

    el.style.setProperty('--quote-x', `${Math.round(left)}px`);
    el.style.setProperty('--quote-y', `${Math.round(top)}px`);
  }, [anchorPoint, evidence, quoteIdx, isPinned]);

  // Tutup saat klik di luar area popover ketika dalam status terkunci (pinned)
  useEffect(() => {
    if (!isPinned || !evidence) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (popoverRef.current && popoverRef.current.contains(target)) return;
      if (target.closest('[data-quote-trigger="true"]')) return;
      onClose();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isPinned, evidence, onClose]);

  if (!evidence || !anchorPoint || evidence.quotes.length === 0) {
    return null;
  }

  const safeIdx = quoteIdx < evidence.quotes.length ? quoteIdx : 0;
  const activeQuote = evidence.quotes[safeIdx];

  const handleCopyCitation = async () => {
    const formatted = `"${activeQuote.verbatim}" (${activeQuote.informantRole} [${activeQuote.informantCode}], Koding NVivo: ${activeQuote.nvivoTheme} — ${evidence.title}, Riset HMM BUMDes Ketapanrame).`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label={`Bukti kutipan langsung: ${evidence.title}`}
      className={`no-export fixed z-[60] left-[var(--quote-x,16px)] top-[var(--quote-y,16px)] w-[352px] sm:w-[396px] max-w-[calc(100vw-24px)] bg-white border border-slate-200/95 rounded-2xl shadow-xl text-slate-800 transition-opacity duration-150 ${
        isPinned ? 'pointer-events-auto ring-1 ring-slate-900/5' : 'pointer-events-none opacity-95'
      }`}
    >
      {/* Header Metadata & Judul Simpul/Garis */}
      <div className="px-4 pt-3.5 pb-2.5 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-0.5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-500 tabular-nums">
            <Quote className="w-3 h-3 text-sky-600 shrink-0" />
            <span>{evidence.kind === 'edge' ? 'Bukti Garis Alir' : 'Bukti Simpul'}</span>
            <span aria-hidden="true">&middot;</span>
            <span>Konsensus {evidence.consensusCount}/5 informan</span>
          </div>
          <h4 className="font-bold text-xs sm:text-[13.5px] text-slate-900 leading-snug">
            {evidence.title}
          </h4>
          {evidence.relationFormula && (
            <p className="text-[11px] font-mono text-sky-700 font-medium leading-tight pt-0.5">
              {evidence.relationFormula}
            </p>
          )}
        </div>

        {isPinned ? (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer shrink-0"
            title="Tutup panel kutipan (ESC)"
            aria-label="Tutup panel kutipan"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 whitespace-nowrap shrink-0 pt-0.5">
            <Pin className="w-3 h-3" />
            <span>Klik untuk kunci</span>
          </span>
        )}
      </div>

      {/* Pemilih Informan bila terdapat > 1 kutipan pada simpul/garis */}
      {evidence.quotes.length > 1 && (
        <div className="px-4 pt-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 overflow-x-auto max-w-full">
            {evidence.quotes.map((q, idx) => {
              const active = idx === safeIdx;
              return (
                <button
                  key={`${q.informantCode}-${idx}`}
                  type="button"
                  onClick={() => setQuoteIdx(idx)}
                  className={`px-2 py-1 rounded-md text-[10.5px] font-semibold transition cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                    active
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {q.informantCode} &middot; {q.informantRole.split(' ')[0]}{' '}
                  {q.informantRole.split(' ')[1] || ''}
                </button>
              );
            })}
          </div>
          <span className="text-[10.5px] font-mono text-slate-400 tabular-nums whitespace-nowrap shrink-0">
            {safeIdx + 1}/{evidence.quotes.length}
          </span>
        </div>
      )}

      {/* Isi Kutipan Langsung Verbatim */}
      <div className="p-4 space-y-2.5">
        <figure className="bg-slate-50/90 border border-slate-200/90 rounded-xl p-3 space-y-2">
          <blockquote className="text-xs sm:text-[12.5px] text-slate-800 italic leading-relaxed">
            &ldquo;{activeQuote.verbatim}&rdquo;
          </blockquote>
          <figcaption className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10.5px] text-slate-600">
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {activeQuote.informantCode}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span className="font-semibold text-slate-800">{activeQuote.informantRole}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-slate-500">Tema NVivo: {activeQuote.nvivoTheme}</span>
          </figcaption>
        </figure>

        {/* Konteks & Sintesis Mediatisasi */}
        <div className="text-[11px] text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">Konteks Empiris: </span>
          <span>{activeQuote.contextNote} </span>
          <span className="text-slate-500">{evidence.synthesis}</span>
        </div>
      </div>

      {/* Baris Tindakan Akademik (Aktif saat diklik/dikunci) */}
      {isPinned && (
        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 rounded-b-2xl flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopyCitation}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 transition cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Kutipan Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Kutipan Naskah</span>
              </>
            )}
          </button>

          {onOpenActorRole && (
            <button
              type="button"
              onClick={() => onOpenActorRole(activeQuote.actorId)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-[11px] font-semibold text-sky-800 transition cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Profil Relasi Informan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
