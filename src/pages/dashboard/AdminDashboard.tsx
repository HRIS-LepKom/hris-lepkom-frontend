import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSystemOverviewWidget } from '@/components/dashboard/GlobalSystemOverviewWidget'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* ─── SECTION 1: PERSONALIZED ROLE OPERATIONS ─────────────────────────── */}
      <div className="space-y-6">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-r from-lepkom-green to-lepkom-blue text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
              Super Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              Selamat Datang, {user?.nama || 'Admin'}!
            </h1>
            <p className="text-sm text-white/80 mt-1 max-w-xl">
              Kelola seluruh operasional sistem rekrutmen asisten LEPKOM, data master, hak akses role, dan sesi ujian.
            </p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-lepkom-green hover:bg-gray-100 border-none font-bold self-start sm:self-center shadow-xs"
            onClick={() => navigate('/admin/recruitment-toggle')}
          >
            ⚙️ Setting Periode Rekrutmen
          </Button>
        </div>

        {/* Quick Action Shortcuts */}
        <Card header="⚡ Pintasan Aksi Utama Super Admin">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="secondary"
              className="w-full justify-start py-3.5 h-auto hover:border-lepkom-green/40 transition-all"
              onClick={() => navigate('/master-data/assistants')}
            >
              <div className="text-left">
                <p className="font-bold text-gray-900">Kelola Master Asisten</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">Tambah asisten & assign role penilai</p>
              </div>
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start py-3.5 h-auto hover:border-lepkom-green/40 transition-all"
              onClick={() => navigate('/admin/calas-management')}
            >
              <div className="text-left">
                <p className="font-bold text-gray-900">Manajemen Calon Asisten</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">Update timeline & kelulusan calas</p>
              </div>
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start py-3.5 h-auto hover:border-lepkom-green/40 transition-all"
              onClick={() => navigate('/master-data/materials')}
            >
              <div className="text-left">
                <p className="font-bold text-gray-900">Bank Materi & Soal Ujian</p>
                <p className="text-xs text-gray-500 font-normal mt-0.5">Upload soal & kelola materi kursus</p>
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