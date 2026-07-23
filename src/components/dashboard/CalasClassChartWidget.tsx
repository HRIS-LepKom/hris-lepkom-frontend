import React, { useState } from 'react'
import { Card, Badge, DataTable } from '@/components/ui'

export interface ClassStatItem {
  kodeKelas: string
  jurusan: string
  totalCalas: number
  persentase: number
  status: 'Dominan' | 'Sedang' | 'Minor'
}

const MOCK_CLASS_STATS: ClassStatItem[] = [
  { kodeKelas: '1IA20', jurusan: 'Teknik Informatika', totalCalas: 34, persentase: 26.5, status: 'Dominan' },
  { kodeKelas: '1KA20', jurusan: 'Sistem Informasi', totalCalas: 28, persentase: 21.8, status: 'Dominan' },
  { kodeKelas: '2MA01', jurusan: 'Manajemen Informatika', totalCalas: 22, persentase: 17.1, status: 'Sedang' },
  { kodeKelas: '3KA01', jurusan: 'Sistem Informasi', totalCalas: 18, persentase: 14.0, status: 'Sedang' },
  { kodeKelas: '1DB01', jurusan: 'Manajemen Informatika', totalCalas: 14, persentase: 10.9, status: 'Minor' },
  { kodeKelas: '4KA05', jurusan: 'Sistem Informasi', totalCalas: 8, persentase: 6.2, status: 'Minor' },
  { kodeKelas: '2IA02', jurusan: 'Teknik Informatika', totalCalas: 4, persentase: 3.5, status: 'Minor' },
]

export const CalasClassChartWidget: React.FC = () => {
  const [hoveredClass, setHoveredClass] = useState<ClassStatItem | null>(null)
  const totalCalasSum = MOCK_CLASS_STATS.reduce((acc, curr) => acc + curr.totalCalas, 0)
  const maxCalas = Math.max(...MOCK_CLASS_STATS.map((s) => s.totalCalas))

  const tableColumns = [
    {
      key: 'kodeKelas',
      label: 'Kode Kelas Kuliah',
      render: (row: ClassStatItem) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-lepkom-green text-sm px-2 py-0.5 bg-green-50 rounded border border-lepkom-green/20">
            {row.kodeKelas}
          </span>
          <span className="text-xs text-gray-500 hidden sm:inline">({row.jurusan})</span>
        </div>
      ),
    },
    {
      key: 'totalCalas',
      label: 'Jumlah Calas',
      render: (row: ClassStatItem) => (
        <span className="font-extrabold text-gray-900 text-sm">{row.totalCalas} Orang</span>
      ),
    },
    {
      key: 'persentase',
      label: 'Proporsi',
      render: (row: ClassStatItem) => (
        <div className="flex items-center gap-3 w-36">
          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-lepkom-green h-full rounded-full transition-all duration-500"
              style={{ width: `${row.persentase}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-700 w-10 text-right">{row.persentase}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Kategori',
      render: (row: ClassStatItem) => (
        <Badge
          variant={row.status === 'Dominan' ? 'status-green' : row.status === 'Sedang' ? 'status-yellow' : 'info'}
        >
          {row.status}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* ─── URUTAN 1: CHART STATISTIK ────────────────────────────────────────── */}
      <Card
        header={
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📊</span> Statistik Distribusi Calas per Kelas Kuliah
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Visualisasi proporsi jumlah pendaftar calon asisten berdasarkan kelompok kode kelas.
              </p>
            </div>
            <Badge variant="role" className="self-start sm:self-center">
              Total {totalCalasSum} Calas
            </Badge>
          </div>
        }
      >
        <div className="py-2 space-y-6">
          {/* Custom Animated SVG Bar Chart Container */}
          <div className="relative pt-8 pb-4 px-3 bg-page/60 rounded-xl border border-border overflow-hidden">
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 px-4 py-8 flex flex-col justify-between pointer-events-none opacity-30">
              <div className="border-b border-gray-300 w-full" />
              <div className="border-b border-gray-300 w-full" />
              <div className="border-b border-gray-300 w-full" />
            </div>

            {/* Absolute Floating Tooltip (No Layout Shift) */}
            <div className="absolute top-2 left-3 right-3 h-7 z-20 pointer-events-none flex items-center justify-between">
              {hoveredClass ? (
                <div className="w-full px-3 py-1 bg-gray-900 text-white rounded-md text-xs shadow-sm flex items-center justify-between animate-in fade-in duration-150">
                  <span className="font-bold font-mono text-lepkom-green">{hoveredClass.kodeKelas}</span>
                  <span className="text-gray-300 truncate max-w-[200px]">{hoveredClass.jurusan}</span>
                  <span className="font-extrabold text-yellow-400">{hoveredClass.totalCalas} Calas ({hoveredClass.persentase}%)</span>
                </div>
              ) : (
                <div className="text-[11px] text-gray-400 font-medium italic px-1">
                  Arahkan kursor ke batang chart untuk melihat detail rincian...
                </div>
              )}
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-56 pt-6 pb-2 px-2 relative z-10">
              {MOCK_CLASS_STATS.map((item) => {
                const heightPercent = Math.round((item.totalCalas / maxCalas) * 100)
                const isHovered = hoveredClass?.kodeKelas === item.kodeKelas

                return (
                  <div
                    key={item.kodeKelas}
                    onMouseEnter={() => setHoveredClass(item)}
                    onMouseLeave={() => setHoveredClass(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-gray-700 mb-1 group-hover:text-lepkom-green transition-colors">
                      {item.totalCalas}
                    </div>
                    <div className="w-full max-w-[42px] bg-gray-200 rounded-t-lg h-full flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:brightness-110 ${
                          isHovered ? 'bg-lepkom-blue shadow-md' : 'bg-lepkom-green'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="mt-2 text-xs font-mono font-bold text-gray-800 group-hover:text-lepkom-green transition-colors truncate">
                      {item.kodeKelas}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* ─── URUTAN 2: TABEL DATA RINCIAN ──────────────────────────────────────── */}
      <Card header="📋 Breakdown Rincian Pendaftar per Kelas">
        <DataTable columns={tableColumns} data={MOCK_CLASS_STATS} emptyMessage="Data kelas belum tersedia" />
      </Card>

      {/* ─── URUTAN 3: STATUS CARD METRIK SUMMARY ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-green-50/50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kelas Paling Dominan</p>
              <p className="text-2xl font-extrabold text-lepkom-green mt-1">1IA20</p>
              <p className="text-xs text-gray-600 mt-0.5">34 Calas Pendaftar</p>
            </div>
            <span className="text-2xl">🏆</span>
          </div>
        </Card>

        <Card className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Kelompok Kelas</p>
              <p className="text-2xl font-extrabold text-lepkom-blue mt-1">7 Kelas</p>
              <p className="text-xs text-gray-600 mt-0.5">Tingkat 1 - 4 Gunadarma</p>
            </div>
            <span className="text-2xl">🏫</span>
          </div>
        </Card>

        <Card className="bg-amber-50/50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rata-Rata per Kelas</p>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">18.3 Calas</p>
              <p className="text-xs text-gray-600 mt-0.5">Distribusi Pendaftaran</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
