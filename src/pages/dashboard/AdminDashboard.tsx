import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
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

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/master-data/assistants')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Asisten</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">42</p>
              <p className="text-xs text-lepkom-green font-medium mt-1">Staf & Penilai Aktif</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-lepkom-green flex items-center justify-center font-bold text-xl">
              👥
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/calas-management')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Calas Pendaftar</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">128</p>
              <p className="text-xs text-blue-600 font-medium mt-1">Gelombang 2026</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-lepkom-blue flex items-center justify-center font-bold text-xl">
              🎓
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/scheduling/session-list')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sesi Ujian Aktif</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">4</p>
              <p className="text-xs text-amber-600 font-medium mt-1">Ruangan 121, 122, 124, 125</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              📅
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/recruitment-toggle')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Rekrutmen</p>
              <div className="mt-2">
                <Badge variant="status-green" className="text-sm px-2.5 py-0.5">
                  AKTIF
                </Badge>
              </div>
              <p className="text-xs text-gray-400 mt-2">Pendaftaran Terbuka</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
              ⚡
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card header="Pintasan Aksi Utama Super Admin">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            className="w-full justify-start py-3 h-auto"
            onClick={() => navigate('/master-data/assistants')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900">Kelola Master Asisten</p>
              <p className="text-xs text-gray-500 font-normal">Tambah asisten & assign role penilai</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="w-full justify-start py-3 h-auto"
            onClick={() => navigate('/admin/calas-management')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900">Manajemen Calon Asisten</p>
              <p className="text-xs text-gray-500 font-normal">Update timeline & kelulusan calas</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="w-full justify-start py-3 h-auto"
            onClick={() => navigate('/master-data/materials')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900">Bank Materi & Soal Ujian</p>
              <p className="text-xs text-gray-500 font-normal">Upload soal & kelola materi kursus</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  )
}