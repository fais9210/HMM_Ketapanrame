import React, { useState } from 'react';
import { StructuredCrosstabDataset } from '../types';
import { Copy, Download, Check, FileCode, Search, Minimize2, Maximize2 } from 'lucide-react';

interface JsonViewerProps {
  dataset: StructuredCrosstabDataset;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ dataset }) => {
  const [copied, setCopied] = useState(false);
  const [viewScope, setViewScope] = useState<'full' | 'edges' | 'matrix' | 'informants'>('full');
  const [searchTerm, setSearchTerm] = useState('');

  // Target JSON to display
  const targetData = React.useMemo(() => {
    switch (viewScope) {
      case 'edges':
        return {
          totalEdges: dataset.edges.length,
          edgesSummary: {
            codesEdges: dataset.edges.filter((e) => e.type === 'Codes').length,
            valueEdges: dataset.edges.filter((e) => e.type === 'Value').length,
          },
          edges: dataset.edges,
        };
      case 'matrix':
        return {
          totalThemes: dataset.crosstabMatrix.length,
          crosstabMatrix: dataset.crosstabMatrix,
        };
      case 'informants':
        return {
          informants: dataset.informants,
          attributes: dataset.attributes,
        };
      case 'full':
      default:
        return dataset;
    }
  }, [dataset, viewScope]);

  const jsonString = JSON.stringify(targetData, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crosstab_${viewScope}_dataset.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            System.Out // Extracted JSON
          </span>
          <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded font-mono">
            {dataset.edges.length} Edges Total
          </span>
        </div>

        {/* View Scope Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            id="json-scope-full"
            onClick={() => setViewScope('full')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              viewScope === 'full' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Dataset
          </button>
          <button
            id="json-scope-edges"
            onClick={() => setViewScope('edges')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              viewScope === 'edges' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Edges Saja ({dataset.edges.length})
          </button>
          <button
            id="json-scope-matrix"
            onClick={() => setViewScope('matrix')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              viewScope === 'matrix' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matriks Crosstab
          </button>
          <button
            id="json-scope-informants"
            onClick={() => setViewScope('informants')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              viewScope === 'informants' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Informan & Atribut
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="copy-json-btn"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Tersalin!' : 'Copy JSON'}
          </button>
          <button
            id="download-json-btn"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export File
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative">
        <pre className="p-4 text-xs font-mono text-emerald-300 bg-slate-900 overflow-x-auto max-h-[580px] overflow-y-auto leading-relaxed selection:bg-indigo-500 selection:text-white">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
