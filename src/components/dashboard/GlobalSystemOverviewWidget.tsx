import React from 'react'
import { Card, Badge } from '@/components/ui'
import { CalasClassChartWidget } from './CalasClassChartWidget'

export const GlobalSystemOverviewWidget: React.FC = () => {
  return (
    <div className="space-y-6 pt-6 border-t border-border/80">
      {/* ─── SECTION 2 HEADER ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gradient-to-r from-gray-900 to-lepkom-blue text-white p-5 rounded-xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <h2 className="text-lg font-extrabold tracking-tight">
              Ringkasan Ekosistem & Status Sistem HRIS LEPKOM
            </h2>
          </div>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Gambaran umum performa 4 pilar operasional rekrutmen, kapasitas ruangan, serta ketersediaan master data lembaga.
          </p>
        </div>
        <Badge variant="status-green" className="self-start sm:self-center bg-green-500/20 text-green-300 border-green-400/30 text-xs px-3 py-1">
          Sistem Online & Active
        </Badge>
      </div>

      {/* ─── 4-PILAR STATCARDS GRID (TAILADMIN INSPIRED STYLING) ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pilar 1: Master Asisten */}
        <Card className="bg-white hover:shadow-md transition-shadow border-border">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-lepkom-green flex items-center justify-center text-lg font-bold">
              👨‍💻
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              45 Terverifikasi
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Asisten LEPKOM</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">45 Asisten</p>
            <p className="text-xs text-gray-500 mt-1">30 Penilai • 15 Staff PJ</p>
          </div>
        </Card>

        {/* Pilar 2: Total Calas */}
        <Card className="bg-white hover:shadow-md transition-shadow border-border">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-lepkom-blue flex items-center justify-center text-lg font-bold">
              👥
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Periode Aktif
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pendaftar Calas</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">128 Calas</p>
            <p className="text-xs text-gray-500 mt-1">7 Kelompok Kelas Kuliah</p>
          </div>
        </Card>

        {/* Pilar 3: Ruangan Ujian */}
        <Card className="bg-white hover:shadow-md transition-shadow border-border">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-lg font-bold">
              🏫
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              Lab 121-125
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kapasitas Ruangan</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">5 Ruangan</p>
            <p className="text-xs text-gray-500 mt-1">Status: Ready untuk Sesi</p>
          </div>
        </Card>

        {/* Pilar 4: Bank Soal & Materi */}
        <Card className="bg-white hover:shadow-md transition-shadow border-border">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg font-bold">
              📂
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              100% Complete
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bank Soal & Materi</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">24 Paket</p>
            <p className="text-xs text-gray-500 mt-1">Tingkat 1, 2, & 3 Gunadarma</p>
          </div>
        </Card>
      </div>

      {/* ─── GLOBAL DISTRIBUTION CHART WIDGET ────────────────────────────────── */}
      <CalasClassChartWidget />
    </div>
  )
}
