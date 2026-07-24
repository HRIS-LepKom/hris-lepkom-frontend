import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSystemOverviewWidget } from '@/components/dashboard/GlobalSystemOverviewWidget'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: ROLE-SPECIFIC WORKSPACE                                    */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-lepkom-green to-lepkom-blue text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            Super Admin Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">Selamat Datang, {user?.nama || 'Admin'}!</h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Kelola seluruh operasional sistem rekrutmen asisten LEPKOM, data master, hak akses role, dan sesi ujian.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-lepkom-green hover:bg-gray-100 border-none font-bold self-start sm:self-center"
          onClick={() => navigate('/admin/recruitment-toggle')}
        >
          ⚙️ Setting Rekrutmen
        </Button>
      </div>

      {/* Pintasan Aksi */}
      <Card header="⚡ Pintasan Aksi Utama Super Admin">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full justify-start py-3 h-auto" onClick={() => navigate('/master-data/assistants')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Kelola Master Asisten</p>
              <p className="text-xs text-gray-500 font-normal">Tambah asisten & assign role penilai</p>
            </div>
          </Button>
          <Button variant="secondary" className="w-full justify-start py-3 h-auto" onClick={() => navigate('/admin/calas-management')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Manajemen Calon Asisten</p>
              <p className="text-xs text-gray-500 font-normal">Update timeline & kelulusan calas</p>
            </div>
          </Button>
          <Button variant="secondary" className="w-full justify-start py-3 h-auto" onClick={() => navigate('/master-data/materials')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Bank Materi & Soal Ujian</p>
              <p className="text-xs text-gray-500 font-normal">Upload soal & kelola materi kursus</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Statcard Metrik Role */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-green-50/50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Rekrutmen</p>
              <p className="text-xl font-extrabold text-status-green mt-1">AKTIF</p>
              <p className="text-xs text-gray-600 mt-0.5">Periode 2026/2027 Ganjil</p>
            </div>
            <Badge variant="status-green" className="text-sm px-3 py-1">ON</Badge>
          </div>
        </Card>
        <Card className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pendaftar</p>
              <p className="text-xl font-extrabold text-lepkom-blue mt-1">128 Calas</p>
              <p className="text-xs text-gray-600 mt-0.5">Dari 7 Kelompok Kelas</p>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </Card>
        <Card className="bg-amber-50/50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Asisten Aktif</p>
              <p className="text-xl font-extrabold text-amber-600 mt-1">45 Asisten</p>
              <p className="text-xs text-gray-600 mt-0.5">30 Penilai • 15 Staff PJ</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: GLOBAL SYSTEM OVERVIEW                                     */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <GlobalSystemOverviewWidget />
    </div>
  )
}