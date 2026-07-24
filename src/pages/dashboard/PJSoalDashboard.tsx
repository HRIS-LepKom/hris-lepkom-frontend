import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSystemOverviewWidget } from '@/components/dashboard/GlobalSystemOverviewWidget'

export default function PJSoalDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ═══ SECTION 1: ROLE-SPECIFIC WORKSPACE ═══ */}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-800 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            PJ Soal & Materi Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Selamat Datang, {user?.nama || 'PJ Soal'}!
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Kelola silabus materi kursus LEPKOM, upload berkas soal ujian, dan susun bank pertanyaan Question Card.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-amber-800 hover:bg-gray-100 border-none font-bold self-start sm:self-center"
          onClick={() => navigate('/master-data/questions')}
        >
          📂 Upload Soal Ujian
        </Button>
      </div>

      {/* Pintasan Aksi */}
      <Card header="⚡ Pintasan Aksi PJ Soal & Materi">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full justify-start py-4 h-auto" onClick={() => navigate('/master-data/materials')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Master Data Materi</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Tambah & update materi praktikum</p>
            </div>
          </Button>
          <Button variant="secondary" className="w-full justify-start py-4 h-auto" onClick={() => navigate('/master-data/questions')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Upload Soal Ujian</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Unggah berkas soal per tingkat</p>
            </div>
          </Button>
          <Button variant="secondary" className="w-full justify-start py-4 h-auto" onClick={() => navigate('/master-data/question-cards')}>
            <div className="text-left">
              <p className="font-bold text-gray-900">Bank Question Card</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">Tambah pertanyaan klarifikasi</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Statcard Metrik Role */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-amber-50/50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Soal Terunggah</p>
              <p className="text-xl font-extrabold text-amber-700 mt-1">18 Berkas</p>
              <p className="text-xs text-gray-600 mt-0.5">Tingkat 1, 2, 3</p>
            </div>
            <span className="text-2xl">📝</span>
          </div>
        </Card>
        <Card className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Question Card</p>
              <p className="text-xl font-extrabold text-lepkom-blue mt-1">42 Pertanyaan</p>
              <p className="text-xs text-gray-600 mt-0.5">Siap Digunakan Penilai</p>
            </div>
            <span className="text-2xl">❓</span>
          </div>
        </Card>
        <Card className="bg-green-50/50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Materi Kursus</p>
              <p className="text-xl font-extrabold text-lepkom-green mt-1">6 Materi</p>
              <p className="text-xs text-gray-600 mt-0.5">2 per tingkat</p>
            </div>
            <span className="text-2xl">📚</span>
          </div>
        </Card>
      </div>

      {/* ═══ SECTION 2: GLOBAL SYSTEM OVERVIEW ═══ */}
      <GlobalSystemOverviewWidget />
    </div>
  )
}