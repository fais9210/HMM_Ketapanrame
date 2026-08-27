import React from 'react';
import { Filter, RotateCcw, Users, Layers } from 'lucide-react';
import { Informant } from '../types';

export interface GlobalFilterState {
  role: string;
  education: string;
  gender: string;
  ageGroup: string;
}

interface GlobalFilterBarProps {
  filters: GlobalFilterState;
  onFilterChange: (newFilters: GlobalFilterState) => void;
  onResetFilters: () => void;
  informants: Informant[];
  activeInformantCount: number;
  totalInformants: number;
}

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  informants,
  activeInformantCount,
  totalInformants,
}) => {
  const isFiltered =
    filters.role !== 'ALL' ||
    filters.education !== 'ALL' ||
    filters.gender !== 'ALL' ||
    filters.ageGroup !== 'ALL';

  return (
    <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 text-xs">
        {/* Left Side: Filter Selects */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs">Filter:</span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {/* Filter Peran */}
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-slate-400 font-normal hidden lg:inline shrink-0">Peran:</span>
              <select
                id="global-filter-role"
                value={filters.role}
                onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="ALL">Semua Peran (5)</option>
                <option value="Admin Media Sosial">Admin Medsos (INF-01)</option>
                <option value="Kepala Desa Ketapanrame">Kades Ketapanrame (INF-02)</option>
                <option value="Ketua BUMDeS">Ketua BUMDeS (INF-03)</option>
                <option value="Ketua KUB Wahana Taman Ghanjaran">Ketua KUB (INF-04)</option>
                <option value="Tenan Pujasera">Tenan Pujasera (INF-05)</option>
              </select>
            </div>

            {/* Filter Pendidikan */}
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-slate-400 font-normal hidden lg:inline shrink-0">Pendidikan:</span>
              <select
                id="global-filter-education"
                value={filters.education}
                onChange={(e) => onFilterChange({ ...filters, education: e.target.value })}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="ALL">Semua Pendidikan</option>
                <option value="SMA/SMK">SMA/SMK (1 Kasus)</option>
                <option value="S1">S1 (3 Kasus)</option>
                <option value="S2">S2 (1 Kasus)</option>
              </select>
            </div>

            {/* Filter Gender */}
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-slate-400 font-normal hidden lg:inline shrink-0">Gender:</span>
              <select
                id="global-filter-gender"
                value={filters.gender}
                onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="ALL">Semua Gender</option>
                <option value="Laki-laki">Laki-laki (4)</option>
                <option value="Perempuan">Perempuan (1)</option>
              </select>
            </div>

            {/* Filter Kelompok Umur */}
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-slate-400 font-normal hidden lg:inline shrink-0">Umur:</span>
              <select
                id="global-filter-age"
                value={filters.ageGroup}
                onChange={(e) => onFilterChange({ ...filters, ageGroup: e.target.value })}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="ALL">Semua Usia</option>
                <option value="26-35">26-35 th (1)</option>
                <option value="36-45">36-45 th (2)</option>
                <option value="46-55">46-55 th (2)</option>
              </select>
            </div>
          </div>

          {isFiltered && (
            <button
              id="global-filter-reset"
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 rounded-lg hover:bg-indigo-100 transition cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right Side: Active Count Badge */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeInformantCount === totalInformants ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span>
              {activeInformantCount} / {totalInformants} Kasus Aktif
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
