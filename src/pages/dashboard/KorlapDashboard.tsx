import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSystemOverviewWidget } from '@/components/dashboard/GlobalSystemOverviewWidget'

export default function KorlapDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ═══ SECTION 1: ROLE-SPECIFIC WORKSPACE ═══ */}

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

      {/* Pintasan Aksi */}
      <Card header="⚡ Pintasan Aksi Korlap">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full justify-start py-4 h-auto" onClick={() => navigate('/scheduling/session-list')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Penjadwalan Sesi Ujian</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Buat & kelola tanggal ujian</p>
            </div>
          </Button>
          <Button variant="secondary" className="w-full justify-start py-4 h-auto" onClick={() => navigate('/korlap/rooms')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Assign PJ Ruangan</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Plotting PJ per ruangan 121-125</p>
            </div>
          </Button>
          <Button variant="secondary" className="w-full justify-start py-4 h-auto" onClick={() => navigate('/scheduling/room-placement')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Placement Peserta & Penilai</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Bagi calas & penilai per ruangan</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Statcard Metrik Role */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-emerald-50/50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sesi Ujian Aktif</p>
              <p className="text-xl font-extrabold text-emerald-700 mt-1">3 Sesi</p>
              <p className="text-xs text-gray-600 mt-0.5">2 Praktek • 1 Project</p>
            </div>
            <span className="text-2xl">📅</span>
          </div>
        </Card>
        <Card className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ruangan Siap</p>
              <p className="text-xl font-extrabold text-lepkom-blue mt-1">5 / 5</p>
              <p className="text-xs text-gray-600 mt-0.5">Semua PJ Terisi</p>
            </div>
            <span className="text-2xl">🏢</span>
          </div>
        </Card>
        <Card className="bg-amber-50/50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Alokasi Penilai</p>
              <p className="text-xl font-extrabold text-amber-600 mt-1">30 Penilai</p>
              <p className="text-xs text-gray-600 mt-0.5">6 per ruangan (rata-rata)</p>
            </div>
            <span className="text-2xl">👨‍🏫</span>
          </div>
        </Card>
      </div>

      {/* ═══ SECTION 2: GLOBAL SYSTEM OVERVIEW ═══ */}
      <GlobalSystemOverviewWidget />
    </div>
  )
}