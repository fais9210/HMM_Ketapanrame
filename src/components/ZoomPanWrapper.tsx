import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Move, Hand } from 'lucide-react';

interface ZoomPanWrapperProps {
  children: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
  className?: string;
  contentClassName?: string;
  enableMouseDrag?: boolean;
}

export const ZoomPanWrapper: React.FC<ZoomPanWrapperProps> = ({
  children,
  minZoom = 0.5,
  maxZoom = 2.5,
  initialZoom = 1,
  className = '',
  contentClassName = '',
  enableMouseDrag = true,
}) => {
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPanMode, setIsPanMode] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Touch tracking refs
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(initialZoom);
  const lastTouchPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastTapTimeRef = useRef<number>(0);
  const mouseStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Auto-hide gesture hint after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), maxZoom));
    setShowHint(false);
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), minZoom));
    setShowHint(false);
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setShowHint(false);
  };

  const handleFit = () => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.clientWidth - 32;
      const contentWidth = 1220; // Nominal diagram width
      if (containerWidth < contentWidth) {
        const calculatedZoom = Math.max(Number((containerWidth / contentWidth).toFixed(2)), minZoom);
        setZoom(calculatedZoom);
        setPan({ x: 0, y: 0 });
      } else {
        handleReset();
      }
    }
  };

  // Touch handlers for mobile pinch-to-zoom and touch-drag
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // Pinch to Zoom start
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      touchStartDistRef.current = dist;
      touchStartZoomRef.current = zoom;
      setShowHint(false);
    } else if (e.touches.length === 1) {
      // 1 finger touch
      const touch = e.touches[0];
      const now = Date.now();

      // Double tap to toggle zoom
      if (now - lastTapTimeRef.current < 300) {
        if (zoom > 1.05) {
          setZoom(1);
          setPan({ x: 0, y: 0 });
        } else {
          setZoom(1.4);
        }
        lastTapTimeRef.current = 0;
        return;
      }
      lastTapTimeRef.current = now;

      // If in pan mode or zoomed in, allow smooth touch dragging
      if (zoom > 1.05 || isPanMode) {
        lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };
        panStartRef.current = { ...pan };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      // Handle pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const factor = dist / touchStartDistRef.current;
      const newZoom = Math.min(
        Math.max(Number((touchStartZoomRef.current * factor).toFixed(2)), minZoom),
        maxZoom
      );
      setZoom(newZoom);
    } else if (e.touches.length === 1 && lastTouchPosRef.current && (zoom > 1.05 || isPanMode)) {
      // Handle touch pan
      const touch = e.touches[0];
      const dx = touch.clientX - lastTouchPosRef.current.x;
      const dy = touch.clientY - lastTouchPosRef.current.y;

      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
    lastTouchPosRef.current = null;
  };

  // Mouse handlers for desktop dragging when pan mode is on or zoomed
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only drag on left click and if panMode or zoomed in or middle click
    if ((e.button === 0 && (isPanMode || zoom > 1.05)) || e.button === 1) {
      // Ignore if clicking directly on a button or interactive node
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('input') || target.closest('select') || target.closest('a')) {
        return;
      }

      setIsDragging(true);
      mouseStartPosRef.current = { x: e.clientX, y: e.clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && mouseStartPosRef.current) {
      const dx = e.clientX - mouseStartPosRef.current.x;
      const dy = e.clientY - mouseStartPosRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    mouseStartPosRef.current = null;
  };

  // Wheel zoom with Ctrl or trackpad pinch
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY;
      const zoomChange = delta > 0 ? 0.08 : -0.08;
      setZoom((prev) =>
        Math.min(Math.max(Number((prev + zoomChange).toFixed(2)), minZoom), maxZoom)
      );
      setShowHint(false);
    }
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Floating Zoom & Pan Control Widget */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-slate-200/90 shadow-md text-xs font-semibold text-slate-700 select-none">
        {/* Toggle Pan Drag Mode */}
        <button
          onClick={() => setIsPanMode(!isPanMode)}
          className={`p-1.5 rounded-xl transition flex items-center gap-1 ${
            isPanMode
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title={isPanMode ? 'Matikan Mode Geser (Pan)' : 'Aktifkan Mode Geser (Pan Canvas)'}
        >
          <Hand className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">{isPanMode ? 'Pan Aktif' : 'Pan'}</span>
        </button>

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          disabled={zoom <= minZoom}
          className="p-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-30 rounded-lg transition"
          title="Perkecil Diagram (Zoom Out)"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Level Indicator */}
        <button
          onClick={handleReset}
          className="px-1.5 py-0.5 min-w-[44px] text-center text-[11px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded transition"
          title="Klik untuk reset ke 100%"
        >
          {Math.round(zoom * 100)}%
        </button>

        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          disabled={zoom >= maxZoom}
          className="p-1.5 text-slate-700 hover:bg-slate-100 disabled:opacity-30 rounded-lg transition"
          title="Perbesar Diagram (Zoom In)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        {/* Fit to Screen Button */}
        <button
          onClick={handleFit}
          className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition"
          title="Sesuaikan Ukuran Layar (Fit View)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Reset All */}
        <button
          onClick={handleReset}
          className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition"
          title="Reset Zoom & Posisi"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Gesture Tip Pill on Mobile */}
      {showHint && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/90 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-lg border border-slate-700 backdrop-blur-md flex items-center gap-2 pointer-events-none transition-opacity duration-300 animate-in fade-in slide-in-from-bottom-2">
          <Move className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Cubit layar (pinch) untuk zoom &amp; geser bebas atau scroll biasa</span>
        </div>
      )}

      {/* Scrollable Container (Retains full native horizontal/vertical scroll) */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 select-none ${
          isPanMode || isDragging ? 'cursor-grab active:cursor-grabbing' : ''
        } ${contentClassName}`}
        style={{
          touchAction: zoom > 1.05 || isPanMode ? 'none' : 'pan-x pan-y',
        }}
      >
        <div
          ref={contentRef}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
            transition: isDragging || touchStartDistRef.current !== null ? 'none' : 'transform 0.15s ease-out',
            width: zoom > 1 ? `${zoom * 100}%` : '100%',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
