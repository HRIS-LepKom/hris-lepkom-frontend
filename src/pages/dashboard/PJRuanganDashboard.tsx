import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSystemOverviewWidget } from '@/components/dashboard/GlobalSystemOverviewWidget'

export default function PJRuanganDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ═══ SECTION 1: ROLE-SPECIFIC WORKSPACE ═══ */}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            Penanggung Jawab Ruangan Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Selamat Datang, {user?.nama || 'PJ Ruangan'}!
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Awasi jalannya ujian di ruangan penugasan Anda, pastikan absensi & penilai terkoordinasi.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-purple-900 hover:bg-gray-100 border-none font-bold self-start sm:self-center"
          onClick={() => navigate('/korlap/rooms')}
        >
          🏢 Lihat Penugasan Ruangan
        </Button>
      </div>

      {/* Status Ruangan */}
      <Card header="⚡ Status Penugasan Ruangan Anda">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Ruangan Ditugaskan:</span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-1">Ruangan 121 (Lab Komputer)</h2>
            <p className="text-xs text-gray-500 mt-1">Sesi: Ujian Praktek — 09:00 WIB</p>
          </div>
          <Badge variant="status-green" className="text-sm px-3 py-1 self-start sm:self-center">
            Ruangan Siap
          </Badge>
        </div>
      </Card>

      {/* Pintasan Aksi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card header="Koreksi & Presensi Ruangan">
          <div className="space-y-3">
            <p className="text-xs text-gray-600">
              Pastikan seluruh peserta calas di ruangan 121 menempati PC yang sesuai dan penilai hadir.
            </p>
            <Button variant="primary" className="w-full" onClick={() => navigate('/scheduling/room-placement')}>
              Cek Daftar Peserta Ruangan
            </Button>
          </div>
        </Card>
        <Card header="Kendala / Laporan Ruangan">
          <div className="space-y-3">
            <p className="text-xs text-gray-600">
              Jika ada kendala hardware PC atau ketidakhadiran penilai, segera laporkan ke Korlap.
            </p>
            <Button variant="secondary" className="w-full" onClick={() => navigate('/korlap/kanban')}>
              Lihat Overview Korlap
            </Button>
          </div>
        </Card>
      </div>

      {/* Statcard Metrik Role */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-purple-50/50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Peserta Hadir</p>
              <p className="text-xl font-extrabold text-purple-700 mt-1">24 / 26</p>
              <p className="text-xs text-gray-600 mt-0.5">2 Belum Presensi</p>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </Card>
        <Card className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Penilai Hadir</p>
              <p className="text-xl font-extrabold text-lepkom-blue mt-1">6 / 6</p>
              <p className="text-xs text-gray-600 mt-0.5">Lengkap</p>
            </div>
            <span className="text-2xl">👨‍🏫</span>
          </div>
        </Card>
        <Card className="bg-amber-50/50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kapasitas PC</p>
              <p className="text-xl font-extrabold text-amber-600 mt-1">30 Unit</p>
              <p className="text-xs text-gray-600 mt-0.5">4 Tersedia</p>
            </div>
            <span className="text-2xl">💻</span>
          </div>
        </Card>
      </div>

      {/* ═══ SECTION 2: GLOBAL SYSTEM OVERVIEW ═══ */}
      <GlobalSystemOverviewWidget />
    </div>
  )
}