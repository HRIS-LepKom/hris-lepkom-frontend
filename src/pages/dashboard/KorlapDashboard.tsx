import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSystemOverviewWidget } from '@/components/dashboard/GlobalSystemOverviewWidget'

export default function KorlapDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* ─── SECTION 1: PERSONALIZED ROLE OPERATIONS ─────────────────────────── */}
      <div className="space-y-6">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
              Koordinator Lapangan Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              Selamat Datang, {user?.nama || 'Korlap'}!
            </h1>
            <p className="text-sm text-white/80 mt-1 max-w-xl">
              Atur jadwal sesi ujian, plot PJ ruangan 121-125, dan pantau jalannya ujian lewat Kanban board.
            </p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-emerald-800 hover:bg-gray-100 border-none font-bold self-start sm:self-center shadow-xs"
            onClick={() => navigate('/korlap/kanban')}
          >
            📊 Buka Kanban Live Board
          </Button>
        </div>

        {/* Quick Action Shortcuts */}
        <Card header="⚡ Pintasan Aksi Korlap">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="secondary"
              className="w-full justify-start py-4 h-auto hover:border-emerald-600/40 transition-all"
              onClick={() => navigate('/scheduling/session-list')}
            >
              <div className="text-left">
                <p className="font-bold text-gray-900">Penjadwalan Sesi Ujian</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">Buat & kelola tanggal ujian</p>
              </div>
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start py-4 h-auto hover:border-emerald-600/40 transition-all"
              onClick={() => navigate('/korlap/rooms')}
            >
              <div className="text-left">
                <p className="font-bold text-gray-900">Assign PJ Ruangan</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">Plotting PJ per ruangan 121-125</p>
              </div>
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start py-4 h-auto hover:border-emerald-600/40 transition-all"
              onClick={() => navigate('/scheduling/room-placement')}
            >
              <div className="text-left">
                <p className="font-bold text-gray-900">Placement Peserta & Penilai</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">Bagi calas & penilai per ruangan</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>

      {/* ─── SECTION 2: GLOBAL SYSTEM INSIGHTS ─────────────────────────────── */}
      <GlobalSystemOverviewWidget />
    </div>
  )
}