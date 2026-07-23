import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { CalasClassChartCard, CalasClassTableCard } from '@/components/dashboard/CalasClassChartWidget'

export default function KorlapDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            Koordinator Lapangan Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Selamat Datang, {user?.nama || 'Korlap'}!
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Atur jadwal sesi ujian, plot PJ ruangan 121-125, dan pantau jalannya ujian lewat Kanban board.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-emerald-800 hover:bg-gray-100 border-none font-bold self-start sm:self-center"
          onClick={() => navigate('/korlap/kanban')}
        >
          📊 Buka Kanban Board
        </Button>
      </div>

      {/* ─── 1. PINTASAN AKSI ────────────────────────────────────────────────── */}
      <Card header="Pintasan Aksi Korlap">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            className="w-full justify-start py-4 h-auto"
            onClick={() => navigate('/scheduling/session-list')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900">Penjadwalan Sesi Ujian</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Buat & kelola tanggal ujian</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="w-full justify-start py-4 h-auto"
            onClick={() => navigate('/korlap/rooms')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900">Assign PJ Ruangan</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Plotting PJ per ruangan 121-125</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="w-full justify-start py-4 h-auto"
            onClick={() => navigate('/scheduling/room-placement')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900">Placement Peserta & Penilai</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Bagi calas & penilai per ruangan</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* ─── 2. STATCARD (ROLE METRICS) ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/scheduling/session-list')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sesi Ujian Dijadwalkan</p>
              <p className="text-3xl font-extrabold text-lepkom-green mt-1">4</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Ujian Praktek & Project</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-lepkom-green flex items-center justify-center font-bold text-xl">
              📅
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/korlap/rooms')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ruangan Berfungsi</p>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">4 / 4</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Ruang 121, 122, 124, 125</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              🏢
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/korlap/kanban')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overview Kanban</p>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">Ready</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Monitoring Ruangan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              📌
            </div>
          </div>
        </Card>
      </div>

      {/* ─── 3. CHART ─────────────────────────────────────────────────────────── */}
      <CalasClassChartCard />

      {/* ─── 4. TABEL ─────────────────────────────────────────────────────────── */}
      <CalasClassTableCard />
    </div>
  )
}